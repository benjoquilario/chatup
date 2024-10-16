"use client"

import React, { useState, useMemo, useEffect, Suspense } from "react"
import { Plus } from "lucide-react"

import ChatItem from "./chat-item"
import { ScrollArea } from "@/components/ui/scroll-area"
import useConversation from "@/lib/hooks/useConversation"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import type { FullConversation } from "@/types/types"
import type { User } from "@prisma/client"
import { pusherClient } from "@/lib/pusher"
import find from "lodash.find"
import Suggestions from "../suggestions"
import Link from "next/link"
import { buttonVariants } from "../ui/button"

interface ChatListProps {
  conversations: FullConversation[]
  users?: User[]
}

export default function ChatList({ conversations, users }: ChatListProps) {
  const [items, setItems] = useState(conversations)
  const router = useRouter()
  const session = useSession()

  const { conversationId, isOpen } = useConversation()

  const pusherKey = useMemo(
    () => session?.data?.user?.email,
    [session?.data?.user?.email]
  )

  useEffect(() => {
    if (!pusherKey) return

    pusherClient.subscribe(pusherKey)

    function updateHandler(conversation: FullConversation) {
      setItems((current) =>
        current.map((currentConversation) => {
          if (currentConversation.id === conversation.id) {
            return {
              ...currentConversation,
              messages: conversation.messages,
            }
          }
          return currentConversation
        })
      )
    }

    function newHandler(conversation: FullConversation) {
      setItems((current) => {
        const isConversationExist = find(current, { id: conversation.id })

        if (isConversationExist) return current
        return [conversation, ...current]
      })
    }

    function removeHandler(conversation: FullConversation) {
      setItems((current) => [
        ...current.filter((convo) => convo.id !== conversation.id),
      ])
    }

    pusherClient.bind("conversation:update", updateHandler)
    pusherClient.bind("conversation:new", newHandler)
    pusherClient.bind("conversation:remove", removeHandler)
  }, [pusherKey, router, conversationId])

  return (
    <div className="relative flex flex-col rounded-md">
      <div className="">
        {items.length > 0 ? (
          items.map((conversation) => (
            <ChatItem
              key={conversation.id}
              conversation={conversation}
              selected={conversation.id === conversationId}
            />
          ))
        ) : (
          <>
            <p className="text-muted-foreground/80">Nothing to show here...</p>
            <div className="flex items-center">
              Find user
              <Link href="/users" className={buttonVariants({ size: "sm" })}>
                {" "}
                here
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
