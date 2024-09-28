import { QUERY_KEYS } from "@/lib/queryKeys"
import { useInfiniteQuery } from "@tanstack/react-query"

type ChatMessagesProps = {
  conversationId: string
}

const ChatMessages: React.FC<ChatMessagesProps> = ({ conversationId }) => {
  const {
    data: messages,
    isPending,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: [QUERY_KEYS.GET_INFINITE_MESSAGEs, conversationId],
    queryFn: ({ pageParam }) =>
      fetch(
        `${process.env.NEXT_PUBLIC_URL}/api/message/${conversationId}?limit=${5}&cursor=${pageParam}`
      ).then((res) => res.json()),
    getNextPageParam: (lastPage) => lastPage.nextSkip,
    refetchOnWindowFocus: false,
  })

  return <div>ChatMessages</div>
}
export default ChatMessages
