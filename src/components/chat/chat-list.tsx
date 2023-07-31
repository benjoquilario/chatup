'use client';

import ChatItem from './chat-item';
import { Input } from '@/components/ui/input';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import type { FullConversation } from '@/types/typings';
import type { User } from '@prisma/client';

import React, { useEffect, useMemo, useState } from 'react';
import ListContainer from '@/components/shared/list-container';
import useChat from '@/lib/hooks/useConversation';
import { pusherClient } from '@/lib/pusher';
import find from 'lodash.find';

interface ChatListProps {
  conversations: FullConversation[];
  users?: User[];
}

export default function ChatList({ conversations, users }: ChatListProps) {
  const [items, setItems] = useState(conversations);
  const router = useRouter();
  const session = useSession();

  const { conversationId, isOpen } = useChat();

  const pusherKey = useMemo(
    () => session?.data?.user?.email,
    [session?.data?.user?.email]
  );

  useEffect(() => {
    if (!pusherKey) return;

    pusherClient.subscribe(pusherKey);

    function updateHandler(conversation: FullConversation) {
      setItems(current =>
        current.map(currentConversation => {
          if (currentConversation.id === conversation.id) {
            return {
              ...currentConversation,
              messages: conversation.messages,
            };
          }
          return currentConversation;
        })
      );
    }

    function newHandler(conversation: FullConversation) {
      setItems(current => {
        const isConversationExist = find(current, { id: conversation.id });

        if (isConversationExist) return current;
        return [conversation, ...current];
      });
    }

    function removeHandler(conversation: FullConversation) {
      setItems(current => [
        ...current.filter(convo => convo.id !== conversation.id),
      ]);
    }

    pusherClient.bind('conversation:update', updateHandler);
    pusherClient.bind('conversation:new', newHandler);
    pusherClient.bind('conversation:remove', removeHandler);
  }, [pusherKey, router]);

  return (
    <ListContainer listTitle="Messages">
      <Input
        type="search"
        className="text-accent-foreground my-2"
        placeholder="Search user..."
      />
      {items.map(conversation => (
        <ChatItem
          key={conversation.id}
          conversation={conversation}
          selected={conversation.id === conversationId}
        />
      ))}
    </ListContainer>
  );
}
