"use client"

import type { FullMessage } from "@/types/typings"
import { useSession } from "next-auth/react"
import { cn } from "@/lib/cn"
import ChatForm from "./chat-form"
import { pusherClient } from "@/lib/pusher"
import { format } from "date-fns"
import find from "lodash.find"
import useConversation from "@/lib/hooks/useConversation"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useEffect, useRef, useState } from "react"

interface ChatBodyProps {
  initialMessages?: FullMessage[]
  children: React.ReactNode
}

export default function ChatBody({
  initialMessages = [],
  children,
}: ChatBodyProps) {
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
    <div className="h-full lg:pl-[375px]">
      <div className="flex h-full flex-col">
        {children}
        <div className="flex-1 overflow-y-auto">
          {messages.map((message) => {
            const isCurrentUser =
              message.sender.email === session.data?.user?.email

            return (
              <div
                key={message.id}
                className={cn("flex w-full items-end gap-2 p-3", {
                  "justify-end": isCurrentUser,
                })}
              >
                <div className={cn(isCurrentUser && "order-2")}>
                  <Avatar className="h-6 w-6">
                    <AvatarImage src="/images/placeholder.jpg" />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                </div>
                <div
                  className={cn("rounded-lg p-3 text-sm shadow-md", {
                    "bg-primary text-primary-foreground": isCurrentUser,
                    "bg-muted": !isCurrentUser,
                  })}
                >
                  <p className="text-xs md:text-sm">{message.body}</p>
                  <div
                    className={cn("mt-2 text-xs", {
                      "text-primary-foreground/90": isCurrentUser,
                    })}
                  >
                    {format(new Date(message.createdAt), "p")}
                  </div>
                </div>
              </div>
            )
          })}
          <div ref={bottomRef} className="pt-24"></div>
        </div>
        <ChatForm />
      </div>
    </div>
  )
}
