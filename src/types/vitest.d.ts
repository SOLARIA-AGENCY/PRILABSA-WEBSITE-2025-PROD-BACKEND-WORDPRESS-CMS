/// <reference types="@testing-library/jest-dom" />

import type { TestingLibraryMatchers } from '@testing-library/jest-dom/matchers';
import 'vitest';

declare module 'vitest' {
  interface Assertion<T = any> extends TestingLibraryMatchers<T, void> {
    // Vitest assertion extensions
    toHaveLength(length: number): Assertion<T>;
  }
  interface AsymmetricMatchersContaining extends TestingLibraryMatchers<any, void> {
    // Asymmetric matcher extensions
    toHaveLength(length: number): AsymmetricMatchersContaining;
  }
}

// Global type declarations
declare global {
  interface Window {
    matchMedia: (query: string) => MediaQueryList;
    requestAnimationFrame: (callback: FrameRequestCallback) => number;
    cancelAnimationFrame: (handle: number) => void;
    requestIdleCallback: (callback: IdleRequestCallback, options?: IdleRequestOptions) => number;
    cancelIdleCallback: (handle: number) => void;
    localStorage: Storage;
    sessionStorage: Storage;
  }
  
  var IntersectionObserver: {
    prototype: IntersectionObserver;
    new(callback: IntersectionObserverCallback, options?: IntersectionObserverInit): IntersectionObserver;
  };
  
  var ResizeObserver: {
    prototype: ResizeObserver;
    new(callback: ResizeObserverCallback): ResizeObserver;
  };
  
  function requestAnimationFrame(callback: FrameRequestCallback): number;
  function cancelAnimationFrame(handle: number): void;
  function requestIdleCallback(callback: IdleRequestCallback, options?: IdleRequestOptions): number;
  function cancelIdleCallback(handle: number): void;
  
  var fetch: (input: RequestInfo | URL, init?: RequestInit) => Promise<Response>;
  
  namespace NodeJS {
    interface Global {
      requestAnimationFrame: (callback: FrameRequestCallback) => number;
      cancelAnimationFrame: (handle: number) => void;
      requestIdleCallback: (callback: IdleRequestCallback, options?: IdleRequestOptions) => number;
      cancelIdleCallback: (handle: number) => void;
      fetch: (input: RequestInfo | URL, init?: RequestInit) => Promise<Response>;
      IntersectionObserver: any;
      ResizeObserver: any;
      URL: {
        createObjectURL: (object: any) => string;
        revokeObjectURL: (url: string) => void;
      };
    }
  }
}

export {};