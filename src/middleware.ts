import { getToken } from "next-auth/jwt"
import { withAuth } from "next-auth/middleware"
import { NextResponse } from "next/server"

export default withAuth(
  async function middleware(req) {
    const token = await getToken({ req })
    const pathname = req.nextUrl.pathname

    const isAuth = !!token
    const isAuthPage =
      pathname.startsWith("/login") || pathname.startsWith("/register")

    const sensitiveRoutes = ["/users", "/conversation"]

    const isAccessingSensitiveRoute = sensitiveRoutes.some((route) =>
      pathname.startsWith(route)
    )

    if (isAuthPage) {
      if (isAuth) {
        return NextResponse.redirect(new URL("/conversation", req.url))
      }

      return NextResponse.next()
    }

    if (!isAuth && isAccessingSensitiveRoute) {
      return NextResponse.redirect(new URL("/login", req.url))
    }
  },
  {
    callbacks: {
      async authorized() {
        return true
      },
    },
  }
)

export const config = {
  matcher: [
    "/",
    "/login",
    "/register",
    "/users/:path*",
    "/conversation/:path*",
  ],
}
