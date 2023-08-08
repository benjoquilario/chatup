"use client"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import useRoutes from "@/lib/hooks/useRoutes"
import DesktopItem from "./desktop-item"
import Link from "next/link"
import { MessagesSquare } from "lucide-react"
import { buttonVariants } from "../ui/button"

interface SidebarProps {
  children?: React.ReactNode
}

export default function Sidebar({ children }: SidebarProps) {
  const routes = useRoutes()

  return (
    <div className="hidden justify-between border-r border-border lg:fixed lg:inset-y-0 lg:left-0 lg:z-40 lg:flex lg:w-16 lg:flex-col lg:overflow-y-auto lg:pb-4 xl:px-6">
      <nav className="mt-4 flex flex-col justify-between gap-4">
        <div className="mb-6 mt-3">
          <Link href="/" className={buttonVariants({ variant: "ghost" })}>
            <MessagesSquare className="h-12 w-12" />
          </Link>
        </div>
        <ul role="list" className="flex flex-col items-center space-y-1">
          {routes.map((route) => (
            <DesktopItem
              key={route.label}
              href={route.href}
              label={route.label}
              active={route.active}
              onClick={route.onClick}
              icon={route.icon}
            />
          ))}
        </ul>
      </nav>
      <nav
        aria-label="Avatar"
        className="mt-4 flex flex-col items-center justify-between"
      >
        <div className="cursor-pointer">
          <div className="relative">
            <Avatar className="h-10 w-10">
              <AvatarImage src="/images/placeholder.jpg" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </nav>
    </div>
  )
}
