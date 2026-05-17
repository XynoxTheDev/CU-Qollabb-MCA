// @vitest-environment node
import { describe, it, expect } from 'vitest'
import { hashPassword, verifyPassword, createToken, verifyToken } from '@/lib/server/auth'

describe('auth.ts', () => {
  describe('hashPassword', () => {
    it('should hash a password successfully', async () => {
      const password = 'testPassword123'
      const hashed = await hashPassword(password)
      expect(hashed).toBeDefined()
      expect(typeof hashed).toBe('string')
      expect(hashed.length).toBeGreaterThan(0)
    })

    it('should return different hashes for same password (salting)', async () => {
      const password = 'testPassword123'
      const hash1 = await hashPassword(password)
      const hash2 = await hashPassword(password)
      expect(hash1).not.toBe(hash2)
    })
  })

  describe('verifyPassword', () => {
    it('should return true for correct password', async () => {
      const password = 'testPassword123'
      const hashed = await hashPassword(password)
      const result = await verifyPassword(password, hashed)
      expect(result).toBe(true)
    })

    it('should return false for incorrect password', async () => {
      const password = 'testPassword123'
      const hashed = await hashPassword(password)
      const result = await verifyPassword('wrongPassword', hashed)
      expect(result).toBe(false)
    })
  })

  describe('createToken', () => {
    it('should create a valid JWT token', async () => {
      const payload = { userId: '123', email: 'test@example.com', role: 'customer' }
      const token = await createToken(payload)
      expect(token).toBeDefined()
      expect(typeof token).toBe('string')
      expect(token.split('.')).toHaveLength(3)
    })
  })

  describe('verifyToken', () => {
    it('should verify and return valid token payload', async () => {
      const payload = { userId: '123', email: 'test@example.com', role: 'customer' }
      const token = await createToken(payload)
      const verified = await verifyToken(token)
      expect(verified).toBeDefined()
      expect(verified?.userId).toBe('123')
      expect(verified?.email).toBe('test@example.com')
      expect(verified?.role).toBe('customer')
    })

    it('should return null for invalid token', async () => {
      const result = await verifyToken('invalid-token-string')
      expect(result).toBeNull()
    })

    it('should return null for tampered token', async () => {
      const payload = { userId: '123', email: 'test@example.com', role: 'customer' }
      const token = await createToken(payload)
      const tamperedToken = token.slice(0, -5) + 'xxxxx'
      const result = await verifyToken(tamperedToken)
      expect(result).toBeNull()
    })
  })
})