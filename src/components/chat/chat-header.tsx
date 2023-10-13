"use client"

import { useMemo } from "react"
import { Button } from "@/components/ui/button"
import { BsPersonFill } from "react-icons/bs"
import { BiDotsVerticalRounded } from "react-icons/bi"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import type { Conversation, User } from "@prisma/client"
import { useSession } from "next-auth/react"
import useConversationStore from "@/store/conversation"

interface ChatHeaderProps {
  conversation: Conversation & {
    users: User[]
  }
}

export default function ChatHeader({ conversation }: ChatHeaderProps) {
  const [openConversationInfo, setOpenConversationInfo] = useConversationStore(
    (store) => [store.openConversationInfo, store.setOpenConversationInfo]
  )

  const session = useSession()
  const statusText = useMemo(
    () =>
      conversation.isGroup
        ? `${conversation.userIds.length} members`
        : "Active",
    [conversation]
  )

  const conversationPartner = useMemo(
    () =>
      conversation.users.find(
        (user) => user.email !== session?.data?.user?.email
      ),
    [session.data?.user?.email, conversation]
  )

  const toggleConversationInfo = () => {
    setOpenConversationInfo(!openConversationInfo)
  }

  return (
    <div className="flex w-full items-center justify-between border-b border-border bg-background px-4 py-3 shadow sm:px-4 lg:px-6">
      <div className="flex items-center gap-2">
        <Avatar className="h-10 w-10">
          <AvatarImage
            src={session.data?.user?.image || "/images/placeholder.jpg"}
          />
          <AvatarFallback>
            <div className="h-full w-full animate-pulse"></div>
          </AvatarFallback>
        </Avatar>
        <div>
          <h3 className="font-heading text-sm font-medium capitalize leading-tight md:text-base">
            {conversation.name || conversationPartner?.name}
          </h3>
          <p className="text-xs font-light text-accent-foreground">
            {statusText}
          </p>
        </div>
      </div>
      <div className="flex gap-3">
        <Button variant="ghost" size="sm" aria-label="profile">
          <BsPersonFill
            className="h-5 w-5 shrink-0 text-accent-foreground"
            aria-hidden="true"
          />
        </Button>
        <Button
          onClick={toggleConversationInfo}
          variant="ghost"
          aria-label="conversation information"
          size="sm"
        >
          <BiDotsVerticalRounded
            className="h-5 w-5 shrink-0 text-accent-foreground"
            aria-hidden="true"
          />
        </Button>
      </div>
    </div>
  )
}
