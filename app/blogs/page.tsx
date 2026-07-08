import { getBlogs } from "../services/blogs";
import Link from "next/link";

const Blogs = async ({
  searchParams,
}: {
  searchParams: Promise<{ filter?: string }>;
}) => {
  const { filter } = await searchParams;

  const blogs = await getBlogs(filter);

  return (
    <div className="max-w-4xl mx-auto px-6 py-8">
      <h1 className="text-4xl font-bold text-gray-400 mb-6">Blogs</h1>

      <form method="GET" className="flex gap-3 mb-6">
        <input
          type="text"
          name="filter"
          placeholder="Buscar por título..."
          defaultValue={filter || ""}
          className="flex-1 rounded-lg border border-gray-300 px-4 py-2 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
        />

        <button
          type="submit"
          className="rounded-lg bg-blue-600 px-5 py-2 font-medium text-white transition hover:bg-blue-700"
        >
          Buscar
        </button>
      </form>

      {filter && (
        <div className="mb-6">
          <Link
            href="/blogs"
            className="text-sm font-medium text-blue-600 hover:underline"
          >
            ✕ Limpiar búsqueda
          </Link>
        </div>
      )}

      <ul className="space-y-4">
        {blogs.map((blog) => (
          <li
            key={blog.id}
            className="rounded-xl border border-gray-200 bg-gray-800 p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
          >
            <Link href={`/blogs/${blog.id}`} className="block">
              <h2 className="text-xl font-semibold text-gray-100">
                {blog.titulo}
              </h2>

              <div className="mt-2 flex items-center justify-between text-sm text-gray-600">
                <span>✍️ {blog.autor}</span>

                <span className="rounded-full bg-red-100 px-3 py-1 font-medium text-red-600">
                  ❤️ {blog.likes} Likes
                </span>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};
export default Blogs;
