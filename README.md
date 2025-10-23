# Backend — Rick & Morty App

Small NestJS backend for the Rick & Morty demo app (TypeScript, NestJS, Prisma).

Quick pointers
- Entrypoint: src/main.ts
- App module: src/app.module.ts
- Database schema: prisma/schema.prisma (Prisma + SQLite by default)
- Auth: src/auth
- Characters: src/characters
- Prisma service: src/prisma/prisma.service.ts

Prerequisites
- Node.js >= 18
- npm
- (Optional) npx for running Prisma CLI

Setup (local development)
1. Install dependencies
   ```bash
   npm install
   ```

2. Create a .env file at the project root with at least:
   ```env
   DATABASE_URL="file:./dev.db"
   JWT_SECRET="a-strong-secret"
   ```

Database (Prisma)
- Generate Prisma Client (run after changing schema):
  ```bash
  npx prisma generate
  ```
- Apply migrations (creates SQLite file & schema):
  ```bash
  npx prisma migrate deploy
  ```
  For iterative development you can run:
  ```bash
  npx prisma migrate dev --name init
  ```
  Or to push schema without migrations:
  ```bash
  npx prisma db push
  ```

Run
- Development (watch):
  ```bash
  npm run start:dev
  ```
- Production:
  ```bash
  npm run build
  npm run start:prod
  ```



Useful commands
- Inspect DB with Prisma Studio:
  ```bash
  npx prisma studio
  ```
- Recreate DB (dev) and run migrations:
  ```bash
  npx prisma migrate reset
  ```

Notes
- Ensure JWT_SECRET is set for authentication to work.
- If you change prisma/schema.prisma, run `npx prisma generate` and apply migrations.
- API routes are defined in controllers under src/* (e.g. src/characters, src/rm, src/auth).
- The project uses SQLite by default; change DATABASE_URL to another provider if needed.

License
- MIT
