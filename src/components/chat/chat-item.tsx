"use client"

import React, { useMemo } from "react"
import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import Link from "next/link"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useSession } from "next-auth/react"
import type { FullConversation } from "@/types/types"
import { Skeleton } from "@/components/ui/skeleton"
import { format } from "date-fns"

interface ChatItemProps {
  conversation: FullConversation
  selected: boolean
}

export default function ChatItem({ conversation, selected }: ChatItemProps) {
  const session = useSession()

  const userEmail = useMemo(
    () => session.data?.user?.email,
    [session.data?.user?.email]
  )

  const conversationPartner = useMemo(
    () =>
      conversation.users.find(
        (user) => user.email !== session.data?.user?.email
      ),
    [conversation, session.data?.user?.email]
  )

  const lastMessage = useMemo(() => {
    const messages = conversation.messages || []

    return messages[messages.length - 1]
  }, [conversation.messages])

  const lastConversationPartner = useMemo(
    () => lastMessage?.senderId === session.data?.user.id,
    [lastMessage, session]
  )

  const lastMessageText = useMemo(() => {
    if (lastMessage?.image) {
      return "Sent an image"
    }

    if (lastMessage?.isDeleted) {
      return "Message Deleted"
    }

    if (lastMessage?.body) {
      return lastMessage.body
    }

    if (lastMessage.isDeleted) return "Started a conversation"
  }, [lastMessage])

  return (
    <Link
      className={cn(
        buttonVariants({ variant: "ghost", size: "lg" }),
        "mb-2 h-[4.25rem] w-full overflow-hidden rounded-sm px-4 py-2 shadow-md",
        {
          "bg-primary text-primary-foreground hover:bg-primary/90": selected,
        }
      )}
      href={`/conversation/${conversation.id}`}
    >
      <Avatar>
        <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
        <AvatarFallback>
          <Skeleton className="h-12 w-12 rounded-full" />
        </AvatarFallback>
      </Avatar>
      <div className="ml-2 flex w-full items-center justify-between">
        <div className="flex h-full w-full flex-col items-start justify-between text-sm">
          <div className="flex w-full items-center justify-between">
            <h3
              className={cn(
                "font-heading text-[15px] font-medium capitalize tracking-tight"
              )}
            >
              {conversationPartner?.name || conversation.name}
            </h3>
            <div className="flex flex-col items-center">
              <span className="mb-1 text-xs font-light text-muted-foreground/90">
                {format(new Date(conversation.createdAt), "p")}
              </span>
              {/* <span className="flex h-4 w-4 items-center justify-center rounded-full bg-destructive text-xs font-semibold text-white">
            6
          </span> */}
            </div>
          </div>
          <p
            className={cn(
              "max-w-[255px] truncate text-[12px] font-semibold text-accent-foreground",
              {
                "text-primary-foreground": selected,
                italic: lastMessage?.isDeleted,
              }
            )}
            style={{ wordBreak: "break-word" }}
          >
            {`${lastConversationPartner ? "You: " : ""} ${lastMessageText}`}
          </p>
        </div>
      </div>
    </Link>
  )
}
