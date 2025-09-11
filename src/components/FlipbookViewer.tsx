import React, { useState, useRef, useEffect, Suspense, lazy } from 'react';

// Dynamic imports for heavy PDF libraries
const Document = lazy(() => import('react-pdf').then(module => ({ default: module.Document })));
const Page = lazy(() => import('react-pdf').then(module => ({ default: module.Page })));
const HTMLFlipBook = lazy(() => import('react-pageflip'));

// Configure worker for react-pdf dynamically
const configurePdfWorker = async () => {
  const { pdfjs } = await import('react-pdf');
  pdfjs.GlobalWorkerOptions.workerSrc = new URL(
    /* @vite-ignore */ 'pdfjs-dist/build/pdf.worker.min.js',
    import.meta.url,
  ).toString();
};

interface FlipbookViewerProps {
  pdfUrl: string;
}

interface FlipBookRef {
  pageFlip: () => {
    flipNext: () => void;
    flipPrev: () => void;
  };
}

// Component for individual pages to be rendered inside the flipbook
const PdfPage = React.forwardRef<HTMLDivElement, { pageNumber: number, width: number }>(({ pageNumber, width }, ref) => {
  return (
    <div ref={ref} className="bg-white shadow-md flex justify-center items-center">
      <Page pageNumber={pageNumber} width={width} renderTextLayer={false} renderAnnotationLayer={false} />
    </div>
  );
});

const FlipbookViewer: React.FC<FlipbookViewerProps> = ({ pdfUrl }) => {
  const [numPages, setNumPages] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [workerConfigured, setWorkerConfigured] = useState(false);
  const flipBook = useRef<FlipBookRef>(null);

  useEffect(() => {
    configurePdfWorker().then(() => {
      setWorkerConfigured(true);
    }).catch((err) => {
      console.error('Error configurando PDF worker:', err);
      setError('Error al configurar el visor de PDF');
    });
  }, []);

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }): void => {
    setNumPages(numPages);
    setLoading(false);
  };

  const onDocumentLoadError = (error: Error): void => {
    console.error('Error al cargar el documento PDF:', error);
    setError('No se pudo cargar el catálogo. Por favor, inténtalo de nuevo más tarde.');
    setLoading(false);
  };

  if (!workerConfigured) {
    return (
      <div className="flex flex-col items-center w-full h-full">
        <div className='text-white text-center text-xl'>Inicializando visor de PDF...</div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center w-full h-full">
      {loading && <div className='text-white text-center text-xl'>Cargando catálogo, por favor espera...</div>}
      {error && <div className='text-red-500 text-center text-xl'>{error}</div>}
      
      <Suspense fallback={<div className='text-white text-center text-xl'>Cargando componentes...</div>}>
        <Document
          file={pdfUrl}
          onLoadSuccess={onDocumentLoadSuccess}
          onLoadError={onDocumentLoadError}
          className={loading || error ? 'hidden' : ''}
        >
          {!loading && !error && numPages && (
            <>
              <HTMLFlipBook
                width={500}
                height={707}
                size="stretch"
                minWidth={315}
                maxWidth={1000}
                minHeight={445}
                maxHeight={1414}
                maxShadowOpacity={0.5}
                showCover={true}
                mobileScrollSupport={true}
                ref={flipBook}
                className="mx-auto shadow-2xl"
                startPage={0}
                drawShadow={true}
                flippingTime={1000}
                usePortrait={true}
                startZIndex={0}
                autoSize={true}
                clickEventForward={true}
                useMouseEvents={true}
                swipeDistance={30}
                showPageCorners={true}
                disableFlipByClick={false}
                style={{}}
              >
                {Array.from(new Array(numPages), (el, index) => (
                  <PdfPage key={`page_${index + 1}`} pageNumber={index + 1} width={500} />
                ))}
              </HTMLFlipBook>

              <div className="mt-4 text-center">
                <button onClick={() => flipBook.current?.pageFlip().flipPrev()} className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded-l transition-colors duration-300" style={{ backgroundColor: '#f6921d' }}>
                  Anterior
                </button>
                <button onClick={() => flipBook.current?.pageFlip().flipNext()} className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded-r transition-colors duration-300" style={{ backgroundColor: '#f6921d' }}>
                  Siguiente
                </button>
              </div>
            </>
          )}
        </Document>
      </Suspense>
    </div>
  );
};

export default FlipbookViewer;
