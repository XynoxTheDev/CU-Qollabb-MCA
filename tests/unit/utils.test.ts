import { describe, it, expect } from 'vitest'
import { cn } from '@/lib/utils'

describe('utils.ts', () => {
  describe('cn', () => {
    it('should merge class names correctly', () => {
      const result = cn('class1', 'class2')
      expect(result).toBe('class1 class2')
    })

    it('should handle conditional classes', () => {
      const result = cn('class1', false && 'class2', 'class3')
      expect(result).toBe('class1 class3')
    })

    it('should handle empty inputs', () => {
      const result = cn()
      expect(result).toBe('')
    })

    it('should handle objects with truthy values', () => {
      const result = cn({ 'class1': true, 'class2': false, 'class3': true })
      expect(result).toBe('class1 class3')
    })
  })
})