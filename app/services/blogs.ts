import { eq } from "drizzle-orm"
import { db } from "../../db"
import { blogs, readingList } from "../../db/schema"

import { ilike, desc } from "drizzle-orm"
import { getCurrentUser } from "./session"



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
  const user = await getCurrentUser()
  if (!user) {
    throw new Error("Not logged in")
  }
  
  await db.insert(blogs).values({ titulo, autor, url, likes, userId: user.id })
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

export const addToReadingList = async (blogId: number) => {
  const user = await getCurrentUser()
  if (!user) {
    throw new Error("Not logged in")
  }

  const existing = await db.query.readingList.findFirst({
    where: (fields, { and }) =>
      and(eq(fields.userId, user.id), eq(fields.blogId, blogId)),
  })

  if (existing) {
    return
  }

  await db.insert(readingList).values({
    userId: user.id,
    blogId,
    read: false,
  })
}

export const getReadingList = async () => {
  const user = await getCurrentUser()
  if (!user) {
    return []
  }

  const entries = await db.query.readingList.findMany({
    where: eq(readingList.userId, user.id),
    with: {
      blog: true,
    },
    orderBy: (fields) => fields.id,
  })

  return entries
}

export const markAsRead = async (entryId: number) => {
  await db.update(readingList).set({ read: true }).where(eq(readingList.id, entryId))
}

export const isBlogInReadingList = async (blogId: number) => {
  const user = await getCurrentUser()
  if (!user) {
    return false
  }

  const existing = await db.query.readingList.findFirst({
    where: (fields, { and }) =>
      and(eq(fields.userId, user.id), eq(fields.blogId, blogId)),
  })

  return Boolean(existing)
}