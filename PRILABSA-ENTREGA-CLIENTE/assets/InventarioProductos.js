import { c as createLucideIcon, u as useLanguage, P as PRODUCTS_REGISTRY, j as jsxRuntimeExports, H as Header, C as Search, F as Footer } from "./index.js";
import { r as reactExports } from "./vendor.js";
import { P as Plus } from "./plus.js";
import { F as FileText } from "./file-text.js";
import { D as Download, C as CircleCheckBig, X } from "./x.js";
import "./react.js";
/**
 * @license lucide-react v0.525.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$4 = [
  [
    "path",
    {
      d: "M10 20a1 1 0 0 0 .553.895l2 1A1 1 0 0 0 14 21v-7a2 2 0 0 1 .517-1.341L21.74 4.67A1 1 0 0 0 21 3H3a1 1 0 0 0-.742 1.67l7.225 7.989A2 2 0 0 1 10 14z",
      key: "sc7q7i"
    }
  ]
];
const Funnel = createLucideIcon("funnel", __iconNode$4);
/**
 * @license lucide-react v0.525.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$3 = [
  ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2", ry: "2", key: "1m3agn" }],
  ["circle", { cx: "9", cy: "9", r: "2", key: "af1f0g" }],
  ["path", { d: "m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21", key: "1xmnt7" }]
];
const Image = createLucideIcon("image", __iconNode$3);
/**
 * @license lucide-react v0.525.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  ["path", { d: "M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7", key: "1m0v6g" }],
  [
    "path",
    {
      d: "M18.375 2.625a1 1 0 0 1 3 3l-9.013 9.014a2 2 0 0 1-.853.505l-2.873.84a.5.5 0 0 1-.62-.62l.84-2.873a2 2 0 0 1 .506-.852z",
      key: "ohrbg2"
    }
  ]
];
const SquarePen = createLucideIcon("square-pen", __iconNode$2);
/**
 * @license lucide-react v0.525.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  [
    "path",
    {
      d: "m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3",
      key: "wmoenq"
    }
  ],
  ["path", { d: "M12 9v4", key: "juzpu7" }],
  ["path", { d: "M12 17h.01", key: "p32p05" }]
];
const TriangleAlert = createLucideIcon("triangle-alert", __iconNode$1);
/**
 * @license lucide-react v0.525.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M12 3v12", key: "1x0j5s" }],
  ["path", { d: "m17 8-5-5-5 5", key: "7q97r8" }],
  ["path", { d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4", key: "ih7n3h" }]
];
const Upload = createLucideIcon("upload", __iconNode);
const searchProducts = (query) => {
  const lowerQuery = query.toLowerCase();
  return PRODUCTS_REGISTRY.filter(
    (product) => product.name.toLowerCase().includes(lowerQuery) || (product.codigo || product.productCode || "").toLowerCase().includes(lowerQuery) || product.description && product.description.toLowerCase().includes(lowerQuery)
  );
};
const getAvailableCategories = () => {
  const categories = new Set(PRODUCTS_REGISTRY.map((p) => p.category));
  return Array.from(categories);
};
const REGISTRY_STATS = {
  totalProducts: PRODUCTS_REGISTRY.length,
  completenessRate: Math.round(PRODUCTS_REGISTRY.filter((p) => p.name && (p.codigo || p.productCode)).length / PRODUCTS_REGISTRY.length * 100),
  totalAssets: PRODUCTS_REGISTRY.length * 2,
  // Estimación
  categories: getAvailableCategories().length
};
const CLASIFICACIONES = {
  aditivos: "products.categories.aditivos",
  alimentos: "products.categories.alimentos",
  probioticos: "products.categories.probioticos",
  quimicos: "products.categories.quimicos",
  equipos: "products.categories.equipos"
};
const InventarioStats = ({ stats }) => {
  const { t } = useLanguage();
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 md:grid-cols-4 gap-6 mb-8", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-white rounded-lg shadow-md p-6 border-l-4 border-blue-500", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "h-8 w-8 text-blue-500" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "ml-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-gray-500", children: t("inventory.stats.totalProducts") }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-2xl font-bold text-gray-900", children: stats.totalProducts })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-white rounded-lg shadow-md p-6 border-l-4 border-green-500", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { className: "h-8 w-8 text-green-500" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "ml-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-gray-500", children: t("inventory.stats.completeness") }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-2xl font-bold text-gray-900", children: [
          stats.completenessRate,
          "%"
        ] })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-white rounded-lg shadow-md p-6 border-l-4 border-yellow-500", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Image, { className: "h-8 w-8 text-yellow-500" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "ml-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-gray-500", children: t("inventory.stats.totalAssets") }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-2xl font-bold text-gray-900", children: stats.totalAssets.toLocaleString() })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-white rounded-lg shadow-md p-6 border-l-4 border-purple-500", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Funnel, { className: "h-8 w-8 text-purple-500" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "ml-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-gray-500", children: t("inventory.stats.categories") }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-2xl font-bold text-gray-900", children: "5" })
      ] })
    ] }) })
  ] });
};
const ProductThumbnail = ({ product }) => {
  var _a;
  const [imageError, setImageError] = reactExports.useState(false);
  const [imageLoaded, setImageLoaded] = reactExports.useState(false);
  const [isHovered, setIsHovered] = reactExports.useState(false);
  const handleImageError = () => {
    var _a2;
    setImageError(true);
    console.warn(`Imagen no encontrada: ${(_a2 = product.assets.image) == null ? void 0 : _a2.path}`);
  };
  if (!((_a = product.assets.image) == null ? void 0 : _a.exists) || imageError) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center border-2 border-dashed border-gray-300", children: /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { className: "w-6 h-6 text-gray-400" }) });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "relative group cursor-pointer",
        onMouseEnter: () => setIsHovered(true),
        onMouseLeave: () => setIsHovered(false),
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "img",
            {
              src: product.assets.image.path,
              alt: product.name,
              className: `w-16 h-16 object-cover rounded-lg border-2 border-gray-200 transition-all duration-200 ${imageLoaded ? "opacity-100" : "opacity-50"} hover:border-blue-400 hover:shadow-md`,
              onError: handleImageError,
              onLoad: () => setImageLoaded(true)
            }
          ),
          !imageLoaded && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "animate-spin rounded-full h-4 w-4 border-b-2 border-blue-500" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute -top-1 -right-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-blue-500 text-white text-xs px-1.5 py-0.5 rounded-full shadow-lg", children: "🔍" }) })
        ]
      }
    ),
    isHovered && imageLoaded && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "fixed inset-0 z-50 flex items-center justify-center pointer-events-none", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-black bg-opacity-75" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative z-10 max-w-2xl max-h-2xl p-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "img",
          {
            src: product.assets.image.path,
            alt: `${product.name} - Ampliada`,
            className: "max-w-full max-h-full object-contain rounded-lg border-4 border-white shadow-2xl animate-in zoom-in-95 duration-200"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute bottom-0 left-0 right-0 bg-black bg-opacity-75 text-white p-3 rounded-b-lg", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-lg", children: product.name }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-gray-300", children: product.codigo })
        ] })
      ] })
    ] })
  ] });
};
const ProductEditModal = ({ isOpen, onClose, onSave, product }) => {
  var _a, _b;
  const [formData, setFormData] = reactExports.useState({
    nombre: product.name,
    descripcion: product.description || "",
    codigo: product.codigo || product.productCode || ""
  });
  const [imageFile, setImageFile] = reactExports.useState(null);
  const [pdfFile, setPdfFile] = reactExports.useState(null);
  const [imagePreview, setImagePreview] = reactExports.useState(null);
  const [isUploading, setIsUploading] = reactExports.useState(false);
  reactExports.useEffect(() => {
    if (product && isOpen) {
      setFormData({
        nombre: product.name,
        descripcion: product.description || "",
        codigo: product.codigo || product.productCode || ""
      });
    }
  }, [product, isOpen]);
  if (!isOpen) return null;
  const handleImageChange = (e) => {
    var _a2;
    const file = (_a2 = e.target.files) == null ? void 0 : _a2[0];
    if (file) {
      if (file.type.startsWith("image/")) {
        setImageFile(file);
        const reader = new FileReader();
        reader.onload = (e2) => {
          var _a3;
          return setImagePreview((_a3 = e2.target) == null ? void 0 : _a3.result);
        };
        reader.readAsDataURL(file);
      } else {
        alert("Por favor selecciona un archivo de imagen válido (PNG, JPG, JPEG)");
      }
    }
  };
  const handlePdfChange = (e) => {
    var _a2;
    const file = (_a2 = e.target.files) == null ? void 0 : _a2[0];
    if (file) {
      if (file.type === "application/pdf") {
        setPdfFile(file);
      } else {
        alert("Por favor selecciona un archivo PDF válido");
      }
    }
  };
  const handleSave = async () => {
    var _a2, _b2;
    setIsUploading(true);
    try {
      const updatedProduct = {
        ...product,
        ...formData,
        assets: {
          ...product.assets,
          image: imageFile ? {
            filename: imageFile.name,
            path: URL.createObjectURL(imageFile),
            extension: imageFile.name.split(".").pop() || "jpg",
            size: imageFile.size,
            exists: true
          } : product.assets.image,
          pdf: pdfFile ? {
            filename: pdfFile.name,
            path: ((_a2 = product.assets.pdf) == null ? void 0 : _a2.path) || "",
            size: `${(pdfFile.size / 1024 / 1024).toFixed(1)} MB`,
            downloadUrl: ((_b2 = product.assets.pdf) == null ? void 0 : _b2.downloadUrl) || "",
            exists: true
          } : product.assets.pdf
        }
      };
      onSave(updatedProduct);
      onClose();
    } catch (error) {
      console.error("Error al guardar:", error);
      alert("Error al guardar los cambios");
    } finally {
      setIsUploading(false);
    }
  };
  if (!isOpen) return null;
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "fixed inset-0 z-50 overflow-y-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity", onClick: onClose }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-2xl sm:w-full", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-lg font-medium text-gray-900", children: "Editar Producto" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: onClose, className: "text-gray-400 hover:text-gray-600", children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-6 h-6" }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "Código" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "input",
                {
                  type: "text",
                  value: formData.codigo,
                  onChange: (e) => setFormData({ ...formData, codigo: e.target.value }),
                  className: "w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "Nombre" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "input",
                {
                  type: "text",
                  value: formData.nombre,
                  onChange: (e) => setFormData({ ...formData, nombre: e.target.value }),
                  className: "w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "Descripción" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "textarea",
              {
                value: formData.descripcion,
                onChange: (e) => setFormData({ ...formData, descripcion: e.target.value }),
                rows: 3,
                className: "w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-sm font-medium text-gray-700 mb-2", children: "Imagen Actual" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border-2 border-dashed border-gray-300 rounded-lg p-4", children: [
                ((_a = product.assets.image) == null ? void 0 : _a.exists) ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "img",
                    {
                      src: imagePreview || product.assets.image.path,
                      alt: product.name,
                      className: "w-24 h-24 object-cover rounded-lg mx-auto mb-2"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-gray-600", children: product.assets.image.filename })
                ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center text-gray-500", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Image, { className: "w-12 h-12 mx-auto mb-2" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm", children: "Sin imagen" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "input",
                  {
                    type: "file",
                    accept: "image/*",
                    onChange: handleImageChange,
                    className: "mt-2 w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                  }
                )
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-sm font-medium text-gray-700 mb-2", children: "PDF Técnico" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border-2 border-dashed border-gray-300 rounded-lg p-4", children: [
                ((_b = product.assets.pdf) == null ? void 0 : _b.exists) ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "w-12 h-12 text-red-500 mx-auto mb-2" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-gray-600", children: product.assets.pdf.filename }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-gray-500", children: product.assets.pdf.size })
                ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center text-gray-500", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "w-12 h-12 mx-auto mb-2" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm", children: "Sin PDF" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "input",
                  {
                    type: "file",
                    accept: ".pdf",
                    onChange: handlePdfChange,
                    className: "mt-2 w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-red-50 file:text-red-700 hover:file:bg-red-100"
                  }
                )
              ] })
            ] })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            onClick: handleSave,
            disabled: isUploading,
            className: "w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm disabled:opacity-50",
            children: isUploading ? "Guardando..." : "Guardar Cambios"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            onClick: onClose,
            className: "mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm",
            children: "Cancelar"
          }
        )
      ] })
    ] })
  ] }) });
};
const ProductModal = ({ isOpen, onClose, onSave, product }) => {
  const { t } = useLanguage();
  const [formData, setFormData] = reactExports.useState({
    codigo: "",
    nombre: "",
    descripcion: "",
    categoria: "aditivos",
    clasificacion: 1,
    image: null,
    pdf: null,
    beneficios: [""],
    presentacion: [""],
    especificaciones: [{ key: "", value: "" }]
  });
  reactExports.useEffect(() => {
    if (product) {
      setFormData({
        codigo: product.codigo || product.productCode || "",
        nombre: product.name,
        descripcion: product.description,
        categoria: product.category,
        clasificacion: product.clasificacion || 0,
        image: null,
        pdf: null,
        beneficios: [""],
        presentacion: [""],
        especificaciones: [{ key: "", value: "" }]
      });
    } else {
      setFormData({
        codigo: "",
        nombre: "",
        descripcion: "",
        categoria: "aditivos",
        clasificacion: 1,
        image: null,
        pdf: null,
        beneficios: [""],
        presentacion: [""],
        especificaciones: [{ key: "", value: "" }]
      });
    }
  }, [product, isOpen]);
  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value
    }));
  };
  const handleArrayChange = (field, index, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: prev[field].map((item, i) => i === index ? value : item)
    }));
  };
  const addArrayItem = (field) => {
    setFormData((prev) => ({
      ...prev,
      [field]: [...prev[field], ""]
    }));
  };
  const removeArrayItem = (field, index) => {
    setFormData((prev) => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index)
    }));
  };
  const handleSpecificationChange = (index, field, value) => {
    setFormData((prev) => ({
      ...prev,
      especificaciones: prev.especificaciones.map(
        (spec, i) => i === index ? { ...spec, [field]: value } : spec
      )
    }));
  };
  const addSpecification = () => {
    setFormData((prev) => ({
      ...prev,
      especificaciones: [...prev.especificaciones, { key: "", value: "" }]
    }));
  };
  const removeSpecification = (index) => {
    setFormData((prev) => ({
      ...prev,
      especificaciones: prev.especificaciones.filter((_, i) => i !== index)
    }));
  };
  const handleSave = () => {
    onSave(formData);
    onClose();
  };
  if (!isOpen) return null;
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-lg shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-2xl font-bold text-gray-900", children: product ? "Editar Producto" : "Agregar Nuevo Producto" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          onClick: onClose,
          className: "p-2 hover:bg-gray-100 rounded-full transition-colors",
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-5 h-5 text-gray-500" })
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-6 py-4 space-y-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-sm font-medium text-gray-700 mb-2", children: "Código de Producto *" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              type: "text",
              value: formData.codigo,
              onChange: (e) => handleInputChange("codigo", e.target.value.toUpperCase()),
              placeholder: "Ej: AD001, AL001, etc.",
              className: "w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-sm font-medium text-gray-700 mb-2", children: "Categoría *" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "select",
            {
              value: formData.categoria,
              onChange: (e) => {
                const category = e.target.value;
                const classification = {
                  "aditivos": 1,
                  "alimentos": 2,
                  "probioticos": 3,
                  "quimicos": 4,
                  "equipos": 5
                }[category] || 1;
                handleInputChange("categoria", category);
                handleInputChange("clasificacion", classification);
              },
              className: "w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "aditivos", children: t("products.categories.aditivos") }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "alimentos", children: t("products.categories.alimentos") }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "probioticos", children: t("products.categories.probioticos") }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "quimicos", children: t("products.categories.quimicos") }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "equipos", children: t("products.categories.equipos") })
              ]
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-sm font-medium text-gray-700 mb-2", children: "Nombre del Producto *" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "input",
          {
            type: "text",
            value: formData.nombre,
            onChange: (e) => handleInputChange("nombre", e.target.value),
            placeholder: "Nombre completo del producto",
            className: "w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-sm font-medium text-gray-700 mb-2", children: "Descripción *" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "textarea",
          {
            value: formData.descripcion,
            onChange: (e) => handleInputChange("descripcion", e.target.value),
            placeholder: t("navigation.inventory.form.descriptionPlaceholder"),
            rows: 4,
            className: "w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-sm font-medium text-gray-700 mb-2", children: t("navigation.inventory.form.productPhoto") }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Upload, { className: "mx-auto h-12 w-12 text-gray-400" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "cursor-pointer", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mt-2 block text-sm font-medium text-gray-700", children: t("navigation.inventory.form.uploadImage") }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "input",
                {
                  type: "file",
                  accept: "image/*",
                  onChange: (e) => {
                    var _a;
                    return handleInputChange("image", ((_a = e.target.files) == null ? void 0 : _a[0]) || null);
                  },
                  className: "hidden"
                }
              )
            ] }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-gray-500 mt-2", children: t("navigation.inventory.form.imageFormats") })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-sm font-medium text-gray-700 mb-2", children: t("navigation.inventory.form.technicalSheet") }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "mx-auto h-12 w-12 text-gray-400" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "cursor-pointer", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mt-2 block text-sm font-medium text-gray-700", children: t("navigation.inventory.form.uploadPdf") }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "input",
                {
                  type: "file",
                  accept: ".pdf",
                  onChange: (e) => {
                    var _a;
                    return handleInputChange("pdf", ((_a = e.target.files) == null ? void 0 : _a[0]) || null);
                  },
                  className: "hidden"
                }
              )
            ] }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-gray-500 mt-2", children: "PDF hasta 20MB" })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-sm font-medium text-gray-700 mb-2", children: "Beneficios del Producto" }),
        formData.beneficios.map((beneficio, index) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              type: "text",
              value: beneficio,
              onChange: (e) => handleArrayChange("beneficios", index, e.target.value),
              placeholder: `Beneficio ${index + 1}`,
              className: "flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            }
          ),
          formData.beneficios.length > 1 && /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              onClick: () => removeArrayItem("beneficios", index),
              className: "p-2 text-red-500 hover:bg-red-50 rounded-lg",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-4 h-4" })
            }
          )
        ] }, index)),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            onClick: () => addArrayItem("beneficios"),
            className: "mt-2 px-4 py-2 text-blue-600 border border-blue-300 rounded-lg hover:bg-blue-50 transition-colors",
            children: "+ Agregar Beneficio"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-sm font-medium text-gray-700 mb-2", children: "Presentación del Producto" }),
        formData.presentacion.map((presentacion, index) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              type: "text",
              value: presentacion,
              onChange: (e) => handleArrayChange("presentacion", index, e.target.value),
              placeholder: `Presentación ${index + 1} (Ej: Funda de 1kg, Cubeta de 5L)`,
              className: "flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            }
          ),
          formData.presentacion.length > 1 && /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              onClick: () => removeArrayItem("presentacion", index),
              className: "p-2 text-red-500 hover:bg-red-50 rounded-lg",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-4 h-4" })
            }
          )
        ] }, index)),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            onClick: () => addArrayItem("presentacion"),
            className: "mt-2 px-4 py-2 text-blue-600 border border-blue-300 rounded-lg hover:bg-blue-50 transition-colors",
            children: "+ Agregar Presentación"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-sm font-medium text-gray-700 mb-2", children: "Especificaciones Técnicas" }),
        formData.especificaciones.map((spec, index) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-2 mb-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              type: "text",
              value: spec.key,
              onChange: (e) => handleSpecificationChange(index, "key", e.target.value),
              placeholder: "Especificación (Ej: Proteína Cruda)",
              className: "border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "input",
              {
                type: "text",
                value: spec.value,
                onChange: (e) => handleSpecificationChange(index, "value", e.target.value),
                placeholder: "Valor (Ej: 35% mín.)",
                className: "flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              }
            ),
            formData.especificaciones.length > 1 && /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                onClick: () => removeSpecification(index),
                className: "p-2 text-red-500 hover:bg-red-50 rounded-lg",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-4 h-4" })
              }
            )
          ] })
        ] }, index)),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            onClick: addSpecification,
            className: "mt-2 px-4 py-2 text-blue-600 border border-blue-300 rounded-lg hover:bg-blue-50 transition-colors",
            children: "+ Agregar Especificación"
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "sticky bottom-0 bg-gray-50 px-6 py-4 flex items-center justify-end gap-4 border-t border-gray-200", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          onClick: onClose,
          className: "px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors",
          children: "Cancelar"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          onClick: handleSave,
          className: "px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors",
          children: product ? "Actualizar Producto" : "Añadir Producto"
        }
      )
    ] })
  ] }) });
};
const ProductoRow = ({ producto, onUpdate, onEdit }) => {
  var _a, _b, _c, _d, _e, _f;
  const [estadoQA, setEstadoQA] = reactExports.useState("pendiente");
  const [showDescriptionTooltip, setShowDescriptionTooltip] = reactExports.useState(false);
  reactExports.useEffect(() => {
    const savedData = localStorage.getItem(`producto_${producto.id}`);
    if (savedData) {
      const data = JSON.parse(savedData);
      setEstadoQA(data.estadoQA || "pendiente");
    }
  }, [producto.id]);
  const saveToLocalStorage = (field, value) => {
    const currentData = JSON.parse(localStorage.getItem(`producto_${producto.id}`) || "{}");
    const newData = { ...currentData, [field]: value };
    localStorage.setItem(`producto_${producto.id}`, JSON.stringify(newData));
    if (onUpdate) {
      onUpdate(producto.id, field, value);
    }
  };
  const handleEstadoQAChange = (value) => {
    setEstadoQA(value);
    saveToLocalStorage("estadoQA", value);
  };
  const getEstadoColor = (estado) => {
    switch (estado) {
      case "aprobado":
        return "bg-green-100 text-green-800";
      case "revision":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: `border-b hover:bg-gray-50 ${producto.metadata.needsReview ? "bg-red-50" : ""}`, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-6 py-4 whitespace-nowrap", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-medium text-gray-900", children: producto.codigo || producto.productCode || "N/A" }),
      producto.metadata.needsReview && /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { className: "w-4 h-4 text-red-500 ml-2" })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "px-6 py-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm font-medium text-gray-900", children: producto.name }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-sm text-gray-500", children: [
        "Clasificación ",
        producto.clasificacion || 0
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-6 py-4 max-w-sm", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "relative",
        onMouseEnter: () => setShowDescriptionTooltip(true),
        onMouseLeave: () => setShowDescriptionTooltip(false),
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm text-gray-900 truncate cursor-help", children: producto.description }),
          showDescriptionTooltip && producto.description && producto.description.length > 50 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute z-50 bg-gray-900 text-white text-sm rounded-lg p-3 shadow-lg max-w-xs left-0 top-full mt-2 whitespace-normal", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute -top-1 left-4 w-2 h-2 bg-gray-900 transform rotate-45" }),
            producto.description
          ] })
        ]
      }
    ) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-6 py-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "group relative", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ProductThumbnail, { product: producto }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "px-6 py-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm text-gray-900", children: ((_a = producto.assets.image) == null ? void 0 : _a.filename) || "Sin imagen" }),
      ((_b = producto.assets.image) == null ? void 0 : _b.extension) && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-gray-500", children: producto.assets.image.extension.toUpperCase() })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-6 py-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      "input",
      {
        type: "checkbox",
        defaultChecked: ((_c = producto.assets.image) == null ? void 0 : _c.exists) || false,
        className: "h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded",
        onChange: (e) => {
          const key = `photo_ok_${producto.id}`;
          localStorage.setItem(key, e.target.checked.toString());
        }
      }
    ) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-6 py-4", children: ((_d = producto.assets.pdf) == null ? void 0 : _d.exists) ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "a",
      {
        href: producto.assets.pdf.downloadUrl,
        target: "_blank",
        rel: "noopener noreferrer",
        className: "inline-flex items-center px-3 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full hover:bg-blue-200",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { className: "w-3 h-3 mr-1" }),
          producto.assets.pdf.size
        ]
      }
    ) : /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center px-3 py-1 bg-red-100 text-red-800 text-xs font-medium rounded-full", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { className: "w-3 h-3 mr-1" }),
      "No disponible"
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "px-6 py-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm text-gray-900", children: ((_e = producto.assets.pdf) == null ? void 0 : _e.filename) || "Sin PDF" }),
      ((_f = producto.assets.pdf) == null ? void 0 : _f.exists) && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-gray-500", children: "PDF" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-6 py-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "select",
      {
        value: estadoQA,
        onChange: (e) => handleEstadoQAChange(e.target.value),
        className: `text-xs font-medium rounded-full px-3 py-1 border-0 ${getEstadoColor(estadoQA)}`,
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "pendiente", children: "Pendiente" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "revision", children: "En Revisión" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "aprobado", children: "Aprobado" })
        ]
      }
    ) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-6 py-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "button",
      {
        onClick: () => onEdit(producto),
        disabled: true,
        className: "inline-flex items-center px-3 py-1 bg-gray-400 text-gray-600 text-xs font-medium rounded-md cursor-not-allowed italic",
        title: "Función temporalmente deshabilitada",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(SquarePen, { className: "w-3 h-3 mr-1" }),
          "Editar"
        ]
      }
    ) })
  ] });
};
const InventarioProductos = () => {
  const { t } = useLanguage();
  const [productos] = reactExports.useState(PRODUCTS_REGISTRY);
  const [searchTerm, setSearchTerm] = reactExports.useState("");
  const [selectedCategory, setSelectedCategory] = reactExports.useState("todos");
  const [filtroEstado, setFiltroEstado] = reactExports.useState("todos");
  const [vistaCompleta, setVistaCompleta] = reactExports.useState(false);
  const [loading] = reactExports.useState(false);
  const [isModalOpen, setIsModalOpen] = reactExports.useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = reactExports.useState(false);
  const [selectedProduct, setSelectedProduct] = reactExports.useState(null);
  const productosFiltrados = reactExports.useMemo(() => {
    let filtered = productos;
    if (searchTerm.trim()) {
      filtered = searchProducts(searchTerm);
    }
    if (selectedCategory !== "todos") {
      filtered = filtered.filter((p) => p.category === selectedCategory);
    }
    if (filtroEstado === "completos") {
      filtered = filtered.filter((p) => !p.metadata.needsReview);
    } else if (filtroEstado === "incompletos") {
      filtered = filtered.filter((p) => p.metadata.needsReview);
    }
    return filtered.sort((a, b) => {
      if ((a.clasificacion || 0) !== (b.clasificacion || 0)) {
        return (a.clasificacion || 0) - (b.clasificacion || 0);
      }
      return (a.codigo || a.productCode || "").localeCompare(b.codigo || b.productCode || "");
    });
  }, [productos, searchTerm, selectedCategory, filtroEstado]);
  const productosAgrupados = reactExports.useMemo(() => {
    const grouped = {};
    productosFiltrados.forEach((producto) => {
      var _a;
      const clasificacion = producto.clasificacion || 0;
      if (!grouped[clasificacion]) {
        const categoryName = (_a = Object.entries(CLASIFICACIONES).find(
          ([key]) => key === producto.category
        )) == null ? void 0 : _a[1];
        grouped[clasificacion] = {
          nombre: (categoryName == null ? void 0 : categoryName.toUpperCase()) || `CLASIFICACIÓN ${clasificacion}`,
          productos: []
        };
      }
      grouped[clasificacion].productos.push(producto);
    });
    return grouped;
  }, [productosFiltrados]);
  const handleOpenModal = (product) => {
    setSelectedProduct(null);
    setIsModalOpen(true);
  };
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };
  const handleSaveProduct = (productData) => {
    console.log("Producto guardado:", productData);
  };
  const exportToCSV = () => {
    const headers = ["Código", "Nombre", "Descripción", "Clasificación", "Categoría", "Imagen", "PDF", "Estado QA"];
    const rows = productosFiltrados.map((p) => {
      var _a, _b;
      return [
        p.codigo || p.productCode || "",
        p.name,
        p.description || "",
        p.category,
        p.category,
        ((_a = p.assets.image) == null ? void 0 : _a.exists) ? "Sí" : "No",
        ((_b = p.assets.pdf) == null ? void 0 : _b.exists) ? "Sí" : "No",
        p.metadata.needsReview ? "Pendiente" : "OK"
      ];
    });
    const csvContent = [headers, ...rows].map((row) => row.join(",")).join("\n");
    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `inventario-productos-${(/* @__PURE__ */ new Date()).toISOString().split("T")[0]}.csv`;
    a.click();
  };
  if (loading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-h-screen bg-gray-50 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-4 text-gray-600", children: "Cargando inventario de productos..." })
    ] }) });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-gray-50", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Header, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-blue-900 opacity-60 h-32" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "py-8", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-8", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-3xl font-bold text-gray-900", children: "Inventario de Productos" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-gray-600", children: "Sistema de gestión y auditoría del catálogo de productos Prilabsa" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 text-sm text-gray-500", children: [
          "Generado automáticamente el ",
          (/* @__PURE__ */ new Date()).toLocaleDateString("es-ES"),
          " • Productos encontrados: ",
          REGISTRY_STATS.totalProducts,
          " • Assets: ",
          REGISTRY_STATS.totalAssets.toLocaleString()
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(InventarioStats, { stats: REGISTRY_STATS }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-lg shadow-md p-6 mb-8", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-lg font-semibold text-gray-900", children: "Controles de Inventario" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              onClick: () => handleOpenModal(),
              className: "bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center gap-2",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-4 w-4" }),
                "Añadir Producto"
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 md:grid-cols-5 gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "input",
              {
                type: "text",
                placeholder: t("products.search.placeholder"),
                value: searchTerm,
                onChange: (e) => setSearchTerm(e.target.value),
                className: "pl-10 w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "select",
            {
              value: selectedCategory,
              onChange: (e) => setSelectedCategory(e.target.value),
              className: "border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "todos", children: "Todas las categorías" }),
                Object.keys(CLASIFICACIONES).map((category) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: category, children: category.charAt(0).toUpperCase() + category.slice(1) }, category))
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "select",
            {
              value: filtroEstado,
              onChange: (e) => setFiltroEstado(e.target.value),
              className: "border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "todos", children: "Todos los estados" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "completos", children: "Completos" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "incompletos", children: "Incompletos" })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              onClick: () => setVistaCompleta(!vistaCompleta),
              className: `px-4 py-2 rounded-lg transition-colors flex items-center justify-center ${vistaCompleta ? "bg-green-600 text-white hover:bg-green-700" : "bg-gray-200 text-gray-700 hover:bg-gray-300"}`,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "h-4 w-4 mr-2" }),
                vistaCompleta ? "Vista Agrupada" : "Ver Todos (101)"
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              onClick: exportToCSV,
              className: "bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { className: "h-4 w-4 mr-2" }),
                "Exportar CSV"
              ]
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-lg shadow-md overflow-hidden", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-6 py-4 border-b border-gray-200", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "text-lg font-semibold text-gray-900", children: [
          "Productos encontrados: ",
          productosFiltrados.length,
          " ",
          vistaCompleta ? "(Listado completo)" : "(Agrupado por clasificación)"
        ] }) }),
        vistaCompleta ? (
          /* Vista completa - Todos los productos en una tabla */
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "min-w-full divide-y divide-gray-200", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { className: "bg-gray-50", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider", children: "#" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider", children: "Código" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider", children: "Nombre" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider", children: "Categoría" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider", children: "Descripción" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider", children: "Fotografía" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider", children: "Nombre Archivo" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider", children: "Foto OK" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider", children: "PDF" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider", children: "Nombre PDF" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider", children: "PDF OK" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider", children: "Estado QA" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider", children: "Anotaciones" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider", children: "Responsable" })
            ] }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { className: "bg-white divide-y divide-gray-200", children: productosFiltrados.map((producto, index) => {
              var _a, _b, _c, _d, _e, _f, _g;
              return /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: `border-b hover:bg-gray-50 ${producto.metadata.needsReview ? "bg-red-50" : ""}`, children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-6 py-4 whitespace-nowrap text-sm text-gray-500", children: index + 1 }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-6 py-4 whitespace-nowrap", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-medium text-gray-900", children: producto.codigo || producto.productCode || "N/A" }),
                  producto.metadata.needsReview && /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { className: "w-4 h-4 text-red-500 ml-2" })
                ] }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-6 py-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm font-medium text-gray-900", children: producto.name }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-6 py-4 whitespace-nowrap", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${producto.category === "aditivos" ? "bg-blue-100 text-blue-800" : producto.category === "alimentos" ? "bg-green-100 text-green-800" : producto.category === "probioticos" ? "bg-purple-100 text-purple-800" : producto.category === "quimicos" ? "bg-yellow-100 text-yellow-800" : "bg-gray-100 text-gray-800"}`, children: producto.category.charAt(0).toUpperCase() + producto.category.slice(1) }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-6 py-4 max-w-xs", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm text-gray-900 truncate", title: producto.description, children: producto.description }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-6 py-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "group relative", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ProductThumbnail, { product: producto }) }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "px-6 py-4", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm text-gray-900", children: ((_a = producto.assets.image) == null ? void 0 : _a.filename) || "Sin imagen" }),
                  ((_b = producto.assets.image) == null ? void 0 : _b.extension) && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-gray-500", children: producto.assets.image.extension.toUpperCase() })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-6 py-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "input",
                  {
                    type: "checkbox",
                    defaultChecked: ((_c = producto.assets.image) == null ? void 0 : _c.exists) || false,
                    className: "h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded",
                    onChange: (e) => {
                      const key = `photo_ok_${producto.id}`;
                      localStorage.setItem(key, e.target.checked.toString());
                    }
                  }
                ) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-6 py-4", children: ((_d = producto.assets.pdf) == null ? void 0 : _d.exists) ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "a",
                  {
                    href: producto.assets.pdf.downloadUrl,
                    target: "_blank",
                    rel: "noopener noreferrer",
                    className: "inline-flex items-center px-3 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full hover:bg-blue-200",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { className: "w-3 h-3 mr-1" }),
                      producto.assets.pdf.size
                    ]
                  }
                ) : /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center px-3 py-1 bg-red-100 text-red-800 text-xs font-medium rounded-full", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { className: "w-3 h-3 mr-1" }),
                  "No disponible"
                ] }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "px-6 py-4", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm text-gray-900", children: ((_e = producto.assets.pdf) == null ? void 0 : _e.filename) || "Sin PDF" }),
                  ((_f = producto.assets.pdf) == null ? void 0 : _f.size) && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-gray-500", children: producto.assets.pdf.size })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-6 py-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "input",
                  {
                    type: "checkbox",
                    defaultChecked: ((_g = producto.assets.pdf) == null ? void 0 : _g.exists) || false,
                    className: "h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded",
                    onChange: (e) => {
                      const key = `pdf_ok_${producto.id}`;
                      localStorage.setItem(key, e.target.checked.toString());
                    }
                  }
                ) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-6 py-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center px-3 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { className: "w-3 h-3 mr-1" }),
                  "OK"
                ] }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-6 py-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "input",
                  {
                    type: "text",
                    placeholder: "Agregar anotaciones...",
                    className: "w-full text-sm border border-gray-300 rounded px-2 py-1"
                  }
                ) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-6 py-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "input",
                  {
                    type: "text",
                    placeholder: "Asignar responsable",
                    className: "w-full text-sm border border-gray-300 rounded px-2 py-1"
                  }
                ) })
              ] }, producto.id);
            }) })
          ] }) })
        ) : (
          /* Vista agrupada por clasificación */
          /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: Object.entries(productosAgrupados).map(([clasificacion, grupo]) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border-b border-gray-200 last:border-b-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-gray-100 px-6 py-3 border-b border-gray-200", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-lg font-semibold text-gray-900", children: grupo.nombre }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full", children: [
                grupo.productos.length,
                " producto",
                grupo.productos.length !== 1 ? "s" : ""
              ] })
            ] }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "min-w-full divide-y divide-gray-200", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { className: "bg-gray-50", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider", children: "Código" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider", children: "Nombre" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider", children: "Descripción" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider", children: "Fotografía" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider", children: "Nombre Archivo" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider", children: "Foto OK" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider", children: "PDF" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider", children: "Nombre PDF" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider", children: "Estado QA" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider", children: "Acciones" })
              ] }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { className: "bg-white divide-y divide-gray-200", children: grupo.productos.map((producto) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                ProductoRow,
                {
                  producto,
                  onEdit: (producto2) => {
                    setSelectedProduct(producto2);
                    setIsEditModalOpen(true);
                  }
                },
                producto.id
              )) })
            ] }) }),
            clasificacion !== Object.keys(productosAgrupados)[Object.keys(productosAgrupados).length - 1] && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-yellow-50 border-l-4 border-yellow-400 p-4 text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-yellow-800 font-medium", children: "ADITIVOS" }) })
          ] }, clasificacion)) })
        ),
        productosFiltrados.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center py-12", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { className: "mx-auto h-12 w-12 text-gray-400" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "mt-2 text-sm font-medium text-gray-900", children: "No se encontraron productos" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-sm text-gray-500", children: "Intenta ajustar los filtros de búsqueda." })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        ProductModal,
        {
          isOpen: isModalOpen,
          onClose: handleCloseModal,
          onSave: handleSaveProduct,
          product: selectedProduct
        }
      ),
      selectedProduct && isEditModalOpen && /* @__PURE__ */ jsxRuntimeExports.jsx(
        ProductEditModal,
        {
          isOpen: isEditModalOpen,
          onClose: () => {
            setIsEditModalOpen(false);
            setSelectedProduct(null);
          },
          onSave: (updatedProduct) => {
            console.log("Producto actualizado:", updatedProduct);
            setIsEditModalOpen(false);
            setSelectedProduct(null);
          },
          product: selectedProduct
        }
      )
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Footer, {})
  ] });
};
export {
  InventarioProductos as default
};
