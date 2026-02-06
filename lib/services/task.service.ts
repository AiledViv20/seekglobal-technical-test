import { Task, TaskFormData } from "@/lib/types/task.types";
import { findByUserId, findById, insert, update, remove } from "@/lib/mock/task.mock";
import { v4 as uuidv4 } from "uuid";

const SIMULATED_DELAY = 500;

function delay(): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, SIMULATED_DELAY));
}

/**
 * Obtiene todas las tareas del usuario autenticado.
 */
export async function getTasks(userId: string): Promise<Task[]> {
  await delay();
  return findByUserId(userId);
}

/**
 * Crea una nueva tarea para el usuario autenticado.
 */
export async function createTask(data: TaskFormData, userId: string): Promise<Task> {
  await delay();

  const newTask: Task = {
    id: uuidv4(),
    ...data,
    createdAt: new Date().toISOString(),
    userId,
  };

  insert(newTask);
  return newTask;
}

/**
 * Actualiza una tarea existente.
 */
export async function updateTask(id: string, data: Partial<TaskFormData>): Promise<Task> {
  await delay();

  const existing = findById(id);
  if (!existing) throw new Error("Tarea no encontrada.");

  return update(id, data);
}

/**
 * Elimina una tarea.
 */
export async function deleteTask(id: string): Promise<void> {
  await delay();

  const existing = findById(id);
  if (!existing) throw new Error("Tarea no encontrada.");

  remove(id);
}
