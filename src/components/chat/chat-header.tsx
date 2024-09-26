import ThemeToggle from "@/components/theme-toggle"
import { Button } from "@/components/ui/button"
import { HiLogout } from "react-icons/hi"
import { TbHexagonLetterC } from "react-icons/tb"
import ChatSearch from "./chat-search"
import { Plus } from "lucide-react"
import { logout } from "@/server/auth"
import Link from "next/link"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const ChatHeader = () => {
  return (
    <>
      <div className="w-full">
        <div className="mx-auto mb-2 flex h-[52px] w-full items-center justify-between gap-4 md:h-[64px] 2xl:h-[75px]">
          <Link href="/" className="flex items-center">
            <TbHexagonLetterC className="size-8" />
            <span className="text-lg font-semibold">hatty</span>
          </Link>
          <div className="flex items-center gap-3">
            <ThemeToggle />
            <form action={logout}>
              <Button type="submit" size="icon" variant="ghost">
                <HiLogout className="size-6" />
              </Button>
            </form>
          </div>
        </div>
        {/* <ChatIcon /> */}
      </div>
      <div>
        <div className="flex items-center justify-between pt-2">
          <h3 className="text-lg font-semibold">Chats</h3>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button className="size-10 rounded-full">
                <span className="rounded-full bg-primary p-2">
                  <Plus className="text-white" />
                </span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem>Settings</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className="relative flex items-center gap-4 pt-4 text-xs">
          <span className="relative font-semibold">
            Direct
            <span className="absolute size-2 rounded-full bg-destructive"></span>
          </span>
          <span className="text-muted-foreground/90">Groups</span>
          <span className="text-muted-foreground/90">Public</span>
        </div>
        <ChatSearch />
      </div>
    </>
  )
}

export default ChatHeader
