import { TaskRepository } from "../domain";

/** Simulated delay to emulate network latency (ms). */
const SIMULATED_DELAY = 500;

function delay(): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, SIMULATED_DELAY));
}

/**
 * Use case for deleting a task.
 * Verifies that the task exists before proceeding with deletion.
 */
export class TaskDeleter {
  constructor(private repository: TaskRepository) {}

  /**
   * Deletes a task from the repository.
   * @param id - ID of the task to delete.
   * @throws Error if the task does not exist.
   */
  async run(id: string): Promise<void> {
    await delay();

    const existing = this.repository.findById(id);
    if (!existing) throw new Error("Tarea no encontrada.");

    this.repository.remove(id);
  }
}
