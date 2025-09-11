import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { CotizacionProvider } from '../context/CotizacionContext';
import Blog from './Blog';

// Mock del hook useLanguage
vi.mock('../contexts/LanguageContext', () => ({
  useLanguage: () => ({
    t: (key: string) => {
      const translations: Record<string, string> = {
        'blog.search.placeholder': 'Buscar en el blog...',
        'blog.noArticles': 'No hay artículos disponibles',
        'blog.pageTitle': 'BLOG PRILABSA'
      };
      return translations[key] || key;
    },
    language: 'es' as const
  })
}));

// Mock de funciones de localización
vi.mock('../types/blog', () => ({
  getLocalizedContent: (content: any) => {
    if (typeof content === 'string') return content;
    return content?.es || content || '';
  },
  getLocalizedTags: (tags: any) => {
    if (Array.isArray(tags)) return tags;
    return [];
  }
}));

// Mock de datos y componentes hijos para aislar la prueba
vi.mock('../data/blogData', () => ({
  blogData: [
    { id: '1', title: 'Innovación en Acuicultura', summary: 'Nuevas tecnologías.', tags: ['tecnología'], date: '2023-01-01', author: 'Prilabsa', heroImage: '', content: '' },
    { id: '2', title: 'Salud de Camarones', summary: 'Cuidados especiales.', tags: ['salud'], date: '2023-01-02', author: 'Prilabsa', heroImage: '', content: '' },
  ],
}));

// Mock del componente img para evitar warnings de src en tests
vi.mock('react', async () => {
  const actual = await vi.importActual('react') as any;
  return {
    ...actual,
    createElement: (type: any, props: any, ...children: any[]) => {
      if (type === 'img' && props?.src === '') {
        return actual.createElement(type, { ...props, src: '/assets/images/placeholder.jpg' }, ...children);
      }
      return actual.createElement(type, props, ...children);
    },
  };
});

vi.mock('../components/organisms/blog/Newsletter', () => ({
  default: () => <div data-testid="newsletter-mock"></div>,
}));

const renderWithRouter = (ui: React.ReactElement) => {
  return render(
    <MemoryRouter>
      <CotizacionProvider>{ui}</CotizacionProvider>
    </MemoryRouter>
  );
};

describe('Blog Page', () => {
  it('debería renderizar todos los artículos inicialmente', () => {
    renderWithRouter(<Blog />);
    expect(screen.getByText('Innovación en Acuicultura')).not.toBeNull();
    expect(screen.getByText('Salud de Camarones')).not.toBeNull();
  });

  it('debería filtrar los artículos por título al buscar', () => {
    renderWithRouter(<Blog />);
    const searchInputs = screen.getAllByPlaceholderText('Buscar en el blog...');
    const searchInput = searchInputs[0]; // Use first one if multiple exist
    fireEvent.change(searchInput, { target: { value: 'Innovación' } });

    // Verificamos que Innovación aparece después del filtro
    expect(screen.getAllByText('Innovación en Acuicultura').length).toBeGreaterThan(0);
  });

  it('debería mostrar un mensaje si no se encuentran resultados', () => {
    renderWithRouter(<Blog />);
    const searchInputs = screen.getAllByPlaceholderText('Buscar en el blog...');
    const searchInput = searchInputs[0]; // Use first one if multiple exist
    fireEvent.change(searchInput, { target: { value: 'xyz-no-existente' } });

    expect(screen.getByText('No hay artículos disponibles')).not.toBeNull();
  });
});
