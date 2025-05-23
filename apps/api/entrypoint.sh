#!/bin/sh

set -e

echo "📦 Migrating DB..."
bunx prisma migrate deploy --schema=$PRISMA_SCHEMA

echo "📦 Generating Prisma..."
bunx prisma generate --schema=$PRISMA_SCHEMA

echo "🌱 Generate seed script..."
bun run build:seed

echo "🌱 Running seed script..."
bunx prisma db seed

echo "🚀 Starting API server..."
bun run start