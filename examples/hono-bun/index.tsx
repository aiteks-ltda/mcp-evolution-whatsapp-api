// index.tsx (Bun v1.3 runtime)
import { Hono } from "hono@4";
import { cors } from "hono/cors";

const app = new Hono();

app.use("/*", cors());
app.get("/", (c) => c.text("Hello world!"));
app.get("/api/health", (c) => c.json({ status: "ok" }));

Bun.serve({
  port: import.meta.env.PORT ?? 3000,
  fetch: app.fetch,
});
