import { u as useLanguage, a as useAuth, j as jsxRuntimeExports, t as translations, O as OptimizedImage } from "./index.js";
import { b as useNavigate, r as reactExports, L as Link } from "./vendor.js";
import "./react.js";
const Header = () => {
  const { t } = useLanguage();
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = reactExports.useState(false);
  const handleLogout = () => {
    logout();
    navigate("/");
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx("header", { className: "bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-center h-16", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        "img",
        {
          src: "/images/logos/prilabsa-logo.png",
          alt: "PRILABSA",
          className: "h-10 w-auto"
        }
      ) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("nav", { className: "hidden md:flex space-x-8 items-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "a",
          {
            href: "#inicio",
            className: "text-gray-900 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors",
            children: "INICIO"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "a",
          {
            href: "#quienes-somos",
            className: "text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors",
            children: "QUIENES SOMOS"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "a",
          {
            href: "#oficinas",
            className: "text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors",
            children: "OFICINAS"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "a",
          {
            href: "#productos",
            className: "text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors",
            children: "PRODUCTOS"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative group", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "a",
            {
              href: "#contactanos",
              className: "text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors",
              children: t("contact.hero.title").toUpperCase()
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute left-0 mt-2 w-48 bg-white rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            "a",
            {
              href: "#trabaja-con-nosotros",
              className: "block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100",
              children: t("careers.hero.title").toUpperCase()
            }
          ) })
        ] }),
        isAuthenticated && /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            onClick: handleLogout,
            className: "ml-4 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 flex items-center space-x-2",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { className: "w-4 h-4", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Cerrar Sesión" })
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "md:hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          onClick: () => setIsMenuOpen(!isMenuOpen),
          className: "text-gray-700 hover:text-blue-600 focus:outline-none focus:text-blue-600",
          children: /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { className: "h-6 w-6", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", children: isMenuOpen ? /* @__PURE__ */ jsxRuntimeExports.jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M6 18L18 6M6 6l12 12" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M4 6h16M4 12h16M4 18h16" }) })
        }
      ) })
    ] }),
    isMenuOpen && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "md:hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t border-gray-200", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "#inicio", className: "block px-3 py-2 text-base font-medium text-gray-900 hover:text-blue-600", children: "INICIO" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "#quienes-somos", className: "block px-3 py-2 text-base font-medium text-gray-700 hover:text-blue-600", children: "QUIENES SOMOS" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "#oficinas", className: "block px-3 py-2 text-base font-medium text-gray-700 hover:text-blue-600", children: "OFICINAS" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "#productos", className: "block px-3 py-2 text-base font-medium text-gray-700 hover:text-blue-600", children: "PRODUCTOS" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "#contactanos", className: "block px-3 py-2 text-base font-medium text-gray-700 hover:text-blue-600", children: t("contact.hero.title").toUpperCase() }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "#trabaja-con-nosotros", className: "block px-3 py-2 text-base font-medium text-gray-500 hover:text-blue-600 ml-4", children: t("careers.hero.title").toUpperCase() }),
      isAuthenticated && /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          onClick: handleLogout,
          className: "block w-full text-left px-3 py-2 text-base font-medium text-red-600 hover:text-red-700 hover:bg-red-50 mt-2 border-t border-gray-200 pt-4",
          children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center space-x-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { className: "w-4 h-4", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013 3v1" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Cerrar Sesión" })
          ] })
        }
      )
    ] }) })
  ] }) });
};
const HeroSection = () => {
  const { t } = useLanguage();
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { id: "inicio", className: "relative h-screen flex items-center justify-center overflow-hidden", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute inset-0 w-full h-full", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "video",
        {
          autoPlay: true,
          muted: true,
          loop: true,
          playsInline: true,
          className: "w-full h-full object-cover",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("source", { src: "/videos/PRILABSA_INICIO_VIDEO_BG_v3.mp4", type: "video/mp4" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "img",
              {
                src: "/images/backgrounds/hero-fallback.jpg",
                alt: "PRILABSA Hero Background",
                className: "w-full h-full object-cover"
              }
            )
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-black bg-opacity-40" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative z-10 text-center text-white px-4 sm:px-6 lg:px-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-4xl mx-auto", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight", children: [
          "Somos proveedores de",
          /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
          "las mejores soluciones",
          /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
          "integrales en",
          /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-blue-400 font-extrabold", children: t("products.categories.alimentos") })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xl sm:text-2xl md:text-3xl mb-8 font-light", children: [
          "Sirviendo a las Américas",
          /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
          "por más de 32 años."
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "a",
          {
            href: "#productos",
            className: "inline-flex items-center px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-lg rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg",
            children: [
              "VER",
              /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { className: "ml-2 w-5 h-5", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M19 9l-7 7-7-7" }) })
            ]
          }
        ) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute bottom-10 left-1/2 transform -translate-x-1/2", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex space-x-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-0 h-0 border-l-4 border-r-4 border-b-8 border-transparent border-b-white opacity-60" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-0 h-0 border-l-4 border-r-4 border-b-8 border-transparent border-b-white opacity-80" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-0 h-0 border-l-4 border-r-4 border-b-8 border-transparent border-b-white" })
      ] }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce", children: /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { className: "w-6 h-6 text-white", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M19 14l-7 7m0 0l-7-7m7 7V3" }) }) })
  ] });
};
const AboutSection = () => {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("section", { id: "quienes-somos", className: "py-20 bg-gray-50", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-center mb-16", children: /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-4xl md:text-5xl font-bold text-gray-900 mb-8", children: "SOMOS" }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid lg:grid-cols-2 gap-12 items-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-lg text-gray-700 leading-relaxed", children: "Prilabsa es una empresa multinacional fundada en el año 1992, dedicándose a la comercialización de alimentos, probióticos, aditivos, equipos y químicos con altos estándares de calidad." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-lg text-gray-700 leading-relaxed", children: "Prilabsa ha podido cubrir todas las necesidades de los laboratorios de camarón, peces y camaroneras, gracias al pleno conocimiento del medio ambiente y la sólida experiencia con nuestro personal capacitado en varios mercados de la industria acuícola." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-lg text-gray-700 leading-relaxed", children: "Prilabsa ha expandido sus actividades en países establecidos como puntos estratégicos del continente americano, contando con oficinas comerciales y bodegas climatizadas en Ecuador (Guayaquil, Manta, Pedernales, San Vicente, Hualtaco, Machala, Esmeraldas, Libertad), USA (Miami), México (Mazatlán), Brasil (Natal, Aracati y Acaraú), Honduras (Choluteca), Panamá (Ciudad de Panamá), Nicaragua (Chinandega), Venezuela (Maracaibo) y Perú (Tumbes)." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-lg text-gray-700 leading-relaxed", children: "Contamos con mas de 32 años de experiencia y servicio dentro del sector, lo que evidencia que la excelencia no se improvisa, se consolida a través de la eficiencia de cada uno de nuestro equipo de trabajo. Llegando así a convertirnos en la solución integral del sector acuícola en las Américas." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "pt-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "a",
          {
            href: "#quienes-somos",
            className: "inline-flex items-center px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors duration-300",
            children: [
              "CONOCE MÁS",
              /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { className: "ml-2 w-5 h-5", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M17 8l4 4m0 0l-4 4m4-4H3" }) })
            ]
          }
        ) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-gradient-to-br from-blue-500 to-blue-700 rounded-2xl p-8 text-white", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-6xl font-bold mb-4", children: "32+" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xl font-semibold mb-2", children: "Años de Experiencia" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-blue-100", children: "Sirviendo a las Américas" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-6 mt-8", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-3xl font-bold", children: "15+" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm text-blue-100", children: "Países" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-3xl font-bold", children: "1992" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm text-blue-100", children: "Fundada" })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute -top-4 -right-4 w-24 h-24 bg-blue-200 rounded-full opacity-20" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute -bottom-4 -left-4 w-16 h-16 bg-blue-300 rounded-full opacity-30" })
      ] })
    ] })
  ] }) });
};
const getCategoryTranslation = (key, language) => {
  return translations.home.catalog.categories[key][language];
};
const getDescriptionTranslation = (key, language) => {
  return translations.home.catalog.descriptions[key][language];
};
const getSeeMoreTranslation = (language) => {
  return translations.common.seeMore[language];
};
const categories = [
  {
    titleKey: "alimentos",
    descriptionKey: "alimentosDesc",
    image: "/images/categories/alimentos.jpg",
    href: "#alimentos"
  },
  {
    titleKey: "probioticos",
    descriptionKey: "probioticosDesc",
    image: "/images/categories/probioticos.jpg",
    href: "#probioticos"
  },
  {
    titleKey: "aditivos",
    descriptionKey: "aditivosDesc",
    image: "/images/categories/aditivos.jpg",
    href: "#aditivos"
  },
  {
    titleKey: "quimicos",
    descriptionKey: "quimicosDesc",
    image: "/images/categories/quimicos.jpg",
    href: "#quimicos"
  },
  {
    titleKey: "equipos",
    descriptionKey: "equiposDesc",
    image: "/images/categories/equipos.jpg",
    href: "#equipos"
  }
];
const ProductCategories = () => {
  const { language } = useLanguage();
  return /* @__PURE__ */ jsxRuntimeExports.jsx("section", { id: "productos", className: "py-20 bg-white", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center mb-16", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-4xl md:text-5xl font-bold text-gray-900 mb-4", children: translations.home.catalog.title[language] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xl text-gray-600 max-w-3xl mx-auto", children: translations.home.catalog.subtitle[language] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-8", children: categories.map((category, index) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "group relative bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative h-48 overflow-hidden", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "img",
              {
                src: category.image,
                alt: getCategoryTranslation(category.titleKey, language),
                className: "w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute bottom-4 left-4 right-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-xl font-bold text-white mb-1", children: getCategoryTranslation(category.titleKey, language) }) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-6", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-gray-600 text-sm leading-relaxed mb-4", children: getDescriptionTranslation(category.descriptionKey, language) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "a",
              {
                href: category.href,
                className: "inline-flex items-center text-blue-600 hover:text-blue-700 font-semibold text-sm transition-colors duration-200",
                children: [
                  getSeeMoreTranslation(language),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { className: "ml-1 w-4 h-4", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M17 8l4 4m0 0l-4 4m4-4H3" }) })
                ]
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 border-2 border-transparent group-hover:border-blue-500 rounded-xl transition-colors duration-300" })
        ]
      },
      index
    )) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-center mt-16", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "a",
      {
        href: "#contactanos",
        className: "inline-flex items-center px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-lg rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg",
        children: [
          translations.home.catalog.viewCatalog[language],
          /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { className: "ml-2 w-5 h-5", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" }) })
        ]
      }
    ) })
  ] }) });
};
const AgenciesSection = () => {
  const { t } = useLanguage();
  return /* @__PURE__ */ jsxRuntimeExports.jsx("section", { id: "oficinas", className: "py-20 bg-gray-50", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center mb-16", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-4xl md:text-5xl font-bold text-gray-900 mb-8", children: t("agencies.title") }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed", children: t("agencies.subtitle") })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid lg:grid-cols-2 gap-12 items-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-gradient-to-br from-blue-500 to-blue-700 rounded-2xl p-8 text-white", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-2xl font-bold mb-6 text-center", children: t("agencies.continentalPresence") }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "font-semibold text-blue-100", children: "Ecuador" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm", children: t("agencies.locations.ecuador") })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "font-semibold text-blue-100", children: "USA" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm", children: t("agencies.locations.usa") })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "font-semibold text-blue-100", children: "México" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm", children: t("agencies.locations.mexico") })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "font-semibold text-blue-100", children: "Brasil" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm", children: t("agencies.locations.brazil") })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "font-semibold text-blue-100", children: "Honduras" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm", children: t("agencies.locations.honduras") })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "font-semibold text-blue-100", children: "Panamá" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm", children: t("agencies.locations.panama") })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "font-semibold text-blue-100", children: "Nicaragua" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm", children: t("agencies.locations.nicaragua") })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "font-semibold text-blue-100", children: "Venezuela" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm", children: t("agencies.locations.venezuela") })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "font-semibold text-blue-100", children: "Perú" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm", children: t("agencies.locations.peru") })
            ] })
          ] })
        ] })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-8", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center p-6 bg-white rounded-xl shadow-lg", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-4xl font-bold text-blue-600 mb-2", children: "15+" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-gray-600", children: t("agencies.countries") })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center p-6 bg-white rounded-xl shadow-lg", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-4xl font-bold text-blue-600 mb-2", children: "25+" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-gray-600", children: t("agencies.offices") })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-xl shadow-lg p-8", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-xl font-bold text-gray-900 mb-4", children: "Cobertura Estratégica" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "space-y-3 text-gray-700", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-center", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { className: "w-5 h-5 text-green-500 mr-3", fill: "currentColor", viewBox: "0 0 20 20", children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { fillRule: "evenodd", d: "M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z", clipRule: "evenodd" }) }),
              "Oficinas comerciales modernas"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-center", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { className: "w-5 h-5 text-green-500 mr-3", fill: "currentColor", viewBox: "0 0 20 20", children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { fillRule: "evenodd", d: "M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z", clipRule: "evenodd" }) }),
              "Bodegas climatizadas"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-center", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { className: "w-5 h-5 text-green-500 mr-3", fill: "currentColor", viewBox: "0 0 20 20", children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { fillRule: "evenodd", d: "M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z", clipRule: "evenodd" }) }),
              "Distribución continental"
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "a",
          {
            href: "#contactanos",
            className: "inline-flex items-center px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors duration-300",
            children: [
              "CONOCE MÁS",
              /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { className: "ml-2 w-5 h-5", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M17 8l4 4m0 0l-4 4m4-4H3" }) })
            ]
          }
        ) })
      ] })
    ] })
  ] }) });
};
const brands = [
  { name: "Aero Tube", logo: "/images/logos/aero_tube.png" },
  { name: "API", logo: "/images/logos/api.png" },
  { name: "Argeitit", logo: "/images/logos/argeitit.png" },
  { name: "BASF", logo: "/images/logos/basf.png" },
  { name: "DMS", logo: "/images/logos/dms.png" },
  { name: "Gast", logo: "/images/logos/gast.png" },
  { name: "Higashimuru", logo: "/images/logos/higashimuru.png" },
  { name: "Horiba", logo: "/images/logos/horiba.png" },
  { name: "Intermas", logo: "/images/logos/intermas.png" },
  { name: "Keeton", logo: "/images/logos/keeton.png" },
  { name: "Lamotte", logo: "/images/logos/lamotte.png" },
  { name: "Mackay", logo: "/images/logos/mackay.png" },
  { name: "Ohaus", logo: "/images/logos/ohaus.png" },
  { name: "Oxyguard", logo: "/images/logos/oxyguard.png" },
  { name: "Pacer", logo: "/images/logos/pacer.png" },
  { name: "Thosco", logo: "/images/logos/thosco.png" },
  { name: "Vanguard", logo: "/images/logos/vanguard.png" },
  { name: "Vee Gee", logo: "/images/logos/vee_gee.png" },
  { name: "Zeigler", logo: "/images/logos/zeigler.png" },
  { name: "Intec", logo: "/images/logos/intec.png" },
  { name: "Oakton", logo: "/images/logos/oakton.png" },
  { name: "Wozvil", logo: "/images/logos/wozvil.png" },
  { name: "Aqualabo", logo: "/images/logos/aqualabo.png" },
  { name: "Chemetrics", logo: "/images/logos/chemetrics.png" },
  { name: "Línea de Congelados", logo: "/images/logos/linea_congelados.png" }
];
const BrandsSection = () => {
  const { t } = useLanguage();
  return /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "py-20 bg-white", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center mb-16", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-4xl md:text-5xl font-bold text-gray-900 mb-8", children: "NUESTRAS MARCAS" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xl text-gray-600 max-w-3xl mx-auto", children: "Trabajamos con las marcas más reconocidas y confiables de la industria acuícola" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-8", children: brands.map((brand, index) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "group flex items-center justify-center p-6 bg-gray-50 rounded-lg hover:bg-white hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1",
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          "img",
          {
            src: brand.logo,
            alt: brand.name,
            className: "max-h-16 w-auto object-contain filter grayscale group-hover:grayscale-0 transition-all duration-300"
          }
        )
      },
      index
    )) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-center mt-16", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "inline-flex items-center justify-center p-8 bg-gradient-to-r from-blue-500 to-blue-700 rounded-2xl", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      "img",
      {
        src: "/images/logos/prilabsa-logo.png",
        alt: "PRILABSA",
        className: "max-h-20 w-auto object-contain"
      }
    ) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid md:grid-cols-3 gap-8 mt-16", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { className: "w-8 h-8 text-blue-600", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" }) }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-lg font-semibold text-gray-900 mb-2", children: t("brands.qualityGuaranteed.title") }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-gray-600", children: t("brands.qualityGuaranteed.description") })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { className: "w-8 h-8 text-blue-600", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M13 10V3L4 14h7v7l9-11h-7z" }) }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-lg font-semibold text-gray-900 mb-2", children: t("brands.fastDelivery.title") }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-gray-600", children: t("brands.fastDelivery.description") })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { className: "w-8 h-8 text-blue-600", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M12 2.25a9.75 9.75 0 100 19.5 9.75 9.75 0 000-19.5z" }) }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-lg font-semibold text-gray-900 mb-2", children: t("brands.technicalSupport.title") }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-gray-600", children: t("brands.technicalSupport.description") })
      ] })
    ] })
  ] }) });
};
const Footer = () => {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("footer", { id: "contactanos", className: "bg-gray-900 text-white", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid md:grid-cols-4 gap-12", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-2xl font-bold mb-6", children: "CONTÁCTANOS" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-gray-300", children: [
            "Para más información",
            /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
            "escríbenos a: ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "mailto:info@prilabsa.com.ec", className: "text-blue-400 hover:text-blue-300", children: "info@prilabsa.com.ec" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start space-x-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("svg", { className: "w-6 h-6 text-blue-400 mt-1 flex-shrink-0", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M15 11a3 3 0 11-6 0 3 3 0 016 0z" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "font-semibold mb-1", children: "UBICACIÓN" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-gray-300", children: [
                "Av. Carlos Julio Arosemena, km 2 1/2,",
                /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
                "C.C. Albán Borja, local #55",
                /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
                "Guayaquil – Ecuador"
              ] })
            ] })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-2xl font-bold mb-6", children: "ENLACES RÁPIDOS" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/", className: "block text-gray-300 hover:text-blue-400 transition-colors", children: "Inicio" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/quienes-somos", className: "block text-gray-300 hover:text-blue-400 transition-colors", children: "Quienes Somos" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/oficinas", className: "block text-gray-300 hover:text-blue-400 transition-colors", children: "Oficinas" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/productos", className: "block text-gray-300 hover:text-blue-400 transition-colors", children: "Productos" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/trabaja-con-nosotros", className: "block text-gray-300 hover:text-blue-400 transition-colors", children: "Trabaja con Nosotros" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-2xl font-bold mb-6", children: "LEGAL" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/politica-de-privacidad", className: "block text-gray-300 hover:text-blue-400 transition-colors", children: "Política de Privacidad" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/politica-de-cookies", className: "block text-gray-300 hover:text-blue-400 transition-colors", children: "Política de Cookies" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/aviso-legal", className: "block text-gray-300 hover:text-blue-400 transition-colors", children: "Aviso Legal" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/terminos-y-condiciones", className: "block text-gray-300 hover:text-blue-400 transition-colors", children: "Términos y Condiciones" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-2xl font-bold mb-6", children: "¡SÍGUENOS!" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex space-x-4 mb-8", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "a",
            {
              href: "#",
              className: "w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { className: "w-5 h-5", fill: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" }) })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "a",
            {
              href: "#",
              className: "w-10 h-10 bg-blue-800 rounded-full flex items-center justify-center hover:bg-blue-900 transition-colors",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { className: "w-5 h-5", fill: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z" }) })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "a",
            {
              href: "#",
              className: "w-10 h-10 bg-blue-700 rounded-full flex items-center justify-center hover:bg-blue-800 transition-colors",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { className: "w-5 h-5", fill: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" }) })
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-gray-800 rounded-lg p-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "font-semibold mb-3", children: "Video Corporativo" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "video",
            {
              controls: true,
              className: "w-full rounded",
              poster: "/images/video-poster.jpg",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("source", { src: "/videos/PRILABSA_VIDEO_CORPORATIVO.mp4", type: "video/mp4" }),
                "Tu navegador no soporta el elemento de video."
              ]
            }
          )
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "border-t border-gray-700 mt-12 pt-8", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col md:flex-row justify-between items-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center space-x-4 mb-4 md:mb-0", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          OptimizedImage,
          {
            src: "/assets/images/logos/logo-prilabsa-blanco.png",
            alt: "PRILABSA",
            className: "h-8 w-auto",
            priority: true,
            width: 120,
            height: 32
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-gray-400", children: "© 2025 PRILABSA. Todos los derechos reservados." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-sm text-gray-400", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Desarrollado por " }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "https://solaria.agency", target: "_blank", rel: "noopener noreferrer", className: "font-semibold text-blue-400 hover:underline", children: "SOLARIA.AGENCY" })
      ] })
    ] }) })
  ] }) });
};
const PrilabsaWebsite = () => {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-white", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Header, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(HeroSection, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(AboutSection, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(ProductCategories, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(AgenciesSection, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(BrandsSection, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Footer, {})
  ] });
};
export {
  PrilabsaWebsite,
  PrilabsaWebsite as default
};
