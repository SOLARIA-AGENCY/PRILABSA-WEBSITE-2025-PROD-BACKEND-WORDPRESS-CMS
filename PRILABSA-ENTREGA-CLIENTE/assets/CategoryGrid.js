import { u as useLanguage, j as jsxRuntimeExports, D as CategoryCard } from "./index.js";
import "./vendor.js";
import "./react.js";
const CategoryGrid = ({ categories }) => {
  const { t } = useLanguage();
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-center py-10", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap justify-center gap-8 lg:w-4/5", children: categories.length > 0 ? categories.map((cat) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "shadow-2xl rounded-lg", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
    CategoryCard,
    {
      imagen: cat.imagen,
      titulo: t(`products.categories.${cat.id}`),
      enlace: cat.enlace,
      size: "large"
    }
  ) }, cat.id)) : /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "col-span-full text-center text-gray-500 text-xl py-8", children: t("products.search.noResults") }) }) });
};
export {
  CategoryGrid as default
};
