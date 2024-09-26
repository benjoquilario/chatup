import { getUsers } from "@/lib/metrics"
import SuggestionsItem from "./suggestions-item"

export default async function Suggestions() {
  const users = await getUsers()

  return (
    <div className="mt-8 size-full md:w-96">
      <div className="flex size-full flex-col px-4 md:w-96">
        <h2 className="mb-4 text-lg font-medium">Suggestion</h2>
        <div className="max-h-[400px] w-full overflow-auto">
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
