# MediGuard Frontend

The frontend is a Next.js application that delivers the MediGuard product experience: landing page, authentication flow, operational dashboards, and reliability-focused views for equipment, maintenance, predictions, and analytics.

## Stack

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS 4
- Framer Motion

## Development

From this directory:

```bash
npm install
npm run dev
```

The app runs on `http://localhost:3000` by default.

## Environment

The frontend reads:

```bash
NEXT_PUBLIC_API_URL=http://localhost:8080/api/v1
```

Set this in your root `.env` or frontend-specific environment file when pointing at a different backend.

## Quality Checks

```bash
npm run lint
npm run build
```

## Key Areas

- `app/`: routes, layouts, and page-level UI
- `components/`: reusable interface building blocks
- `context/`: authentication state
- `lib/`: API helpers and shared utilities

## Notes

- The UI is optimized for a demo-friendly, product-style presentation.
- The frontend expects the backend API to be available before authenticated dashboards are exercised.
