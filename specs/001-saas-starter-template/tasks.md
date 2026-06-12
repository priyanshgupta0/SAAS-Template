# Tasks: Dynamic SaaS Starter Template

**Input**: Design documents from `/specs/001-saas-starter-template/`

**Prerequisites**: plan.md, spec.md, research.md, data-model.md, contracts/, quickstart.md

**Tests**: REQUIRED — Jest + React Testing Library; minimum 90% coverage per constitution and FR-013.

**Organization**: Tasks grouped by user story for independent implementation and testing.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: User story label (US1–US4)
- All tasks include exact file paths

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Initialize Next.js monolith, tooling, fixtures, and asset layout.

- [ ] T001 Initialize Next.js 15 App Router project with TypeScript strict mode in repository root via `create-next-app`
- [ ] T002 Install core dependencies in `package.json` (Tailwind, Axios, Framer Motion, next-themes, Prisma, Auth.js, bcrypt, next-swagger-doc, swagger-ui-react)
- [ ] T003 Install dev dependencies in `package.json` (Jest, RTL, MSW, eslint-plugin-max-lines, Prettier)
- [ ] T004 [P] Create Atomic Design folder scaffold under `src/components/{atoms,molecules,organisms,templates,pages}/`
- [ ] T005 [P] Configure lavender theme tokens in `tailwind.config.ts` and `src/styles/tailwind.css`
- [ ] T006 [P] Configure ESLint with `max-lines` rule (350) in `eslint.config.mjs`
- [ ] T007 [P] Configure Prettier in `.prettierrc`
- [ ] T008 [P] Configure Jest and RTL in `jest.config.ts` and `jest.setup.ts` with 90% coverage threshold
- [ ] T009 [P] Create fixture JSON files in `data/site/` (`pricing.json`, `team.json`, `careers.json`, `landing.json`, `about.json`, `live.json`)
- [ ] T010 [P] Scaffold categorized asset folders `public/images/team/`, `public/images/vectors/`, `public/icons/`, `public/fonts/`
- [ ] T011 [P] Add placeholder SVG vectors in `public/images/vectors/` (hero, features, live-stats)
- [ ] T012 [P] Create `.env.example` with `DATABASE_URL`, `NEXTAUTH_SECRET`, `NEXTAUTH_URL`, `NEXT_PUBLIC_API_BASE_URL`
- [ ] T013 Create `docker-compose.yml` for local PostgreSQL on port 5432

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Database, shared types, universal API client, theme system, base layouts, and auth scaffolding. **No user story work until this phase completes.**

- [ ] T014 Define Prisma schema with all entities in `prisma/schema.prisma` (User, ContactSubmission, PricingPlan, TeamMember, CareerOpening, SiteSection)
- [ ] T015 Run initial migration and generate Prisma client (`prisma/migrations/`)
- [ ] T016 Implement seed script loading `data/site/*.json` in `prisma/seed.ts` including admin/manager/user accounts
- [ ] T017 Create Prisma singleton in `src/lib/prisma.ts`
- [ ] T018 Create universal Axios client with interceptors in `src/lib/apiClient.ts`
- [ ] T019 [P] Create shared API types in `src/types/api.ts`
- [ ] T020 [P] Create user and role types in `src/types/user.ts`
- [ ] T021 [P] Create content entity types in `src/types/content.ts`
- [ ] T022 Configure root layout with `next-themes` provider in `src/app/layout.tsx` and `src/components/templates/ThemeProvider.tsx`
- [ ] T023 [P] Create atom `Button` in `src/components/atoms/Button.tsx`
- [ ] T024 [P] Create atom `Input` in `src/components/atoms/Input.tsx`
- [ ] T025 [P] Create atom `Logo` in `src/components/atoms/Logo.tsx`
- [ ] T026 [P] Create atom `ThemeToggle` in `src/components/atoms/ThemeToggle.tsx`
- [ ] T027 [P] Create atom `SvgIcon` in `src/components/atoms/SvgIcon.tsx`
- [ ] T028 Create `MarketingLayout` template in `src/components/templates/MarketingLayout.tsx`
- [ ] T029 Create `AuthLayout` template in `src/components/templates/AuthLayout.tsx`
- [ ] T030 Create `DashboardLayout` template in `src/components/templates/DashboardLayout.tsx`
- [ ] T031 Configure Auth.js with credentials provider in `src/lib/auth.ts`
- [ ] T032 Create Auth.js route handler in `src/app/api/auth/[...nextauth]/route.ts`
- [ ] T033 Create base middleware with public route allowlist in `src/middleware.ts`
- [ ] T034 [P] Create content loader utility reading `data/site/` in `src/lib/contentLoader.ts`

