import { publicProcedure, route } from "../trpc";
import { prisma } from "../../lib/prisma";

export const categoryRouter = route({
  all: publicProcedure.query(async () => {
    return await prisma.category.findMany({
      take: 10,
    });
  }),
});
