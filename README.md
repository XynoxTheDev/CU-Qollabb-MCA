# Shopiverse

A full-stack e-commerce reference app built with Next.js 16, Prisma, and Stripe.

<div align="center">

[![Next.js](https://img.shields.io/badge/Next.js-16.2.6-brightgreen?style=flat&logo=next.js&logoColor=white)](https://nextjs.org)
[![License](https://img.shields.io/badge/License-MIT-yellow?style=flat)](LICENSE)
[![PRs Welcome](https://img.shields.io/badge/PRs-Welcome-brightgreen?style=flat)](https://github.com/XynoxTheDev/CU-Qollabb-MCA/pulls)

</div>

Shopiverse covers the full shopping lifecycle — product catalog, cart, Stripe-powered checkout, order management, and an admin dashboard — in a single Next.js App Router project. It is a practical reference for how API routes, JWT auth, Prisma, and Stripe fit together.

**Stack:** Next.js 16 (App Router) · TypeScript · React 19 · Prisma + SQLite · Stripe · Tailwind CSS v4 · JWT (jose) · Vitest.

---

## Quick Start

```bash
git clone https://github.com/XynoxTheDev/CU-Qollabb-MCA.git
cd CU-Qollabb-MCA
npm install
npx prisma migrate dev
npx tsx prisma/seed.ts
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

> [!NOTE]
> Create a `.env` file in the project root before starting — see [Environment Variables](#environment-variables).

> [!NOTE]
> `npm install` runs `prisma generate` automatically via the `postinstall` script.

### Prerequisites

- Node.js **20.x or later**
- npm 9.x or later
- A Stripe account (free) — test keys are sufficient

### Production build

```bash
npm run build
npm start
```

---

## Environment Variables

Copy [`.env.example`](.env.example) to `.env`:

```env
DATABASE_URL="file:./prisma/dev.db"
JWT_SECRET="change-me-to-a-long-random-string"
STRIPE_SECRET_KEY="sk_test_..."
STRIPE_PUBLISHABLE_KEY="pk_test_..."
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_test_..."
```

> [!WARNING]
> Never commit `.env`. It is already in `.gitignore`.

> [!NOTE]
> Stripe keys are optional for local development — all features except checkout work without them. Get free test keys from the [Stripe Dashboard](https://dashboard.stripe.com/test/apikeys).

---

## Demo Accounts

| Role | Email | Password |
|---|---|---|
| Customer | `john@example.com` | `password123` |
| Admin | `admin@example.com` | `admin123` |

> [!WARNING]
> These credentials are for local development only. Change all secrets before any public deployment.

---

## Documentation

- [API reference](docs/API.md) — endpoints, query parameters, page routes
- [Architecture](docs/ARCHITECTURE.md) — project layout and tech stack
- [Database](docs/DATABASE.md) — Prisma schema and seed
- [Development](docs/DEVELOPMENT.md) — scripts, testing, CI

---

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md).

## License

MIT — see [LICENSE](LICENSE).

---

<div align="center">

A portfolio project for the MCA program at [Chandigarh University](https://www.cuchd.in/).

</div>
