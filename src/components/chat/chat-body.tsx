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
import { getChatMessages, MESSAGES_PER_PAGE } from "@/lib/client"
import { useInView } from "react-intersection-observer"
interface ChatBodyProps {
  currentUserId: string
  initialMessages?: FullMessage[]
}

const ChatBody = ({ initialMessages = [], currentUserId }: ChatBodyProps) => {
  const [messages, setMessages] = useState(initialMessages)
  const { conversationId } = useConversation()
  const [offset, setOffset] = useState(MESSAGES_PER_PAGE)
  const [hasNextPage, setHasNextPage] = useState(true)
  const bottomRef = useRef<HTMLDivElement>(null)
  const [scrollTrigger, isInView] = useInView()

  const loadMoreMessage = async function () {
    if (hasNextPage) {
      const apiMessage = await getChatMessages(conversationId as string, offset)

      if (apiMessage.hasNextPage) {
        setHasNextPage(true)
      }

      setMessages((prevMessage) => [...apiMessage.messages, ...prevMessage])
      setOffset((prevOffset) => prevOffset + MESSAGES_PER_PAGE)
    }
  }

  useEffect(() => {
    if (isInView && hasNextPage) {
      loadMoreMessage()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isInView, hasNextPage])

  useEffect(() => {
    pusherClient.subscribe(conversationId as string)
    bottomRef?.current?.scrollIntoView()

    const messageHandler = function (message: FullMessage) {
      setMessages((current) => {
        if (find(current, { id: message.id })) {
          return current
        }

        return [...current, message]
      })

      bottomRef?.current?.scrollIntoView()
    }

    const updateMessageHandler = function (newMessage: FullMessage) {
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

  console.log(messages)

  return (
    <div className="flex size-full flex-1 flex-col overflow-y-auto overflow-x-hidden">
      {hasNextPage && <div ref={scrollTrigger} />}
      <AnimatePresence>
        {messages.map((message) => {
          const isCurrentUser = message.userId === currentUserId

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
