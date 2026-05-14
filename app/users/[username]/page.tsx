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
    <div>
      <h2>{user.name}</h2>
      <p>Username: {user.username}</p>
      <h3>Blogs</h3>
      <ul>
        {user.blogs.map((blog) => (
          <li key={blog.id}>
            <Link href={`/blogs/${blog.id}`}>{blog.titulo} - {blog.autor}</Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default UserPage