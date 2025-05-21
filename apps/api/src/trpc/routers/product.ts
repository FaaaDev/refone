import { prisma } from "../../lib/prisma";
import { z } from "zod";
import { publicProcedure, router } from "../trpc";

export const productRouter = router({
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
});
