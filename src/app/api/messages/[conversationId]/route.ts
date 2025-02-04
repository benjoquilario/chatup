import { auth } from "@/auth"
import db from "@/lib/db"
import { type NextRequest, NextResponse } from "next/server"

export async function GET(
  req: NextRequest,
  { params }: { params: { conversationId: string } }
) {
  const conversationId = params.conversationId
  const searchParams = req.nextUrl.searchParams
  const limit = searchParams.get("limit")
  const skip = searchParams.get("cursor")
  const session = await auth()

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
    take: Number(limit) || 5,
    skip: Number(skip) || 0,
  })

  if (messages.length === 0) {
    return NextResponse.json({
      messages: [],
      hasNextPage: false,
      nextSkip: null,
    })
  }

  return NextResponse.json({
    messages,
    hasNextPage: messages.length < (Number(limit) || 5) ? false : true,
    nextSkip:
      messages.length < (Number(limit) || 5)
        ? null
        : ((Number(skip) + Number(limit)) as number),
  })
}
