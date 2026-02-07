import { Task, TaskFormData, TaskRepository } from "../domain";

/** Simulated delay to emulate network latency (ms). */
const SIMULATED_DELAY = 500;

function delay(): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, SIMULATED_DELAY));
}

/**
 * Use case for updating an existing task.
 * Verifies that the task exists before applying partial changes.
 */
export class TaskUpdater {
  constructor(private repository: TaskRepository) {}

  /**
   * Updates a task with partial data.
   * @param id - ID of the task to update.
   * @param data - Fields to modify.
   * @returns The updated task.
   * @throws Error if the task does not exist.
   */
  async run(id: string, data: Partial<TaskFormData>): Promise<Task> {
    await delay();

    const existing = this.repository.findById(id);
    if (!existing) throw new Error("Tarea no encontrada.");

    return this.repository.update(id, data);
  }
}
