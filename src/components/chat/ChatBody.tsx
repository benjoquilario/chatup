'use client';
import { useEffect, useRef, useState } from 'react';
import type { FullMessage } from '@/types/typings';
import { useSession } from 'next-auth/react';
import { cn } from '@/lib/cn';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/components/shared/Avatar';
import ChatForm from './ChatForm';
import { pusherClient } from '@/lib/pusher';
import find from 'lodash.find';
import useConversation from '@/lib/hooks/useConversation';

interface ChatBodyProps {
  initialMessages?: FullMessage[];
  children: React.ReactNode;
}

export default function ChatBody({
  initialMessages = [],
  children,
}: ChatBodyProps) {
  const [messages, setMessages] = useState(initialMessages);
  const bottomRef = useRef<HTMLDivElement>(null);
  const session = useSession();
  const { conversationId } = useConversation();

  useEffect(() => {
    pusherClient.subscribe(conversationId);
    bottomRef?.current?.scrollIntoView();

    function messageHandler(message: FullMessage) {
      setMessages(current => {
        if (find(current, { id: message.id })) {
          return current;
        }

        return [...current, message];
      });

      bottomRef?.current?.scrollIntoView();
    }

    function updateMessageHandler(newMessage: FullMessage) {
      setMessages(current =>
        current.map(currentMessage => {
          if (currentMessage.id === newMessage.id) {
            return newMessage;
          }

          return currentMessage;
        })
      );
    }

    pusherClient.bind('messages:new', messageHandler);
    pusherClient.bind('message:update', updateMessageHandler);
    return () => {
      pusherClient.unsubscribe(conversationId);
      pusherClient.unbind('messages:new', messageHandler);
      pusherClient.unbind('message:update', updateMessageHandler);
    };
  }, [conversationId]);

  return (
    <div className="lg:pl-80 h-full">
      <div className="h-full flex flex-col">
        {children}
        <div className="flex-1 overflow-y-auto">
          {messages.map(message => {
            const isCurrentUser =
              message.sender.email === session.data?.user?.email;

            return (
              <div
                key={message.id}
                className={cn('flex gap-2 w-full items-end p-3', {
                  'justify-end': isCurrentUser,
                })}
              >
                <div className={cn(isCurrentUser && 'order-2')}>
                  <Avatar className={cn('h-6 w-6')}>
                    <AvatarImage src="/images/placeholder.jpg" />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                </div>
                <div
                  className={cn('shadow-md rounded-md p-3 text-light text-sm', {
                    'bg-primary text-white': isCurrentUser,
                    'bg-secondary text-accent-foreground': !isCurrentUser,
                  })}
                >
                  <p>{message.body}</p>
                  <div className="mt-2 text-white text-xs">10:30 AM</div>
                </div>
              </div>
            );
          })}
          <div className="pt-24"></div>
        </div>
        <ChatForm />
      </div>
    </div>
  );
}
