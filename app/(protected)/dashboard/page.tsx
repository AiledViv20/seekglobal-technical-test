"use client";

import { useEffect, useState } from "react";
import { HiPlus } from "react-icons/hi";
import { useTasks } from "@/modules/tasks/hooks/useTasks";
import { Task, TaskFormData } from "@/modules/tasks/domain";
import TaskBoard from "@/components/tasks/TaskBoard";
import TaskModal from "@/components/tasks/TaskModal";
import DeleteConfirmModal from "@/components/tasks/DeleteConfirmModal";

export default function DashboardPage() {
  const { tasks, isLoading, fetchTasks, addTask, editTask, removeTask } = useTasks();

  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [deletingTask, setDeletingTask] = useState<Task | null>(null);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const handleCreate = () => {
    setEditingTask(null);
    setIsTaskModalOpen(true);
  };

  const handleEdit = (task: Task) => {
    setEditingTask(task);
    setIsTaskModalOpen(true);
  };

  const handleSave = async (data: TaskFormData) => {
    if (editingTask) {
      await editTask(editingTask.id, data);
    } else {
      await addTask(data);
    }
    setIsTaskModalOpen(false);
    setEditingTask(null);
  };

  const handleDelete = (task: Task) => {
    setDeletingTask(task);
  };

  const handleConfirmDelete = async () => {
    if (deletingTask) {
      await removeTask(deletingTask.id);
      setDeletingTask(null);
    }
  };

  return (
    <div className="flex flex-col h-full p-6 lg:p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Mis Tareas</h1>
        </div>
        <button
          onClick={handleCreate}
          className="flex items-center gap-2 rounded-lg bg-[#0560C9] px-4 py-2.5 text-sm font-medium text-white hover:bg-[#0652a8] transition-colors cursor-pointer"
        >
          <HiPlus size={18} />
          Nueva tarea
        </button>
      </div>

      {/* Content */}
      {isLoading ? (
        <div className="flex flex-1 items-center justify-center">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-300 border-t-gray-900" />
        </div>
      ) : (
        <TaskBoard tasks={tasks} onEdit={handleEdit} onDelete={handleDelete} />
      )}

      {/* Modals */}
      <TaskModal
        isOpen={isTaskModalOpen}
        task={editingTask}
        onClose={() => { setIsTaskModalOpen(false); setEditingTask(null); }}
        onSave={handleSave}
      />

      <DeleteConfirmModal
        isOpen={!!deletingTask}
        task={deletingTask}
        onClose={() => setDeletingTask(null)}
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
}
