import Link from "next/link"
import { getUsers } from "../services/users"

const Users = async () => {
  const users = await getUsers()

  return (
    <div className="max-w-3xl mx-auto px-6 py-8">
  <h1 className="mb-6 text-3xl font-bold text-gray-400">
    Users
  </h1>

  <ul className="space-y-3">
    {users.map((user) => (
      <li
        key={user.id}
        className="rounded-xl border border-gray-200 bg-gray-800 p-4 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
      >
        <Link
          href={`/users/${user.username}`}
          className="flex items-center justify-between"
        >
          <div>
            <h2 className="text-lg font-semibold text-blue-700">
              {user.name}
            </h2>

            <p className="text-sm text-gray-500">
              @{user.username}
            </p>
          </div>

          <span className="text-gray-400 text-xl">
            →
          </span>
        </Link>
      </li>
    ))}
  </ul>
</div>
  )
}

export default Users