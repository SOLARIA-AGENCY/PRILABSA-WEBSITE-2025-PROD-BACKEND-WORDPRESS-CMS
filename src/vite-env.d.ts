/// <reference types="vite/client" />
/// <reference types="@testing-library/jest-dom" />

interface ImportMetaEnv {
  readonly VITE_REACT_19: string
  readonly VITE_TAILWIND_4: string
  readonly VITE_CYPRESS_14: string
  readonly VITE_DEV_MODE: string
  readonly DEV: string
  readonly PROD: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}