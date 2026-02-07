import { Task, TaskFormData, TaskRepository } from "../domain";

const SIMULATED_DELAY = 500;

function delay(): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, SIMULATED_DELAY));
}

export class TaskUpdater {
  constructor(private repository: TaskRepository) {}

  async run(id: string, data: Partial<TaskFormData>): Promise<Task> {
    await delay();

    const existing = this.repository.findById(id);
    if (!existing) throw new Error("Tarea no encontrada.");

    return this.repository.update(id, data);
  }
}
