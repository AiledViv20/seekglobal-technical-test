import { Task, TaskRepository } from "../domain";

const SIMULATED_DELAY = 500;

function delay(): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, SIMULATED_DELAY));
}

export class TaskFinder {
  constructor(private repository: TaskRepository) {}

  async run(userId: string): Promise<Task[]> {
    await delay();
    return this.repository.findByUserId(userId);
  }
}
