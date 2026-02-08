"use client";

import { Task, TaskStatus } from "@/modules/tasks/domain";
import TaskColumn from "./TaskColumn";

/** Kanban board column configuration. */
const COLUMNS: { key: TaskStatus; title: string }[] = [
  { key: "todo", title: "Por Hacer" },
  { key: "in_progress", title: "En Progreso" },
  { key: "done", title: "Completadas" },
];

interface TaskBoardProps {
  tasks: Task[];
  onEdit: (task: Task) => void;
  onDelete: (task: Task) => void;
}

/**
 * Kanban board that distributes tasks into 3 columns by status.
 * Horizontal scroll on mobile devices.
 */
export default function TaskBoard({ tasks, onEdit, onDelete }: TaskBoardProps) {
  return (
    <div className="flex gap-6 overflow-x-auto pb-4">
      {COLUMNS.map((col) => (
        <TaskColumn
          key={col.key}
          title={col.title}
          tasks={tasks.filter((t) => t.status === col.key)}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}
