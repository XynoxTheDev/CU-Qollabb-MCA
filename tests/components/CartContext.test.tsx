import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { CartProvider, useCart } from '@/context/CartContext'
import React from 'react'
import { Product } from '@/lib/types'

const mockProduct: Product = {
  id: 'prod-1',
  name: 'Test Product',
  description: 'Test description',
  price: 99.99,
  originalPrice: 129.99,
  image: '/test.jpg',
  category: 'Electronics',
  rating: 4.5,
  reviewCount: 100,
  stock: 50,
  createdAt: '2024-01-01',
}

const TestComponent = () => {
  const { items, addToCart, removeFromCart, updateQuantity, clearCart, getCartTotal, getCartCount } = useCart()

  return (
    <div>
      <p data-testid="count">{getCartCount()}</p>
      <p data-testid="total">{getCartTotal()}</p>
      <p data-testid="items">{items.length}</p>
      <button onClick={() => addToCart(mockProduct, 2)}>Add</button>
      <button onClick={() => removeFromCart('prod-1')}>Remove</button>
      <button onClick={() => updateQuantity('prod-1', 5)}>Update</button>
      <button onClick={() => clearCart()}>Clear</button>
    </div>
  )
}

describe('CartContext', () => {
  beforeEach(() => {
    localStorage.clear()
    vi.restoreAllMocks()
  })

  it('should start with empty cart', () => {
    render(
      <CartProvider>
        <TestComponent />
      </CartProvider>
    )
    expect(screen.getByTestId('count').textContent).toBe('0')
    expect(screen.getByTestId('total').textContent).toBe('0')
    expect(screen.getByTestId('items').textContent).toBe('0')
  })

  it('should add item to cart', async () => {
    const user = userEvent.setup()
    render(
      <CartProvider>
        <TestComponent />
      </CartProvider>
    )
    await user.click(screen.getByText('Add'))
    await waitFor(() => {
      expect(screen.getByTestId('items').textContent).toBe('1')
      expect(screen.getByTestId('count').textContent).toBe('2')
      expect(screen.getByTestId('total').textContent).toBe('199.98')
    })
  })

  it('should increment quantity for existing item', async () => {
    const user = userEvent.setup()
    render(
      <CartProvider>
        <TestComponent />
      </CartProvider>
    )
    await user.click(screen.getByText('Add'))
    await user.click(screen.getByText('Add'))
    await waitFor(() => {
      expect(screen.getByTestId('items').textContent).toBe('1')
      expect(screen.getByTestId('count').textContent).toBe('4')
    })
  })

  it('should remove item from cart', async () => {
    const user = userEvent.setup()
    render(
      <CartProvider>
        <TestComponent />
      </CartProvider>
    )
    await user.click(screen.getByText('Add'))
    await waitFor(() => {
      expect(screen.getByTestId('items').textContent).toBe('1')
    })
    await user.click(screen.getByText('Remove'))
    await waitFor(() => {
      expect(screen.getByTestId('items').textContent).toBe('0')
      expect(screen.getByTestId('count').textContent).toBe('0')
    })
  })

  it('should update item quantity', async () => {
    const user = userEvent.setup()
    render(
      <CartProvider>
        <TestComponent />
      </CartProvider>
    )
    await user.click(screen.getByText('Add'))
    await waitFor(() => {
      expect(screen.getByTestId('count').textContent).toBe('2')
    })
    await user.click(screen.getByText('Update'))
    await waitFor(() => {
      expect(screen.getByTestId('count').textContent).toBe('5')
      expect(screen.getByTestId('total').textContent).toBe('499.95')
    })
  })

  it('should clear cart', async () => {
    const user = userEvent.setup()
    render(
      <CartProvider>
        <TestComponent />
      </CartProvider>
    )
    await user.click(screen.getByText('Add'))
    await waitFor(() => {
      expect(screen.getByTestId('items').textContent).toBe('1')
    })
    await user.click(screen.getByText('Clear'))
    await waitFor(() => {
      expect(screen.getByTestId('items').textContent).toBe('0')
      expect(screen.getByTestId('count').textContent).toBe('0')
      expect(screen.getByTestId('total').textContent).toBe('0')
    })
  })

  it('should throw error when useCart is used outside provider', () => {
    const consoleError = vi.spyOn(console, 'error').mockImplementation(() => {})
    expect(() => render(<TestComponent />)).toThrow('useCart must be used within a CartProvider')
    consoleError.mockRestore()
  })
})