"use client"

import { Label } from "./ui/label"
import { Button } from "./ui/button"
import { CardContent, CardFooter } from "./ui/card"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import { FiGithub } from "react-icons/fi"
import { AiOutlineGoogle } from "react-icons/ai"
import { useRouter } from "next/navigation"
import { useForm, type SubmitHandler } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import {
  type AuthUsers,
  registerAuthSchema,
  type RegisterUser,
  userAuthSchema,
} from "@/lib/validations/auth"
import * as z from "zod"
import { toast } from "sonner"

import React, { useState } from "react"
import { login, oauthSigninAction, register as signUp } from "@/server/auth"

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"

interface AuthFormProps {
  authType: "login" | "register"
}
type FormData = z.infer<typeof userAuthSchema>

const AuthForm = ({ authType }: AuthFormProps) => {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const form = useForm<RegisterUser>({
    resolver: zodResolver(registerAuthSchema),
  })

  const { handleSubmit, control, formState, setError } = form

  async function handleOnSubmit(data: RegisterUser) {
    if (authType === "register") {
      const res = await signUp(data)

      if (res.success) {
        toast.success("Account created! Redirecting to login...")
        setTimeout(() => router.push("/login"), 1000)
      } else {
        toast.error("Something went wrong!")
      }
    } else {
      const res = await login(data)

      if (res.success) window.location.href = "/conversation"
    }
  }

  const clickHandler = async (provider: "google" | "github") => {
    try {
      const res = await oauthSigninAction(provider)

      if (res.success) window.location.href = "/conversation"
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <React.Fragment>
      <CardContent className="grid gap-2.5">
        <div className="grid w-full grid-cols-2 gap-3">
          <Button
            onClick={clickHandler.bind(null, "google")}
            variant="outline"
            disabled={isLoading}
          >
            <AiOutlineGoogle aria-hidden="true" className="mr-2 size-4" />
            Google
          </Button>
          <Button
            onClick={clickHandler.bind(null, "google")}
            variant="outline"
            disabled={isLoading}
          >
            <FiGithub aria-hidden="true" className="mr-2 size-4" />
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

        <Form {...form}>
          <form
            className="grid gap-2.5"
            onSubmit={handleSubmit(handleOnSubmit)}
          >
            {authType === "register" && (
              <div className="grid grid-cols-2 gap-2.5">
                <FormField
                  control={control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>First Name</FormLabel>
                      <FormControl>
                        <div className="grid gap-2">
                          <Input
                            {...field}
                            type="text"
                            id="firstname"
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
                  name="lastName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Last Name</FormLabel>
                      <FormControl>
                        <div className="grid gap-2">
                          <Input
                            {...field}
                            type="text"
                            id="lastname"
                            disabled={formState.isSubmitting}
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            )}
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
              {authType === "login" ? "Sign In" : "Create an account"}
            </Button>
          </form>
        </Form>
      </CardContent>
      <CardFooter className="grid gap-1.5">
        <div className="mt-2 text-left text-sm">
          <span className="text-muted-foreground">
            {authType === "login"
              ? `Don't have an account?`
              : "Already have an account?"}
          </span>
          <Link
            href={authType === "login" ? "/register" : "login"}
            className="ml-1 text-muted-foreground underline transition duration-200 ease-in-out hover:text-primary"
          >
            {authType === "login" ? "Register" : "Login"}
          </Link>
        </div>
      </CardFooter>
    </React.Fragment>
  )
}

export default AuthForm
