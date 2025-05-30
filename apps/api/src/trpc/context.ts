import { verifyJwt } from "../lib/jwt";
import { prisma } from "../lib/prisma";
import type { inferAsyncReturnType } from "@trpc/server";

export const createContext = async ({ req }: { req: Request }) => {
  const token = req.headers.get("authorization")?.replace("Bearer ", "");

  let user = null;
  if (token) {
    const decoded = verifyJwt(token) as { userId: string };
    if (decoded?.userId) {
      user = await prisma.user.findUnique({ where: { id: decoded.userId } });
    }
  }

  return { user };
};

export type Context = inferAsyncReturnType<typeof createContext>;
