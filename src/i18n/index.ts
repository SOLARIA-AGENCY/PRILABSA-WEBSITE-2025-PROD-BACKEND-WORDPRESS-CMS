// Main i18n entry point
export { default as i18n } from './config';
export * from './hooks';
export * from './utils';

// Re-export react-i18next for convenience
export { useTranslation, Trans, Translation, I18nextProvider } from 'react-i18next';