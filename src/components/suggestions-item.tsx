"use client"

import React, { useCallback, useTransition } from "react"
import { Button } from "./ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { createConversation } from "@/app/actions"
import type { User } from "@prisma/client"
import { useRouter } from "next/navigation"
import axios from "axios"
import { startHolyLoader, stopHolyLoader } from "holy-loader"
import { FullConversation } from "@/types/types"

type SuggestionsItemProps = {
  user: User
}

const SuggestionsItem = ({ user }: SuggestionsItemProps) => {
  const [isPending, startTransition] = useTransition()

  const router = useRouter()

  return (
    <div className="flex items-center gap-2">
      <div>
        <Avatar className="size-10">
          <AvatarImage src={"https://github.com/shadcn.png"} alt="" />
          <AvatarFallback>
            <div className="size-full animate-pulse"></div>
          </AvatarFallback>
        </Avatar>
      </div>
      <div className="flex flex-col gap-1">
        <h4>{user.name}</h4>
        <p className="text-xs text-muted-foreground/70">2 mutual</p>
      </div>
      <Button
        disabled={isPending}
        onClick={() => {
          startTransition(async () => {
            const response = (await createConversation({
              userId: user.id,
            })) as FullConversation

            try {
              startHolyLoader()
              router.push(`/conversation/${response.id}`)
            } catch (error) {
              stopHolyLoader()
            } finally {
              stopHolyLoader()
            }
          })
        }}
      >
        Add
      </Button>
    </div>
  )
}

export default SuggestionsItem
