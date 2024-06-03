import { useParams } from "next/navigation"
import { useMemo } from "react"

export default function useConversation() {
  const params = useParams()

  const conversationId = useMemo(
    () => (!params?.conversationId ? "" : params.conversationId),
    [params.conversationId]
  )

  const isOpen = useMemo(() => !!conversationId, [conversationId])

  return useMemo(() => ({ isOpen, conversationId }), [isOpen, conversationId])
}
