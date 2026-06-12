# Implementation Plan: Dynamic SaaS Starter Template

**Branch**: `001-saas-starter-template` | **Date**: 2026-06-12 | **Spec**: [spec.md](./spec.md)

**Input**: Feature specification from `/specs/001-saas-starter-template/spec.md`

## Summary

Build a full-stack **Next.js 15 SaaS starter template** with a lavender-themed,
animation-rich marketing site (landing, about, pricing, contact, team, careers, live),
email/password authentication with **Admin / Manager / User** role-based routing,
PostgreSQL persistence via Prisma, REST APIs with **Swagger documentation**, dark/light
theme toggle, and strict **Atomic Design + Tailwind** architecture per constitution v1.1.0.

Technical approach: App Router monolith, Auth.js v5 for sessions, universal Axios client
for frontend API calls, Framer Motion animations, fixture data in `data/site/`, assets in
`public/`, and Jest + RTL for ≥90% coverage.

## Technical Context

**Language/Version**: TypeScript 5.x (strict mode)

**Primary Dependencies**: Next.js 15, React 19, Tailwind CSS, Axios, Auth.js v5, Prisma,
PostgreSQL, Framer Motion, next-themes, next-swagger-doc, swagger-ui-react, Jest, RTL, bcrypt

**Storage**: PostgreSQL (Prisma ORM); fixture JSON in `data/site/`

**Testing**: Jest + React Testing Library; MSW for API mocks; ≥90% coverage (constitution)

**Target Platform**: Web browsers (SSR/CSR hybrid via Next.js)

**Project Type**: Full-stack Next.js web application (Atomic Design SaaS template)

**Performance Goals**: Marketing LCP <3s on throttled mobile; API p95 <200ms local

**Constraints**: Responsive 320/768/1280px; ≤350 lines/file; API base URL via env;
universal Axios client; Swagger synced with handlers

**Scale/Scope**: 8 public pages, 3 role dashboards, 12+ API routes, 1 PostgreSQL database

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

Verify compliance with `.specify/memory/constitution.md` (v1.1.0):

- [x] **Atomic Design**: All screens mapped to atoms→pages; marketing organisms split per section
- [x] **Strict TypeScript**: Prisma types + `src/types/` interfaces for all API payloads
- [x] **Security**: Auth.js + middleware role guards; bcrypt passwords; env secrets
- [x] **Layout**: `data/site/` fixtures; `public/images/`, `public/icons/`, `public/fonts/`
- [x] **Responsive UI**: Tailwind breakpoints on all 8 pages + auth flows
- [x] **API Layer**: `src/lib/apiClient.ts` + `src/services/api/*Api.ts` per domain
- [x] **Testing**: Test plan per user story; 90% coverage gate in CI
- [x] **Quality**: ESLint max-lines 350; Prettier; split large organisms

**Post-design re-check**: All gates pass. Swagger + Prisma add complexity but are required
by feature spec; documented in Complexity Tracking.

## Project Structure

### Documentation (this feature)

```text
specs/001-saas-starter-template/
├── plan.md              # This file
├── research.md          # Technology decisions
├── data-model.md        # Prisma entities
├── quickstart.md        # Setup and validation guide
├── contracts/
│   ├── openapi.yaml
│   └── README.md
└── tasks.md             # Phase 2 (/speckit-tasks — not yet created)
```

### Source Code (repository root)

