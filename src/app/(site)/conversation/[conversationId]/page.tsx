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

  return (
    <>
      <div className="fixed top-0 z-50 hidden pl-4 md:block md:w-80">
        <ChatHeader />
      </div>
      <div className="fixed bottom-0 top-[206px] z-50 hidden w-full overflow-y-auto p-0 md:block md:w-80 md:p-3">
        <ChatList conversations={conversations} />
      </div>

      <div className="absolute size-full md:pl-80">
        <div className="relative flex size-full grow flex-col">
          <ConversationHeader conversation={conversation} />

          <div className="flex size-full flex-col overflow-y-auto overflow-x-hidden">
            <ChatBody initialMessages={messages} />
            <ChatForm />
          </div>
        </div>
        {/* <div className="w-72">Profile</div> */}
      </div>
    </>
  )
}
