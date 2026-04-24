# Shopiverse

**A full-stack e-commerce reference app built with Next.js 16, Prisma, and Stripe.**

Shopiverse covers the complete shopping lifecycle — product catalog, cart, Stripe-powered checkout, order management, and an admin dashboard. It is built for developers who want a well-structured, production-patterned Next.js App Router codebase they can run locally, learn from, and extend.

<div align="center">

[![Next.js](https://img.shields.io/badge/Next.js-16.2.2-brightgreen?style=flat&logo=next.js&logoColor=white)](https://nextjs.org)
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
10. [Demo Accounts](#demo-accounts)
11. [Contributing](#contributing)
12. [License](#license)
13. [Development Roadmap](#development-roadmap)

---

## Overview

Shopiverse is a full-stack e-commerce application built on the Next.js App Router. It provides a server-side REST API, JWT-based authentication, a relational SQLite database through Prisma ORM, and Stripe-powered checkout — all wired together in a single Next.js project. The architecture separates server concerns (API routes, auth middleware, ORM) from client concerns (React context, shadcn/ui component library), making it a practical reference for how these pieces fit together. Developers who want a real-world App Router codebase — complete with auth, payments, and an admin panel — will find the most value here.

### Core Capabilities

| Capability | Description |
|---|---|
| Product Catalog | Browse 20+ products across 4 categories with filtering by category, keyword, price range, and sort order |
| Shopping Cart | Add, remove, and adjust quantities with client-side persistent state |
| Checkout | Stripe-powered embedded checkout with shipping address collection and order persistence |
| Authentication | JWT-based registration and login with bcrypt password hashing |
| Admin Dashboard | Revenue summary, order management with status updates, and product CRUD |
| REST API | Full backend API for all core resources with JWT auth enforcement |

---

## Tech Stack

| Category | Technology | Version |
|---|---|---|
| Framework | Next.js (App Router) | 16.2.2 |
| Language | TypeScript | 5 |
| UI Framework | React | 19.2.4 |
| Styling | Tailwind CSS | 4 |
| UI Components | shadcn/ui | 4.1.2 |
| Database | SQLite | — |
| ORM | Prisma | 5.22.0 |
| Authentication | JWT via jose | 6.2.2 |
| Password Hashing | bcryptjs | 3.0.3 |
| Payments | Stripe | 22.1.0 |
| Icons | Lucide React | 1.7.0 |
| Notifications | Sonner | 2.0.7 |

---

## Features

### Customer-Facing

| Feature | Description |
|---|---|
| Home Page | Hero banner, category navigation, featured products, and promotional sections |
| Product Listing | Grid layout with category filters, price range, and keyword search |
| Product Detail | Image gallery, product info, ratings, quantity selector, and add-to-cart |
| Shopping Cart | Line items with quantity adjustment, removal, and live order summary |
| Checkout | Stripe embedded checkout with shipping address and payment confirmation |
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
| REST API | Full CRUD for products and orders |
| JWT Authentication | Token-based auth with 7-day expiry |
| Password Security | Passwords stored as bcrypt hashes |
| Stripe Payments | Payment intent creation with stock validation and order persistence |
| Relational Database | SQLite managed through Prisma ORM with migrations |

---

## Project Structure

```
shopiverse/
├── prisma/
│   ├── schema.prisma          # Database schema (User, Product, Order, OrderItem)
│   ├── seed.ts                # Seed script for demo data
│   └── migrations/            # Prisma migration history
│
├── src/
│   ├── app/                   # Next.js App Router
│   │   ├── api/
│   │   │   ├── auth/
│   │   │   │   ├── login/     # POST /api/auth/login
│   │   │   │   └── register/  # POST /api/auth/register
│   │   │   ├── products/      # GET /api/products
│   │   │   │   └── [id]/      # GET /api/products/[id]
│   │   │   ├── orders/        # GET, POST /api/orders
│   │   │   │   └── [id]/      # GET, PUT /api/orders/[id]
│   │   │   └── payment/       # POST /api/payment (Stripe)
│   │   ├── layout.tsx
│   │   ├── page.tsx           # Home page
│   │   ├── products/
│   │   ├── cart/
│   │   ├── checkout/
│   │   ├── login/
│   │   ├── register/
│   │   └── admin/             # Dashboard, products, orders
│   │
│   ├── components/
│   │   ├── ui/                # shadcn/ui primitive components
│   │   ├── layout/
│   │   │   ├── Navbar.tsx
│   │   │   └── Footer.tsx
│   │   └── products/
│   │       └── ProductCard.tsx
│   │
│   ├── context/
│   │   ├── AuthContext.tsx    # Global auth state and actions
│   │   └── CartContext.tsx    # Global cart state and actions
│   │
│   └── lib/
│       ├── db.ts              # Prisma client instance
│       ├── auth.ts            # JWT sign and verify utilities
│       ├── authMiddleware.ts  # Route-level auth enforcement
│       ├── stripe.ts          # Stripe client and payment intent helpers
│       ├── types.ts           # Shared TypeScript types
│       └── utils.ts           # General utility functions
│
├── .env                       # Environment variables (not committed)
├── next.config.ts
├── tailwind.config.ts
├── tsconfig.json
└── package.json
```

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
| `/checkout` | Stripe embedded checkout with shipping and payment |
| `/login` | User login |
| `/register` | New user registration |

### Admin Pages

| Route | Description |
|---|---|
| `/admin` | Dashboard with statistics and recent orders |
| `/admin/products` | Product listing and management |
| `/admin/orders` | Order listing with status update controls |

---

## Getting Started

### Quick Start

```bash
git clone https://github.com/XynoxTheDev/CU-Qollabb-MCA.git
cd CU-Qollabb-MCA
npm install
npx prisma generate && npx prisma migrate dev && npx tsx prisma/seed.ts
npm run dev
```

> [!NOTE]
> Before starting, create a `.env` file in the project root — see [Environment Variables](#environment-variables). Then open [http://localhost:3000](http://localhost:3000). The app is running when the Shopiverse navbar and hero banner are visible.

### Prerequisites

- Node.js 18.x or later
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

4. Set up the database:

   ```bash
   npx prisma generate
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
> Stripe keys are optional for local development — all features except checkout will work without them. Get free test keys from the [Stripe Dashboard](https://dashboard.stripe.com/test/apikeys).

---

## Database

### Schema

| Model | Key Fields |
|---|---|
| `User` | `id`, `email`, `name`, `password` (bcrypt hash), `role` (default: `customer`), `avatar`, `createdAt` |
| `Product` | `id`, `name`, `description`, `price`, `originalPrice`, `image`, `images`, `category`, `rating`, `reviewCount`, `stock` |
| `Order` | `id`, `userId`, `total`, `status` (default: `pending`), `shippingAddress`, `paymentMethod`, `createdAt` |
| `OrderItem` | `id`, `orderId`, `productId`, `quantity`, `price` — cascade deletes with parent order |

### Seed Data

```bash
npx tsx prisma/seed.ts
```

Populates the database with 2 demo accounts and 20 products across 4 categories.

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

## Development Roadmap

| Phase | Status | Scope |
|---|---|---|
| Phase 1 — Frontend | Completed | All pages, components, and styling |
| Phase 2 — Backend | Completed | REST API, SQLite/Prisma, JWT authentication |
| Phase 3 — Payments | Completed | Stripe embedded checkout and payment intent API |
| Phase 4 — Advanced Features | Planned | User profiles, product reviews, order tracking |
| Phase 5 — Testing and Deployment | Planned | Unit/integration tests, CI/CD pipeline, production hosting |

---

<div align="center">

Built with [Next.js](https://nextjs.org) · [Tailwind CSS](https://tailwindcss.com) · [Prisma](https://prisma.io) · [Stripe](https://stripe.com)

A portfolio project for the MCA program at [Chandigarh University](https://www.cuchd.in/).

</div>
