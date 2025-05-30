import { route } from "../trpc";
import { authRouter } from "./auth";
import { categoryRouter } from "./category";
import { productRouter } from "./product";
import { queryRouter } from "./search_query";

export const appRouter = route({
  product: productRouter,
  search_query: queryRouter,
  category: categoryRouter,
  auth: authRouter
});

export type AppRouter = typeof appRouter;