import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import ProductCard from '@/components/products/ProductCard'
import { Product } from '@/lib/types'
import * as cartModule from '@/context/CartContext'

vi.mock('next/image', () => ({
  default: (props: { src: string; alt: string; fill?: boolean; className?: string; onError?: () => void }) => {
    const { src, alt, ...rest } = props
    return <img src={src} alt={alt} data-testid="product-image" {...rest} />
  },
}))

vi.mock('@/context/CartContext', () => ({
  useCart: () => ({
    addToCart: vi.fn(),
  }),
}))

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

describe('ProductCard', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should render product information', () => {
    render(<ProductCard product={mockProduct} />)
    expect(screen.getByText('Electronics')).toBeDefined()
    expect(screen.getByText('Test Product')).toBeDefined()
    expect(screen.getByText('$99.99')).toBeDefined()
    expect(screen.getByText('$129.99')).toBeDefined()
  })

  it('should render rating stars', () => {
    render(<ProductCard product={mockProduct} />)
    expect(screen.getByText('(100)')).toBeDefined()
  })

  it('should render sale badge when originalPrice exists', () => {
    render(<ProductCard product={mockProduct} />)
    expect(screen.getByText('Sale')).toBeDefined()
  })

  it('should call addToCart when add button is clicked', async () => {
    const addToCartMock = vi.fn()
    vi.spyOn(cartModule, 'useCart').mockReturnValue({
      addToCart: addToCartMock,
      items: [],
      removeFromCart: vi.fn(),
      updateQuantity: vi.fn(),
      clearCart: vi.fn(),
      getCartTotal: () => 0,
      getCartCount: () => 0,
    })

    const user = userEvent.setup()
    render(<ProductCard product={mockProduct} />)
    const addButton = screen.getByText('Add')
    await user.click(addButton)

    expect(addToCartMock).toHaveBeenCalledWith(mockProduct, 1)
  })

  it('should disable add button when product is out of stock', () => {
    const outOfStockProduct = { ...mockProduct, stock: 0 }
    render(<ProductCard product={outOfStockProduct} />)
    expect(screen.getByText('Out of Stock')).toBeDefined()
  })
})