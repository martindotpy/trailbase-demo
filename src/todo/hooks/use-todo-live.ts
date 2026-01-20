import { todoCollection } from "@/todo/collection/todo-collection"
import { useTodoQ } from "@/todo/hooks/use-todo-q"
import { like, or, useLiveQuery } from "@tanstack/react-db"

// Hook
export function useTodoLive() {
  // Todo Q
  const { todoQ } = useTodoQ()
  const todoQLikeExpression = "%" + todoQ + "%"

  // Live query
  const { data: todos, ...restLiveQuery } = useLiveQuery(
    (q) =>
      q
        .from({ todo: todoCollection })
        .where(({ todo }) =>
          or(
            like(todo.title, todoQLikeExpression),
            like(todo.content, todoQLikeExpression),
          ),
        ),
    [todoQLikeExpression],
  )

  return { todos, ...restLiveQuery }
}
