const categories = { "alimentos": "ALIMENTOS", "probioticos": "PROBIÓTICOS", "aditivos": "ADITIVOS", "quimicos": "QUÍMICOS", "equipos": "EQUIPAMENTOS" };
const descriptions = { "alimentosDesc": "Confira nosso catálogo de produtos de Alimentos aqui", "probioticosDesc": "Confira nosso catálogo de produtos de Probióticos aqui", "aditivosDesc": "Confira nosso catálogo de produtos de Aditivos aqui", "quimicosDesc": "Confira nosso catálogo de produtos de Químicos aqui", "equiposDesc": "Confira nosso catálogo de produtos de Equipamentos aqui" };
const actions = { "viewProducts": "VER PRODUTOS", "viewAll": "Ver Todos os Produtos →", "viewCatalog": "Ver Catálogo Completo", "downloadCatalog": "Baixar Catálogo PDF", "addProduct": "Adicionar produto", "removeProduct": "Remover produto", "downloadPdf": "Baixar PDF", "viewProduct": "Ver Produto", "backToProducts": "Voltar aos Produtos", "addToQuote": "Adicionar à Cotação", "addedToQuote": "Produto adicionado à cotação" };
const search = { "placeholder": "Buscar categorias de produtos...", "searchProducts": "Buscar produtos...", "noResults": "Nenhum produto encontrado", "noResultsDescription": "Não há produtos que correspondam à categoria ou busca atual." };
const catalog = { "title": "Nosso Catálogo de Produtos", "description": "Baixe nosso catálogo completo com todos os nossos produtos para a indústria aquícola.", "catalogTitle": "NOSSOS PRODUTOS", "catalogSubtitle": "Soluções integrais para a indústria aquícola com os mais altos padrões de qualidade" };
const productDetail = { "specifications": "Especificações", "datasheet": "Ficha Técnica", "viewMore": "Ver mais", "productCode": "CÓDIGO", "productNotFound": "Produto não encontrado", "description": "Descrição", "benefits": "Benefícios", "presentation": "Apresentação", "relatedProducts": "Produtos Relacionados", "technicalSpecs": "Especificações Técnicas", "dosage": "Dosagem", "application": "Aplicação", "storage": "Armazenamento", "precautions": "Precauções", "downloadTechnicalSheet": "Baixar Ficha Técnica" };
const quotation = { "title": "Cotação", "pageTitle": "MINHA COTAÇÃO", "myQuote": "Minha Cotação", "subtitle": "Revise os produtos selecionados e ajuste as quantidades antes de gerar sua solicitação.", "quantity": "Quantidade", "emptyMessage": "Seu carrinho de cotação está vazio", "emptyCart": "Seu carrinho de cotação está vazio", "exploreMessage": "Explore nosso catálogo para encontrar os produtos que você precisa.", "requestQuote": "Solicitar Cotação", "generateQuote": "Gerar Cotação", "addNote": "Adicionar nota", "notes": "Notas adicionais" };
const common = { "products": "PRODUTOS", "download": "Baixar", "loading": "Carregando...", "seeMore": "Ver mais", "viewAll": "Ver todos", "home": "Início", "back": "Voltar", "next": "Próximo", "previous": "Anterior", "close": "Fechar", "open": "Abrir", "save": "Salvar", "cancel": "Cancelar", "delete": "Excluir", "edit": "Editar", "update": "Atualizar", "submit": "Enviar", "reset": "Redefinir" };
const breadcrumbs = { "home": "Início", "products": "Produtos", "category": { "alimentos": "Alimentos", "probioticos": "Probióticos", "aditivos": "Aditivos", "quimicos": "Químicos", "equipos": "Equipamentos" } };
const metadata = { "title": "Produtos - PRILABSA", "description": "Catálogo completo de produtos PRILABSA para a indústria aquícola. Alimentos, probióticos, aditivos, químicos e equipamentos de laboratório.", "keywords": "produtos aquícolas, equipamentos laboratório, reagentes químicos, ração para camarão, PRILABSA Equador" };
const products = {
  categories,
  descriptions,
  actions,
  search,
  catalog,
  productDetail,
  quotation,
  common,
  breadcrumbs,
  metadata
};
export {
  actions,
  breadcrumbs,
  catalog,
  categories,
  common,
  products as default,
  descriptions,
  metadata,
  productDetail,
  quotation,
  search
};
