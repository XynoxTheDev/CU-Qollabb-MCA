// @vitest-environment node
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { testApiHandler } from 'next-test-api-route-handler'
import * as paymentHandler from '@/app/api/payment/route'
import { prisma } from '@/lib/server/db'
import * as authMiddleware from '@/lib/server/auth-middleware'
import * as stripeModule from '@/lib/server/stripe'

vi.mock('@/lib/server/db', () => ({
  prisma: {
    order: {
      create: vi.fn(),
    },
    product: {
      findUnique: vi.fn(),
      update: vi.fn(),
    },
  },
}))

vi.mock('@/lib/server/auth-middleware', () => ({
  authMiddleware: vi.fn(),
  requireAuth: vi.fn(),
}))

vi.mock('@/lib/server/stripe', () => ({
  stripe: {
    paymentIntents: {
      create: vi.fn(),
    },
  },
  createPaymentIntent: vi.fn(),
}))

const mockUser = { userId: 'user-1', email: 'test@example.com', role: 'customer' }

describe('POST /api/payment', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should return 500 if Stripe is not configured', async () => {
    vi.spyOn(stripeModule, 'stripe', 'get').mockReturnValue(null)

    await testApiHandler({
      appHandler: paymentHandler,
      test: async ({ fetch }) => {
        const res = await fetch({
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            items: [],
            shippingAddress: {},
            paymentMethod: 'card',
          }),
        })
        expect(res.status).toBe(500)
        const json = await res.json()
        expect(json.error).toBe('Stripe is not configured')
      },
    })
  })

  it('should return 400 if no items provided', async () => {
    vi.spyOn(stripeModule, 'stripe', 'get').mockReturnValue({ paymentIntents: { create: vi.fn() } } as unknown as typeof stripeModule.stripe)
    vi.mocked(authMiddleware.requireAuth).mockResolvedValue(mockUser)

    await testApiHandler({
      appHandler: paymentHandler,
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
    vi.spyOn(stripeModule, 'stripe', 'get').mockReturnValue({ paymentIntents: { create: vi.fn() } } as unknown as typeof stripeModule.stripe)
    vi.mocked(authMiddleware.requireAuth).mockResolvedValue(mockUser)

    await testApiHandler({
      appHandler: paymentHandler,
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

  it('should return 404 if product not found', async () => {
    vi.spyOn(stripeModule, 'stripe', 'get').mockReturnValue({ paymentIntents: { create: vi.fn() } } as unknown as typeof stripeModule.stripe)
    vi.mocked(authMiddleware.requireAuth).mockResolvedValue(mockUser)
    vi.mocked(prisma.product.findUnique).mockResolvedValue(null)

    await testApiHandler({
      appHandler: paymentHandler,
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

  it('should create payment intent on valid request', async () => {
    vi.spyOn(stripeModule, 'stripe', 'get').mockReturnValue({ paymentIntents: { create: vi.fn() } } as unknown as typeof stripeModule.stripe)
    vi.mocked(authMiddleware.requireAuth).mockResolvedValue(mockUser)
    vi.mocked(prisma.product.findUnique).mockResolvedValue({
      id: 'prod-1',
      name: 'Test Product',
      description: 'A test product',
      price: 50,
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
      price: 50,
      originalPrice: null,
      image: '/img.jpg',
      images: null,
      category: 'Test',
      rating: 4.5,
      reviewCount: 10,
      stock: 49,
      createdAt: new Date(),
      updatedAt: new Date(),
    })
    vi.mocked(prisma.order.create).mockResolvedValue({
      id: 'order-1',
      userId: 'user-1',
      total: 50,
      status: 'pending',
      shippingAddress: '{}',
      paymentMethod: 'card',
      createdAt: new Date(),
      updatedAt: new Date(),
    })
    vi.mocked(stripeModule.createPaymentIntent).mockResolvedValue({
      client_secret: 'pi_secret_123',
    } as unknown as Awaited<ReturnType<typeof stripeModule.createPaymentIntent>>)

    await testApiHandler({
      appHandler: paymentHandler,
      test: async ({ fetch }) => {
        const res = await fetch({
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            items: [{ productId: 'prod-1', quantity: 1 }],
            shippingAddress: { fullName: 'Test', email: 'test@test.com', phone: '123', address: '123 St', city: 'City', state: 'State', zip: '12345', country: 'US' },
            paymentMethod: 'card',
          }),
        })
        expect(res.status).toBe(200)
        const json = await res.json()
        expect(json.clientSecret).toBe('pi_secret_123')
        expect(json.orderId).toBe('order-1')
      },
    })
  })
})