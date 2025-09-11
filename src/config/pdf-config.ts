import { pdfjs } from 'react-pdf';

// Configurar el worker de PDF.js
pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  /* @vite-ignore */ 'pdfjs-dist/build/pdf.worker.min.js',
  import.meta.url
).toString();

// Exportar la configuración para uso en otros archivos
export const PDF_CONFIG = {
  workerSrc: pdfjs.GlobalWorkerOptions.workerSrc
};