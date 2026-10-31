# AUTHENTIC cookie & consent business logic

Feed this to the Nest / platform backend. Frontend already stores a first-party consent record in `localStorage` (`authentic_cookie_consent_v1`). Backend should treat that as **UI preference** until a signed server record exists for logged-in users.

---

## 1. Goals

| Goal | Rule |
| --- | --- |
| Lawful basis | Necessary cookies = contract / legitimate interest for security. Optional = **consent**. |
| Default | Opt-in for analytics & marketing. Preferences optional. Necessary always on. |
| Transparency | Categories explained in UI; link to Privacy notice. |
| Control | Accept all · Necessary only · Customize · later revoke via Cookie settings. |
| Nigeria / NDPR + GDPR-friendly | Document purpose, retention, processors; honour withdraw. |

---

## 2. Categories

| Category | Required | Examples | Purpose | Suggested TTL |
| --- | --- | --- | --- | --- |
| **necessary** | Yes | `authentic_access`, `authentic_refresh`, `authentic_org`, load-balancer sticky, CSRF | Auth session, org context, abuse protection | Align with JWT refresh (≤ 14d) |
| **preferences** | No | Theme (`authentic-theme`), locale, verify UI helpers | Remember UX choices | 365d |
| **analytics** | No | First-party event IDs, privacy-preserving page/funnel metrics | Improve verify UX & product reliability | 90–180d |
| **marketing** | No | Campaign attribution (`utm_*` → first-party cookie) | Measure paid/partner acquisition | 30–90d |

**Never** put PII (email, phone, national ID) in analytics/marketing cookies. Prefer hashed/pseudonymous IDs.

---

## 3. Frontend contract (already shipping)

```ts
type CookieConsentState = {
  version: number;      // bump when categories/policy change
  updatedAt: string;    // ISO
  necessary: true;
  preferences: boolean;
  analytics: boolean;
  marketing: boolean;
};
```

Storage key: `authentic_cookie_consent_v1`

Events:

- `authentic:cookie-consent` (CustomEvent) — detail = latest `CookieConsentState`
- Scripts/tags must **not** load until `analytics` / `marketing` are `true`

Version bump: if `version` ≠ current policy version, show banner again.

---

## 4. Recommended Nest APIs

### 4.1 Public — record anonymous consent (optional but useful)

```http
POST /api/v1/public/consent
```

```json
{
  "version": 1,
  "preferences": true,
  "analytics": false,
  "marketing": false,
  "source": "web_banner",
  "path": "/",
  "clientId": "uuid-from-first-party-cookie"
}
```

Response:

```json
{
  "id": "cns_…",
  "recordedAt": "2026-10-31T…"
}
```

Notes:

- No auth required.
- Rate-limit by IP + `clientId`.
- Store IP hash (not raw) if needed for audit; drop after 30d.

### 4.2 Authenticated — sync consent to user

```http
PUT /api/v1/me/consent
Authorization: Bearer …
```

Same body as above (minus `clientId` or keep for merge).

```http
GET /api/v1/me/consent
```

Returns last known preferences for the account (survives devices).

### 4.3 Admin / compliance export

```http
GET /api/v1/admin/consent/export?from=&to=
```

`SUPER_ADMIN` only — CSV/JSON of consent events for NDPR requests.

---

## 5. Server cookie policy (set by Nest / BFF)

| Cookie | HttpOnly | Secure (prod) | SameSite | Notes |
| --- | --- | --- | --- | --- |
| `authentic_access` | yes | yes | Lax | Short-lived access JWT |
| `authentic_refresh` | yes | yes | Lax | Refresh rotation |
| `authentic_org` | yes | yes | Lax | Selected org public id |
| `authentic_cid` | no* | yes | Lax | Stable anonymous client id for consent analytics (*readable by FE) |

\* `authentic_cid` only if analytics allowed **or** as necessary for fraud; prefer generating after consent if possible.

On logout: clear auth cookies; **do not** clear consent record unless user requests deletion.

---

## 6. Gating rules for product teams

| Feature | Gate |
| --- | --- |
| Login / verify / wallet | Always (necessary) |
| Remember theme | `preferences` |
| PostHog / Plausible / similar | `analytics === true` |
| Meta/Google ads pixels | `marketing === true` |
| WhatsApp deep-link FAB | No cookie required (direct navigation) |
| Blockchain proof UI | No marketing cookies; may log server-side verify events under necessary/security |

If consent missing: load **zero** third-party trackers.

---

## 7. Policy versioning

1. Publish `COOKIE_POLICY_VERSION` in env (integer).
2. Frontend embeds same version in `COOKIE_CONSENT_VERSION`.
3. When legal/product changes categories: bump both → banner reappears.
4. Nest rejects stale `version` on `POST /public/consent` with `400 CONSENT_VERSION_STALE`.

---

## 8. Data subject rights (backend checklist)

| Request | Behaviour |
| --- | --- |
| Access | Export consent history + cookie categories |
| Withdraw | `PUT /me/consent` all optional false; instruct FE to wipe localStorage |
| Delete | Anonymize `clientId` rows older than retention; keep security logs as allowed by law |
| Portability | JSON export of consent timestamps + choices |

---

## 9. Acceptance tests

1. Fresh visitor sees banner; no analytics network calls until Accept / Save with analytics on.
2. Necessary only → auth still works; theme may reset each session if preferences off.
3. Customize → Save → reload → banner hidden; choices restored.
4. Cookie settings → clears local consent → banner returns.
5. Logged-in user: consent syncs via `PUT /me/consent` and restores on new device after login.
6. Policy version bump → banner returns even if old localStorage present.

---

## 10. Out of scope (do not invent)

- Selling personal data
- Fingerprinting as a substitute for cookies without disclosure
- Putting JWTs in `localStorage` (keep HttpOnly cookies)
- Using blockchain / wallet connectors as tracking IDs
