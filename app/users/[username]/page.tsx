import Link from "next/link"
import { notFound } from "next/navigation"
import { getUserWithBlogs } from "../../services/users"

const UserPage = async ({ params }: { params: Promise<{ username: string }> }) => {
  const { username } = await params
  //const user = await getUserByUsername(username)
  const user = await getUserWithBlogs(username)


  if (!user) {
    notFound()
  }

  //const blogs = await getBlogsByUserId(user.id)

  return (
   <div className="max-w-4xl mx-auto px-6 py-8">
  <div className="rounded-xl border border-gray-400 bg-gray-800 p-6 shadow-sm">
    <div className="flex items-center gap-4">
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-600 text-2xl font-bold text-white">
        {user.name.charAt(0).toUpperCase()}
      </div>

      <div>
        <h1 className="text-3xl font-bold text-gray-400">
          {user.name}
        </h1>

        <p className="text-gray-500">
          @{user.username}
        </p>
      </div>
    </div>
  </div>

  <div className="mt-8">
    <div className="mb-4 flex items-center justify-between">
      <h2 className="text-2xl font-bold text-gray-600">
        Blogs
      </h2>

      <span className="rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-700">
        {user.blogs.length} artículos
      </span>
    </div>

    <ul className="space-y-3">
      {user.blogs.map((blog) => (
        <li
          key={blog.id}
          className="rounded-xl border border-gray-200 bg-gray-800 p-4 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
        >
          <Link
            href={`/blogs/${blog.id}`}
            className="flex items-center justify-between"
          >
            <div>
              <h3 className="text-lg font-semibold text-blue-700">
                {blog.titulo}
              </h3>

              <p className="text-sm text-gray-500">
                ✍️ {blog.autor}
              </p>
            </div>

            <span className="text-xl text-gray-400">
              →
            </span>
          </Link>
        </li>
      ))}
    </ul>
  </div>
</div>
  )
}

export default UserPage