# 📱 Refone — Used Mobile Phones Marketplace

Refone is a fullstack web application replicating the "Used Mobile Phones" feature from Alibaba. Built using modern technologies for frontend and backend.

---
## 🤌🏻 Short Story

This project was created to fulfill the technical test for PT. AKP recruitment.
I have never created a monorepo project using javascript before. This is a challenge for me, where I have to learn about the recommended tech stack in the recruitment process.
The time I need to learn (from the initial setup) is 1 day. Then after that I learn by doing.
Then in 7 days I can complete the main task in this technical test. Currently there is still time until June 1, so I will try to complete the optional tasks.

---

## 🤯 Difficulties Encountered

**1. Using Better Auth**

When using better auth, I don't know why better auth doesn't work normally in my local. even though I have followed the instructions from the docs better auth, hono and trpc.
from the results of googling about the implementation of trpc, hono, and better auth [from here](https://dev.to/ayoubphy/step-by-step-guide-setting-up-trpc-better-auth-prisma-and-react-router-v7-4ho), it can be concluded that better auth and hono can be accessed via createAuthClient on the frontend (client). Which in my opinion is not flexible if there will be cross-platform integration.
So I decided to use manual Auth with jwt, so that it can run smoothly (because I usually use this).
if there is more time to learn better auth, I'm sure there is a best practice to handle this problem.

**2. zodResolver from @hookform/resolvers**

I have a problem when handling validation from the front end, where I use React Hooks Form and zod for form and validation.
but when I declare a resolver on useForm, there is an error that keeps popping up:

```error TS2589: Type instantiation is excessively deep and possibly infinite.```

which is disrupting the build process.
I have searched for solutions and tried them, some suggested downgrading zod, some suggested defining types and so on.
Because time is running out, I decided to use validation from the backend.

---

## 🧰 Tech Stack

### Frontend
- **Vite** with **React Router v7**
- **Tailwind CSS** with **shadcn/ui**

### Backend
- **Bun** (JavaScript runtime)
- **Hono** web framework
- **tRPC** for typesafe API routing
- **Zod** for validation
- **Prisma** ORM
- **PostgreSQL** for database
- **Docker** for containerization

---

## 📁 Project Structure

```
refone/
├── apps/
│   ├── api/                 # Backend source code
│   │   ├── prisma/          # Prisma schema, migrations, and seeders
│   │   ├── src/
│   │   │   ├── lib/         # Helpers (e.g., Prisma Client)
│   │   │   ├── trpc/        # All route handlers
│   │   │   └── index.ts     # Server entrypoint
│   └── web/                 # Frontend source (Vite + Tailwind)
│   │   ├── public/          
│   │   ├── src/             
│   │   │   ├── app/         # Also called page
│   │   │   ├── assets/      # All assets (icons, image, etc)
│   │   │   ├── components/  # Radix UI (shadcn) and other custom UI
│   │   │   ├── lib/         # Helpers (e.g., Trpc Client)
│   │   ├── index.css
│   │   ├── main.tsx         # Entrypoint
│   │   ├── routes.tsx       # Frontend routes is defined here
├── docker-compose.yml       # Docker Compose config
└── README.md                # Project documentation
```

---

## 🚀 Getting Started

### 🧾 Prerequisites

- [Docker](https://www.docker.com/)
- [Bun](https://bun.sh/) (for local development)

---

## 🐳 Run with Docker

### 1. Clone the Repository

```bash
git clone https://github.com/FaaaDev/refone.git
cd refone
```

### 2. Configure Environment

Copy the `.env.example` to `.env`:

```bash
cp apps/api/.env.example apps/api/.env
```

### 3. Start the Services
```bash
cd ../../
```

```bash
docker compose build --no-cache
docker compose up
```

> API will be available at `http://localhost:3000` and PostgreSQL at `localhost:5432`

### 4. Run Seeding Manually (if seeding not working)
```bash
cd apps/api
```

Change DATABASE_URL in .env to
```
DATABASE_URL="postgresql://postgres:postgres@localhost:55432/refone"
```

```bash
bunx prisma migrate deploy
```

```bash
bunx prisma generate
```

```
bun run seed
```
---

## 🛠️ Run Locally (Bun)

### 1. Install Bun

```bash
curl -fsSL https://bun.sh/install | bash
```

### 2. Setup Backend (API)

```bash
cd apps/api
cp .env.example .env
bun install
```

### 3. Apply Migrations

If this is your first time:

```bash
bunx prisma migrate dev --name init
```

If the database is already initialized:

```bash
bunx prisma migrate deploy
```

### 4. Generate Prisma Client

```bash
bunx prisma generate
```

### 5. Seed Initial Data

```bash
bun run seed
```

### 6. Start Development Server

```bash
bun run dev
```

API will run on `http://localhost:3000` by default.


### 7. Setup Frontend (WEB)

```bash
cd apps/web
cp .env.example .env
bun install
```

```bash
bun run dev
```

WEB will run on `http://localhost:5173` by default.

### 7. Using Turbo (API & WEB)

Make sure you has finish setup for ```.env``` each side (API & Web) and finishing prisma setup (Step 1-5)

Run this command from project root directory

```bash
bun rub install
bun run dev
```



## 🤝 Contribution

Pull requests are welcome! Please fork this repository and submit a PR.

---

