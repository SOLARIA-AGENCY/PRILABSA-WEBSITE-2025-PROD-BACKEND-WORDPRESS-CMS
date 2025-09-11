import { u as useLanguage, e as blogData, j as jsxRuntimeExports, L as Layout, g as getLocalizedContent, f as getLocalizedTags, B as Breadcrumbs } from "./index.js";
import { R as RelatedArticles } from "./RelatedArticles.js";
import { e as useParams, L as Link } from "./vendor.js";
import "./react.js";
const ArticlePage = () => {
  const { id } = useParams();
  const { language, t } = useLanguage();
  const article = blogData.find((p) => p.id === id);
  if (!article) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Layout, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-6 py-20 text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-bold text-gray-800 mb-4", children: t("blog.articleNotFound") }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Link,
        {
          to: "/blog",
          className: "text-prilabsa-blue-primary hover:text-prilabsa-blue-secondary transition-colors",
          children: t("blog.backToBlog")
        }
      )
    ] }) });
  }
  const localizedContent = getLocalizedContent(article.title, language);
  const localizedTags = getLocalizedTags(article.tags, language);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Layout, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("title", { children: [
      localizedContent,
      " | Prilabsa"
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("meta", { name: "description", content: getLocalizedContent(article.summary, language) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("meta", { name: "keywords", content: localizedTags.join(", ") }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative w-full h-64 md:h-96 overflow-hidden", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: article.heroImage, alt: `Imagen de ${localizedContent}`, className: "w-full h-full object-cover" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-blue-900 opacity-50" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Breadcrumbs,
      {
        paths: [
          { name: "Blog", path: "/blog" },
          { name: localizedContent, path: `/blog/${article.id}` }
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "container mx-auto py-12 px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("article", { className: "max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-md", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "mb-8 text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-4xl md:text-5xl font-bold uppercase tracking-wider mb-4", style: { color: "#3759C1" }, children: localizedContent }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-gray-500 text-sm", children: [
          "Publicado el ",
          article.date,
          " por ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold", children: getLocalizedContent(article.author, language) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-4 flex flex-wrap gap-2", children: localizedTags.map((tag) => /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "bg-white text-blue-800 border border-blue-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded-full", children: tag }, tag)) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "prose lg:prose-xl max-w-none text-gray-700",
          dangerouslySetInnerHTML: { __html: getLocalizedContent(article.content, language) }
        }
      )
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(RelatedArticles, { currentArticleId: article.id, articles: blogData, basePath: "/blog" })
  ] });
};
export {
  ArticlePage as default
};
