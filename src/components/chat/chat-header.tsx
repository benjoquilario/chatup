"use client"

import React from "react"
import ChatIcon from "./chat-icon"
import { useSession } from "next-auth/react"

const ChatHeader = () => {
  const session = useSession()
  console.log(session)

  return (
    <div className="w-full md:w-96">
      <ChatIcon />
    </div>
  )
}

export default ChatHeader
