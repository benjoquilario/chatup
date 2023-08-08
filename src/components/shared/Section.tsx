"use client"
import Sidebar from "@/components/sidebar/sidebar"

const Section = ({ children }: { children: React.ReactNode }) => (
  <div className="h-full">
    <Sidebar />
    <main className="h-full lg:pl-16">
      <div className="relative h-full">{children}</div>
    </main>
  </div>
)

export default Section
