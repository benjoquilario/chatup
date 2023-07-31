'use client';
import { useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { BsPersonFill } from 'react-icons/bs';
import { BiDotsVerticalRounded } from 'react-icons/bi';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/components/ui/avatar';
import { cn } from '@/lib/cn';
import type { Conversation, User } from '@prisma/client';
import { useSession } from 'next-auth/react';

interface ChatHeaderProps {
  conversation: Conversation & {
    users: User[];
  };
}

export default function ChatHeader({ conversation }: ChatHeaderProps) {
  const session = useSession();
  const statusText = useMemo(
    () =>
      conversation.isGroup
        ? `${conversation.userIds.length} members`
        : 'Active',
    [conversation]
  );

  const conversationPartner = useMemo(
    () =>
      conversation.users.find(
        user => user.email !== session?.data?.user?.email
      ),
    [session.data?.user?.email, conversation]
  );

  return (
    <div className="bg-background w-full flex border-b border-border sm:px-4 py-3 px-4 lg:px-6 justify-between items-center shadow">
      <div className="flex gap-2 items-center">
        <Avatar className="w-10 h-10">
          <AvatarImage src="/images/placeholder.jpg" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <div>
          <h3 className="font-heading font-medium leading-tight capitalize">
            {conversation.name || conversationPartner?.name}
          </h3>
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
