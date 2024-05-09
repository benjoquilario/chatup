import localFont from "next/font/local"
import "./globals.css"
import {Inter} from "next/font/google"
import AuthContext from "@/components/auth-context"
import Provider from "@/components/provider"
import { cn } from "@/lib/cn"
import ThemeProvider from "@/components/theme-provider"

const fontSans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: 'swap',
})

// Font files can be colocated inside of `pages`
const fontHeading = localFont({
  src: "../assets/fonts/CalSans-SemiBold.woff2",
  variable: "--font-heading",
  display: 'swap',
})

export const metadata = {
  title: "Chat",
  description: "Realtime chat application built using Next.js",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          "h-full min-h-screen overflow-x-hidden bg-background font-sans antialiased",
          fontSans.variable,
          fontHeading.variable
        )}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Provider>
            <AuthContext>
              <h1 className="sr-only">Chatty</h1>
              {children}
            </AuthContext>
          </Provider>
        </ThemeProvider>
      </body>
    </html>
  )
}
