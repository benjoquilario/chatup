import db from "@/lib/db"
import getSession from "@/utils/getSession"

export async function GET() {
  const session = await getSession()

  if (!session) return null
}
