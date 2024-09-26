"use client"

import React, { useTransition } from "react"
import { cn } from "@/lib/utils"
import { format, formatRelative, subDays } from "date-fns"
import { useSession } from "next-auth/react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import type { FullMessage } from "@/types/types"
import { BsThreeDotsVertical } from "react-icons/bs"
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
import { Button } from "@/components/ui/button"
import useConversation from "@/lib/hooks/useConversation"
import useStoreMessage from "@/store"
import { deleteMessage } from "@/app/actions"
import { toast } from "../ui/use-toast"
import ClientOnly from "../client-only"

type MessageItemProps = {
  isCurrentUser: boolean
  message: FullMessage
}

const MessageItem = ({ isCurrentUser, message }: MessageItemProps) => {
  const { conversationId } = useConversation()
  const { data: session } = useSession()
  const [isDeleting, startTransition] = useTransition()
  const [setSelectedMessage, setIsEditing] = useStoreMessage((store) => [
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

  console.log(message)

  return (
    <div
      className={cn("group flex w-full items-end gap-2 p-3", {
        "justify-end": isCurrentUser,
      })}
    >
      <div className={cn(isCurrentUser && "order-2")}>
        <Avatar className="size-6">
          <AvatarImage
            src={
              message.sender.image ??
              "https://raw.githubusercontent.com/benjoquilario/animehi-stream/refs/heads/master/public/placeholder.png"
            }
          />
          <AvatarFallback>
            <div className="size-full animate-pulse"></div>
          </AvatarFallback>
        </Avatar>
      </div>
      {!message.isDeleted ? (
        <>
          <div
            className={cn("rounded-lg p-3 text-sm shadow-md", {
              "bg-primary text-primary-foreground": isCurrentUser,
              "bg-muted": !isCurrentUser,
            })}
          >
            <p
              className="break-words text-xs md:text-sm"
              style={{ wordBreak: "break-word" }}
            >
              {message.body}
            </p>
            <ClientOnly>
              <div
                className={cn("mt-2 text-[10px] md:text-[11px]", {
                  "italic text-primary-foreground/80": isCurrentUser,
                })}
              >
                {format(new Date(message.createdAt), "MM/dd/yyyy")} -{" "}
                {format(new Date(message.createdAt), "p")}
              </div>
            </ClientOnly>
          </div>
          {session?.user?.id === message?.sender?.id ? (
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
                            size="sm"
                            onClick={async () => {
                              const response = await deleteMessage({
                                messageId: message.id,
                                conversationId: conversationId as string,
                              })

                              if (!response.ok)
                                return toast({ title: response.message })

                              return toast({
                                title: response.message,
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
                    className="w-full cursor-pointer text-sm"
                    size="sm"
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
      ) : (
        <div className="rounded-lg p-3 text-sm italic text-muted-foreground/80">
          <div className="text-xs text-muted-foreground/70">
            {format(new Date(message?.deletedAt as Date), "MM/dd/yyyy")} -{" "}
            {format(new Date(message?.deletedAt as Date), "p")}
          </div>
          This Message has been deleted
        </div>
      )}
    </div>
  )
}

export default MessageItem
