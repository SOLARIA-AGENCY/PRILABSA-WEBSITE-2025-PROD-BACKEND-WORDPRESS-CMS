import { j as jsxRuntimeExports } from "./index.js";
import { D as Document, P as Page, S as StyleSheet, V as View, I as Image, T as Text } from "./Cotizacion.js";
import "./vendor.js";
import "./react.js";
import "./oficinasData.js";
import "./shopping-cart.js";
import "./plus.js";
import "./file-down.js";
const styles = StyleSheet.create({
  page: {
    fontFamily: "Helvetica",
    fontSize: 11,
    padding: 30,
    color: "#333"
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
    borderBottom: "2px solid #f6921d",
    paddingBottom: 10
  },
  buyerInfo: {
    marginBottom: 20,
    padding: 10,
    border: "1px solid #eee",
    borderRadius: 5
  },
  buyerInfoText: {
    fontSize: 10,
    marginBottom: 3
  },
  buyerInfoLabel: {
    fontWeight: "bold"
  },
  logo: {
    width: 150
  },
  headerText: {
    textAlign: "right"
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color: "#3759C1"
  },
  table: {
    width: "100%",
    border: "1px solid #eee"
  },
  tableRow: {
    flexDirection: "row",
    borderBottom: "1px solid #eee",
    alignItems: "center"
  },
  tableHeader: {
    backgroundColor: "#f2f2f2",
    fontWeight: "bold"
  },
  colHeader: {
    padding: 8,
    fontSize: 12
  },
  col: {
    padding: 8
  },
  productCol: { width: "60%" },
  quantityCol: { width: "20%", textAlign: "center" },
  productName: { fontWeight: "bold" },
  productCategory: { fontSize: 9, color: "#666" },
  footer: {
    position: "absolute",
    bottom: 30,
    left: 30,
    right: 30,
    textAlign: "center",
    fontSize: 9,
    color: "#888",
    borderTop: "1px solid #ccc",
    paddingTop: 5
  }
});
const CotizacionPDF = ({ items, logoUrl, buyerInfo, selectedAgency }) => /* @__PURE__ */ jsxRuntimeExports.jsx(Document, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Page, { size: "A4", style: styles.page, children: [
  /* @__PURE__ */ jsxRuntimeExports.jsxs(View, { style: styles.header, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Image, { style: styles.logo, src: logoUrl }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(View, { style: styles.headerText, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { children: "Solicitud de Cotización" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { children: (/* @__PURE__ */ new Date()).toLocaleDateString("es-ES") })
    ] })
  ] }),
  /* @__PURE__ */ jsxRuntimeExports.jsxs(View, { style: styles.buyerInfo, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { style: styles.title, children: "Datos del Solicitante" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Text, { style: styles.buyerInfoText, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { style: styles.buyerInfoLabel, children: "Nombre:" }),
      " ",
      buyerInfo.nombre
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Text, { style: styles.buyerInfoText, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { style: styles.buyerInfoLabel, children: "Empresa:" }),
      " ",
      buyerInfo.empresa
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Text, { style: styles.buyerInfoText, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { style: styles.buyerInfoLabel, children: "Email:" }),
      " ",
      buyerInfo.email
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Text, { style: styles.buyerInfoText, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { style: styles.buyerInfoLabel, children: "Agencia de Destino:" }),
      " ",
      selectedAgency
    ] }),
    buyerInfo.comentarios && /* @__PURE__ */ jsxRuntimeExports.jsxs(Text, { style: styles.buyerInfoText, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { style: styles.buyerInfoLabel, children: "Comentarios:" }),
      " ",
      buyerInfo.comentarios
    ] })
  ] }),
  /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { style: styles.title, children: "Listado de Productos" }),
  /* @__PURE__ */ jsxRuntimeExports.jsxs(View, { style: styles.table, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(View, { style: [styles.tableRow, styles.tableHeader], children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { style: [styles.colHeader, styles.productCol], children: "Producto" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { style: [styles.colHeader, styles.quantityCol], children: "Cantidad" })
    ] }),
    items.map(({ producto, cantidad }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(View, { style: styles.tableRow, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(View, { style: [styles.col, styles.productCol], children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { style: styles.productName, children: producto.name }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { style: styles.productCategory, children: producto.category.charAt(0).toUpperCase() + producto.category.slice(1) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { style: [styles.col, styles.quantityCol], children: cantidad })
    ] }, producto.id))
  ] }),
  /* @__PURE__ */ jsxRuntimeExports.jsxs(View, { style: styles.footer, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { children: "Prilabsa S.A. - www.prilabsa.com - info@prilabsa.com" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { children: "Este documento es una solicitud de cotización y no representa un compromiso de compra." })
  ] })
] }) });
export {
  CotizacionPDF as default
};
