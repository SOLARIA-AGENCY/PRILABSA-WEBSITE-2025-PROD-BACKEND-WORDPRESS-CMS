import { u as useLanguage, j as jsxRuntimeExports, L as Layout, d as StaticHero, B as Breadcrumbs } from "./index.js";
import "./vendor.js";
import "./react.js";
const PoliticaDeCookies = () => {
  const { t } = useLanguage();
  const breadcrumbPaths = [
    { name: t("header.navigation.home"), path: "/" },
    { name: t("legal.cookiePolicy.breadcrumb"), path: "/politica-de-cookies" }
  ];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Layout, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      StaticHero,
      {
        title: t("legal.cookiePolicy.title"),
        subtitle: t("legal.cookiePolicy.subtitle"),
        backgroundImage: "/assets/iniciodev/prilabsa-hero-legal.png"
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Breadcrumbs, { paths: breadcrumbPaths }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "container mx-auto px-4 py-12 lg:py-16", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-5xl mx-auto", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "mb-12 bg-gradient-to-r from-orange-50 to-blue-50 rounded-xl p-8 lg:p-10 shadow-sm", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-4 mb-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-shrink-0 w-12 h-12 bg-orange-500 rounded-lg flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { className: "w-6 h-6 text-white", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" }) }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "text-2xl lg:text-3xl font-bold text-gray-800 mb-4", children: [
            t("legal.cookiePolicy.sections.section1.number"),
            ". ",
            t("legal.cookiePolicy.sections.section1.heading")
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-gray-700 leading-relaxed text-lg", dangerouslySetInnerHTML: { __html: t("legal.cookiePolicy.sections.section1.content") } })
        ] })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "mb-12 bg-white rounded-xl p-8 lg:p-10 shadow-sm border border-gray-100", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-4 mb-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-shrink-0 w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { className: "w-6 h-6 text-white", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" }) }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "text-2xl lg:text-3xl font-bold text-gray-800 mb-4", children: [
            t("legal.cookiePolicy.sections.section2.number"),
            ". ",
            t("legal.cookiePolicy.sections.section2.heading")
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-gray-700 leading-relaxed text-lg mb-6", dangerouslySetInnerHTML: { __html: t("legal.cookiePolicy.sections.section2.content") } }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full border-collapse bg-gray-50 rounded-lg overflow-hidden shadow-sm", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "bg-gradient-to-r from-orange-500 to-blue-600 text-white", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-6 py-4 text-left font-semibold", children: "Nombre" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-6 py-4 text-left font-semibold", children: "Tipo" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-6 py-4 text-left font-semibold", children: "Finalidad" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-6 py-4 text-left font-semibold", children: "Duración" })
            ] }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("tbody", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-b border-gray-200 hover:bg-white transition-colors", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-6 py-4 font-medium text-gray-800", children: "prilabsa_cookie_consent" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-6 py-4 text-gray-700", children: "Técnica / Preferencia" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-6 py-4 text-gray-700", children: "Almacena la preferencia del usuario sobre la aceptación o rechazo de cookies." }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-6 py-4 text-gray-700", children: "Permanente (localStorage)" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-b border-gray-200 hover:bg-white transition-colors", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-6 py-4 font-medium text-gray-800", children: "prilabsa-language" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-6 py-4 text-gray-700", children: "Técnica / Preferencia" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-6 py-4 text-gray-700", children: "Guarda la preferencia de idioma del usuario (español/inglés)." }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-6 py-4 text-gray-700", children: "Permanente (localStorage)" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-b border-gray-200 hover:bg-white transition-colors", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-6 py-4 font-medium text-gray-800", children: "prilabsa_auth" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-6 py-4 text-gray-700", children: "Técnica / Funcional" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-6 py-4 text-gray-700", children: "Mantiene el estado de autenticación del usuario en el sistema." }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-6 py-4 text-gray-700", children: "Sesión (localStorage)" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-b border-gray-200 hover:bg-white transition-colors", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-6 py-4 font-medium text-gray-800", children: "i18nextLng" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-6 py-4 text-gray-700", children: "Técnica / Preferencia" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-6 py-4 text-gray-700", children: "Cookie técnica del sistema de internacionalización para detectar y mantener el idioma preferido." }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-6 py-4 text-gray-700", children: "Permanente (localStorage)" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-b border-gray-200 hover:bg-white transition-colors", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-6 py-4 font-medium text-gray-800", children: "producto_[ID]" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-6 py-4 text-gray-700", children: "Técnica / Funcional" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-6 py-4 text-gray-700", children: "Almacena temporalmente datos de productos en el inventario para mejorar la experiencia del usuario." }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-6 py-4 text-gray-700", children: "Sesión (localStorage)" })
              ] })
            ] })
          ] }) })
        ] })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "mb-12 bg-gradient-to-r from-blue-50 to-orange-50 rounded-xl p-8 lg:p-10 shadow-sm", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-4 mb-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-shrink-0 w-12 h-12 bg-orange-500 rounded-lg flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("svg", { className: "w-6 h-6 text-white", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M15 12a3 3 0 11-6 0 3 3 0 016 0z" })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "text-2xl lg:text-3xl font-bold text-gray-800 mb-4", children: [
            t("legal.cookiePolicy.sections.section3.number"),
            ". ",
            t("legal.cookiePolicy.sections.section3.heading")
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-gray-700 leading-relaxed text-lg mb-6", dangerouslySetInnerHTML: { __html: t("legal.cookiePolicy.sections.section3.content") } }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4 mb-6", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "a",
              {
                href: "https://support.google.com/chrome/answer/95647?hl=es",
                target: "_blank",
                rel: "noopener noreferrer",
                className: "flex items-center gap-3 p-4 bg-white rounded-lg border border-gray-200 hover:border-orange-300 hover:shadow-md transition-all",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { className: "w-4 h-4 text-orange-600", fill: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" }) }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-gray-800", children: "Google Chrome" })
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "a",
              {
                href: "https://support.mozilla.org/es/kb/habilitar-y-deshabilitar-cookies-sitios-web-rastrear-preferencias",
                target: "_blank",
                rel: "noopener noreferrer",
                className: "flex items-center gap-3 p-4 bg-white rounded-lg border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { className: "w-4 h-4 text-blue-600", fill: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" }) }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-gray-800", children: "Mozilla Firefox" })
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "a",
              {
                href: "https://support.apple.com/es-es/guide/safari/sfri11471/mac",
                target: "_blank",
                rel: "noopener noreferrer",
                className: "flex items-center gap-3 p-4 bg-white rounded-lg border border-gray-200 hover:border-orange-300 hover:shadow-md transition-all",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { className: "w-4 h-4 text-orange-600", fill: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" }) }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-gray-800", children: "Apple Safari" })
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "a",
              {
                href: "https://support.microsoft.com/es-es/microsoft-edge/eliminar-las-cookies-en-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09",
                target: "_blank",
                rel: "noopener noreferrer",
                className: "flex items-center gap-3 p-4 bg-white rounded-lg border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { className: "w-4 h-4 text-blue-600", fill: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" }) }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-gray-800", children: "Microsoft Edge" })
                ]
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-r-lg", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-yellow-800 font-medium", children: t("legal.cookiePolicy.cookieWarningWorking") }) })
        ] })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "mb-12 bg-white rounded-xl p-8 lg:p-10 shadow-sm border border-gray-100", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-4 mb-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-shrink-0 w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { className: "w-6 h-6 text-white", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" }) }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "text-2xl lg:text-3xl font-bold text-gray-800 mb-4", children: [
            t("legal.cookiePolicy.sections.section4.number"),
            ". ",
            t("legal.cookiePolicy.sections.section4.heading")
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-gray-700 leading-relaxed text-lg", dangerouslySetInnerHTML: { __html: t("legal.cookiePolicy.sections.section4.content") } })
        ] })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "mb-12 bg-gradient-to-r from-orange-50 to-blue-50 rounded-xl p-8 lg:p-10 shadow-sm", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-4 mb-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-shrink-0 w-12 h-12 bg-orange-500 rounded-lg flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { className: "w-6 h-6 text-white", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" }) }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "text-2xl lg:text-3xl font-bold text-gray-800 mb-4", children: [
            t("legal.cookiePolicy.sections.section5.number"),
            ". ",
            t("legal.cookiePolicy.sections.section5.heading")
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-gray-700 leading-relaxed text-lg mb-6", dangerouslySetInnerHTML: { __html: t("legal.cookiePolicy.sections.section5.content") } }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-6 h-6 bg-orange-100 rounded-full flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { className: "w-3 h-3 text-orange-600", fill: "currentColor", viewBox: "0 0 20 20", children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { fillRule: "evenodd", d: "M4 4a2 2 0 012-2h8a2 2 0 012 2v12a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 0v12h8V4H6z", clipRule: "evenodd" }) }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-gray-700", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Empresa:" }),
                  " PRIME LABORATORIO PRILAB SA"
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { className: "w-3 h-3 text-blue-600", fill: "currentColor", viewBox: "0 0 20 20", children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { fillRule: "evenodd", d: "M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z", clipRule: "evenodd" }) }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-gray-700", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Dirección:" }),
                  " AV. CARLOS JULIO AROSEMENA KM 2.5 VIA DAULE C.C. ALBAN BORJA PLANTA BAJA LOCAL 055 TARQUI, GUAYAQUIL, GUAYAS - ECUADOR"
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-6 h-6 bg-orange-100 rounded-full flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("svg", { className: "w-3 h-3 text-orange-600", fill: "currentColor", viewBox: "0 0 20 20", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" })
                ] }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-gray-700", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "RUC:" }),
                  " 0992398840001"
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("svg", { className: "w-3 h-3 text-blue-600", fill: "currentColor", viewBox: "0 0 20 20", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" })
                ] }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-gray-700", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Email:" }),
                  " info@prilabsa.com"
                ] })
              ] })
            ] })
          ] })
        ] })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-center py-8", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "inline-flex items-center gap-2 px-6 py-3 bg-gray-100 rounded-full", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { className: "w-5 h-5 text-gray-500", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-gray-600 font-medium", children: t("legal.cookiePolicy.lastUpdate") })
      ] }) })
    ] }) })
  ] });
};
export {
  PoliticaDeCookies as default
};
