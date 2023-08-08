import db from "@/lib/db"
import getCurrentUser from "./getCurrentUser"

const getConversations = async () => {
  const currentUser = await getCurrentUser()

  if (!currentUser?.id) return []

  const conversations = await db.conversation.findMany({
    orderBy: {
      lastMessageAt: "desc",
    },
    where: {
      userIds: {
        has: currentUser.id,
      },
    },
    include: {
      users: true,
      messages: {
        include: {
          sender: true,
          seen: true,
        },
      },
    },
  })

  return conversations
}

export default getConversations
