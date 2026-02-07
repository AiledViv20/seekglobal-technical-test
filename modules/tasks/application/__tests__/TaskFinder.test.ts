import { TaskFinder } from "../TaskFinder";
import { TaskRepository } from "../../domain/TaskRepository";
import { Task } from "../../domain/Task";

jest.useFakeTimers();

const mockTasks: Task[] = [
  {
    id: "t1",
    title: "Task 1",
    description: "Description 1",
    status: "todo",
    priority: "high",
    createdAt: "2025-01-15T10:00:00.000Z",
    userId: "1",
  },
  {
    id: "t2",
    title: "Task 2",
    description: "Description 2",
    status: "in_progress",
    priority: "mid",
    createdAt: "2025-01-16T10:00:00.000Z",
    userId: "1",
  },
];

describe("TaskFinder", () => {
  let finder: TaskFinder;
  let mockRepository: jest.Mocked<TaskRepository>;

  beforeEach(() => {
    mockRepository = {
      findByUserId: jest.fn().mockReturnValue(mockTasks),
      findById: jest.fn(),
      insert: jest.fn(),
      update: jest.fn(),
      remove: jest.fn(),
    };
    finder = new TaskFinder(mockRepository);
  });

  it("should return tasks for a given userId", async () => {
    const promise = finder.run("1");
    jest.advanceTimersByTime(500);
    const result = await promise;

    expect(result).toEqual(mockTasks);
    expect(mockRepository.findByUserId).toHaveBeenCalledWith("1");
  });

  it("should call repository with the correct userId", async () => {
    const promise = finder.run("2");
    jest.advanceTimersByTime(500);
    await promise;

    expect(mockRepository.findByUserId).toHaveBeenCalledWith("2");
  });

  it("should return empty array when no tasks exist for user", async () => {
    mockRepository.findByUserId.mockReturnValue([]);

    const promise = finder.run("999");
    jest.advanceTimersByTime(500);
    const result = await promise;

    expect(result).toEqual([]);
  });
});
