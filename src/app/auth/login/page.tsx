import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card"
import SignInForm from "./_components/sigin-in-form"
import Link from "next/link"
import Oauth from "../oauth"
import { Suspense } from "react"

const Login = () => {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <Card className="w-full max-w-96 border-none shadow-none">
        <CardHeader>
          <CardTitle className="text-2xl">Welcome to Chatty!</CardTitle>
          <CardDescription>
            Enter your email and password to login.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-2.5">
          <Suspense>
            <Oauth />
          </Suspense>
          <div className="grid w-full grid-cols-2 gap-3"></div>
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

          <SignInForm />
        </CardContent>
        <CardFooter className="grid gap-1.5">
          <div className="mt-2 text-left text-sm">
            <span className="text-muted-foreground">
              Don&apos;t have an account?
            </span>
            <Link
              href="/auth/register"
              className="ml-1 text-muted-foreground underline transition duration-200 ease-in-out hover:text-primary"
            >
              Register
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}

export default Login
