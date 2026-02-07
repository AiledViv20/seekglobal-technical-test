import { render, screen } from "@testing-library/react";
import TaskBoard from "../TaskBoard";
import { Task } from "@/modules/tasks/domain";

const mockTasks: Task[] = [
  {
    id: "t1",
    title: "Todo Task",
    description: "Description 1",
    status: "todo",
    priority: "high",
    createdAt: "2025-01-15T10:00:00.000Z",
    userId: "1",
  },
  {
    id: "t2",
    title: "In Progress Task",
    description: "Description 2",
    status: "in_progress",
    priority: "mid",
    createdAt: "2025-01-16T10:00:00.000Z",
    userId: "1",
  },
  {
    id: "t3",
    title: "Done Task",
    description: "Description 3",
    status: "done",
    priority: "low",
    createdAt: "2025-01-17T10:00:00.000Z",
    userId: "1",
  },
];

describe("TaskBoard", () => {
  const mockOnEdit = jest.fn();
  const mockOnDelete = jest.fn();

  it("should render all three columns", () => {
    render(<TaskBoard tasks={mockTasks} onEdit={mockOnEdit} onDelete={mockOnDelete} />);

    expect(screen.getByText("Por Hacer")).toBeInTheDocument();
    expect(screen.getByText("En Progreso")).toBeInTheDocument();
    expect(screen.getByText("Completadas")).toBeInTheDocument();
  });

  it("should place tasks in the correct columns", () => {
    render(<TaskBoard tasks={mockTasks} onEdit={mockOnEdit} onDelete={mockOnDelete} />);

    expect(screen.getByText("Todo Task")).toBeInTheDocument();
    expect(screen.getByText("In Progress Task")).toBeInTheDocument();
    expect(screen.getByText("Done Task")).toBeInTheDocument();
  });

  it("should render empty columns when no tasks", () => {
    render(<TaskBoard tasks={[]} onEdit={mockOnEdit} onDelete={mockOnDelete} />);

    const emptyMessages = screen.getAllByText("Sin tareas");
    expect(emptyMessages).toHaveLength(3);
  });

  it("should show correct count per column", () => {
    const tasks: Task[] = [
      ...mockTasks,
      {
        id: "t4",
        title: "Another Todo",
        description: "Description 4",
        status: "todo",
        priority: "mid",
        createdAt: "2025-01-18T10:00:00.000Z",
        userId: "1",
      },
    ];

    render(<TaskBoard tasks={tasks} onEdit={mockOnEdit} onDelete={mockOnDelete} />);

    // "Por Hacer" column should show count 2
    expect(screen.getByText("2")).toBeInTheDocument();
  });
});
