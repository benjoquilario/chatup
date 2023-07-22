'use client';
import axios from 'axios';
import { CldUploadButton } from 'next-cloudinary';
import { HiPaperAirplane, HiPhoto } from 'react-icons/hi2';
import { Button } from '@/components/shared/Button';
import Input from '@/components/shared/Input';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import useChat from '@/lib/hooks/useChat';
import { toast } from 'react-hot-toast';
import Textarea from '../shared/TextArea';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/components/shared/Avatar';
import React, { useEffect, useRef, useState } from 'react';

export default function ChatForm() {
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { chatId } = useChat();

  const {
    register,
    handleSubmit,
    setValue,
    setFocus,
    watch,
    reset,
    formState: { errors, isSubmitSuccessful },
  } = useForm<FieldValues>({
    defaultValues: {
      message: '',
    },
  });

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
  }, [isSubmitSuccessful, reset]);

  useEffect(() => {
    setFocus('message');
  }, [setFocus]);

  const handleOnSubmit: SubmitHandler<FieldValues> = data => {
    setValue('message', { shouldValidate: true });
    axios.post('/api/messages', { ...data, chatId: chatId });
  };

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
              className="text-white flex min-h-[60px]"
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
