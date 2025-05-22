#!/bin/sh

set -e

echo "📦 Initiating Prisma..."
bunx prisma generate --schema=$PRISMA_SCHEMA

echo "📦 Migrating DB..."
bunx prisma migrate deploy --schema=$PRISMA_SCHEMA

echo "🌱 Running seed script..."
bun run seed

echo "🚀 Starting API server..."
bun run start