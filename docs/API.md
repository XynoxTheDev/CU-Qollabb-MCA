# API Reference

Shopiverse exposes a REST API under `/api/*`. All protected endpoints require a JWT in the `Authorization` header:

```http
Authorization: Bearer <jwt_token>
```

Tokens are issued by `POST /api/auth/login` and `POST /api/auth/register`, signed with `HS256`, and expire after 7 days.

---

## Authentication

| Method | Endpoint | Description | Auth |
|---|---|---|---|
| POST | `/api/auth/register` | Register a new user account | — |
| POST | `/api/auth/login` | Authenticate and receive a JWT | — |

### `POST /api/auth/register`

```json
{ "name": "Jane Doe", "email": "jane@example.com", "password": "secret123" }
```

Returns `200` with `{ user, token }`. `400` if any field is missing or the email is already taken.

### `POST /api/auth/login`

```json
{ "email": "jane@example.com", "password": "secret123" }
```

Returns `200` with `{ user, token }`. `400` if fields are missing, `401` on invalid credentials.

---

## Products

| Method | Endpoint | Description | Auth |
|---|---|---|---|
| GET | `/api/products` | Retrieve all products (supports filters) | — |
| GET | `/api/products/[id]` | Retrieve a single product by ID | — |

### Query parameters — `GET /api/products`

| Parameter | Type | Description |
|---|---|---|
| `category` | string | Filter by exact product category |
| `search` | string | Substring match on `name` or `description` |
| `minPrice` | number | Minimum price (inclusive) |
| `maxPrice` | number | Maximum price (inclusive) |
| `sort` | string | Prisma column to sort by (e.g. `price`, `rating`, `createdAt`). Defaults to `createdAt`. |
| `order` | string | `asc` or `desc`. Defaults to `desc`. |

Example: `/api/products?category=Electronics&sort=price&order=asc`.

> [!NOTE]
> `Product.images` is stored as a JSON-encoded string in SQLite — see [DATABASE.md](DATABASE.md). Clients must `JSON.parse` it before iterating.

---

## Orders

| Method | Endpoint | Description | Auth |
|---|---|---|---|
| GET | `/api/orders` | List orders for the caller (or any user if admin, via `?userId=`) | User |
| POST | `/api/orders` | Create a new order and decrement stock | User |
| GET | `/api/orders/[id]` | Retrieve a specific order by ID | User |
| PUT | `/api/orders/[id]` | Update order status | Admin |

### `GET /api/orders`

- Customers receive only their own orders.
- Admins receive every order; pass `?userId=<id>` to scope to one customer.

### `POST /api/orders`

```json
{
  "items": [{ "productId": "abc", "quantity": 2 }],
  "shippingAddress": {
    "fullName": "Jane Doe", "email": "jane@example.com", "phone": "555-0100",
    "address": "1 Main St", "city": "Springfield", "state": "IL",
    "zip": "62701", "country": "US"
  },
  "paymentMethod": "card"
}
```

Returns `201` with the created order (items included). `400` on missing fields or insufficient stock, `404` if any product ID is unknown.

> [!NOTE]
> `Order.shippingAddress` is persisted as a JSON-encoded string (the API serialises the object for you on write, and returns it as a string on read).

### `PUT /api/orders/[id]`

```json
{ "status": "shipped" }
```

`status` must be one of `pending`, `processing`, `shipped`, `delivered`, `cancelled`.

---

## Payment

| Method | Endpoint | Description | Auth |
|---|---|---|---|
| POST | `/api/payment` | Create a Stripe payment intent and persist the order | User |

### `POST /api/payment`

Same request body as `POST /api/orders`. Returns:

```json
{ "clientSecret": "pi_..._secret_...", "orderId": "ord_...", "amount": 123.45 }
```

Server-side total calculation:

| Component | Rule |
|---|---|
| Subtotal | `Σ price × quantity` from current DB prices |
| Shipping | Free when subtotal > `$50`, otherwise `$9.99` |
| Tax | `subtotal × 0.08` |

Returns `500` if `STRIPE_SECRET_KEY` is not configured, `400` on missing fields or insufficient stock, `404` if a product is missing.

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