**Checkpoint**: Foundation ready — user story phases can begin.

---

## Phase 3: User Story 1 — Public Marketing Experience (Priority: P1) 🎯 MVP

**Goal**: Deliver all public marketing pages with lavender theme, animations, SVG illustrations, theme toggle, and full responsiveness.

**Independent Test**: Navigate landing, about, pricing, team, careers, contact, live at 320px/768px/1280px; toggle dark/light; verify animations and layout (quickstart VS-001).

### Tests for User Story 1

> Write these tests FIRST; ensure they FAIL before implementation.

- [ ] T035 [P] [US1] Unit tests for atoms in `tests/unit/components/atoms/Button.test.tsx`, `Input.test.tsx`, `ThemeToggle.test.tsx`
- [ ] T036 [P] [US1] Unit test for `Header` organism in `tests/unit/components/organisms/Header.test.tsx`
- [ ] T037 [P] [US1] Unit test for `Hero` organism in `tests/unit/components/organisms/Hero.test.tsx`
- [ ] T038 [P] [US1] Unit test for `LandingPage` in `tests/unit/components/pages/LandingPage.test.tsx`
- [ ] T039 [P] [US1] Integration test for marketing navigation in `tests/integration/marketing-navigation.test.tsx`

### Implementation for User Story 1

- [ ] T040 [P] [US1] Create molecule `NavLink` in `src/components/molecules/NavLink.tsx`
- [ ] T041 [P] [US1] Create molecule `MobileMenu` in `src/components/molecules/MobileMenu.tsx`
- [ ] T042 [P] [US1] Create molecule `PricingCard` in `src/components/molecules/PricingCard.tsx`
- [ ] T043 [P] [US1] Create molecule `TeamCard` in `src/components/molecules/TeamCard.tsx`
- [ ] T044 [P] [US1] Create molecule `CareerCard` in `src/components/molecules/CareerCard.tsx`
- [ ] T045 [US1] Create organism `Header` with responsive nav in `src/components/organisms/Header.tsx`
- [ ] T046 [US1] Create organism `Footer` in `src/components/organisms/Footer.tsx`
- [ ] T047 [US1] Create organism `Hero` with Framer Motion in `src/components/organisms/Hero.tsx`
- [ ] T048 [P] [US1] Create organism `FeaturesSection` in `src/components/organisms/FeaturesSection.tsx`
- [ ] T049 [P] [US1] Create organism `CtaSection` in `src/components/organisms/CtaSection.tsx`
- [ ] T050 [P] [US1] Create organism `LiveStatsSection` in `src/components/organisms/LiveStatsSection.tsx`
- [ ] T051 [US1] Create page component `LandingPage` in `src/components/pages/LandingPage.tsx` composing landing organisms
- [ ] T052 [P] [US1] Create page component `AboutPage` in `src/components/pages/AboutPage.tsx`
- [ ] T053 [P] [US1] Create page component `PricingPage` in `src/components/pages/PricingPage.tsx` using fixture data from `data/site/pricing.json`
- [ ] T054 [P] [US1] Create page component `TeamPage` in `src/components/pages/TeamPage.tsx` using `data/site/team.json`
- [ ] T055 [P] [US1] Create page component `CareersPage` in `src/components/pages/CareersPage.tsx` using `data/site/careers.json`
- [ ] T056 [P] [US1] Create page component `ContactPage` shell in `src/components/pages/ContactPage.tsx` (form wired in US4)
- [ ] T057 [P] [US1] Create page component `LivePage` in `src/components/pages/LivePage.tsx` using `data/site/live.json`
- [ ] T058 [US1] Create marketing route group layout in `src/app/(marketing)/layout.tsx`
- [ ] T059 [P] [US1] Add thin route `src/app/(marketing)/page.tsx` rendering `LandingPage`
- [ ] T060 [P] [US1] Add route `src/app/(marketing)/about/page.tsx` rendering `AboutPage`
- [ ] T061 [P] [US1] Add route `src/app/(marketing)/pricing/page.tsx` rendering `PricingPage`
- [ ] T062 [P] [US1] Add route `src/app/(marketing)/team/page.tsx` rendering `TeamPage`
- [ ] T063 [P] [US1] Add route `src/app/(marketing)/careers/page.tsx` rendering `CareersPage`
- [ ] T064 [P] [US1] Add route `src/app/(marketing)/contact/page.tsx` rendering `ContactPage`
- [ ] T065 [P] [US1] Add route `src/app/(marketing)/live/page.tsx` rendering `LivePage`
- [ ] T066 [US1] Verify responsive layout and theme toggle across all marketing pages at 320px, 768px, 1280px

