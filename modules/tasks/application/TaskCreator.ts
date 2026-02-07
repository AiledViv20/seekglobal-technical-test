import { Task, TaskFormData, TaskRepository } from "../domain";
import { v4 as uuidv4 } from "uuid";

const SIMULATED_DELAY = 500;

function delay(): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, SIMULATED_DELAY));
}

export class TaskCreator {
  constructor(private repository: TaskRepository) {}

  async run(data: TaskFormData, userId: string): Promise<Task> {
    await delay();

    const newTask: Task = {
      id: uuidv4(),
      ...data,
      createdAt: new Date().toISOString(),
      userId,
    };

    this.repository.insert(newTask);
    return newTask;
  }
}
