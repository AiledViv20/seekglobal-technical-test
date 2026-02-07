import { TaskRepository } from "../domain";

const SIMULATED_DELAY = 500;

function delay(): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, SIMULATED_DELAY));
}

export class TaskDeleter {
  constructor(private repository: TaskRepository) {}

  async run(id: string): Promise<void> {
    await delay();

    const existing = this.repository.findById(id);
    if (!existing) throw new Error("Tarea no encontrada.");

    this.repository.remove(id);
  }
}
