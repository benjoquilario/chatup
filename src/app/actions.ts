"use server"

import { getCurrentUser } from "@/lib/current-user"
import db from "@/lib/db"
import { pusherServer } from "@/lib/pusher"
import { redirect } from "next/navigation"

export async function sendMessage({
  message,
  conversationId,
}: {
  message: string
  conversationId: string
}) {
  try {
    const currentUser = await getCurrentUser()

    if (!currentUser?.id || !currentUser?.email) throw new Error("Unauthorized")

    const newMessage = await db.message.create({
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
      include: {
        sender: {
          select: {
            email: true,
            image: true,
            name: true,
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
            sender: true,
          },
        },
      },
    })

    await pusherServer.trigger(conversationId, "messages:new", newMessage)

    const lastMessage =
      updatedConversation.messages[updatedConversation.messages.length - 1]

    updatedConversation.users.map((user) => {
      pusherServer.trigger(user.email!, "conversation:update", {
        id: conversationId,
        messages: [lastMessage],
      })
    })

    return newMessage
  } catch (error) {
    throw new Error("Error")
  }
}

interface ICreateConversations {
  userId: string
  isGroup?: boolean
  members?: Array<{ value: string; label: string }>
  name?: string
}

export async function createConversation(convo: ICreateConversations) {
  const { userId, isGroup, members, name } = convo

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

    if (singleConversation) return singleConversation

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

    createConversation.users.map((user) => {
      if (user.email) {
        pusherServer.trigger(user.email, "conversation:new", createConversation)
      }
    })

    return createConversation
  } catch (error) {
    return {
      message: "Internal Error",
      status: 500,
    }
  }
}
