import { render, RenderOptions } from '@testing-library/react';
import { waitFor } from '@testing-library/dom';
import { BrowserRouter } from 'react-router-dom';
import { LanguageProvider } from './contexts/LanguageContext';
import { CotizacionProvider } from './context/CotizacionContext';
import React, { ReactElement } from 'react';

// Universal test wrapper with all required providers
const AllTheProviders = ({ children }: { children: React.ReactNode }) => {
  return (
    <BrowserRouter>
      <LanguageProvider>
        <CotizacionProvider>
          {children}
        </CotizacionProvider>
      </LanguageProvider>
    </BrowserRouter>
  );
};

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>,
) => render(ui, { wrapper: AllTheProviders, ...options });

// Enhanced query helpers for handling multiple elements
export const getByTextContent = (text: string | RegExp) => {
  return (content: string, element?: Element | null) => {
    if (typeof text === 'string') {
      return content.includes(text);
    } else {
      return text.test(content);
    }
  };
};

// Helper for handling fragmented text (like "Descargar Ficha Técnica (PDF)")
export const getByFragmentedText = (fragments: string[]) => {
  return (content: string, element?: Element | null) => {
    return fragments.some(fragment => content.includes(fragment));
  };
};

// Enhanced waitFor with longer timeout
export const waitForElement = async (callback: () => void, timeout = 15000) => {
  return waitFor(callback, { timeout });
};

export * from '@testing-library/react';
export { customRender as render };