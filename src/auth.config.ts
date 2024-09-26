import type { NextAuthConfig } from "next-auth"

export const authConfig = {
  session: {
    strategy: "jwt",
  },
  secret: process.env.AUTH_SECRET,
  pages: {
    signIn: "/login",
  },
  callbacks: {
    authorized({ auth }) {
      const isAuthenticated = !!auth?.user

      return isAuthenticated
    },
    jwt({ token, user }) {
      return { ...token, ...user }
    },
    session({ session, token, user }) {
      //@ts-ignore
      session.user.id = token.sub
      return session
    },
  },
  providers: [],
} satisfies NextAuthConfig
