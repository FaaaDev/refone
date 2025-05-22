FROM oven/bun:1.1.13

WORKDIR /apps

COPY package.json ./

RUN bun install

COPY . .

ENV PRISMA_SCHEMA=./prisma/schema.prisma

RUN bunx prisma generate --schema=$PRISMA_SCHEMA

EXPOSE 3000

CMD ["sh", "-c", "bunx prisma migrate deploy --schema=$PRISMA_SCHEMA && bun run seed && bun run start"]
