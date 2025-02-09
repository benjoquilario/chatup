"use client"

import ThemeToggle from "./theme-toggle"
import { signOut } from "next-auth/react"
import { Button } from "./ui/button"
import { HiLogout } from "react-icons/hi"
import { MessageCircle } from "lucide-react"

const SiteHeader = () => {
  return (
    <header className="">
      <div className="mx-auto flex h-[52px] w-full max-w-screen-2xl items-center justify-between gap-4 px-[4%] md:h-[64px] 2xl:h-[75px]">
        <div className="flex items-center">
          <MessageCircle className="size-8 text-primary" />
          <span className="ml-2 text-2xl font-bold text-foreground">
            ChatUp
          </span>
        </div>
        <div className="flex items-center gap-3">
          <ThemeToggle />
          <Button size="icon" variant="ghost" onClick={() => signOut()}>
            <HiLogout className="size-6" />
          </Button>
        </div>
      </div>
    </header>
  )
}

export default SiteHeader
