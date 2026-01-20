import { todoQStore } from "@/todo/store/todo-q-store"
import { useStore } from "@nanostores/react"

// Hook
export function useTodoQ() {
  const todoQ = useStore(todoQStore.$value)

  return {
    todoQ: todoQ?.trim() ?? "",
    setTodoQ: todoQStore.update,
  }
}
