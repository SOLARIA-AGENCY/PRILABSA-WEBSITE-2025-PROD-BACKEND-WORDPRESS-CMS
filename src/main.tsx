import React from 'react';
import ReactDOM from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { I18nextProvider } from 'react-i18next';
import App from './App';
import './index.css';
import { LanguageProvider } from './contexts/LanguageContext';
import { initPerformanceMonitoring } from './utils/webVitals';
import { preloadCritical } from './utils/lazyComponents';
import './config/pdf-config';
import { i18n } from './i18n';

const queryClient = new QueryClient();

// Initialize performance monitoring
initPerformanceMonitoring();

// Preload critical resources
preloadCritical();

const AppWithProviders = () => {
  return (
    <I18nextProvider i18n={i18n}>
      <LanguageProvider>
        <QueryClientProvider client={queryClient}>
          <App />
        </QueryClientProvider>
      </LanguageProvider>
    </I18nextProvider>
  );
};

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <AppWithProviders />
  </React.StrictMode>
);