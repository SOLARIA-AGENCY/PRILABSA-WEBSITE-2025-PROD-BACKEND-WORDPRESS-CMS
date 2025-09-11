import { describe, it, expect } from 'vitest'
import { isValidEmail } from '../utils/validation'

describe('isValidEmail', () => {
  it('validates correct email formats', () => {
    expect(isValidEmail('test@example.com')).toBe(true)
    expect(isValidEmail('user.name+tag@domain.co')).toBe(true)
  })

  it('invalidates incorrect email formats', () => {
    expect(isValidEmail('invalid-email')).toBe(false)
    expect(isValidEmail('missing@domain')).toBe(false)
  })
}) 