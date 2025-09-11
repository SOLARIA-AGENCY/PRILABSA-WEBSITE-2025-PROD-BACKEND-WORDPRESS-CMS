import { u as useLanguage, j as jsxRuntimeExports } from "./index.js";
import { L as Link } from "./vendor.js";
const ConsentCheckbox = ({ isChecked, onChange, hasError, text }) => {
  const { t } = useLanguage();
  const consentText = text || t("consent.text");
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "flex items-start text-sm text-gray-600", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "input",
        {
          type: "checkbox",
          checked: isChecked,
          onChange,
          className: "mt-1 h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "ml-2", children: text ? consentText : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        consentText,
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/politica-de-privacidad", className: "font-semibold text-blue-600 hover:underline", target: "_blank", children: t("consent.privacyPolicy") }),
        "."
      ] }) })
    ] }),
    hasError && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-red-500 text-xs mt-1", children: t("consent.error") })
  ] });
};
export {
  ConsentCheckbox as C
};
