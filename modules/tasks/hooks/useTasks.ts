"use client";

import { create } from "zustand";
import { toast } from "sonner";
import { Task, TaskFormData } from "../domain";
import { TaskFinder, TaskCreator, TaskUpdater, TaskDeleter } from "../application";
import { MockTaskRepository } from "../infrastructure";
import { useAuth } from "@/modules/auth/hooks/useAuth";

// Application layer instances (dependency injection)
const repository = new MockTaskRepository();
const taskFinder = new TaskFinder(repository);
const taskCreator = new TaskCreator(repository);
const taskUpdater = new TaskUpdater(repository);
const taskDeleter = new TaskDeleter(repository);

/** Task store state and actions. */
interface TaskState {
  tasks: Task[];
  isLoading: boolean;
  error: string | null;
  fetchTasks: () => Promise<void>;
  addTask: (data: TaskFormData) => Promise<void>;
  editTask: (id: string, data: Partial<TaskFormData>) => Promise<void>;
  removeTask: (id: string) => Promise<void>;
}

/**
 * Zustand store for managing task state.
 * Connects the application layer use cases with React components.
 * Gets the userId from the auth store via useAuth.getState().
 */
export const useTasks = create<TaskState>((set) => ({
  tasks: [],
  isLoading: false,
  error: null,

  /** Fetches the authenticated user's tasks from the repository. */
  fetchTasks: async () => {
    const userId = useAuth.getState().user?.id;
    if (!userId) return;

    set({ isLoading: true, error: null });
    try {
      const tasks = await taskFinder.run(userId);
      set({ tasks, isLoading: false });
    } catch (error) {
      const message = error instanceof Error ? error.message : "No se pudieron cargar las tareas. Intenta recargar la página.";
      toast.error(message);
      set({ isLoading: false, error: message });
    }
  },

  /** Creates a new task and prepends it to the list. */
  addTask: async (data: TaskFormData) => {
    const userId = useAuth.getState().user?.id;
    if (!userId) return;

    set({ error: null });
    try {
      const newTask = await taskCreator.run(data, userId);
      set((state) => ({ tasks: [newTask, ...state.tasks] }));
      toast.success("Tarea creada exitosamente");
    } catch (error) {
      const message = error instanceof Error ? error.message : "No se pudo crear la tarea. Verifica los datos e intenta nuevamente.";
      toast.error(message);
      set({ error: message });
    }
  },

  /** Updates an existing task and replaces its version in the list. */
  editTask: async (id: string, data: Partial<TaskFormData>) => {
    set({ error: null });
    try {
      const updated = await taskUpdater.run(id, data);
      set((state) => ({
        tasks: state.tasks.map((t) => (t.id === id ? updated : t)),
      }));
      toast.success("Tarea actualizada exitosamente");
    } catch (error) {
      const message = error instanceof Error ? error.message : "No se pudo actualizar la tarea. Por favor, intenta de nuevo.";
      toast.error(message);
      set({ error: message });
    }
  },

  /** Deletes a task and removes it from the local list. */
  removeTask: async (id: string) => {
    set({ error: null });
    try {
      await taskDeleter.run(id);
      set((state) => ({
        tasks: state.tasks.filter((t) => t.id !== id),
      }));
      toast.success("Tarea eliminada exitosamente");
    } catch (error) {
      const message = error instanceof Error ? error.message : "No se pudo eliminar la tarea. Intenta nuevamente.";
      toast.error(message);
      set({ error: message });
    }
  },
}));
