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
import ClientOnly from "../client-only"

interface ChatItemProps {
  conversation: FullConversation
  selected: boolean
}

export default function ChatItem({ conversation, selected }: ChatItemProps) {
  const session = useSession()

  const email = session.data?.user.email
  const id = session.data?.user.id

  const userEmail = useMemo(() => email, [email])

  const conversationPartner = useMemo(
    () => conversation.users.find((user) => user.email !== email),
    [conversation, email]
  )

  const lastMessage = useMemo(() => {
    const messages = conversation.messages || []

    return messages[messages.length - 1]
  }, [conversation.messages])

  const lastConversationPartner = useMemo(
    () => lastMessage?.senderId === id,
    [lastMessage, id]
  )

  const lastMessageText = useMemo(() => {
    if (lastMessage?.image) return "Sent an image"

    if (lastMessage?.isDeleted) return "Message Deleted"

    if (lastMessage?.body) return lastMessage.body

    return "Started a conversation"
  }, [lastMessage])

  return (
    <Link
      className={cn(
        buttonVariants({ variant: "ghost", size: "lg" }),
        "mb-2 h-[4.25rem] w-full overflow-hidden rounded-sm px-4 py-2 shadow-md",
        {
          "bg-primary hover:bg-primary/90": selected,
        }
      )}
      href={`/conversation/${conversation.id}`}
    >
      <Avatar>
        <AvatarImage
          src={
            conversationPartner?.image ??
            "https://raw.githubusercontent.com/benjoquilario/animehi-stream/refs/heads/master/public/placeholder.png"
          }
          alt="@shadcn"
        />
        <AvatarFallback>
          <Skeleton className="size-12 rounded-full" />
        </AvatarFallback>
      </Avatar>
      <div className="ml-2 flex w-full items-center justify-between">
        <div className="flex size-full flex-col items-start justify-between text-sm">
          <div className="flex w-full items-center justify-between">
            <h3
              className={cn(
                "font-heading text-[15px] font-medium capitalize tracking-tight",
                {
                  "text-primary-foreground": selected,
                }
              )}
            >
              {conversationPartner?.name || conversation.name}
            </h3>
            <div className="flex flex-col items-center">
              <ClientOnly>
                <span className="mb-1 text-xs font-light text-muted-foreground/90">
                  {format(new Date(conversation.createdAt), "p")}
                </span>
              </ClientOnly>
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
