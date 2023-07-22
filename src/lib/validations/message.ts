import * as z from 'zod';

export const messageSchema = z.object({
  chatId: z.string(),
  message: z.string(),
});
