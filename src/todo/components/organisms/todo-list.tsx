import { TodoItem } from "@/todo/components/molecules/todo-item"
import { useTodoLive } from "@/todo/hooks/use-todo-live"

// Component
export function TodoList() {
  const { todos } = useTodoLive()

  return (
    <div className="flex flex-col gap-2">
      {todos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </div>
  )
}
