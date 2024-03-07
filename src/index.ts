import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { logger } from "hono/logger";
import { prettyJSON } from "hono/pretty-json";
import { cors } from "hono/cors";
import { PrismaClient } from "@prisma/client";
import { Posts } from "./posts/post";

const app = new Hono().basePath("/api");
const prisma = new PrismaClient();

app.use("*", logger());
app.use("*", prettyJSON());
app.use("/api/*", cors());

const posts = Posts(prisma);

app.route("/posts", posts);

const port = Number(process.env.PORT) || 3001;
console.log(`Server is running on port ${port}`);

serve({
  fetch: app.fetch,
  port,
});
