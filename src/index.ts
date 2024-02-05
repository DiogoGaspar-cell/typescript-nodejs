import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { PrismaClient } from "@prisma/client";
import { posts } from "./posts";

const app = new Hono();
const prisma = new PrismaClient();

app.get("/", (c) => {
  return c.text("Hello Hono!");
});

posts(app, prisma);

const port = 3333;
console.log(`Server is running on port ${port}`);

serve({
  fetch: app.fetch,
  port,
});
