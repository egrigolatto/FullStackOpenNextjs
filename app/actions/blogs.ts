"use server"

import { redirect } from "next/navigation"
import { addBlog } from "../services/blogs"
import { revalidatePath } from "next/cache"
import { toggleLike } from "../services/blogs"

export const createBlog = async (formData: FormData) => {
  const titulo = formData.get("titulo") as string
  const autor = formData.get("autor") as string
  const url = formData.get("url") as string
  addBlog(titulo, autor, url)
  revalidatePath("/blogs")
  redirect("/blogs")
}

export const toggleLikeBlog = async (formData: FormData) => {
  const id = Number(formData.get("id"))
  toggleLike(id)
  revalidatePath(`/blogs/${id}`)
  revalidatePath("/blogs")
}