**Checkpoint**: User Story 1 independently demoable as visual MVP.

---

## Phase 4: User Story 2 — Authentication & Role-Based Access (Priority: P2)

**Goal**: Login/signup flows with Admin, Manager, User roles and protected route namespaces.

**Independent Test**: Log in as each seeded role; verify redirects to `/admin`, `/manager`, `/dashboard`; confirm cross-role access blocked (quickstart VS-002, VS-003).

### Tests for User Story 2

- [ ] T067 [P] [US2] Unit test for `AuthForm` in `tests/unit/components/organisms/AuthForm.test.tsx`
- [ ] T068 [P] [US2] Unit test for role guard helpers in `tests/unit/lib/roleGuard.test.ts`
- [ ] T069 [US2] Integration test for login redirects per role in `tests/integration/auth-role-routing.test.tsx`
- [ ] T070 [US2] Integration test for unauthorized route access in `tests/integration/auth-route-protection.test.tsx`

### Implementation for User Story 2

- [ ] T071 [P] [US2] Create role guard utilities in `src/lib/roleGuard.ts`
- [ ] T072 [US2] Extend middleware with role-based locks for `/admin`, `/manager`, `/dashboard` in `src/middleware.ts`
- [ ] T073 [P] [US2] Create molecule `FormField` in `src/components/molecules/FormField.tsx`
- [ ] T074 [US2] Create organism `AuthForm` in `src/components/organisms/AuthForm.tsx`
- [ ] T075 [P] [US2] Create page `LoginPage` in `src/components/pages/LoginPage.tsx`
- [ ] T076 [P] [US2] Create page `SignupPage` in `src/components/pages/SignupPage.tsx`
- [ ] T077 [US2] Add route `src/app/(auth)/login/page.tsx` rendering `LoginPage`
- [ ] T078 [US2] Add route `src/app/(auth)/signup/page.tsx` rendering `SignupPage`
- [ ] T079 [US2] Implement `POST` register handler in `src/app/api/auth/register/route.ts`
- [ ] T080 [US2] Implement `GET` session handler in `src/app/api/auth/session/route.ts`
- [ ] T081 [P] [US2] Create `authApi.ts` domain functions in `src/services/api/authApi.ts`
- [ ] T082 [P] [US2] Create minimal admin shell page in `src/app/admin/page.tsx` using `DashboardLayout`
- [ ] T083 [P] [US2] Create minimal manager shell page in `src/app/manager/page.tsx` using `DashboardLayout`
- [ ] T084 [P] [US2] Create minimal user dashboard page in `src/app/dashboard/page.tsx` using `DashboardLayout`
- [ ] T085 [US2] Implement post-login role redirect logic in `src/lib/auth.ts` callbacks
- [ ] T086 [US2] Create unauthorized fallback page in `src/app/unauthorized/page.tsx`

**Checkpoint**: Multi-role auth and route protection independently testable.

---

## Phase 5: User Story 3 — Dynamic Content Configuration (Priority: P3)

**Goal**: Marketing content driven by configuration (`data/site/` + DB `SiteSection`) without rewriting page components.

**Independent Test**: Edit `data/site/pricing.json` or update section via admin API; verify pricing/team pages reflect changes (quickstart VS-005).

### Tests for User Story 3

