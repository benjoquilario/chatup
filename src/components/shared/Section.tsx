"use client"

import Sidebar from "@/components/sidebar"
import MobileFooter from "@/components/sidebar/mobile-footer"

export default function Section({ children }: { children: React.ReactNode }) {
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
