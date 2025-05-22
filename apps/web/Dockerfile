FROM oven/bun:latest

WORKDIR /apps

# Salin seluruh monorepo
COPY . .

# Masuk ke direktori web dan install dependensi
WORKDIR /apps/apps/web

COPY apps/web/.env.production .env

RUN bun install

# # RUN VITE_APP_API_URL=http://localhost:3000 VITE_APP_ENVIRONTMENT=production bun run build

RUN bun run build

RUN bun add -g serve

EXPOSE 3003
CMD ["serve", "-s", "dist", "-l", "3003"]
