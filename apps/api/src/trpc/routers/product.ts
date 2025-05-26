import { prisma } from "../../lib/prisma";
import { z } from "zod";
import { publicProcedure, route } from "../trpc";
import type { Prisma } from "@prisma/client/edge";


const productOrder = (orderBy: string): Prisma.productOrderByWithRelationInput => {
  if (orderBy === "priceAsc") {
    return {
      price: "asc",
    };
  }
  if (orderBy === "priceDesc") {
    return {
      price: "desc",
    };
  }
  if (orderBy === "nameAsc") {
    return {
      name: "asc",
    };
  }
  if (orderBy === "nameDesc") {
    return {
      name: "desc",
    };
  }
  return {
    createdAt: "desc",
  };
};

export const productRouter = route({
  all: publicProcedure
    .input(
      z.object({
        orderBy: z.string().optional(),
        category: z.array(z.string()).optional(),
      })
    )
    .query(async ({ input }) => {
      return await prisma.product.findMany({
        where: {
          categoryId: input.category?.length ? { in: input.category } : undefined,
        },
        orderBy: productOrder(input.orderBy || ""),
      });
    }),

  detail: publicProcedure
    .input(z.object({ slug: z.string().min(1) }))
    .query(async ({ input }) => {
      const product = await prisma.product.findUnique({
        where: { slug: input.slug },
        include: { galleries: true, variants: true },
      });

      if (!product) {
        throw new Error(`Product with slug "${input.slug}" not found`);
      }

      return product;
    }),

  search: publicProcedure
    .input(
      z.object({
        q: z.string().min(1),
        category: z.array(z.string()).optional(),
        orderBy: z.string().optional(),
      })
    )
    .query(async ({ input }) => {
      const keyword = input.q.trim().toLowerCase();

      await prisma.search_query.upsert({
        where: { query: keyword },
        update: { count: { increment: 1 } },
        create: { query: keyword },
      });

      return await prisma.product.findMany({
        where: {
          OR: [
            {
              name: {
                contains: keyword,
                mode: "insensitive",
              },
            },
            {
              description: {
                contains: keyword,
                mode: "insensitive",
              },
            },
          ],
          categoryId: input.category?.length ? { in: input.category } : undefined,
        },
        orderBy: productOrder(input.orderBy || ""),
      });
    }),
});
