import React from "react"
import { MessageSquare, Mail, Phone, UsersRound } from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const ChatIcon = () => {
  return (
    <div className="grid grid-cols-5 justify-items-center gap-4">
      <div className="p-2">
        <MessageSquare className="text-primary" />
      </div>
      <div className="p-2">
        <Mail />
      </div>
      <div className="p-2">
        <Phone />
      </div>
      <div className="p-2">
        <UsersRound />
      </div>
      <div className="">
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </div>
    </div>
  )
}

export default ChatIcon
