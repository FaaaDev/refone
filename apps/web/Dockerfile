FROM oven/bun:latest

WORKDIR /apps

COPY . .

WORKDIR /apps/apps/web

COPY apps/web/.env.production .env

RUN bun install

RUN bun run build

RUN bun add -g serve

EXPOSE 3005
CMD ["serve", "-s", "dist", "-l", "3005"]
