import { Button } from "@/core/components/ui/button"
import { Field, FieldError } from "@/core/components/ui/field"
import { Input } from "@/core/components/ui/input"
import { useTodoLive } from "@/todo/hooks/use-todo-live"
import { useTodoQ } from "@/todo/hooks/use-todo-q"
import { zodResolver } from "@hookform/resolvers/zod"
import { useEffect } from "react"
import { Controller, useForm } from "react-hook-form"
import { TbSearch } from "react-icons/tb"
import { useDebounce } from "react-use"
import z from "zod"

// Schema
const SearchQuery = z.object({
  q: z.string().min(0).max(125, { error: "Máximo 125 caracteres" }),
})

// Component
export function SearchTodoInput() {
  // Todo live
  const { isLoading } = useTodoLive()

  // Todo query
  const { todoQ, setTodoQ } = useTodoQ()

  // Form
  const { control, handleSubmit, watch, trigger, reset } = useForm({
    resolver: zodResolver(SearchQuery),
    defaultValues: {
      q: "",
    },
  })

  // Update query
  const q = watch("q")

  const [, cancel] = useDebounce(
    async () => {
      await trigger()
      setTodoQ(q)
    },
    1000,
    [q],
  )

  const onSubmit = handleSubmit((data) => {
    cancel()
    setTodoQ(data.q)
  })

  // Reconcile with query param
  useEffect(() => {
    reset({ q: todoQ })
  }, [todoQ, reset])

  return (
    <form className="flex-1 gap-1 flex" onSubmit={onSubmit}>
      <Controller
        name="q"
        control={control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <Input
              {...field}
              id={field.name}
              aria-invalid={fieldState.invalid}
              placeholder="Buscar tarea..."
            />
            {fieldState.error && (
              <FieldError>{fieldState.error.message}</FieldError>
            )}
          </Field>
        )}
      />

      <Button variant="outline" size="icon" type="submit" disabled={isLoading}>
        <TbSearch />
      </Button>
    </form>
  )
}
