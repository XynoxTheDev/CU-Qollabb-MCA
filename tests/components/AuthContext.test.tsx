import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { AuthProvider, useAuth } from '@/context/AuthContext'
import React from 'react'

const TestComponent = () => {
  const { user, isAuthenticated, isLoading, login, logout, register } = useAuth()

  return (
    <div>
      <p data-testid="loading">{isLoading ? 'loading' : 'ready'}</p>
      <p data-testid="authenticated">{isAuthenticated ? 'yes' : 'no'}</p>
      <p data-testid="user">{user ? user.email : 'no-user'}</p>
      <button onClick={() => login('john@example.com', 'password123')}>Login</button>
      <button onClick={() => logout()}>Logout</button>
      <button onClick={() => register('New User', 'new@example.com', 'password')}>Register</button>
    </div>
  )
}

describe('AuthContext', () => {
  beforeEach(() => {
    localStorage.clear()
    vi.restoreAllMocks()
  })

  it('should expose isLoading=false after mount', () => {
    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    )
    expect(screen.getByTestId('loading').textContent).toBe('ready')
  })

  it('should start as not authenticated', async () => {
    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    )
    await waitFor(() => {
      expect(screen.getByTestId('authenticated').textContent).toBe('no')
    })
  })

  it('should login successfully with valid credentials', async () => {
    const user = userEvent.setup()
    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    )
    await waitFor(() => {
      expect(screen.getByTestId('loading').textContent).toBe('ready')
    })
    await user.click(screen.getByText('Login'))
    await waitFor(() => {
      expect(screen.getByTestId('authenticated').textContent).toBe('yes')
      expect(screen.getByTestId('user').textContent).toBe('john@example.com')
    })
  })

  it('should logout successfully', async () => {
    const user = userEvent.setup()
    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    )
    await waitFor(() => {
      expect(screen.getByTestId('loading').textContent).toBe('ready')
    })
    await user.click(screen.getByText('Login'))
    await waitFor(() => {
      expect(screen.getByTestId('authenticated').textContent).toBe('yes')
    })
    await user.click(screen.getByText('Logout'))
    await waitFor(() => {
      expect(screen.getByTestId('authenticated').textContent).toBe('no')
      expect(screen.getByTestId('user').textContent).toBe('no-user')
    })
  })

  it('should register a new user successfully', async () => {
    const user = userEvent.setup()
    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    )
    await waitFor(() => {
      expect(screen.getByTestId('loading').textContent).toBe('ready')
    })
    await user.click(screen.getByText('Register'))
    await waitFor(() => {
      expect(screen.getByTestId('authenticated').textContent).toBe('yes')
      expect(screen.getByTestId('user').textContent).toBe('new@example.com')
    })
  })

  it('should throw error when useAuth is used outside provider', () => {
    const consoleError = vi.spyOn(console, 'error').mockImplementation(() => {})
    expect(() => render(<TestComponent />)).toThrow('useAuth must be used within an AuthProvider')
    consoleError.mockRestore()
  })
})