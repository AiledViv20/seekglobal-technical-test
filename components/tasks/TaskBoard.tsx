"use client";

import { Task, TaskStatus } from "@/modules/tasks/domain";
import TaskColumn from "./TaskColumn";

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
