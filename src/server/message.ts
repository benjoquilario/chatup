"use server"

import db from "@/lib/db"
import { getCurrentUser } from "@/lib/current-user"
import { pusherServer } from "@/lib/pusher"
import type {
  SendMessage,
  DeleteMessage,
  EditMessage,
} from "@/lib/validations/message"
import { redirect } from "next/navigation"

export async function sendMessage(data: SendMessage) {
  const { conversationId, message } = data

  try {
    const currentUser = await getCurrentUser()

    if (!currentUser) redirect("/auth/login")

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
            id: true,
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

export async function deleteMessage(data: DeleteMessage) {
  const { messageId, conversationId } = data

  try {
    const currentUser = await getCurrentUser()

    if (!currentUser) redirect("/auth/login")

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

    await pusherServer.trigger(
      conversationId!,
      "message:update",
      updatedMessage
    )

    return {
      status: 200,
      message: "Message Deleted",
      ok: true,
    }
  } catch (error) {
    return {
      status: 500,
      ok: false,
      message: "Internal Error",
    }
  }
}

export async function editMessage(data: EditMessage) {
  const { messageId, body, conversationId } = data

  try {
    const currentUser = await getCurrentUser()

    if (!currentUser?.id || !currentUser?.email) {
      throw new Error("Unauthorized")
    }

    const updatedMessage = await db.message.update({
      where: {
        id: messageId,
      },
      data: {
        body,
      },
      include: {
        sender: true,
        seen: true,
      },
    })

    await pusherServer.trigger(
      conversationId!,
      "message:update",
      updatedMessage
    )

    return {
      ok: true,
      status: 200,
      message: "Message updated",
    }
  } catch (error) {
    return {
      ok: false,
      status: 500,
      message: "Internal Error",
    }
  }
}
