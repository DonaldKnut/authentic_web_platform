# AUTHENTIC

The digital identity and trust infrastructure for physical products.

This app is the official AUTHENTIC web platform: public verification, the company site, and the enterprise workspace. Product APIs are proxied to the NestJS backend.

```bash
npm install
npm run db:setup
npm run dev
```

Set `API_URL` (see `.env.example`) to the Nest API, default `http://localhost:3001/api/v1`.

Open [http://localhost:3000](http://localhost:3000).

## Product

- Public verification: `/verify` and `/verify/[code]` call `POST /api/v1/verify`
- Short QR links: `/v/[code]` also call the live public verify API
- Enterprise workspace: `/dashboard` (organization members only)

## Demo accounts

| Role | Email | Password |
| --- | --- | --- |
| Consumer | `ibrahim@authentic.ng` | `authentic` |
| Brand (Aurelia Beauty) | `ada@aurelia.ng` | `authentic` |

If your Nest seed uses different credentials, use those instead.

## API

```http
POST /api/v1/verify
```

```json
{
  "identifier": "A7X82K19",
  "source": "API"
}
```

Verification statuses include `AUTHENTICATED`, `SUSPICIOUS`, `COMPROMISED`, `RECALLED`, `EXPIRED`, `REVOKED`, `UNVERIFIED`, and `NOT_FOUND`. AUTHENTIC never returns a blunt “original.”
