import React, { Suspense } from "react"
import Suggestions from "@/components/suggestions"
import ChatHeader from "@/components/chat/chat-header"

const UsersPage = () => {
  return (
    <>
      <ChatHeader />
      <Suspense fallback={<div className="">Loading...</div>}>
        <Suggestions />
      </Suspense>
    </>
  )
}

export default UsersPage
