import { Task, TaskRepository } from "../domain";

/** Simulated delay to emulate network latency (ms). */
const SIMULATED_DELAY = 500;

function delay(): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, SIMULATED_DELAY));
}

/**
 * Use case for fetching a user's tasks.
 * Queries the repository and returns the list filtered by userId.
 */
export class TaskFinder {
  constructor(private repository: TaskRepository) {}

  /**
   * Gets all tasks associated with a user.
   * @param userId - ID of the authenticated user.
   * @returns List of the user's tasks.
   */
  async run(userId: string): Promise<Task[]> {
    await delay();
    return this.repository.findByUserId(userId);
  }
}
