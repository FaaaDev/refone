import { z } from "zod";
import { publicProcedure, route } from "../trpc";
// import { auth } from "../../lib/auth";
import bcrypt from "bcrypt";
import { prisma } from "../../lib/prisma";
import { signJwt } from "../../lib/jwt";

export const authRouter = route({
  login: publicProcedure
    .input(z.object({ email: z.string().email(), password: z.string().min(6) }))
    .mutation(async ({ input }) => {
      // trying to use better-auth for email/password login, but giving errors:
      //   ERROR [Better Auth]: Credential account not found {
      //     email: "admin@example.com",
      //   }
      // so, i decided to use prisma directly and jwt for now

      //   const session = await auth.api.signInEmail({
      //     body: { email: "admin@example.com", password: "password123" },
      //   });

      //   if (!session) {
      //     throw new Error("Invalid email or password");
      //   }

      const user = await prisma.user.findUnique({
        where: { email: input.email },
        select: {
          id: true,
          email: true,
          name: true,
          role: true,
          createdAt: true,
          updatedAt: true,
        },
      });

      const account = await prisma.account.findFirst({
        where: { userId: user?.id, providerId: "email" },
        select: { id: true, userId: true, password: true },
      });

      if (!user) {
        throw new Error("Invalid email or password");
      }

      if (!account) {
        throw new Error("Account not found");
      }

      const isValidPassword = bcrypt.compareSync(
        input.password,
        account.password
      );

      if (!isValidPassword) {
        throw new Error("Invalid email or password");
      }

      const token = signJwt({ userId: user.id });

      return {
        message: "Login successful",
        token,
        user,
      };
    }),
});
