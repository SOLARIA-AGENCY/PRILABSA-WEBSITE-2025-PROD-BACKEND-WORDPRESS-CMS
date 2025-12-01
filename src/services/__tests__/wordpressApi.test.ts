/**
 * WordPress API Service Tests
 * Tests for helper functions and data transformation
 */

import { describe, it, expect, vi, beforeEach } from 'vitest'
import {
  useProducts,
  useProduct,
  getBenefits,
  parsePresentation,
  getImageUrl
} from '../wordpressApi'

// Mock global fetch
const mockFetch = vi.fn()
global.fetch = mockFetch

describe('WordPress API Helper Functions', () => {

  // ==========================================
  // getBenefits Tests
  // ==========================================
  describe('getBenefits', () => {
    it('should return empty array when acf is undefined', () => {
      expect(getBenefits(undefined)).toEqual([])
    })

    it('should return empty array when acf is null', () => {
      expect(getBenefits(null)).toEqual([])
    })

    it('should return empty array when no benefits exist', () => {
      expect(getBenefits({})).toEqual([])
    })

    it('should extract single benefit', () => {
      const acf = { beneficio_1_es: 'First benefit' }
      expect(getBenefits(acf)).toEqual(['First benefit'])
    })

    it('should extract all three benefits in order', () => {
      const acf = {
        beneficio_1_es: 'First',
        beneficio_2_es: 'Second',
        beneficio_3_es: 'Third'
      }
      expect(getBenefits(acf)).toEqual(['First', 'Second', 'Third'])
    })

    it('should skip missing benefits but keep order', () => {
      const acf = {
        beneficio_1_es: 'First',
        beneficio_3_es: 'Third'
      }
      expect(getBenefits(acf)).toEqual(['First', 'Third'])
    })

    it('should skip empty string benefits', () => {
      const acf = {
        beneficio_1_es: 'First',
        beneficio_2_es: '',
        beneficio_3_es: 'Third'
      }
      expect(getBenefits(acf)).toEqual(['First', 'Third'])
    })

    it('should handle real WordPress ACF data', () => {
      const acf = {
        beneficio_1_es: 'Liberación controlada de bacterias beneficiosas',
        beneficio_2_es: 'Reduce compuestos tóxicos en estanques',
        beneficio_3_es: 'Mejora calidad del agua',
        other_field: 'ignored'
      }
      expect(getBenefits(acf)).toEqual([
        'Liberación controlada de bacterias beneficiosas',
        'Reduce compuestos tóxicos en estanques',
        'Mejora calidad del agua'
      ])
    })
  })

  // ==========================================
  // parsePresentation Tests
  // ==========================================
  describe('parsePresentation', () => {
    it('should return empty array for empty string', () => {
      expect(parsePresentation('')).toEqual([])
    })

    it('should return empty array for undefined (cast to string)', () => {
      expect(parsePresentation(undefined as unknown as string)).toEqual([])
    })

    it('should extract items from simple <li> tags', () => {
      const html = '<li>Item 1</li><li>Item 2</li>'
      expect(parsePresentation(html)).toEqual(['Item 1', 'Item 2'])
    })

    it('should handle <li> tags with attributes', () => {
      const html = '<li class="item">First</li><li id="second">Second</li>'
      expect(parsePresentation(html)).toEqual(['First', 'Second'])
    })

    it('should strip HTML and return single item when no <li> tags', () => {
      const html = '<p>Plain paragraph text</p>'
      expect(parsePresentation(html)).toEqual(['Plain paragraph text'])
    })

    it('should filter empty items', () => {
      const html = '<li>Item 1</li><li></li><li>Item 3</li>'
      expect(parsePresentation(html)).toEqual(['Item 1', 'Item 3'])
    })

    it('should trim whitespace from items', () => {
      const html = '<li>  Spaced item  </li><li>\nNewline\n</li>'
      expect(parsePresentation(html)).toEqual(['Spaced item', 'Newline'])
    })

    it('should handle real WordPress presentation HTML', () => {
      const html = `<ul>
        <li>Tabletas de 100g</li>
        <li>Bote con 36 tabletas</li>
        <li>Caja con 4 botes</li>
      </ul>`
      expect(parsePresentation(html)).toEqual([
        'Tabletas de 100g',
        'Bote con 36 tabletas',
        'Caja con 4 botes'
      ])
    })

    it('should handle plain text without HTML', () => {
      const text = 'Sacos de 25kg'
      expect(parsePresentation(text)).toEqual(['Sacos de 25kg'])
    })
  })

  // ==========================================
  // getImageUrl Tests
  // ==========================================
  describe('getImageUrl', () => {
    it('should return placeholder when no image data exists', () => {
      expect(getImageUrl({})).toBe('/assets/images/placeholder-product.jpg')
    })

    it('should return placeholder when wp is null', () => {
      expect(getImageUrl(null)).toBe('/assets/images/placeholder-product.jpg')
    })

    it('should extract URL from embedded featured media', () => {
      const wp = {
        _embedded: {
          'wp:featuredmedia': [
            { source_url: 'https://productos.prilabsa.com/wp-content/uploads/image.jpg' }
          ]
        }
      }
      expect(getImageUrl(wp)).toBe('https://productos.prilabsa.com/wp-content/uploads/image.jpg')
    })

    it('should fallback to ACF image URL when no embedded media', () => {
      const wp = {
        acf: {
          imagen_producto: {
            url: 'https://productos.prilabsa.com/wp-content/uploads/acf-image.jpg'
          }
        }
      }
      expect(getImageUrl(wp)).toBe('https://productos.prilabsa.com/wp-content/uploads/acf-image.jpg')
    })

    it('should prefer embedded media over ACF image', () => {
      const wp = {
        _embedded: {
          'wp:featuredmedia': [
            { source_url: 'https://embedded.jpg' }
          ]
        },
        acf: {
          imagen_producto: { url: 'https://acf.jpg' }
        }
      }
      expect(getImageUrl(wp)).toBe('https://embedded.jpg')
    })

    it('should return placeholder when embedded media has no source_url', () => {
      const wp = {
        _embedded: {
          'wp:featuredmedia': [{}]
        }
      }
      expect(getImageUrl(wp)).toBe('/assets/images/placeholder-product.jpg')
    })

    it('should return placeholder when featured media array is empty', () => {
      const wp = {
        _embedded: {
          'wp:featuredmedia': []
        }
      }
      expect(getImageUrl(wp)).toBe('/assets/images/placeholder-product.jpg')
    })
  })

  // ==========================================
  // Hook Export Tests
  // ==========================================
  describe('Hooks Export', () => {
    it('should export useProducts hook', () => {
      expect(useProducts).toBeDefined()
      expect(typeof useProducts).toBe('function')
    })

    it('should export useProduct hook', () => {
      expect(useProduct).toBeDefined()
      expect(typeof useProduct).toBe('function')
    })
  })
})

