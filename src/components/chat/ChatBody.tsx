'use client';
import React, { useState } from 'react';
import type { FullMessage } from '@/types/typings';
import { useSession } from 'next-auth/react';
import { cn } from '@/lib/cn';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/components/shared/Avatar';
import ChatForm from './ChatForm';
import ChatItem from './ChatItem';
import ChatHeader from './ChatHeader';

interface ChatBodyProps {
  initialMessages?: FullMessage[];
}

export default function ChatBody({ initialMessages = [] }: ChatBodyProps) {
  const [messages, setMessages] = useState(initialMessages);
  const session = useSession();

  return (
    <div className="lg:pl-80 h-full">
      <div className="h-full flex flex-col">
        <ChatHeader />
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

{
  /* <ul>
  
</ul>; */
}
