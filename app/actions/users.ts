"use server"

import { redirect } from "next/navigation"
import bcrypt from "bcryptjs"
import { db } from "../../db"
import { users } from "../../db/schema"
import { eq } from "drizzle-orm"


export const registerUser = async (
  prevState: { errors?: Record<string, string>; values?: { username?: string; name?: string; password?: string ; passwordConfirmation?: string} },
  formData: FormData) => {
  const username = (formData.get("username") as string)?.trim()
  const name = (formData.get("name") as string)?.trim()
  const password = formData.get("password") as string
  const passwordConfirmation = formData.get("passwordConfirmation") as string

  const errors: Record<string, string> = {}

  if (!username || username.length < 4) {
    errors.username = "El nombre de usuario debe tener al menos 4 caracteres"
  }
  if (!name || name.length < 4) {
    errors.name = "El nombre debe tener al menos 4 caracteres"
  }
  if (!password || password.length < 4) {
    errors.password = "La contraseña debe tener al menos 4 caracteres"
  }
  if (password !== passwordConfirmation) {
    errors.passwordConfirmation = "Las contraseñas no coinciden"
  }

  const existingUser = await db.query.users.findFirst({
    where: eq(users.username, username)
  })
  if (existingUser) {
    errors.username = "El nombre de usuario ya está en uso"
  }

  if (Object.keys(errors).length > 0) {
    return {
      errors,
      values: { username, name, password, passwordConfirmation },
    }
  }

  const passwordHash = await bcrypt.hash(password, 10)

  await db.insert(users).values({ username, name, passwordHash })

  redirect("/login")
}