import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Task } from "@/models";
import { CheckCircle } from "lucide-react";

interface TodoItemProps {
  todo: Task;
  onToggleStatus: (id: string) => void;
}

export function TodoItem({ todo, onToggleStatus }: TodoItemProps) {
  return (
    <Card data-testid="todo-item">
      <CardContent className="p-4">
        <div className="flex items-start justify-between gap-4">
          <div className={`flex-1 ${todo.isDone ? 'text-muted-foreground line-through' : ''}`}>
            <h3 className="font-semibold">{todo.title}</h3>
            <p className="text-sm mt-1">
              {todo.description}
            </p>
          </div>
          <Button
            variant={todo.isDone ? "secondary" : "outline"}
            size="icon"
            onClick={() => onToggleStatus(todo.id)}
            className="shrink-0"
          >
            <CheckCircle className={`h-4 w-4 ${todo.isDone ? 'text-primary' : ''}`} />
            <span className="sr-only">
              {todo.isDone ? 'Mark as undone' : 'Mark as done'}
            </span>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
