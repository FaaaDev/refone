FROM oven/bun

WORKDIR /app

COPY . .

RUN bun install

RUN bun run build

RUN bun add -g serve

EXPOSE 3003
CMD ["serve", "-s", "dist", "-l", "3003"]
