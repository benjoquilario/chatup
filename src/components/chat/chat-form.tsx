'use client';
import axios from 'axios';
import { CldUploadButton } from 'next-cloudinary';
import { HiPaperAirplane, HiPhoto } from 'react-icons/hi2';
import { Button } from '@/components/ui/button';
import {Input} from '@/components/ui/input';
import { useForm } from 'react-hook-form';
import useConversation from '@/lib/hooks/useConversation';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/components/ui/avatar';
import React, { useEffect, useRef, useState } from 'react';

type FormData = {
  message: string;
};

export default function ChatForm() {
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { conversationId } = useConversation();

  const {
    register,
    handleSubmit,
    setValue,
    setFocus,
    watch,
    reset,
    formState: { errors, isSubmitSuccessful },
  } = useForm<FormData>({
    defaultValues: {
      message: '',
    },
  });

  const messageText = watch('message');

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
  }, [isSubmitSuccessful, reset]);

  useEffect(() => {
    setFocus('message');
  }, [setFocus]);

  async function handleOnSubmit(data: FormData) {
    setIsLoading(true);

    try {
      setValue('message', '', { shouldValidate: true });
      const res = await axios.post('/api/messages', {
        ...data,
        conversationId: conversationId,
      });

      if (res.status === 200) setIsLoading(false);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  const handleKeyPress = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 'Enter' && event.shiftKey === false) {
      event.preventDefault();
      buttonRef?.current?.click();
      reset();
    }
  };

  return (
    <div className="p-3 lg:p-4 z-100 w-full bg-background border-t border-border">
      <div className="flex items-center gap-2 lg:gap-4">
        <Avatar className="w-10 h-10">
          <AvatarImage src="/images/placeholder.jpg" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <form
          onSubmit={handleSubmit(handleOnSubmit)}
          className="flex items-center gap-2 lg:gap-4 w-full"
        >
          <div className="relative w-full">
            <Input
              className="text-white flex"
              placeholder="Write a message..."
              {...register('message', { required: false })}
            />
          </div>
          <Button
            disabled={isLoading}
            type="submit"
            variant="ghost"
            ref={buttonRef}
          >
            <HiPaperAirplane className="text-white h-6 w-6" />
          </Button>
        </form>
      </div>
    </div>
  );
}
