import { publicProcedure, route } from "../trpc";
import { prisma } from "../../lib/prisma";
import { z } from "zod";

export const queryRouter = route({
  suggestions: publicProcedure.query(async () => {
    return await prisma.search_query.findMany({
      orderBy: { count: "desc" },
      take: 10,
    });
  }),
  search: publicProcedure
  .input(z.object({ q: z.string().min(1) }))
  .query(async ({ input }) => {
    return await prisma.search_query.findMany({
      where: {
        query: {
          startsWith: input.q.toLowerCase(),
          mode: "insensitive",
        },
      },
      orderBy: { count: "desc" },
      take: 10,
    });
  }),
});
