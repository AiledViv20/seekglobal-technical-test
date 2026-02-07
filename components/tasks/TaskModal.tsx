"use client";

import { useState } from "react";
import { HiX } from "react-icons/hi";
import { Task, TaskFormData, TaskStatus, TaskPriority } from "@/modules/tasks/domain";

/** Status select options. */
const STATUS_OPTIONS: { value: TaskStatus; label: string }[] = [
  { value: "todo", label: "Por Hacer" },
  { value: "in_progress", label: "En Progreso" },
  { value: "done", label: "Completada" },
];

/** Priority select options. */
const PRIORITY_OPTIONS: { value: TaskPriority; label: string }[] = [
  { value: "high", label: "Alta" },
  { value: "mid", label: "Media" },
  { value: "low", label: "Baja" },
];

interface TaskModalProps {
  isOpen: boolean;
  task?: Task | null;
  onClose: () => void;
  onSave: (data: TaskFormData) => void;
}

/**
 * Modal for creating or editing a task.
 * If a task is provided, opens in edit mode with pre-filled fields.
 * Otherwise, opens in creation mode with default values.
 */
export default function TaskModal({ isOpen, task, onClose, onSave }: TaskModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <TaskModalForm
        key={task?.id ?? "new"}
        task={task}
        onClose={onClose}
        onSave={onSave}
      />
    </div>
  );
}

/** Internal modal form with local state for fields. */
function TaskModalForm({ task, onClose, onSave }: Omit<TaskModalProps, "isOpen">) {
  const [title, setTitle] = useState(task?.title ?? "");
  const [description, setDescription] = useState(task?.description ?? "");
  const [status, setStatus] = useState<TaskStatus>(task?.status ?? "todo");
  const [priority, setPriority] = useState<TaskPriority>(task?.priority ?? "mid");
  const isEditing = !!task;
  const isFormValid = title.trim() && description.trim();

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (!isFormValid) return;
    onSave({ title: title.trim(), description: description.trim(), status, priority });
  };

  return (
    <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-xl mx-4">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-lg font-bold text-gray-900">
            {isEditing ? "Editar Tarea" : "Nueva Tarea"}
          </h2>
          <button
            onClick={onClose}
            className="rounded-lg p-1.5 text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-colors cursor-pointer"
          >
            <HiX size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="task-title" className="block text-sm font-medium text-gray-700 mb-1">
              Título
            </label>
            <input
              id="task-title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Nombre de la tarea"
              className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm text-gray-900 placeholder-gray-400 focus:border-gray-300 focus:outline-none focus:ring-0 transition-colors"
            />
          </div>

          <div>
            <label htmlFor="task-desc" className="block text-sm font-medium text-gray-700 mb-1">
              Descripción
            </label>
            <textarea
              id="task-desc"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe la tarea..."
              rows={3}
              className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm text-gray-900 placeholder-gray-400 focus:border-gray-300 focus:outline-none focus:ring-0 transition-colors resize-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="task-status" className="block text-sm font-medium text-gray-700 mb-1">
                Estado
              </label>
              <select
                id="task-status"
                value={status}
                onChange={(e) => setStatus(e.target.value as TaskStatus)}
                className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm text-gray-900 focus:border-gray-300 focus:outline-none focus:ring-0 transition-colors"
              >
                {STATUS_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="task-priority" className="block text-sm font-medium text-gray-700 mb-1">
                Prioridad
              </label>
              <select
                id="task-priority"
                value={priority}
                onChange={(e) => setPriority(e.target.value as TaskPriority)}
                className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm text-gray-900 focus:border-gray-300 focus:outline-none focus:ring-0 transition-colors"
              >
                {PRIORITY_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg px-5 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-100 transition-colors cursor-pointer"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={!isFormValid}
              className="rounded-lg bg-[#0560C9] px-5 py-2.5 text-sm font-medium text-white hover:bg-[#0652a8] transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            >
              {isEditing ? "Guardar cambios" : "Crear tarea"}
            </button>
          </div>
        </form>
      </div>
  );
}
