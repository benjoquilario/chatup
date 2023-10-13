"use client"

import React from "react"
import { cn } from "@/lib/cn"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import type { FullMessage } from "@/types/typings"
import { format, formatRelative, subDays } from "date-fns"
import { BsThreeDotsVertical } from "react-icons/bs"
import { Button } from "./ui/button"
import { deleteMessage } from "@/app/actions"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import useMessageStore from "@/store/message"
import { useSession } from "next-auth/react"
import useConversation from "@/lib/hooks/useConversation"

type MessageItemProps = {
  isCurrentUser: boolean
  message: FullMessage
}

export default function MessageItem({
  isCurrentUser,
  message,
}: MessageItemProps) {
  const { data: session } = useSession()
  const { conversationId } = useConversation()
  const [setSelectedMessage, setIsEditing] = useMessageStore((store) => [
    store.setSelectedMessage,
    store.setIsEditing,
  ])

  const handleEditMessage = () => {
    setSelectedMessage({
      id: message.id,
      body: message.body as string,
    })

    setIsEditing(true)
  }

  return (
    <div
      className={cn("group flex w-full items-end gap-2 p-3", {
        "justify-end": isCurrentUser,
      })}
    >
      <div className={cn(isCurrentUser && "order-2")}>
        <Avatar className="h-6 w-6">
          <AvatarImage src="/images/placeholder.jpg" />
          <AvatarFallback>
            <div className="h-full w-full animate-pulse"></div>
          </AvatarFallback>
        </Avatar>
      </div>
      {message.isDeleted ? (
        <div className="rounded-lg p-3 text-sm italic text-muted-foreground/80">
          <div className="text-xs text-muted-foreground/70">
            {format(new Date(message?.deletedAt as Date), "MM/dd/yyyy")} -{" "}
            {format(new Date(message?.deletedAt as Date), "p")}
          </div>
          This Message has been deleted
        </div>
      ) : (
        <>
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
          {session?.user?.name === message.sender.name ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className={cn(
                    "px-2 opacity-0 transition-opacity group-hover:opacity-100",
                    isCurrentUser && "-order-1"
                  )}
                >
                  <BsThreeDotsVertical className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem asChild>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button className="w-full text-sm" variant="ghost">
                        Delete
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>
                          Are you absolutely sure?
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                          This action cannot be undone. This will permanently
                          delete your message and remove your data from our
                          servers.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction asChild>
                          <Button
                            onClick={async () => {
                              await deleteMessage({
                                messageId: message.id,
                                conversationId: conversationId as string,
                              })
                            }}
                            variant="ghost"
                            className="ml-2"
                          >
                            Delete
                          </Button>
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Button
                    className="w-full text-sm"
                    variant="ghost"
                    onClick={handleEditMessage}
                  >
                    Edit
                  </Button>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : null}
        </>
      )}
    </div>
  )
}
