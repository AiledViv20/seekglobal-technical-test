"use client";

import { create } from "zustand";
import { Task, TaskFormData } from "../domain";
import { TaskFinder, TaskCreator, TaskUpdater, TaskDeleter } from "../application";
import { MockTaskRepository } from "../infrastructure";
import { useAuth } from "@/modules/auth/hooks/useAuth";

const repository = new MockTaskRepository();
const taskFinder = new TaskFinder(repository);
const taskCreator = new TaskCreator(repository);
const taskUpdater = new TaskUpdater(repository);
const taskDeleter = new TaskDeleter(repository);

interface TaskState {
  tasks: Task[];
  isLoading: boolean;
  error: string | null;
  fetchTasks: () => Promise<void>;
  addTask: (data: TaskFormData) => Promise<void>;
  editTask: (id: string, data: Partial<TaskFormData>) => Promise<void>;
  removeTask: (id: string) => Promise<void>;
}

export const useTasks = create<TaskState>((set) => ({
  tasks: [],
  isLoading: false,
  error: null,

  fetchTasks: async () => {
    const userId = useAuth.getState().user?.id;
    if (!userId) return;

    set({ isLoading: true, error: null });
    try {
      const tasks = await taskFinder.run(userId);
      set({ tasks, isLoading: false });
    } catch (error) {
      set({
        isLoading: false,
        error: error instanceof Error ? error.message : "Error al cargar las tareas",
      });
    }
  },

  addTask: async (data: TaskFormData) => {
    const userId = useAuth.getState().user?.id;
    if (!userId) return;

    set({ error: null });
    try {
      const newTask = await taskCreator.run(data, userId);
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
      const updated = await taskUpdater.run(id, data);
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
      await taskDeleter.run(id);
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
