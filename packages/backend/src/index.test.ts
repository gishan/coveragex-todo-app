import { describe, it, expect, vi } from "vitest";
import request from "supertest";
import app from "./index";

vi.mock("./service", () => {
  return {
    fetchLatestTasks: vi.fn().mockResolvedValue([
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
    createTask: vi.fn().mockResolvedValue({
      id: "550e8400-e29b-41d4-a716-446655440000",
      title: "Task 6",
      description: "Description 6",
      isDone: false,
    }),
    markTaskAsDone: vi.fn().mockResolvedValue({
      id: "550e8400-e29b-41d4-a716-446655440000",
      title: "Task 6",
      description: "Description 6",
      isDone: true,
    }),
  };
});

describe("Backend Application Tests", () => {
  it("should return true for a simple test", () => {
    expect(true).toBe(true);
  });
});

describe("GET /tasks - latest 5 tasks", () => {
  it("should be defined", async () => {
    const response = await request(app).get("/tasks");
    expect(response.status).toBe(200);
  });

  it("should return json", async () => {
    const response = await request(app).get("/tasks");
    expect(response.body).toBeInstanceOf(Object);
  });

  it("should return tasks inside the json and it should be an array", async () => {
    const response = await request(app).get("/tasks");
    expect(response.body.tasks).toBeDefined();
    expect(response.body.tasks).toBeInstanceOf(Array);
  });

  it("should returned tasks array should be always less or equal than 5", async () => {
    const response = await request(app).get("/tasks");
    expect(response.body.tasks).toBeDefined();
    expect(response.body.tasks.length).toBeLessThanOrEqual(5);
  });
});

describe("POST /tasks - create a task", () => {
  it("should be defined", async () => {
    const response = await request(app).post("/tasks");
    expect(response.status).toBe(200);
  });

  it("should have name and description in the request body", async () => {
    const newTask = {
      title: "Task 6",
      description: "Description 6",
    };
    const response = await request(app)
      .post("/tasks")
      .send({ title: newTask.title, description: newTask.description })
      .set("Accept", "application/json");

    expect(response.body.task.title).toBe(newTask.title);
    expect(response.body.task.description).toBe(newTask.description);
  });
});

describe("PATCH /tasks/:id/done - mark a task as done", () => {
  it("should be defined", async () => {
    const id = "550e8400-e29b-41d4-a716-446655440000";
    const response = await request(app).patch(`/tasks/${id}/done`).set("Accept", "application/json");;
    expect(response.status).toBe(200);
  });

  it("should have name and description in the request body", async () => {
    const id = "550e8400-e29b-41d4-a716-446655440000";
    const response = await request(app)
      .patch(`/tasks/${id}/done`)
      .set("Accept", "application/json");

    expect(response.body.task.id).toBe(id);
    expect(response.body.task.isDone).toBe(true);
  });
});
