'use client';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/components/shared/Avatar';
import Link from 'next/link';
import type { FullChat } from '@/types/typings';
import { buttonVariants } from '../shared/Button';
import { cn } from '@/lib/cn';
import { useMemo } from 'react';
// import { useSession } from 'next-auth/react';

interface ChatItemProps {
  data?: FullChat;
  selected?: boolean;
}

export default function ChatItem({ data, selected }: ChatItemProps) {
  // const session = useSession();
  // const lastMessage = useMemo(() => {
  //   const messages = data.messages || [];

  //   return messages[messages.length - 1];
  // }, [data.messages]);

  // const userEmail = useMemo(
  //   () => session.data?.user?.email,
  //   [session.data?.user?.email]
  // );

  // const lastMessageText = useMemo(() => {
  //   if (lastMessage?.image) {
  //     return 'Sent an image';
  //   }

  //   if (lastMessage?.body) {
  //     return lastMessage.body;
  //   }

  //   return 'Started a conversation';
  // }, [lastMessage]);

  return (
    <Link
      className={cn(
        buttonVariants({ variant: 'secondary', size: 'lg' }),
        'w-full h-[4.25rem] py-2 px-4'
      )}
      href={`/chat/21`}
    >
      <Avatar>
        <AvatarImage src="/images/placeholder.jpg" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      <div className="flex justify-between w-full items-center ml-2">
        <div className="flex justify-between h-full flex-col text-sm items-start">
          <h3 className="text-white text-[15px] font-medium tracking-tight">
            {/* {data.name} */} Benjo Quilario
          </h3>
          <span className="text-accent-foreground text-[13px] font-medium">
            {/* {lastMessageText} */} Yow!!
          </span>
        </div>
        <div className="flex flex-col items-center">
          <span className="text-xs text-accent-foreground font-light mb-1">
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
