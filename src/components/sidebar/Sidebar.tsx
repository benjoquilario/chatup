"use client"

import useRoutes from "@/lib/hooks/useRoutes"
import DesktopItem from "./desktop-item"
import Link from "next/link"
import { MessagesSquare } from "lucide-react"
import { buttonVariants } from "../ui/button"
import ThemeToggle from "../theme-toggle"
import UserNav from "../user-nav"

interface SidebarProps {
  children?: React.ReactNode
}

export default function Sidebar({ children }: SidebarProps) {
  const routes = useRoutes()

  return (
    <div className="hidden items-center justify-between overflow-x-hidden border-r border-border lg:fixed lg:inset-y-0 lg:left-0 lg:z-40 lg:flex lg:w-16 lg:flex-col lg:overflow-y-auto lg:px-2 lg:pb-4 xl:px-6">
      <div className="mb-8 mt-10">
        <Link href="/" className="flex h-12 w-12 items-center">
          <MessagesSquare className="h-12 w-12" />
        </Link>
      </div>
      <nav className="mt-4 flex flex-1 flex-col gap-4">
        <ul role="list" className="flex flex-col items-center space-y-2">
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
        className="mt-4 flex flex-col items-center justify-between space-y-3"
      >
        <ThemeToggle />
        <UserNav />
      </nav>
    </div>
  )
}
