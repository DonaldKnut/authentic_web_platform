# Frontend → Backend: session / cookie persistence

The web app stores Nest JWTs in **httpOnly cookies** (not `localStorage`):

| Cookie | Purpose | Frontend maxAge (remember me on) |
| --- | --- | --- |
| `authentic_access` | Access JWT | **8 hours** |
| `authentic_refresh` | Refresh JWT | **30 days** |
| `authentic_org` | `x-organization-id` | **30 days** |

Remember me **off** → same cookies without `maxAge` (browser session only).

## What the frontend already does

1. Login / verify-email → set all three cookies via BFF (`/api/auth/*`).
2. On Nest **401**, BFF calls `POST /auth/refresh` with the refresh cookie, **rotates** both tokens, retries once.
3. Logout → `POST /auth/logout` `{ refreshToken }` then clears cookies.

## What we need from the backend

Confirm (or adjust) these so “stay signed in” works for the full refresh window:

| Item | Expected |
| --- | --- |
| Access JWT TTL | ≈ **8h** (or shorter is fine; refresh covers it) |
| Refresh JWT TTL | ≥ **30 days** (match or exceed frontend cookie) |
| Refresh rotation | Old refresh **revoked** when new pair issued |
| Logout | Revokes presented refresh token |
| Reset password | Revokes **all** sessions for that user |

### Optional clarity

If refresh TTL is shorter than 30 days, tell us the exact value so we shorten the cookie `maxAge` and avoid “zombie” cookies that always fail refresh.

No new endpoints required if the above already matches your auth module.
