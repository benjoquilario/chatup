'use client';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/components/shared/Avatar';
import { Button } from '@/components/shared/Button';
import { cn } from '@/lib/cn';
import type { User } from '@prisma/client';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { useCallback, useState } from 'react';

interface UserItemProps {
  user: User;
}

export default function UserItem({ user }: UserItemProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleOnClick = useCallback(async () => {
    setIsLoading(true);

    try {
      // const res = await axios.post('/api/conversations', { userId: user.id });

      // if (res.status === 200) {
      //   setIsLoading(false);

      router.push(`/chat/${user.id}`);
      // }
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  }, [user.id, router]);

  return (
    <Button
      className={cn('w-full h-[3.25rem] py-2 px-4')}
      onClick={handleOnClick}
      variant="secondary"
      size="lg"
    >
      <Avatar className={cn('h-9 w-9')}>
        <AvatarImage src="/images/placeholder.jpg" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      <div className="min-w-0 flex-1 ml-2">
        {/* <span className="absolute inset-0" aria-hidden="true" /> */}
        <div className="flex justify-between items-center mb-1">
          <p className="text-sm font-medium text-white capitalize">
            {user.name}
          </p>
        </div>
      </div>
    </Button>
  );
}
