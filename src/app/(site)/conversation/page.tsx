import React, { Suspense } from "react"

import ChatHeader from "@/components/chat/chat-header"
import ChatList from "@/components/chat/chat-list"
import { notFound } from "next/navigation"
import { getConversations } from "@/lib/metrics"
import { getCurrentUser } from "@/lib/current-user"
import { auth } from "@/auth"
import Suggestions from "@/components/suggestions"

export default async function ConversationPage() {
  const session = await auth()
  const conversations = await getConversations()
  // const currentUser = await getCurrentUser()

  // console.log(currentUser)
  console.log(conversations)
  console.log(session)

  if (!session) notFound()

  return (
    <>
      <div className="fixed z-50 w-full p-0 md:w-80 md:p-3">
        <ChatHeader />

        <ChatList conversations={conversations} />
      </div>
      <div className="absolute h-full w-full md:pl-80">
        <div className="relative flex w-full flex-1 items-center">
          <div className="relative hidden w-full flex-1 flex-col text-center text-2xl font-extrabold md:flex">
            Find User to chat
          </div>
          <div className="hidden md:block">
            <Suspense fallback={<div>Loading...</div>}>
              <Suggestions />
            </Suspense>
          </div>
        </div>
      </div>
    </>
  )
}
