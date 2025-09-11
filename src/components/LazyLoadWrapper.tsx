import React, { Suspense, ComponentType } from 'react';

interface LazyLoadWrapperProps {
  children: React.ReactNode;
  fallback?: React.ComponentType;
  errorBoundary?: React.ComponentType<{ children: React.ReactNode }>;
}

// Default loading fallback
const DefaultFallback: React.FC = () => (
  <div className="flex items-center justify-center min-h-[200px]">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
  </div>
);

// Default error boundary
const DefaultErrorBoundary: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <React.Fragment>
      {children}
    </React.Fragment>
  );
};

export const LazyLoadWrapper: React.FC<LazyLoadWrapperProps> = ({
  children,
  fallback: FallbackComponent = DefaultFallback,
  errorBoundary: ErrorBoundaryComponent = DefaultErrorBoundary
}) => {
  return (
    <ErrorBoundaryComponent>
      <Suspense fallback={<FallbackComponent />}>
        {children}
      </Suspense>
    </ErrorBoundaryComponent>
  );
};

// HOC for lazy loading components
// eslint-disable-next-line react-refresh/only-export-components
export const withLazyLoading = <P extends object>(
  Component: ComponentType<P>,
  fallback?: React.ComponentType
) => {
  const LazyComponent = React.lazy(() => Promise.resolve({ default: Component }));
  
  return (props: P) => (
    <LazyLoadWrapper fallback={fallback}>
      <LazyComponent {...props} />
    </LazyLoadWrapper>
  );
};