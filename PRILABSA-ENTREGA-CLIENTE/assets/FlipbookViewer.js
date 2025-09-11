const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/index3.js","assets/index.js","assets/vendor.js","assets/react.js","assets/index.css","assets/warning.js","assets/index.es.js"])))=>i.map(i=>d[i]);
import { j as jsxRuntimeExports, _ as __vitePreload } from "./index.js";
import { r as reactExports, R as React } from "./vendor.js";
import "./react.js";
const Document = reactExports.lazy(() => __vitePreload(() => import("./index3.js"), true ? __vite__mapDeps([0,1,2,3,4,5]) : void 0).then((module) => ({ default: module.Document })));
const Page = reactExports.lazy(() => __vitePreload(() => import("./index3.js"), true ? __vite__mapDeps([0,1,2,3,4,5]) : void 0).then((module) => ({ default: module.Page })));
const HTMLFlipBook = reactExports.lazy(() => __vitePreload(() => import("./index.es.js"), true ? __vite__mapDeps([6,2,3]) : void 0));
const configurePdfWorker = async () => {
  const { pdfjs } = await __vitePreload(async () => {
    const { pdfjs: pdfjs2 } = await import("./index3.js");
    return { pdfjs: pdfjs2 };
  }, true ? __vite__mapDeps([0,1,2,3,4,5]) : void 0);
  pdfjs.GlobalWorkerOptions.workerSrc = new URL(
    /* @vite-ignore */
    "pdfjs-dist/build/pdf.worker.min.js",
    import.meta.url
  ).toString();
};
const PdfPage = React.forwardRef(({ pageNumber, width }, ref) => {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { ref, className: "bg-white shadow-md flex justify-center items-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Page, { pageNumber, width, renderTextLayer: false, renderAnnotationLayer: false }) });
});
const FlipbookViewer = ({ pdfUrl }) => {
  const [numPages, setNumPages] = reactExports.useState(null);
  const [loading, setLoading] = reactExports.useState(true);
  const [error, setError] = reactExports.useState(null);
  const [workerConfigured, setWorkerConfigured] = reactExports.useState(false);
  const flipBook = reactExports.useRef(null);
  reactExports.useEffect(() => {
    configurePdfWorker().then(() => {
      setWorkerConfigured(true);
    }).catch((err) => {
      console.error("Error configurando PDF worker:", err);
      setError("Error al configurar el visor de PDF");
    });
  }, []);
  const onDocumentLoadSuccess = ({ numPages: numPages2 }) => {
    setNumPages(numPages2);
    setLoading(false);
  };
  const onDocumentLoadError = (error2) => {
    console.error("Error al cargar el documento PDF:", error2);
    setError("No se pudo cargar el catálogo. Por favor, inténtalo de nuevo más tarde.");
    setLoading(false);
  };
  if (!workerConfigured) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-col items-center w-full h-full", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-white text-center text-xl", children: "Inicializando visor de PDF..." }) });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center w-full h-full", children: [
    loading && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-white text-center text-xl", children: "Cargando catálogo, por favor espera..." }),
    error && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-red-500 text-center text-xl", children: error }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(reactExports.Suspense, { fallback: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-white text-center text-xl", children: "Cargando componentes..." }), children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      Document,
      {
        file: pdfUrl,
        onLoadSuccess: onDocumentLoadSuccess,
        onLoadError: onDocumentLoadError,
        className: loading || error ? "hidden" : "",
        children: !loading && !error && numPages && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            HTMLFlipBook,
            {
              width: 500,
              height: 707,
              size: "stretch",
              minWidth: 315,
              maxWidth: 1e3,
              minHeight: 445,
              maxHeight: 1414,
              maxShadowOpacity: 0.5,
              showCover: true,
              mobileScrollSupport: true,
              ref: flipBook,
              className: "mx-auto shadow-2xl",
              startPage: 0,
              drawShadow: true,
              flippingTime: 1e3,
              usePortrait: true,
              startZIndex: 0,
              autoSize: true,
              clickEventForward: true,
              useMouseEvents: true,
              swipeDistance: 30,
              showPageCorners: true,
              disableFlipByClick: false,
              style: {},
              children: Array.from(new Array(numPages), (el, index) => /* @__PURE__ */ jsxRuntimeExports.jsx(PdfPage, { pageNumber: index + 1, width: 500 }, `page_${index + 1}`))
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 text-center", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => {
              var _a;
              return (_a = flipBook.current) == null ? void 0 : _a.pageFlip().flipPrev();
            }, className: "bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded-l transition-colors duration-300", style: { backgroundColor: "#f6921d" }, children: "Anterior" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => {
              var _a;
              return (_a = flipBook.current) == null ? void 0 : _a.pageFlip().flipNext();
            }, className: "bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded-r transition-colors duration-300", style: { backgroundColor: "#f6921d" }, children: "Siguiente" })
          ] })
        ] })
      }
    ) })
  ] });
};
export {
  FlipbookViewer as default
};