- [ ] T087 [P] [US3] Unit test for `contentLoader` in `tests/unit/lib/contentLoader.test.ts`
- [ ] T088 [P] [US3] Unit test for `contentService` in `tests/unit/services/server/contentService.test.ts`
- [ ] T089 [US3] Integration test for dynamic pricing render in `tests/integration/dynamic-content-pricing.test.tsx`

### Implementation for User Story 3

- [ ] T090 [US3] Create server content service merging DB and JSON in `src/services/server/contentService.ts`
- [ ] T091 [P] [US3] Implement `GET /api/content/pricing` in `src/app/api/content/pricing/route.ts`
- [ ] T092 [P] [US3] Implement `GET /api/content/team` in `src/app/api/content/team/route.ts`
- [ ] T093 [P] [US3] Implement `GET /api/content/careers` in `src/app/api/content/careers/route.ts`
- [ ] T094 [P] [US3] Implement `GET /api/content/sections/[key]` in `src/app/api/content/sections/[key]/route.ts`
- [ ] T095 [P] [US3] Implement `PUT /api/content/sections/[key]` (admin only) in `src/app/api/content/sections/[key]/route.ts`
- [ ] T096 [US3] Create `contentApi.ts` in `src/services/api/contentApi.ts` using universal Axios client
- [ ] T097 [US3] Refactor `PricingPage` to fetch from `contentApi` in `src/components/pages/PricingPage.tsx`
- [ ] T098 [US3] Refactor `TeamPage` to fetch from `contentApi` in `src/components/pages/TeamPage.tsx`
- [ ] T099 [US3] Refactor `CareersPage` to fetch from `contentApi` in `src/components/pages/CareersPage.tsx`
- [ ] T100 [US3] Refactor `LandingPage` and `LivePage` to load `SiteSection` keys from `contentApi`

**Checkpoint**: Content updates propagate without component rewrites.

---

## Phase 6: User Story 4 — API Layer with Swagger Documentation (Priority: P4)

**Goal**: Complete REST API surface backed by PostgreSQL with synced Swagger docs at `/api/docs`.

**Independent Test**: Open `/api/docs`; execute health, contact POST, user endpoints; verify PostgreSQL persistence (quickstart VS-004, VS-006).

### Tests for User Story 4

- [ ] T101 [P] [US4] Unit tests for API route handlers in `tests/unit/api/health.test.ts`, `contact.test.ts`
- [ ] T102 [P] [US4] Contract validation test comparing handlers to `specs/001-saas-starter-template/contracts/openapi.yaml` in `tests/integration/openapi-contract.test.ts`
- [ ] T103 [US4] Integration test for contact submission persistence in `tests/integration/contact-api.test.ts`

### Implementation for User Story 4

- [ ] T104 [P] [US4] Implement `GET /api/health` in `src/app/api/health/route.ts`
- [ ] T105 [US4] Implement `GET` and `PATCH /api/users/me` in `src/app/api/users/me/route.ts`
- [ ] T106 [US4] Implement `PATCH /api/users/[userId]/role` (admin only) in `src/app/api/users/[userId]/role/route.ts`
- [ ] T107 [US4] Implement `POST` and `GET /api/contact` in `src/app/api/contact/route.ts`
- [ ] T108 [P] [US4] Create `userApi.ts` in `src/services/api/userApi.ts`
- [ ] T109 [P] [US4] Create `contactApi.ts` in `src/services/api/contactApi.ts`
- [ ] T110 [US4] Create organism `ContactForm` wired to `contactApi` in `src/components/organisms/ContactForm.tsx`
- [ ] T111 [US4] Wire `ContactPage` to `ContactForm` in `src/components/pages/ContactPage.tsx`
- [ ] T112 [US4] Configure OpenAPI generator in `src/lib/swagger.ts`
- [ ] T113 [US4] Serve Swagger UI at `src/app/api/docs/route.tsx` (or `src/app/api/docs/page.tsx`)
- [ ] T114 [US4] Add JSDoc `@swagger` annotations to all route handlers under `src/app/api/`
- [ ] T115 [US4] Sync `specs/001-saas-starter-template/contracts/openapi.yaml` with implemented routes
- [ ] T116 [US4] Add npm script `test:contract` in `package.json` for OpenAPI validation in CI

