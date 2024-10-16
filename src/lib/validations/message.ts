import * as z from "zod"

const messageValidator = z.object({
  conversationId: z.string(),
})

export const sendMessageValidator = messageValidator.extend({
  message: z.string(),
})

export const deleteMessageValidator = messageValidator.extend({
  messageId: z.string(),
})

export const editMessageValidator = messageValidator.extend({
  messageId: z.string(),
  body: z.string(),
})

export type SendMessage = z.infer<typeof sendMessageValidator>
export type DeleteMessage = z.infer<typeof deleteMessageValidator>
export type EditMessage = z.infer<typeof editMessageValidator>
