import { prisma } from "../../lib/prisma";
import { z } from "zod";
import { publicProcedure, route } from "../trpc";

export const productRouter = route({
  all: publicProcedure.query(async () => {
    return await prisma.product.findMany({
      orderBy: { createdAt: "desc" },
    });
  }),

  detail: publicProcedure
    .input(z.object({ slug: z.string().min(1) }))
    .query(async ({ input }) => {
      const product = await prisma.product.findUnique({
        where: { slug: input.slug },
        include: { galleries: true },
      });

      if (!product) {
        throw new Error(`Product with slug "${input.slug}" not found`);
      }

      return product;
    }),
  
    search: publicProcedure
  .input(z.object({ q: z.string().min(1) }))
  .query(async ({ input }) => {
    const keyword = input.q.trim().toLowerCase();

    await prisma.search_query.upsert({
      where: { query: keyword },
      update: { count: { increment: 1 } },
      create: { query: keyword },
    });

    return await prisma.product.findMany({
      where: {
        name: {
          contains: keyword,
          mode: "insensitive",
        },
        description: {
          contains: keyword,
          mode: "insensitive",
        }
      },
      orderBy: { createdAt: "desc" },
      include: { galleries: true },
    });
  }),
});
