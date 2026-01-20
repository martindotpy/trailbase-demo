import z from "zod"

// Schema
export const Todo = z.object({
  id: z.string(),
  title: z.string(),
  content: z.string(),
  status: z.int(),
})

// Type
export type Todo = z.infer<typeof Todo>
