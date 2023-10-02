import ChatBody from "@/components/chat/chat-body"
import ChatHeader from "@/components/chat/chat-header"
import ChatList from "@/components/chat/chat-list"
import getCurrentUser from "@/utils/getCurrentUser"
import db from "@/lib/db"
import type { Conversation } from "@prisma/client"
import React from "react"
import getSession from "@/utils/getSession"
import { notFound } from "next/navigation"
import getChatMessages from "@/utils/getMessages"
import getConversations from "@/utils/getConversation"

async function getConversationForUser(conversationId: Conversation["id"]) {
  const currentUser = await getCurrentUser()

  if (!currentUser?.email) {
    return null
  }

  const conversation = await db.conversation.findUnique({
    where: {
      id: conversationId,
    },
    include: {
      users: true,
    },
  })

  return conversation
}

interface ChatPageProps {
  params: {
    conversationId: string
  }
}

export default async function ChatPage({ params }: ChatPageProps) {
  const session = await getSession()
  const { conversationId } = params

  if (!session) notFound()

  const messages = await getChatMessages(conversationId)
  const conversation = await getConversationForUser(conversationId)
  const conversations = await getConversations()

  if (!conversation)
    return <div className="h-full lg:pl-80">No Conversation Found</div>

  return (
    <>
      <div className="hidden md:block">
        <ChatList conversations={conversations} />
      </div>
      <ChatBody initialMessages={messages}>
        <ChatHeader conversation={conversation} />
      </ChatBody>
    </>
  )
}
