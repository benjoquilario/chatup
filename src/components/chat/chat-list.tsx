"use client"

import React, { useState, useMemo, useEffect } from "react"
import { Plus } from "lucide-react"
import ChatSearch from "./chat-search"
import ChatItem from "./chat-item"
import { ScrollArea } from "@/components/ui/scroll-area"
import useConversation from "@/lib/hooks/useConversation"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import type { FullConversation } from "@/types/types"
import type { User } from "@prisma/client"
import { pusherClient } from "@/lib/pusher"
import find from "lodash.find"

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

  console.log(conversationId)

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
    <div className="relative flex flex-col rounded-md p-3">
      <div className="flex items-center justify-between pt-2">
        <h3 className="text-lg font-semibold">Chats</h3>
        <span className="rounded-full bg-primary p-2">
          <Plus className="text-white" />
        </span>
      </div>
      <div className="relative flex items-center gap-4 pt-4 text-xs">
        <span className="relative font-semibold">
          Direct
          <span className="absolute size-2 rounded-full bg-destructive"></span>
        </span>
        <span className="text-muted-foreground/90">Groups</span>
        <span className="text-muted-foreground/90">Public</span>
      </div>
      <ChatSearch />
      <div className="max-h-[530px] overflow-auto">
        <div className="flex flex-col p-2">
          {items.length > 0 ? (
            items.map((conversation) => (
              <ChatItem
                key={conversation.id}
                conversation={conversation}
                selected={conversation.id === conversationId}
              />
            ))
          ) : (
            <p className="text-muted-foreground/80">Nothing to show here...</p>
          )}
        </div>
      </div>
    </div>
  )
}
