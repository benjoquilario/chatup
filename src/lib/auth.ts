import { DefaultSession } from "next-auth"

import bcrypt from "bcrypt"
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import CredentialsProvider from "next-auth/providers/credentials"
import { credentialsValidator } from "./validations/credentials"
import db from "./db"

declare module "next-auth" {
  interface Session {
    user: {
      id: string
    } & DefaultSession["user"]
  }
}

const authOptions = {
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
  debug: process.env.NODE_ENV === "development",
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
}

export { authOptions }
