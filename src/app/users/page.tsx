import getSession from "@/utils/getSession"
import { notFound } from "next/navigation"

export default async function UsersPage() {
  const session = await getSession()

  if (!session) notFound()

  return (
    <div className="hidden h-full min-h-screen items-center justify-center pl-0 md:flex md:pl-[375px]">
      <h4 className="text-2xl font-semibold">
        Select a chat or search user to start a conversation
      </h4>
    </div>
  )
}
