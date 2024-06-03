import { getUsers } from "@/lib/metrics"
import SuggestionsItem from "./suggestions-item"

export default async function Suggestions() {
  const users = await getUsers()

  return (
    <div className="hidden w-[30rem] md:block">
      <div className="flex flex-col">
        <h2 className="mb-4">Suggestion</h2>
        <div className="max-h-[400px] overflow-auto">
          <div className="flex flex-col gap-2">
            {users.map((user) => (
              <SuggestionsItem user={user} key={user.id} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
