"use client"

import useConversation from "@/lib/hooks/useConversation"
import useRoutes from "@/lib/hooks/useRoutes"
import Link from "next/link"
import { cn } from "@/lib/cn"
import UserNav from "../user-nav"

const MobileFooter = () => {
  const routes = useRoutes()

  const { isOpen } = useConversation()

  if (isOpen) {
    return null
  }

  return (
    <div className="fixed bottom-0 z-40 flex w-full items-center justify-between px-4 lg:hidden">
      {routes.map((route) => (
        <div key={route.href} className="flex items-center justify-center">
          <Link
            href={route.href}
            className={cn(
              "group w-full gap-x-3 p-3 text-sm font-semibold leading-6",
              route.active
                ? "bg-primary text-white"
                : "bg-background text-muted-foreground"
            )}
          >
            <route.icon className="h-6 w-6" />
          </Link>
        </div>
      ))}
      <UserNav />
    </div>
  )
}

export default MobileFooter
