# Full-Stack E-Commerce Web Application Development

A comprehensive e-commerce platform built with modern technologies, featuring a customer-facing storefront and admin dashboard.

![Next.js](https://img.shields.io/badge/Next.js-14-black)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-3.4-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)
![shadcn/ui](https://img.shields.io/badge/shadcn/ui-latest-black)

## 📋 Project Overview

This project is a full-stack e-commerce web application developed as part of the MCA program curriculum. It allows users to:
- Browse and search products across multiple categories
- Add items to shopping cart with quantity management
- Complete checkout process with shipping and payment forms
- User authentication (login/register)
- Admin users can manage products and orders

## 🛠️ Technology Stack

| Layer | Technology |
|-------|------------|
| Frontend Framework | Next.js 14 (App Router) |
| Styling | Tailwind CSS |
| UI Components | shadcn/ui |
| Language | TypeScript |
| Icons | Lucide React |
| State Management | React Context API |

## 📦 Project Structure

```
CU-Qollabb-MCA/
├── src/                           # Next.js application source
│   ├── app/                       # App router pages
│   │   ├── page.tsx               # Home page
│   │   ├── products/             # Products listing & detail pages
│   │   ├── cart/                 # Shopping cart page
│   │   ├── checkout/             # Checkout page
│   │   ├── login/                # Login page
│   │   ├── register/             # Registration page
│   │   └── admin/                # Admin dashboard (overview, products, orders)
│   ├── components/               # React components
│   │   ├── ui/                   # shadcn/ui components (Button, Card, Input, etc.)
│   │   ├── layout/               # Navbar, Footer
│   │   └── products/             # Product components (ProductCard)
│   ├── lib/                      # Data and utilities
│   │   ├── data.ts               # Mock products, users, orders data
│   │   ├── types.ts              # TypeScript interfaces
│   │   └── utils.ts              # Utility functions
│   └── context/                  # React context providers
│       ├── AuthContext.tsx       # Authentication state management
│       └── CartContext.tsx       # Shopping cart state management
├── public/                       # Static assets (images, icons)
├── package.json                  # Project dependencies
├── next.config.ts                # Next.js configuration
├── tsconfig.json                 # TypeScript configuration
├── components.json               # shadcn/ui configuration
├── tailwind.config.ts            # Tailwind CSS configuration
└── README.md                     # Project documentation
```

## 🚀 Features Implemented

### Phase 1: Frontend Design ✅ Completed

| Feature | Description |
|---------|-------------|
| **Home Page** | Hero banner with CTA, category cards, featured products grid, promotional banner, newsletter signup |
| **Products Page** | Product listing with category filter, price range slider, search, sort options, responsive grid |
| **Product Detail** | Image gallery with thumbnails, product info, rating display, quantity selector, add to cart |
| **Shopping Cart** | Cart items list, quantity adjustment, remove items, order summary with tax calculation |
| **Checkout** | Shipping form with validation, payment method selection, order review, order confirmation |
| **Authentication** | Login page with demo credentials, registration with password strength indicator |
| **Admin Dashboard** | Overview stats (revenue, orders, products), recent orders table |
| **Admin Products** | Product list with search, add new product dialog, delete products |
| **Admin Orders** | Orders list with status filter, expandable order details, status update dropdown |

## 📱 Pages & Routes

| Route | Description |
|-------|-------------|
| `/` | Home page |
| `/products` | Product listing with filters |
| `/products/[id]` | Product detail page |
| `/cart` | Shopping cart |
| `/checkout` | Checkout process |
| `/login` | User login |
| `/register` | User registration |
| `/admin` | Admin dashboard overview |
| `/admin/products` | Product management |
| `/admin/orders` | Order management |

## 🛠️ Getting Started

### Prerequisites
- Node.js 18+ 
- npm

### Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

### Build for Production

```bash
npm run build
npm start
```

## 🔧 Configuration

### Environment Variables (Optional)
Create a `.env.local` file in the root directory for future backend integration:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000
NEXT_PUBLIC_STRIPE_KEY=your_stripe_key
```

## 📝 Mock Data

The application currently uses mock data for demonstration purposes:

### Demo Credentials
| Role | Email | Password |
|------|-------|----------|
| Customer | john@example.com | password123 |
| Admin | admin@example.com | admin123 |

### Products
- 22 sample products across 4 categories (Electronics, Fashion, Home & Garden, Sports)
- Product details include name, description, price, original price (sale price), rating, review count, stock status

### Categories
- Electronics (8 products): Headphones, Smart Watch, Bluetooth Speaker, Earbuds, Keyboard, Camera, Smart Hub, Charging Pad
- Fashion (6 products): Denim Jacket, Wallet, Running Shoes, Sunglasses, T-Shirt Pack, Crossbody Bag
- Home & Garden (4 products): Table Lamp, Indoor Plants, Throw Blanket, Kitchen Knife Set
- Sports (4 products): Yoga Mat, Dumbbells, Tennis Racket, Cycling Helmet

## 🎨 UI/UX Features

- **Responsive Design**: Mobile-first approach with breakpoints at 640px, 1024px
- **Color Scheme**: Primary blue (#1E3A8A), Secondary amber (#F59E0B)
- **Components**: Reusable shadcn/ui components (Button, Card, Input, Select, etc.)
- **State Persistence**: Cart and user data persisted to localStorage
- **Feedback**: Toast notifications for user actions
- **Loading States**: Suspense boundaries for async operations

## 🔄 Future Enhancements (Phase 2+)

- Backend API development with Node.js/Express
- Database integration (MongoDB)
- JWT authentication
- Payment gateway integration (Stripe/PayPal)
- Order management system
- User profile management
- Review and rating system
- Product search optimization
- Email notifications

## 📄 License

This project is for educational purposes as part of the MCA program.

---

## 📊 Development Progress

| Phase | Status | Description |
|-------|--------|-------------|
| Phase 1 | ✅ Completed | Frontend Design - All pages and components built |
| Phase 2 | 🔄 Planned | Backend Development - API, database, auth |
| Phase 3 | 🔄 Planned | Payment Integration - Stripe/PayPal |
| Phase 4 | 🔄 Planned | Testing & Deployment |

---

**Last Updated**: April 2026