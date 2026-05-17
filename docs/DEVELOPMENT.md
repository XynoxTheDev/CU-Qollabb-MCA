# Development

## Scripts

| Command | Purpose |
|---|---|
| `npm run dev` | Start the Next.js dev server on port 3000 |
| `npm run build` | Production build |
| `npm start` | Run the production build |
| `npm run lint` | Run ESLint with the flat config |
| `npm test` | Vitest in watch mode |
| `npm run test:run` | Vitest single run |
| `npm run test:coverage` | Vitest with v8 coverage reporter |

> [!NOTE]
> `npm install` automatically runs `prisma generate` (via the `postinstall` script).

## Testing

Vitest with jsdom is the test runner. Tests live in `tests/` and are split into:

- `tests/unit/` — pure-function unit tests (e.g. `auth.ts` helpers, `utils.ts`)
- `tests/api/` — API route handler tests using `next-test-api-route-handler` with mocked Prisma
- `tests/components/` — React component tests with Testing Library

`tests/setup.ts` mocks `next/navigation` globally and sets fixed test-only env vars (`JWT_SECRET`, `STRIPE_SECRET_KEY`, `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`, `DATABASE_URL`).

Run all tests once:

```bash
npm run test:run
```

Generate a coverage report (HTML written to `coverage/`):

```bash
npm run test:coverage
```

## Continuous Integration

CI runs on every push and pull request to `main`. The pipeline lints, typechecks, tests, builds, and (on `main`) deploys to Vercel. See [`.github/workflows/ci.yml`](../.github/workflows/ci.yml) for the authoritative definition.

All jobs run on Node 20.
