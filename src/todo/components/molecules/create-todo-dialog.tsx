import { Button } from "@/core/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
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
import type { DialogRootActions } from "@base-ui/react"
import { Dialog as DialogPrimitive } from "@base-ui/react/dialog"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRef } from "react"
import { Controller, useForm } from "react-hook-form"
import { TbPlus, TbX } from "react-icons/tb"
import { toast } from "sonner"
import { v7 } from "uuid"
import z from "zod"

// Schema
const CreateTodo = z.object({
  title: z.string().min(1, "El título es obligatorio"),
  content: z.string().min(1, "El contenido es obligatorio"),
})

// Component
export function CreateTodoDialog() {
  // Dialog actions
  const actionsRef = useRef<DialogRootActions>(null)

  // Form
  const { control, handleSubmit, formState, reset } = useForm({
    resolver: zodResolver(CreateTodo),
    defaultValues: {
      title: "",
      content: "",
    },
  })

  const onSubmit = handleSubmit(async (data) => {
    const tx = todoCollection.insert({
      ...data,
      id: v7(),
      status: 0,
    })

    tx.isPersisted.promise
      .then(() => {
        actionsRef.current?.close()
        toast.success("Tarea creada correctamente")
        reset()
      })
      .catch(() => {
        toast.error("Error al crear la tarea")
      })
  })

  return (
    <Dialog actionsRef={actionsRef}>
      <DialogTrigger
        render={
          <Button>
            <TbPlus /> Añadir
          </Button>
        }
      />

      <DialogContent
        render={(props) => (
          <form {...props} onSubmit={onSubmit}>
            <DialogHeader>
              <DialogTitle>Crear una nueva tarea</DialogTitle>

              <DialogDescription className="sr-only">
                Rellena el formulario a continuación para crear una nueva tarea.
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
                <TbPlus /> {formState.isSubmitting ? "Creando..." : "Añadir"}
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
