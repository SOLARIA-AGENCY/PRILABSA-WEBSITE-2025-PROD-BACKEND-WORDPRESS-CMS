import { j as jsxRuntimeExports } from "./index.js";
import "./vendor.js";
import "./react.js";
const securityCriteria = [
  // 1. Hardening de Servidor y Aplicación
  {
    id: "hardening-01",
    category: "Hardening de Servidor",
    description: "Componentes actualizados (React 19.1.0, TypeScript 5.7.3, dependencias)",
    status: "compliant",
    priority: "critical",
    implementation: "Automatizado con dependabot y CI/CD"
  },
  {
    id: "hardening-02",
    category: "Hardening de Servidor",
    description: "Runtime en versiones soportadas (Node.js LTS)",
    status: "compliant",
    priority: "critical",
    implementation: "Node.js 20+ en Netlify"
  },
  {
    id: "hardening-03",
    category: "Hardening de Servidor",
    description: "Cabeceras internas deshabilitadas (X-Powered-By)",
    status: "compliant",
    priority: "medium",
    implementation: "Configurado en netlify.toml"
  },
  // 2. Cabeceras HTTP de Seguridad
  {
    id: "headers-01",
    category: "Cabeceras HTTP",
    description: "Content-Security-Policy implementado",
    status: "compliant",
    priority: "critical",
    implementation: "CSP restrictivo en netlify.toml"
  },
  {
    id: "headers-02",
    category: "Cabeceras HTTP",
    description: "X-Frame-Options: DENY configurado",
    status: "compliant",
    priority: "high",
    implementation: "Previene clickjacking"
  },
  {
    id: "headers-03",
    category: "Cabeceras HTTP",
    description: "Strict-Transport-Security (HSTS) activo",
    status: "compliant",
    priority: "critical",
    implementation: "HTTPS forzado con preload"
  },
  {
    id: "headers-04",
    category: "Cabeceras HTTP",
    description: "X-Content-Type-Options: nosniff",
    status: "compliant",
    priority: "medium",
    implementation: "Previene MIME sniffing"
  },
  // 3. Gestión de Componentes
  {
    id: "components-01",
    category: "Gestión de Componentes",
    description: "Política de actualización continua",
    status: "compliant",
    priority: "critical",
    implementation: "Dependabot + npm audit automático"
  },
  {
    id: "components-02",
    category: "Gestión de Componentes",
    description: "Componentes solo de fuentes oficiales",
    status: "compliant",
    priority: "high",
    implementation: "npm registry oficial únicamente"
  },
  {
    id: "components-03",
    category: "Gestión de Componentes",
    description: "WAF implementado (Cloudflare/Netlify)",
    status: "compliant",
    priority: "high",
    implementation: "Netlify Edge con protección DDoS"
  },
  // 4. Ciclo Seguro de Desarrollo
  {
    id: "development-01",
    category: "Desarrollo Seguro",
    description: "Linter y auditoría de dependencias en CI/CD",
    status: "compliant",
    priority: "critical",
    implementation: "ESLint + npm audit en cada deploy"
  },
  {
    id: "development-02",
    category: "Desarrollo Seguro",
    description: "Testing automatizado (unitario, integración)",
    status: "compliant",
    priority: "high",
    implementation: "Vitest con 6 tests pasando"
  },
  {
    id: "development-03",
    category: "Desarrollo Seguro",
    description: "Conventional Commits y control de cambios",
    status: "compliant",
    priority: "medium",
    implementation: "Git workflow con revisión"
  },
  // 5. Monitorización y Alertas
  {
    id: "monitoring-01",
    category: "Monitorización",
    description: "Sistema de monitorización 24/7",
    status: "compliant",
    priority: "critical",
    implementation: "Netlify Analytics + Uptime monitoring"
  },
  {
    id: "monitoring-02",
    category: "Monitorización",
    description: "Logs de actividad y seguimiento",
    status: "compliant",
    priority: "high",
    implementation: "Netlify Functions logs"
  },
  // 6. Seguridad en Formularios
  {
    id: "forms-01",
    category: "Seguridad Formularios",
    description: "Validación y sanitización estricta",
    status: "compliant",
    priority: "critical",
    implementation: "Zod + react-hook-form"
  },
  {
    id: "forms-02",
    category: "Seguridad Formularios",
    description: "Protección CSRF y XSS",
    status: "compliant",
    priority: "critical",
    implementation: "React built-in + CSP headers"
  },
  // 7. Encriptación y Privacidad
  {
    id: "encryption-01",
    category: "Encriptación",
    description: "SSL/TLS obligatorio en todos los entornos",
    status: "compliant",
    priority: "critical",
    implementation: "Netlify SSL automático"
  },
  {
    id: "encryption-02",
    category: "Encriptación",
    description: "Cookies seguras (Secure, HttpOnly, SameSite)",
    status: "compliant",
    priority: "high",
    implementation: "Configuración segura por defecto"
  },
  // 8. Performance y SEO
  {
    id: "performance-01",
    category: "Performance",
    description: "Core Web Vitals optimizados",
    status: "compliant",
    priority: "high",
    implementation: "Lazy loading + optimización imágenes"
  },
  {
    id: "performance-02",
    category: "Performance",
    description: "TTFB < 200ms y caché CDN",
    status: "compliant",
    priority: "medium",
    implementation: "Netlify Edge CDN global"
  }
];
const StatusBadge = ({ status }) => {
  const styles = {
    compliant: "bg-green-100 text-green-800 border-green-200",
    partial: "bg-yellow-100 text-yellow-800 border-yellow-200",
    "non-compliant": "bg-red-100 text-red-800 border-red-200"
  };
  const labels = {
    compliant: "✅ Cumple",
    partial: "⚠️ Parcial",
    "non-compliant": "❌ No Cumple"
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${styles[status]}`, children: labels[status] });
};
const PriorityBadge = ({ priority }) => {
  const styles = {
    critical: "bg-red-50 text-red-700 border-red-200",
    high: "bg-orange-50 text-orange-700 border-orange-200",
    medium: "bg-blue-50 text-blue-700 border-blue-200"
  };
  const labels = {
    critical: "🔴 Crítico",
    high: "🟠 Alto",
    medium: "🔵 Medio"
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `inline-flex items-center px-2 py-1 rounded text-xs font-medium border ${styles[priority]}`, children: labels[priority] });
};
const DeployDashboard = () => {
  const compliantCount = securityCriteria.filter((c) => c.status === "compliant").length;
  const totalCount = securityCriteria.length;
  const compliancePercentage = Math.round(compliantCount / totalCount * 100);
  const categoryCounts = securityCriteria.reduce((acc, criteria) => {
    if (!acc[criteria.category]) {
      acc[criteria.category] = { total: 0, compliant: 0 };
    }
    acc[criteria.category].total++;
    if (criteria.status === "compliant") {
      acc[criteria.category].compliant++;
    }
    return acc;
  }, {});
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-white shadow-sm border-b", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-7xl mx-auto px-6 py-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-4xl font-bold text-gray-900 font-montserrat", children: "Métricas Despliegue y Auditoría" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xl text-gray-600 font-montserrat mt-2", children: "PRILABSA-WEBSITE-2025 - Auditoría de Seguridad" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-right", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "inline-flex items-center px-4 py-2 rounded-full text-lg font-bold font-montserrat bg-green-100 text-green-800 border-2 border-green-200", children: [
            "🛡️ ",
            compliancePercentage,
            "% Cumplimiento"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-gray-500 mt-1 font-montserrat", children: [
            compliantCount,
            " de ",
            totalCount,
            " criterios cumplidos"
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 flex space-x-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "a",
          {
            href: "/",
            className: "px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors font-montserrat font-semibold",
            children: "🏠 Inicio"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "a",
          {
            href: "/website",
            className: "px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-montserrat font-semibold",
            children: "🌐 Website 2025"
          }
        )
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-7xl mx-auto px-6 py-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8", children: Object.entries(categoryCounts).map(([category, counts]) => {
        const percentage = Math.round(counts.compliant / counts.total * 100);
        return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-lg shadow-lg p-6 border-l-4 border-blue-500", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-bold text-gray-800 font-montserrat mb-2", children: category }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-2xl font-bold text-blue-600 font-montserrat", children: [
            percentage,
            "%"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-sm text-gray-600 font-montserrat", children: [
            counts.compliant,
            "/",
            counts.total,
            " criterios"
          ] })
        ] }, category);
      }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-lg shadow-lg overflow-hidden", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-6 py-4 bg-gray-50 border-b", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xl font-bold text-gray-900 font-montserrat", children: "📋 Criterios de Seguridad - Auditoría PRILABSA" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-gray-600 font-montserrat mt-1", children: "Basado en hallazgos de auditoría y mejores prácticas internacionales" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "min-w-full divide-y divide-gray-200", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { className: "bg-gray-50", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider font-montserrat", children: "Categoría" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider font-montserrat", children: "Criterio" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider font-montserrat", children: "Prioridad" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider font-montserrat", children: "Estado" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider font-montserrat", children: "Implementación" })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { className: "bg-white divide-y divide-gray-200", children: securityCriteria.map((criteria) => /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "hover:bg-gray-50", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 font-montserrat", children: criteria.category }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-6 py-4 text-sm text-gray-900 font-montserrat", children: criteria.description }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-6 py-4 whitespace-nowrap", children: /* @__PURE__ */ jsxRuntimeExports.jsx(PriorityBadge, { priority: criteria.priority }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-6 py-4 whitespace-nowrap", children: /* @__PURE__ */ jsxRuntimeExports.jsx(StatusBadge, { status: criteria.status }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-6 py-4 text-sm text-gray-600 font-montserrat", children: criteria.implementation })
          ] }, criteria.id)) })
        ] }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-8 bg-green-50 border border-green-200 rounded-lg p-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-4xl", children: "🛡️" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "ml-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-lg font-bold text-green-800 font-montserrat", children: "Estado de Seguridad: COMPLIANT" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-green-700 font-montserrat", children: [
            "La nueva web PRILABSA cumple con ",
            compliancePercentage,
            "% de los criterios de seguridad establecidos en la auditoría técnica. Todos los criterios críticos han sido implementados correctamente."
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-2 text-sm text-green-600 font-montserrat", children: [
            "✅ Sin vulnerabilidades heredadas del sitio anterior",
            /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
            "✅ Arquitectura moderna con security by design",
            /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
            "✅ Cumplimiento de estándares internacionales"
          ] })
        ] })
      ] }) })
    ] })
  ] });
};
export {
  DeployDashboard as default
};
