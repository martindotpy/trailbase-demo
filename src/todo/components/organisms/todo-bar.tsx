import { CreateTodoDialog } from "@/todo/components/molecules/create-todo-dialog"
import { SearchTodoInput } from "@/todo/components/molecules/search-todo-input"

// Component
export function TodoBar() {
  return (
    <div className="flex gap-2">
      <SearchTodoInput />

      <CreateTodoDialog />
    </div>
  )
}
