import { getBlogs } from "../services/blogs"
import Link from "next/link"

const Blogs = async({
  searchParams,
}: {
  searchParams: Promise<{ filter?: string }>
}) => {
  const { filter } = await searchParams

  const blogs = await getBlogs(filter)
  
  return (
    <div>
      <h2>Blogs</h2>

      <form method="GET">
        <input
          type="text"
          name="filter"
          placeholder="Buscar por título..."
          defaultValue={filter || ""}
        />
        <button type="submit">Buscar</button>
      </form>

      {filter && (
        <div>
          <Link href="/blogs">Limpiar búsqueda</Link>
        </div>
      )}
      <ul>
        {blogs.map(blog => (
          <li key={blog.id} >
            <Link href={`/blogs/${blog.id}`}>
              {blog.titulo} - {blog.autor}  - {blog.likes} Likes
            </Link>
          </li>
        ))}
        </ul>
    </div>
  )
}
export default Blogs