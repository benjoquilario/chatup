import ChatBody from '@/components/chat/ChatBody';
import ChatForm from '@/components/chat/ChatForm';
import ChatHeader from '@/components/chat/ChatHeader';
import getCurrentUser from '@/utils/getCurrentUser';
import db from '@/lib/db';
import type { Chat } from '@prisma/client';
import React from 'react';

async function getChatMessages(chatId: Chat['id']) {
  const messages = await db.message.findMany({
    where: {
      chatId,
    },
    include: {
      sender: true,
      seen: true,
    },
    orderBy: {
      createdAt: 'asc',
    },
  });

  return messages;
}

async function getChatForUser(chatId: Chat['id']) {
  const currentUser = await getCurrentUser();

  if (!currentUser?.email) {
    return null;
  }

  const chat = await db.chat.findUnique({
    where: {
      id: chatId,
    },
    include: {
      users: true,
    },
  });

  return chat;
}

interface ChatPageProps {
  params: {
    chatId: string;
  };
}

export default async function ChatPage({ params }: ChatPageProps) {
  const { chatId } = params;
  const messages = await getChatMessages(chatId);
  const chat = await getChatForUser(chatId);

  // if (!chat) return <div className="h-full lg:pl-80">Hello World!</div>;

  return <ChatBody initialMessages={messages} />;
}
