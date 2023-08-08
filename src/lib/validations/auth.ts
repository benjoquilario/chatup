import * as z from "zod"

export const userAuthSchema = z.object({
  name: z
    .string()
    .min(2, {
      message: "Name must be at least 2 characters",
    })
    .optional(),
  email: z.string().email(),
  password: z.string(),
})
