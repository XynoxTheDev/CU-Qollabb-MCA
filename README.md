# Shopiverse

**A full-stack e-commerce reference app built with Next.js 16, Prisma, and Stripe.**

Shopiverse covers the complete shopping lifecycle — product catalog, cart, Stripe-powered checkout, order management, and an admin dashboard. It is built for developers who want a well-structured, production-patterned Next.js App Router codebase they can run locally, learn from, and extend.

<div align="center">

[![Next.js](https://img.shields.io/badge/Next.js-16.2.6-brightgreen?style=flat&logo=next.js&logoColor=white)](https://nextjs.org)
[![React](https://img.shields.io/badge/React-19.2.4-brightgreen?style=flat&logo=react&logoColor=white)](https://react.dev)
[![Prisma](https://img.shields.io/badge/Prisma-5.22.0-brightgreen?style=flat&logo=prisma&logoColor=white)](https://prisma.io)
[![Stripe](https://img.shields.io/badge/Stripe-22.1.0-brightgreen?style=flat&logo=stripe&logoColor=white)](https://stripe.com)
[![License](https://img.shields.io/badge/License-MIT-yellow?style=flat)](LICENSE)
[![Last Commit](https://img.shields.io/github/last-commit/XynoxTheDev/CU-Qollabb-MCA?style=flat)](https://github.com/XynoxTheDev/CU-Qollabb-MCA/commits/main)
[![PRs Welcome](https://img.shields.io/badge/PRs-Welcome-brightgreen?style=flat)](https://github.com/XynoxTheDev/CU-Qollabb-MCA/pulls)

</div>

---

## Table of Contents

1. [Overview](#overview)
2. [Tech Stack](#tech-stack)
3. [Features](#features)
4. [Project Structure](#project-structure)
5. [API Reference](#api-reference)
6. [Pages and Routes](#pages-and-routes)
7. [Getting Started](#getting-started)
8. [Environment Variables](#environment-variables)
9. [Database](#database)
10. [Scripts](#scripts)
11. [Testing](#testing)
12. [Continuous Integration](#continuous-integration)
13. [Demo Accounts](#demo-accounts)
14. [Contributing](#contributing)
15. [License](#license)

---

## Overview

Shopiverse is a full-stack e-commerce application built on the Next.js App Router. It provides a server-side REST API, JWT-based authentication, a relational SQLite database through Prisma ORM, and Stripe-powered checkout — all wired together in a single Next.js project. The codebase separates server concerns (API routes, auth, ORM) from shared and client concerns through an explicit `src/lib/{server,shared,data}` split, making it a practical reference for how these pieces fit together.

### Core Capabilities

| Capability | Description |
|---|---|
| Product Catalog | Browse 19 demo products across 4 categories with filtering by category, keyword, price range, and sort order |
| Shopping Cart | Add, remove, and adjust quantities with `localStorage` persistence |
| Checkout | Stripe-powered checkout with shipping address collection and order persistence |
| Authentication | JWT-based registration and login with bcrypt password hashing |
| Admin Dashboard | Revenue summary, order management with status updates, and product add/delete |
| REST API | Full backend API for all core resources with JWT auth enforcement |

---

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
> `shadcn` is the CLI used to scaffold UI components. The components themselves live in `src/components/ui/` and are not a versioned dependency.

---

## Features

### Customer-Facing

| Feature | Description |
|---|---|
| Home Page | Hero banner, category navigation, featured products, and promotional sections |
| Product Listing | Grid layout with category filters, price range, and keyword search |
| Product Detail | Image gallery, product info, ratings, quantity selector, and add-to-cart |
| Shopping Cart | Line items with quantity adjustment, removal, and live order summary |
| Checkout | Shipping address form, Stripe payment, and order confirmation |
| User Accounts | Registration and login with secure JWT sessions |

### Admin Panel

| Feature | Description |
|---|---|
| Dashboard | Summary statistics for revenue, orders, and products with a recent orders table |
| Product Management | View, add, and delete products |
| Order Management | View all orders, filter by status, and update order status |

### Backend / API

| Feature | Description |
|---|---|
| REST API | CRUD endpoints for products and orders |
| JWT Authentication | Token-based auth with 7-day expiry |
| Password Security | Passwords stored as bcrypt hashes |
| Stripe Payments | Payment intent creation with stock validation and order persistence |
| Relational Database | SQLite managed through Prisma ORM with migrations |

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

---

## API Reference

### Authentication

| Method | Endpoint | Description | Auth Required |
|---|---|---|---|
| POST | `/api/auth/register` | Register a new user account | No |
| POST | `/api/auth/login` | Authenticate and receive a JWT | No |

### Products

| Method | Endpoint | Description | Auth Required |
|---|---|---|---|
| GET | `/api/products` | Retrieve all products (supports filters) | No |
| GET | `/api/products/[id]` | Retrieve a single product by ID | No |

### Orders

| Method | Endpoint | Description | Auth Required |
|---|---|---|---|
| GET | `/api/orders` | Retrieve the authenticated user's orders | Yes |
| POST | `/api/orders` | Create a new order | Yes |
| GET | `/api/orders/[id]` | Retrieve a specific order by ID | Yes |
| PUT | `/api/orders/[id]` | Update order status | Admin only |

### Payment

| Method | Endpoint | Description | Auth Required |
|---|---|---|---|
| POST | `/api/payment` | Create a Stripe payment intent and persist the order | Yes |

### Authentication Header

All protected endpoints require:

```http
Authorization: Bearer <jwt_token>
```

### Query Parameters — `GET /api/products`

| Parameter | Type | Description |
|---|---|---|
| `category` | string | Filter by product category |
| `search` | string | Keyword search on name and description |
| `minPrice` | number | Minimum price filter |
| `maxPrice` | number | Maximum price filter |
| `sort` | string | Sort order: `price_asc`, `price_desc`, `rating` |

---

## Pages and Routes

### Customer Pages

| Route | Description |
|---|---|
| `/` | Landing page with hero banner, category cards, and featured products |
| `/products` | Full product catalog with filtering and search |
| `/products/[id]` | Product detail with image gallery and add-to-cart |
| `/cart` | Shopping cart with quantity management and order summary |
| `/checkout` | Shipping address form, Stripe payment, and order confirmation |
| `/login` | User login |
| `/register` | New user registration |

### Admin Pages

| Route | Description |
|---|---|
| `/admin` | Dashboard with statistics and recent orders |
| `/admin/products` | Product listing with add and delete |
| `/admin/orders` | Order listing with status update controls |

---

## Getting Started

### Quick Start

```bash
git clone https://github.com/XynoxTheDev/CU-Qollabb-MCA.git
cd CU-Qollabb-MCA
npm install
npx prisma migrate dev
npx tsx prisma/seed.ts
npm run dev
```

> [!NOTE]
> Before starting, create a `.env` file in the project root — see [Environment Variables](#environment-variables). Then open [http://localhost:3000](http://localhost:3000). The app is running when the Shopiverse navbar and hero banner are visible.

> [!NOTE]
> `npm install` automatically runs `prisma generate` (via the `postinstall` script), so a separate `prisma generate` call isn't required.

### Prerequisites

- Node.js **20.x or later** (Node 18 is deprecated and is not supported by Next.js 16)
- npm 9.x or later
- A Stripe account (free) for payment functionality — test keys are sufficient

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/XynoxTheDev/CU-Qollabb-MCA.git
   cd CU-Qollabb-MCA
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file in the project root — see [Environment Variables](#environment-variables).

4. Run database migrations and seed:

   ```bash
   npx prisma migrate dev
   npx tsx prisma/seed.ts
   ```

5. Start the development server:

   ```bash
   npm run dev
   ```

6. Open [http://localhost:3000](http://localhost:3000).

> [!NOTE]
> Admin routes require a user with `role: "admin"`. The seed script creates an admin account automatically — see [Demo Accounts](#demo-accounts).

### Production Build

```bash
npm run build
npm start
```

---

## Environment Variables

Create a `.env` file in the project root:

```env
DATABASE_URL="file:./prisma/dev.db"
JWT_SECRET="your-secret-key-change-in-production"
STRIPE_SECRET_KEY="sk_test_..."
STRIPE_PUBLISHABLE_KEY="pk_test_..."
```

> [!WARNING]
> Never commit `.env` to version control. It is already listed in `.gitignore`.

> [!NOTE]
> `next.config.ts` exposes `STRIPE_PUBLISHABLE_KEY` to the browser as `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`. You only need to set `STRIPE_PUBLISHABLE_KEY` (without the `NEXT_PUBLIC_` prefix) — the mapping happens at build time.

> [!NOTE]
> Stripe keys are optional for local development — all features except checkout work without them. Get free test keys from the [Stripe Dashboard](https://dashboard.stripe.com/test/apikeys).

---

## Database

### Engine

SQLite, driven by Prisma ORM. The database file lives at `prisma/dev.db` and is gitignored.

### Schema

| Model | Key Fields |
|---|---|
| `User` | `id`, `email`, `name`, `password` (bcrypt hash), `role` (default: `customer`), `avatar`, `createdAt`, `updatedAt` |
| `Product` | `id`, `name`, `description`, `price`, `originalPrice`, `image`, `images`, `category`, `rating`, `reviewCount`, `stock`, `createdAt`, `updatedAt` |
| `Order` | `id`, `userId`, `total`, `status` (default: `pending`), `shippingAddress`, `paymentMethod`, `createdAt`, `updatedAt` |
| `OrderItem` | `id`, `orderId`, `productId`, `quantity`, `price` — cascade deletes with parent order |

### Seed Data

```bash
npx tsx prisma/seed.ts
```

Populates the database with 2 demo accounts and 19 products across 4 categories.

---

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

---

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

---

## Continuous Integration

`.github/workflows/ci.yml` runs on every push and pull request to `main`. Jobs run in sequence:

1. **lint-and-typecheck** — `npm run lint`, then `npx tsc --noEmit`
2. **test** — `npm run test:coverage` with test-only env, uploads coverage artifact and (optionally) reports to Codecov
3. **build** — `npm run build`
4. **deploy** — only on push to `main`: `vercel pull → vercel build --prod → vercel deploy --prebuilt --prod` (requires `VERCEL_TOKEN`)

All jobs run on Node 20.

---

## Demo Accounts

| Role | Email | Password |
|---|---|---|
| Customer | `john@example.com` | `password123` |
| Admin | `admin@example.com` | `admin123` |

> [!WARNING]
> These credentials are for local development only. Change all secrets before any public deployment.

---

## Contributing

Contributions are welcome. To get your PR merged without back-and-forth:

1. **Fork** the repository and clone your fork locally.
2. **Create a branch** using Conventional Commits naming:
   ```bash
   git checkout -b feature/your-feature
   # or
   git checkout -b fix/your-fix
   ```
3. **Commit** using Conventional Commits format (`feat:`, `fix:`, `docs:`, `refactor:`, `test:`, `chore:`, etc.).
4. **Run checks** before pushing:
   ```bash
   npm run lint
   npx tsc --noEmit
   npm run test:run
   npm run build
   ```
5. **Open a PR** against `main` with a clear description of what changed and why.

> [!NOTE]
> Issues and feature requests are tracked via [GitHub Issues](https://github.com/XynoxTheDev/CU-Qollabb-MCA/issues).

---

## License

Licensed under the **MIT License** — see [LICENSE](LICENSE) for the full text.

```
SPDX-License-Identifier: MIT
```

---

<div align="center">

Built with [Next.js](https://nextjs.org) · [Tailwind CSS](https://tailwindcss.com) · [Prisma](https://prisma.io) · [Stripe](https://stripe.com)

A portfolio project for the MCA program at [Chandigarh University](https://www.cuchd.in/).

</div>
