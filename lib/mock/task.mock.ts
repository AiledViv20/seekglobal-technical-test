import { Task } from "@/lib/types/task.types";

let mockTasks: Task[] = [
  {
    id: "t1",
    title: "Diseñar landing page",
    description: "Crear el diseño UI/UX de la página principal del proyecto con Figma.",
    status: "todo",
    priority: "high",
    createdAt: "2025-01-15T10:00:00.000Z",
    userId: "1",
  },
  {
    id: "t2",
    title: "Configurar base de datos",
    description: "Definir el esquema de la base de datos PostgreSQL y crear las migraciones iniciales.",
    status: "todo",
    priority: "mid",
    createdAt: "2025-01-16T09:30:00.000Z",
    userId: "1",
  },
  {
    id: "t3",
    title: "Integrar pasarela de pago",
    description: "Implementar la integración con Stripe para procesar pagos en la plataforma.",
    status: "in_progress",
    priority: "high",
    createdAt: "2025-01-10T14:00:00.000Z",
    userId: "1",
  },
  {
    id: "t4",
    title: "Escribir documentación API",
    description: "Documentar todos los endpoints de la API REST con ejemplos de uso.",
    status: "in_progress",
    priority: "low",
    createdAt: "2025-01-12T11:00:00.000Z",
    userId: "1",
  },
  {
    id: "t5",
    title: "Configurar CI/CD",
    description: "Configurar pipeline de integración y despliegue continuo con GitHub Actions.",
    status: "done",
    priority: "mid",
    createdAt: "2025-01-08T08:00:00.000Z",
    userId: "1",
  },
  {
    id: "t6",
    title: "Implementar autenticación",
    description: "Desarrollar el módulo de autenticación con JWT y protección de rutas.",
    status: "done",
    priority: "high",
    createdAt: "2025-01-05T16:00:00.000Z",
    userId: "1",
  },
];

export function findAll(): Task[] {
  return [...mockTasks];
}

export function findByUserId(userId: string): Task[] {
  return mockTasks.filter((t) => t.userId === userId);
}

export function findById(id: string): Task | undefined {
  return mockTasks.find((t) => t.id === id);
}

export function insert(task: Task): void {
  mockTasks = [task, ...mockTasks];
}

export function update(id: string, data: Partial<Task>): Task {
  const index = mockTasks.findIndex((t) => t.id === id);
  if (index === -1) throw new Error("Tarea no encontrada.");
  mockTasks[index] = { ...mockTasks[index], ...data };
  return mockTasks[index];
}

export function remove(id: string): void {
  const index = mockTasks.findIndex((t) => t.id === id);
  if (index === -1) throw new Error("Tarea no encontrada.");
  mockTasks = mockTasks.filter((t) => t.id !== id);
}
