import { render, screen, fireEvent } from "@testing-library/react";
import TaskCard from "../TaskCard";
import { Task } from "@/modules/tasks/domain";

const mockTask: Task = {
  id: "t1",
  title: "Test Task",
  description: "Test description for the task",
  status: "todo",
  priority: "high",
  createdAt: "2025-01-15T10:00:00.000Z",
  userId: "1",
};

describe("TaskCard", () => {
  const mockOnEdit = jest.fn();
  const mockOnDelete = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should render the task title", () => {
    render(<TaskCard task={mockTask} onEdit={mockOnEdit} onDelete={mockOnDelete} />);
    expect(screen.getByText("Test Task")).toBeInTheDocument();
  });

  it("should render the task description", () => {
    render(<TaskCard task={mockTask} onEdit={mockOnEdit} onDelete={mockOnDelete} />);
    expect(screen.getByText("Test description for the task")).toBeInTheDocument();
  });

  it("should display the priority label for high priority", () => {
    render(<TaskCard task={mockTask} onEdit={mockOnEdit} onDelete={mockOnDelete} />);
    expect(screen.getByText("Alta")).toBeInTheDocument();
  });

  it("should display the priority label for mid priority", () => {
    const midTask = { ...mockTask, priority: "mid" as const };
    render(<TaskCard task={midTask} onEdit={mockOnEdit} onDelete={mockOnDelete} />);
    expect(screen.getByText("Media")).toBeInTheDocument();
  });

  it("should display the priority label for low priority", () => {
    const lowTask = { ...mockTask, priority: "low" as const };
    render(<TaskCard task={lowTask} onEdit={mockOnEdit} onDelete={mockOnDelete} />);
    expect(screen.getByText("Baja")).toBeInTheDocument();
  });

  it("should display the formatted creation date", () => {
    render(<TaskCard task={mockTask} onEdit={mockOnEdit} onDelete={mockOnDelete} />);
    expect(screen.getByText(/ene/i)).toBeInTheDocument();
  });

  it("should open the menu when clicking the dots button", () => {
    render(<TaskCard task={mockTask} onEdit={mockOnEdit} onDelete={mockOnDelete} />);

    expect(screen.queryByText("Editar")).not.toBeInTheDocument();

    const menuButton = screen.getByRole("button");
    fireEvent.click(menuButton);

    expect(screen.getByText("Editar")).toBeInTheDocument();
    expect(screen.getByText("Eliminar")).toBeInTheDocument();
  });

  it("should call onEdit when clicking Editar", () => {
    render(<TaskCard task={mockTask} onEdit={mockOnEdit} onDelete={mockOnDelete} />);

    fireEvent.click(screen.getByRole("button"));
    fireEvent.click(screen.getByText("Editar"));

    expect(mockOnEdit).toHaveBeenCalledWith(mockTask);
  });

  it("should call onDelete when clicking Eliminar", () => {
    render(<TaskCard task={mockTask} onEdit={mockOnEdit} onDelete={mockOnDelete} />);

    fireEvent.click(screen.getByRole("button"));
    fireEvent.click(screen.getByText("Eliminar"));

    expect(mockOnDelete).toHaveBeenCalledWith(mockTask);
  });

  it("should close the menu after clicking Editar", () => {
    render(<TaskCard task={mockTask} onEdit={mockOnEdit} onDelete={mockOnDelete} />);

    fireEvent.click(screen.getByRole("button"));
    fireEvent.click(screen.getByText("Editar"));

    expect(screen.queryByText("Editar")).not.toBeInTheDocument();
  });
});
