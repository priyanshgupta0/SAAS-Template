# Quickstart: Dynamic SaaS Starter Template

**Feature**: `001-saas-starter-template` | **Date**: 2026-06-12

## Prerequisites

- Node.js 20+
- npm or pnpm
- Docker Desktop (for local PostgreSQL) or a remote PostgreSQL instance
- Git on branch `001-saas-starter-template`

## Environment Setup

1. Copy environment template:

   ```bash
   cp .env.example .env
   ```

2. Configure required variables:

   | Variable | Example | Purpose |
   |----------|---------|---------|
   | `DATABASE_URL` | `postgresql://postgres:postgres@localhost:5432/saas_starter` | Prisma connection |
   | `NEXTAUTH_SECRET` | random 32+ char string | Auth.js session signing |
   | `NEXTAUTH_URL` | `http://localhost:3000` | Auth callback base |
   | `NEXT_PUBLIC_API_BASE_URL` | `http://localhost:3000/api` | Axios client base |

3. Start PostgreSQL:

   ```bash
   docker compose up -d
   ```

4. Install dependencies and prepare database:

   ```bash
   npm install
   npx prisma migrate dev
   npx prisma db seed
   ```

5. Start development server:

   ```bash
   npm run dev
   ```

   App: http://localhost:3000  
   Swagger: http://localhost:3000/api/docs

## Seed Accounts (after implementation)

| Role | Email | Password |
|------|-------|----------|
| Admin | admin@example.com | Admin123! |
| Manager | manager@example.com | Manager123! |
| User | user@example.com | User1234! |

## Validation Scenarios

### VS-001: Public marketing pages

1. Open http://localhost:3000
2. Navigate via header to About, Pricing, Team, Careers, Contact, Live
3. Toggle dark/light theme — lavender accents persist
4. Resize browser to 320px, 768px, 1280px — no horizontal overflow

**Expected**: All pages render; animations visible; theme consistent.

### VS-002: Signup and role routing

1. Open http://localhost:3000/signup
2. Register a new user (defaults to USER role)
3. Confirm redirect to `/dashboard`
4. Attempt http://localhost:3000/admin — expect redirect or 403

**Expected**: USER cannot access admin/manager routes.

### VS-003: Admin login

1. Log out; log in as `admin@example.com`
2. Confirm redirect to `/admin`
3. Access `GET /api/contact` via Swagger with session cookie

**Expected**: Admin sees contact submissions list.

### VS-004: Contact API

```bash
curl -X POST http://localhost:3000/api/contact \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"test@example.com","message":"Hello"}'
```

**Expected**: `201` with submission `id`; record in PostgreSQL.

### VS-005: Dynamic pricing content

1. Edit `data/site/pricing.json` — change a tier name
2. Re-run seed or reload pricing API
3. Refresh http://localhost:3000/pricing

**Expected**: Updated tier name displayed.

### VS-006: Swagger documentation

1. Open http://localhost:3000/api/docs
2. Verify all paths from `contracts/openapi.yaml` are listed
3. Execute `GET /api/health` — returns `{ "status": "ok" }`

**Expected**: Spec matches live handlers.

### VS-007: Test suite and coverage

```bash
npm run test
npm run test:coverage
```

**Expected**: All tests pass; coverage ≥90%.

### VS-008: Lint and type check

```bash
npm run lint
npm run typecheck
```

**Expected**: Zero errors; no file exceeds 350 lines.

## Key References

- Data model: [data-model.md](./data-model.md)
- API contract: [contracts/openapi.yaml](./contracts/openapi.yaml)
- Technology decisions: [research.md](./research.md)
- Constitution: `.specify/memory/constitution.md` v1.1.0

## Troubleshooting

| Issue | Fix |
|-------|-----|
| Prisma connection refused | Ensure Docker PostgreSQL is running on port 5432 |
| Auth redirect loop | Verify `NEXTAUTH_URL` matches browser origin |
| Swagger empty | Check `src/lib/swagger.ts` spec generation path |
| Theme flash on load | Confirm `suppressHydrationWarning` on `<html>` with next-themes |
