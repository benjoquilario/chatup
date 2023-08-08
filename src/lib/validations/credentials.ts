import { z } from "zod"

export const credentialsValidator = z.object({
  email: z.string().email(),
  password: z.string(),
})

export const registerValidator = credentialsValidator.extend({
  name: z.string().optional(),
})
