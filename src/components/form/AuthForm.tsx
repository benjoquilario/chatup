'use client';
import { FiGithub } from 'react-icons/fi';
import { AiOutlineGoogle } from 'react-icons/ai';
import { useForm, type SubmitHandler } from 'react-hook-form';
import axios from 'axios';
import { signIn, useSession } from 'next-auth/react';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import Link from 'next/link';
import Input from '@/components/shared/Input';
import { Button } from '@/components/shared/Button';
import Label from '@/components/shared/Label';
import Loader from '@/components/shared/Loader';
import { userAuthSchema } from '@/lib/validations/auth';
import React, { useCallback, useState } from 'react';

interface AuthFormProps {
  type: 'login' | 'register';
}

type FormData = z.infer<typeof userAuthSchema>;

export default function AuthForm({ type }: AuthFormProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(userAuthSchema),
  });

  console.log(isLoading);

  async function handleOnSubmit(data: FormData) {
    setIsLoading(true);

    try {
      if (type === 'register') {
        axios
          .post('/api/register', {
            ...data,
          })
          .then(res => {
            if (res.status === 200) {
              toast.success('Account created! Redirecting to login...');
              setTimeout(() => router.push('/login'), 2000);
            }
          })
          .catch(() => toast.error('Something went wrong!'))
          .finally(() => setIsLoading(false));
      } else {
        signIn('credentials', {
          ...data,
          redirect: false,
        }).then(res => {
          if (res?.ok) {
            router.refresh();
            router.push('/chat');
          } else {
            setIsLoading(false);
            toast.error('Invalid credentials');
          }
        });
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="w-full mt-4">
      <form onSubmit={handleSubmit(handleOnSubmit)}>
        <div className="w-full flex flex-col space-y-2">
          {type === 'register' && (
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label className="sr-only" htmlFor="name">
                Name
              </Label>
              <Input
                {...register('name')}
                type="text"
                id="name"
                placeholder="Name"
                autoCapitalize="none"
                autoCorrect="off"
                disabled={isLoading}
              />
            </div>
          )}
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label className="sr-only" htmlFor="email">
              Email
            </Label>
            <Input
              {...register('email', { required: true })}
              type="email"
              id="email"
              placeholder={type === 'login' ? 'Email' : 'name@example.com'}
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
            />
          </div>
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label className="sr-only" htmlFor="password">
              Password
            </Label>
            <Input
              {...register('password', { required: true })}
              type="password"
              id="password"
              placeholder="Password"
              autoCapitalize="none"
              autoCorrect="off"
            />
          </div>
          <Button
            className="w-full text-white"
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? (
              <Loader
                classNameIcon="animate-spin w-6 h-6"
                classNameContainer="text-white"
              />
            ) : type === 'login' ? (
              'Sign in'
            ) : (
              'Sign up'
            )}
          </Button>
          <div className="mt-5">
            <div className="relative">
              <div
                className="flex items-center inset-0 absolute"
                aria-hidden="true"
              >
                <div className="border-t w-full border-border"></div>
              </div>
              <div className="leading-6 font-medium text-sm relative flex justify-center">
                <span className="text-accent-foreground px-6 bg-background-800">
                  or continue with
                </span>
              </div>
            </div>
            <div className="w-full gap-3 flex justify-center items-center mt-6">
              <Button variant="outline">
                <AiOutlineGoogle aria-hidden="true" />
                Google
              </Button>
              <Button variant="outline">
                <FiGithub aria-hidden="true" />
                Github
              </Button>
            </div>
          </div>
          <div className="text-left text-sm mt-2">
            <span className="text-accent-foreground">
              {type === 'login'
                ? `Don't have an account?`
                : 'Already have an account?'}
            </span>
            <Link
              href={type === 'login' ? '/register' : 'login'}
              className="text-white ml-1 underline transition duration-200 ease-in-out focus:text-primary hover:text-accent-foreground"
            >
              {type === 'login' ? 'Register' : 'Login'}
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
}
