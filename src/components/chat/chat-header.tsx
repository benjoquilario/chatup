"use client"

import React from "react"
import ChatIcon from "./chat-icon"
import { useSession } from "next-auth/react"
import Link from "next/link"
import { MessageSquare } from "lucide-react"
import ThemeToggle from "@/components/theme-toggle"
import { signOut } from "next-auth/react"
import { Button } from "@/components/ui/button"
import { HiLogout } from "react-icons/hi"
import { TbHexagonLetterC } from "react-icons/tb"

const ChatHeader = () => {
  return (
    <div className="w-full">
      <div className="mx-auto mb-2 flex h-[52px] w-full items-center justify-between gap-4 px-[4%] md:h-[64px] 2xl:h-[75px]">
        <Link href="/" className="flex items-center">
          <TbHexagonLetterC className="h-8 w-8" />
          <span className="text-lg font-semibold">hatty</span>
        </Link>
        <div className="flex items-center gap-3">
          <ThemeToggle />
          <Button size="icon" variant="ghost" onClick={() => signOut()}>
            <HiLogout className="h-6 w-6" />
          </Button>
        </div>
      </div>
      <ChatIcon />
    </div>
  )
}

export default ChatHeader
