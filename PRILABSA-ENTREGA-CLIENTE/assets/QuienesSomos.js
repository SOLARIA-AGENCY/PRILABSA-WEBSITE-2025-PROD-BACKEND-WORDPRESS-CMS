import { u as useLanguage, j as jsxRuntimeExports, L as Layout, m } from "./index.js";
import { H as HeroVideo } from "./HeroVideo.js";
import "./vendor.js";
import "./react.js";
const Historia = () => {
  const { t } = useLanguage();
  const historiaData = [
    { year: "1992", description: t("history.timeline.1992") },
    { year: "1998", description: t("history.timeline.1998") },
    { year: "2000", description: t("history.timeline.2000") },
    { year: "2001", description: t("history.timeline.2001") },
    { year: "2002", description: t("history.timeline.2002") },
    { year: "2003", description: t("history.timeline.2003") },
    { year: "2008", description: t("history.timeline.2008") },
    { year: "2010", description: t("history.timeline.2010") },
    { year: "2013", description: t("history.timeline.2013") },
    { year: "2014", description: t("history.timeline.2014") },
    { year: "2018", description: t("history.timeline.2018") },
    { year: "2023", description: t("history.timeline.2023") },
    { year: "2024", description: t("history.timeline.2024") },
    { year: "2025", description: t("history.timeline.2025") }
  ];
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "section",
    {
      className: "relative py-16 lg:py-24 bg-cover bg-center",
      style: {
        backgroundImage: `url('/assets/iniciodev/backgrounds_light/background_light_2.png')`
      },
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-6 md:px-10 lg:px-16 relative z-10", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center mb-16", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-4xl font-bold uppercase", style: { color: "#3759C1" }, children: t("history.title") }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-lg mt-2 font-bold uppercase", style: { color: "#3759C1" }, children: t("history.subtitle") })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "wrap overflow-hidden p-4 h-full", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "absolute border-l-2 left-4 md:left-1/2 md:-translate-x-1/2",
              style: {
                borderColor: "#f6921d",
                top: "4.75rem",
                // Posición exacta del centro del primer círculo (texto + mt-4 + mitad del círculo)
                height: "calc(100% - 4.75rem)",
                // Altura desde el primer círculo hasta el final
                zIndex: 1
                // Detrás de los círculos
              }
            }
          ),
          historiaData.map((item, index) => {
            const isFirst = index === 0;
            const isLeftAligned = index % 2 !== 0;
            if (isFirst) {
              return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-8 flex flex-col items-center w-full relative", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center md:w-5/12", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-bold text-2xl", style: { color: "#f6921d" }, children: item.year }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-left uppercase", style: { color: "#3759C1" }, children: item.description })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "z-10 flex items-center w-6 h-6 rounded-full ring-4 ring-white mt-4 bg-white", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-3 h-3 rounded-full mx-auto", style: { backgroundColor: "#f6921d" } }) })
              ] }, index);
            }
            return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex md:justify-center md:items-center items-start mb-8 relative", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "hidden md:block w-5/12", children: !isLeftAligned && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-end items-center", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-right mr-4 uppercase", style: { color: "#3759C1" }, children: item.description }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-bold text-2xl", style: { color: "#f6921d" }, children: item.year })
              ] }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "hidden md:flex items-center justify-center flex-shrink-0 w-6 h-6 rounded-full ring-4 ring-white z-10 mx-4 bg-white", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-3 h-3 rounded-full", style: { backgroundColor: "#f6921d" } }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "hidden md:block w-5/12", children: isLeftAligned && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-start items-center", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-bold text-2xl mr-4", style: { color: "#f6921d" }, children: item.year }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-left uppercase", style: { color: "#3759C1" }, children: item.description })
              ] }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "md:hidden flex items-start w-full", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-shrink-0 w-6 h-6 rounded-full ring-4 ring-white z-10 mt-1 flex items-center justify-center bg-white", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-3 h-3 rounded-full", style: { backgroundColor: "#f6921d" } }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "ml-4", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-bold text-2xl", style: { color: "#f6921d" }, children: item.year }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-left uppercase", style: { color: "#3759C1" }, children: item.description })
                ] })
              ] })
            ] }, index);
          })
        ] }) })
      ] })
    }
  );
};
const Catalogo = () => {
  const { t } = useLanguage();
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "section",
    {
      className: "relative py-20 lg:py-32 bg-cover bg-center bg-no-repeat",
      style: { backgroundImage: "url('/assets/iniciodev/backgrounds_dark/background_dark_2.png')" },
      children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "container mx-auto px-6 relative z-10", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-white/50 backdrop-blur-xl rounded-lg p-8 md:p-12 shadow-2xl max-w-4xl mx-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "md:flex md:items-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "md:w-1/4 flex justify-center md:justify-start mb-6 md:mb-0", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: "/assets/iniciodev/catalogo prilabsa 2025.png", alt: "Catálogo Prilabsa 2025", className: "w-32 h-auto object-cover rounded-lg shadow-lg mx-auto" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold mt-2", style: { color: "#3759C1" }, children: "JULIO 2025" })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "md:w-3/4 md:pl-8 text-center md:text-left", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-3xl font-bold uppercase tracking-wider", style: { color: "#3759C1" }, children: t("catalog.title") }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-lg text-gray-700 mb-8", children: t("catalog.description") }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "a",
            {
              href: "/assets/pdfs/CATALOGO PRODUCTOS JULIO PRILABSA.pdf",
              download: "CATALOGO PRODUCTOS JULIO PRILABSA.pdf",
              className: "bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg transition-colors duration-300",
              children: t("catalog.downloadButton")
            }
          )
        ] })
      ] }) }) })
    }
  );
};
const QuienesSomos = () => {
  const { t } = useLanguage();
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Layout, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(HeroVideo, { videoSrc: "/assets/videos/quienes-somos-hero.mp4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-bold leading-tight text-left text-white", children: [
      t("aboutUs.hero.title"),
      /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        m,
        {
          sequence: [
            t("aboutUs.hero.animation.productosAcuicolas"),
            2e3,
            "",
            500,
            t("aboutUs.hero.animation.solucionesIntegrales"),
            2e3,
            "",
            500
          ],
          wrapper: "span",
          speed: 50,
          style: { color: "#f6921d" },
          repeat: Infinity
        }
      )
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "section",
      {
        id: "quienes-somos-contenido",
        className: "relative py-16 lg:py-24 pb-32 lg:pb-48 bg-cover bg-center overflow-hidden",
        style: {
          backgroundImage: `url('/assets/iniciodev/backgrounds_light/background_light_2.png')`
        },
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 z-0 pointer-events-none flex items-center justify-end", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            "img",
            {
              src: "/assets/iniciodev/foto-isotipo-prilabsa-alimentos.png",
              alt: "Isotipo Prilabsa Alimentos overlay",
              className: "h-1/2 w-auto object-contain opacity-50 md:opacity-60 lg:opacity-70",
              width: 800,
              height: 600,
              loading: "eager"
            }
          ) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "container mx-auto px-4 relative z-10", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-3xl text-left space-y-6", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-4xl font-bold mb-8 text-left", style: { color: "#3759C1" }, children: t("aboutUs.content.title") }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { style: { color: "#3759C1", textAlign: "justify" }, children: t("aboutUs.content.description") }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-xl font-bold uppercase", style: { color: "#f6921d" }, children: t("aboutUs.content.mission.title") }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { style: { color: "#3759C1", textAlign: "justify" }, children: t("aboutUs.content.mission.description") }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-xl font-bold uppercase", style: { color: "#f6921d" }, children: t("aboutUs.content.vision.title") }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { style: { color: "#3759C1", textAlign: "justify" }, children: t("aboutUs.content.vision.description") })
          ] }) })
        ] })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Historia, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Catalogo, {})
  ] });
};
export {
  QuienesSomos as default
};