```text
src/
├── app/
│   ├── (marketing)/           # Public layout group
│   │   ├── page.tsx             # Landing
│   │   ├── about/page.tsx
│   │   ├── pricing/page.tsx
│   │   ├── contact/page.tsx
│   │   ├── team/page.tsx
│   │   ├── careers/page.tsx
│   │   └── live/page.tsx
│   ├── (auth)/
│   │   ├── login/page.tsx
│   │   └── signup/page.tsx
│   ├── admin/                   # ADMIN role only
│   ├── manager/                 # MANAGER role only
│   ├── dashboard/               # USER role only
│   ├── api/
│   │   ├── auth/[...nextauth]/route.ts
│   │   ├── auth/register/route.ts
│   │   ├── auth/session/route.ts
│   │   ├── health/route.ts
│   │   ├── users/me/route.ts
│   │   ├── users/[userId]/role/route.ts
│   │   ├── contact/route.ts
│   │   ├── content/pricing/route.ts
│   │   ├── content/team/route.ts
│   │   ├── content/careers/route.ts
│   │   ├── content/sections/[key]/route.ts
│   │   └── docs/route.ts        # Swagger UI
│   ├── layout.tsx
│   └── globals.css
├── components/
│   ├── atoms/                   # Button, Input, Logo, ThemeToggle, SvgIcon
│   ├── molecules/               # NavLink, PricingCard, TeamCard, FormField
│   ├── organisms/               # Header, Footer, Hero, ContactForm, AuthForm
│   ├── templates/               # MarketingLayout, AuthLayout, DashboardLayout
│   └── pages/                   # LandingPage, PricingPage (composition only)
├── hooks/                       # useTheme, useAuth, useMediaQuery
├── lib/
│   ├── apiClient.ts             # Universal Axios client
│   ├── auth.ts                  # Auth.js config
│   ├── prisma.ts                # Prisma singleton
│   └── swagger.ts               # OpenAPI spec generator
├── middleware.ts                # Role-based route protection
├── services/
│   └── api/
│       ├── authApi.ts
│       ├── userApi.ts
│       ├── contactApi.ts
│       └── contentApi.ts
├── types/
│   ├── user.ts
│   ├── content.ts
│   └── api.ts
└── styles/
    └── tailwind.css
prisma/
├── schema.prisma
└── seed.ts
data/site/
├── pricing.json
├── team.json
├── careers.json
├── landing.json
├── about.json
└── live.json
public/
├── images/team/
├── images/vectors/
├── icons/
└── fonts/
tests/
├── unit/
├── integration/
└── __mocks__/
.env.example
docker-compose.yml             # PostgreSQL for local dev
```

**Structure Decision**: Single Next.js monolith at repo root (no separate `frontend/`
folder). Atomic components live under `src/components/`; route files in `src/app/` remain
thin wrappers composing page-level components. API route handlers delegate to
`src/services/server/` if logic exceeds handler size limits.

## Complexity Tracking

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| Swagger dual maintenance (YAML + JSDoc) | User requires every API documented and current | README-only docs drift from implementation |
| Three role namespaces | Admin/Manager/User with distinct routing | Single dashboard cannot demonstrate RBAC template |
| Framer Motion dependency | Animations + modern feel on marketing pages | CSS-only animations insufficient for showcase quality |
| Hybrid content (JSON + DB) | Template forkability + runtime admin edits | DB-only requires seed infra for every fork; JSON-only blocks admin CMS |

## Phase 0 Output

See [research.md](./research.md) — all Technical Context clarifications resolved.

## Phase 1 Output

- [data-model.md](./data-model.md) — Prisma entities and fixture mapping
- [contracts/openapi.yaml](./contracts/openapi.yaml) — REST API contract
- [contracts/README.md](./contracts/README.md) — Handler mapping and sync policy
- [quickstart.md](./quickstart.md) — Setup and validation scenarios

## Implementation Phases (for /speckit-tasks)

### Phase A — Scaffold & Design System
- `create-next-app` with TypeScript, Tailwind, App Router, ESLint
- Lavender theme tokens, `next-themes`, global fonts
- Atomic folder scaffold, `apiClient.ts`, `.env.example`
- PostgreSQL via Docker Compose, Prisma init + seed

### Phase B — Marketing Pages (P1)
- MarketingLayout template with Header/Footer organisms
- Landing, About, Pricing, Contact, Team, Careers, Live pages
- Load content from `data/site/`; Framer Motion section animations
- SVG atoms from `public/images/vectors/`

### Phase C — Authentication (P2)
- Auth.js credentials provider, signup API, login page
- Middleware role guards for `/admin`, `/manager`, `/dashboard`
- Role-specific dashboard shells (minimal v1)

### Phase D — API + Swagger (P4)
- Implement all contract routes with Prisma
- Swagger UI at `/api/docs`; CI spec validation
- Axios domain modules wired to pages

### Phase E — Tests & Polish
- Unit tests per atom/molecule/organism and API handlers
- Integration tests for auth flows and role access
- Coverage gate 90%; responsive visual checklist
