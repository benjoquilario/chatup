"use client"

import { HiChat, HiUsers } from "react-icons/hi"
import { usePathname } from "next/navigation"
import { useMemo } from "react"

const useRoutes = () => {
  const pathname = usePathname()
  const routes = useMemo(
    () => [
      {
        label: "Conversation",
        href: "/conversation",
        icon: HiChat,
        active: pathname.includes("/conversation"),
      },
      {
        label: "Users",
        href: "/users",
        icon: HiUsers,
        active: pathname === "/users",
      },
    ],
    [pathname]
  )

  return routes
}

export default useRoutes
