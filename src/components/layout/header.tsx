import Link from "next/link"
import { MessageCircle } from "lucide-react"

export default function Header() {
  return (
    <header className="bg-background shadow-sm">
      <div className="mx-auto max-w-7xl p-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <MessageCircle className="size-8 text-primary" />
            <span className="ml-2 text-2xl font-bold text-foreground">
              ChatUp
            </span>
          </div>
          <nav className="hidden space-x-10 md:flex">
            <Link
              href="#features"
              className="text-base font-medium text-muted-foreground/80 hover:text-foreground"
            >
              Features
            </Link>
            <Link
              href="#testimonials"
              className="text-base font-medium text-muted-foreground/80 hover:text-foreground"
            >
              Testimonials
            </Link>
            <Link
              href="#"
              className="text-base font-medium text-muted-foreground/80 hover:text-foreground"
            >
              Pricing
            </Link>
          </nav>
          <div className="flex items-center">
            <a
              href="/auth/register"
              className="inline-flex items-center rounded-md border border-transparent bg-primary px-4 py-2 text-base font-medium text-gray-50 hover:opacity-90"
            >
              Sign Up
            </a>
          </div>
        </div>
      </div>
    </header>
  )
}
