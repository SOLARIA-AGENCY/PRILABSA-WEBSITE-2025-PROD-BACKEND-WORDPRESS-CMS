import { j as jsxRuntimeExports } from "./index.js";
const HeroVideo = ({ videoSrc, children }) => {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "relative h-screen flex items-center justify-center text-white", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "video",
      {
        autoPlay: true,
        loop: true,
        muted: true,
        playsInline: true,
        className: "absolute top-0 left-0 w-full h-full object-cover z-0",
        src: videoSrc
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-0 left-0 w-full h-full bg-blue-900 opacity-60 z-10" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative z-10 flex items-center justify-center h-full w-full", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "container mx-auto px-4 md:px-8 lg:px-16", children }) })
  ] });
};
export {
  HeroVideo as H
};
