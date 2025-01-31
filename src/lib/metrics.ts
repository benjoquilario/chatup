import "server-only"
import db from "./db"
import type { Conversation } from "@prisma/client"
import { getCurrentUser } from "./current-user"
import { auth } from "@/auth"

export async function getUsers() {
  const session = await auth()

  if (!session?.user.email) return []

  return await db.user.findMany({
    orderBy: {
      createdAt: "desc",
    },
    where: {
      NOT: {
        email: session.user.email,
      },
    },
  })
}

export async function getChatMessages(conversationId: Conversation["id"]) {
  const messages = await db.message.findMany({
    where: {
      conversationId,
    },
    include: {
      user: true,
    },
    orderBy: {
      createdAt: "desc",
    },
    take: 5,
    skip: 0,
  })

  return messages
}

export async function getConversations() {
  const currentUser = await getCurrentUser()

  if (!currentUser) return []

  const conversations = await db.conversation.findMany({
    orderBy: {
      lastMessageAt: "desc",
    },
    where: {
      userId: {
        has: currentUser.id,
      },
    },
    include: {
      users: true,
      messages: {
        include: {
          user: true,
        },
      },
    },
  })

  if (!conversations) return []

  return conversations
}
