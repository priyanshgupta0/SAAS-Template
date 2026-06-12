# API Contracts

## OpenAPI Specification

- **File**: `openapi.yaml`
- **Served at**: `/api/docs` (Swagger UI)
- **Base path**: `/api`

## Route Handler Mapping

| OpenAPI Path | Next.js Handler | Auth |
|--------------|-----------------|------|
| `GET /health` | `src/app/api/health/route.ts` | Public |
| `POST /auth/register` | `src/app/api/auth/register/route.ts` | Public |
| `GET /auth/session` | `src/app/api/auth/session/route.ts` | Session |
| `GET /users/me` | `src/app/api/users/me/route.ts` | Session |
| `PATCH /users/me` | `src/app/api/users/me/route.ts` | Session |
| `PATCH /users/{userId}/role` | `src/app/api/users/[userId]/role/route.ts` | ADMIN |
| `POST /contact` | `src/app/api/contact/route.ts` | Public |
| `GET /contact` | `src/app/api/contact/route.ts` | ADMIN, MANAGER |
| `GET /content/pricing` | `src/app/api/content/pricing/route.ts` | Public |
| `GET /content/team` | `src/app/api/content/team/route.ts` | Public |
| `GET /content/careers` | `src/app/api/content/careers/route.ts` | Public |
| `GET /content/sections/{key}` | `src/app/api/content/sections/[key]/route.ts` | Public |
| `PUT /content/sections/{key}` | `src/app/api/content/sections/[key]/route.ts` | ADMIN |

Auth.js handles `POST /api/auth/signin` and `POST /api/auth/signout` via
`src/app/api/auth/[...nextauth]/route.ts` (documented in Swagger extensions).

## Frontend Axios Modules

| Module | Endpoints |
|--------|-----------|
| `src/services/api/authApi.ts` | register, session |
| `src/services/api/userApi.ts` | me, role update |
| `src/services/api/contactApi.ts` | submit, list |
| `src/services/api/contentApi.ts` | pricing, team, careers, sections |

## Sync Policy

Every new or changed route handler MUST:

1. Update `openapi.yaml`
2. Add JSDoc `@swagger` annotations for `next-swagger-doc` generation
3. Pass CI contract validation step (compare spec to route registry)
