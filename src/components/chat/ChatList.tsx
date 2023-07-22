'use client';
import ChatItem from './ChatItem';
import Input from '@/components/shared/Input';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import type { FullChat } from '@/types/typings';
import type { User } from '@prisma/client';

import React, { useState } from 'react';
import ListContainer from '../shared/ListContainer';

interface ChatListProps {
  chats?: FullChat[];
  users?: User[];
}

export default function ChatList({ chats, users }: ChatListProps) {
  const [items, setItems] = useState(chats);
  const router = useRouter();
  const session = useSession();

  return (
    <ListContainer listTitle="Messages">
      <Input
        type="search"
        className="text-accent-foreground my-2"
        placeholder="Search user..."
      />
      <ChatItem />
    </ListContainer>
  );
}
