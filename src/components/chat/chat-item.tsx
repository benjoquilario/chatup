'use client';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Link from 'next/link';
import type { FullConversation } from '@/types/typings';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/cn';
import { format } from 'date-fns';
import { useSession } from 'next-auth/react';
import { useMemo } from 'react';

interface ChatItemProps {
  conversation: FullConversation;
  selected: boolean;
}

export default function ChatItem({ conversation, selected }: ChatItemProps) {
  const session = useSession();

  const userEmail = useMemo(
    () => session.data?.user?.email,
    [session.data?.user?.email]
  );

  const conversationPartner = useMemo(
    () =>
      conversation.users.find(user => user.email !== session.data?.user?.email),
    [conversation, session.data?.user?.email]
  );

  const lastMessage = useMemo(() => {
    const messages = conversation.messages || [];

    return messages[messages.length - 1];
  }, [conversation.messages]);

  const lastMessageText = useMemo(() => {
    if (lastMessage?.image) {
      return 'Sent an image';
    }

    if (lastMessage?.body) {
      return lastMessage.body;
    }

    return 'Started a conversation';
  }, [lastMessage]);

  return (
    <Link
      className={cn(
        buttonVariants({ variant: 'secondary', size: 'lg' }),
        'w-full h-[4.25rem] py-2 px-4 rounded-sm',
        {
          'bg-[#406ae0] hover:bg-[#5378e3]': selected,
        }
      )}
      href={`/converstion/${conversation.id}`}
    >
      <Avatar>
        <AvatarImage src="/images/placeholder.jpg" />
        <AvatarFallback>
          <div className="bg-secondary h-12 w-12 animate-pulse"></div>
        </AvatarFallback>
      </Avatar>
      <div className="flex justify-between w-full items-center ml-2">
        <div className="flex justify-between h-full flex-col text-sm items-start">
          <h3
            className={cn(
              'text-[15px] capitalize font-heading font-medium tracking-tight',
              {
                'text-[#ebeffc]': selected,
              }
            )}
          >
            {conversationPartner?.name || conversation.name}
          </h3>
          <span
            className={cn('text-accent-foreground text-[12px] font-medium', {
              'text-[#9eb3f0]': selected,
            })}
          >
            {lastMessageText}
          </span>
        </div>
        <div className="flex flex-col items-center">
          <span className="text-xs text-[#ebeffc] font-light mb-1">
            {/* {format(new Date(lastMessage.createdAt), 'p')} */}
            15 min ago
          </span>
          <span className="font-semibold text-white rounded-full h-4 w-4 flex justify-center items-center text-xs bg-destructive">
            6
          </span>
        </div>
      </div>
    </Link>
  );
}
