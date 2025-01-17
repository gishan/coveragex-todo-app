import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle } from "lucide-react";

interface Todo {
  id: number;
  title: string;
  description: string;
  completed: boolean;
}

interface TodoItemProps {
  todo: Todo;
  onToggleStatus: (id: number) => void;
}

export function TodoItem({ todo, onToggleStatus }: TodoItemProps) {
  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex items-start justify-between gap-4">
          <div className={`flex-1 ${todo.completed ? 'text-muted-foreground line-through' : ''}`}>
            <h3 className="font-semibold">{todo.title}</h3>
            <p className="text-sm mt-1">
              {todo.description}
            </p>
          </div>
          <Button
            variant={todo.completed ? "secondary" : "outline"}
            size="icon"
            onClick={() => onToggleStatus(todo.id)}
            className="shrink-0"
          >
            <CheckCircle className={`h-4 w-4 ${todo.completed ? 'text-primary' : ''}`} />
            <span className="sr-only">
              {todo.completed ? 'Mark as undone' : 'Mark as done'}
            </span>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
