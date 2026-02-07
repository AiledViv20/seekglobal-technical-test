/** Possible statuses of a task within the Kanban board. */
export type TaskStatus = "todo" | "in_progress" | "done";

/** Priority levels assignable to a task. */
export type TaskPriority = "high" | "mid" | "low";

/** Main entity representing a task in the system. */
export interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  priority: TaskPriority;
  createdAt: string;
  userId: string;
}

/** Form data for creating or editing a task (excludes id, createdAt and userId). */
export interface TaskFormData {
  title: string;
  description: string;
  status: TaskStatus;
  priority: TaskPriority;
}
