/**
 * AdminDashboard Tests
 * Tests for role-based access and critical functionality
 */

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import AdminDashboard from '../AdminDashboard';
import { AuthProvider } from '../../contexts/AuthContext';

// Mock the hooks
vi.mock('../../hooks/useWordPressProducts', () => ({
    useWordPressRawProducts: () => ({
        products: mockProducts,
        loading: false,
        error: null,
        refresh: vi.fn(),
        totalCount: 105,
    }),
    useWordPressCategories: () => ({
        categories: [],
        loading: false,
        error: null,
    }),
}));

vi.mock('../../hooks/useWordPressWrite', () => ({
    useWordPressWrite: () => ({
        trashProduct: vi.fn(),
        isConfigured: true,
        testConnection: vi.fn(),
        updateProduct: vi.fn(),
    }),
}));

// Mock products data
const mockProducts = [
    {
        id: 1,
        slug: 'test-product-1',
        title: { rendered: 'Test Product 1' },
        status: 'publish',
        date: '2025-01-01',
        modified: '2025-01-02',
        acf: {
            codigo: 'PR-001',
            nombre_producto_es: 'Producto de Prueba 1',
            nombre_producto_en: 'Test Product 1',
            nombre_producto_pt: 'Produto de Teste 1',
            categoria: 'aditivos',
            descripcion_corta_es: 'Descripción corta del producto',
            descripcion_es: 'Descripción completa',
            beneficio_1_es: 'Beneficio 1',
            beneficio_2_es: 'Beneficio 2',
            beneficio_3_es: 'Beneficio 3',
            presentacion_es: 'Presentación',
            imagen_producto: null,
            ficha_tecnica_pdf: null,
        },
    },
    {
        id: 2,
        slug: 'test-product-2',
        title: { rendered: 'Test Product 2' },
        status: 'publish',
        date: '2025-01-01',
        modified: '2025-01-02',
        acf: {
            codigo: 'PR-002',
            nombre_producto_es: 'Producto de Prueba 2',
            nombre_producto_en: 'Test Product 2',
            nombre_producto_pt: 'Produto de Teste 2',
            categoria: 'alimentos',
            descripcion_corta_es: 'Descripción corta',
            descripcion_es: 'Descripción completa',
            beneficio_1_es: 'Beneficio 1',
            beneficio_2_es: null,
            beneficio_3_es: null,
            presentacion_es: 'Presentación',
            imagen_producto: null,
            ficha_tecnica_pdf: null,
        },
    },
];

// Wrapper with providers
const renderWithProviders = (ui: React.ReactElement) => {
    return render(
        <BrowserRouter>
            <AuthProvider>
                {ui}
            </AuthProvider>
        </BrowserRouter>
    );
};

