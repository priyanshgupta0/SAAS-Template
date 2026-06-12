<!--
Sync Impact Report
- Version change: 1.0.0 → 1.1.0
- Modified principles:
  - I. Atomic Design & Reusable Modularity — expanded (all screens, Tailwind styling)
  - VI. Code Quality & Zero Defects — expanded (300–350 line file limit)
- Added principles:
  - VII. Tailwind CSS & Responsive Design
  - VIII. Universal API Client (Axios)
- Added sections: None
- Removed sections: None
- Templates:
  - .specify/templates/plan-template.md — ✅ updated
  - .specify/templates/spec-template.md — ✅ updated
  - .specify/templates/tasks-template.md — ✅ updated
  - .specify/templates/checklist-template.md — ✅ no changes required
  - .cursor/rules/specify-rules.mdc — ✅ updated
- Deferred TODOs: None
-->

# my-project1 Constitution

## Core Principles

### I. Atomic Design & Reusable Modularity

All UI and shared logic MUST follow the Atomic Design hierarchy: atoms → molecules
→ organisms → templates → pages. Every screen and page MUST be built exclusively
from these layers—no monolithic page components with inline sub-UI. Components MUST
be reusable, composable, and single-purpose. Shared behavior MUST be extracted into
modules or hooks—duplicated logic is prohibited. New features MUST extend existing
primitives before introducing parallel implementations. Styling MUST use Tailwind CSS
utility classes within Atomic components (no ad-hoc CSS files per component unless
globally justified).

**Rationale**: Atomic Design enforces consistent composition, reduces duplication,
and keeps the codebase maintainable as the product grows.

### II. Strict TypeScript (NON-NEGOTIABLE)

The project MUST use TypeScript with `strict` compiler options enabled (target the
latest stable TypeScript release). Every object, function parameter, return value,
API payload, and component prop MUST have an explicit type or interface defined.
`any` is prohibited except in documented, reviewed exceptions. Prefer interfaces for
object shapes and type aliases for unions or primitives.

**Rationale**: Strict typing catches defects at compile time, documents contracts,
and enables safe refactoring across modules.

### III. Security, Authentication & Authorization (NON-NEGOTIABLE)

All features MUST apply secure-by-default practices: input validation, output
encoding, least-privilege access, and protection against OWASP Top 10 risks.
Authentication (authn) and authorization (authz) MUST be implemented for every
protected route, API endpoint, and server action. Secrets MUST NOT be committed;
environment variables MUST be used for sensitive configuration. Security reviews
are required for auth, data handling, and external integrations.

**Rationale**: Auth and secure defaults are foundational; retrofitting security is
costly and error-prone.

### IV. Data & Asset Organization

Dummy and seed data MUST reside exclusively under the repository `data/` directory,
organized by domain or feature (e.g., `data/users/`, `data/products/`). Static
assets MUST live under `public/` with clear categorical subfolders (e.g.,
`public/images/`, `public/fonts/`, `public/icons/`, `public/documents/`). Application
code MUST NOT embed hardcoded fixture data inline; import from `data/` instead.

**Rationale**: Separating fixtures from production code and categorizing assets
keeps builds predictable and simplifies environment promotion.

### V. Test-First with Mandatory Coverage (NON-NEGOTIABLE)

Unit tests MUST be written for all application logic, utilities, hooks, and
components. React and Next.js projects MUST use Jest with React Testing Library
(RTL). Tests MUST follow red-green-refactor: write failing tests, implement, then
refactor. Project-wide line/branch coverage MUST maintain a minimum of **90%**;
CI MUST fail below this threshold. Coverage gaps require explicit justification in
the Complexity Tracking table of the implementation plan.

**Rationale**: High coverage with RTL/Jest ensures regressions are caught early and
user-facing behavior is verified, not just implementation details.

### VI. Code Quality & Zero Defects

The codebase MUST pass all configured linters and formatters with zero errors before
merge. Duplicated code blocks MUST be refactored into shared modules. Dead code,
commented-out blocks, and unused exports are prohibited. Pull requests MUST include
evidence of lint, type-check, and test success. **No source file MAY exceed 350
lines** (target ≤ 300); files approaching the limit MUST be split into smaller
Atomic components, hooks, or modules. Exceptions require documented justification
in the Complexity Tracking table.

**Rationale**: Lint-clean, DRY, and size-bounded files reduce review friction,
improve navigability, and prevent latent defects from accumulating.

### VII. Tailwind CSS & Responsive Design (NON-NEGOTIABLE)

