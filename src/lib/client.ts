export const MESSAGES_PER_PAGE = 5

export const getChatMessages = async function (
  conversationId: string,
  offset: number
) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_URL}/api/messages/${conversationId}?limit${MESSAGES_PER_PAGE}&cursor=${offset}`
  )

  const data = await res.json()

  return data
}
