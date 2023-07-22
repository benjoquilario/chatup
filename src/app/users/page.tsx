import getSession from '@/utils/getSession';
import { notFound } from 'next/navigation';

export default async function UsersPage() {
  const session = await getSession();

  if (!session) notFound();

  return (
    <div className="flex justify-center items-center h-full min-h-screen pl-80">
      <h4 className="text-2xl text-white font-semibold">
        Select a chat or search user to start a conversation
      </h4>
    </div>
  );
}
