"use client";

import { Task } from "@/modules/tasks/domain";
import TaskCard from "./TaskCard";

interface TaskColumnProps {
  title: string;
  tasks: Task[];
  onEdit: (task: Task) => void;
  onDelete: (task: Task) => void;
}

export default function TaskColumn({ title, tasks, onEdit, onDelete }: TaskColumnProps) {
  return (
    <div className="flex flex-1 flex-col min-w-70">
      {/* Column header */}
      <div className="mb-4 flex items-center gap-2">
        <h2 className="text-sm font-semibold text-gray-700">{title}</h2>
        <span className="rounded-full bg-gray-200 px-2 py-0.5 text-xs font-medium text-gray-600">
          {tasks.length}
        </span>
      </div>

      {/* Cards */}
      <div className="flex flex-col gap-3">
        {tasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))}
        {tasks.length === 0 && (
          <p className="rounded-xl border-2 border-dashed border-gray-200 py-8 text-center text-sm text-gray-400">
            Sin tareas
          </p>
        )}
      </div>
    </div>
  );
}
