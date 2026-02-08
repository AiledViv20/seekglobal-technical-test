import { Task, TaskFormData, TaskRepository } from "../domain";
import { v4 as uuidv4 } from "uuid";

/** Simulated delay to emulate network latency (ms). */
const SIMULATED_DELAY = 500;

function delay(): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, SIMULATED_DELAY));
}

/**
 * Use case for creating a new task.
 * Generates a unique ID, assigns the creation date and persists it in the repository.
 */
export class TaskCreator {
  constructor(private repository: TaskRepository) {}

  /**
   * Creates a new task and inserts it into the repository.
   * @param data - Form data for creation.
   * @param userId - ID of the task owner.
   * @returns The created task with its ID and timestamp.
   */
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
