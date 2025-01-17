# Todo Application

CoverageX - Todo Application - Assignment

## Prerequisites

- Node.js (v22 or higher)
- npm (v10 or higher)

## Installation

This project uses npm workspaces. To install all dependencies, run:

```bash
npm install
```

This will install dependencies for all packages in the workspace.

## Development

To start the react frontend application and the node.js backend application, run:

```bash
cd packages/frontend && npm run dev
```

```bash
cd packages/backend && npm run start
```

## Testing

### Unit Tests & Integration Tests

This project uses Vitest for unit testing. To run unit tests and integration tests for the backend, also for frontend unit tests:

```bash
# Run unit tests
npm run test
```

### End-to-End Tests

Cypress is used for end-to-end testing. To run Cypress tests:

```bash
# Open Cypress Test Runner
npm run cypress:open

# Run Cypress tests in headless mode
npm run cypress:run
```

## Project Structure

```
todo-app/
├── packages/
│   ├── frontend/     # React frontend application
│   └── frontend/     # Node.js backend application
├── cypress/          # End-to-end tests
│   ├── e2e/         # Test specifications
│   └── fixtures/    # Test data
└── package.json     # Root package.json for workspace configuration
```

## Docker Compose Build

```bash
docker-compose up --build
```