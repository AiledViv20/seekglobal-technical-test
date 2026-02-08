import { TaskUpdater } from "../TaskUpdater";
import { TaskRepository } from "../../domain/TaskRepository";
import { Task } from "../../domain/Task";

jest.useFakeTimers();

const existingTask: Task = {
  id: "t1",
  title: "Original Title",
  description: "Original Description",
  status: "todo",
  priority: "high",
  createdAt: "2025-01-15T10:00:00.000Z",
  userId: "1",
};

describe("TaskUpdater", () => {
  let updater: TaskUpdater;
  let mockRepository: jest.Mocked<TaskRepository>;

  beforeEach(() => {
    mockRepository = {
      findByUserId: jest.fn(),
      findById: jest.fn().mockReturnValue(existingTask),
      insert: jest.fn(),
      update: jest.fn().mockReturnValue({ ...existingTask, title: "Updated Title" }),
      remove: jest.fn(),
    };
    updater = new TaskUpdater(mockRepository);
  });

  it("should update a task with partial data", async () => {
    const promise = updater.run("t1", { title: "Updated Title" });
    jest.advanceTimersByTime(500);
    const result = await promise;

    expect(result.title).toBe("Updated Title");
  });

  it("should call findById to verify the task exists", async () => {
    const promise = updater.run("t1", { title: "Updated Title" });
    jest.advanceTimersByTime(500);
    await promise;

    expect(mockRepository.findById).toHaveBeenCalledWith("t1");
  });

  it("should call repository.update with the correct parameters", async () => {
    const updateData = { status: "done" as const };
    const promise = updater.run("t1", updateData);
    jest.advanceTimersByTime(500);
    await promise;

    expect(mockRepository.update).toHaveBeenCalledWith("t1", updateData);
  });

  it("should throw an error when task does not exist", async () => {
    mockRepository.findById.mockReturnValue(undefined);

    const promise = updater.run("non-existing", { title: "Test" });
    jest.advanceTimersByTime(500);

    await expect(promise).rejects.toThrow("Tarea no encontrada.");
  });

  it("should update only the status field", async () => {
    mockRepository.update.mockReturnValue({ ...existingTask, status: "in_progress" });

    const promise = updater.run("t1", { status: "in_progress" });
    jest.advanceTimersByTime(500);
    const result = await promise;

    expect(result.status).toBe("in_progress");
    expect(mockRepository.update).toHaveBeenCalledWith("t1", { status: "in_progress" });
  });
});
