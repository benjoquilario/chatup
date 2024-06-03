"use client"

import Link from "next/link"
import { MessageSquare } from "lucide-react"
import ThemeToggle from "./theme-toggle"
import { signOut } from "next-auth/react"

const SiteHeader = () => {
  return (
    <header className="">
      <div className="mx-auto flex h-[52px] w-full max-w-screen-2xl items-center justify-between gap-4 px-[4%] md:h-[64px] 2xl:h-[75px]">
        <Link href="/" className="flex gap-2">
          <MessageSquare />

          <span>Chatty</span>
        </Link>
        <div className="flex">
          <button onClick={() => signOut()}>Out</button>
          <ThemeToggle />
        </div>
      </div>
    </header>
  )
}

export default SiteHeader
