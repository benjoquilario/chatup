import getCurrentUser from '@/utils/getCurrentUser';
import { NextResponse } from 'next/server';
import db from '@/lib/db';
import { pusherServer } from '@/lib/pusher';

export async function GET(request: Request) {
  const currentUser = await getCurrentUser();
  const body = await request.json();

  if (!currentUser?.email) {
    return null;
  }

  const chat = await db.conversation.findUnique({
    where: {
      id: body.chatId,
    },
    include: {
      users: true,
    },
  });

  return chat;
}

export async function POST(request: Request) {
  try {
    const currentUser = await getCurrentUser();
    const body = await request.json();

    const { userId, isGroup, members, name } = body;

    if (!currentUser?.id || !currentUser?.email)
      return new NextResponse('Unauthorized', { status: 400 });

    if (isGroup && (!members || members.length < 2 || !name)) {
      return new NextResponse('Invalid data', { status: 400 });
    }

    if (isGroup) {
      const createConversation = await db.conversation.create({
        data: {
          name,
          isGroup,
          users: {
            connect: [
              ...members.map((member: { value: string }) => ({
                id: member.value,
              })),
              {
                id: currentUser.id,
              },
            ],
          },
        },
        include: {
          users: true,
        },
      });

      createConversation.users.forEach(user => {
        if (user.email) {
          pusherServer.trigger(
            user.email,
            'conversation:new',
            createConversation
          );
        }
      });

      return NextResponse.json(createConversation);
    }

    const existingConversation = await db.conversation.findMany({
      where: {
        OR: [
          {
            userIds: {
              equals: [currentUser.id, userId],
            },
          },
          {
            userIds: {
              equals: [userId, currentUser.id],
            },
          },
        ],
      },
    });

    const singleConversation = existingConversation[0];

    if (singleConversation) {
      return NextResponse.json(singleConversation);
    }

    const createConversation = await db.conversation.create({
      data: {
        users: {
          connect: [
            {
              id: currentUser.id,
            },
            {
              id: userId,
            },
          ],
        },
      },
      include: {
        users: true,
      },
    });

    createConversation.users.map(user => {
      if (user.email) {
        pusherServer.trigger(
          user.email,
          'conversation:new',
          createConversation
        );
      }
    });

    return NextResponse.json(createConversation);
  } catch (error) {
    console.log(error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}
