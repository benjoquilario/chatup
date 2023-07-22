import db from '@/lib/db';
import getCurrentUser from './getCurrentUser';

const getChats = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser?.id) return [];

  const chats = await db.chat.findMany({
    orderBy: {
      lastMessageAt: 'desc',
    },
    where: {
      userIds: {
        has: currentUser.id,
      },
    },
    include: {
      users: true,
      messages: {
        include: {
          sender: true,
          seen: true,
        },
      },
    },
  });

  return chats;
};

export default getChats;
