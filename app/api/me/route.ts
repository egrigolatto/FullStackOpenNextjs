import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { db } from "../../../db";
import { users, blogs } from "../../../db/schema";

export async function GET(request: Request) {
  const authHeader = request.headers.get("authorization");

  if (!authHeader?.startsWith("Bearer ")) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 },
    );
  }

  const token = authHeader.replace("Bearer ", "").trim();

  const user = await db.query.users.findFirst({
    where: eq(users.token, token),
    with: {
      blogs: true,
    },
  });

  if (!user) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 },
    );
  }

  return NextResponse.json({
    user: {
      id: user.id,
      username: user.username,
      name: user.name,
    },
    posts: user.blogs.map((blog) => ({
      id: blog.id,
      titulo: blog.titulo,
      autor: blog.autor,
      url: blog.url,
      likes: blog.likes,
    })),
  });
}