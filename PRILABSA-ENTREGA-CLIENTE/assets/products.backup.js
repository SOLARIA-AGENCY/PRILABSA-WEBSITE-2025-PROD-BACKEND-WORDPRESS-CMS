const categories = { "alimentos": "FOOD", "probioticos": "PROBIOTICS", "aditivos": "ADDITIVES", "quimicos": "CHEMICALS", "equipos": "EQUIPMENT" };
const descriptions = { "alimentosDesc": "Check our Food products catalog here", "probioticosDesc": "Check our Probiotics products catalog here", "aditivosDesc": "Check our Additives products catalog here", "quimicosDesc": "Check our Chemicals products catalog here", "equiposDesc": "Check our Equipment products catalog here" };
const actions = { "viewProducts": "VIEW PRODUCTS", "viewAll": "View All Products �", "viewCatalog": "View Complete Catalog", "downloadCatalog": "Download PDF Catalog", "addProduct": "Add product", "removeProduct": "Remove product", "downloadPdf": "Download PDF" };
const search = { "placeholder": "Search product categories...", "searchProducts": "Search products..." };
const catalog = { "title": "Our Product Catalog", "description": "Download our complete catalog with all our products for the aquaculture industry.", "catalogTitle": "OUR PRODUCTS", "catalogSubtitle": "Comprehensive solutions for the aquaculture industry with the highest quality standards" };
const productDetail = { "specifications": "Specifications", "datasheet": "Technical Datasheet", "viewMore": "View more" };
const quotation = { "title": "Quotation", "pageTitle": "MY QUOTATION", "myQuote": "My Quotation", "subtitle": "Review selected products and adjust quantities before generating your request.", "quantity": "Quantity", "emptyMessage": "Your quotation cart is empty", "emptyCart": "Your quotation cart is empty", "exploreMessage": "Explore our catalog to find the products you need." };
const common = { "products": "PRODUCTS", "download": "Download", "loading": "Loading...", "seeMore": "See more", "viewAll": "View all" };
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
