# SaaS Starter Template

Dynamic lavender-themed Next.js 15 SaaS starter with Atomic Design, multi-role auth, PostgreSQL, and Swagger API docs.

## Quick Start

See [specs/001-saas-starter-template/quickstart.md](specs/001-saas-starter-template/quickstart.md).

```bash
cp .env.example .env
docker compose up -d
npm install
npx prisma migrate dev
npm run db:seed
npm run dev
```

- App: http://localhost:3000
- Swagger: http://localhost:3000/api/docs

## Seed Accounts

| Role | Email | Password |
|------|-------|----------|
| Admin | admin@example.com | Admin123! |
| Manager | manager@example.com | Manager123! |
| User | user@example.com | User1234! |

## Scripts

- `npm run dev` — development server
- `npm run build` — production build
- `npm run test` — Jest + RTL tests
- `npm run lint` — ESLint
- `npm run typecheck` — TypeScript check
