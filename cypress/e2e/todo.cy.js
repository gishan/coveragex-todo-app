describe("Todo App", () => {
  beforeEach(() => {
    // Reset API state and visit the app before each test
    cy.intercept("GET", "**/tasks", { fixture: "tasks.json" }).as("getTasks");
    cy.visit("/");
  });

  it("should display the todo application title", () => {
    cy.contains("h1", "Todo Application").should("be.visible");
  });

  it("should add a new todo", () => {
    const newTodo = {
      id: "123",
      title: "Test Todo",
      description: "Test Description",
    };

    // Intercept POST request
    cy.intercept("POST", "**/tasks", {
      statusCode: 200,
      body: {
        task: {
          ...newTodo,
          done: false,
          createdAt: new Date().toISOString(),
        },
      },
    }).as("createTask");

    cy.intercept("GET", "**/tasks", {
      body: {
        tasks: [
          {
            ...newTodo,
            done: false,
            createdAt: new Date().toISOString(),
          },
          {
            id: "1",
            title: "Example Todo 1",
            description: "This is an example todo",
            done: false,
            createdAt: "2024-01-17T12:00:00Z",
          },
          {
            id: "2",
            title: "Example Todo 2",
            description: "This is another example todo",
            done: true,
            createdAt: "2024-01-17T13:00:00Z",
          },
        ],
      },
    }).as("getTasks");

    // Fill out the form
    cy.get('input[placeholder*="title"]').type(newTodo.title);
    cy.get('textarea[placeholder*="description"]').type(newTodo.description);

    // Submit the form
    cy.get("form").submit();

    // Verify the request was made
    cy.wait("@createTask");

    // Verify the response
    cy.wait("@getTasks");

    // Verify the todo was added to the list
    cy.contains(newTodo.title).should("be.visible");
    cy.contains(newTodo.description).should("be.visible");
  });

  it("should toggle todo status", () => {
    // Intercept the PATCH request
    cy.intercept("PATCH", "**/tasks/*/done", {
      statusCode: 200,
      body: { success: true },
    }).as("toggleTask");

    cy.intercept("GET", "**/tasks", {
      body: {
        tasks: [
          {
            id: "2",
            title: "Example Todo 2",
            description: "This is another example todo",
            done: true,
            createdAt: "2024-01-17T13:00:00Z",
          }
        ],
      },
    }).as("getTasks");

    // Click the toggle button on the first todo
    cy.get('[data-testid="todo-item"]')
      .first()
      .within(() => {
        cy.get('button').click();
      });

    // Verify the request was made
    cy.wait("@toggleTask");

    // Verify the response
    cy.wait("@getTasks");

    // Verify the todo was toggled
    cy.get('[data-testid="todo-item"]')
      .first()
      .within(() => {
        cy.contains("Example Todo 2").should("be.visible");
        cy.contains("This is another example todo").should("be.visible");
      });
  });

  it("should contain max 5 items in the list", () => {
    const tasks = [
      {
        id: "5",
        title: "Example Todo 5",
        description: "This is another example todo",
        done: true,
        createdAt: "2024-01-17T13:00:00Z",
      },
      {
        id: "4",
        title: "Example Todo 4",
        description: "This is another example todo",
        done: true,
        createdAt: "2024-01-17T13:00:00Z",
      },
      {
        id: "3",
        title: "Example Todo 3",
        description: "This is another example todo",
        done: true,
        createdAt: "2024-01-17T13:00:00Z",
      },
      {
        id: "2",
        title: "Example Todo 2",
        description: "This is another example todo",
        done: true,
        createdAt: "2024-01-17T13:00:00Z",
      },
      {
        id: "1",
        title: "Example Todo 1",
        description: "This is an example todo",
        done: false,
        createdAt: "2024-01-17T12:00:00Z",
      },
    ];
    // initial fetch with 5 items
    cy.intercept("GET", "**/tasks", {
      body: {
        tasks,
      },
    }).as("getTasks");

    cy.wait("@getTasks");
    // There should be 5 items in the list
    cy.get('[data-testid="todo-item"]').should("have.length", 5);

    const newTodo = {
      id: "6",
      title: "Test Todo 6",
      description: "Test Description 6",
    };

    // Intercept POST request
    cy.intercept("POST", "**/tasks", {
      statusCode: 200,
      body: {
        task: {
          ...newTodo,
          done: false,
          createdAt: new Date().toISOString(),
        },
      },
    }).as("createTask");

    cy.intercept("GET", "**/tasks", {
      body: {
        tasks: [
          {
            ...newTodo,
            done: false,
            createdAt: new Date().toISOString(),
          },
          ...tasks.slice(0, -1),
        ],
      },
    }).as("refreshTasks");

    // Fill out the form
    cy.get('input[placeholder*="title"]').type(newTodo.title);
    cy.get('textarea[placeholder*="description"]').type(newTodo.description);

    // Submit the form
    cy.get("form").submit();

    // Verify the request was made
    cy.wait("@createTask");

    // refresh the task list
    cy.wait("@refreshTasks");

    // Verify the todo was added to the list
    cy.get('[data-testid="todo-item"]').should("have.length", 5);
    cy.get('[data-testid="todo-item"]')
      .first()
      .within(() => {
        cy.contains(newTodo.title).should("be.visible");
        cy.contains(newTodo.description).should("be.visible");
      });
  });
});
