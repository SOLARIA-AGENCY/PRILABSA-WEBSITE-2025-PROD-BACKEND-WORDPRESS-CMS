import { c as createLucideIcon, j as jsxRuntimeExports, u as useLanguage, L as Layout, m } from "./index.js";
import { H as HeroVideo } from "./HeroVideo.js";
import { r as reactExports } from "./vendor.js";
import { o as oficinasData } from "./oficinasData.js";
import { F as FileText } from "./file-text.js";
import OficinasMap from "./OficinasMap.js";
import "./react.js";
/**
 * @license lucide-react v0.525.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$4 = [
  ["path", { d: "m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7", key: "132q7q" }],
  ["rect", { x: "2", y: "4", width: "20", height: "16", rx: "2", key: "izxlao" }]
];
const Mail = createLucideIcon("mail", __iconNode$4);
/**
 * @license lucide-react v0.525.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$3 = [
  [
    "path",
    {
      d: "M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0",
      key: "1r0f0z"
    }
  ],
  ["circle", { cx: "12", cy: "10", r: "3", key: "ilqhr7" }]
];
const MapPin = createLucideIcon("map-pin", __iconNode$3);
/**
 * @license lucide-react v0.525.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  [
    "path",
    {
      d: "M13.832 16.568a1 1 0 0 0 1.213-.303l.355-.465A2 2 0 0 1 17 15h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2A18 18 0 0 1 2 4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-.8 1.6l-.468.351a1 1 0 0 0-.292 1.233 14 14 0 0 0 6.392 6.384",
      key: "9njp5v"
    }
  ]
];
const Phone = createLucideIcon("phone", __iconNode$2);
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
      d: "M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2",
      key: "143wyd"
    }
  ],
  ["path", { d: "M6 9V3a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v6", key: "1itne7" }],
  ["rect", { x: "6", y: "14", width: "12", height: "8", rx: "1", key: "1ue0tg" }]
];
const Printer = createLucideIcon("printer", __iconNode$1);
/**
 * @license lucide-react v0.525.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["rect", { width: "14", height: "20", x: "5", y: "2", rx: "2", ry: "2", key: "1yt0o3" }],
  ["path", { d: "M12 18h.01", key: "mhygvu" }]
];
const Smartphone = createLucideIcon("smartphone", __iconNode);
const OficinasTabs = () => {
  var _a, _b;
  const [activeTab, setActiveTab] = reactExports.useState((_a = oficinasData[0]) == null ? void 0 : _a.nombre);
  const paisesPrincipalesNombres = ["Ecuador", "Brasil", "USA", "México"];
  const paisesPrincipales = oficinasData.filter((p) => paisesPrincipalesNombres.includes(p.nombre));
  const otrosPaises = oficinasData.filter((p) => !paisesPrincipalesNombres.includes(p.nombre));
  const renderTabButton = (pais) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "button",
    {
      className: `grid place-items-center gap-2 p-4 mx-1 my-1 text-sm font-bold uppercase transition-all duration-300 focus:outline-none rounded-lg transform hover:-translate-y-1 w-28 h-28 ${activeTab === pais.nombre ? "shadow-lg" : ""}`,
      onClick: () => setActiveTab(pais.nombre),
      style: {
        color: activeTab === pais.nombre ? "#3759C1" : "#4B5563",
        backgroundColor: activeTab === pais.nombre ? "rgba(255, 255, 255, 0.8)" : "rgba(255, 255, 255, 0.4)"
      },
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: pais.bandera, alt: `Bandera de ${pais.nombre}`, className: "w-10 h-10 rounded-full shadow-md" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-center", children: pais.nombre })
      ]
    },
    pais.nombre
  );
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "section",
    {
      className: "py-16 lg:py-24 bg-cover bg-center",
      style: {
        backgroundImage: `url('/assets/iniciodev/backgrounds_light/background_light_2.png')`
      },
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center mb-12", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-4xl font-bold uppercase", style: { color: "#3759C1" }, children: "Nuestras Sedes" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-lg mt-2 font-semibold", style: { color: "#3759C1" }, children: "Encuentra la oficina de Prilabsa más cercana a ti." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center mb-8", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-center flex-wrap max-w-4xl mx-auto", children: paisesPrincipales.map(renderTabButton) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-center flex-wrap max-w-4xl mx-auto mt-2", children: otrosPaises.map(renderTabButton) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-center items-center min-h-[350px]", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-8 justify-items-center justify-center max-w-2xl w-full mx-auto h-full", children: (_b = oficinasData.find((pais) => pais.nombre === activeTab)) == null ? void 0 : _b.oficinas.map((oficina) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white bg-opacity-90 py-2 px-4 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300 backdrop-blur-sm w-full max-w-sm min-h-[180px] flex flex-col mx-auto", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-xl font-bold mb-3 text-center", style: { color: "#3759C1" }, children: oficina.ciudad }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2 text-gray-800 flex-1 flex flex-col justify-center", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "w-5 h-5 mr-3 mt-1 text-orange-500 flex-shrink-0", style: { color: "#f6921d" } }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { dangerouslySetInnerHTML: { __html: oficina.direccion.join("<br />") } })
            ] }),
            oficina.telefono && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { className: "w-5 h-5 mr-3 text-orange-500 flex-shrink-0", style: { color: "#f6921d" } }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: `tel:${oficina.telefono.replace(/\s/g, "")}`, className: "hover:text-blue-900", children: oficina.telefono })
            ] }),
            oficina.movil && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Smartphone, { className: "w-5 h-5 mr-3 text-orange-500 flex-shrink-0", style: { color: "#f6921d" } }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: `tel:${oficina.movil.replace(/\s/g, "")}`, className: "hover:text-blue-900", children: oficina.movil })
            ] }),
            oficina.fax && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Printer, { className: "w-5 h-5 mr-3 text-orange-500 flex-shrink-0", style: { color: "#f6921d" } }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: oficina.fax })
            ] }),
            oficina.email && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Mail, { className: "w-5 h-5 mr-3 text-orange-500 flex-shrink-0", style: { color: "#f6921d" } }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: `mailto:${oficina.email}`, className: "hover:text-blue-900", title: `Enviar correo a ${oficina.email}`, children: oficina.email })
            ] }),
            oficina.rif && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "w-5 h-5 mr-3 text-orange-500 flex-shrink-0", style: { color: "#f6921d" } }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                "RIF: ",
                oficina.rif
              ] })
            ] })
          ] })
        ] }, oficina.ciudad)) }) })
      ] })
    }
  );
};
const Oficinas = () => {
  const { t } = useLanguage();
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Layout, { isHeroPage: true, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(HeroVideo, { videoSrc: "/assets/videos/agencias-hero.mp4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-bold leading-tight text-left text-white", children: [
      t("offices.hero.title"),
      /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        m,
        {
          sequence: [
            t("offices.hero.countries.ecuador"),
            2e3,
            t("offices.hero.countries.brasil"),
            2e3,
            t("offices.hero.countries.usa"),
            2e3,
            t("offices.hero.countries.mexico"),
            2e3,
            t("offices.hero.countries.honduras"),
            2e3,
            t("offices.hero.countries.panama"),
            2e3,
            t("offices.hero.countries.nicaragua"),
            2e3,
            t("offices.hero.countries.venezuela"),
            2e3,
            t("offices.hero.countries.peru"),
            2e3
          ],
          wrapper: "span",
          speed: 50,
          style: { color: "#f6921d", fontWeight: 900 },
          repeat: Infinity
        }
      )
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(OficinasTabs, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsx(OficinasMap, {})
    ] })
  ] });
};
export {
  Oficinas as default
};
