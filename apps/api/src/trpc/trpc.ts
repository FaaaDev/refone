import { initTRPC } from "@trpc/server";

const t = initTRPC.create();

export const route = t.router;
export const publicProcedure = t.procedure;