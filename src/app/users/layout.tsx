'use client'

import UserList from "@/components/users/user-list"
import Sidebar from "@/components/sidebar/sidebar"
import MobileFooter from "@/components/sidebar/mobile-footer"

interface LayoutProps {
  children: React.ReactNode
}

export default function UsersLayout({ children }: LayoutProps) {
  return (
    <div className="h-full">
      <Sidebar />
      <MobileFooter />
      <main className="h-full lg:pl-16">
        <div className="relative h-full">
          <UserList />
          {children}
        </div>
      </main>
    </div>
  )
}
