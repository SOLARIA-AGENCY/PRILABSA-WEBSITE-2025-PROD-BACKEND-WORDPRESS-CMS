/**
 * Feature Flags Configuration
 * PRILABSA-WEBSITE-2025 - React 19 Migration
 */

export const FEATURES = {
  REACT_19: import.meta.env.VITE_REACT_19 === 'true',
  TAILWIND_4: import.meta.env.VITE_TAILWIND_4 === 'true',
  CYPRESS_14: import.meta.env.VITE_CYPRESS_14 === 'true',
  DEV_MODE: import.meta.env.VITE_DEV_MODE === 'true',
  COTIZADOR: import.meta.env.VITE_COTIZADOR === 'true',
  SHOW_SOLARIA_BADGE: import.meta.env.VITE_SHOW_SOLARIA_BADGE === 'true',
  ENABLE_COTIZACION_ROUTES: import.meta.env.VITE_ENABLE_COTIZACION_ROUTES === 'true'
} as const;

export type FeatureFlag = keyof typeof FEATURES;

/**
 * Check if a feature is enabled
 */
export const isFeatureEnabled = (feature: FeatureFlag): boolean => {
  return FEATURES[feature];
};

/**
 * Get all enabled features
 */
export const getEnabledFeatures = (): FeatureFlag[] => {
  return Object.entries(FEATURES)
    .filter(([, enabled]) => enabled)
    .map(([feature]) => feature as FeatureFlag);
};

/**
 * Development utilities
 */
export const isDevelopment = (): boolean => {
  return import.meta.env.DEV || FEATURES.DEV_MODE;
};

export const isProduction = (): boolean => {
  return import.meta.env.PROD && !FEATURES.DEV_MODE;
};