'use client';
import Input from '@/components/shared/Input';
import Button from '@/components/shared/Button';
import Link from 'next/link';
import { FiGithub } from 'react-icons/fi';
import { AiOutlineGoogle } from 'react-icons/ai';
import { useForm, type SubmitHandler } from 'react-hook-form';
import axios from 'axios';
import { signIn, useSession } from 'next-auth/react';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import React, { useCallback, useState } from 'react';

type TVariant = 'LOGIN' | 'REGISTER';
type TFormValues = {
  email: string;
  password: string;
  name: string;
};

const AuthForm = () => {
  const router = useRouter();
  const [variant, setVariant] = useState<TVariant>('LOGIN');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | undefined>();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TFormValues>({
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
  });

  const toggleVariant = useCallback(
    () => (variant === 'LOGIN' ? setVariant('REGISTER') : setVariant('LOGIN')),
    [variant]
  );

  const handleOnSubmit: SubmitHandler<TFormValues> = async data => {
    setIsLoading(true);

    if (variant === 'REGISTER')
      axios
        .post('/api/register', data)
        .then(() =>
          signIn('credentials', {
            ...data,
            redirect: false,
          })
        )
        .then(callback => {
          if (callback?.error) {
            toast.error('Invalid Credentials!');
            setErrorMessage(callback.error);
          }

          if (callback?.ok) router.push('/dashboard');
        })
        .catch(() => toast.error('Something went wrong'))
        .finally(() => setIsLoading(false));

    if (variant === 'LOGIN')
      signIn('credentials', {
        ...data,
        redirect: false,
      })
        .then(callback => {
          if (callback?.error) toast.error('Invalid credentials');

          if (callback?.ok) router.push('/dashboard');
        })
        .finally(() => setIsLoading(false));
  };

  return (
    <div className="w-full mt-4">
      <form onSubmit={handleSubmit(handleOnSubmit)}>
        {variant === 'REGISTER' && (
          <Input
            className="h-10 bg-background-900 mb-2.5"
            labelClassName="sr-only text-white text-sm"
            label="Name"
            type="text"
            placeholder="Name"
            {...register('name', { required: true })}
          />
        )}
        <Input
          className="h-10 bg-background-900 mb-2.5"
          labelClassName="sr-only text-white text-sm"
          label="Email"
          type="text"
          placeholder="Email"
          {...register('email', { required: true })}
        />
        <Input
          className="h-10 bg-background-900 mb-2.5"
          labelClassName="sr-only text-white text-sm"
          label="Password"
          type="password"
          placeholder="Password"
          {...register('password', { required: true })}
        />
        <Button
          type="submit"
          disabled={isLoading}
          className="bg-primary text-white w-full h-10 rounded-sm"
        >
          {variant === 'LOGIN' ? 'Sign in' : 'Sign up'}
        </Button>
        <div className="mt-5">
          <div className="relative">
            <div
              className="flex items-center inset-0 absolute"
              aria-hidden="true"
            >
              <div className="border-t w-full border-[#313550]"></div>
            </div>
            <div className="leading-6 font-medium text-sm relative flex justify-center">
              <span className="text-ice px-6 bg-background-800">
                or continue with
              </span>
            </div>
          </div>
          <div className="w-full gap-3 flex justify-center items-center mt-6">
            <Button className="hover:bg-[#3a3e5c] w-full flex justify-center items-center gap-2 rounded-md h-10 text-ice ring-1 ring-inset ring-[#313550]">
              <AiOutlineGoogle aria-hidden="true" />
              Google
            </Button>
            <Button className="hover:bg-[#3a3e5c] w-full flex justify-center items-center gap-2 rounded-md h-10 text-ice ring-1 ring-inset ring-[#313550]">
              <FiGithub aria-hidden="true" />
              Github
            </Button>
          </div>
        </div>
        <div className="text-left text-sm mt-2">
          <span className="text-ice">
            {variant === 'LOGIN'
              ? `Don't have an account?`
              : 'Already have an account?'}
          </span>
          <Button
            onClick={toggleVariant}
            className="text-white ml-1 underline transition duration-200 ease-in-out focus:text-primary hover:text-secondary "
          >
            {variant === 'LOGIN' ? 'Register' : 'Login'}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AuthForm;
