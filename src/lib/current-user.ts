import db from "./db"
import { auth } from "@/auth"

export async function getCurrentUser() {
  const session = await auth()

  if (!session?.user.id) return null

  const currentUser = await db.user.findUnique({
    where: {
      id: session.user.id,
    },
  })

  if (!currentUser) return null

  return currentUser
}
