# Implementation Plan: [FEATURE]

**Branch**: `[###-feature-name]` | **Date**: [DATE] | **Spec**: [link]

**Input**: Feature specification from `/specs/[###-feature-name]/spec.md`

**Note**: This template is filled in by the `/speckit-plan` command. See `.specify/templates/plan-template.md` for the execution workflow.

## Summary

[Extract from feature spec: primary requirement + technical approach from research]

## Technical Context

<!--
  ACTION REQUIRED: Replace the content in this section with the technical details
  for the project. The structure here is presented in advisory capacity to guide
  the iteration process.
-->

**Language/Version**: TypeScript (strict mode, latest stable)

**Primary Dependencies**: React, Next.js (web apps), Tailwind CSS, Axios, Jest, React Testing Library

**Storage**: [if applicable, e.g., PostgreSQL, CoreData, files or N/A]

**Testing**: Jest + React Testing Library; minimum 90% project coverage (constitution)

**Target Platform**: [e.g., Web browser, Node.js server, or NEEDS CLARIFICATION]

**Project Type**: [e.g., web-application (Atomic Design) / library / api or NEEDS CLARIFICATION]

**Performance Goals**: [domain-specific, e.g., 1000 req/s, 10k lines/sec, 60 fps or NEEDS CLARIFICATION]

**Constraints**: Responsive (mobile/tablet/desktop); ≤350 lines per file; API base URL via env; universal Axios client

**Scale/Scope**: [domain-specific, e.g., 10k users, 1M LOC, 50 screens or NEEDS CLARIFICATION]

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

Verify compliance with `.specify/memory/constitution.md` (v1.1.0):

- [ ] **Atomic Design**: All screens built from atoms→pages; Tailwind styling; no duplication
- [ ] **Strict TypeScript**: All entities typed; `strict` mode; no unjustified `any`
- [ ] **Security**: Authn/authz defined for protected routes; OWASP risks addressed
- [ ] **Layout**: Dummy data in `data/`; assets categorized under `public/`
- [ ] **Responsive UI**: Tailwind breakpoints; verified at 320px, 768px, 1280px
- [ ] **API Layer**: Universal Axios client; base URL in env; domain functions in `src/services/api/`
- [ ] **Testing**: Jest + RTL plan; unit tests per story; 90% coverage target
- [ ] **Quality**: Lint/type-check gates; zero lint errors; DRY modules; files ≤350 lines

## Project Structure

### Documentation (this feature)

```text
specs/[###-feature]/
├── plan.md              # This file (/speckit-plan command output)
├── research.md          # Phase 0 output (/speckit-plan command)
├── data-model.md        # Phase 1 output (/speckit-plan command)
├── quickstart.md        # Phase 1 output (/speckit-plan command)
├── contracts/           # Phase 1 output (/speckit-plan command)
└── tasks.md             # Phase 2 output (/speckit-tasks command - NOT created by /speckit-plan)
```

### Source Code (repository root)
<!--
  ACTION REQUIRED: Replace the placeholder tree below with the concrete layout
  for this feature. Delete unused options and expand the chosen structure with
  real paths (e.g., apps/admin, packages/something). The delivered plan must
  not include Option labels.
-->

```text
# Web application (Atomic Design — constitution default for React/Next.js)
src/
├── components/
│   ├── atoms/
│   ├── molecules/
│   ├── organisms/
│   ├── templates/
│   └── pages/
├── hooks/
├── lib/
│   └── apiClient.ts     # universal Axios client
├── services/
│   └── api/             # domain API functions (userApi.ts, etc.)
├── types/
└── styles/              # Tailwind global entry
data/                    # dummy/seed data by domain (constitution)
public/                  # images/, fonts/, icons/, documents/
.env                     # API_BASE_URL (not committed)
tests/
├── unit/
├── integration/
└── __mocks__/

# [REMOVE IF UNUSED] Option: API-only backend
backend/
├── src/
│   ├── models/
│   ├── services/
│   └── api/
└── tests/
```

**Structure Decision**: [Document the selected structure and reference the real
directories captured above]

## Complexity Tracking

> **Fill ONLY if Constitution Check has violations that must be justified**

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| [e.g., 4th project] | [current need] | [why 3 projects insufficient] |
| [e.g., Repository pattern] | [specific problem] | [why direct DB access insufficient] |
