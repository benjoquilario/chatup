"use server"

import getCurrentUser from "@/utils/getCurrentUser"
import db from "@/lib/db"
import { pusherServer } from "@/lib/pusher"
import { revalidatePath } from "next/cache"

interface SaveConversations {
  userId: string
  isGroup?: boolean
  members?: Array<{ value: string; label: string }>
  name?: string
}

export async function saveConversations({
  userId,
  isGroup,
  members,
  name,
}: SaveConversations) {
  try {
    const currentUser = await getCurrentUser()

    if (!currentUser?.id || !currentUser?.email) throw new Error("Unauthorized")

    if (isGroup && (!members || members.length < 2 || !name)) {
      throw new Error("Invalid Data")
    }

    if (isGroup) {
      const createConversation = await db.conversation.create({
        data: {
          name,
          isGroup,
          users: {
            connect: [
              // @ts-expect-error
              ...members.map((member: { value: string }) => ({
                id: member.value,
              })),
              {
                id: currentUser.id,
              },
            ],
          },
        },
        include: {
          users: true,
        },
      })

      createConversation.users.forEach((user: any) => {
        if (user.email) {
          pusherServer.trigger(
            user.email,
            "conversation:new",
            createConversation
          )
        }
      })

      return createConversation
    }

    const existingConversation = await db.conversation.findMany({
      where: {
        OR: [
          {
            userIds: {
              equals: [currentUser.id, userId],
            },
          },
          {
            userIds: {
              equals: [userId, currentUser.id],
            },
          },
        ],
      },
    })

    const singleConversation = existingConversation[0]

    if (singleConversation) {
      return singleConversation
    }

    const createConversation = await db.conversation.create({
      data: {
        users: {
          connect: [
            {
              id: currentUser.id,
            },
            {
              id: userId,
            },
          ],
        },
      },
      include: {
        users: true,
      },
    })

    createConversation.users.map((user: any) => {
      if (user.email) {
        pusherServer.trigger(user.email, "conversation:new", createConversation)
      }
    })

    return createConversation
  } catch (error) {
    console.log(error)
    throw new Error("Internal Error")
  }
}

interface SendMessage {
  message: string
  conversationId: string
}

export async function sendMessage({ message, conversationId }: SendMessage) {
  try {
    const currentUser = await getCurrentUser()

    if (!currentUser?.id || !currentUser?.email) {
      throw new Error("Unauthorized")
    }

    const newMessage = await db.message.create({
      include: {
        seen: true,
        sender: true,
      },
      data: {
        body: message,
        conversation: {
          connect: {
            id: conversationId,
          },
        },
        sender: {
          connect: { id: currentUser.id },
        },
        seen: {
          connect: {
            id: currentUser.id,
          },
        },
      },
    })

    const updatedConversation = await db.conversation.update({
      where: {
        id: conversationId,
      },
      data: {
        lastMessageAt: new Date(),
        messages: {
          connect: {
            id: newMessage.id,
          },
        },
      },
      include: {
        users: true,
        messages: {
          include: {
            seen: true,
          },
        },
      },
    })

    await pusherServer.trigger(conversationId, "messages:new", newMessage)

    const lastMessage =
      updatedConversation.messages[updatedConversation.messages.length - 1]

    updatedConversation.users.map((user: any) => {
      pusherServer.trigger(user.email!, "conversation:update", {
        id: conversationId,
        messages: [lastMessage],
      })
    })

    return newMessage
  } catch (error) {
    console.log(error, "ERROR_MESSAGES")
    throw new Error("Error")
  }
}

type DeleteMessage = {
  messageId: string
  conversationId: string
}

export async function deleteMessage({
  messageId,
  conversationId,
}: DeleteMessage) {
  const currentUser = await getCurrentUser()

  if (!currentUser?.id || !currentUser?.email) {
    throw new Error("Unauthorized")
  }

  const updatedMessage = await db.message.update({
    where: {
      id: messageId,
    },
    data: {
      isDeleted: true,
      body: "",
      deletedAt: new Date(),
    },
    include: {
      sender: true,
      seen: true,
    },
  })

  await pusherServer.trigger(conversationId!, "message:update", updatedMessage)
}

type EditMessage = {
  id: string
  body: string
  conversationId: string
}

export async function editMessage({ id, body, conversationId }: EditMessage) {
  const currentUser = await getCurrentUser()

  if (!currentUser?.id || !currentUser?.email) {
    throw new Error("Unauthorized")
  }

  const updatedMessage = await db.message.update({
    where: {
      id,
    },
    data: {
      body,
    },
    include: {
      sender: true,
      seen: true,
    },
  })

  await pusherServer.trigger(conversationId!, "message:update", updatedMessage)
}
