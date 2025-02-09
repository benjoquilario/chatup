import {
  Facebook,
  Twitter,
  Instagram,
  GitlabIcon as GitHub,
} from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-background">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 md:flex md:items-center md:justify-between lg:px-8">
        <div className="flex justify-center space-x-6 md:order-2">
          <a
            href="#"
            className="text-muted-foreground/40 hover:text-muted-foreground/50"
          >
            <span className="sr-only">Facebook</span>
            <Facebook className="size-6" />
          </a>
          <a
            href="#"
            className="text-muted-foreground/40 hover:text-muted-foreground/50"
          >
            <span className="sr-only">Twitter</span>
            <Twitter className="size-6" />
          </a>
          <a
            href="#"
            className="text-muted-foreground/40 hover:text-muted-foreground/50"
          >
            <span className="sr-only">Instagram</span>
            <Instagram className="size-6" />
          </a>
          <a
            href="#"
            className="text-muted-foreground/40 hover:text-muted-foreground/50"
          >
            <span className="sr-only">GitHub</span>
            <GitHub className="size-6" />
          </a>
        </div>
        <div className="mt-8 md:order-1 md:mt-0">
          <p className="text-center text-base text-muted-foreground/80">
            &copy; 2023 ChatUp, Inc. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
