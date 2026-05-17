# API Reference

Shopiverse exposes a REST API under `/api/*`. All protected endpoints require a JWT in the `Authorization` header:

```http
Authorization: Bearer <jwt_token>
```

---

## Authentication

| Method | Endpoint | Description | Auth |
|---|---|---|---|
| POST | `/api/auth/register` | Register a new user account | — |
| POST | `/api/auth/login` | Authenticate and receive a JWT | — |

## Products

| Method | Endpoint | Description | Auth |
|---|---|---|---|
| GET | `/api/products` | Retrieve all products (supports filters) | — |
| GET | `/api/products/[id]` | Retrieve a single product by ID | — |

### Query parameters — `GET /api/products`

| Parameter | Type | Description |
|---|---|---|
| `category` | string | Filter by product category |
| `search` | string | Keyword search on name and description |
| `minPrice` | number | Minimum price filter |
| `maxPrice` | number | Maximum price filter |
| `sort` | string | Sort order: `price_asc`, `price_desc`, `rating` |

## Orders

| Method | Endpoint | Description | Auth |
|---|---|---|---|
| GET | `/api/orders` | Retrieve the authenticated user's orders | User |
| POST | `/api/orders` | Create a new order | User |
| GET | `/api/orders/[id]` | Retrieve a specific order by ID | User |
| PUT | `/api/orders/[id]` | Update order status | Admin |

## Payment

| Method | Endpoint | Description | Auth |
|---|---|---|---|
| POST | `/api/payment` | Create a Stripe payment intent and persist the order | User |

---

## Pages and Routes

### Customer

| Route | Description |
|---|---|
| `/` | Landing page with hero, category cards, featured products |
| `/products` | Catalog with filtering and search |
| `/products/[id]` | Product detail with gallery and add-to-cart |
| `/cart` | Cart with quantity management and order summary |
| `/checkout` | Shipping form, Stripe payment, confirmation |
| `/login` | User login |
| `/register` | New user registration |

### Admin

| Route | Description |
|---|---|
| `/admin` | Dashboard with statistics and recent orders |
| `/admin/products` | Product listing with add and delete |
| `/admin/orders` | Order listing with status update controls |

> [!NOTE]
> Admin routes require a user with `role: "admin"`. The seed script provisions one — see [DATABASE.md](DATABASE.md).
