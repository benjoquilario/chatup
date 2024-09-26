import NextAuth, { DefaultSession } from "next-auth"
import { authConfig } from "./auth.config"
import Credentials from "next-auth/providers/credentials"
import db from "@/lib/db"
import bcrypt from "bcrypt"
import { PrismaAdapter } from "@auth/prisma-adapter"
import Google from "next-auth/providers/google"
import { userAuthSchema } from "./lib/validations/auth"

declare module "next-auth" {
  interface Session {
    user: {
      id: string
    } & DefaultSession["user"]
  }
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  ...authConfig,
  adapter: PrismaAdapter(db),
  providers: [
    Credentials({
      name: "credentials",
      async authorize(credentials) {
        const validatedFields = await userAuthSchema.parseAsync(credentials)

        const { email, password } = validatedFields

        if (!email || !password) {
          return null
        }

        const user = await db.user.findFirst({
          where: {
            email,
          },
        })

        if (user && user.hashedPassword) {
          const isPasswordCorrect = await bcrypt.compare(
            password,
            user.hashedPassword
          )

          if (isPasswordCorrect) {
            return {
              id: user.id,
              image: user.image,
              email: user.email,
              name: user.name,
            }
          }
        }

        return null
      },
    }),
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      allowDangerousEmailAccountLinking: true,
    }),
  ],
})
