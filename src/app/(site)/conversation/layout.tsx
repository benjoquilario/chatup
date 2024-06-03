import SiteHeader from "@/components/site-header"

import Suggestions from "@/components/suggestions"
import React, { Suspense } from "react"

interface ConversationLayoutProps {
  children: React.ReactNode
}

const ConversationLayout = ({ children }: ConversationLayoutProps) => {
  return (
    <div className="flex min-h-full flex-col">
      <SiteHeader />
      <main className="flex-1 px-[4%] pt-4">
        <section>
          <div className="flex size-full min-h-[calc(100vh-64px)] overflow-hidden">
            {children}
            <Suspense fallback={<div>Loading...</div>}>
              <Suggestions />
            </Suspense>
          </div>
        </section>
      </main>
      {/* <SiteFooter /> */}
    </div>
  )
}

export default ConversationLayout
