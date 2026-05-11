const blogs = [
  {id: 1 , titulo: "What is Next.js?", autor: "John Doe", url: "/blogs/what-is-nextjs", likes: 10 },
  {id: 2 , titulo: "Getting Started with Next.js", autor: "Jane Smith", url: "/blogs/getting-started", likes: 15 },
  {id: 3 , titulo: "Next.js vs React", autor: "Alice Johnson", url: "/blogs/nextjs-vs-react", likes: 20 },
]

let nextId = 4

export const getBlogs = () => {
  return [...blogs].sort((a, b) => b.likes - a.likes)
}

export const addBlog = (titulo: string, autor: string, url: string, likes: number = 0) => {
  blogs.push({ id: nextId++, titulo, autor, url, likes  })
}

export const getBlogById = (id: number) => {
  return blogs.find((blog) => blog.id === id)
}

export const toggleLike = (id: number) => {
  const blog = blogs.find((blog) => blog.id === id)
  if (blog) {
    blog.likes++
  }
}