import { getCurrentUser } from "@/lib/current-user"
import db from "@/lib/db"
import { pusherServer } from "@/lib/pusher"
import { NextResponse } from "next/server"

export async function POST(req: Request) {
  const body = await req.json()

  const { userId, isGroup, members, name } = body

  try {
    const currentUser = await getCurrentUser()

    if (!currentUser?.id || !currentUser?.email) {
      return new NextResponse("Unauthorized", { status: 400 })
    }

    if (isGroup && (!members || members.length < 2 || !name)) {
      return new NextResponse("Invalid Data", { status: 400 })
    }

    if (isGroup) {
      const createConversation = await db.conversation.create({
        data: {
          name,
          isGroup,
          users: {
            connect: [
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

      return NextResponse.json(createConversation)
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

    return NextResponse.json(createConversation)
  } catch (error) {
    return new NextResponse("Intervnal Error", {
      status: 500,
    })
  }
}
