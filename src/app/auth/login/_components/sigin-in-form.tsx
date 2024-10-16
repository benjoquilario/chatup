"use client"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { AuthUsers, userAuthSchema } from "@/lib/validations/auth"
import { useForm, type SubmitHandler } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { login } from "@/server/auth"
import { Input } from "@/components/ui/input"

const SignInForm = () => {
  const form = useForm<AuthUsers>({
    resolver: zodResolver(userAuthSchema),
  })

  const { handleSubmit, control, formState, setError } = form

  async function handleOnSubmit(data: AuthUsers) {
    const res = await login(data)

    if (res.success) window.location.href = "/conversation"
    else {
      switch (res.statusCode) {
        case 401:
          setError("password", { message: res.error })
        case 500:
        default:
          const error = res.error || "Something went wrong"
          setError("password", { message: error })
      }
    }
  }

  return (
    <Form {...form}>
      <form className="grid gap-2.5" onSubmit={handleSubmit(handleOnSubmit)}>
        <FormField
          control={control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <div className="grid gap-2">
                  <Input
                    {...field}
                    id="email"
                    type="email"
                    disabled={formState.isSubmitting}
                  />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <div className="grid gap-2">
                  <Input
                    disabled={formState.isSubmitting}
                    {...field}
                    type="password"
                    id="password"
                  />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          disabled={formState.isSubmitting}
          className="w-full"
          type="submit"
        >
          Sign In
        </Button>
      </form>
    </Form>
  )
}
export default SignInForm