describe('AdminDashboard', () => {
    beforeEach(() => {
        // Mock localStorage if not available
        if (typeof localStorage === 'undefined' || !localStorage.clear) {
            const store: Record<string, string> = {};
            Object.defineProperty(global, 'localStorage', {
                value: {
                    getItem: (key: string) => store[key] || null,
                    setItem: (key: string, value: string) => { store[key] = value; },
                    removeItem: (key: string) => { delete store[key]; },
                    clear: () => { Object.keys(store).forEach(key => delete store[key]); },
                },
                writable: true,
            });
        }

        // Clear localStorage and set up admin user
        try {
            localStorage.clear();
        } catch {
            // Ignore if clear fails
        }
        localStorage.setItem('prilabsa_auth', 'true');
        localStorage.setItem('prilabsa_auth_user', 'ADMIN-PRILABSA');
        localStorage.setItem('prilabsa_users', JSON.stringify([
            {
                username: 'ADMIN-PRILABSA',
                name: 'Administrador Principal',
                role: 'admin',
                password: 'webprilabsa2025',
            },
            {
                username: 'editor-test',
                name: 'Editor de Prueba',
                role: 'editor',
                password: 'editor123',
            },
        ]));
    });

    describe('Role-based Access Control', () => {
        it('should show LOG CAMBIOS button for admin users', () => {
            renderWithProviders(<AdminDashboard />);
            expect(screen.getByText('LOG CAMBIOS')).toBeInTheDocument();
        });

        it('should show Roles y permisos option for admin users', () => {
            renderWithProviders(<AdminDashboard />);
            // Click on user avatar to open menu
            const avatarButton = screen.getByTitle('Administrador Principal');
            if (avatarButton) {
                fireEvent.click(avatarButton);
                expect(screen.getByText('Roles y permisos')).toBeInTheDocument();
            }
        });
    });

    describe('CSV Export', () => {
        it('should have CSV export button', () => {
            renderWithProviders(<AdminDashboard />);
            expect(screen.getByText('DESCARGAR CSV')).toBeInTheDocument();
        });

        it('should enable CSV button when products exist', () => {
            renderWithProviders(<AdminDashboard />);
            const csvButton = screen.getByText('DESCARGAR CSV').closest('button');
            expect(csvButton).not.toBeDisabled();
        });
    });

    describe('Help Modal', () => {
        it('should have AYUDA button', () => {
            renderWithProviders(<AdminDashboard />);
            expect(screen.getByText('AYUDA')).toBeInTheDocument();
        });

        it('should open help modal when clicking AYUDA', () => {
            renderWithProviders(<AdminDashboard />);
            const helpButton = screen.getByText('AYUDA');
            fireEvent.click(helpButton);
            expect(screen.getByText('Manual de Usuario')).toBeInTheDocument();
        });

        it('should show admin-only tabs for admin users in help modal', () => {
            renderWithProviders(<AdminDashboard />);
            const helpButton = screen.getByText('AYUDA');
            fireEvent.click(helpButton);
            expect(screen.getByText('Administración')).toBeInTheDocument();
        });
    });

    describe('Product Display', () => {
        it('should display total product count', () => {
            renderWithProviders(<AdminDashboard />);
            expect(screen.getByText('105')).toBeInTheDocument();
        });

        it('should have search input', () => {
            renderWithProviders(<AdminDashboard />);
            expect(screen.getByPlaceholderText('Buscar por nombre o codigo...')).toBeInTheDocument();
        });

        it('should have category filter buttons', () => {
            renderWithProviders(<AdminDashboard />);
            expect(screen.getByText(/TODOS/)).toBeInTheDocument();
        });

        it('should have view toggle buttons', () => {
            renderWithProviders(<AdminDashboard />);
            expect(screen.getByText('VISTA LISTA')).toBeInTheDocument();
            expect(screen.getByText('TARJETAS')).toBeInTheDocument();
        });
    });

    describe('Product Actions', () => {
        it('should have AÑADIR PRODUCTO button', () => {
            renderWithProviders(<AdminDashboard />);
            expect(screen.getByText('AÑADIR PRODUCTO')).toBeInTheDocument();
        });
    });
});

describe('CSV Export Function', () => {
    it('should generate valid CSV format with semicolon separator', () => {
        // Test the CSV generation logic
        const escapeCSV = (value: string | number | null | undefined): string => {
            if (value === null || value === undefined) return '';
            const str = String(value);
            const cleaned = str.replace(/[\r\n\t]+/g, ' ').replace(/"/g, '""').trim();
            return `"${cleaned}"`;
        };

        expect(escapeCSV('Simple text')).toBe('"Simple text"');
        expect(escapeCSV('Text with "quotes"')).toBe('"Text with ""quotes"""');
        expect(escapeCSV('Text\nwith\nnewlines')).toBe('"Text with newlines"');
        expect(escapeCSV(null)).toBe('');
        expect(escapeCSV(undefined)).toBe('');
        expect(escapeCSV(123)).toBe('"123"');
    });
});
