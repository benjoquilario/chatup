import * as z from "zod"

export const userAuthSchema = z.object({
  email: z.string().email("THe email address is badly formatted"),
  password: z.string(),
})

export const registerAuthSchema = userAuthSchema.extend({
  firstName: z.string().min(2, {
    message: "LastName must be at least 2 characters",
  }),
  lastName: z.string().min(2, {
    message: "LastName must be at least 2 characters",
  }),
})

export type AuthUsers = z.infer<typeof userAuthSchema>
export type RegisterUser = z.infer<typeof registerAuthSchema>
