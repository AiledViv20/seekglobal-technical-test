import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import DeleteConfirmModal from "../DeleteConfirmModal";
import { Task } from "@/modules/tasks/domain";

const mockTask: Task = {
  id: "t1",
  title: "Task to delete",
  description: "Description",
  status: "todo",
  priority: "high",
  createdAt: "2025-01-15T10:00:00.000Z",
  userId: "1",
};

describe("DeleteConfirmModal", () => {
  const mockOnClose = jest.fn();
  const mockOnConfirm = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should not render when isOpen is false", () => {
    render(
      <DeleteConfirmModal isOpen={false} task={mockTask} onClose={mockOnClose} onConfirm={mockOnConfirm} />
    );
    expect(screen.queryByText("Eliminar Tarea")).not.toBeInTheDocument();
  });

  it("should not render when task is null", () => {
    render(
      <DeleteConfirmModal isOpen={true} task={null} onClose={mockOnClose} onConfirm={mockOnConfirm} />
    );
    expect(screen.queryByText("Eliminar Tarea")).not.toBeInTheDocument();
  });

  it("should render the modal with task title", () => {
    render(
      <DeleteConfirmModal isOpen={true} task={mockTask} onClose={mockOnClose} onConfirm={mockOnConfirm} />
    );
    expect(screen.getByText("Eliminar Tarea")).toBeInTheDocument();
    expect(screen.getByText(/Task to delete/)).toBeInTheDocument();
  });

  it("should show the irreversible action warning", () => {
    render(
      <DeleteConfirmModal isOpen={true} task={mockTask} onClose={mockOnClose} onConfirm={mockOnConfirm} />
    );
    expect(screen.getByText(/Esta acción no se puede deshacer/)).toBeInTheDocument();
  });

  it("should call onClose when clicking Cancelar", async () => {
    const user = userEvent.setup();
    render(
      <DeleteConfirmModal isOpen={true} task={mockTask} onClose={mockOnClose} onConfirm={mockOnConfirm} />
    );

    await user.click(screen.getByText("Cancelar"));
    expect(mockOnClose).toHaveBeenCalled();
  });

  it("should call onConfirm when clicking Eliminar", async () => {
    const user = userEvent.setup();
    render(
      <DeleteConfirmModal isOpen={true} task={mockTask} onClose={mockOnClose} onConfirm={mockOnConfirm} />
    );

    await user.click(screen.getByText("Eliminar"));
    expect(mockOnConfirm).toHaveBeenCalled();
  });

  it("should call onClose when clicking the X button", async () => {
    const user = userEvent.setup();
    render(
      <DeleteConfirmModal isOpen={true} task={mockTask} onClose={mockOnClose} onConfirm={mockOnConfirm} />
    );

    const buttons = screen.getAllByRole("button");
    const xButton = buttons.find(
      (btn) => !btn.textContent?.includes("Cancelar") && !btn.textContent?.includes("Eliminar")
    );
    if (xButton) await user.click(xButton);

    expect(mockOnClose).toHaveBeenCalled();
  });
});
