import { notFound } from "next/navigation"
import { getBlogById, isBlogInReadingList } from "../../services/blogs"
import { toggleLikeBlog, addBlogToReadingList } from "../../actions/blogs"
import { auth } from "@/auth"
import { getCurrentUser } from "../../services/session"

const BlogPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params
  const blog = await getBlogById(Number(id))

  if (!blog) {
    notFound()
  }

  const session = await auth()
  const currentUser = await getCurrentUser()

  const isOwner = currentUser?.id === blog.userId
  const alreadyInReadingList = session ? await isBlogInReadingList(blog.id) : false

  return (
    <div className="max-w-4xl mx-auto mt-6 rounded-xl border border-gray-600 bg-gray-800 p-6 shadow-sm">
      <h1 className="mb-4 text-2xl font-bold text-gray-200">
        {blog.titulo}
      </h1>

      <div className="space-y-2 text-gray-400">
        <p>
          <span className="font-semibold">Autor:</span> {blog.autor}
        </p>

        <p>
          <span className="font-semibold">URL:</span>{" "}
          <a
            href={blog.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline"
          >
            {blog.url}
          </a>
        </p>

        <div className="flex items-center gap-3">
          <span className="font-semibold">Likes:</span>

          <span className="rounded-full bg-red-100 px-3 py-1 text-sm font-medium text-red-600">
            ❤️ {blog.likes}
          </span>
        </div>
      </div>

      <div className="mt-6 flex flex-wrap gap-3">
        <form action={toggleLikeBlog}>
          <input type="hidden" name="id" value={blog.id} />

          <button
            type="submit"
            className="rounded-lg bg-blue-600 px-4 py-2 font-medium text-white transition hover:bg-blue-700 active:scale-95"
          >
            👍 Like
          </button>
        </form>

        {session && !isOwner && !alreadyInReadingList && (
          <form action={addBlogToReadingList}>
            <input type="hidden" name="blogId" value={blog.id} />

            <button
              type="submit"
              className="rounded-lg bg-green-600 px-4 py-2 font-medium text-white transition hover:bg-green-700 active:scale-95"
            >
              ➕ Añadir a la lista de lectura
            </button>
          </form>
        )}
      </div>
    </div>
  )
}

export default BlogPage