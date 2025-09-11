/**
 * EJEMPLO: Estructura de traducciones para productos dinámicos
 * Este archivo muestra cómo implementar traducciones para el contenido de productos
 */

interface ProductTranslations {
  [productId: string]: {
    es: {
      name: string;
      description: string;
      specifications?: Array<{ key: string; value: string }>;
      benefits?: string[];
      presentation?: string[];
    };
    en: {
      name: string;
      description: string;
      specifications?: Array<{ key: string; value: string }>;
      benefits?: string[];
      presentation?: string[];
    };
    pt: {
      name: string;
      description: string;
      specifications?: Array<{ key: string; value: string }>;
      benefits?: string[];
      presentation?: string[];
    };
  };
}

export const productTranslations: ProductTranslations = {
  // Ejemplo: COMBACID XL
  "AD001": {
    es: {
      name: "Combacid XL",
      description: "Es un producto en polvo usado como aditivo alimentario que inhibe agentes patógenos que ocasionan enfermedades, se considera un promotor de crecimiento.",
      specifications: [
        { key: "Ácido Fórmico Libre", value: "33% Mín." },
        { key: "Ácido Propiónico Libre", value: "10% Mín." },
        { key: "Laboratorio", value: "Mysis 1-2, 2 pmm, Mysis 2-3, 4 ppm" },
        { key: "Frecuencia", value: "dos veces al día" },
        { key: "Camaronera", value: "Pre-cría - engorde 2 – 6g/ kg de alimento" }
      ],
      benefits: [
        "Inhibe el crecimiento de bacterias patógenas",
        "Mejora la conversión alimenticia",
        "Promueve el crecimiento saludable",
        "Reduce la mortalidad"
      ]
    },
    en: {
      name: "Combacid XL",
      description: "A powder product used as a food additive that inhibits pathogenic agents that cause diseases, considered a growth promoter.",
      specifications: [
        { key: "Free Formic Acid", value: "33% Min." },
        { key: "Free Propionic Acid", value: "10% Min." },
        { key: "Laboratory", value: "Mysis 1-2, 2 ppm, Mysis 2-3, 4 ppm" },
        { key: "Frequency", value: "twice daily" },
        { key: "Shrimp farm", value: "Pre-breeding - fattening 2 – 6g/kg of feed" }
      ],
      benefits: [
        "Inhibits growth of pathogenic bacteria",
        "Improves feed conversion",
        "Promotes healthy growth",
        "Reduces mortality"
      ]
    },
    pt: {
      name: "Combacid XL",
      description: "É um produto em pó usado como aditivo alimentar que inibe agentes patogênicos que causam doenças, considerado um promotor de crescimento.",
      specifications: [
        { key: "Ácido Fórmico Livre", value: "33% Mín." },
        { key: "Ácido Propiônico Livre", value: "10% Mín." },
        { key: "Laboratório", value: "Mysis 1-2, 2 ppm, Mysis 2-3, 4 ppm" },
        { key: "Frequência", value: "duas vezes ao dia" },
        { key: "Carcinicultura", value: "Pré-cria - engorda 2 – 6g/kg de alimento" }
      ],
      benefits: [
        "Inibe o crescimento de bactérias patogênicas",
        "Melhora a conversão alimentar",
        "Promove crescimento saudável",
        "Reduz a mortalidade"
      ]
    }
  },

  // Ejemplo: CAROPHYLL PINK
  "AD002": {
    es: {
      name: "Carophyll Pink",
      description: "Pigmento natural para la coloración rosada de camarones y peces.",
      specifications: [
        { key: "Astaxantina", value: "10% Mín." },
        { key: "Forma", value: "Polvo fino" },
        { key: "Dosis recomendada", value: "50-100 ppm en alimento" }
      ]
    },
    en: {
      name: "Carophyll Pink",
      description: "Natural pigment for pink coloration of shrimp and fish.",
      specifications: [
        { key: "Astaxanthin", value: "10% Min." },
        { key: "Form", value: "Fine powder" },
        { key: "Recommended dose", value: "50-100 ppm in feed" }
      ]
    },
    pt: {
      name: "Carophyll Pink",
      description: "Pigmento natural para coloração rosa de camarões e peixes.",
      specifications: [
        { key: "Astaxantina", value: "10% Mín." },
        { key: "Forma", value: "Pó fino" },
        { key: "Dose recomendada", value: "50-100 ppm no alimento" }
      ]
    }
  },

  // Ejemplo: BALANZAS OHAUS
  "EQ002": {
    es: {
      name: "Balanzas OHAUS",
      description: "Balanzas de precisión para laboratorio con tecnología avanzada y calibración automática.",
      specifications: [
        { key: "Capacidad", value: "220g - 8200g" },
        { key: "Precisión", value: "0.001g - 0.1g" },
        { key: "Calibración", value: "Interna automática" },
        { key: "Display", value: "LCD retroiluminado" },
        { key: "Conectividad", value: "RS232, USB" }
      ],
      benefits: [
        "Alta precisión y repetibilidad",
        "Calibración automática",
        "Interfaz intuitiva",
        "Construcción robusta",
        "Múltiples unidades de pesaje"
      ]
    },
    en: {
      name: "OHAUS Scales",
      description: "Precision laboratory scales with advanced technology and automatic calibration.",
      specifications: [
        { key: "Capacity", value: "220g - 8200g" },
        { key: "Precision", value: "0.001g - 0.1g" },
        { key: "Calibration", value: "Automatic internal" },
        { key: "Display", value: "Backlit LCD" },
        { key: "Connectivity", value: "RS232, USB" }
      ],
      benefits: [
        "High precision and repeatability",
        "Automatic calibration",
        "Intuitive interface",
        "Robust construction",
        "Multiple weighing units"
      ]
    },
    pt: {
      name: "Balanças OHAUS",
      description: "Balanças de precisão para laboratório com tecnologia avançada e calibração automática.",
      specifications: [
        { key: "Capacidade", value: "220g - 8200g" },
        { key: "Precisão", value: "0,001g - 0,1g" },
        { key: "Calibração", value: "Interna automática" },
        { key: "Display", value: "LCD retroiluminado" },
        { key: "Conectividade", value: "RS232, USB" }
      ],
      benefits: [
        "Alta precisão e repetibilidade",
        "Calibração automática",
        "Interface intuitiva",
        "Construção robusta",
        "Múltiplas unidades de pesagem"
      ]
    }
  }
};

/**
 * Función helper para obtener la traducción de un producto
 */
export function getProductTranslation(productId: string, language: 'es' | 'en' | 'pt') {
  return productTranslations[productId]?.[language] || null;
}

/**
 * Función para fusionar datos del producto con traducciones
 */
export function mergeProductWithTranslation(product: any, language: 'es' | 'en' | 'pt') {
  const translation = getProductTranslation(product.id, language);
  
  if (!translation) {
    return product; // Retornar producto sin cambios si no hay traducción
  }

  return {
    ...product,
    name: translation.name || product.name,
    description: translation.description || product.description,
    specifications: translation.specifications || product.specifications,
    benefits: translation.benefits || product.benefits,
    presentation: translation.presentation || product.presentation
  };
}