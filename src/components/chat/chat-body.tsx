"use client"

import { useRef, useEffect, useState } from "react"
import MessageItem from "../message/message-item"
import { ScrollArea } from "@/components/ui/scroll-area"
import useConversation from "@/lib/hooks/useConversation"
import { useSession } from "next-auth/react"
import { pusherClient } from "@/lib/pusher"
import find from "lodash.find"
import type { FullMessage } from "@/types/types"

interface ChatBodyProps {
  initialMessages?: FullMessage[]
}

const ChatBody = ({ initialMessages = [] }: ChatBodyProps) => {
  const [messages, setMessages] = useState(initialMessages)
  const bottomRef = useRef<HTMLDivElement>(null)
  const session = useSession()
  const { conversationId } = useConversation()

  useEffect(() => {
    pusherClient.subscribe(conversationId as string)
    bottomRef?.current?.scrollIntoView()

    function messageHandler(message: FullMessage) {
      setMessages((current) => {
        if (find(current, { id: message.id })) {
          return current
        }

        return [...current, message]
      })

      bottomRef?.current?.scrollIntoView()
    }

    function updateMessageHandler(newMessage: FullMessage) {
      setMessages((current) =>
        current.map((currentMessage) => {
          if (currentMessage.id === newMessage.id) {
            return newMessage
          }

          return currentMessage
        })
      )
    }

    pusherClient.bind("messages:new", messageHandler)
    pusherClient.bind("message:update", updateMessageHandler)
    return () => {
      pusherClient.unsubscribe(conversationId as string)
      pusherClient.unbind("messages:new", messageHandler)
      pusherClient.unbind("message:update", updateMessageHandler)
    }
  }, [conversationId])

  return (
    <div className="flex-1">
      <div className="flex h-full flex-col">
        <div className="max-h-[530px] overflow-auto">
          <div className="flex flex-col p-2">
            {messages.map((message) => {
              const isCurrentUser = message.senderId === session.data?.user?.id

              return (
                <MessageItem
                  message={message}
                  isCurrentUser={isCurrentUser}
                  key={message.id}
                />
              )
            })}
          </div>
          <div ref={bottomRef} className="pt-24"></div>
        </div>
      </div>
    </div>
  )
}

export default ChatBody
