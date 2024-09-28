import React from "react"

interface ConversationLayoutProps {
  children: React.ReactNode
}

const ConversationLayout = async ({ children }: ConversationLayoutProps) => {
  return (
    <div className="h-full">
      <main className="h-full">{children}</main>
    </div>
  )
}

export default ConversationLayout
