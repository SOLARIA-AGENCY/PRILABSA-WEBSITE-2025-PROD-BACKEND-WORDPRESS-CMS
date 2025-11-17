import { u as useLanguage, j as jsxRuntimeExports, L as Layout, d as StaticHero } from "./index.js";
import { r as reactExports } from "./vendor.js";
import { C as ConsentCheckbox } from "./ConsentCheckbox.js";
import "./react.js";
const NewsletterSubscribe = () => {
  const { t } = useLanguage();
  const [email, setEmail] = reactExports.useState("");
  const [consent, setConsent] = reactExports.useState(false);
  const [errors, setErrors] = reactExports.useState({
    email: "",
    consent: false
  });
  const [isSubmitted, setIsSubmitted] = reactExports.useState(false);
  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors({ email: "", consent: false });
    setIsSubmitted(false);
    if (!email) {
      setErrors((prev) => ({ ...prev, email: t("newsletter.errors.emailRequired") }));
      return;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      setErrors((prev) => ({ ...prev, email: t("newsletter.errors.emailInvalid") }));
      return;
    }
    if (!consent) {
      setErrors((prev) => ({ ...prev, consent: true }));
      return;
    }
    const consentData = {
      timestamp: (/* @__PURE__ */ new Date()).toISOString(),
      formId: "newsletter-form",
      consentText: "He leído y acepto la Política de Privacidad."
    };
    const payload = { email, consentData };
    console.log("--- FORMULARIO DE NEWSLETTER PARA ENVIAR (SIMULACIÓN) ---");
    console.log(payload);
    setIsSubmitted(true);
    setEmail("");
    setConsent(false);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-blue-50 py-16", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-4 text-center", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-3xl font-bold mb-2", style: { color: "#3759C1" }, children: t("newsletter.title") }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-gray-600 mb-8 max-w-2xl mx-auto", children: t("newsletter.description") }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { className: "max-w-xl mx-auto", noValidate: true, onSubmit: handleSubmit, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "input",
          {
            type: "email",
            placeholder: t("newsletter.placeholder"),
            value: email,
            onChange: (e) => setEmail(e.target.value),
            className: "flex-grow px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500",
            required: true
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "submit",
            className: "text-white font-bold py-3 px-8 rounded-md uppercase transition-colors duration-300 whitespace-nowrap",
            style: { backgroundColor: "#f6921d" },
            children: t("newsletter.button")
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-4 flex justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        ConsentCheckbox,
        {
          isChecked: consent,
          onChange: (e) => setConsent(e.target.checked),
          hasError: errors.consent,
          text: t("newsletter.privacy")
        }
      ) }),
      errors.email && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-red-500 text-xs mt-2", children: errors.email }),
      isSubmitted && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-green-600 text-sm mt-4", children: t("newsletter.success") })
    ] })
  ] }) });
};
const Contactanos = () => {
  const { t } = useLanguage();
  const [formData, setFormData] = reactExports.useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    message: ""
  });
  const [consent, setConsent] = reactExports.useState(false);
  const [errors, setErrors] = reactExports.useState({
    general: "",
    consent: false
  });
  const [isSubmitted, setIsSubmitted] = reactExports.useState(false);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors({ general: "", consent: false });
    setIsSubmitted(false);
    if (!formData.name || !formData.email || !formData.message) {
      setErrors((prev) => ({ ...prev, general: "Por favor, complete los campos obligatorios: Nombre, Email y Mensaje." }));
      return;
    }
    if (!consent) {
      setErrors((prev) => ({ ...prev, consent: true }));
      return;
    }
    const consentData = {
      timestamp: (/* @__PURE__ */ new Date()).toISOString(),
      formId: "contact-form",
      consentText: "He leído y acepto la Política de Privacidad."
    };
    const payload = { ...formData, consentData };
    console.log("--- FORMULARIO DE CONTACTO PARA ENVIAR (SIMULACIÓN) ---");
    console.log(payload);
    setIsSubmitted(true);
    setFormData({ name: "", company: "", email: "", phone: "", message: "" });
    setConsent(false);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Layout, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      StaticHero,
      {
        title: t("contact.hero.title"),
        backgroundImage: "/assets/iniciodev/prilabsa-hero.png"
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto py-16 px-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-12 flex justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full max-w-3xl", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-3xl font-bold text-center mb-2", style: { color: "#3759C1" }, children: t("contact.emails.title") }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-center text-gray-600 mb-8", children: t("contact.emails.description") }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 gap-8", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center text-center", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-bold text-blue-900", children: t("contact.emails.departments.imports") }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "mailto:importaciones@prilabsa.com.ec", className: "text-blue-600 hover:underline", children: "importaciones@prilabsa.com.ec" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center text-center", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-bold text-blue-900", children: t("contact.emails.departments.sales") }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "mailto:comercialventas@prilabsa.com.ec", className: "text-blue-600 hover:underline", children: "comercialventas@prilabsa.com.ec" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center text-center", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-bold text-blue-900", children: t("contact.emails.departments.hr") }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "mailto:talentohumano@prilabsa.com.ec", className: "text-blue-600 hover:underline", children: "talentohumano@prilabsa.com.ec" })
          ] })
        ] })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-2xl mx-auto bg-white p-8 md:p-12 rounded-lg shadow-lg", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-3xl font-bold text-center mb-2", style: { color: "#3759C1" }, children: t("contact.form.title") }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-center text-gray-600 mb-8", children: t("contact.form.description") }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { noValidate: true, onSubmit: handleSubmit, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6 mb-6", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { htmlFor: "name", className: "mb-2 font-semibold text-gray-700", children: [
                t("contact.form.fields.fullName"),
                " ",
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-red-500", children: "*" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "text", id: "name", name: "name", value: formData.name, onChange: handleInputChange, className: "w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500", required: true })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("label", { htmlFor: "company", className: "mb-2 font-semibold text-gray-700", children: t("contact.form.fields.company") }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "text", id: "company", name: "company", value: formData.company, onChange: handleInputChange, className: "w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6 mb-6", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { htmlFor: "email", className: "mb-2 font-semibold text-gray-700", children: [
                t("contact.form.fields.email"),
                " ",
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-red-500", children: "*" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "email", id: "email", name: "email", value: formData.email, onChange: handleInputChange, className: "w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500", required: true })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("label", { htmlFor: "phone", className: "mb-2 font-semibold text-gray-700", children: t("contact.form.fields.phone") }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "tel", id: "phone", name: "phone", value: formData.phone, onChange: handleInputChange, className: "w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col mb-6", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { htmlFor: "message", className: "mb-2 font-semibold text-gray-700", children: [
              t("contact.form.fields.message"),
              " ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-red-500", children: "*" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("textarea", { id: "message", name: "message", rows: 5, value: formData.message, onChange: handleInputChange, className: "w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500", required: true })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            ConsentCheckbox,
            {
              isChecked: consent,
              onChange: (e) => setConsent(e.target.checked),
              hasError: errors.consent
            }
          ),
          errors.general && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-red-500 text-sm mt-4 text-center", children: t("contact.form.errors.required") }),
          isSubmitted && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-green-600 text-sm mt-4 text-center", children: t("contact.form.success") }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-center mt-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "submit", className: "w-full md:w-auto text-white font-bold py-3 px-8 rounded-md uppercase transition-colors duration-300", style: { backgroundColor: "#f6921d" }, children: t("contact.form.button") }) })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(NewsletterSubscribe, {})
  ] });
};
export {
  Contactanos as default
};
