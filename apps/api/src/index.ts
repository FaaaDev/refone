import { Hono } from "hono";
import { cors } from 'hono/cors';
import { trpcServer } from "@hono/trpc-server";
import { appRouter } from "./trpc/routers";

export type AppRouter = typeof appRouter;

const app = new Hono();

app.use(
  '*',
  cors({
    origin: '*',
    allowMethods: ['GET', 'POST', 'OPTIONS'],
    allowHeaders: ['Content-Type'],
  })
);


app.use(
  "/trpc/*",
  trpcServer({
    router: appRouter,
    createContext: async (c) => {
      const json = await c.req.json().catch(() => ({}));
      return {
        req: c.req,
        ...json ?? {},
      };
    },
  })
);

export default {
  port: 3000,
  fetch: app.fetch,
};
