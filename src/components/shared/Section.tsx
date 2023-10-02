"use client"

import Sidebar from "@/components/sidebar/sidebar"
import MobileFooter from "../sidebar/mobile-footer"

const Section = ({ children }: { children: React.ReactNode }) => (
  <div className="h-full">
    <Sidebar />
    <MobileFooter />
    <main className="h-full lg:pl-16">
      <div className="relative h-full">{children}</div>
    </main>
  </div>
)

export default Section
