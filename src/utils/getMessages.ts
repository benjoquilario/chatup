import type { Conversation } from '@prisma/client';
import db from '@/lib/db';

export default async function getChatMessages(
  conversationId: Conversation['id']
) {
  const messages = await db.message.findMany({
    where: {
      conversationId,
    },
    include: {
      sender: true,
      seen: true,
    },
    orderBy: {
      createdAt: 'asc',
    },
  });

  return messages;
}
