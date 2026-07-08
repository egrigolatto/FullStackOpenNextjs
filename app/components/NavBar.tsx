"use client";

import { useSession, signOut } from "next-auth/react";
import NavLink from "./NavLink";

export default function NavBar() {
  const { data: session } = useSession();

  return (
    <nav className="bg-gray-900 text-white px-6 py-4 flex items-center shadow-md">
  <NavLink href="/" className="text-xl font-bold tracking-wide">
    Home
  </NavLink>

  <div className="ml-auto flex items-center gap-5">
    <NavLink href="/blogs" className="transition hover:text-blue-400">
      Blogs
    </NavLink>

    <NavLink href="/users" className="transition hover:text-blue-400">
      Users
    </NavLink>

    {session ? (
      <>
        <NavLink
          href="/blogs/new"
          className="rounded-md bg-green-600 px-3 py-2 text-sm font-medium transition hover:bg-green-700"
        >
          + Create New
        </NavLink>

        <span className="rounded-full bg-gray-700 px-3 py-1 text-sm text-gray-200">
          👋 {session.user?.name}
        </span>

        <button
          onClick={() => signOut()}
          className="rounded-md bg-red-600 px-3 py-2 text-sm font-medium transition hover:bg-red-700"
        >
          Logout
        </button>
      </>
    ) : (
      <>
        <NavLink
          href="/login"
          className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium transition hover:bg-blue-700"
        >
          Login
        </NavLink>

        <NavLink
          href="/register"
          className="rounded-md border border-gray-500 px-4 py-2 text-sm font-medium transition hover:border-white hover:bg-gray-800"
        >
          Register
        </NavLink>
      </>
    )}
  </div>
</nav>
  );
}
