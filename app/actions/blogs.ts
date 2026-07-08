"use server"

import { redirect } from "next/navigation"
import { addBlog } from "../services/blogs"
import { revalidatePath } from "next/cache"
import { toggleLike } from "../services/blogs"
import { auth } from "@/auth"

export const createBlog = async (
  prevState: { errors?: Record<string, string>; values?: { titulo?: string; autor?: string; url?: string } },
  formData: FormData) => {

  const session = await auth()
  if (!session) {
    redirect("/login")
  }

  const titulo = (formData.get("titulo") as string | null)?.trim() ?? ""
  const autor = (formData.get("autor") as string | null)?.trim() ?? ""
  const url = (formData.get("url") as string | null)?.trim() ?? ""

  const errors: Record<string, string> = {}


  if (!titulo || titulo.length < 5) {
    errors.titulo = "El título debe tener al menos 5 caracteres"
  }
  if (!autor || autor.length < 5) {
    errors.autor = "El autor debe tener al menos 5 caracteres"
  }
  if (!url || url.length < 5) {
    errors.url = "La URL debe tener al menos 5 caracteres"
  }

  if (Object.keys(errors).length > 0) {
    return {
      errors,
      values: { titulo, autor, url },
      success: false,
    }
  }
  await addBlog(titulo, autor, url)
  revalidatePath("/blogs")
  //redirect("/blogs")

  return {
    errors: {},
    values: { titulo, autor, url },
    success: true,
  }
}

export const toggleLikeBlog = async (formData: FormData) => {
  const id = Number(formData.get("id"))
  await toggleLike(id)
  revalidatePath(`/blogs/${id}`)
  revalidatePath("/blogs")
}