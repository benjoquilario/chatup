import db from "@/lib/db"
import getSession from "./getSession"

const getCurrentUser = async () => {
  const session = await getSession()

  if (!session?.user?.email) return null

  const currentUser = await db.user.findUnique({
    where: {
      email: session.user.email,
    },
  })

  if (!currentUser) return null

  return currentUser
}

export default getCurrentUser