All UI styling MUST use **Tailwind CSS**. Every screen, template, organism, and page
MUST be **fully responsive** across mobile, tablet, and desktop breakpoints (use
Tailwind responsive prefixes: `sm:`, `md:`, `lg:`, `xl:`, `2xl:`). Layouts MUST be
verified at minimum widths of 320px, 768px, and 1280px before merge. Hardcoded pixel
widths that break responsiveness are prohibited unless justified.

**Rationale**: Tailwind provides a consistent design system; responsive-first UI
ensures accessibility across all devices without separate codebases.

### VIII. Universal API Client (Axios)

All HTTP communication MUST use **Axios**. A single universal API client MUST be
implemented once (e.g., `src/lib/apiClient.ts`) handling all request types (GET,
POST, PUT, PATCH, DELETE), interceptors, auth headers, and error normalization.
The **base API URL MUST be read from environment variables** (e.g.,
`NEXT_PUBLIC_API_BASE_URL` or `API_BASE_URL`)—never hardcoded. Domain-specific
request functions MUST live in **one file per resource or domain** under
`src/services/api/` (e.g., `userApi.ts`, `productApi.ts`), each exporting typed
functions that call the universal client. Direct `axios` or `fetch` calls outside
the universal client and domain API modules are prohibited.

**Rationale**: A centralized Axios client eliminates duplicated HTTP logic, enforces
consistent error handling, and keeps endpoint configuration environment-portable.

## Technology Stack & Project Layout

| Area | Requirement |
|------|-------------|
| Language | TypeScript (strict mode, latest stable) |
| UI Framework | React / Next.js when building web applications |
| Styling | Tailwind CSS (responsive, mobile-first) |
| Component Architecture | Atomic Design (`atoms/`, `molecules/`, `organisms/`, `templates/`, `pages/`) |
| HTTP Client | Axios via universal API client |
| API Config | Base URL in `.env`; domain functions in `src/services/api/` |
| Testing | Jest + React Testing Library; minimum 90% coverage |
| File Size | ≤ 350 lines per file (target ≤ 300) |
| Fixtures | `data/` directory only |
| Static Assets | `public/` with categorical subfolders |
| Auth | Secure authentication and authorization on all protected surfaces |

Recommended source layout for web applications:

```text
src/
├── components/
│   ├── atoms/
│   ├── molecules/
│   ├── organisms/
│   ├── templates/
│   └── pages/
├── hooks/
├── lib/
│   └── apiClient.ts       # universal Axios client (single implementation)
├── services/
│   └── api/
│       ├── userApi.ts     # typed domain requests; exports functions
│       └── [domain]Api.ts
├── types/
└── styles/                # global Tailwind entry only
data/                      # dummy/seed data by domain
public/                    # images/, fonts/, icons/, documents/, etc.
tests/
├── unit/
├── integration/
└── __mocks__/
.env                       # API_BASE_URL and secrets (not committed)
```

## Development Workflow & Quality Gates

Every feature MUST pass the following gates before implementation proceeds and
again before merge:

1. **Constitution Check** — Atomic structure, Tailwind/responsive UI, types,
   security, layout, API client pattern, and testing requirements acknowledged in
   `plan.md`.
2. **Type Check** — `tsc --noEmit` (or project equivalent) passes with zero errors.
3. **Lint** — ESLint (or configured linter) passes with zero errors.
4. **Tests** — All unit and integration tests pass; coverage ≥ 90%.
5. **Security Review** — Auth/authz paths and data handling verified for the feature.
6. **No Duplication** — Shared logic extracted; no copy-paste across atoms/molecules.
7. **File Size** — No file exceeds 350 lines; splits documented if near limit.
8. **Responsive Check** — Screens verified at mobile, tablet, and desktop breakpoints.
9. **API Pattern** — All HTTP via universal Axios client; base URL from env only.

Complexity or principle violations MUST be documented in the plan's Complexity
Tracking table with justification and rejected simpler alternatives.

## Governance

This constitution supersedes ad-hoc conventions and conflicting local practices.
All specifications, plans, tasks, and pull requests MUST demonstrate compliance
with the principles above.

**Amendment procedure**:

1. Propose changes with rationale and version bump type (MAJOR/MINOR/PATCH).
2. Update `.specify/memory/constitution.md` and propagate to dependent templates.
3. Record the Sync Impact Report in the constitution HTML comment.
4. Communicate breaking governance changes to all contributors.

**Versioning policy**:

- **MAJOR**: Principle removal or backward-incompatible governance change.
- **MINOR**: New principle or materially expanded requirement.
- **PATCH**: Clarifications, wording, or non-semantic refinements.

**Compliance review**: Every PR reviewer MUST verify constitution gates. Quarterly
audits SHOULD review coverage trends, lint debt, file-size violations, and security
posture.

**Version**: 1.1.0 | **Ratified**: 2026-06-12 | **Last Amended**: 2026-06-12
