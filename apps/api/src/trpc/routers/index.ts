import { route } from "../trpc";
import { productRouter } from "./product";
import { queryRouter } from "./search_query";

export const appRouter = route({
  product: productRouter,
  search_query: queryRouter
});

export type AppRouter = typeof appRouter;