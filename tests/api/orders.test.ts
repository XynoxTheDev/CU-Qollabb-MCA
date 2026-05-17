// @vitest-environment node
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { testApiHandler } from 'next-test-api-route-handler'
import * as ordersHandler from '@/app/api/orders/route'
import { prisma } from '@/lib/db'
import * as authMiddleware from '@/lib/authMiddleware'

vi.mock('@/lib/db', () => ({
  prisma: {
    order: {
      findMany: vi.fn(),
      create: vi.fn(),
      findUnique: vi.fn(),
      update: vi.fn(),
    },
    product: {
      findUnique: vi.fn(),
      update: vi.fn(),
    },
  },
}))

vi.mock('@/lib/authMiddleware', () => ({
  authMiddleware: vi.fn(),
  requireAuth: vi.fn(),
}))

const mockUser = { userId: 'user-1', email: 'test@example.com', role: 'customer' }
const mockAdminUser = { userId: 'admin-1', email: 'admin@example.com', role: 'admin' }

describe('GET /api/orders', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should return 401 if not authenticated', async () => {
    vi.mocked(authMiddleware.authMiddleware).mockResolvedValue(null)

    await testApiHandler({
      appHandler: ordersHandler,
      test: async ({ fetch }) => {
        const res = await fetch({ method: 'GET' })
        expect(res.status).toBe(401)
        const json = await res.json()
        expect(json.error).toBe('Unauthorized')
      },
    })
  })

  it('should return orders for authenticated user', async () => {
    vi.mocked(authMiddleware.authMiddleware).mockResolvedValue(mockUser)
    vi.mocked(prisma.order.findMany).mockResolvedValue([])

    await testApiHandler({
      appHandler: ordersHandler,
      test: async ({ fetch }) => {
        const res = await fetch({ method: 'GET' })
        expect(res.status).toBe(200)
        const json = await res.json()
        expect(Array.isArray(json)).toBe(true)
      },
    })
  })

  it('should return all orders for admin', async () => {
    vi.mocked(authMiddleware.authMiddleware).mockResolvedValue(mockAdminUser)
    vi.mocked(prisma.order.findMany).mockResolvedValue([])

    await testApiHandler({
      appHandler: ordersHandler,
      test: async ({ fetch }) => {
        const res = await fetch({ method: 'GET' })
        expect(res.status).toBe(200)
        expect(prisma.order.findMany).toHaveBeenCalledWith(
          expect.objectContaining({
            where: expect.any(Object),
          })
        )
      },
    })
  })
})

describe('POST /api/orders', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should return 401 if not authenticated', async () => {
    vi.mocked(authMiddleware.requireAuth).mockRejectedValue(new Error('Unauthorized'))

    await testApiHandler({
      appHandler: ordersHandler,
      test: async ({ fetch }) => {
        const res = await fetch({
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            items: [{ productId: 'prod-1', quantity: 2 }],
            shippingAddress: { fullName: 'Test', email: 'test@test.com', phone: '123', address: '123 St', city: 'City', state: 'State', zip: '12345', country: 'US' },
            paymentMethod: 'card',
          }),
        })
        expect(res.status).toBe(401)
      },
    })
  })

  it('should return 400 if no items provided', async () => {
    vi.mocked(authMiddleware.requireAuth).mockResolvedValue(mockUser)

    await testApiHandler({
      appHandler: ordersHandler,
      test: async ({ fetch }) => {
        const res = await fetch({
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            items: [],
            shippingAddress: { fullName: 'Test', email: 'test@test.com', phone: '123', address: '123 St', city: 'City', state: 'State', zip: '12345', country: 'US' },
            paymentMethod: 'card',
          }),
        })
        expect(res.status).toBe(400)
        const json = await res.json()
        expect(json.error).toBe('No items provided')
      },
    })
  })

  it('should return 400 if shipping address is missing', async () => {
    vi.mocked(authMiddleware.requireAuth).mockResolvedValue(mockUser)

    await testApiHandler({
      appHandler: ordersHandler,
      test: async ({ fetch }) => {
        const res = await fetch({
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            items: [{ productId: 'prod-1', quantity: 2 }],
            paymentMethod: 'card',
          }),
        })
        expect(res.status).toBe(400)
        const json = await res.json()
        expect(json.error).toBe('Shipping address and payment method are required')
      },
    })
  })

  it('should create order on valid request', async () => {
    vi.mocked(authMiddleware.requireAuth).mockResolvedValue(mockUser)
    vi.mocked(prisma.product.findUnique).mockResolvedValue({
      id: 'prod-1',
      name: 'Test Product',
      description: 'A test product',
      price: 99.99,
      originalPrice: null,
      image: '/img.jpg',
      images: null,
      category: 'Test',
      rating: 4.5,
      reviewCount: 10,
      stock: 50,
      createdAt: new Date(),
      updatedAt: new Date(),
    })
    vi.mocked(prisma.product.update).mockResolvedValue({
      id: 'prod-1',
      name: 'Test Product',
      description: 'A test product',
      price: 99.99,
      originalPrice: null,
      image: '/img.jpg',
      images: null,
      category: 'Test',
      rating: 4.5,
      reviewCount: 10,
      stock: 48,
      createdAt: new Date(),
      updatedAt: new Date(),
    })
    vi.mocked(prisma.order.create).mockResolvedValue({
      id: 'order-1',
      userId: 'user-1',
      total: 199.98,
      status: 'pending',
      shippingAddress: '{}',
      paymentMethod: 'card',
      createdAt: new Date(),
      updatedAt: new Date(),
    })

    await testApiHandler({
      appHandler: ordersHandler,
      test: async ({ fetch }) => {
        const res = await fetch({
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            items: [{ productId: 'prod-1', quantity: 2 }],
            shippingAddress: { fullName: 'Test', email: 'test@test.com', phone: '123', address: '123 St', city: 'City', state: 'State', zip: '12345', country: 'US' },
            paymentMethod: 'card',
          }),
        })
        expect(res.status).toBe(201)
      },
    })
  })

  it('should return 404 if product not found', async () => {
    vi.mocked(authMiddleware.requireAuth).mockResolvedValue(mockUser)
    vi.mocked(prisma.product.findUnique).mockResolvedValue(null)

    await testApiHandler({
      appHandler: ordersHandler,
      test: async ({ fetch }) => {
        const res = await fetch({
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            items: [{ productId: 'nonexistent', quantity: 2 }],
            shippingAddress: { fullName: 'Test', email: 'test@test.com', phone: '123', address: '123 St', city: 'City', state: 'State', zip: '12345', country: 'US' },
            paymentMethod: 'card',
          }),
        })
        expect(res.status).toBe(404)
        const json = await res.json()
        expect(json.error).toContain('not found')
      },
    })
  })
})