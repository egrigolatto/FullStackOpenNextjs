import { notFound } from "next/navigation"
import { getBlogById } from "../../services/blogs"
import { toggleLikeBlog } from "../../actions/blogs"

const BlogPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params
  const blog = await getBlogById(Number(id))

  if (!blog) {
    notFound()
  }

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

  <form action={toggleLikeBlog} className="mt-6">
    <input type="hidden" name="id" value={blog.id} />

    <button
      type="submit"
      className="rounded-lg bg-blue-600 px-4 py-2 font-medium text-white transition hover:bg-blue-700 active:scale-95"
    >
      👍 Like
    </button>
  </form>
</div>
  )
}

export default BlogPage