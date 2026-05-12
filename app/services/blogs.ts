import { eq } from "drizzle-orm"
import { db } from "../../db"
import { blogs } from "../../db/schema"

import { ilike, desc } from "drizzle-orm"

export const getBlogs = async (filterOnly?: string) => {
  if (filterOnly?.trim()) {
    return db.query.blogs.findMany({
      where: ilike(blogs.titulo, `%${filterOnly}%`),
      orderBy: desc(blogs.likes),
    })
  }

  return db.query.blogs.findMany({
    orderBy: desc(blogs.likes),
  })
}

export const getBlogById = async (id: number) => {
  return db.query.blogs.findFirst({
    where: eq(blogs.id, id)
  })
}
export const addBlog = async (titulo: string, autor: string, url: string, likes: number = 0) => {
  return db.insert(blogs).values({ titulo, autor, url, likes })
}
export const toggleLike = async (id: number) => {
  const blog = await getBlogById(id)
  if (blog) {
    await db
    .update(blogs)
    .set({ likes: blog.likes + 1 })
    .where(eq(blogs.id, id))
  }
}

