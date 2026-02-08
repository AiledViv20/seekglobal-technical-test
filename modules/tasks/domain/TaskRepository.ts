import { Task } from "./Task";

/**
 * Task repository contract.
 * Defines the CRUD operations needed to manage tasks.
 */
export interface TaskRepository {
  /** Gets all tasks for a user. */
  findByUserId(userId: string): Task[];
  /** Finds a task by its ID. */
  findById(id: string): Task | undefined;
  /** Inserts a new task into the repository. */
  insert(task: Task): void;
  /** Partially updates an existing task. */
  update(id: string, data: Partial<Task>): Task;
  /** Removes a task by its ID. */
  remove(id: string): void;
}
