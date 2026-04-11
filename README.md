# Shopiverse — E-Commerce Platform

A full-stack e-commerce web application built with Next.js, TypeScript, Tailwind CSS, shadcn/ui, and a REST API backed by SQLite and Prisma ORM. Developed as a portfolio project for the MCA program at Chandigarh University.

<div align="center">

![Next.js](https://img.shields.io/badge/Next.js-16-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.5-blue?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-38bdf8?style=for-the-badge&logo=tailwind-css)
![shadcn/ui](https://img.shields.io/badge/shadcn%2Fui-latest-black?style=for-the-badge)
![Prisma](https://img.shields.io/badge/Prisma-5-2d3748?style=for-the-badge&logo=prisma)
![SQLite](https://img.shields.io/badge/SQLite-003b57?style=for-the-badge&logo=sqlite)

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
11. [Development Roadmap](#development-roadmap)

---

## Overview

Shopiverse is a comprehensive e-commerce platform that covers the complete shopping lifecycle — product discovery, cart management, checkout, order tracking, and an admin dashboard for store management. It is built with a production-oriented architecture: server-side API routes, JWT-based authentication, a relational database via Prisma ORM, and a component-driven frontend using shadcn/ui.

### Core Capabilities

| Capability | Description |
|---|---|
| Product Catalog | Browse 20+ products across 4 categories with filtering and search |
| Shopping Cart | Add, remove, and adjust item quantities with persistent cart state |
| Checkout | Complete orders with shipping details and payment method selection |
| Authentication | JWT-based user registration and login with bcrypt password hashing |
| Admin Dashboard | Full CRUD for products and orders with status management |
| REST API | Authenticated backend API for all core resources |

---

## Tech Stack

| Category | Technology | Version |
|---|---|---|
| Framework | Next.js (App Router) | 16.x |
| Language | TypeScript | 5.5 |
| Styling | Tailwind CSS | 4.x |
| UI Components | shadcn/ui | Latest |
| Database | SQLite | — |
| ORM | Prisma | 5.x |
| Authentication | JWT via jose | 6.x |
| Password Hashing | bcryptjs | 3.x |
| Icons | Lucide React | Latest |
| Notifications | Sonner | Latest |

---

## Features

### Customer-Facing

| Feature | Description |
|---|---|
| Home Page | Hero banner, category navigation, featured products, and promotional sections |
| Product Listing | Grid layout with category filters, price range filter, and keyword search |
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

3. Configure environment variables (see [Environment Variables](#environment-variables)).

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

### Production Build

```bash
npm run build
npm start
```

---

## Environment Variables

Create a `.env` file in the project root with the following variables:

```env
# Database connection
DATABASE_URL="file:./prisma/dev.db"

# JWT signing secret — use a strong random value in production
JWT_SECRET="your-secret-key-change-in-production"
```

> **Note:** Never commit the `.env` file to version control. The `.gitignore` already excludes it.

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

Built with Next.js · Tailwind CSS · Prisma · SQLite

</div>
