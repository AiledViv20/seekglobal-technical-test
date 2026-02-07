import { Task } from "./Task";

export interface TaskRepository {
  findByUserId(userId: string): Task[];
  findById(id: string): Task | undefined;
  insert(task: Task): void;
  update(id: string, data: Partial<Task>): Task;
  remove(id: string): void;
}
