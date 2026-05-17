# Architecture

## Tech Stack

| Category | Technology | Version |
|---|---|---|
| Framework | Next.js (App Router) | 16.2.6 |
| Language | TypeScript | 5 |
| UI Framework | React | 19.2.4 |
| Styling | Tailwind CSS | 4 |
| UI Primitives | @base-ui/react | 1.3.0 |
| Component CLI | shadcn | 4.1.2 |
| Database | SQLite | — |
| ORM | Prisma | 5.22.0 |
| Authentication | JWT via jose | 6.2.2 |
| Password Hashing | bcryptjs | 3.0.3 |
| Payments | Stripe | 22.1.0 |
| Icons | Lucide React | 1.7.0 |
| Toasts | Sonner | 2.0.7 |
| Test Runner | Vitest | 4.1.6 |
| DOM Testing | Testing Library | 16.3.2 |

> [!NOTE]
> `shadcn` is the CLI used to scaffold UI components. The components themselves live in `src/components/ui/` and are not a versioned runtime dependency.

---

## Project Structure

```
shopiverse/
├── .github/
│   └── workflows/
│       └── ci.yml                       # Lint, typecheck, test, build, deploy
├── prisma/
│   ├── schema.prisma                    # User, Product, Order, OrderItem
│   ├── seed.ts                          # Seed script for demo data
│   └── migrations/                      # Prisma migration history
│
├── public/                              # Static assets
│
├── src/
│   ├── app/                             # Next.js App Router
│   │   ├── api/
│   │   │   ├── auth/{login,register}/   # POST /api/auth/*
│   │   │   ├── products/[id]?/          # GET /api/products(/[id])
│   │   │   ├── orders/[id]?/            # GET, POST /api/orders, GET, PUT /api/orders/[id]
│   │   │   └── payment/                 # POST /api/payment (Stripe)
│   │   ├── admin/                       # /admin, /admin/products, /admin/orders
│   │   ├── products/                    # /products, /products/[id]
│   │   ├── cart/, checkout/, login/, register/
│   │   ├── layout.tsx, page.tsx, globals.css
│   │
│   ├── components/
│   │   ├── ui/                          # shadcn primitives (Button, Card, …)
│   │   ├── layout/                      # Navbar, Footer
│   │   └── products/                    # ProductCard
│   │
│   ├── context/
│   │   ├── AuthContext.tsx              # Global auth state and actions
│   │   └── CartContext.tsx              # Global cart state (localStorage backed)
│   │
│   └── lib/
│       ├── server/                      # Server-only modules
│       │   ├── db.ts                    # Prisma client singleton
│       │   ├── auth.ts                  # JWT sign/verify + bcrypt helpers
│       │   ├── auth-middleware.ts       # requireAuth, requireAdmin
│       │   └── stripe.ts                # Stripe client + payment intent helpers
│       ├── shared/                      # Isomorphic modules (server + client)
│       │   ├── types.ts                 # Shared TypeScript types
│       │   └── utils.ts                 # cn() and general utilities
│       └── data/
│           └── mock-data.ts             # Client-side demo data (categories, products, orders)
│
├── tests/
│   ├── api/                             # Vitest API route tests
│   ├── components/                      # React component tests
│   ├── unit/                            # Unit tests (auth helpers, utils)
│   └── setup.ts                         # Vitest setup (mocks next/navigation)
│
├── .env                                 # Local environment (not committed)
├── components.json                      # shadcn CLI config
├── eslint.config.mjs                    # Flat ESLint config
├── next.config.ts                       # Image domains, headers, env mapping
├── postcss.config.mjs                   # Tailwind v4 PostCSS plugin
├── tsconfig.json                        # Path alias @/* -> ./src/*
├── vitest.config.ts                     # Vitest + jsdom + @ alias
└── package.json
```

> [!NOTE]
> `src/lib/` is split intentionally:
>
> - **`server/`** — modules that must only run on the server (Prisma, bcrypt, Stripe secret key, JWT signing). Never imported from a `'use client'` file.
> - **`shared/`** — pure modules safe to import from either runtime.
> - **`data/`** — static demo data used by client components when wiring up the UI without the database.
