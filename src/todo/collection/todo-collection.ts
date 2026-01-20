import { trailbaseClient } from "@/core/client/trailbase-client"
import type { Todo } from "@/todo/model/todo-model"
import { createCollection } from "@tanstack/react-db"
import { trailBaseCollectionOptions } from "@tanstack/trailbase-db-collection"

// Collection
export const todoCollection = createCollection(
  trailBaseCollectionOptions<Todo>({
    id: "todo",
    recordApi: trailbaseClient.records("todo"),
    getKey: (item) => item.id,
    parse: {},
    serialize: {},
  }),
)
