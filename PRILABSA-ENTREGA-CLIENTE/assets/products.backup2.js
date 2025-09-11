const categories = { "alimentos": "ALIMENTOS", "probioticos": "PROBI�TICOS", "aditivos": "ADITIVOS", "quimicos": "QU�MICOS", "equipos": "EQUIPOS" };
const descriptions = { "alimentosDesc": "Revisa nuestro cat�logo de productos de Alimentos aqu�", "probioticosDesc": "Revisa nuestro cat�logo de productos de Probi�ticos aqu�", "aditivosDesc": "Revisa nuestro cat�logo de productos de Aditivos aqu�", "quimicosDesc": "Revisa nuestro cat�logo de productos de Qu�micos aqu�", "equiposDesc": "Revisa nuestro cat�logo de productos de Equipos aqu�" };
const actions = { "viewProducts": "VER PRODUCTOS", "viewAll": "Ver Todos los Productos �", "viewCatalog": "Ver Cat�logo Completo", "downloadCatalog": "Descargar Cat�logo PDF", "addProduct": "Agregar producto", "removeProduct": "Eliminar producto", "downloadPdf": "Descargar PDF" };
const search = { "placeholder": "Buscar categor�as de productos...", "searchProducts": "Buscar productos..." };
const catalog = { "title": "Nuestro Cat�logo de Productos", "description": "Descarga nuestro cat�logo completo con todos nuestros productos para la industria acu�cola.", "catalogTitle": "NUESTROS PRODUCTOS", "catalogSubtitle": "Soluciones integrales para la industria acu�cola con los m�s altos est�ndares de calidad" };
const productDetail = { "specifications": "Especificaciones", "datasheet": "Ficha T�cnica", "viewMore": "Ver m�s" };
const quotation = { "title": "Cotizaci�n", "pageTitle": "MI COTIZACI�N", "myQuote": "Mi Cotizaci�n", "subtitle": "Revise los productos seleccionados y ajuste las cantidades antes de generar su solicitud.", "quantity": "Cantidad", "emptyMessage": "Tu carrito de cotizaci�n est� vac�o", "emptyCart": "Su carrito de cotizaci�n est� vac�o", "exploreMessage": "Explore nuestro cat�logo para encontrar los productos que necesita." };
const common = { "products": "PRODUCTOS", "download": "Descargar", "loading": "Cargando...", "seeMore": "Ver m�s", "viewAll": "Ver todos" };
const products_backup = {
  categories,
  descriptions,
  actions,
  search,
  catalog,
  productDetail,
  quotation,
  common
};
export {
  actions,
  catalog,
  categories,
  common,
  products_backup as default,
  descriptions,
  productDetail,
  quotation,
  search
};
