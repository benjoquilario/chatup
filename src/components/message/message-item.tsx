"use client"

import React from "react"
import { cn } from "@/lib/utils"
import { format, formatRelative, subDays } from "date-fns"
import { useSession } from "next-auth/react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import type { FullMessage } from "@/types/types"

type MessageItemProps = {
  isCurrentUser: boolean
  message: FullMessage
}

const MessageItem = ({ isCurrentUser, message }: MessageItemProps) => {
  return (
    <div
      className={cn("group flex w-full items-end gap-2 p-3", {
        "justify-end": isCurrentUser,
      })}
    >
      <div className={cn("order-2")}>
        <Avatar className="size-6">
          <AvatarImage src="/images/placeholder.jpg" />
          <AvatarFallback>
            <div className="size-full animate-pulse"></div>
          </AvatarFallback>
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
          className={cn("mt-2 text-[10px] md:text-[11px]", {
            "italic text-primary-foreground/80": isCurrentUser,
          })}
        >
          {format(new Date(message.createdAt), "MM/dd/yyyy")} -{" "}
          {format(new Date(message.createdAt), "p")}
        </div>
      </div>
    </div>
  )
}

export default MessageItem
