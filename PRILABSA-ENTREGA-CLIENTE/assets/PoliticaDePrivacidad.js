import { u as useLanguage, j as jsxRuntimeExports, L as Layout, d as StaticHero, B as Breadcrumbs } from "./index.js";
import "./vendor.js";
import "./react.js";
const PoliticaDePrivacidad = () => {
  const { t } = useLanguage();
  const breadcrumbPaths = [
    { name: t("header.navigation.home"), path: "/" },
    { name: t("legal.privacyPolicy.breadcrumb"), path: "/politica-de-privacidad" }
  ];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Layout, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      StaticHero,
      {
        title: t("legal.privacyPolicy.title"),
        subtitle: t("legal.privacyPolicy.subtitle"),
        backgroundImage: "/assets/iniciodev/prilabsa-hero-legal.png"
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Breadcrumbs, { paths: breadcrumbPaths }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "relative py-16 lg:py-20 bg-gradient-to-br from-gray-50 to-white", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "container mx-auto px-6 md:px-10 lg:px-16", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-4xl mx-auto", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-white rounded-xl shadow-lg p-8 mb-12 border-l-4 border-prilabsa-orange-primary", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start space-x-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-12 h-12 bg-prilabsa-orange-primary rounded-full flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { className: "w-6 h-6 text-white", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" }) }) }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-xl font-bold text-prilabsa-blue-primary mb-2", children: t("legal.privacyPolicy.commitment.title") }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-gray-700 leading-relaxed", children: t("legal.privacyPolicy.commitment.content") })
        ] })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-10", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-xl shadow-md p-8 hover:shadow-lg transition-shadow duration-300", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center mb-6", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-8 h-8 bg-prilabsa-blue-primary rounded-full flex items-center justify-center mr-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-white font-bold text-sm", children: t("legal.privacyPolicy.sections.section1.number") }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-2xl font-bold text-prilabsa-blue-primary", children: t("legal.privacyPolicy.sections.section1.heading") })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-gray-50 rounded-lg p-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-gray-700 leading-relaxed", dangerouslySetInnerHTML: { __html: t("legal.privacyPolicy.sections.section1.content") } }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-xl shadow-md p-8 hover:shadow-lg transition-shadow duration-300", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center mb-6", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-8 h-8 bg-prilabsa-blue-primary rounded-full flex items-center justify-center mr-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-white font-bold text-sm", children: t("legal.privacyPolicy.sections.section2.number") }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-2xl font-bold text-prilabsa-blue-primary", children: t("legal.privacyPolicy.sections.section2.heading") })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-gray-50 rounded-lg p-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-gray-700 leading-relaxed", dangerouslySetInnerHTML: { __html: t("legal.privacyPolicy.sections.section2.content") } }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-xl shadow-md p-8 hover:shadow-lg transition-shadow duration-300", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center mb-6", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-8 h-8 bg-prilabsa-blue-primary rounded-full flex items-center justify-center mr-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-white font-bold text-sm", children: t("legal.privacyPolicy.sections.section3.number") }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-2xl font-bold text-prilabsa-blue-primary", children: t("legal.privacyPolicy.sections.section3.heading") })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-gray-50 rounded-lg p-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-gray-700 leading-relaxed", dangerouslySetInnerHTML: { __html: t("legal.privacyPolicy.sections.section3.content") } }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-xl shadow-md p-8 hover:shadow-lg transition-shadow duration-300", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center mb-6", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-8 h-8 bg-prilabsa-blue-primary rounded-full flex items-center justify-center mr-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-white font-bold text-sm", children: t("legal.privacyPolicy.sections.section4.number") }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-2xl font-bold text-prilabsa-blue-primary", children: t("legal.privacyPolicy.sections.section4.heading") })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-gray-50 rounded-lg p-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-gray-700 leading-relaxed", dangerouslySetInnerHTML: { __html: t("legal.privacyPolicy.sections.section4.content") } }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-xl shadow-md p-8 hover:shadow-lg transition-shadow duration-300", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center mb-6", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-8 h-8 bg-prilabsa-blue-primary rounded-full flex items-center justify-center mr-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-white font-bold text-sm", children: t("legal.privacyPolicy.sections.section5.number") }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-2xl font-bold text-prilabsa-blue-primary", children: t("legal.privacyPolicy.sections.section5.heading") })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-gray-50 rounded-lg p-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-gray-700 leading-relaxed", dangerouslySetInnerHTML: { __html: t("legal.privacyPolicy.sections.section5.content") } }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-xl shadow-md p-8 hover:shadow-lg transition-shadow duration-300", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center mb-6", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-8 h-8 bg-prilabsa-blue-primary rounded-full flex items-center justify-center mr-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-white font-bold text-sm", children: t("legal.privacyPolicy.sections.section6.number") }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-2xl font-bold text-prilabsa-blue-primary", children: t("legal.privacyPolicy.sections.section6.heading") })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-gray-50 rounded-lg p-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-gray-700 leading-relaxed", dangerouslySetInnerHTML: { __html: t("legal.privacyPolicy.sections.section6.content") } }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-xl shadow-md p-8 hover:shadow-lg transition-shadow duration-300", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center mb-6", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-8 h-8 bg-prilabsa-blue-primary rounded-full flex items-center justify-center mr-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-white font-bold text-sm", children: t("legal.privacyPolicy.sections.section7.number") }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-2xl font-bold text-prilabsa-blue-primary", children: t("legal.privacyPolicy.sections.section7.heading") })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-gray-50 rounded-lg p-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-gray-700 leading-relaxed", dangerouslySetInnerHTML: { __html: t("legal.privacyPolicy.sections.section7.content") } }) })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-12 bg-gradient-to-r from-prilabsa-blue-primary to-prilabsa-orange-primary rounded-xl p-6 text-white text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm", children: /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: t("legal.privacyPolicy.lastUpdate") }) }) })
    ] }) }) })
  ] });
};
export {
  PoliticaDePrivacidad as default
};
