import ConversationHeader from "@/components/conversation/conversation-header"
import ChatBody from "@/components/chat/chat-body"
import ChatForm from "@/components/chat/chat-form"
import ChatHeader from "@/components/chat/chat-header"
import ChatList from "@/components/chat/chat-list"
import type { Conversation } from "@prisma/client"

import React from "react"
import { notFound } from "next/navigation"
import { getCurrentUser } from "@/lib/current-user"
import db from "@/lib/db"
import { getChatMessages, getConversations } from "@/lib/metrics"
import { auth } from "@/auth"

interface ConversationsProps {
  params: {
    conversationId: string
  }
}

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

export default async function Conversations({ params }: ConversationsProps) {
  const session = await auth()
  const { conversationId } = params

  if (!session) notFound()

  const messages = await getChatMessages(conversationId)
  const conversation = await getConversationForUser(conversationId)
  const conversations = await getConversations()

  if (!conversation)
    return <div className="h-full lg:pl-80">No Conversation Found</div>

  console.log(messages)

  return (
    <>
      <div className="hidden md:block">
        <div className="w-96 p-3">
          <ChatHeader />
          <ChatList conversations={conversations} />
        </div>
      </div>
      <div className="relative flex w-full flex-col">
        <ConversationHeader />
        <ChatBody initialMessages={messages} />
        <ChatForm />
      </div>
    </>
  )
}
