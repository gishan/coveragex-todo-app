import { describe, it, expect, vi } from "vitest";
import { fetchLatestTasks, createTask, markTaskAsDone } from "./service";

vi.mock("./prisma", () => {
  return {
    default: {
      task: {
        findMany: vi.fn().mockResolvedValue([
          {
            id: "550e8400-e29b-41d4-a716-446655440000",
            title: "Task 1",
            description: "Description 1",
            isDone: false,
          },
          {
            id: "123e4567-e89b-12d3-a456-426614174000",
            title: "Task 2",
            description: "Description 2",
            isDone: false,
          },
          {
            id: "fa7ac10b-58cc-4372-a567-0e02b2c3d479",
            title: "Task 3",
            description: "Description 3",
            isDone: false,
          },
          {
            id: "9b2e5d16-8e4b-4d8a-9f4b-2b9e5d168e4b",
            title: "Task 4",
            description: "Description 4",
            isDone: false,
          },
          {
            id: "3d6f0a88-9dac-4d5e-8b7e-3d6f0a889dac",
            title: "Task 5",
            description: "Description 5",
            isDone: false,
          },
        ]),
        create: vi.fn().mockResolvedValue({
          id: "550e8400-e29b-41d4-a716-446655440000",
          title: "Task 6",
          description: "Description 6",
          isDone: false,
        }),
        update: vi.fn().mockResolvedValue({
          id: "550e8400-e29b-41d4-a716-446655440000",
          title: "Task 6",
          description: "Description 6",
          isDone: true,
        }),
      },
    },
  };
});

describe("Task Service", () => {
  describe("fetchLatestTasks", () => {
    it("should be defined", () => {
      expect(fetchLatestTasks).toBeDefined();
    });

    it("should return an array", async () => {
      const tasks = await fetchLatestTasks();
      expect(Array.isArray(tasks)).toBe(true);
      expect(tasks).toHaveLength(5);
      expect(tasks[0]).toEqual({
        id: "550e8400-e29b-41d4-a716-446655440000",
        title: "Task 1",
        description: "Description 1",
        isDone: false,
      });
      expect(tasks[1]).toEqual({
        id: "123e4567-e89b-12d3-a456-426614174000",
        title: "Task 2",
        description: "Description 2",
        isDone: false,
      });
      expect(tasks[2]).toEqual({
        id: "fa7ac10b-58cc-4372-a567-0e02b2c3d479",
        title: "Task 3",
        description: "Description 3",
        isDone: false,
      });
      expect(tasks[3]).toEqual({
        id: "9b2e5d16-8e4b-4d8a-9f4b-2b9e5d168e4b",
        title: "Task 4",
        description: "Description 4",
        isDone: false,
      });
      expect(tasks[4]).toEqual({
        id: "3d6f0a88-9dac-4d5e-8b7e-3d6f0a889dac",
        title: "Task 5",
        description: "Description 5",
        isDone: false,
      });
    });
  });

  describe("createTask", () => {
    it("should be defined", () => {
      expect(createTask).toBeDefined();
    });

    it("should create a task", async () => {
      const task = await createTask("Task 6", "Description 6");
      expect(task).toEqual({
        id: "550e8400-e29b-41d4-a716-446655440000",
        title: "Task 6",
        description: "Description 6",
        isDone: false,
      });
    });
  });

  describe("mark a task as done", () => {
    it("should be defined", () => {
      expect(markTaskAsDone).toBeDefined();
    });

    it("should update the given task's done as true", async () => {
      const task = await markTaskAsDone("550e8400-e29b-41d4-a716-446655440000");
      expect(task).toEqual({
        id: "550e8400-e29b-41d4-a716-446655440000",
        title: "Task 6",
        description: "Description 6",
        isDone: true,
      });
      expect(task.isDone).toBe(true);
    });
  });
});
