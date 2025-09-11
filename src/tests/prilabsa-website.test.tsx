import React from 'react';
import { render, screen } from './test-utils'
import { describe, it, expect, vi } from 'vitest'
import PrilabsaWebsite from '../pages/PrilabsaWebsite';
import '@testing-library/jest-dom';

describe('PrilabsaWebsite', () => {
  it('renders hero section heading', () => {
    render(<PrilabsaWebsite />)
    const headings = screen.getAllByText(/Somos proveedores de/i)
    const heading = headings.find(h => h.tagName === 'H1');
    expect(heading).toBeInTheDocument()
    if (heading) {
      expect(heading.tagName).toBe('H1')
    }
  }, 10000)

  it('renders navigation links', () => {
    render(<PrilabsaWebsite />)
    
    // Links de navegación del header
    const inicioLinks = screen.getAllByRole('link', { name: 'INICIO' })
    const quienesLinks = screen.getAllByRole('link', { name: 'QUIENES SOMOS' })
    const productosLinks = screen.getAllByRole('link', { name: 'PRODUCTOS' })
    
    expect(inicioLinks.length).toBeGreaterThan(0)
    expect(quienesLinks.length).toBeGreaterThan(0)
    expect(productosLinks.length).toBeGreaterThan(0)
  }, 10000)

  it('renders without console errors', () => {
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {})
    render(<PrilabsaWebsite />)
    expect(consoleSpy).not.toHaveBeenCalled()
    consoleSpy.mockRestore()
  }, 10000)
})