"use client"

import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useState } from "react"

export default function LoginPage() {
  const router = useRouter()
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)

    const result = await signIn("credentials", {
      username: formData.get("username"),
      password: formData.get("password"),
      redirect: false,
    })

    if (result?.error) {
      setError("Invalid username or password")
    } else {
      router.push("/")
      router.refresh()
    }
  }

  return (
    <div className="max-w-xl mx-auto px-6 py-8">
  <div className="rounded-xl border border-gray-200 bg-gray-800 p-8 shadow-sm">
    <h1 className="mb-6 text-3xl font-bold text-gray-200">
      Login
    </h1>

    {error && (
      <p className="mb-4 rounded-lg bg-red-100 border border-red-300 px-4 py-3 text-red-700">
        {error}
      </p>
    )}

    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label
          htmlFor="username"
          className="mb-2 block text-sm font-medium text-gray-500"
        >
          Username
        </label>

        <input
          id="username"
          type="text"
          name="username"
          required
          className="w-full rounded-lg border border-gray-300 px-4 py-2 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
        />
      </div>

      <div>
        <label
          htmlFor="password"
          className="mb-2 block text-sm font-medium text-gray-500"
        >
          Password
        </label>

        <input
          id="password"
          type="password"
          name="password"
          required
          className="w-full rounded-lg border border-gray-300 px-4 py-2 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
        />
      </div>

      <button
        type="submit"
        className="w-full rounded-lg bg-blue-600 px-4 py-3 font-semibold text-white transition hover:bg-blue-700 active:scale-95"
      >
        Login
      </button>
    </form>
  </div>
</div>
  )
}