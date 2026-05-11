"use server"

import { redirect } from "next/navigation"
import { addBlog } from "../services/blogs"
import { revalidatePath } from "next/cache"

export const createBlog = async (formData: FormData) => {
  const titulo = formData.get("titulo") as string
  const autor = formData.get("autor") as string
  const url = formData.get("url") as string
  addBlog(titulo, autor, url)
  revalidatePath("/blogs")
  redirect("/blogs")
}