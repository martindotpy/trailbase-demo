import { ThemeToggle } from "@/core/components/molecules/theme-toggle"
import { TodoBar } from "@/todo/components/organisms/todo-bar"
import { TodoList } from "@/todo/components/organisms/todo-list"
import { createFileRoute } from "@tanstack/react-router"

// Route
export const Route = createFileRoute("/")({
  component: IndexPage,
})

function IndexPage() {
  return (
    <main className="mx-auto max-w-7xl flex flex-col gap-6 p-4 mt-4 relative">
      <h1 className="font-black text-2xl md:text-3xl text-center lg:text-4xl">
        Todo
      </h1>

      <ThemeToggle className="absolute translate-y-1/2 top-0 right-4" />

      <TodoBar />

      <TodoList />
    </main>
  )
}
