# AL-Amine.io — Internal AI Employee (Starter)

This is a separate backend starter. It does **not** modify your existing GitHub Pages website and does not yet perform AI work, create deliverables, accept payments, or contact customers.

## Privacy and access design

- No public chatbot route is provided.
- `/internal/ai/tasks` requires a bearer token kept in the backend `.env`.
- Unknown or missing private credentials receive a generic 404.
- Helmet security headers, request-size limits, rate limiting, strict input validation, and generic error responses are included.
- Do not put secrets in website JavaScript or commit `.env`.

**Important:** The bearer-token guard is a temporary development scaffold. Before production, replace it with proper owner/staff authentication, role-based authorization, token rotation, audit logging, and secure secret management. Never embed the internal token in the public website.

## Requirements

- Node.js 20 or newer
- npm

## Run locally

1. Extract this folder.
2. Open a terminal in this folder.
3. Run `npm install`.
4. Copy `.env.example` to `.env`.
5. Set `INTERNAL_API_TOKEN` to a random secret of at least 32 characters.
6. Run `npm test`.
7. Run `npm run dev`.
8. Open `http://localhost:3000/health`.

Expected health response:
`{"ok":true,"service":"al-amine-internal-ai","stage":"starter"}`

## Private route smoke test

Do not expose this route to the public site yet. In a terminal, set your local token and call:

```sh
curl -X POST http://localhost:3000/internal/ai/tasks \
  -H "Authorization: Bearer YOUR_LOCAL_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"taskType":"review_order","orderId":"TEST-001","instructions":"Review this test order and list missing requirements."}'
```

It should return HTTP 501 for now because task execution has intentionally not been implemented. Without a correct token, it should return HTTP 404.

## Planned implementation order

1. Owner/staff login, roles, audit logs, secret management.
2. Database schema for customers, orders, task state, payments, and deliverables.
3. AI provider integration with strict tool permissions.
4. Real DOCX/PDF/PPTX and QR-code generation with validation.
5. Private file storage, malware scanning, access-controlled previews, expiry/deletion policy.
6. Order notifications and 10-minute eligible-order scheduler with idempotency and owner override.
7. Payment-provider server-side webhook verification; never trust screenshots or browser claims.
8. WhatsApp Business integration and phone receptionist provider, with human escalation and any required disclosure.
9. Automated unit, integration, security, and end-to-end tests.
10. Staging deployment and manual acceptance tests before any live-site connection.

## Safety rules for the AI employee

- Follow customer instructions; ask clarifying questions when important details are missing.
- Do not silently change a customer's requested design or content.
- Generate previews separately from final deliverables.
- Never release final files until the payment provider confirms payment server-side.
- Escalate unclear, unusual, expensive, or risky orders to the owner.
- For passport-photo edits, preserve the person's face and other original details; if accurate background-only editing is not possible, stop and request human help.
- Do not impersonate a human receptionist. Where required by law or provider policy, disclose automated assistance.
