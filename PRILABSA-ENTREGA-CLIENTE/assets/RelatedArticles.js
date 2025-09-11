import { u as useLanguage, j as jsxRuntimeExports, A as ArticleCard } from "./index.js";
const RelatedArticles = ({ currentArticleId, articles, basePath }) => {
  const { t } = useLanguage();
  const related = articles.filter((article) => article.id !== currentArticleId).sort(() => 0.5 - Math.random()).slice(0, 2);
  if (related.length === 0) {
    return null;
  }
  const isNewsPath = basePath === "/noticias";
  const titleKey = isNewsPath ? "news.relatedNews" : "blog.relatedArticles";
  return /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "bg-gray-50 py-16", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-3xl font-bold text-center mb-12", style: { color: "#3759C1" }, children: t(titleKey) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8", children: related.map((article) => /* @__PURE__ */ jsxRuntimeExports.jsx(ArticleCard, { article, basePath }, article.id)) })
  ] }) });
};
export {
  RelatedArticles as R
};
