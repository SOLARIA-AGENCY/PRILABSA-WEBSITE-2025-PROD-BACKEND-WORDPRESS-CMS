import { u as useLanguage, b as categoriasProductos, j as jsxRuntimeExports, L as Layout, B as Breadcrumbs, S as SearchBar } from "./index.js";
import { r as reactExports } from "./vendor.js";
import { H as HeroVideo } from "./HeroVideo.js";
import CategoryGrid from "./CategoryGrid.js";
import "./react.js";
const Productos = () => {
  const { t } = useLanguage();
  const [searchQuery, setSearchQuery] = reactExports.useState("");
  const filteredCategories = reactExports.useMemo(() => {
    if (!searchQuery) {
      return categoriasProductos;
    }
    const query = searchQuery.toLowerCase();
    return categoriasProductos.filter(
      (category) => category.titulo.toLowerCase().includes(query)
    );
  }, [searchQuery]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Layout, { isHeroPage: true, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(HeroVideo, { videoSrc: "/assets/videos/productos-hero.mp4", children: /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-bold leading-tight text-center text-white", children: t("products.title") }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("main", { className: "py-16 bg-gray-50", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Breadcrumbs, { paths: [{ name: t("breadcrumbs.home"), path: "/" }, { name: t("products.title"), path: "/productos" }] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "my-8 max-w-2xl mx-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SearchBar, { onSearch: setSearchQuery, placeholder: t("products.search.placeholder") }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(CategoryGrid, { categories: filteredCategories })
    ] }) })
  ] });
};
export {
  Productos as default
};
