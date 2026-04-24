# Shopiverse

A production-ready full-stack e-commerce platform for developers who want to learn by building. Covers the complete shopping lifecycle — product catalog, cart, checkout, orders, and an admin dashboard — with a REST API, JWT auth, and SQLite via Prisma.

> A Next.js e-commerce template built for learning and portfolio projects.

<div align="center">

[![Next.js](https://img.shields.io/badge/Next.js-16.2-black?style=for-the-badge&logo=next.js)](https://nextjs.org)
[![React](https://img.shields.io/badge/React-19-blue?style=for-the-badge&logo=react)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript)](https://typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-38bdf8?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com)
[![shadcn/ui](https://img.shields.io/badge/shadcn%2Fui-latest-black?style=for-the-badge)](https://ui.shadcn.com)
[![Prisma](https://img.shields.io/badge/Prisma-5-2d3748?style=for-the-badge&logo=prisma)](https://prisma.io)
[![SQLite](https://img.shields.io/badge/SQLite-003b57?style=for-the-badge&logo=sqlite)](https://sqlite.org)
[![MIT License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)](LICENSE)
[![Open Issues](https://img.shields.io/github/issues/XynoxTheDev/CU-Qollabb-MCA?style=for-the-badge)](https://github.com/XynoxTheDev/CU-Qollabb-MCA/issues)
[![Last Commit](https://img.shields.io/github/last-commit/XynoxTheDev/CU-Qollabb-MCA?style=for-the-badge)](https://github.com/XynoxTheDev/CU-Qollabb-MCA/commits/main)
[![PRs Welcome](https://img.shields.io/badge/PRs-Welcome-green?style=for-the-badge)](https://github.com/XynoxTheDev/CU-Qollabb-MCA/pulls)

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

Shopiverse is a complete e-commerce platform covering product discovery, cart management, checkout, order tracking, and an admin dashboard. It uses a server-side API architecture with App Router, JWT authentication, a relational database via Prisma ORM, and a component-driven frontend with shadcn/ui. Developers looking for a well-structured Next.js portfolio project or a real-world e-commerce reference implementation will find it most useful.

### Core Capabilities

| Capability | Description |
|---|---|
| Product Catalog | Browse 20+ products across 4 categories with filtering and search |
| Shopping Cart | Add, remove, and adjust quantities with persistent state |
| Checkout | Complete orders with shipping details and payment selection |
| Authentication | JWT-based registration and login with bcrypt password hashing |
| Admin Dashboard | Full CRUD for products and orders with status management |
| REST API | Authenticated backend API for all core resources |

---

## Tech Stack

| Category | Technology | Version |
|---|---|---|
| Framework | Next.js (App Router) | 16.2 |
| Language | TypeScript | 5 |
| UI Framework | React | 19 |
| Styling | Tailwind CSS | 4 |
| UI Components | shadcn/ui | Latest |
| Database | SQLite | — |
| ORM | Prisma | 5 |
| Authentication | JWT via jose | 6 |
| Password Hashing | bcryptjs | 3 |
| Icons | Lucide React | Latest |
| Notifications | Sonner | Latest |

---

## Features

### Customer-Facing

| Feature | Description |
|---|---|
| Home Page | Hero banner, category navigation, featured products, and promotional sections |
| Product Listing | Grid layout with category filters, price range, and keyword search |
| Product Detail | Image gallery, product info, ratings, quantity selector, and add-to-cart |
| Shopping Cart | Line items with quantity adjustment, removal, and live order summary |
| Checkout | Shipping address form, payment method selection, and order confirmation |
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
| REST API | Full CRUD operations for products and orders |
| JWT Authentication | Token-based auth with 7-day expiry |
| Password Security | Passwords stored as bcrypt hashes |
| Relational Database | SQLite managed through Prisma ORM with migrations |

---

## Project Structure

```
shopiverse/
├── prisma/
│   ├── schema.prisma          # Database schema (User, Product, Order, OrderItem)
│   ├── seed.ts                # Seed script for demo data
│   ├── dev.db                 # SQLite database file
│   └── migrations/            # Prisma migration history
│
├── src/
│   ├── app/                   # Next.js App Router
│   │   ├── api/               # API route handlers
│   │   │   ├── auth/
│   │   │   │   ├── login/     # POST /api/auth/login
│   │   │   │   └── register/  # POST /api/auth/register
│   │   │   ├── products/      # GET, POST /api/products
│   │   │   │   └── [id]/      # GET /api/products/[id]
│   │   │   └── orders/        # GET, POST /api/orders
│   │   │       └── [id]/      # GET, PUT /api/orders/[id]
│   │   ├── layout.tsx         # Root layout
│   │   ├── page.tsx           # Home page
│   │   ├── products/          # Product listing and detail pages
│   │   ├── cart/              # Shopping cart page
│   │   ├── checkout/          # Checkout page
│   │   ├── login/             # Login page
│   │   ├── register/          # Registration page
│   │   └── admin/             # Admin dashboard, products, orders
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

### Authentication Header

All protected endpoints require the following header:

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
| `/checkout` | Checkout form with shipping and payment input |
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

> [!NOTE] After running `npm run dev`, open [http://localhost:3000](http://localhost:3000) in your browser. The page is up when the Shopiverse navbar and hero banner are visible.

### Prerequisites

- Node.js 18.x or later
- npm 9.x or later

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

3. Configure environment variables — see [Environment Variables](#environment-variables).

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

6. Open [http://localhost:3000](http://localhost:3000) in your browser.

> [!NOTE] The Shopiverse navbar and hero banner indicate the dev server is running correctly.

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
```

> [!WARNING] Never commit `.env` to version control. It is already listed in `.gitignore`.

---

## Database

### Schema

| Model | Key Fields |
|---|---|
| `User` | `id`, `email`, `name`, `password` (hashed), `role`, `avatar`, `createdAt` |
| `Product` | `id`, `name`, `description`, `price`, `originalPrice`, `image`, `images`, `category`, `rating`, `reviewCount`, `stock` |
| `Order` | `id`, `userId`, `total`, `status`, `shippingAddress`, `paymentMethod`, `createdAt` |
| `OrderItem` | `id`, `orderId`, `productId`, `quantity`, `price` (cascade delete on order) |

### Seed Data

Running `npx tsx prisma/seed.ts` populates the database with:

- 2 user accounts (one customer, one admin)
- 20 products spread across 4 categories

---

## Demo Accounts

| Role | Email | Password |
|---|---|---|
| Customer | `john@example.com` | `password123` |
| Admin | `admin@example.com` | `admin123` |

> These credentials are for local development and demonstration only.

---

## Contributing

Contributions are welcome. To get your PR merged without back-and-forth:

1. **Fork** the repository.
2. **Clone** your fork locally.
3. **Create a branch** using Conventional Commits naming:
   ```bash
   git checkout -b feature/your-feature
   # or
   git checkout -b fix/your-fix
   ```
4. **Commit** using Conventional Commits format (`feat:`, `fix:`, `docs:`, etc.).
5. **Run checks** before pushing:
   ```bash
   npm run lint
   npm run build
   ```
6. **Open a PR** against `main`.

> [!NOTE] Issues and feature requests are tracked via [GitHub Issues](https://github.com/XynoxTheDev/CU-Qollabb-MCA/issues).

---

## License

This project is licensed under the **MIT License**. See [LICENSE](LICENSE) for the full text.

```
SPDX-License-Identifier: MIT
```

---

## Development Roadmap

| Phase | Status | Scope |
|---|---|---|
| Phase 1 — Frontend | Completed | All pages, components, and styling |
| Phase 2 — Backend | Completed | REST API, SQLite/Prisma, JWT authentication |
| Phase 3 — Payments | Planned | Stripe or PayPal integration |
| Phase 4 — Advanced Features | Planned | User profiles, product reviews, order tracking |
| Phase 5 — Testing and Deployment | Planned | Unit/integration tests, CI/CD pipeline, production hosting |

---

<div align="center">

**Built with Next.js · Tailwind CSS · Prisma · SQLite**

A portfolio project for the MCA program at [Chandigarh University](https://www.cuchd.in/).

</div>