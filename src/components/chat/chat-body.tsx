"use client"

import { useRef, useEffect, useState } from "react"
import MessageItem from "../message/message-item"
import { ScrollArea } from "@/components/ui/scroll-area"
import useConversation from "@/lib/hooks/useConversation"
import { useSession } from "next-auth/react"
import { pusherClient } from "@/lib/pusher"
import find from "lodash.find"
import type { FullMessage } from "@/types/types"
import { AnimatePresence, motion } from "framer-motion"

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
    <div className="flex size-full flex-1 flex-col overflow-y-auto overflow-x-hidden">
      <AnimatePresence>
        {messages.map((message) => {
          const isCurrentUser = message.senderId === session.data?.user?.id

          return (
            <motion.div
              key={message.id}
              layout
              initial={{ opacity: 0, scale: 1, y: 50, x: 0 }}
              animate={{ opacity: 1, scale: 1, y: 0, x: 0 }}
              exit={{ opacity: 0, scale: 1, y: 1, x: 0 }}
              transition={{
                opacity: { duration: 0.1 },
                layout: {
                  type: "spring",
                  bounce: 0.3,
                  duration: messages.indexOf(message) * 0.05 + 0.2,
                },
              }}
              style={{
                originX: 0.5,
                originY: 0.5,
              }}
            >
              <MessageItem message={message} isCurrentUser={isCurrentUser} />
            </motion.div>
          )
        })}
      </AnimatePresence>

      <div ref={bottomRef} className="pt-16"></div>
    </div>
  )
}

export default ChatBody
