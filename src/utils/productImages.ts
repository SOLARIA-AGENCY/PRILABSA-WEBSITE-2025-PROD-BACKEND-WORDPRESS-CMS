// PRILABSA Product Images Configuration
// Uses actual product images with PHP file server fallback

export const PRODUCT_IMAGES = {
  // Categorías - usando imágenes que existen localmente
  categories: {
    alimentos: '/file-server.php?/assets/iniciodev/productos_alimentos.png',
    probioticos: '/file-server.php?/assets/iniciodev/productos_probioticos.png',
    aditivos: '/file-server.php?/assets/iniciodev/productos_aditivos.png',
    quimicos: '/file-server.php?/assets/iniciodev/productos_quimicos.png',
    equipos: '/file-server.php?/assets/iniciodev/productos_equipos.png'
  },
  
  // Placeholder para productos individuales
  productPlaceholder: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjMwMCIgdmlld0JveD0iMCAwIDMwMCAzMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIiBmaWxsPSIjRjVGNUY1Ii8+Cjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBkb21pbmFudC1iYXNlbGluZT0ibWlkZGxlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSIjOTk5OTk5IiBmb250LXNpemU9IjE2Ij5JbWFnZW4gZGUgUHJvZHVjdG88L3RleHQ+Cjwvc3ZnPgo=',
  
  // Función para obtener URL de imagen de producto
  getProductImage: (productId: string): string => {
    // Mapeo de códigos de producto a nombres de archivo
    const productImageMap: { [key: string]: string } = {
      // Aditivos
      'AD001': 'AD001_COMBACID_XL.png',
      'AD002': 'AD002_CAROPHYLL_PINK.png',
      'AD003': 'AD003_DESINFECTANTE_ARGENTYNE.png',
      'AD004': 'AD004_EMERALD.png',
      'AD005': 'AD005_FLORFENICOL.png',
      'AD006': 'AD006_OXITETRACICLINA.png',
      'AD007': 'AD007_PRIME_BOOSTER.png',
      'AD008': 'AD008_PROTECTOR___D3.png',
      'AD009': 'AD009_PROTECTOR_D3___ZINC_ACTIVADO.png',
      'AD010': 'AD010_SAPONINA.png',
      'AD011': 'AD011_VEVOVITALL.png',
      'AD012': 'AD012_VITAMINA_C_MONOFOSFATADA.png',
      'AD013': 'AD013_VITAMINA_C.png',
      
      // Alimentos
      'AL001': 'AL001_LARVA_Z___PLUS__Microparticulados_.png',
      'AL002': 'AL002_LARVA_AP_100__Microparticulados_.png',
      'AL003': 'AL003_Z_PRO__Microparticulados_.png',
      'AL004': 'AL004_EZ_ARTEMIA__Microencapsulados_.png',
      'AL005': 'AL005_EZ_ARTEMIA_ULTRA__Microencapsulados_.png',
      'AL006': 'AL006_EZ_LARVA__Microencapsulados_.png',
      'AL007': 'AL007_BRINE_SHRIMP_FLAKE.png',
      'AL008': 'AL008_SHRIMP_MEAL_STARTER_55_15.png',
      'AL009': 'AL009_PRE_MIX_PL_RACEWAY_40_9.png',
      'AL010': 'AL010_EZ_MATE.png',
      'AL011': 'AL011_REDI_MATE.png',
      'AL012': 'AL012_CISTOS_DE_ARTEMIA.png',
      'AL013': 'AL013_MPs__Microparticulados_.png',
      'AL014': 'AL014_ADVANCE_FEED.png',
      'AL015': 'AL015_GOLD_FEED__Microparticulados_.png',
      'AL016': 'AL016_FLAKE_NEGRO_DE_ARTEMIA.png',
      'AL017': 'AL017_ESPIRULINA.png',
      'AL018': 'AL018_P__VANNAMEI_Microparticulado.png',
      'AL019': 'AL019_ZM_FEED_PARA_ZOEA___MYSIS.png',
      'AL020': 'AL020_ARTEMIA_ADULTA_CONGELADA.png',
      'AL021': 'AL021_CALAMARES.png',
      'AL022': 'AL022_MEJILLONES.png',
      'AL023': 'AL023_KRILL_CONGELADO.png',
      
      // Equipos
      'EQ001': 'EQ001_OXIGEN_METRO___OAKTON_260.png',
      'EQ002': 'EQ002_WATERLINK_SPIN_TOUCH.png',
      'EQ003': 'EQ003_NEON_OPTOD.png',
      'EQ004': 'EQ004_OXIGEN_METRO_OxyGuard_Polaris_C.png',
      'EQ005': 'EQ005_OXIGEN_METRO___Disuelto_DO__120.png',
      'EQ006': 'EQ006_MEDIDOR_DE_PH.png',
      'EQ007': 'EQ007_MEDIDOR_DE_POTASIO.png',
      'EQ008': 'EQ008_MEDIDOR_DE_CONDUCTIVIDAD_EC_11.png',
      'EQ009': 'EQ009_MEDIDOR_DE_CALCIO.png',
      'EQ010': 'EQ010_SALIN_METRO__11.png',
      'EQ011': 'EQ011_SALIN_METRO_VEE_GEE_STX_3.png',
      'EQ012': 'EQ012_TERM_METRO.png',
      'EQ013': 'EQ013_MANGUERA_DE_VINIL_TRANSPARENTE.png',
      'EQ014': 'EQ014_FRESHWATER.png',
      'EQ015': 'EQ015_AMMO_LOCK.png',
      'EQ016': 'EQ016_CHEMETRICS_KIT_DE_PER_XIDO_DE_HIDR_GENO.png',
      'EQ017': 'EQ017_CHEMETRICS_KIT_DE_NITRITO.png',
      'EQ018': 'EQ018_CHEMETRICS_KIT_DE_NITRATO.png',
      'EQ019': 'EQ019_CHEMETRICS_KIT_DE_HIERRO.png',
      'EQ020': 'EQ020_CHEMETRICS_KIT_DE_AMONIO.png',
      'EQ021': 'EQ021_CHEMETRICS_KIT_DE_FOSFATO.png',
      'EQ022': 'EQ022_CHEMETRICS_KIT_DE_SULFITO.png',
      'EQ023': 'EQ023_CHEMETRICS_KIT_DE_DUREZA.png',
      'EQ024': 'EQ024_CHEMETRICS_KIT_DE_ALCALINIDAD_TOTAL.png',
      'EQ025': 'EQ025_CHEMETRICS_KIT_DE_DI_XIDO_DE_CARBONO.png',
      'EQ026': 'EQ026_KITS_API_NITRATO.png',
      'EQ027': 'EQ027_KITS_API_NITRITO.png',
      'EQ028': 'EQ028_KITS_API_FOSFATO.png',
      'EQ029': 'EQ029_KITS_API_AMONIO.png',
      'EQ030': 'EQ030_KITS_API_CALCIO.png',
      'EQ031': 'EQ031_BALANZAS_OHAUS.png',
      'EQ032': 'EQ032_C_MARA_NEUBAUER.png',
      'EQ033': 'EQ033_TIRILLAS_pH.png',
      'EQ034': 'EQ034_C_MARA_SEDGEWICK.png',
      'EQ035': 'EQ035_BLOWERS_GAST.png',
      'EQ036': 'EQ036_BLOWERS_ALL_STAR.png',
      'EQ037': 'EQ037_PIEDRAS_DIFUSORAS.png',
      'EQ038': 'EQ038_MANGUERA_DIFUSORA.png',
      'EQ039': 'EQ039_BOLSO_FILTRANTES_DE_POLIPROPILENO.png',
      'EQ040': 'EQ040_CINTA_INDUSTRIAL_PRIME.png',
      'EQ041': 'EQ041_MALLAS_PARA_PISCINAS_CAMARONERAS.png',
      'EQ042': 'EQ042_MALLA_MARINES_ROJA.png',
      'EQ043': 'EQ043_MALLAS_NITEX.png',
      
      // Probióticos/Biológicos
      'PB001': 'PB001_TERMINATE.png',
      'PB002': 'PB002_PONDTOSS.png',
      'PB003': 'PB003_WASTE___SLUDGE_REDUCER___WSR_.png',
      'PB004': 'PB004_HATCHERY_PRIME.png',
      
      // Químicos
      'QU001': 'QU001_CLORURO_DE_MAGNESIO.png',
      'QU002': 'QU002_CLORURO_DE_POTASIO.png',
      'QU003': 'QU003_NITRATO_DE_SODIO.png',
      'QU004': 'QU004_PER_XIDO_DE_HIDR_GENO.png',
      'QU005': 'QU005_NITRATO_S_DICO_POT_SICO.png',
      'QU006': 'QU006__CIDO_H_MICO.png',
      'QU007': 'QU007_TRILON_B___EDTA.png',
      'QU008': 'QU008__CIDO_N_TRICO.png',
      'QU009': 'QU009__CIDO_F_RMICO.png',
      'QU010': 'QU010_ORTHOTOLIDINE__OTO_.png',
      'QU012': 'QU012_EDTA__4Na_.png',
      'QU013': 'QU013_PERCARBONATO_DE_SODIO.png',
      'QU014': 'QU014_REFRIGERANTE_ECOL_GICO_R507.png',
      'QU015': 'QU015_CLORO_GRANULADO.png',
      'QU016': 'QU016_SULFATO_DE_ALUMINIO__SO4_3_Al2.png',
      'QU017': 'QU017_THIOSULFATO_DE_SODIO.png',
      'QU018': 'QU018_METASILICATO_DE_SODIO.png'
    };
    
    const imageName = productImageMap[productId];
    if (imageName) {
      return `/file-server.php?/assets/product-images/${imageName}`;
    }
    
    // Fallback a placeholder si no se encuentra la imagen
    return PRODUCT_IMAGES.productPlaceholder;
  },
  
  // Función para verificar si la imagen está disponible
  isImageAvailable: async (imageUrl: string): Promise<boolean> => {
    try {
      const response = await fetch(imageUrl, { method: 'HEAD' });
      return response.ok && (response.headers.get('content-type')?.startsWith('image/') ?? false);
    } catch {
      return false;
    }
  }
};

export default PRODUCT_IMAGES;