/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_HOST: string
  readonly VITE_API_PATH: string
  readonly VITE_UPLOAD_HOST: string
  readonly VITE_UPLOAD_PATH: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
