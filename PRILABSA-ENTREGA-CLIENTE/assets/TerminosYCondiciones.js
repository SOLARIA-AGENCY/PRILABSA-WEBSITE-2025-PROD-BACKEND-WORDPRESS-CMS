import { u as useLanguage, j as jsxRuntimeExports, L as Layout, d as StaticHero, B as Breadcrumbs } from "./index.js";
import "./vendor.js";
import "./react.js";
const TerminosYCondiciones = () => {
  const { t } = useLanguage();
  const breadcrumbPaths = [
    { name: t("header.navigation.home"), path: "/" },
    { name: t("legal.termsAndConditions.breadcrumb"), path: "/terminos-y-condiciones" }
  ];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Layout, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      StaticHero,
      {
        title: t("legal.termsAndConditions.title"),
        subtitle: t("legal.termsAndConditions.subtitle"),
        backgroundImage: "/assets/iniciodev/prilabsa-hero-legal.png"
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Breadcrumbs, { paths: breadcrumbPaths }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "relative py-16 lg:py-20 bg-gradient-to-br from-gray-50 to-white", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "container mx-auto px-6 md:px-10 lg:px-16", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-4xl mx-auto", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-white rounded-xl shadow-lg p-8 mb-12 border-l-4 border-prilabsa-blue-primary", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start space-x-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-12 h-12 bg-prilabsa-blue-primary rounded-full flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { className: "w-6 h-6 text-white", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" }) }) }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-gray-700 leading-relaxed", children: t("legal.termsAndConditions.introduction") }) })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-10", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-xl shadow-md p-8 hover:shadow-lg transition-shadow duration-300", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center mb-6", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-8 h-8 bg-prilabsa-orange-primary rounded-full flex items-center justify-center mr-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-white font-bold text-sm", children: t("legal.termsAndConditions.sections.section1.number") }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-2xl font-bold text-prilabsa-blue-primary", children: t("legal.termsAndConditions.sections.section1.heading") })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-orange-50 rounded-lg p-6 border-l-3 border-prilabsa-orange-primary", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-gray-700 leading-relaxed", dangerouslySetInnerHTML: { __html: t("legal.termsAndConditions.sections.section1.content") } }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-xl shadow-md p-8 hover:shadow-lg transition-shadow duration-300", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center mb-6", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-8 h-8 bg-prilabsa-orange-primary rounded-full flex items-center justify-center mr-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-white font-bold text-sm", children: t("legal.termsAndConditions.sections.section2.number") }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-2xl font-bold text-prilabsa-blue-primary", children: t("legal.termsAndConditions.sections.section2.heading") })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-orange-50 rounded-lg p-6 border-l-3 border-prilabsa-orange-primary", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-gray-700 leading-relaxed", dangerouslySetInnerHTML: { __html: t("legal.termsAndConditions.sections.section2.content") } }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-xl shadow-md p-8 hover:shadow-lg transition-shadow duration-300", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center mb-6", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-8 h-8 bg-prilabsa-orange-primary rounded-full flex items-center justify-center mr-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-white font-bold text-sm", children: t("legal.termsAndConditions.sections.section3.number") }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-2xl font-bold text-prilabsa-blue-primary", children: t("legal.termsAndConditions.sections.section3.heading") })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-orange-50 rounded-lg p-6 border-l-3 border-prilabsa-orange-primary", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-gray-700 leading-relaxed", dangerouslySetInnerHTML: { __html: t("legal.termsAndConditions.sections.section3.content") } }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-xl shadow-md p-8 hover:shadow-lg transition-shadow duration-300", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center mb-6", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-8 h-8 bg-prilabsa-orange-primary rounded-full flex items-center justify-center mr-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-white font-bold text-sm", children: t("legal.termsAndConditions.sections.section4.number") }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-2xl font-bold text-prilabsa-blue-primary", children: t("legal.termsAndConditions.sections.section4.heading") })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-orange-50 rounded-lg p-6 border-l-3 border-prilabsa-orange-primary", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-gray-700 leading-relaxed", dangerouslySetInnerHTML: { __html: t("legal.termsAndConditions.sections.section4.content") } }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-xl shadow-md p-8 hover:shadow-lg transition-shadow duration-300", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center mb-6", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-8 h-8 bg-prilabsa-orange-primary rounded-full flex items-center justify-center mr-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-white font-bold text-sm", children: t("legal.termsAndConditions.sections.section5.number") }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-2xl font-bold text-prilabsa-blue-primary", children: t("legal.termsAndConditions.sections.section5.heading") })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-orange-50 rounded-lg p-6 border-l-3 border-prilabsa-orange-primary", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-gray-700 leading-relaxed", dangerouslySetInnerHTML: { __html: t("legal.termsAndConditions.sections.section5.content") } }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-xl shadow-md p-8 hover:shadow-lg transition-shadow duration-300", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center mb-6", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-8 h-8 bg-prilabsa-orange-primary rounded-full flex items-center justify-center mr-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-white font-bold text-sm", children: t("legal.termsAndConditions.sections.section6.number") }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-2xl font-bold text-prilabsa-blue-primary", children: t("legal.termsAndConditions.sections.section6.heading") })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-orange-50 rounded-lg p-6 border-l-3 border-prilabsa-orange-primary", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-gray-700 leading-relaxed", dangerouslySetInnerHTML: { __html: t("legal.termsAndConditions.sections.section6.content") } }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-xl shadow-md p-8 hover:shadow-lg transition-shadow duration-300", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center mb-6", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-8 h-8 bg-prilabsa-orange-primary rounded-full flex items-center justify-center mr-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-white font-bold text-sm", children: t("legal.termsAndConditions.sections.section7.number") }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-2xl font-bold text-prilabsa-blue-primary", children: t("legal.termsAndConditions.sections.section7.heading") })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-orange-50 rounded-lg p-6 border-l-3 border-prilabsa-orange-primary", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-gray-700 leading-relaxed", dangerouslySetInnerHTML: { __html: t("legal.termsAndConditions.sections.section7.content") } }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-xl shadow-md p-8 hover:shadow-lg transition-shadow duration-300", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center mb-6", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-8 h-8 bg-prilabsa-orange-primary rounded-full flex items-center justify-center mr-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-white font-bold text-sm", children: t("legal.termsAndConditions.sections.section8.number") }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-2xl font-bold text-prilabsa-blue-primary", children: t("legal.termsAndConditions.sections.section8.heading") })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-orange-50 rounded-lg p-6 border-l-3 border-prilabsa-orange-primary", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-gray-700 leading-relaxed", dangerouslySetInnerHTML: { __html: t("legal.termsAndConditions.sections.section8.content") } }) })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-12 bg-gradient-to-r from-prilabsa-blue-primary to-prilabsa-orange-primary rounded-xl p-6 text-white text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm", children: t("legal.termsAndConditions.lastUpdate") }) })
    ] }) }) })
  ] });
};
export {
  TerminosYCondiciones as default
};
