import { z } from "zod";
import { publicProcedure, route } from "../trpc";
// import { auth } from "../../lib/auth";
import bcrypt from "bcrypt";
import { prisma } from "../../lib/prisma";
import { signJwt } from "../../lib/jwt";
import { TRPCError } from "@trpc/server";

export const authRouter = route({
  login: publicProcedure
    .input(
      z.object({
        email: z
          .string()
          .email({ message: "Please enter valid email" })
          .min(1, { message: "Email cannot empty" }),
        password: z
          .string()
          .min(8, { message: "Password minimum is 8 charracter" }),
      })
    )
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
      });

      if (!user) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "User not found",
        });
      }

      const account = await prisma.account.findFirst({
        where: { userId: user?.id, providerId: "email" },
        select: { id: true, userId: true, password: true },
      });

      if (!account) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Credential account not found",
        });
      }

      const isValidPassword = bcrypt.compareSync(
        input.password,
        account?.password || ""
      );

      if (!isValidPassword) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Wrong Password. Please try again.",
        });
      }

      const token = signJwt({ userId: user.id });

      return {
        message: "Login successful",
        token,
        user,
      };
    }),
});
