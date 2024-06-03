import { buttonVariants } from "@/components/ui/button"
import Link from "next/link"

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center gap-2 text-center">
      <h1>Welcome to Chatty!</h1>
      <p></p>
      <Link href="/conversation" className={buttonVariants()}>
        Start Chatting
      </Link>
    </div>
  )
}
