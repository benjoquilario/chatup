import getConversations from "@/utils/getConversation"
import getSession from "@/utils/getSession"
import { notFound } from "next/navigation"
import React from "react"
import Link from "next/link"

export default async function Chat() {
  const session = await getSession()

  if (!session) notFound()

  return (
    <div className="flex h-full items-center justify-center pl-80">
      <h4 className="text-2xl font-semibold">
        Select a chat or find user to start a conversation
      </h4>
      <Link href="/" className="text-center underline underline-offset-4">
        Find Users
      </Link>
    </div>
  )
}
