"use server"

import {
  AuthUsers,
  registerAuthSchema,
  RegisterUser,
} from "@/lib/validations/auth"
import { credentialsValidator, Register } from "@/lib/validations/credentials"
import { AuthError } from "next-auth"
import { signIn, signOut } from "@/auth"
import bcrypt from "bcrypt"
import db from "@/lib/db"
import { registerValidator } from "@/lib/validations/credentials"
import { isRedirectError } from "next/dist/client/components/redirect"
import { getConversations } from "@/lib/metrics"

export async function login(values: AuthUsers) {
  try {
    const validatedFields = credentialsValidator.safeParse(values)

    if (!validatedFields.success) {
      return {
        error: "Invalid Fields",
      }
    }

    const { email, password } = validatedFields.data

    await signIn("credentials", {
      email,
      password,
      redirect: false,
    })

    return { success: true }
  } catch (err) {
    if (err instanceof AuthError) {
      switch (err.type) {
        case "CredentialsSignin":
        case "CallbackRouteError":
          return {
            success: false,
            error: "Invalid credentials",
            statusCode: 401,
          }
        case "AccessDenied":
          return {
            success: false,
            error:
              "Please verify your email, sign up again to resend verification email",
            statusCode: 401,
          }
        // custom error
        case "OAuthAccountAlreadyLinked" as AuthError["type"]:
          return {
            success: false,
            error: "Login with your Google or Github account",
            statusCode: 401,
          }
        default:
          return {
            success: false,
            error: "Oops. Something went wrong",
            statusCode: 500,
          }
      }
    }

    console.error(err)
    return { success: false, error: "Internal Server Error", statusCode: 500 }
  }
}

export async function register(values: RegisterUser) {
  const parsedValues = registerAuthSchema.safeParse(values)

  if (!parsedValues.success) {
    return { success: false, error: parsedValues.error, statusCode: 400 }
  }

  const { firstName, lastName, email, password } = parsedValues.data

  try {
    const isEmailExist = await db.user.findFirst({
      where: {
        email,
      },
    })

    if (isEmailExist)
      return {
        success: false,
        error: "Email already exists",
        statusCode: 409,
      }

    const hashedPassword = await bcrypt.hash(password, 12)

    await db.user.create({
      data: {
        email,
        name: `${firstName} ${lastName}`,
        hashedPassword,
      },
    })

    return {
      success: true,
      status: 200,
    }
  } catch (err) {
    console.error(err)
    return { success: false, error: "Internal Server Error", statusCode: 500 }
  }
}

export async function logout() {
  return await signOut()
}

export async function oauthSigninAction(provider: "google" | "github") {
  try {
    await signIn(provider)

    return { success: true }
  } catch (err) {
    if (isRedirectError(err)) {
      throw err
    }

    return { success: false }
  }
}
