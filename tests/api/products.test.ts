// @vitest-environment node
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { testApiHandler } from 'next-test-api-route-handler'
import * as productsHandler from '@/app/api/products/route'
import * as productByIdHandler from '@/app/api/products/[id]/route'
import { prisma } from '@/lib/server/db'

vi.mock('@/lib/server/db', () => ({
  prisma: {
    product: {
      findMany: vi.fn(),
      findUnique: vi.fn(),
    },
  },
}))

const mockProducts = [
  {
    id: 'prod-1',
    name: 'Product 1',
    description: 'Description 1',
    price: 99.99,
    originalPrice: 129.99,
    image: '/image1.jpg',
    images: null,
    category: 'Electronics',
    rating: 4.5,
    reviewCount: 100,
    stock: 50,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 'prod-2',
    name: 'Product 2',
    description: 'Description 2',
    price: 49.99,
    originalPrice: null,
    image: '/image2.jpg',
    images: null,
    category: 'Clothing',
    rating: 4.0,
    reviewCount: 50,
    stock: 100,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
]

describe('GET /api/products', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should return 200 with all products', async () => {
    vi.mocked(prisma.product.findMany).mockResolvedValue(mockProducts)

    await testApiHandler({
      appHandler: productsHandler,
      test: async ({ fetch }) => {
        const res = await fetch({ method: 'GET' })
        expect(res.status).toBe(200)
        const json = await res.json()
        expect(json).toHaveLength(2)
        expect(json[0].name).toBe('Product 1')
      },
    })
  })

  it('should filter products by category', async () => {
    vi.mocked(prisma.product.findMany).mockResolvedValue([mockProducts[0]])

    await testApiHandler({
      appHandler: productsHandler,
      url: '/api/products?category=Electronics',
      test: async ({ fetch }) => {
        const res = await fetch({ method: 'GET' })
        expect(res.status).toBe(200)
        const json = await res.json()
        expect(json).toHaveLength(1)
        expect(json[0].category).toBe('Electronics')
      },
    })
  })

  it('should filter products by search term', async () => {
    vi.mocked(prisma.product.findMany).mockResolvedValue([mockProducts[0]])

    await testApiHandler({
      appHandler: productsHandler,
      url: '/api/products?search=Product+1',
      test: async ({ fetch }) => {
        const res = await fetch({ method: 'GET' })
        expect(res.status).toBe(200)
        const json = await res.json()
        expect(json).toHaveLength(1)
      },
    })
  })

  it('should filter products by price range', async () => {
    vi.mocked(prisma.product.findMany).mockResolvedValue([mockProducts[1]])

    await testApiHandler({
      appHandler: productsHandler,
      url: '/api/products?minPrice=0&maxPrice=50',
      test: async ({ fetch }) => {
        const res = await fetch({ method: 'GET' })
        expect(res.status).toBe(200)
        const json = await res.json()
        expect(json).toHaveLength(1)
      },
    })
  })

  it('should sort products by price ascending', async () => {
    vi.mocked(prisma.product.findMany).mockResolvedValue(mockProducts)

    await testApiHandler({
      appHandler: productsHandler,
      url: '/api/products?sort=price&order=asc',
      test: async ({ fetch }) => {
        const res = await fetch({ method: 'GET' })
        expect(res.status).toBe(200)
        expect(prisma.product.findMany).toHaveBeenCalledWith(
          expect.objectContaining({
            orderBy: expect.objectContaining({
              price: 'asc',
            }),
          })
        )
      },
    })
  })

  it('should sort products by rating', async () => {
    vi.mocked(prisma.product.findMany).mockResolvedValue(mockProducts)

    await testApiHandler({
      appHandler: productsHandler,
      url: '/api/products?sort=rating&order=desc',
      test: async ({ fetch }) => {
        const res = await fetch({ method: 'GET' })
        expect(res.status).toBe(200)
        expect(prisma.product.findMany).toHaveBeenCalledWith(
          expect.objectContaining({
            orderBy: expect.objectContaining({
              rating: 'desc',
            }),
          })
        )
      },
    })
  })

  it('should return 500 on database error', async () => {
    vi.mocked(prisma.product.findMany).mockRejectedValue(new Error('DB error'))

    await testApiHandler({
      appHandler: productsHandler,
      test: async ({ fetch }) => {
        const res = await fetch({ method: 'GET' })
        expect(res.status).toBe(500)
        const json = await res.json()
        expect(json.error).toBe('Internal server error')
      },
    })
  })
})

describe('GET /api/products/[id]', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should return 200 with product by id', async () => {
    vi.mocked(prisma.product.findUnique).mockResolvedValue(mockProducts[0])

    await testApiHandler({
      appHandler: productByIdHandler,
      params: { id: 'prod-1' },
      test: async ({ fetch }) => {
        const res = await fetch({ method: 'GET' })
        expect(res.status).toBe(200)
        const json = await res.json()
        expect(json.id).toBe('prod-1')
        expect(json.name).toBe('Product 1')
      },
    })
  })

  it('should return 404 if product not found', async () => {
    vi.mocked(prisma.product.findUnique).mockResolvedValue(null)

    await testApiHandler({
      appHandler: productByIdHandler,
      params: { id: 'nonexistent' },
      test: async ({ fetch }) => {
        const res = await fetch({ method: 'GET' })
        expect(res.status).toBe(404)
      },
    })
  })
})