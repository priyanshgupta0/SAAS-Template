# Feature Specification: Dynamic SaaS Starter Template

**Feature Branch**: `001-saas-starter-template`

**Created**: 2026-06-12

**Status**: Draft

**Input**: User description: "Set up Next.js project with landing page, login/signup flow, about, pricing, signup, contact, team, careers, live pages. Standard dynamic SaaS template with animations, SVG vectors, modern lavender-themed UI, dark/light theme toggle. Backend in Next.js with PostgreSQL. Swagger docs for every API. Multi-role auth (Admin, User, Manager) with role-based routing and authorization locks."

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Public Marketing Experience (Priority: P1)

A visitor browses the SaaS marketing site (landing, about, pricing, team, careers,
contact, live) on any device and experiences a modern lavender-branded interface with
smooth animations, SVG illustrations, and light/dark theme toggle.

**Why this priority**: The marketing surface is the first impression and MVP
demonstration of the template's visual and responsive quality.

**Independent Test**: Navigate all public routes at 320px, 768px, and 1280px widths;
toggle theme; verify lavender palette and animations render without layout breakage.

**Acceptance Scenarios**:

1. **Given** a visitor on the landing page, **When** they scroll through hero, features,
   and CTA sections, **Then** animations play and content is readable in both themes.
2. **Given** a visitor on mobile, **When** they open the navigation menu, **Then** all
   marketing pages are reachable and responsive.
3. **Given** light theme active, **When** the visitor toggles dark mode, **Then** the
   entire site switches consistently including SVG and lavender accent colors.

---

### User Story 2 - Authentication & Role-Based Access (Priority: P2)

A user signs up or logs in and is routed to the correct experience based on role
(Admin, Manager, or User). Unauthorized roles cannot access protected routes.

**Why this priority**: Multi-role auth is a core SaaS template capability and gates
dashboard experiences.

**Independent Test**: Create accounts with each role; verify login redirects and blocked
access to other role routes return 403 or redirect to unauthorized page.

**Acceptance Scenarios**:

1. **Given** valid credentials for a User role, **When** login succeeds, **Then** the
   user lands on `/dashboard` and cannot access `/admin` or `/manager`.
2. **Given** valid credentials for an Admin role, **When** login succeeds, **Then** the
   admin lands on `/admin` with full admin navigation visible.
3. **Given** an unauthenticated visitor, **When** they request `/dashboard`, **Then**
   they are redirected to login with return URL preserved.

---

### User Story 3 - Dynamic Content Configuration (Priority: P3)

A template operator updates marketing content (pricing tiers, team members, careers
listings, live section copy) via configuration without rewriting page components.

**Why this priority**: The template must be reusable across different SaaS products.

**Independent Test**: Change pricing data in `data/site/pricing.json` and verify the
pricing page reflects updates after rebuild or dynamic fetch.

**Acceptance Scenarios**:

1. **Given** updated pricing tier data, **When** the pricing page loads, **Then** new
   tiers, prices, and feature bullets display correctly.
2. **Given** updated team member entries, **When** the team page loads, **Then** cards
   reflect new names, roles, and avatars from data sources.

---

### User Story 4 - API Layer with Swagger Documentation (Priority: P4)

Developers consume REST APIs (auth, users, contact, content) backed by PostgreSQL,
with up-to-date Swagger/OpenAPI documentation served from the application.

**Why this priority**: API + DB + docs complete the full-stack starter template.

**Independent Test**: Open `/api/docs`; execute sample requests; verify responses match
contract schemas and persist to PostgreSQL where applicable.

**Acceptance Scenarios**:

1. **Given** the Swagger UI at `/api/docs`, **When** a developer views auth endpoints,
   **Then** request/response schemas match live API behavior.
2. **Given** a contact form submission via API, **When** POST succeeds, **Then** the
   record is stored in PostgreSQL and returns 201 with submission ID.

---

### Edge Cases

- What happens when a user with an invalid or missing role token accesses a protected route?
- How does the system handle PostgreSQL connection failure at startup?
- What happens when theme preference is set but JavaScript is disabled (SSR fallback)?
- How are duplicate email signups handled?
- What happens when Swagger spec drifts from implemented routes (CI validation)?

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST provide public pages: landing, about, pricing, contact, team,
  careers, and live showcase.
- **FR-002**: System MUST implement login and signup flows with email/password auth.
- **FR-003**: System MUST support three roles: Admin, Manager, and User with distinct
  route namespaces (`/admin`, `/manager`, `/dashboard`).
- **FR-004**: System MUST enforce authorization locks on all protected routes and API
  endpoints per role.
- **FR-005**: System MUST use PostgreSQL for persistent data (users, sessions metadata,
  contact submissions, site content overrides).
- **FR-006**: System MUST expose REST APIs via Next.js App Router route handlers.
- **FR-007**: System MUST serve Swagger/OpenAPI documentation at `/api/docs` kept in sync
  with implemented endpoints.
- **FR-008**: System MUST use lavender as the primary brand color with full dark/light
  theme support via a global theme toggle.
- **FR-009**: System MUST include modern animations and SVG vector assets on marketing pages.
- **FR-010**: System MUST load marketing fixture content from `data/` and static assets
  from categorized `public/` subfolders.
- **FR-011**: System MUST follow Atomic Design component hierarchy with Tailwind CSS.
- **FR-012**: System MUST use a universal Axios client for frontend API calls with base
  URL from environment variables.
- **FR-013**: System MUST maintain ≥90% test coverage with Jest and React Testing Library.
- **FR-014**: No source file MAY exceed 350 lines (constitution).

### Key Entities

- **User**: Account with email, hashed password, name, role (ADMIN | MANAGER | USER),
  theme preference, timestamps.
- **Session**: Auth session linked to user with expiry.
- **PricingPlan**: Tier name, price, billing period, feature list, highlighted flag.
- **TeamMember**: Name, title, bio, avatar path, social links.
- **CareerOpening**: Title, department, location, description, active flag.
- **ContactSubmission**: Name, email, message, status, created timestamp.
- **SiteSection**: Dynamic content block key, JSON payload, page association.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: All 8 public marketing routes load in under 3 seconds on 3G throttled mobile.
- **SC-002**: 100% of API routes documented in Swagger match live handler behavior in CI.
- **SC-003**: Role-based access tests pass for all three roles with zero unauthorized leaks.
- **SC-004**: Lighthouse accessibility score ≥90 on landing and pricing pages.
- **SC-005**: Project test coverage ≥90% before first release tag.
- **SC-006**: All pages pass responsive checks at 320px, 768px, and 1280px.

## Assumptions

- Email/password authentication is sufficient for v1 (OAuth deferred).
- "Live" page is a live product demo / real-time showcase section (stats, preview), not
  live streaming.
- PostgreSQL runs locally via Docker or a managed instance; connection string in `.env`.
- Single-tenant template; multi-tenancy is out of scope for v1.
- Swagger UI is served in development and staging; production may gate behind admin role.
