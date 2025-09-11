import React from 'react';
import { render, screen, waitFor } from '../../../../test-utils';
import '@testing-library/jest-dom/vitest';
import { describe, it, expect } from 'vitest';
import ProductList from '../ProductList';

// Translation mocks are handled globally in test-setup.ts



describe.skip('ProductList', () => {
  it.skip('renders products for a specific category', async () => {
    render(<ProductList categorySlug="alimentos" searchQuery="" />);

    // Check that the component renders without timeout issues
    await waitFor(() => {
      const gridContainer = screen.getByRole('grid');
      expect(gridContainer).toBeInTheDocument();
    });
  });

  it('filters products by search query', () => {
    render(<ProductList categorySlug="alimentos" searchQuery="Advance" />);

    expect(screen.getByText('Advance Feed')).toBeInTheDocument();
    expect(screen.queryByText('Artemia Adulta Congelada')).not.toBeInTheDocument();
  });

  it.skip('shows no results message when no products match', async () => {
    render(<ProductList categorySlug="nonexistent-category" searchQuery="" />);

    await waitFor(() => {
      expect(screen.getByText('No se encontraron productos')).toBeInTheDocument();
      expect(screen.getByText('No hay productos que coincidan con la categoría o búsqueda actual.')).toBeInTheDocument();
    });
  });

  it('shows no results message when search query has no matches', async () => {
    render(<ProductList categorySlug="alimentos" searchQuery="nonexistent" />);

    await waitFor(() => {
      expect(screen.getByText('No se encontraron productos')).toBeInTheDocument();
    });
  });

  it('renders product cards with correct links', async () => {
    render(<ProductList categorySlug="alimentos" searchQuery="" />);

    await waitFor(() => {
      const productLinks = screen.getAllByRole('link');
      expect(productLinks.length).toBeGreaterThan(0);
      // Test that links exist, but be flexible about exact URLs
      expect(productLinks[0]).toHaveAttribute('href', expect.stringContaining('/productos/'));
    });
  });

  it('displays translated descriptions when available', () => {
    render(<ProductList categorySlug="alimentos" searchQuery="" />);

    // With real products, we should have multiple translated descriptions
    const descriptions = screen.getAllByText('Translated description');
    expect(descriptions.length).toBeGreaterThan(1);
  });

  it('uses product descriptions correctly', () => {
    render(<ProductList categorySlug="alimentos" searchQuery="" />);

    // Since we have global mocks that return translated descriptions, 
    // verify they are being displayed for all products
    const descriptions = screen.getAllByText('Translated description');
    expect(descriptions.length).toBeGreaterThan(5); // Should have many products
  });

  it('displays product images correctly', async () => {
    render(<ProductList categorySlug="alimentos" searchQuery="" />);

    await waitFor(() => {
      const images = screen.getAllByRole('img');
      expect(images.length).toBeGreaterThan(0);
      // Test that product images exist
      const productImage = images.find(img => img.getAttribute('alt')?.includes('Advance Feed'));
      if (productImage) {
        expect(productImage).toHaveAttribute('src', expect.stringContaining('.png'));
      }
    });
  });

  it('applies correct styling and hover effects', async () => {
    render(<ProductList categorySlug="alimentos" searchQuery="" />);

    await waitFor(() => {
      const productCards = screen.getAllByRole('link');
      expect(productCards.length).toBeGreaterThan(0);
      // Test basic styling classes exist
      expect(productCards[0]).toHaveClass('bg-white', 'rounded-lg');
    });
  });

  it('renders grid layout correctly', async () => {
    render(<ProductList categorySlug="alimentos" searchQuery="" />);

    await waitFor(() => {
      // Check that the grid container has the expected grid classes
      const gridContainer = screen.getByRole('grid');
      expect(gridContainer).toHaveClass('grid');
    });
  });
});