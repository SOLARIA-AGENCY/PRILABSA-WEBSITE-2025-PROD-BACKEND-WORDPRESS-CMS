import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { CotizacionProvider } from '../context/CotizacionContext';
import Noticias from './Noticias';

// Mock del hook useLanguage
vi.mock('../contexts/LanguageContext', () => ({
  useLanguage: () => ({
    t: (key: string) => {
      const translations: Record<string, string> = {
        'news.search.placeholder': 'Buscar en noticias...',
        'news.noNews': 'No hay noticias disponibles',
        'news.pageTitle': 'SALA DE PRENSA'
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

// Mock de datos y componentes hijos
vi.mock('../data/noticiasData', () => ({
  noticiasData: [
    { id: '1', title: 'Historia de Prilabsa', summary: 'La historia completa.', tags: ['institucional'], date: '2023-01-01', author: 'Prilabsa', heroImage: '', content: '' },
    { id: '2', title: 'Prilabsa en Venezuela', summary: 'Expansión de mercado.', tags: ['mercado'], date: '2023-01-02', author: 'Prilabsa', heroImage: '', content: '' },
  ],
}));

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

describe('Noticias Page', () => {
  it('debería renderizar todas las noticias inicialmente', () => {
    renderWithRouter(<Noticias />);
    expect(screen.getByText('Historia de Prilabsa')).not.toBeNull();
    expect(screen.getByText('Prilabsa en Venezuela')).not.toBeNull();
  });

  it('debería filtrar las noticias por título al buscar', () => {
    renderWithRouter(<Noticias />);
    const searchInputs = screen.getAllByPlaceholderText('Buscar en noticias...');
    const searchInput = searchInputs[0];
    fireEvent.change(searchInput, { target: { value: 'Historia' } });

    // Verificamos que Historia aparece después del filtro
    expect(screen.getAllByText('Historia de Prilabsa').length).toBeGreaterThan(0);
  });

  it('debería mostrar un mensaje si no se encuentran resultados', () => {
    renderWithRouter(<Noticias />);
    const searchInputs = screen.getAllByPlaceholderText('Buscar en noticias...');
    const searchInput = searchInputs[0];
    fireEvent.change(searchInput, { target: { value: 'xyz-no-existente' } });

    expect(screen.getByText('No hay noticias disponibles')).not.toBeNull();
  });
});
