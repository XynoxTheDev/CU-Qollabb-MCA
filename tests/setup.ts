import '@testing-library/jest-dom/vitest'
import { afterEach, vi } from 'vitest'
import { cleanup } from '@testing-library/react'

const localStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
  length: 0,
  key: vi.fn(),
}
global.localStorage = localStorageMock as unknown as Storage

afterEach(() => {
  cleanup()
  vi.clearAllMocks()
  vi.resetAllMocks()
  localStorage.clear()
})

vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: vi.fn(),
    replace: vi.fn(),
    back: vi.fn(),
    prefetch: vi.fn(),
    refresh: vi.fn(),
  }),
  usePathname: () => '/',
  useSearchParams: () => new URLSearchParams(),
  useParams: () => ({}),
  redirect: vi.fn(),
  notFound: vi.fn(),
}))

process.env.JWT_SECRET = 'test-secret-key-for-testing'
process.env.STRIPE_SECRET_KEY = 'sk_test_mock'
process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY = 'pk_test_mock'
process.env.DATABASE_URL = 'file:./prisma/test.db'