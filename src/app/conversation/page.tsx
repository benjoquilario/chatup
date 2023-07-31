import ChatBody from '@/components/chat/chat-body';
import ChatHeader from '@/components/chat/chat-header';
import getConversations from '@/utils/getConversation';
import getChats from '@/utils/getConversation';
import getChatMessages from '@/utils/getMessages';
import getSession from '@/utils/getSession';
import { notFound, redirect, useRouter } from 'next/navigation';
import React from 'react';

export default async function Chat() {
  const session = await getSession();
  const conversations = await getConversations();

  if (!session) notFound();

  if(conversations) {
    redirect(`/conversation/${conversations[0].id}`);
  }

  return (
    <div className="flex justify-center items-center h-full min-h-screen pl-80">
      <h4 className="text-2xl font-semibold">
        Select a chat or search user to start a conversation
      </h4>
    </div>
  );
}
