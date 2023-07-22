import { useParams } from 'next/navigation';
import { useMemo } from 'react';

const useChat = () => {
  const params = useParams();
  const chatId = useMemo(
    () => (!params?.chatId ? '' : params.chatId),
    [params.chatId]
  );

  const isOpen = useMemo(() => !!chatId, [chatId]);

  return useMemo(() => ({ isOpen, chatId }), [isOpen, chatId]);
};

export default useChat;
