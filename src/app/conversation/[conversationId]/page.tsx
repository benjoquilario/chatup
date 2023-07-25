import ChatBody from '@/components/chat/ChatBody';
import ChatHeader from '@/components/chat/ChatHeader';
import getCurrentUser from '@/utils/getCurrentUser';
import db from '@/lib/db';
import type { Conversation } from '@prisma/client';
import React from 'react';
import getSession from '@/utils/getSession';
import { notFound } from 'next/navigation';

async function getChatMessages(conversationId: Conversation['id']) {
  const messages = await db.message.findMany({
    where: {
      conversationId,
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

async function getConversationForUser(conversationId: Conversation['id']) {
  const currentUser = await getCurrentUser();

  if (!currentUser?.email) {
    return null;
  }

  const conversation = await db.conversation.findUnique({
    where: {
      id: conversationId,
    },
    include: {
      users: true,
    },
  });

  return conversation;
}

interface ChatPageProps {
  params: {
    conversationId: string;
  };
}

export default async function ChatPage({ params }: ChatPageProps) {
  const session = await getSession();
  const { conversationId } = params;

  if (!session) notFound();

  const messages = await getChatMessages(conversationId);
  const conversation = await getConversationForUser(conversationId);

  if (!conversation)
    return <div className="h-full lg:pl-80">No Conversation Found</div>;

  return (
    <ChatBody initialMessages={messages}>
      <ChatHeader conversation={conversation} />
    </ChatBody>
  );
}
