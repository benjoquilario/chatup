import { NextAuthOptions } from "next-auth"
import bcrypt from "bcrypt"
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import GoogleProvider from "next-auth/providers/google"
import GithubProvider from "next-auth/providers/github"
import CredentialsProvider from "next-auth/providers/credentials"
import { credentialsValidator } from "@/lib/validations/credentials"
import db from "./db"

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(db),
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "email", type: "text" },
        password: { label: "password", type: "password" },
      },
      async authorize(credentials) {
        const cred = await credentialsValidator.parseAsync(credentials)
        if (!cred.email || !cred?.password) {
          throw new Error("Invalid Credentials")
        }

        const user = await db.user.findUnique({
          where: {
            email: cred.email,
          },
        })

        if (!user || !user?.hashedPassword)
          throw new Error("Invalid Credentials")

        const isPasswordCorrect = await bcrypt.compare(
          cred.password,
          user.hashedPassword
        )

        if (!isPasswordCorrect) throw new Error("Invalid credentials")

        return user
      },
    }),
  ],
  debug: process.env.NODE_ENV === "development",
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
}
