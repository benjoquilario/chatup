"use client"

import { useMemo } from "react"
import { Button, buttonVariants } from "@/components/ui/button"
import { BsPersonFill } from "react-icons/bs"
import { BiDotsVerticalRounded } from "react-icons/bi"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import type { Conversation, User } from "@prisma/client"
import { useSession } from "next-auth/react"
// import useConversationStore from "@/store/conversation"
import { IoMdArrowRoundBack } from "react-icons/io"
import Link from "next/link"

type ConversationHeaderProps = {
  conversation: Conversation & {
    users: User[]
  }
}

export default function ConversationHeader({
  conversation,
}: ConversationHeaderProps) {
  const session = useSession()

  const partner = useMemo(
    () => conversation.users.find((user) => user.id !== session.data?.user.id),
    [conversation, session]
  )

  return (
    <div className="flex w-full items-center justify-between px-0 py-3 sm:px-4 lg:px-6">
      <div className="flex items-center gap-2 ">
        <Link
          href="/conversation"
          className={buttonVariants({
            variant: "ghost",
            size: "icon",
            className: "text-primary",
          })}
        >
          <IoMdArrowRoundBack className="size-5" />
        </Link>
        <Avatar className="size-10">
          <AvatarImage
            src={
              partner?.image ??
              "https://raw.githubusercontent.com/benjoquilario/animehi-stream/refs/heads/master/public/placeholder.png"
            }
            alt=""
          />
          <AvatarFallback>
            <div className="size-full animate-pulse"></div>
          </AvatarFallback>
        </Avatar>
        <div>
          <h3 className="font-heading text-sm font-medium capitalize leading-tight md:text-base">
            {partner?.name}
          </h3>
          <p className="text-xs font-light text-accent-foreground">
            <span className="size-2 bg-green-500"></span>Active
          </p>
        </div>
      </div>
      <div className="flex gap-3">
        <Button variant="ghost" size="sm" aria-label="profile">
          <BsPersonFill
            className="size-5 shrink-0 text-accent-foreground"
            aria-hidden="true"
          />
        </Button>
        <Button
          // onClick={toggleConversationInfo}
          variant="ghost"
          aria-label="conversation information"
          size="sm"
        >
          <BiDotsVerticalRounded
            className="size-5 shrink-0 text-accent-foreground"
            aria-hidden="true"
          />
        </Button>
      </div>
    </div>
  )
}
