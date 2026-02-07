import { MockTaskRepository } from "../MockTaskRepository";
import { Task } from "../../domain/Task";

describe("MockTaskRepository", () => {
  let repository: MockTaskRepository;

  beforeEach(() => {
    repository = new MockTaskRepository();
  });

  describe("findByUserId", () => {
    it("should return tasks for user 1", () => {
      const tasks = repository.findByUserId("1");
      expect(tasks.length).toBeGreaterThan(0);
      tasks.forEach((task) => {
        expect(task.userId).toBe("1");
      });
    });

    it("should return tasks for user 2", () => {
      const tasks = repository.findByUserId("2");
      expect(tasks.length).toBeGreaterThan(0);
      tasks.forEach((task) => {
        expect(task.userId).toBe("2");
      });
    });

    it("should return empty array for non-existing user", () => {
      const tasks = repository.findByUserId("999");
      expect(tasks).toEqual([]);
    });
  });

  describe("findById", () => {
    it("should return a task for existing id", () => {
      const task = repository.findById("t1");
      expect(task).toBeDefined();
      expect(task!.id).toBe("t1");
      expect(task!.title).toBe("Diseñar landing page");
    });

    it("should return undefined for non-existing id", () => {
      const task = repository.findById("non-existing");
      expect(task).toBeUndefined();
    });
  });

  describe("insert", () => {
    it("should add a new task to the repository", () => {
      const newTask: Task = {
        id: "new-task",
        title: "New Task",
        description: "Test description",
        status: "todo",
        priority: "mid",
        createdAt: new Date().toISOString(),
        userId: "1",
      };

      repository.insert(newTask);

      const found = repository.findById("new-task");
      expect(found).toBeDefined();
      expect(found!.title).toBe("New Task");
    });

    it("should insert the task at the beginning of the list", () => {
      const newTask: Task = {
        id: "first-task",
        title: "First Task",
        description: "Should be first",
        status: "todo",
        priority: "high",
        createdAt: new Date().toISOString(),
        userId: "1",
      };

      repository.insert(newTask);

      const tasks = repository.findByUserId("1");
      expect(tasks[0].id).toBe("first-task");
    });
  });

  describe("update", () => {
    it("should update a task's title", () => {
      const updated = repository.update("t1", { title: "Updated Title" });
      expect(updated.title).toBe("Updated Title");
      expect(updated.id).toBe("t1");
    });

    it("should update a task's status", () => {
      const updated = repository.update("t1", { status: "done" });
      expect(updated.status).toBe("done");
    });

    it("should preserve non-updated fields", () => {
      const original = repository.findById("t1");
      const updated = repository.update("t1", { title: "New Title" });

      expect(updated.description).toBe(original!.description);
      expect(updated.priority).toBe(original!.priority);
      expect(updated.userId).toBe(original!.userId);
    });

    it("should throw an error for non-existing task", () => {
      expect(() => {
        repository.update("non-existing", { title: "Test" });
      }).toThrow("Tarea no encontrada.");
    });
  });

  describe("remove", () => {
    it("should remove a task from the repository", () => {
      repository.remove("t1");
      const found = repository.findById("t1");
      expect(found).toBeUndefined();
    });

    it("should not affect other tasks when removing one", () => {
      const tasksBefore = repository.findByUserId("1").length;
      repository.remove("t2");
      const tasksAfter = repository.findByUserId("1").length;
      expect(tasksAfter).toBe(tasksBefore - 1);
    });

    it("should throw an error for non-existing task", () => {
      expect(() => {
        repository.remove("non-existing");
      }).toThrow("Tarea no encontrada.");
    });
  });
});
