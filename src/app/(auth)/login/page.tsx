import AuthForm from "@/components/auth-form"
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

const Login = () => {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <Card className="w-[450px]">
        <CardHeader>
          <CardTitle className="text-2xl">Welcome to Chatty!</CardTitle>
          <CardDescription>
            Enter your email and password to login.
          </CardDescription>
        </CardHeader>
        <AuthForm type="login" />
      </Card>
    </div>
  )
}

export default Login
