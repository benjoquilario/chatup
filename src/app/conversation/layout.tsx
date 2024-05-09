'use client'

import Sidebar from "../../components/sidebar/sidebar"
import MobileFooter from "@/components/sidebar/mobile-footer"

interface ConversationsLayoutProps {
  children: React.ReactNode
}

export default function ConversationsLayout({
  children,
}: ConversationsLayoutProps) {
  return (
    <div className="h-full">
      <Sidebar />
      <MobileFooter />
      <main className="h-full lg:pl-16">
        <div className="relative h-full">{children}</div>
      </main>
    </div>
  )
}
