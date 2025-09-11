import { render, screen } from './test-utils'
import { describe, it, expect, vi } from 'vitest'
import { HomePage } from '../pages/HomePage'

describe('HomePage', () => {
  it('renders PRILABSA heading', () => {
    render(<HomePage />)
    const heading = screen.getByText('PRILABSA')
    expect(heading).toBeInTheDocument()
    expect(heading.tagName).toBe('H1')
  })

  it('renders without console errors', () => {
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {})
    render(<HomePage />)
    expect(consoleSpy).not.toHaveBeenCalled()
    consoleSpy.mockRestore()
  })
})