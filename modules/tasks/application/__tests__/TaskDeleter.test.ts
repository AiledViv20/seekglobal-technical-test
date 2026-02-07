import { TaskDeleter } from "../TaskDeleter";
import { TaskRepository } from "../../domain/TaskRepository";
import { Task } from "../../domain/Task";

jest.useFakeTimers();

const existingTask: Task = {
  id: "t1",
  title: "Task to delete",
  description: "Description",
  status: "todo",
  priority: "high",
  createdAt: "2025-01-15T10:00:00.000Z",
  userId: "1",
};

describe("TaskDeleter", () => {
  let deleter: TaskDeleter;
  let mockRepository: jest.Mocked<TaskRepository>;

  beforeEach(() => {
    mockRepository = {
      findByUserId: jest.fn(),
      findById: jest.fn().mockReturnValue(existingTask),
      insert: jest.fn(),
      update: jest.fn(),
      remove: jest.fn(),
    };
    deleter = new TaskDeleter(mockRepository);
  });

  it("should delete an existing task", async () => {
    const promise = deleter.run("t1");
    jest.advanceTimersByTime(500);
    await promise;

    expect(mockRepository.remove).toHaveBeenCalledWith("t1");
  });

  it("should call findById to verify the task exists", async () => {
    const promise = deleter.run("t1");
    jest.advanceTimersByTime(500);
    await promise;

    expect(mockRepository.findById).toHaveBeenCalledWith("t1");
  });

  it("should throw an error when task does not exist", async () => {
    mockRepository.findById.mockReturnValue(undefined);

    const promise = deleter.run("non-existing");
    jest.advanceTimersByTime(500);

    await expect(promise).rejects.toThrow("Tarea no encontrada.");
  });

  it("should not call remove when task does not exist", async () => {
    mockRepository.findById.mockReturnValue(undefined);

    const promise = deleter.run("non-existing");
    jest.advanceTimersByTime(500);

    await expect(promise).rejects.toThrow();
    expect(mockRepository.remove).not.toHaveBeenCalled();
  });

  it("should return void on successful deletion", async () => {
    const promise = deleter.run("t1");
    jest.advanceTimersByTime(500);
    const result = await promise;

    expect(result).toBeUndefined();
  });
});
