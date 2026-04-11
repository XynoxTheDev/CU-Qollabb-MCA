# 🛒 Shopiverse - E-Commerce Platform

A modern, full-stack e-commerce web application built with Next.js, Tailwind CSS, shadcn/ui, and integrated backend with SQLite + Prisma.

<div align="center">

![Next.js](https://img.shields.io/badge/Next.js-16-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.5-blue?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-38bdf8?style=for-the-badge&logo=tailwind-css)
![shadcn/ui](https://img.shields.io/badge/shadcn/ui-latest-black?style=for-the-badge)
![Prisma](https://img.shields.io/badge/Prisma-5-2d3748?style=for-the-badge&logo=prisma)
![SQLite](https://img.shields.io/badge/SQLite-003b57?style=for-the-badge&logo=sqlite)

</div>

---

## 📚 Table of Contents

1. [Project Overview](#-project-overview)
2. [Tech Stack](#-tech-stack)
3. [Features](#-features)
4. [Project Structure](#-project-structure)
5. [API Endpoints](#-api-endpoints)
6. [Pages & Routes](#-pages--routes)
7. [Getting Started](#-getting-started)
8. [Environment Variables](#-environment-variables)
9. [Demo Accounts](#-demo-accounts)
10. [Database](#-database)
11. [Development Progress](#-development-progress)

---

## 📋 Project Overview

**Shopiverse** is a comprehensive e-commerce platform developed as a portfolio project for the MCA program. It provides a complete shopping experience with product browsing, cart management, checkout process, user authentication, and a full backend API.

### Key Capabilities

| Capability | Description |
|------------|-------------|
| 🛍️ **Product Catalog** | Browse 20+ products across 4 categories with advanced filtering |
| 🛒 **Shopping Cart** | Add/remove items, adjust quantities, persistent cart |
| 💳 **Checkout** | Complete order with shipping info and payment selection |
| 👤 **Authentication** | JWT-based login/registration |
| 📊 **Admin Dashboard** | Manage products and orders with full CRUD operations |
| 🔌 **REST API** | Full backend API with authentication |

---

## 🛠️ Tech Stack

### Core Technologies

| Category | Technology | Version |
|----------|------------|---------|
| Framework | Next.js | 16.x |
| Language | TypeScript | 5.5 |
| Styling | Tailwind CSS | 4.x |
| UI Components | shadcn/ui | Latest |
| Database | SQLite | - |
| ORM | Prisma | 5.x |
| Authentication | JWT (jose) | 6.x |
| Password Hashing | bcryptjs | 3.x |

---

## 🚀 Features

### Customer Features

| Feature | Description |
|---------|-------------|
| **Home Page** | Hero banner with CTA, category navigation, featured products, promotional sections |
| **Product Catalog** | Grid display with category filters, price range slider, search functionality |
| **Product Details** | Image gallery, product information, ratings, quantity selector, add to cart |
| **Shopping Cart** | Item list with quantity adjustment, remove items, order summary |
| **Checkout Flow** | Shipping form, payment method selection, order confirmation |
| **User Authentication** | JWT-based login/registration with secure password hashing |

### Admin Features

| Feature | Description |
|---------|-------------|
| **Dashboard** | Overview stats (revenue, orders, products), recent orders table |
| **Product Management** | View all products, add new products, delete products |
| **Order Management** | View all orders, filter by status, update order status |

### Backend Features

| Feature | Description |
|---------|-------------|
| **REST API** | Full CRUD for products and orders |
| **JWT Authentication** | Secure token-based auth with 7-day expiry |
| **Password Security** | bcrypt hashing |
| **Database** | SQLite with Prisma ORM |

---

## 📦 Project Structure

```
shopiverse/
├── prisma/
│   ├── schema.prisma          # Database schema
│   ├── seed.ts               # Seed data
│   ├── dev.db                # SQLite database
│   └── migrations/           # Prisma migrations
│
├── src/
│   ├── app/                     # Next.js App Router
│   │   ├── api/                 # API Routes
│   │   │   ├── auth/
│   │   │   │   ├── login/      # POST - User login
│   │   │   │   └── register/   # POST - User registration
│   │   │   ├── products/       # GET, POST - Products CRUD
│   │   │   └── orders/         # GET, POST - Orders CRUD
│   │   ├── page.tsx           # Home page
│   │   ├── layout.tsx          # Root layout
│   │   ├── products/           # Products pages
│   │   ├── cart/page.tsx      # Shopping cart
│   │   ├── checkout/page.tsx  # Checkout
│   │   ├── login/page.tsx     # Login
│   │   ├── register/page.tsx  # Registration
│   │   └── admin/             # Admin dashboard
│   │
│   ├── components/
│   │   ├── ui/                 # shadcn/ui components
│   │   ├── layout/
│   │   │   ├── Navbar.tsx
│   │   │   └── Footer.tsx
│   │   └── products/
│   │       └── ProductCard.tsx
│   │
│   ├── context/
│   │   ├── AuthContext.tsx
│   │   └── CartContext.tsx
│   │
│   └── lib/
│       ├── db.ts               # Prisma client
│       ├── auth.ts             # JWT utilities
│       ├── authMiddleware.ts  # Auth middleware
│       ├── data.ts             # Mock data (for reference)
│       ├── types.ts
│       └── utils.ts
│
├── .env                        # Environment variables
├── package.json
├── next.config.ts
├── tsconfig.json
└── tailwind.config.ts
```

---

## 🔌 API Endpoints

### Authentication

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/api/auth/register` | Register new user | Public |
| POST | `/api/auth/login` | Login user, returns JWT | Public |

### Products

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| GET | `/api/products` | List all products (with filters) | Public |
| GET | `/api/products/[id]` | Get single product | Public |

### Orders

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| GET | `/api/orders` | List user's orders | Required |
| POST | `/api/orders` | Create new order | Required |
| GET | `/api/orders/[id]` | Get single order | Required |
| PUT | `/api/orders/[id]` | Update order status | Admin |

### Request Headers

```http
Authorization: Bearer <jwt_token>
```

---

## 📱 Pages & Routes

### Customer Pages

| Route | Page | Description |
|-------|------|-------------|
| `/` | Home | Landing page with hero, categories, products |
| `/products` | Products | Product listing with filters |
| `/products/[id]` | Product Detail | Individual product information |
| `/cart` | Cart | Shopping cart |
| `/checkout` | Checkout | Order completion |
| `/login` | Login | User authentication |
| `/register` | Register | New user registration |

### Admin Pages

| Route | Page | Description |
|-------|------|-------------|
| `/admin` | Dashboard | Overview statistics |
| `/admin/products` | Products | Product CRUD |
| `/admin/orders` | Orders | Order management |

---

## 🏁 Getting Started

### Prerequisites

- **Node.js** 18.x or later
- **npm** 9.x or later

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/XynoxTheDev/CU-Qollabb-MCA.git
   cd CU-Qollabb-MCA
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Setup database**
   ```bash
   # Generate Prisma client
   npx prisma generate

   # Run migrations
   npx prisma migrate dev

   # Seed database
   npx tsx prisma/seed.ts
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

5. **Open in browser**
   Visit [http://localhost:3000](http://localhost:3000)

### Build for Production

```bash
npm run build
npm start
```

---

## 🔧 Environment Variables

Create a `.env` file in the root directory:

```env
# Database
DATABASE_URL="file:./prisma/dev.db"

# JWT Secret (change in production)
JWT_SECRET="your-secret-key-change-in-production"
```

---

## 👤 Demo Accounts

| Role | Email | Password | Access |
|------|-------|----------|--------|
| Customer | `john@example.com` | `password123` | Customer features |
| Admin | `admin@example.com` | `admin123` | Full dashboard + API |

---

## 🗄️ Database

### Schema

- **User**: id, email, name, password, role, avatar, timestamps
- **Product**: id, name, description, price, originalPrice, image, images, category, rating, reviewCount, stock, timestamps
- **Order**: id, userId, total, status, shippingAddress, paymentMethod, timestamps
- **OrderItem**: id, orderId, productId, quantity, price

### Seeded Data

- 2 users (admin + customer)
- 20 products across 4 categories

---

## 📈 Development Progress

| Phase | Status | Description |
|-------|--------|-------------|
| Phase 1: Frontend Design | ✅ Completed | All pages, components, styling |
| Phase 2: Backend Development | ✅ Completed | API, SQLite/Prisma, JWT auth |
| Phase 3: Payment Integration | 🔄 Planned | Stripe/PayPal |
| Phase 4: Advanced Features | 🔄 Planned | Profile, reviews, tracking |
| Phase 5: Testing & Deployment | 🔄 Planned | Tests, CI/CD |

---

<div align="center">

**Built with ❤️ using Next.js + Tailwind CSS + Prisma + SQLite**

*Last Updated: April 2026*

</div>