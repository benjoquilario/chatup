import React from "react"

import ChatHeader from "@/components/chat/chat-header"
import ChatList from "@/components/chat/chat-list"
import { notFound } from "next/navigation"
import { getConversations } from "@/lib/metrics"
import { getCurrentUser } from "@/lib/current-user"
import { auth } from "@/auth"

export default async function ConversationPage() {
  const session = await auth()
  const conversations = await getConversations()
  // const currentUser = await getCurrentUser()

  // console.log(currentUser)
  console.log(conversations)
  console.log(session)

  if (!session) notFound()

  return (
    <div>
      <div className="w-full p-0 md:w-96 md:p-3">
        <ChatHeader />

        <ChatList conversations={conversations} />
      </div>
      <div className="relative hidden w-full flex-col md:flex">
        Find User to chat
      </div>
    </div>
  )
}
