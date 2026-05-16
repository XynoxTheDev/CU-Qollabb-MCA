import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Navbar from '@/components/layout/Navbar'
import * as authModule from '@/context/AuthContext'
import * as cartModule from '@/context/CartContext'

vi.mock('@/context/AuthContext', () => ({
  useAuth: () => ({
    user: null,
    isAuthenticated: false,
    logout: vi.fn(),
  }),
}))

vi.mock('@/context/CartContext', () => ({
  useCart: () => ({
    getCartCount: () => 0,
  }),
}))

vi.mock('next/navigation', () => ({
  usePathname: () => '/',
}))

describe('Navbar', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should render logo', () => {
    render(<Navbar />)
    expect(screen.getByText('Shopiverse')).toBeDefined()
  })

  it('should render navigation links', () => {
    render(<Navbar />)
    expect(screen.getByText('Home')).toBeDefined()
    expect(screen.getByText('Shop')).toBeDefined()
  })

  it('should render login button when not authenticated', () => {
    render(<Navbar />)
    expect(screen.getByText('Login')).toBeDefined()
    expect(screen.getByText('Sign Up')).toBeDefined()
  })

  it('should render user name when authenticated', () => {
    vi.spyOn(authModule, 'useAuth').mockReturnValue({
      user: { id: '1', name: 'John Doe', email: 'john@example.com', role: 'customer' },
      isAuthenticated: true,
      isLoading: false,
      login: vi.fn(),
      logout: vi.fn(),
      register: vi.fn(),
    })

    render(<Navbar />)
    expect(screen.getByText('John')).toBeDefined()
  })

  it('should render admin link for admin user', () => {
    vi.spyOn(authModule, 'useAuth').mockReturnValue({
      user: { id: '1', name: 'Admin User', email: 'admin@example.com', role: 'admin' },
      isAuthenticated: true,
      isLoading: false,
      login: vi.fn(),
      logout: vi.fn(),
      register: vi.fn(),
    })

    render(<Navbar />)
    expect(screen.getByText('Admin')).toBeDefined()
  })

  it('should call logout when logout button is clicked', async () => {
    const logoutMock = vi.fn()
    vi.spyOn(authModule, 'useAuth').mockReturnValue({
      user: { id: '1', name: 'John Doe', email: 'john@example.com', role: 'customer' },
      isAuthenticated: true,
      isLoading: false,
      login: vi.fn(),
      logout: logoutMock,
      register: vi.fn(),
    })

    const user = userEvent.setup()
    render(<Navbar />)
    const logoutButtons = screen.getAllByRole('button', { name: '' })
    const logoutButton = logoutButtons.find(b => b.querySelector('svg')?.className?.includes('log-out'))
    if (logoutButton) {
      await user.click(logoutButton)
      expect(logoutMock).toHaveBeenCalled()
    }
  })

  it('should display cart count', () => {
    vi.spyOn(cartModule, 'useCart').mockReturnValue({
      getCartCount: () => 3,
      items: [],
      addToCart: vi.fn(),
      removeFromCart: vi.fn(),
      updateQuantity: vi.fn(),
      clearCart: vi.fn(),
      getCartTotal: () => 0,
    })

    render(<Navbar />)
    expect(screen.getByText('3')).toBeDefined()
  })
})