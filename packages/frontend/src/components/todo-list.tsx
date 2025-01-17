import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TodoItem } from "./todo-item";
import { Task } from "../models";

interface TodoListProps {
  todos: Task[];
  onToggleStatus: (id: string) => void;
}

export function TodoList({ todos, onToggleStatus }: TodoListProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Task List</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {todos.length === 0 ? (
            <p className="text-center text-muted-foreground">No tasks added yet</p>
          ) : (
            todos.map((todo) => (
              <TodoItem 
                key={todo.id}
                todo={todo}
                onToggleStatus={onToggleStatus}
              />
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
}
