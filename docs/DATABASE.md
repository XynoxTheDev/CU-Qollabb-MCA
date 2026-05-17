# Database

## Engine

SQLite, driven by Prisma ORM. The database file lives at `prisma/dev.db` and is gitignored.

## Schema

| Model | Key Fields |
|---|---|
| `User` | `id`, `email`, `name`, `password` (bcrypt hash), `role` (default: `customer`), `avatar`, `createdAt`, `updatedAt` |
| `Product` | `id`, `name`, `description`, `price`, `originalPrice`, `image`, `images`, `category`, `rating`, `reviewCount`, `stock`, `createdAt`, `updatedAt` |
| `Order` | `id`, `userId`, `total`, `status` (default: `pending`), `shippingAddress`, `paymentMethod`, `createdAt`, `updatedAt` |
| `OrderItem` | `id`, `orderId`, `productId`, `quantity`, `price` — cascade deletes with parent order |

Source: [`prisma/schema.prisma`](../prisma/schema.prisma).

> [!IMPORTANT]
> SQLite has no native JSON or array type, so two fields are stored as JSON-encoded `String`:
>
> - `Product.images` — `string` holding `JSON.stringify(string[])`
> - `Order.shippingAddress` — `string` holding `JSON.stringify({ fullName, email, phone, address, city, state, zip, country })`
>
> Anything consuming these columns must `JSON.parse` them. The `Product.images` field is also nullable; the seeded products only set it for product `1`.

## Migrations

```bash
npx prisma migrate dev
```

## Seed data

```bash
npx tsx prisma/seed.ts
```

Populates the database with 2 demo accounts and 19 products across 4 categories. See [README › Demo Accounts](../README.md#demo-accounts) for the seeded credentials.
