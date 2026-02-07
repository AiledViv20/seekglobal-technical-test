import { TaskCreator } from "../TaskCreator";
import { TaskRepository } from "../../domain/TaskRepository";
import { TaskFormData } from "../../domain/Task";

jest.useFakeTimers();
jest.mock("uuid", () => ({ v4: () => "mocked-uuid-1234" }));

describe("TaskCreator", () => {
  let creator: TaskCreator;
  let mockRepository: jest.Mocked<TaskRepository>;

  const formData: TaskFormData = {
    title: "New Task",
    description: "Task description",
    status: "todo",
    priority: "high",
  };

  beforeEach(() => {
    mockRepository = {
      findByUserId: jest.fn(),
      findById: jest.fn(),
      insert: jest.fn(),
      update: jest.fn(),
      remove: jest.fn(),
    };
    creator = new TaskCreator(mockRepository);
  });

  it("should create a task with the provided data", async () => {
    const promise = creator.run(formData, "1");
    jest.advanceTimersByTime(500);
    const result = await promise;

    expect(result.title).toBe("New Task");
    expect(result.description).toBe("Task description");
    expect(result.status).toBe("todo");
    expect(result.priority).toBe("high");
    expect(result.userId).toBe("1");
  });

  it("should assign a UUID to the new task", async () => {
    const promise = creator.run(formData, "1");
    jest.advanceTimersByTime(500);
    const result = await promise;

    expect(result.id).toBe("mocked-uuid-1234");
  });

  it("should set a createdAt timestamp", async () => {
    const promise = creator.run(formData, "1");
    jest.advanceTimersByTime(500);
    const result = await promise;

    expect(result.createdAt).toBeDefined();
    expect(typeof result.createdAt).toBe("string");
  });

  it("should call repository.insert with the new task", async () => {
    const promise = creator.run(formData, "1");
    jest.advanceTimersByTime(500);
    await promise;

    expect(mockRepository.insert).toHaveBeenCalledTimes(1);
    expect(mockRepository.insert).toHaveBeenCalledWith(
      expect.objectContaining({
        title: "New Task",
        userId: "1",
      })
    );
  });

  it("should associate the task with the correct userId", async () => {
    const promise = creator.run(formData, "2");
    jest.advanceTimersByTime(500);
    const result = await promise;

    expect(result.userId).toBe("2");
  });
});
