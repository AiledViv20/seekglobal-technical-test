import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import TaskModal from "../TaskModal";
import { Task } from "@/modules/tasks/domain";

const existingTask: Task = {
  id: "t1",
  title: "Existing Task",
  description: "Existing Description",
  status: "in_progress",
  priority: "high",
  createdAt: "2025-01-15T10:00:00.000Z",
  userId: "1",
};

describe("TaskModal", () => {
  const mockOnClose = jest.fn();
  const mockOnSave = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should not render when isOpen is false", () => {
    render(<TaskModal isOpen={false} onClose={mockOnClose} onSave={mockOnSave} />);
    expect(screen.queryByText("Nueva Tarea")).not.toBeInTheDocument();
  });

  it("should render create modal when no task is provided", () => {
    render(<TaskModal isOpen={true} onClose={mockOnClose} onSave={mockOnSave} />);
    expect(screen.getByText("Nueva Tarea")).toBeInTheDocument();
    expect(screen.getByText("Crear tarea")).toBeInTheDocument();
  });

  it("should render edit modal when task is provided", () => {
    render(<TaskModal isOpen={true} task={existingTask} onClose={mockOnClose} onSave={mockOnSave} />);
    expect(screen.getByText("Editar Tarea")).toBeInTheDocument();
    expect(screen.getByText("Guardar cambios")).toBeInTheDocument();
  });

  it("should prefill form fields when editing a task", () => {
    render(<TaskModal isOpen={true} task={existingTask} onClose={mockOnClose} onSave={mockOnSave} />);

    expect(screen.getByDisplayValue("Existing Task")).toBeInTheDocument();
    expect(screen.getByDisplayValue("Existing Description")).toBeInTheDocument();
  });

  it("should call onClose when clicking Cancelar", async () => {
    const user = userEvent.setup();
    render(<TaskModal isOpen={true} onClose={mockOnClose} onSave={mockOnSave} />);

    await user.click(screen.getByText("Cancelar"));
    expect(mockOnClose).toHaveBeenCalled();
  });

  it("should call onClose when clicking the X button", async () => {
    const user = userEvent.setup();
    render(<TaskModal isOpen={true} onClose={mockOnClose} onSave={mockOnSave} />);

    const closeButtons = screen.getAllByRole("button");
    const xButton = closeButtons.find((btn) => !btn.textContent?.includes("Cancelar") && !btn.textContent?.includes("Crear"));
    if (xButton) await user.click(xButton);

    expect(mockOnClose).toHaveBeenCalled();
  });

  it("should disable submit when title is empty", () => {
    render(<TaskModal isOpen={true} onClose={mockOnClose} onSave={mockOnSave} />);

    const submitButton = screen.getByText("Crear tarea");
    expect(submitButton).toBeDisabled();
  });

  it("should call onSave with form data on submit", async () => {
    const user = userEvent.setup();
    render(<TaskModal isOpen={true} onClose={mockOnClose} onSave={mockOnSave} />);

    await user.type(screen.getByLabelText("Título"), "New Task Title");
    await user.type(screen.getByLabelText("Descripción"), "New Task Description");

    await user.click(screen.getByText("Crear tarea"));

    expect(mockOnSave).toHaveBeenCalledWith({
      title: "New Task Title",
      description: "New Task Description",
      status: "todo",
      priority: "mid",
    });
  });

  it("should render status options", () => {
    render(<TaskModal isOpen={true} onClose={mockOnClose} onSave={mockOnSave} />);

    expect(screen.getByLabelText("Estado")).toBeInTheDocument();
    expect(screen.getByText("Por Hacer")).toBeInTheDocument();
    expect(screen.getByText("En Progreso")).toBeInTheDocument();
    expect(screen.getByText("Completada")).toBeInTheDocument();
  });

  it("should render priority options", () => {
    render(<TaskModal isOpen={true} onClose={mockOnClose} onSave={mockOnSave} />);

    expect(screen.getByLabelText("Prioridad")).toBeInTheDocument();
    expect(screen.getByText("Alta")).toBeInTheDocument();
    expect(screen.getByText("Media")).toBeInTheDocument();
    expect(screen.getByText("Baja")).toBeInTheDocument();
  });
});
