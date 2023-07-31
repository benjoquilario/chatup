import { Skeleton } from '@/components/ui/skeleton';
import getSession from '@/utils/getSession';
import { notFound } from 'next/navigation';

export default async function UsersPage() {
  const session = await getSession();

  if (!session) notFound();

  return (
    <div className="flex justify-center items-center h-full min-h-screen pl-[375px]">
      <h4 className="text-2xl font-semibold">
        Select a chat or search user to start a conversation
      </h4>
    </div>
  );
}
