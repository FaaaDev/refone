import { route } from "../trpc";
import { productRouter } from "./product";

export const appRouter = route({
  product: productRouter,
});

export type AppRouter = typeof appRouter;