**Checkpoint**: Full API + Swagger independently verifiable.

---

## Phase 7: Polish & Cross-Cutting Concerns

**Purpose**: Coverage, accessibility, documentation, and constitution compliance gates.

- [ ] T117 [P] Fill unit test gaps for remaining organisms in `tests/unit/components/`
- [ ] T118 [P] Add MSW handlers for API mocks in `tests/__mocks__/handlers.ts`
- [ ] T119 Run full test suite and enforce ≥90% coverage via `npm run test:coverage`
- [ ] T120 [P] Add admin contact inbox UI in `src/app/admin/contact/page.tsx` using `contactApi`
- [ ] T121 [P] Add admin content editor UI in `src/app/admin/content/page.tsx` for `SiteSection` keys
- [ ] T122 Audit all source files for ≤350 line limit; split any violations into smaller components
- [ ] T123 Run `npm run lint` and `npm run typecheck` with zero errors
- [ ] T124 Validate quickstart scenarios VS-001 through VS-008 in `specs/001-saas-starter-template/quickstart.md`
- [ ] T125 [P] Add README.md with setup instructions linking to quickstart.md

---

## Dependencies & Execution Order

### Phase Dependencies

```text
Phase 1 (Setup)
    ↓
Phase 2 (Foundational) — BLOCKS all user stories
    ↓
Phase 3 (US1 Marketing) — MVP, can start immediately after Phase 2
    ↓
Phase 4 (US2 Auth) — depends on Phase 2; integrates with US1 nav links
    ↓
Phase 5 (US3 Dynamic Content) — depends on US1 pages + Phase 2 DB
    ↓
Phase 6 (US4 API/Swagger) — depends on US2 auth + US3 content routes partial
    ↓
Phase 7 (Polish)
```

### User Story Dependencies

| Story | Depends On | Can Start After |
|-------|------------|-----------------|
| US1 (P1) | Phase 2 only | Foundational checkpoint |
| US2 (P2) | Phase 2, US1 nav (login/signup links) | US1 complete or parallel if nav stubbed |
| US3 (P3) | Phase 2 DB, US1 page components | US1 complete |
| US4 (P4) | US2 auth guards, US3 content routes | US2 + partial US3 |

**Recommended sequential order**: US1 → US2 → US3 → US4 (safest for integration).

### Within Each User Story

1. Tests written first (must FAIL)
2. Types/utilities → components → routes → API modules
3. Story checkpoint validation before next priority

---

## Parallel Execution Examples

### User Story 1 — Atoms and pages (after T045 Header exists)

```bash
# Parallel molecules:
T040 NavLink.tsx | T041 MobileMenu.tsx | T042 PricingCard.tsx | T043 TeamCard.tsx

# Parallel routes (after page components exist):
T059 landing | T060 about | T061 pricing | T062 team | T063 careers | T064 contact | T065 live
```

### User Story 2 — Dashboard shells

```bash
T082 admin/page.tsx | T083 manager/page.tsx | T084 dashboard/page.tsx
```

### User Story 4 — API modules

```bash
T104 health/route.ts | T108 userApi.ts | T109 contactApi.ts
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup (T001–T013)
2. Complete Phase 2: Foundational (T014–T034)
3. Complete Phase 3: User Story 1 (T035–T066)
4. **STOP and VALIDATE**: Run VS-001 from quickstart.md
5. Demo lavender marketing site with theme toggle and animations

### Incremental Delivery

1. Setup + Foundational → infrastructure ready
2. US1 → visual MVP deployed
3. US2 → auth and role dashboards
4. US3 → dynamic content configuration
5. US4 → full API + Swagger
6. Polish → 90% coverage and constitution gates

### Parallel Team Strategy

| Developer | Focus |
|-----------|-------|
| A | US1 marketing components and pages |
| B | Phase 2 Prisma + US4 API routes (after foundational) |
| C | US2 auth + middleware + tests |

---

## Notes

- Every task must keep files ≤350 lines; split organisms if approaching limit
- All frontend API calls via `src/lib/apiClient.ts` and `src/services/api/*`
- Swagger must stay synced with `contracts/openapi.yaml` on every API change
- Commit after each task or logical group
- `[P]` tasks touch different files and can run concurrently within their phase
