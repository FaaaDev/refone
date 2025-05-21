FROM oven/bun:1.1.13

WORKDIR /app

COPY bun.lockb package.json ./

RUN bun install

COPY . .

ENV PRISMA_SCHEMA=./prisma/schema.prisma

RUN bunx prisma generate --schema=$PRISMA_SCHEMA

EXPOSE 3000

CMD ["bun", "run", "start"]