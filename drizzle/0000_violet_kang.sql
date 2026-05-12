CREATE TABLE "blogs" (
	"id" serial PRIMARY KEY NOT NULL,
	"titulo" text NOT NULL,
	"autor" text NOT NULL,
	"url" text NOT NULL,
	"likes" integer DEFAULT 0 NOT NULL
);
