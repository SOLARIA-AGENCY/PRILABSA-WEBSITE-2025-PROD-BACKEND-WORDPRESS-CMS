import { u as useLanguage, j as jsxRuntimeExports, L as Layout, d as StaticHero, B as Breadcrumbs } from "./index.js";
import "./vendor.js";
import "./react.js";
const AvisoLegal = () => {
  const { t } = useLanguage();
  const breadcrumbPaths = [
    { name: t("header.navigation.home"), path: "/" },
    { name: t("legal.legalNotice.breadcrumb"), path: "/aviso-legal" }
  ];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Layout, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      StaticHero,
      {
        title: t("legal.legalNotice.title"),
        subtitle: t("legal.legalNotice.subtitle"),
        backgroundImage: "/assets/iniciodev/prilabsa-hero-legal.png"
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Breadcrumbs, { paths: breadcrumbPaths }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "relative py-16 lg:py-20 bg-gradient-to-br from-gray-50 to-white", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "container mx-auto px-6 md:px-10 lg:px-16", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-4xl mx-auto", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-white rounded-xl shadow-lg p-8 mb-12 border-l-4 border-prilabsa-blue-primary", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start space-x-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-12 h-12 bg-prilabsa-blue-primary rounded-full flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { className: "w-6 h-6 text-white", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16l-3-9m3 9l3-9" }) }) }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-xl font-bold text-prilabsa-blue-primary mb-2", children: t("footer.legal.legalNotice.commitment.title") }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-gray-700 leading-relaxed", children: t("footer.legal.legalNotice.commitment.content") })
        ] })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-10", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-xl shadow-md p-8 hover:shadow-lg transition-shadow duration-300", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center mb-6", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-8 h-8 bg-prilabsa-orange-primary rounded-full flex items-center justify-center mr-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-white font-bold text-sm", children: t("legal.legalNotice.sections.section1.number") }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-2xl font-bold text-prilabsa-blue-primary", children: t("legal.legalNotice.sections.section1.heading") })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-blue-50 rounded-lg p-6 border-l-3 border-prilabsa-blue-primary", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-gray-700 leading-relaxed", dangerouslySetInnerHTML: { __html: t("legal.legalNotice.sections.section1.content") } }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-xl shadow-md p-8 hover:shadow-lg transition-shadow duration-300", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center mb-6", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-8 h-8 bg-prilabsa-orange-primary rounded-full flex items-center justify-center mr-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-white font-bold text-sm", children: t("legal.legalNotice.sections.section2.number") }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-2xl font-bold text-prilabsa-blue-primary", children: t("legal.legalNotice.sections.section2.heading") })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-orange-50 rounded-lg p-6 border-l-3 border-prilabsa-orange-primary", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-gray-700 leading-relaxed", dangerouslySetInnerHTML: { __html: t("legal.legalNotice.sections.section2.content") } }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-xl shadow-md p-8 hover:shadow-lg transition-shadow duration-300", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center mb-6", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-8 h-8 bg-prilabsa-orange-primary rounded-full flex items-center justify-center mr-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-white font-bold text-sm", children: t("legal.legalNotice.sections.section3.number") }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-2xl font-bold text-prilabsa-blue-primary", children: t("legal.legalNotice.sections.section3.heading") })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-blue-50 rounded-lg p-6 border-l-3 border-prilabsa-blue-primary", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-gray-700 leading-relaxed", dangerouslySetInnerHTML: { __html: t("legal.legalNotice.sections.section3.content") } }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-xl shadow-md p-8 hover:shadow-lg transition-shadow duration-300", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center mb-6", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-8 h-8 bg-prilabsa-orange-primary rounded-full flex items-center justify-center mr-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-white font-bold text-sm", children: t("legal.legalNotice.sections.section4.number") }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-2xl font-bold text-prilabsa-blue-primary", children: t("legal.legalNotice.sections.section4.heading") })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-orange-50 rounded-lg p-6 border-l-3 border-prilabsa-orange-primary", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-gray-700 leading-relaxed", dangerouslySetInnerHTML: { __html: t("legal.legalNotice.sections.section4.content") } }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-xl shadow-md p-8 hover:shadow-lg transition-shadow duration-300", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center mb-6", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-8 h-8 bg-prilabsa-orange-primary rounded-full flex items-center justify-center mr-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-white font-bold text-sm", children: t("legal.legalNotice.sections.section5.number") }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-2xl font-bold text-prilabsa-blue-primary", children: t("legal.legalNotice.sections.section5.heading") })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-blue-50 rounded-lg p-6 border-l-3 border-prilabsa-blue-primary", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-gray-700 leading-relaxed", dangerouslySetInnerHTML: { __html: t("legal.legalNotice.sections.section5.content") } }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-xl shadow-md p-8 hover:shadow-lg transition-shadow duration-300", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center mb-6", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-8 h-8 bg-prilabsa-orange-primary rounded-full flex items-center justify-center mr-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-white font-bold text-sm", children: t("legal.legalNotice.sections.section6.number") }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-2xl font-bold text-prilabsa-blue-primary", children: t("legal.legalNotice.sections.section6.heading") })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-orange-50 rounded-lg p-6 border-l-3 border-prilabsa-orange-primary", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-gray-700 leading-relaxed", dangerouslySetInnerHTML: { __html: t("legal.legalNotice.sections.section6.content") } }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-xl shadow-md p-8 hover:shadow-lg transition-shadow duration-300", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center mb-6", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-8 h-8 bg-prilabsa-orange-primary rounded-full flex items-center justify-center mr-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-white font-bold text-sm", children: t("legal.legalNotice.sections.section7.number") }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-2xl font-bold text-prilabsa-blue-primary", children: t("legal.legalNotice.sections.section7.heading") })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-blue-50 rounded-lg p-6 border-l-3 border-prilabsa-blue-primary", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-gray-700 leading-relaxed", dangerouslySetInnerHTML: { __html: t("legal.legalNotice.sections.section7.content") } }) })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-12 bg-gradient-to-r from-prilabsa-blue-primary to-prilabsa-orange-primary rounded-xl shadow-lg p-8 text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-center space-x-3 mb-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { className: "w-6 h-6 text-white", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-white font-semibold text-lg", children: t("legal.legalNotice.lastUpdate") })
      ] }) })
    ] }) }) })
  ] });
};
export {
  AvisoLegal as default
};
