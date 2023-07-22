import { Button } from '../shared/Button';
import { BsPersonFill } from 'react-icons/bs';
import { BiDotsVerticalRounded } from 'react-icons/bi';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/components/shared/Avatar';
import { cn } from '@/lib/cn';
import type { Chat, User } from '@prisma/client';
import { useMemo } from 'react';

interface ChatHeaderProps {
  chat?: Chat & {
    users: User[];
  };
}

export default function ChatHeader({ chat }: ChatHeaderProps) {
  // const statusText = useMemo(
  //   () => (chat.isGroup ? `${chat.userIds.length} members` : 'Active'),
  //   [chat]
  // );

  return (
    <div className="bg-background w-full flex border-b border-l border-border sm:px-4 py-3 px-4 lg:px-6 justify-between items-center shadow ml-[-1px]">
      <div className="flex gap-2 items-center">
        <Avatar className="w-10 h-10">
          <AvatarImage src="/images/placeholder.jpg" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <div>
          <h3 className="font-medium text-white">Benjo Quilario</h3>
          <p className="font-light text-xs text-accent-foreground">Offline</p>
        </div>
      </div>
      <div className="flex gap-3">
        <Button variant="ghost" size="sm">
          <BsPersonFill
            className="text-accent-foreground h-5 w-5 shrink-0"
            aria-hidden="true"
          />
        </Button>
        <Button variant="ghost" size="sm">
          <BiDotsVerticalRounded
            className="h-5 w-5 shrink-0 text-accent-foreground"
            aria-hidden="true"
          />
        </Button>
      </div>
    </div>
  );
}
