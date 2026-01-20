import { Button } from "@/core/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/core/components/ui/dialog"
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/core/components/ui/field"
import { Input } from "@/core/components/ui/input"
import { Textarea } from "@/core/components/ui/textarea"
import { todoCollection } from "@/todo/collection/todo-collection"
import type { Todo } from "@/todo/model/todo-model"
import type { DialogRootActions } from "@base-ui/react"
import { Dialog as DialogPrimitive } from "@base-ui/react/dialog"
import { zodResolver } from "@hookform/resolvers/zod"
import type React from "react"
import { useRef } from "react"
import { Controller, useForm } from "react-hook-form"
import { TbEdit, TbX } from "react-icons/tb"
import { toast } from "sonner"
import z from "zod"

// Schema
const EditTodo = z.object({
  title: z.string().min(1, "El título es obligatorio"),
  content: z.string().min(1, "El contenido es obligatorio"),
})

// Component
interface EditTodoDialogProps {
  todo: Todo
  show: boolean
  setShow: React.Dispatch<React.SetStateAction<boolean>>
}

export function EditTodoDialog({ todo, show, setShow }: EditTodoDialogProps) {
  // Dialog actions
  const actionsRef = useRef<DialogRootActions>(null)

  // Form
  const { control, handleSubmit, formState, reset } = useForm({
    resolver: zodResolver(EditTodo),
    defaultValues: {
      title: todo.title,
      content: todo.content,
    },
  })

  const onSubmit = handleSubmit(async (data) => {
    const tx = todoCollection.update(todo.id, (draft) => {
      draft.title = data.title
      draft.content = data.content
    })

    tx.isPersisted.promise
      .then(() => {
        actionsRef.current?.close()
        toast.success("Tarea editada correctamente")
        reset({ title: data.title, content: data.content })
      })
      .catch(() => {
        toast.error("Error al editar la tarea")
      })
  })

  return (
    <Dialog open={show} onOpenChange={setShow} actionsRef={actionsRef}>
      <DialogContent
        render={(props) => (
          <form {...props} onSubmit={onSubmit}>
            <DialogHeader>
              <DialogTitle>Editar tarea</DialogTitle>

              <DialogDescription className="sr-only">
                Rellena el formulario a continuación para editar la tarea.
              </DialogDescription>
            </DialogHeader>

            <FieldGroup>
              <Controller
                name="title"
                control={control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor={field.name}>Título</FieldLabel>

                    <Input
                      {...field}
                      id={field.name}
                      aria-invalid={fieldState.invalid}
                    />

                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              <Controller
                name="content"
                control={control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor={field.name}>Contenido</FieldLabel>

                    <Textarea
                      {...field}
                      id={field.name}
                      aria-invalid={fieldState.invalid}
                    />

                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            </FieldGroup>

            <DialogFooter>
              <Button type="submit" disabled={formState.isSubmitting}>
                <TbEdit /> {formState.isSubmitting ? "Editando..." : "Editar"}
              </Button>
            </DialogFooter>

            {/* Close button */}
            <DialogPrimitive.Close
              data-slot="dialog-close"
              render={
                <Button
                  variant="ghost"
                  className="absolute top-2 right-2"
                  size="icon-sm"
                />
              }
            >
              <TbX />
              <span className="sr-only">Close</span>
            </DialogPrimitive.Close>
          </form>
        )}
      />
    </Dialog>
  )
}
