import { route } from "../trpc";
import { categoryRouter } from "./category";
import { productRouter } from "./product";
import { queryRouter } from "./search_query";

export const appRouter = route({
  product: productRouter,
  search_query: queryRouter,
  category: categoryRouter
});

export type AppRouter = typeof appRouter;