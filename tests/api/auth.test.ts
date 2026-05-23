// @vitest-environment node
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { testApiHandler } from 'next-test-api-route-handler'
import * as loginHandler from '@/app/api/auth/login/route'
import * as registerHandler from '@/app/api/auth/register/route'
import * as authLib from '@/lib/server/auth'
import { prisma } from '@/lib/server/db'

vi.mock('@/lib/server/db', () => ({
  prisma: {
    user: {
      findUnique: vi.fn(),
      create: vi.fn(),
    },
  },
}))

vi.mock('@/lib/server/auth', () => ({
  verifyPassword: vi.fn(),
  hashPassword: vi.fn(),
  createToken: vi.fn(),
}))

describe('POST /api/auth/login', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should return 400 if email is missing', async () => {
    await testApiHandler({
      appHandler: loginHandler,
      test: async ({ fetch }) => {
        const res = await fetch({
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ password: 'test123' }),
        })
        expect(res.status).toBe(400)
        const json = await res.json()
        expect(json.error).toBe('Email and password are required')
      },
    })
  })

  it('should return 400 if password is missing', async () => {
    await testApiHandler({
      appHandler: loginHandler,
      test: async ({ fetch }) => {
        const res = await fetch({
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: 'test@example.com' }),
        })
        expect(res.status).toBe(400)
        const json = await res.json()
        expect(json.error).toBe('Email and password are required')
      },
    })
  })

  it('should return 401 if user not found', async () => {
    vi.mocked(prisma.user.findUnique).mockResolvedValue(null)

    await testApiHandler({
      appHandler: loginHandler,
      test: async ({ fetch }) => {
        const res = await fetch({
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: 'test@example.com', password: 'test123' }),
        })
        expect(res.status).toBe(401)
        const json = await res.json()
        expect(json.error).toBe('Invalid credentials')
      },
    })
  })

  it('should return 401 if password is invalid', async () => {
    vi.mocked(prisma.user.findUnique).mockResolvedValue({
      id: '1',
      email: 'test@example.com',
      password: 'hashedpassword',
      name: 'Test User',
      role: 'customer',
      avatar: null,
      createdAt: new Date(),
      updatedAt: new Date(),
    })
    vi.mocked(authLib.verifyPassword).mockResolvedValue(false)

    await testApiHandler({
      appHandler: loginHandler,
      test: async ({ fetch }) => {
        const res = await fetch({
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: 'test@example.com', password: 'wrongpassword' }),
        })
        expect(res.status).toBe(401)
        const json = await res.json()
        expect(json.error).toBe('Invalid credentials')
      },
    })
  })

  it('should return 200 with user on successful login', async () => {
    vi.mocked(prisma.user.findUnique).mockResolvedValue({
      id: '1',
      email: 'test@example.com',
      password: 'hashedpassword',
      name: 'Test User',
      role: 'customer',
      avatar: null,
      createdAt: new Date(),
      updatedAt: new Date(),
    })
    vi.mocked(authLib.verifyPassword).mockResolvedValue(true)
    vi.mocked(authLib.createToken).mockResolvedValue('mock-token')

    await testApiHandler({
      appHandler: loginHandler,
      test: async ({ fetch }) => {
        const res = await fetch({
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: 'test@example.com', password: 'test123' }),
        })
        expect(res.status).toBe(200)
        const json = await res.json()
        expect(json.token).toBeUndefined()
        expect(json.user.email).toBe('test@example.com')
      },
    })
  })
})

describe('POST /api/auth/register', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should return 400 if name is missing', async () => {
    await testApiHandler({
      appHandler: registerHandler,
      test: async ({ fetch }) => {
        const res = await fetch({
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: 'test@example.com', password: 'test123' }),
        })
        expect(res.status).toBe(400)
        const json = await res.json()
        expect(json.error).toBe('Name, email and password are required')
      },
    })
  })

  it('should return 400 if email is missing', async () => {
    await testApiHandler({
      appHandler: registerHandler,
      test: async ({ fetch }) => {
        const res = await fetch({
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name: 'Test', password: 'test123' }),
        })
        expect(res.status).toBe(400)
        const json = await res.json()
        expect(json.error).toBe('Name, email and password are required')
      },
    })
  })

  it('should return 400 if user already exists', async () => {
    vi.mocked(prisma.user.findUnique).mockResolvedValue({
      id: '1',
      email: 'test@example.com',
      password: 'hashedpassword',
      name: 'Existing User',
      role: 'customer',
      avatar: null,
      createdAt: new Date(),
      updatedAt: new Date(),
    })

    await testApiHandler({
      appHandler: registerHandler,
      test: async ({ fetch }) => {
        const res = await fetch({
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name: 'Test', email: 'test@example.com', password: 'test123' }),
        })
        expect(res.status).toBe(400)
        const json = await res.json()
        expect(json.error).toBe('User already exists')
      },
    })
  })

  it('should return 200 with user on successful registration', async () => {
    vi.mocked(prisma.user.findUnique).mockResolvedValue(null)
    vi.mocked(prisma.user.create).mockResolvedValue({
      id: '2',
      name: 'New User',
      email: 'new@example.com',
      password: 'hashedpassword',
      role: 'customer',
      avatar: null,
      createdAt: new Date(),
      updatedAt: new Date(),
    })
    vi.mocked(authLib.hashPassword).mockResolvedValue('hashedpassword')
    vi.mocked(authLib.createToken).mockResolvedValue('new-mock-token')

    await testApiHandler({
      appHandler: registerHandler,
      test: async ({ fetch }) => {
        const res = await fetch({
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name: 'New User', email: 'new@example.com', password: 'test123' }),
        })
        expect(res.status).toBe(200)
        const json = await res.json()
        expect(json.token).toBeUndefined()
        expect(json.user.email).toBe('new@example.com')
      },
    })
  })
})