# Data Model: Dynamic SaaS Starter Template

**Feature**: `001-saas-starter-template` | **Date**: 2026-06-12

## Overview

PostgreSQL database accessed via Prisma ORM. Fixture marketing content lives in `data/site/`
for template defaults; database stores users, submissions, and optional content overrides.

## Enums

### Role

| Value | Description |
|-------|-------------|
| `ADMIN` | Full system access; `/admin` routes and admin APIs |
| `MANAGER` | Team management access; `/manager` routes |
| `USER` | Standard user; `/dashboard` routes |

### ContactStatus

| Value | Description |
|-------|-------------|
| `NEW` | Unread submission |
| `READ` | Reviewed |
| `ARCHIVED` | Closed |

## Entities

### User

| Field | Type | Constraints | Notes |
|-------|------|-------------|-------|
| id | UUID | PK, default `uuid()` | |
| email | String | UNIQUE, NOT NULL | Login identifier |
| passwordHash | String | NOT NULL | bcrypt, never exposed in API |
| name | String | NOT NULL | Display name |
| role | Role | NOT NULL, default `USER` | ADMIN \| MANAGER \| USER |
| theme | String | default `system` | `light` \| `dark` \| `system` |
| emailVerified | DateTime? | nullable | Future verification flow |
| createdAt | DateTime | auto | |
| updatedAt | DateTime | auto | |

**Validation**:
- Email must match RFC 5322 simplified pattern.
- Password min 8 chars, 1 uppercase, 1 number (signup).
- Role assignment on signup defaults to USER; only ADMIN can promote roles.

**Relationships**: One User → many ContactSubmission (optional reviewerId).

---

### ContactSubmission

| Field | Type | Constraints | Notes |
|-------|------|-------------|-------|
| id | UUID | PK | |
| name | String | NOT NULL, max 100 | |
| email | String | NOT NULL | |
| message | String | NOT NULL, max 2000 | |
| status | ContactStatus | default `NEW` | |
| createdAt | DateTime | auto | |

**State transitions**: NEW → READ → ARCHIVED (admin/manager only).

---

### PricingPlan

| Field | Type | Constraints | Notes |
|-------|------|-------------|-------|
| id | UUID | PK | |
| slug | String | UNIQUE | e.g. `starter`, `pro` |
| name | String | NOT NULL | |
| priceCents | Int | NOT NULL | Store in cents |
| currency | String | default `USD` | ISO 4217 |
| billingPeriod | String | NOT NULL | `monthly` \| `yearly` |
| features | Json | NOT NULL | string[] |
| highlighted | Boolean | default false | Popular badge |
| sortOrder | Int | default 0 | |
| active | Boolean | default true | |

**Seed source**: `data/site/pricing.json` → Prisma seed script.

---

### TeamMember

| Field | Type | Constraints | Notes |
|-------|------|-------------|-------|
| id | UUID | PK | |
| name | String | NOT NULL | |
| title | String | NOT NULL | |
| bio | String | max 500 | |
| avatarUrl | String | | Path under `public/images/team/` |
| linkedIn | String? | | |
| twitter | String? | | |
| sortOrder | Int | default 0 | |
| active | Boolean | default true | |

**Seed source**: `data/site/team.json`.

---

### CareerOpening

| Field | Type | Constraints | Notes |
|-------|------|-------------|-------|
| id | UUID | PK | |
| title | String | NOT NULL | |
| department | String | NOT NULL | |
| location | String | NOT NULL | Remote \| City |
| description | String | NOT NULL | Markdown-safe text |
| active | Boolean | default true | |
| postedAt | DateTime | default now | |

**Seed source**: `data/site/careers.json`.

---

### SiteSection

| Field | Type | Constraints | Notes |
|-------|------|-------------|-------|
| id | UUID | PK | |
| key | String | UNIQUE | e.g. `landing.hero`, `live.stats` |
| page | String | NOT NULL | `landing` \| `about` \| `live` etc. |
| payload | Json | NOT NULL | Arbitrary structured content |
| updatedAt | DateTime | auto | |
| updatedById | UUID? | FK → User | Admin edits only |

**Purpose**: Runtime CMS overrides for dynamic SaaS template without code changes.

---

## Fixture Files (`data/site/`)

| File | Maps to |
|------|---------|
| `pricing.json` | PricingPlan seed |
| `team.json` | TeamMember seed |
| `careers.json` | CareerOpening seed |
| `landing.json` | SiteSection keys for landing |
| `about.json` | SiteSection keys for about |
| `live.json` | SiteSection keys for live showcase |

## Prisma Schema Location

`prisma/schema.prisma` at repository root.

## Indexes

- `User.email` — UNIQUE
- `PricingPlan.slug` — UNIQUE
- `SiteSection.key` — UNIQUE
- `ContactSubmission.status, createdAt` — composite for admin inbox queries

## Auth Session (Auth.js)

Managed by Auth.js adapter tables (`Account`, `Session`, `VerificationToken`) when
using database sessions; v1 uses JWT strategy with role in token payload to minimize
tables. Optional migration to database sessions documented in quickstart.
