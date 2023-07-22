import getSession from './getSession';
import db from '@/lib/db';

export default async function getUsers() {
  const session = await getSession();

  if (!session?.user?.email) return [];

  return await db.user.findMany({
    orderBy: {
      createdAt: 'desc',
    },
    where: {
      NOT: {
        email: session.user.email,
      },
    },
  });
}
