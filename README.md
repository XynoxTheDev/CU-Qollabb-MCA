# 🛒 Shopiverse - E-Commerce Platform

A modern, full-featured e-commerce web application built with Next.js, Tailwind CSS, and shadcn/ui. Includes a customer-facing storefront and comprehensive admin dashboard.

<div align="center">

![Next.js](https://img.shields.io/badge/Next.js-16-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.5-blue?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38bdf8?style=for-the-badge&logo=tailwind-css)
![shadcn/ui](https://img.shields.io/badge/shadcn/ui-latest-black?style=for-the-badge)
![React](https://img.shields.io/badge/React-18-61dafb?style=for-the-badge&logo=react)

</div>

---

## 📚 Table of Contents

1. [Project Overview](#-project-overview)
2. [Tech Stack](#-tech-stack)
3. [Features](#-features)
4. [Project Structure](#-project-structure)
5. [Pages & Routes](#-pages--routes)
6. [Getting Started](#-getting-started)
7. [Environment Variables](#-environment-variables)
8. [Demo Accounts](#-demo-accounts)
9. [Mock Data](#-mock-data)
10. [UI/UX Features](#-uiux-features)
11. [Future Enhancements](#-future-enhancements)
12. [Contributing](#-contributing)
13. [License](#-license)
14. [Development Progress](#-development-progress)

---

## 📋 Project Overview

**Shopiverse** is a comprehensive e-commerce platform developed as a portfolio project for the MCA program. It provides a complete shopping experience with product browsing, cart management, checkout process, and user authentication.

### Key Capabilities

| Capability | Description |
|------------|-------------|
| 🛍️ **Product Catalog** | Browse 22+ products across 4 categories with advanced filtering |
| 🛒 **Shopping Cart** | Add/remove items, adjust quantities, persistent cart |
| 💳 **Checkout** | Complete order with shipping info and payment selection |
| 👤 **Authentication** | User login/registration with demo credentials |
| 📊 **Admin Dashboard** | Manage products and orders with full CRUD operations |

---

## 🛠️ Tech Stack

### Core Technologies

| Category | Technology | Version |
|----------|------------|---------|
| Framework | Next.js | 16.x |
| Language | TypeScript | 5.5 |
| Styling | Tailwind CSS | 3.4 |
| UI Components | shadcn/ui | Latest |
| Icons | Lucide React | Latest |

### Development Tools

| Tool | Purpose |
|------|---------|
| ESLint | Code linting |
| Prettier | Code formatting |
| Git | Version control |
| npm | Package management |

---

## 🚀 Features

### Customer Features

| Feature | Description |
|---------|-------------|
| **Home Page** | Hero banner with CTA, category navigation, featured products, promotional sections, newsletter signup |
| **Product Catalog** | Grid display with category filters, price range slider, search functionality, sort options |
| **Product Details** | Image gallery, product information, ratings, quantity selector, add to cart |
| **Shopping Cart** | Item list with quantity adjustment, remove items, order summary with tax calculation |
| **Checkout Flow** | Shipping form with validation, payment method selection, order confirmation |
| **User Authentication** | Login with demo credentials, registration with password strength indicator |

### Admin Features

| Feature | Description |
|---------|-------------|
| **Dashboard** | Overview stats (revenue, orders, products, customers), recent orders table |
| **Product Management** | View all products, add new products via dialog, delete products |
| **Order Management** | View all orders, filter by status, expand order details, update order status |

---

## 📦 Project Structure

```
shopiverse/
├── src/
│   ├── app/                     # Next.js App Router pages
│   │   ├── page.tsx            # Home page
│   │   ├── layout.tsx          # Root layout (Navbar, Footer providers)
│   │   ├── globals.css         # Global styles + Tailwind
│   │   ├── products/           # Products pages
│   │   │   ├── page.tsx        # Product listing
│   │   │   └── [id]/page.tsx  # Product detail
│   │   ├── cart/page.tsx       # Shopping cart
│   │   ├── checkout/page.tsx   # Checkout process
│   │   ├── login/page.tsx      # Login page
│   │   ├── register/page.tsx   # Registration page
│   │   └── admin/              # Admin dashboard
│   │       ├── page.tsx       # Dashboard overview
│   │       ├── products/       # Product management
│   │       └── orders/         # Order management
│   │
│   ├── components/            # React components
│   │   ├── ui/                # shadcn/ui components
│   │   │   ├── button.tsx
│   │   │   ├── card.tsx
│   │   │   ├── input.tsx
│   │   │   ├── select.tsx
│   │   │   ├── table.tsx
│   │   │   ├── dialog.tsx
│   │   │   ├── sheet.tsx
│   │   │   ├── badge.tsx
│   │   │   └── ... (15+ components)
│   │   ├── layout/
│   │   │   ├── Navbar.tsx     # Main navigation
│   │   │   └── Footer.tsx     # Site footer
│   │   └── products/
│   │       └── ProductCard.tsx # Product card component
│   │
│   ├── context/               # React Context providers
│   │   ├── AuthContext.tsx    # Authentication state
│   │   └── CartContext.tsx    # Shopping cart state
│   │
│   └── lib/                   # Utilities and data
│       ├── data.ts            # Mock products, users, orders
│       ├── types.ts          # TypeScript interfaces
│       └── utils.ts          # Helper functions
│
├── public/                    # Static assets
│   └── images/                # Images directory
│
├── package.json               # Dependencies
├── next.config.ts              # Next.js configuration
├── tsconfig.json               # TypeScript configuration
├── tailwind.config.ts          # Tailwind configuration
├── components.json             # shadcn/ui configuration
├── eslint.config.mjs           # ESLint configuration
└── postcss.config.mjs         # PostCSS configuration
```

---

## 📱 Pages & Routes

### Customer Pages

| Route | Page | Description |
|-------|------|-------------|
| `/` | Home | Landing page with hero, categories, products |
| `/products` | Products | Product listing with filters and search |
| `/products/[id]` | Product Detail | Individual product information |
| `/cart` | Cart | Shopping cart with quantity management |
| `/checkout` | Checkout | Order completion with shipping/payment |
| `/login` | Login | User authentication |
| `/register` | Register | New user registration |

### Admin Pages

| Route | Page | Description |
|-------|------|-------------|
| `/admin` | Dashboard | Overview statistics and recent orders |
| `/admin/products` | Products | Product CRUD operations |
| `/admin/orders` | Orders | Order management and status updates |

---

## 🏁 Getting Started

### Prerequisites

- **Node.js** 18.x or later
- **npm** 9.x or later (comes with Node.js)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/shopiverse.git
   cd shopiverse
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   Visit [http://localhost:3000](http://localhost:3000)

### Build for Production

```bash
# Create production build
npm run build

# Start production server
npm start
```

### Available Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Create production build |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |
| `npm run lint:fix` | Fix ESLint issues |

---

## 🔧 Environment Variables

Create a `.env.local` file in the root directory:

```env
# API Configuration (for future backend integration)
NEXT_PUBLIC_API_URL=http://localhost:5000

# Payment Gateway (optional - for future integration)
NEXT_PUBLIC_STRIPE_KEY=pk_test_your_stripe_key

# Other Configuration
NEXT_PUBLIC_APP_NAME=Shopiverse
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

> **Note**: These variables are optional for the current frontend-only version. They will be required when implementing the backend.

---

## 👤 Demo Accounts

| Role | Email | Password | Access |
|------|-------|----------|--------|
| Customer | `john@example.com` | `password123` | Customer features |
| Admin | `admin@example.com` | `admin123` | Full dashboard access |

---

## 📊 Mock Data

### Products (22 Total)

| Category | Count | Example Products |
|----------|-------|------------------|
| Electronics | 8 | Wireless Headphones, Smart Watch, Bluetooth Speaker, Earbuds |
| Fashion | 6 | Denim Jacket, Running Shoes, Leather Wallet, Sunglasses |
| Home & Garden | 4 | Table Lamp, Indoor Plants, Throw Blanket, Knife Set |
| Sports | 4 | Yoga Mat, Dumbbells, Tennis Racket, Cycling Helmet |

### Product Attributes

- Name, Description, Price, Original Price (if on sale)
- Image, Category, Rating, Review Count
- Stock Status, Created Date

---

## 🎨 UI/UX Features

### Design System

| Feature | Implementation |
|---------|----------------|
| **Responsive Design** | Mobile-first with breakpoints: 640px (sm), 1024px (lg) |
| **Color Scheme** | Primary: Blue (#1E3A8A), Accent: Amber (#F59E0B) |
| **Typography** | Inter font family |
| **Components** | shadcn/ui (Button, Card, Input, Select, Dialog, etc.) |

### Functionality

- **State Persistence**: Cart and user data saved to localStorage
- **Toast Notifications**: User feedback for actions
- **Loading States**: Suspense boundaries for async operations
- **Form Validation**: Client-side validation on forms

---

## 🔮 Future Enhancements

### Phase 2: Backend Development

- [ ] Node.js/Express REST API
- [ ] MongoDB database integration
- [ ] JWT authentication
- [ ] User session management

### Phase 3: Payment Integration

- [ ] Stripe payment gateway
- [ ] PayPal integration
- [ ] Order processing system

### Phase 4: Advanced Features

- [ ] User profile management
- [ ] Product reviews and ratings
- [ ] Order tracking
- [ ] Email notifications
- [ ] Wishlist functionality

### Phase 5: Testing & Deployment

- [ ] Unit and integration tests
- [ ] CI/CD pipeline setup
- [ ] Deployment to cloud platform

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. **Fork the repository**
2. **Create a feature branch**: `git checkout -b feature/your-feature`
3. **Commit your changes**: `git commit -m 'Add your feature'`
4. **Push to the branch**: `git push origin feature/your-feature`
5. **Open a Pull Request**

Please ensure your code follows the existing style and passes linting.

---

## 📄 License

This project is for **educational purposes** as part of the MCA program curriculum.

---

## 📈 Development Progress

| Phase | Status | Description |
|-------|--------|-------------|
| Phase 1: Frontend Design | ✅ Completed | All pages, components, styling |
| Phase 2: Backend Development | 🔄 Planned | API, database, auth |
| Phase 3: Payment Integration | 🔄 Planned | Stripe/PayPal integration |
| Phase 4: Advanced Features | 🔄 Planned | Profile, reviews, tracking |
| Phase 5: Testing & Deployment | 🔄 Planned | Tests, CI/CD, deployment |

---

<div align="center">

**Built with ❤️ using Next.js + Tailwind CSS + shadcn/ui**

*Last Updated: April 2026*

</div>