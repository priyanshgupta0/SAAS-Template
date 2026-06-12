# Research: Dynamic SaaS Starter Template

**Feature**: `001-saas-starter-template` | **Date**: 2026-06-12

## 1. Next.js Full-Stack Architecture

**Decision**: Next.js 15 App Router monolith — UI in `src/app/`, API in `src/app/api/`,
shared logic in `src/lib/`, `src/services/`.

**Rationale**: User requires backend inside Next.js. App Router provides React Server
Components, route handlers, and middleware for auth — single deployable unit.

**Alternatives considered**:
- Separate Express API — rejected; violates single Next.js codebase requirement.
- Pages Router — rejected; App Router is current standard with better layouts/middleware.

## 2. Database ORM

**Decision**: PostgreSQL with **Prisma ORM**.

**Rationale**: Type-safe schema, migrations, seed scripts, excellent Next.js integration,
aligns with strict TypeScript constitution.

**Alternatives considered**:
- Drizzle — lighter but less mature tooling for seeds/migrations in starter context.
- Raw SQL — rejected; slower development, weaker type safety.

## 3. Authentication & Multi-Role Authorization

**Decision**: **Auth.js v5 (NextAuth)** with Credentials provider, JWT sessions, role
embedded in token, Next.js middleware for route guards.

**Rationale**: Industry-standard for Next.js; middleware enforces `/admin`, `/manager`,
`/dashboard` namespaces; bcrypt password hashing built into custom authorize flow.

**Alternatives considered**:
- Clerk/Auth0 — rejected; external dependency and cost for a self-hosted template.
- Custom JWT only — rejected; more boilerplate than Auth.js for session management.

**Role routing map**:
| Role | Default redirect | Allowed prefixes |
|------|------------------|------------------|
| ADMIN | `/admin` | `/admin`, `/api/admin` |
| MANAGER | `/manager` | `/manager`, `/api/manager` |
| USER | `/dashboard` | `/dashboard`, `/api/user` |

## 4. Swagger / OpenAPI Documentation

**Decision**: **`next-swagger-doc`** generates OpenAPI 3.0 spec from JSDoc annotations
on route handlers; **`swagger-ui-react`** serves UI at `/api/docs`.

**Rationale**: Keeps docs co-located with handlers; CI can validate spec against route
registry. Meets "every API documented" requirement.

**Alternatives considered**:
- Manual `openapi.yaml` only — rejected; drifts from implementation.
- tRPC — rejected; user asked for Swagger REST docs.

## 5. Styling, Theme & Brand

**Decision**: Tailwind CSS v4/v3 with custom `lavender` palette in `tailwind.config.ts`;
**`next-themes`** for dark/light toggle with `class` strategy on `<html>`.

**Rationale**: Constitution mandates Tailwind + responsive + theme toggle. Lavender
tokens: `lavender-50` through `lavender-900` centered on `#E6E6FA` (primary) and
`#7C3AED` (accent).

**Alternatives considered**:
- CSS Modules — rejected by constitution.
- shadcn/ui — optional layer atop Tailwind for accessible primitives (Button, Input).

## 6. Animations & SVG Assets

**Decision**: **Framer Motion** for page/section animations; SVGs in `public/icons/` and
`public/images/vectors/`; inline SVG React components in `src/components/atoms/`.

**Rationale**: Framer Motion integrates cleanly with React; SVGs scale for responsive
and theme-aware coloring via `currentColor`.

**Alternatives considered**:
- GSAP — heavier API for starter template needs.
- Lottie — optional future enhancement for complex animations.

## 7. Frontend HTTP Client

**Decision**: Universal **Axios** client at `src/lib/apiClient.ts`; domain modules in
`src/services/api/` (`authApi.ts`, `contactApi.ts`, `contentApi.ts`).

**Rationale**: Constitution mandates Axios pattern; `NEXT_PUBLIC_API_BASE_URL` defaults
to same-origin `/api` in development.

## 8. Dynamic SaaS Content

**Decision**: Hybrid — static seed JSON in `data/site/` (pricing, team, careers, live)
loaded at build/SSR time; optional PostgreSQL `SiteSection` for runtime CMS overrides
(admin API in phase 2).

**Rationale**: Template stays fork-friendly via JSON; DB layer enables dynamic admin edits
without redeploy for v1.1.

## 9. Testing Stack

**Decision**: Jest + React Testing Library + `@testing-library/user-event`; MSW for API
mocking; Prisma test DB or mocked client for integration tests.

**Rationale**: Constitution requires Jest + RTL and 90% coverage.

## 10. Component Architecture

**Decision**: Strict Atomic Design folders under `src/components/`; page files in
`src/app/` compose template/page-level components only.

**Rationale**: Constitution non-negotiable; keeps files under 350-line limit.

## 11. File Size & Linting

**Decision**: ESLint with `max-lines` rule (350), Prettier, `eslint-plugin-jsx-a11y`.

**Rationale**: Constitution gates; split organisms into sub-components when approaching limit.

## Resolved Clarifications

| Unknown | Resolution |
|---------|------------|
| Target platform | Web browsers (SSR + CSR hybrid) |
| Project type | Full-stack Next.js web application (Atomic Design SaaS template) |
| Storage | PostgreSQL via Prisma |
| Auth method | Email/password via Auth.js Credentials |
| Live page | Live product showcase / stats demo section |
| Performance goals | <3s LCP on marketing pages; API p95 <200ms local |
