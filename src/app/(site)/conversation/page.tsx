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

  if (!session) notFound()

  return (
    <>
      <div className="fixed top-0 z-50 w-full px-3 md:w-80">
        <ChatHeader />
      </div>
      <div className="fixed bottom-0 top-[206px] z-50 w-full overflow-y-auto p-0 md:w-80 md:p-3">
        <ChatList conversations={conversations} />
      </div>

      <div className="size-full md:pl-80">
        <div className="relative flex size-full flex-1 items-center">
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
