import SiteHeader from "@/components/site-header"

import React from "react"

interface ConversationLayoutProps {
  children: React.ReactNode
}

const ConversationLayout = ({ children }: ConversationLayoutProps) => {
  return (
    <div className="flex min-h-full flex-col">
      {/* <SiteHeader /> */}
      <main className="h-full">
        {/* <div className="flex size-full min-h-[calc(100vh-64px)] overflow-hidden"> */}
        <div className="h-full">{children}</div>
        {/* </div> */}
      </main>
      {/* <SiteFooter /> */}
    </div>
  )
}

export default ConversationLayout
