import { u as useLanguage, j as jsxRuntimeExports, L as Layout, d as StaticHero } from "./index.js";
import { r as reactExports } from "./vendor.js";
import { C as ConsentCheckbox } from "./ConsentCheckbox.js";
import "./react.js";
const Newsletter = () => {
  const { t } = useLanguage();
  return /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "bg-blue-50 py-16", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-4 text-center", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-3xl font-bold uppercase mb-2", style: { color: "#3759C1" }, children: t("newsletter.blogTitle") }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-gray-600 mb-8 max-w-2xl mx-auto", children: t("newsletter.blogDescription") }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("form", { className: "max-w-lg mx-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row items-center gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "input",
        {
          type: "email",
          placeholder: t("newsletter.placeholder"),
          className: "w-full px-4 py-3 rounded-lg border-2 border-gray-300 focus:outline-none focus:border-orange-500 transition-colors duration-300",
          required: true
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          type: "submit",
          className: "w-full sm:w-auto px-8 py-3 rounded-lg text-white font-bold uppercase tracking-wider transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl",
          style: { backgroundColor: "#f6921d" },
          children: t("newsletter.button")
        }
      )
    ] }) })
  ] }) });
};
const TrabajaConNosotros = () => {
  const { t } = useLanguage();
  const [formData, setFormData] = reactExports.useState({
    name: "",
    email: "",
    phone: "",
    country: "",
    area: ""
  });
  const [file, setFile] = reactExports.useState(null);
  const [consent, setConsent] = reactExports.useState(false);
  const [errors, setErrors] = reactExports.useState({
    general: "",
    consent: false,
    file: ""
  });
  const [isSubmitted, setIsSubmitted] = reactExports.useState(false);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  const handleFileChange = (e) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors({ general: "", consent: false, file: "" });
    setIsSubmitted(false);
    if (!formData.name || !formData.email || !file) {
      setErrors((prev) => ({ ...prev, general: "Por favor, complete los campos obligatorios: Nombre, Email y CV." }));
      return;
    }
    if (!consent) {
      setErrors((prev) => ({ ...prev, consent: true }));
      return;
    }
    const consentData = {
      timestamp: (/* @__PURE__ */ new Date()).toISOString(),
      formId: "recruitment-form",
      consentText: "He leído y acepto la Política de Privacidad."
    };
    const payload = { ...formData, cv: file.name, consentData };
    console.log("--- FORMULARIO DE TRABAJA CON NOSOTROS PARA ENVIAR (SIMULACIÓN) ---");
    console.log(payload);
    setIsSubmitted(true);
    setFormData({ name: "", email: "", phone: "", country: "", area: "" });
    setFile(null);
    setConsent(false);
    const fileInput = document.getElementById("cv");
    if (fileInput) fileInput.value = "";
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Layout, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      StaticHero,
      {
        title: t("careers.hero.title"),
        backgroundImage: "/assets/iniciodev/prilabsa-hero.png"
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "container mx-auto py-16 px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-2xl mx-auto bg-white p-8 md:p-12 rounded-lg shadow-lg", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-3xl font-bold text-center mb-2", style: { color: "#3759C1" }, children: t("careers.form.title") }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-center text-gray-600 mb-8", children: t("careers.form.description") }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { noValidate: true, onSubmit: handleSubmit, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6 mb-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { htmlFor: "name", className: "mb-2 font-semibold text-gray-700", children: [
              t("careers.form.fields.fullName"),
              " ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-red-500", children: "*" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "text", id: "name", name: "name", value: formData.name, onChange: handleInputChange, className: "w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500", required: true })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { htmlFor: "email", className: "mb-2 font-semibold text-gray-700", children: [
              t("careers.form.fields.email"),
              " ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-red-500", children: "*" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "email", id: "email", name: "email", value: formData.email, onChange: handleInputChange, className: "w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500", required: true })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6 mb-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { htmlFor: "phone", className: "mb-2 font-semibold text-gray-700", children: t("careers.form.fields.phone") }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "tel", id: "phone", name: "phone", value: formData.phone, onChange: handleInputChange, className: "w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { htmlFor: "country", className: "mb-2 font-semibold text-gray-700", children: t("careers.form.fields.country") }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "text", id: "country", name: "country", value: formData.country, onChange: handleInputChange, className: "w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6 mb-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { htmlFor: "area", className: "mb-2 font-semibold text-gray-700", children: t("careers.form.fields.area") }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("select", { id: "area", name: "area", value: formData.area, onChange: handleInputChange, className: "w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "", children: t("careers.form.areas.placeholder") }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { children: t("careers.form.areas.sales") }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { children: t("careers.form.areas.admin") }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { children: t("careers.form.areas.logistics") }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { children: t("careers.form.areas.rd") }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { children: t("careers.form.areas.marketing") })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { htmlFor: "cv", className: "mb-2 font-semibold text-gray-700", children: [
              t("careers.form.fields.cv"),
              " ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-red-500", children: "*" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "file", id: "cv", name: "cv", onChange: handleFileChange, className: "w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100", required: true })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          ConsentCheckbox,
          {
            isChecked: consent,
            onChange: (e) => setConsent(e.target.checked),
            hasError: errors.consent
          }
        ),
        errors.general && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-red-500 text-sm mt-4 text-center", children: t("careers.form.errors.required") }),
        isSubmitted && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-green-600 text-sm mt-4 text-center", children: t("careers.form.success") }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-center mt-8", children: /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "submit", className: "w-full md:w-auto text-white font-bold py-3 px-8 rounded-md uppercase transition-colors duration-300", style: { backgroundColor: "#f6921d" }, children: t("careers.form.button") }) })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Newsletter, {})
  ] });
};
export {
  TrabajaConNosotros as default
};
