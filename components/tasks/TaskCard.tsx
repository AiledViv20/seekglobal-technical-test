"use client";

import { useState, useRef, useEffect } from "react";
import { HiDotsVertical } from "react-icons/hi";
import { IoFlagOutline } from "react-icons/io5";
import { BsCalendar3 } from "react-icons/bs";
import { Task } from "@/modules/tasks/domain";

/** Color styles per priority level (badge). */
const PRIORITY_STYLES: Record<string, string> = {
  high: "bg-red-100 text-red-700",
  mid: "bg-yellow-100 text-yellow-700",
  low: "bg-green-100 text-green-700",
};

/** Human-readable labels for each priority level. */
const PRIORITY_LABELS: Record<string, string> = {
  high: "Alta",
  mid: "Media",
  low: "Baja",
};

interface TaskCardProps {
  task: Task;
  onEdit: (task: Task) => void;
  onDelete: (task: Task) => void;
}

/**
 * Individual task card with a context menu for edit/delete.
 * Displays title, description, priority and creation date.
 * The menu closes on click outside.
 */
export default function TaskCard({ task, onEdit, onDelete }: TaskCardProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const formattedDate = new Date(task.createdAt).toLocaleDateString("es-MX", {
    month: "short",
    day: "numeric",
  });

  return (
    <div className="rounded-xl bg-white p-4 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between gap-2">
        <h3 className="text-sm font-semibold text-gray-900 leading-snug">
          {task.title}
        </h3>
        <div className="relative" ref={menuRef}>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="rounded p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-colors cursor-pointer"
          >
            <HiDotsVertical size={16} />
          </button>
          {menuOpen && (
            <div className="absolute right-0 top-8 z-10 w-32 rounded-lg bg-white py-1 shadow-lg border border-gray-100">
              <button
                onClick={() => { setMenuOpen(false); onEdit(task); }}
                className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 cursor-pointer"
              >
                Editar
              </button>
              <button
                onClick={() => { setMenuOpen(false); onDelete(task); }}
                className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 cursor-pointer"
              >
                Eliminar
              </button>
            </div>
          )}
        </div>
      </div>

      <p className="mt-2 text-xs text-gray-500 line-clamp-2">
        {task.description}
      </p>

      <div className="mt-3 flex items-center justify-between">
        <span
          className={`inline-flex items-center gap-1 rounded-lg px-2.5 py-0.5 text-xs font-normal ${PRIORITY_STYLES[task.priority]}`}
        >
          <IoFlagOutline size={12} />
          {PRIORITY_LABELS[task.priority]}
        </span>
        <span className="inline-flex items-center gap-1 text-xs text-gray-400 capitalize">
          <BsCalendar3 size={12} />
          {formattedDate}
        </span>
      </div>
    </div>
  );
}