// ==========================================
// Integration-style tests (require React)
// ==========================================
describe('WordPress API Data Transformation', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should transform WordPress product to frontend format', () => {
    // This tests the transformation logic conceptually
    const wpProduct = {
      id: 204,
      slug: 'pondtoss',
      title: { rendered: 'PondToss' },
      acf: {
        codigo: 'PB002',
        categoria: 'probioticos',
        nombre_producto_es: 'PondToss',
        descripcion_es: 'Tabletas de probióticos',
        beneficio_1_es: 'Liberación controlada',
        beneficio_2_es: 'Reduce H2S',
        beneficio_3_es: 'Mejora calidad',
        presentacion_es: '<li>Tabletas 100g</li><li>Bote 36 tabs</li>',
        ficha_tecnica_pdf: 150
      },
      _embedded: {
        'wp:featuredmedia': [
          { source_url: 'https://productos.prilabsa.com/wp-content/uploads/pondtoss.jpg' }
        ]
      }
    }

    // Test transformation helpers work with real data
    expect(getBenefits(wpProduct.acf)).toEqual([
      'Liberación controlada',
      'Reduce H2S',
      'Mejora calidad'
    ])

    expect(parsePresentation(wpProduct.acf.presentacion_es)).toEqual([
      'Tabletas 100g',
      'Bote 36 tabs'
    ])

    expect(getImageUrl(wpProduct)).toBe(
      'https://productos.prilabsa.com/wp-content/uploads/pondtoss.jpg'
    )
  })
})
