import { u as useLanguage, p as productsJulio2025, j as jsxRuntimeExports, b as categoriasProductos, L as Layout, d as StaticHero, B as Breadcrumbs, S as SearchBar } from "./index.js";
import { L as Link, e as useParams, r as reactExports } from "./vendor.js";
import { g as getProductTranslation } from "./product-translations.js";
import "./react.js";
const ProductList = ({ categorySlug, searchQuery }) => {
  const { t, language } = useLanguage();
  const getTranslatedField = (productId, field) => {
    try {
      return getProductTranslation(productId, language, field);
    } catch (error) {
      console.warn(`Translation not available for product ${productId}, field ${field}:`, error);
      return null;
    }
  };
  const allProducts = productsJulio2025;
  const filteredProducts = allProducts.filter((p) => p.category === categorySlug).filter(
    (p) => searchQuery ? p.name.toLowerCase().includes(searchQuery.toLowerCase()) : true
  );
  if (filteredProducts.length === 0) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center py-16", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-2xl font-bold text-gray-800", children: t("products.search.noResults") }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-gray-500 mt-2", children: t("products.search.noResultsDescription") })
    ] });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { role: "grid", className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8", children: filteredProducts.map((producto) => {
    var _a, _b;
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
      Link,
      {
        to: `/productos/${producto.category}/${producto.slug}`,
        className: "bg-white rounded-lg shadow-lg overflow-hidden transform hover:-translate-y-1 transition-transform duration-300 ease-in-out hover:shadow-xl group block",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-48 overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            "img",
            {
              src: ((_b = (_a = producto.assets) == null ? void 0 : _a.image) == null ? void 0 : _b.path) || "/assets/images/placeholder-product.jpg",
              alt: producto.name,
              className: "w-full h-full object-cover"
            }
          ) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-6", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-lg font-bold uppercase mb-2 h-16", style: { color: "#3759C1" }, children: producto.name }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-gray-600 text-sm mb-4 h-24 overflow-hidden", children: getTranslatedField(producto.id, "description") || producto.description }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "span",
              {
                className: "inline-block w-full text-center px-6 py-3 rounded-md font-semibold uppercase tracking-wider text-sm text-white transition-colors duration-300",
                style: { backgroundColor: "#f6921d" },
                children: t("products.actions.viewProduct")
              }
            )
          ] })
        ]
      },
      producto.id
    );
  }) });
};
const CategoryPage = () => {
  const { categorySlug } = useParams();
  const { t } = useLanguage();
  const [searchQuery, setSearchQuery] = reactExports.useState("");
  const category = categoriasProductos.find((cat) => cat.id === categorySlug);
  if (!category) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Layout, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center py-20", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-3xl font-bold text-red-600", children: t("products.messages.categoryNotFound") }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-gray-600 mt-4", children: t("products.messages.categoryNotFound") })
    ] }) });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Layout, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      StaticHero,
      {
        title: t(`products.categories.${category.id}`),
        backgroundImage: "/assets/iniciodev/prilabsa-hero.png"
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("main", { className: "py-16 bg-gray-50", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Breadcrumbs, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsx(SearchBar, { onSearch: setSearchQuery }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(ProductList, { categorySlug: categorySlug || "", searchQuery })
    ] }) })
  ] });
};
export {
  CategoryPage as default
};
