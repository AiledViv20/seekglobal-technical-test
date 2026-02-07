import { render, screen } from "@testing-library/react";
import TaskColumn from "../TaskColumn";
import { Task } from "@/modules/tasks/domain";

const mockTasks: Task[] = [
  {
    id: "t1",
    title: "Task 1",
    description: "Description 1",
    status: "todo",
    priority: "high",
    createdAt: "2025-01-15T10:00:00.000Z",
    userId: "1",
  },
  {
    id: "t2",
    title: "Task 2",
    description: "Description 2",
    status: "todo",
    priority: "mid",
    createdAt: "2025-01-16T10:00:00.000Z",
    userId: "1",
  },
];

describe("TaskColumn", () => {
  const mockOnEdit = jest.fn();
  const mockOnDelete = jest.fn();

  it("should render the column title", () => {
    render(
      <TaskColumn title="Por Hacer" tasks={mockTasks} onEdit={mockOnEdit} onDelete={mockOnDelete} />
    );
    expect(screen.getByText("Por Hacer")).toBeInTheDocument();
  });

  it("should display the task count", () => {
    render(
      <TaskColumn title="Por Hacer" tasks={mockTasks} onEdit={mockOnEdit} onDelete={mockOnDelete} />
    );
    expect(screen.getByText("2")).toBeInTheDocument();
  });

  it("should render all task cards", () => {
    render(
      <TaskColumn title="Por Hacer" tasks={mockTasks} onEdit={mockOnEdit} onDelete={mockOnDelete} />
    );
    expect(screen.getByText("Task 1")).toBeInTheDocument();
    expect(screen.getByText("Task 2")).toBeInTheDocument();
  });

  it("should show empty state message when no tasks", () => {
    render(
      <TaskColumn title="Completadas" tasks={[]} onEdit={mockOnEdit} onDelete={mockOnDelete} />
    );
    expect(screen.getByText("Sin tareas")).toBeInTheDocument();
  });

  it("should display count as 0 when no tasks", () => {
    render(
      <TaskColumn title="Completadas" tasks={[]} onEdit={mockOnEdit} onDelete={mockOnDelete} />
    );
    expect(screen.getByText("0")).toBeInTheDocument();
  });
});
