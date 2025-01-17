import { render, screen, fireEvent } from '@testing-library/react';
import { TodoItem } from './todo-item';
import { describe, it, expect, vi } from 'vitest';

describe('TodoItem Component', () => {
  const mockTodo = {
    id: 1,
    title: 'Test Todo',
    description: 'Test Description',
    completed: false,
  };

  const mockCompletedTodo = {
    ...mockTodo,
    completed: true,
  };

  it('renders todo content correctly', () => {
    render(<TodoItem todo={mockTodo} onToggleStatus={() => {}} />);
    
    expect(screen.getByText('Test Todo')).toBeInTheDocument();
    expect(screen.getByText('Test Description')).toBeInTheDocument();
  });

  it('applies correct styles when todo is incomplete', () => {
    render(<TodoItem todo={mockTodo} onToggleStatus={() => {}} />);
    
    const container = screen.getByText('Test Todo').closest('div');
    expect(container).not.toHaveClass('text-muted-foreground');
    expect(container).not.toHaveClass('line-through');
  });

  it('applies correct styles when todo is completed', () => {
    render(<TodoItem todo={mockCompletedTodo} onToggleStatus={() => {}} />);
    
    const container = screen.getByText('Test Todo').closest('div');
    expect(container).toHaveClass('text-muted-foreground');
    expect(container).toHaveClass('line-through');
  });

  it('calls onToggleStatus with correct id when button is clicked', () => {
    const mockOnToggleStatus = vi.fn();
    render(<TodoItem todo={mockTodo} onToggleStatus={mockOnToggleStatus} />);
    
    const button = screen.getByRole('button');
    fireEvent.click(button);
    
    expect(mockOnToggleStatus).toHaveBeenCalledWith(1);
  });

  it('shows correct button text based on todo status', () => {
    const { rerender } = render(<TodoItem todo={mockTodo} onToggleStatus={() => {}} />);
    expect(screen.getByText('Mark as done')).toBeInTheDocument();
    
    rerender(<TodoItem todo={mockCompletedTodo} onToggleStatus={() => {}} />);
    expect(screen.getByText('Mark as undone')).toBeInTheDocument();
  });
});
