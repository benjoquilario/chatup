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
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { userAuthSchema } from '@/lib/validations/auth';
import React, { useCallback, useState } from 'react';
import { CardContent, CardFooter } from '../ui/card';

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

            router.push('/conversation');
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
    <React.Fragment>
      <CardContent className="grid gap-4">
        <div className="w-full gap-3 grid grid-cols-2">
          <Button variant="outline">
            <AiOutlineGoogle aria-hidden="true" className="mr-2 h-4 w-4" />
            Google
          </Button>
          <Button variant="outline">
            <FiGithub aria-hidden="true" className="mr-2 h-4 w-4" />
            Github
          </Button>
        </div>
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">
              Or continue with
            </span>
          </div>
        </div>
        <form className="grid gap-4" onSubmit={handleSubmit(handleOnSubmit)}>
          {type === 'register' && (
            <div>
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
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              {...register('email', { required: true })}
              id="email"
              placeholder="m@example.com"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              type="email"
              disabled={isLoading}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <Input
              {...register('password', { required: true })}
              type="password"
              id="password"
              placeholder="Password"
              autoCapitalize="none"
              autoCorrect="off"
            />
          </div>
          <Button className="w-full" type="submit">
            {type === 'login' ? 'Sign In' : 'Create an account'}
          </Button>
        </form>
      </CardContent>
      <CardFooter className="grid gap-1.5">
        <div className="text-left text-sm mt-2">
          <span className="text-muted-foreground">
            {type === 'login'
              ? `Don't have an account?`
              : 'Already have an account?'}
          </span>
          <Link
            href={type === 'login' ? '/register' : 'login'}
            className="ml-1 underline transition duration-200 ease-in-out text-muted-foreground hover:text-primary"
          >
            {type === 'login' ? 'Register' : 'Login'}
          </Link>
        </div>
      </CardFooter>
    </React.Fragment>
  );
}
