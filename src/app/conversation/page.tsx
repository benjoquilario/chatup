import getChats from '@/utils/getConversation';
import getSession from '@/utils/getSession';
import { notFound, useRouter } from 'next/navigation';
import React from 'react';

export default async function Chat() {
  const session = await getSession();

  if (!session) notFound();

  return (
    <div className="flex justify-center items-center h-full pl-80">
      <h4 className="text-2xl text-white font-semibold">
        Select a chat or start a new conversation
      </h4>
    </div>
  );
}
