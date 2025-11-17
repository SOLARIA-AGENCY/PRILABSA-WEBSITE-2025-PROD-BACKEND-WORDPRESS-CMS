const categories = { "alimentos": "ALIMENTOS", "probioticos": "PROBI�TICOS", "aditivos": "ADITIVOS", "quimicos": "QU�MICOS", "equipos": "EQUIPAMENTOS" };
const descriptions = { "alimentosDesc": "Confira nosso cat�logo de produtos de Alimentos aqui", "probioticosDesc": "Confira nosso cat�logo de produtos de Probi�ticos aqui", "aditivosDesc": "Confira nosso cat�logo de produtos de Aditivos aqui", "quimicosDesc": "Confira nosso cat�logo de produtos de Qu�micos aqui", "equiposDesc": "Confira nosso cat�logo de produtos de Equipamentos aqui" };
const actions = { "viewProducts": "VER PRODUTOS", "viewAll": "Ver Todos os Produtos �", "viewCatalog": "Ver Cat�logo Completo", "downloadCatalog": "Baixar Cat�logo PDF", "addProduct": "Adicionar produto", "removeProduct": "Remover produto", "downloadPdf": "Baixar PDF" };
const search = { "placeholder": "Buscar categorias de produtos...", "searchProducts": "Buscar produtos..." };
const catalog = { "title": "Nosso Cat�logo de Produtos", "description": "Baixe nosso cat�logo completo com todos os nossos produtos para a ind�stria aqu�cola.", "catalogTitle": "NOSSOS PRODUTOS", "catalogSubtitle": "Solu��es integrais para a ind�stria aqu�cola com os mais altos padr�es de qualidade" };
const productDetail = { "specifications": "Especifica��es", "datasheet": "Ficha T�cnica", "viewMore": "Ver mais" };
const quotation = { "title": "Cota��o", "pageTitle": "MINHA COTA��O", "myQuote": "Minha Cota��o", "subtitle": "Revise os produtos selecionados e ajuste as quantidades antes de gerar sua solicita��o.", "quantity": "Quantidade", "emptyMessage": "Seu carrinho de cota��o est� vazio", "emptyCart": "Seu carrinho de cota��o est� vazio", "exploreMessage": "Explore nosso cat�logo para encontrar os produtos que voc� precisa." };
const common = { "products": "PRODUTOS", "download": "Baixar", "loading": "Carregando...", "seeMore": "Ver mais", "viewAll": "Ver todos" };
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
