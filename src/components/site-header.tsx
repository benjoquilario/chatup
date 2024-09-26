"use client"

import Link from "next/link"
import { MessageSquare } from "lucide-react"
import ThemeToggle from "./theme-toggle"
import { signOut } from "next-auth/react"
import { Button } from "./ui/button"
import { HiLogout } from "react-icons/hi"
import { TbHexagonLetterC } from "react-icons/tb"

const SiteHeader = () => {
  return (
    <header className="">
      <div className="mx-auto flex h-[52px] w-full max-w-screen-2xl items-center justify-between gap-4 px-[4%] md:h-[64px] 2xl:h-[75px]">
        <Link href="/" className="flex items-center p-2">
          <TbHexagonLetterC className="size-8" />
          <span className="text-lg font-semibold">hatty</span>
        </Link>
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
