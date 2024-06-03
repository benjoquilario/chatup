"use client"

import { useMemo } from "react"
import { Button } from "@/components/ui/button"
import { BsPersonFill } from "react-icons/bs"
import { BiDotsVerticalRounded } from "react-icons/bi"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
// import type { Conversation, User } from "@prisma/client"
import { useSession } from "next-auth/react"
// import useConversationStore from "@/store/conversation"

// interface ChatHeaderProps {
//   conversation: Conversation & {
//     users: User[]
//   }
// }

export default function ConversationHeader() {
  return (
    <div className="flex w-full items-center justify-between bg-background px-4 py-3 sm:px-4 lg:px-6">
      <div className="flex items-center gap-2">
        <Avatar className="size-10">
          <AvatarImage src="https://github.com/shadcn.png" alt="" />
          <AvatarFallback>
            <div className="size-full animate-pulse"></div>
          </AvatarFallback>
        </Avatar>
        <div>
          <h3 className="font-heading text-sm font-medium capitalize leading-tight md:text-base">
            Benjo Quilario
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
