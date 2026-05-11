import { getBlogs } from "../services/blogs"

const Blogs = () => {
  const blogs = getBlogs()
  return (
    <div>
      <h2>Blogs</h2>
      
        {blogs.map(blog => (
          <div key={blog.id} 
          style={{ marginBottom: "20px" ,border: "1px solid black", padding: "10px" }}
          >
            Titulo: {blog.titulo} <br /> 
            Autor: {blog.autor} <br /> 
            URL: {blog.url} <br />
            likes: {blog.likes} <br />
          </div>
        ))}
    </div>
  )
}
export default Blogs