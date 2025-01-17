import { render, screen } from '@testing-library/react';
import { TodoList } from './todo-list';
import { describe, it, expect } from 'vitest';

describe('TodoList Component', () => {
  const mockTodos = [
    {
      id: 1,
      title: 'Test Todo 1',
      description: 'Test Description 1',
      completed: false,
    },
    {
      id: 2,
      title: 'Test Todo 2',
      description: 'Test Description 2',
      completed: true,
    },
  ];

  it('renders empty state when no todos are provided', () => {
    render(<TodoList todos={[]} onToggleStatus={() => {}} />);
    
    expect(screen.getByText('No tasks added yet')).toBeInTheDocument();
  });

  it('renders todos with correct content', () => {
    render(<TodoList todos={mockTodos} onToggleStatus={() => {}} />);
    
    // Check if titles are rendered
    expect(screen.getByText('Test Todo 1')).toBeInTheDocument();
    expect(screen.getByText('Test Todo 2')).toBeInTheDocument();
    
    // Check if descriptions are rendered
    expect(screen.getByText('Test Description 1')).toBeInTheDocument();
    expect(screen.getByText('Test Description 2')).toBeInTheDocument();
  });

  it('renders the correct number of todos', () => {
    render(<TodoList todos={mockTodos} onToggleStatus={() => {}} />);
    
    const todoCards = screen.getAllByRole('heading', { level: 3 });
    expect(todoCards).toHaveLength(2);
  });
});
