'use client';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
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

  const handleOnClick = useCallback(() => {
    axios.post('/api/conversations', { userId: user.id }).then(data => {
      router.push(`/conversation/${data.data.id}`);
    });
  }, [user, router]);

  return (
    <Button
      className={cn('w-full h-[3.25rem] py-2 px-4')}
      onClick={handleOnClick}
      variant="ghost"
      size="lg"
    >
      <Avatar className={cn('h-9 w-9')}>
        <AvatarImage src="/images/placeholder.jpg" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      <div className="min-w-0 flex-1 ml-2">
        {/* <span className="absolute inset-0" aria-hidden="true" /> */}
        <div className="flex justify-between items-center mb-1">
          <p className="text-[15px] font-medium capitalize">{user.name}</p>
        </div>
      </div>
    </Button>
  );
}
