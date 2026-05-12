import { pgTable, serial, text, integer } from "drizzle-orm/pg-core"

export const blogs = pgTable("blogs", {
  id: serial("id").primaryKey(),
  titulo: text("titulo").notNull(),
  autor: text("autor").notNull(),
  url: text("url").notNull(),
  likes: integer("likes").notNull().default(0),
})