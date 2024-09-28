"use client"
import { type RegisterUser, registerAuthSchema } from "@/lib/validations/auth"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useForm, type SubmitHandler } from "react-hook-form"
import { register } from "@/server/auth"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"

const RegisterForm = () => {
  const router = useRouter()

  const form = useForm<RegisterUser>({
    resolver: zodResolver(registerAuthSchema),
  })

  const { handleSubmit, control, formState, setError } = form

  const submit = async function (data: RegisterUser) {
    const res = await register(data)

    if (res.success) router.push("/auth/login")
    else {
      switch (res.statusCode) {
        case 400:
          const nestedErrors = res.error as any

          for (const key in nestedErrors) {
            setError(key as keyof RegisterUser, {
              message: nestedErrors[key]?.[0],
            })
          }
          break
        case 409:
          setError("email", { message: "Email already exists" })
        case 500:
          setError("password", { message: "Internal Error" })
      }
    }
  }

  return (
    <Form {...form}>
      <form className="grid gap-2.5" onSubmit={handleSubmit(submit)}>
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
          Create an account
        </Button>
      </form>
    </Form>
  )
}
export default RegisterForm
