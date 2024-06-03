import React from "react"
import { Search } from "lucide-react"
import { Input } from "../ui/input"

const ChatSearch = () => {
  return (
    <div className="relative mt-4">
      <div className="absolute left-2 top-2">
        <Search className="size-5 text-muted-foreground" />
      </div>
      <Input className="pl-8" placeholder="Search" />
    </div>
  )
}

export default ChatSearch
