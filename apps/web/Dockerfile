FROM oven/bun:latest

WORKDIR /apps

# Salin seluruh monorepo
COPY . .

# Masuk ke direktori web dan install dependensi
WORKDIR /apps/apps/web
RUN bun install

RUN bun run build

RUN bun add -g serve

EXPOSE 3003
CMD ["serve", "-s", "dist", "-l", "3003"]
