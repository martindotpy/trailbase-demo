import { Button } from "@/core/components/ui/button"
import { Checkbox } from "@/core/components/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/core/components/ui/dropdown-menu"
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemTitle,
} from "@/core/components/ui/item"
import { todoCollection } from "@/todo/collection/todo-collection"
import { EditTodoDialog } from "@/todo/components/molecules/edit-todo-dialog"
import type { Todo } from "@/todo/model/todo-model"
import { useRef, useState } from "react"
import { TbDotsVertical, TbEdit, TbTrash } from "react-icons/tb"
import { toast } from "sonner"

// Component
interface TodoItemProps {
  todo: Todo
}

export function TodoItem({ todo }: TodoItemProps) {
  // Checkbox
  const checkboxInputRef = useRef<HTMLInputElement>(null)

  // Edit dialog
  const [showEditDialog, setShowEditDialog] = useState(false)

  return (
    <Item
      key={todo.id}
      variant="outline"
      onClick={() => checkboxInputRef.current?.click()}
    >
      <ItemContent>
        <ItemTitle>{todo.title}</ItemTitle>
        <ItemDescription>{todo.content}</ItemDescription>
      </ItemContent>

      <ItemActions>
        <Checkbox
          inputRef={checkboxInputRef}
          className="size-7"
          checked={Boolean(todo.status)}
          onCheckedChange={(checked) => {
            const tx = todoCollection.update(todo.id, (draft) => {
              draft.status = Number(checked)
            })

            tx.isPersisted.promise
              .then(() => {
                toast.success(
                  checked
                    ? "Tarea marcada como completada"
                    : "Tarea marcada como pendiente"
                )
              })
              .catch(() => {
                toast.error("Error al actualizar el estado de la tarea")
              })
          }}
          onClick={(e) => e.stopPropagation()}
        />

        <DropdownMenu modal={false}>
          <DropdownMenuTrigger
            render={
              <Button variant="secondary" size="icon">
                <TbDotsVertical />
              </Button>
            }
            onClick={(e) => e.stopPropagation()}
          />

          <DropdownMenuContent>
            <DropdownMenuItem
              onClick={() => {
                setShowEditDialog(true)
              }}
            >
              <TbEdit /> Editar
            </DropdownMenuItem>

            <DropdownMenuItem
              variant="destructive"
              onClick={() => {
                const tx = todoCollection.delete(todo.id)

                tx.isPersisted.promise
                  .then(() => {
                    toast.success("Tarea eliminada correctamente")
                  })
                  .catch(() => {
                    toast.error("Error al eliminar la tarea")
                  })
              }}
            >
              <TbTrash />
              Eliminar
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <EditTodoDialog
          todo={todo}
          show={showEditDialog}
          setShow={setShowEditDialog}
        />
      </ItemActions>
    </Item>
  )
}
