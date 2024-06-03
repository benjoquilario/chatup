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
import { userAuthSchema } from "@/lib/validations/auth"
import * as z from "zod"
import axios from "axios"
import { toast } from "sonner"

import React, { useState } from "react"
import { signIn } from "next-auth/react"

interface AuthFormProps {
  authType: "login" | "register"
}
type FormData = z.infer<typeof userAuthSchema>

const AuthForm = ({ authType }: AuthFormProps) => {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(userAuthSchema),
  })

  async function handleOnSubmit(data: FormData) {
    setIsLoading(true)

    if (authType === "register") {
      const response = await axios.post("/api/register", {
        ...data,
      })

      if (response.status === 200) {
        toast.success("Account created! Redirecting to login...")
        setTimeout(() => router.push("/login"), 1000)
      } else {
        toast.error("Something went wrong!")
      }

      setIsLoading(false)
    } else {
      const response = await signIn("credentials", { ...data, redirect: false })

      if (response?.ok) {
        router.refresh()

        router.push("/conversation")
      } else {
        setIsLoading(false)
        toast.error("Invalid credentials")
      }
    }
  }

  return (
    <React.Fragment>
      <CardContent className="grid gap-4">
        <div className="grid w-full grid-cols-2 gap-3">
          <Button variant="outline" disabled={isLoading}>
            <AiOutlineGoogle aria-hidden="true" className="mr-2 size-4" />
            Google
          </Button>
          <Button variant="outline" disabled={isLoading}>
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

        <form className="grid gap-4" onSubmit={handleSubmit(handleOnSubmit)}>
          {authType === "register" && (
            <div className="grid gap-2">
              <Label htmlFor="name">Name</Label>
              <Input
                {...register("name")}
                type="text"
                id="name"
                autoCapitalize="none"
                autoCorrect="off"
                disabled={isLoading}
              />
            </div>
          )}
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              {...register("email", { required: true })}
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
              {...register("password", { required: true })}
              type="password"
              id="password"
              autoCapitalize="none"
              autoCorrect="off"
              disabled={isLoading}
            />
          </div>
          <Button className="w-full" disabled={isLoading} type="submit">
            {authType === "login" ? "Sign In" : "Create an account"}
          </Button>
        </form>
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
