FROM oven/bun:1.1.13

WORKDIR /apps

COPY package.json ./

RUN bun install

COPY . .

ENV PRISMA_SCHEMA=./prisma/schema.prisma

EXPOSE 3000

COPY entrypoint.sh .

RUN chmod +x ./entrypoint.sh

CMD ["./entrypoint.sh"]

