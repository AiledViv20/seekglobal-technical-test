import { create } from "zustand";
import { Task, TaskFormData } from "@/lib/types/task.types";
import * as taskService from "@/lib/services/task.service";
import { useAuthStore } from "@/lib/stores/auth.store";

interface TaskState {
  tasks: Task[];
  isLoading: boolean;
  error: string | null;
  fetchTasks: () => Promise<void>;
  addTask: (data: TaskFormData) => Promise<void>;
  editTask: (id: string, data: Partial<TaskFormData>) => Promise<void>;
  removeTask: (id: string) => Promise<void>;
}

export const useTaskStore = create<TaskState>((set) => ({
  tasks: [],
  isLoading: false,
  error: null,

  fetchTasks: async () => {
    const userId = useAuthStore.getState().user?.id;
    if (!userId) return;

    set({ isLoading: true, error: null });
    try {
      const tasks = await taskService.getTasks(userId);
      set({ tasks, isLoading: false });
    } catch (error) {
      set({
        isLoading: false,
        error: error instanceof Error ? error.message : "Error al cargar las tareas",
      });
    }
  },

  addTask: async (data: TaskFormData) => {
    const userId = useAuthStore.getState().user?.id;
    if (!userId) return;

    set({ error: null });
    try {
      const newTask = await taskService.createTask(data, userId);
      set((state) => ({ tasks: [newTask, ...state.tasks] }));
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : "Error al crear la tarea",
      });
    }
  },

  editTask: async (id: string, data: Partial<TaskFormData>) => {
    set({ error: null });
    try {
      const updated = await taskService.updateTask(id, data);
      set((state) => ({
        tasks: state.tasks.map((t) => (t.id === id ? updated : t)),
      }));
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : "Error al actualizar la tarea",
      });
    }
  },

  removeTask: async (id: string) => {
    set({ error: null });
    try {
      await taskService.deleteTask(id);
      set((state) => ({
        tasks: state.tasks.filter((t) => t.id !== id),
      }));
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : "Error al eliminar la tarea",
      });
    }
  },
}));
