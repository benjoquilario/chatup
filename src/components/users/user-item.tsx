"use client"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/cn"
import type { User } from "@prisma/client"
import axios from "axios"
import { useRouter } from "next/navigation"
import React, { useCallback, useState } from "react"

interface UserItemProps {
  user: User
}

export default function UserItem({ user }: UserItemProps) {
  const router = useRouter()

  const handleOnClick = useCallback(() => {
    axios.post("/api/conversations", { userId: user.id }).then((data) => {
      router.push(`/conversation/${data.data.id}`)
    })
  }, [user, router])

  return (
    <Button
      className={cn("h-[3.25rem] w-full px-4 py-2")}
      onClick={handleOnClick}
      variant="ghost"
      size="lg"
    >
      <Avatar className={cn("h-9 w-9")}>
        <AvatarImage src="/images/placeholder.jpg" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      <div className="ml-2 min-w-0 flex-1">
        {/* <span className="absolute inset-0" aria-hidden="true" /> */}
        <div className="mb-1 flex items-center justify-between">
          <p className="text-[15px] font-medium capitalize">{user.name}</p>
        </div>
      </div>
    </Button>
  )
}
