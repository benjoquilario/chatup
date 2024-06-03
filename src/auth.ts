import NextAuth, { DefaultSession } from "next-auth"
import { authConfig } from "./auth.config"
import Credentials from "next-auth/providers/credentials"
import db from "@/lib/db"
import bcrypt from "bcrypt"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { credentialsValidator } from "@/lib/validations/credentials"

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
      credentials: {
        email: { label: "email", type: "text" },
        password: { label: "password", type: "password" },
      },
      async authorize(credentials) {
        const cred = await credentialsValidator.parseAsync(credentials)
        if (!cred.email || !cred.password) {
          throw new Error("Invalid Credentials")
        }

        const user = await db.user.findUnique({
          where: {
            email: cred.email,
          },
        })

        if (!user || !user.hashedPassword)
          throw new Error("Invalid Credentials")

        const isPasswordCorrect = await bcrypt.compare(
          cred.password,
          user.hashedPassword
        )

        if (!isPasswordCorrect) throw new Error("Invalid Credentials")

        return {
          id: user.id,
          image: user.image,
          email: user.email,
          name: user.name,
        }
      },
    }),
  ],
})
