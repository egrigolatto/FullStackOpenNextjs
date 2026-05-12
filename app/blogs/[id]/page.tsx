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
    <div style={{ marginTop: "20px" ,border: "1px solid black", padding: "10px" }}>
      Titulo: {blog.titulo} <br />
      Autor: {blog.autor} <br />
      URL: {blog.url} <br />
      Likes: {blog.likes} 
        <form action={toggleLikeBlog} style={{ marginTop: "10px" }}>
          <input type="hidden" name="id" value={blog.id} />
          <button type="submit">Like</button>
        </form>
    </div>
  )
}

export default BlogPage