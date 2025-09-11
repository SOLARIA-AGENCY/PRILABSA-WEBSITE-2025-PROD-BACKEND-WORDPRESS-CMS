import { Language } from '../../contexts/LanguageContext';

// Interfaz para las traducciones de productos
interface ProductTranslation {
  name: string;
  description: string;
  benefits?: string[];
  presentation?: string[];
  specifications?: Array<{ key: string; value: string }>;
}

interface ProductTranslations {
  [productId: string]: {
    es: ProductTranslation;
    en: ProductTranslation;
    pt: ProductTranslation;
  };
}

// Traducciones específicas para productos con contenido hardcodeado
export const productTranslations: ProductTranslations = {
  // Combacid XL - AD001 (PRIORITY PRODUCT - Batch 1)
  "AD001": {
    es: {
      name: "Combacid XL",
      description: "Es un producto en polvo usado como aditivo alimentario que inhibe agentes patógenos\nque ocasionan enfermedades, se considera un promotor de crecimiento.",
      benefits: [
      "Es un producto que al ser utilizado en el alimento actúa como un inhibidor de patógenos del tracto intestinal debido a la disminución del valor pH lo cual mejora el desempeño zootécnico de los camarones como la ganancia de peso, la eficiencia alimentaria y la supervivencia al mejorar la digestibilidad de los nutrientes de las dietas. Inhibe bacterias patógenas como V. parahemolítico, V. harveyi, V. vulnificus, E. coli y Salmolella sp."
    ],
      presentation: [
      "3kg en cubetas de plástico de 7L.",
      "4Kg en cubetas de plástico de 10L."
    ],
      specifications: [
      {
        "key": "Ácido Fórmico Libre",
        "value": "33% Mín."
      },
      {
        "key": "Ácido Propiónico Libre",
        "value": "10% Mín."
      },
      {
        "key": "Laboratorio",
        "value": "Mysis 1-2, 2 pmm, Mysis 2-3, 4 ppm,"
      },
      {
        "key": "Especificación",
        "value": "PL1 - PL5, 5 ppm, PL5 en adelante 6 ppm."
      },
      {
        "key": "Frecuencia",
        "value": "dos veces al día."
      },
      {
        "key": "Camaronera",
        "value": "Pre-cría - engorde 2 – 6g/ kg de alimento."
      }
    ]
    },
    en: {
      name: "Combacid XL",
      description: "A powder product used as a feed additive that inhibits pathogenic agents causing diseases, considered a growth promoter.",
      benefits: [
        "When used in feed, it acts as an inhibitor of intestinal tract pathogens by decreasing pH value, which improves the zootechnical performance of shrimp such as weight gain, feed efficiency and survival by improving nutrient digestibility of diets.",
        "Inhibits pathogenic bacteria such as V. parahemolyticus, V. harveyi, V. vulnificus, E. coli and Salmonella sp."
      ],
      presentation: [
        "3kg in 7L plastic buckets.",
        "4kg in 10L plastic buckets."
      ],
      specifications: [
        { key: "Free Formic Acid", value: "33% Min." },
        { key: "Free Propionic Acid", value: "10% Min." },
        { key: "Laboratory", value: "Mysis 1-2, 2 ppm, Mysis 2-3, 4 ppm" },
        { key: "Frequency", value: "twice daily" },
        { key: "Farm", value: "Pre-growing - growing 2 – 6g/kg of feed" }
      ]
    },
    pt: {
      name: "Combacid XL",
      description: "Um produto em pó usado como aditivo alimentar que inibe agentes patogênicos causadores de doenças, considerado um promotor de crescimento.",
      benefits: [
        "Quando usado na ração, atua como inibidor de patógenos do trato intestinal através da diminuição do valor de pH, melhorando o desempenho zootécnico dos camarões como ganho de peso, eficiência alimentar e sobrevivência ao melhorar a digestibilidade dos nutrientes das dietas.",
        "Inibe bactérias patogênicas como V. parahemolyticus, V. harveyi, V. vulnificus, E. coli e Salmonella sp."
      ],
      presentation: [
        "3kg em baldes plásticos de 7L.",
        "4kg em baldes plásticos de 10L."
      ],
      specifications: [
        { key: "Ácido Fórmico Livre", value: "33% Mín." },
        { key: "Ácido Propiônico Livre", value: "10% Mín." },
        { key: "Laboratório", value: "Mysis 1-2, 2 ppm, Mysis 2-3, 4 ppm" },
        { key: "Frequência", value: "duas vezes ao dia" },
        { key: "Fazenda", value: "Pré-criação - engorda 2 – 6g/kg de ração" }
      ]
    }
  },
  // Advance Feed - AL001 (PRIORITY PRODUCT - Batch 1) 
  "AL001": {
    es: {
      name: "Advance Feed",
      description: "Dieta balanceada de alta calidad para larvas de camarón (Zoea, Mysis y PL) formulada científicamente para optimizar el desarrollo, salud y supervivencia en estadios tempranos. También es apta para larvas de peces.",
      benefits: [
      "Alta flotabilidad y estabilidad en el agua, ideal para mantener la dieta suspendida y facilitar el consumo. Mejora la salud digestiva y aporta una coloración oscura prolongada en el hepatopáncreas e intestino. Favorece el crecimiento, vitalidad y supervivencia larval."
    ],
      presentation: [
      "Fundas de 3 kg",
      "Almacenar en un lugar fresco, seco, bien ventilado, protegido de la luz solar y alejado de las paredes. No requiere refrigeración ni condiciones especiales de transporte."
    ],
      specifications: [
      {
        "key": "Proteína Cruda",
        "value": "50% mín."
      },
      {
        "key": "Grasa Cruda",
        "value": "9% mín."
      },
      {
        "key": "Fibra Cruda",
        "value": "3% máx."
      },
      {
        "key": "Ceniza Total",
        "value": "8% máx."
      },
      {
        "key": "Humedad",
        "value": "5% máx."
      },
      {
        "key": "Especificación",
        "value": "Utilizar en fases larvarias de camarón o peces, ajustando la dosis según la etapa de desarrollo y el protocolo del laboratorio."
      }
    ]
    },
    en: {
      name: "Advance Feed",
      description: "High-quality balanced diet for shrimp larvae (Zoea, Mysis and PL) scientifically formulated to optimize development, health and survival in early stages. Also suitable for fish larvae.",
      benefits: [
        "High buoyancy and stability in water, ideal for keeping the diet suspended and facilitating consumption.",
        "Improves digestive health and provides prolonged dark coloration in the hepatopancreas and intestine.",
        "Promotes larval growth, vitality and survival."
      ],
      presentation: [
        "3 kg bags",
        "Store in a cool, dry, well-ventilated place, protected from sunlight and away from walls. Does not require refrigeration or special transportation conditions."
      ],
      specifications: [
        { key: "Crude Protein", value: "50% min." },
        { key: "Crude Fat", value: "9% min." },
        { key: "Crude Fiber", value: "3% max." },
        { key: "Total Ash", value: "8% max." },
        { key: "Moisture", value: "5% max." }
      ]
    },
    pt: {
      name: "Advance Feed",
      description: "Dieta balanceada de alta qualidade para larvas de camarão (Zoea, Mysis e PL) formulada cientificamente para otimizar o desenvolvimento, saúde e sobrevivência em estágios iniciais. Também adequada para larvas de peixes.",
      benefits: [
        "Alta flutuabilidade e estabilidade na água, ideal para manter a dieta suspensa e facilitar o consumo.",
        "Melhora a saúde digestiva e proporciona coloração escura prolongada no hepatopâncreas e intestino.",
        "Favorece o crescimento, vitalidade e sobrevivência larval."
      ],
      presentation: [
        "Sacos de 3 kg",
        "Armazenar em local fresco, seco, bem ventilado, protegido da luz solar e afastado das paredes. Não requer refrigeração nem condições especiais de transporte."
      ],
      specifications: [
        { key: "Proteína Bruta", value: "50% mín." },
        { key: "Gordura Bruta", value: "9% mín." },
        { key: "Fibra Bruta", value: "3% máx." },
        { key: "Cinza Total", value: "8% máx." },
        { key: "Umidade", value: "5% máx." }
      ]
    }
  },
  // Ácido Fórmico - QU001 (PRIORITY PRODUCT - Batch 1)
  // Manguera Difusora - EQ031 (PRIORITY PRODUCT - Batch 1)
  // PondToss - PB002
  // Larva AP 100 - AL014 (PRIORITY PRODUCT - Batch 2)
  "AL014": {
    es: {
      name: "Larva AP 100 (Microparticulados)",
      description: "Dieta granulada e hidroestable en micropartículas finas, científicamente formulada por Zeigler Bros. Inc. (EE. UU.) para la alimentación de camarones en estadios larvales y postlarvales. Ofrece una nutrición balanceada y de alta digestibilidad, ideal para cultivos intensivos en laboratorio.",
      benefits: [
      "Alta atractabilidad y digestibilidad.",
      "Contiene niveles óptimos de ácidos grasos insaturados (HUFA).",
      "Mejora el rendimiento y la salud en las primeras etapas de vida del camarón.",
      "Estabilidad en agua, ideal para alimentación en sistemas larvarios."
    ],
      presentation: [
      "Latas de 500 g",
      "Almacenar en lugar fresco, seco, ventilado y alejado de la luz solar y paredes",
      "Producto seguro, sin requisitos especiales de transporte",
      "Latas abiertas: conservar cerradas a 20 °C o menos"
    ],
      specifications: [
      {
        "key": "Proteína cruda",
        "value": "mínimo 50%"
      },
      {
        "key": "Grasa cruda",
        "value": "mínimo 12%"
      },
      {
        "key": "Fibra cruda",
        "value": "máximo 2.5%"
      },
      {
        "key": "Ceniza total",
        "value": "máximo 15%"
      },
      {
        "key": "Humedad",
        "value": "máximo 10%"
      },
      {
        "key": "Fósforo",
        "value": "mínimo 1.3%"
      },
      {
        "key": "Especificación",
        "value": "Proteínas marinas y vegetales"
      },
      {
        "key": "Especificación",
        "value": "Lecitina"
      },
      {
        "key": "Especificación",
        "value": "Levaduras"
      },
      {
        "key": "Especificación",
        "value": "Subproductos de granos procesados"
      },
      {
        "key": "Especificación",
        "value": "Espesante y emulsionante"
      },
      {
        "key": "Especificación",
        "value": "Minerales y vitaminas"
      }
    ]
    },
    en: {
      name: "Larva AP 100 (Microparticulates)",
      description: "Fine microparticle granulated and water-stable diet, scientifically formulated by Zeigler Bros. Inc. (USA) for feeding shrimp in larval and postlarval stages. Offers balanced nutrition and high digestibility, ideal for intensive laboratory cultures.",
      benefits: [
        "High attractability and digestibility.",
        "Contains optimal levels of highly unsaturated fatty acids (HUFA).",
        "Improves performance and health in early stages of shrimp life.",
        "Water stability, ideal for feeding in larval systems."
      ],
      presentation: [
        "500 g cans",
        "Store in cool, dry, ventilated place away from sunlight and walls",
        "Safe product, no special transport requirements",
        "Opened cans: keep closed at 20°C or less"
      ],
      specifications: [
        { key: "Crude protein", value: "minimum 50%" },
        { key: "Crude fat", value: "minimum 12%" },
        { key: "Crude fiber", value: "maximum 2.5%" },
        { key: "Total ash", value: "maximum 15%" },
        { key: "Moisture", value: "maximum 10%" },
        { key: "Phosphorus", value: "minimum 1.3%" }
      ]
    },
    pt: {
      name: "Larva AP 100 (Microparticulados)",
      description: "Dieta granulada e hidroestável em micropartículas finas, cientificamente formulada pela Zeigler Bros. Inc. (EUA) para alimentação de camarões em estágios larvais e pós-larvais. Oferece nutrição balanceada e alta digestibilidade, ideal para cultivos intensivos em laboratório.",
      benefits: [
        "Alta atratividade e digestibilidade.",
        "Contém níveis ótimos de ácidos graxos altamente insaturados (HUFA).",
        "Melhora o desempenho e a saúde nas primeiras etapas de vida do camarão.",
        "Estabilidade na água, ideal para alimentação em sistemas larvais."
      ],
      presentation: [
        "Latas de 500 g",
        "Armazenar em local fresco, seco, ventilado e afastado da luz solar e paredes",
        "Produto seguro, sem requisitos especiais de transporte",
        "Latas abertas: conservar fechadas a 20°C ou menos"
      ],
      specifications: [
        { key: "Proteína bruta", value: "mínimo 50%" },
        { key: "Gordura bruta", value: "mínimo 12%" },
        { key: "Fibra bruta", value: "máximo 2,5%" },
        { key: "Cinza total", value: "máximo 15%" },
        { key: "Umidade", value: "máximo 10%" },
        { key: "Fósforo", value: "mínimo 1,3%" }
      ]
    }
  },
  // Carophyll Pink - AD002 (PRIORITY PRODUCT - Batch 2)
  "AD002": {
    es: {
      name: "Carophyll Pink",
      description: "Pigmentante en polvo utilizado como aditivo alimentario en camarones para funciones de pigmentación, fotoprotección y como antioxidante. Contiene astaxantina en una matriz recubierta de almidón de maíz, lignosulfonato y cera de abejas. Además, incluye Dl-alfa-tocoferol como antioxidante. Es un suplemento que favorece el desempeño fisiológico y reproductivo de los crustáceos.",
      benefits: [
      "Mejora la pigmentación natural de los camarones.",
      "Actúa como fotoprotector y antioxidante.",
      "Incrementa la sobrevivencia.",
      "Disminuye el ciclo de muda.",
      "Mejora la resistencia al estrés.",
      "Favorece el desempeño reproductivo.",
      "Precursor de vitamina A."
    ],
      presentation: [
      "Fundas de 500g.",
      "Producto sensible al aire, calor y luz. Una vez abierto, debe usarse completamente."
    ],
      specifications: [
      {
        "key": "Laboratorio",
        "value": "0.5 – 1.0 g/kg de alimento"
      },
      {
        "key": "Camaronera",
        "value": "0.5 g/kg de alimento"
      },
      {
        "key": "Fineza",
        "value": ""
      },
      {
        "key": "Especificación",
        "value": "100% pasa por tamiz #20"
      },
      {
        "key": "Especificación",
        "value": "90% pasa por tamiz #40 (mínimo)"
      },
      {
        "key": "Especificación",
        "value": "30% pasa por tamiz #100 (máximo)"
      },
      {
        "key": "Pérdida por secado",
        "value": "Máx. 8%"
      },
      {
        "key": "Astaxantina",
        "value": "Máx. 10%"
      },
      {
        "key": "Fórmula empírica",
        "value": "C₄₀H₅₂O"
      },
      {
        "key": "Masa molecular",
        "value": "596.85 g/mol"
      },
      {
        "key": "CAS No",
        "value": "7542-45-2"
      },
      {
        "key": "EINECS No",
        "value": "231-424-6"
      }
    ]
    },
    en: {
      name: "Carophyll Pink",
      description: "Powder pigment used as a feed additive in shrimp for pigmentation, photoprotection and antioxidant functions. Contains astaxanthin in a matrix coated with corn starch, lignosulfonate and beeswax. Also includes Dl-alpha-tocopherol as antioxidant. It is a supplement that favors the physiological and reproductive performance of crustaceans.",
      benefits: [
        "Improves natural pigmentation of shrimp.",
        "Acts as photoprotector and antioxidant.",
        "Increases survival.",
        "Decreases molting cycle.",
        "Improves stress resistance.",
        "Favors reproductive performance.",
        "Vitamin A precursor."
      ],
      presentation: [
        "500g bags.",
        "Product sensitive to air, heat and light. Once opened, must be used completely."
      ],
      specifications: [
        { key: "Laboratory", value: "0.5 – 1.0 g/kg of feed" },
        { key: "Farm", value: "0.5 g/kg of feed" },
        { key: "Drying loss", value: "Max. 8%" },
        { key: "Astaxanthin", value: "Max. 10%" }
      ]
    },
    pt: {
      name: "Carophyll Pink",
      description: "Pigmento em pó usado como aditivo alimentar em camarões para funções de pigmentação, fotoproteção e como antioxidante. Contém astaxantina em uma matriz revestida com amido de milho, lignosulfonato e cera de abelha. Também inclui Dl-alfa-tocoferol como antioxidante. É um suplemento que favorece o desempenho fisiológico e reprodutivo dos crustáceos.",
      benefits: [
        "Melhora a pigmentação natural dos camarões.",
        "Atua como fotoprotetor e antioxidante.",
        "Aumenta a sobrevivência.",
        "Diminui o ciclo de muda.",
        "Melhora a resistência ao estresse.",
        "Favorece o desempenho reprodutivo.",
        "Precursor da vitamina A."
      ],
      presentation: [
        "Sacos de 500g.",
        "Produto sensível ao ar, calor e luz. Uma vez aberto, deve ser usado completamente."
      ],
      specifications: [
        { key: "Laboratório", value: "0,5 – 1,0 g/kg de ração" },
        { key: "Fazenda", value: "0,5 g/kg de ração" },
        { key: "Perda por secagem", value: "Máx. 8%" },
        { key: "Astaxantina", value: "Máx. 10%" }
      ]
    }
  },
  // Hatchery Prime - PB001 (PRIORITY PRODUCT - Batch 2)
  // Cloro Granulado - QU004 (PRIORITY PRODUCT - Batch 2)
  // Ammo Lock - EQ001 (PRIORITY PRODUCT - Batch 2)

  // Desinfectante Argentyne - AD003 (PRIORITY PRODUCT - Batch 2)
  "AD003": {
    es: {
      name: "Desinfectante Argentyne",
      description: "Desinfectante en base a yodo, utilizado en laboratorio para la desinfección de huevos y post-larvas de camarones y peces. El producto está certificado como libre de virus, bacterias, hongos, parásitos y otros patógenos. Fabricado en EE. UU., su uso garantiza condiciones sanitarias óptimas en procesos larvarios acuícolas.",
      benefits: [
      "Efectiva desinfección de huevos y post-larvas.",
      "Libre de virus, bacterias, hongos y parásitos.",
      "Mejora la tasa de supervivencia en etapas tempranas.",
      "Contribuye a mantener un ambiente sanitario en incubación."
    ],
      presentation: [
      "Envases plásticos de 1 galón."
    ],
      specifications: [
      {
        "key": "Yodo total",
        "value": "12.9%"
      },
      {
        "key": "Povidona yodada (PVP-I)",
        "value": "10%"
      },
      {
        "key": "Yodo libre",
        "value": "1%"
      },
      {
        "key": "pH (25 °C)",
        "value": "6.8"
      },
      {
        "key": "Pérdida por sequía",
        "value": "2.6%"
      },
      {
        "key": "Residuo de ignición",
        "value": "<0.025%"
      },
      {
        "key": "Ion de yoduro de potasio",
        "value": "5.9%"
      },
      {
        "key": "Contenido de nitrógeno",
        "value": "9.9%"
      },
      {
        "key": "Especificación",
        "value": "Diluir 100 veces para obtener 100 ppm de yodo libre."
      },
      {
        "key": "Especificación",
        "value": "Usar agua con baja carga orgánica para evitar la inactivación del yodo."
      },
      {
        "key": "Especificación",
        "value": "Ajustar el pH de la solución diluida a 7 para mejorar la supervivencia de los huevos."
      },
      {
        "key": "Especificación",
        "value": "Soluciones madre deben mantenerse entre pH 6.5 – 7.0."
      },
      {
        "key": "Especificación",
        "value": "Después del desove, endurecer los huevos durante 2 horas en agua, reposar 2 horas más."
      },
      {
        "key": "Especificación",
        "value": "Sumergir los huevos en la solución diluida de ARGENTYNE por 10 minutos, enjuagar y transferir a bandejas de incubación."
      }
    ]
    },
    en: {
      name: "Argentyne Disinfectant",
      description: "Iodine-based disinfectant used in laboratory for disinfection of shrimp and fish eggs and post-larvae. The product is certified as free of viruses, bacteria, fungi, parasites and other pathogens. Manufactured in the USA, its use guarantees optimal sanitary conditions in aquaculture larval processes.",
      benefits: [
        "Effective disinfection of eggs and post-larvae",
        "Free of viruses, bacteria, fungi and parasites",
        "Improves survival rate in early stages",
        "Contributes to maintaining a sanitary environment in incubation"
      ],
      presentation: [
        "1-gallon plastic containers"
      ],
      specifications: [
        { key: "Total Iodine", value: "12.9%" },
        { key: "Povidone Iodine (PVP-I)", value: "10%" },
        { key: "Free Iodine", value: "1%" },
        { key: "pH (25°C)", value: "6.8" },
        { key: "Dilution", value: "100 times to obtain 100 ppm free iodine" },
        { key: "Immersion time", value: "10 minutes" }
      ]
    },
    pt: {
      name: "Desinfetante Argentyne",
      description: "Desinfetante à base de iodo, utilizado em laboratório para a desinfecção de ovos e pós-larvas de camarões e peixes. O produto está certificado como livre de vírus, bactérias, fungos, parasitas e outros patógenos. Fabricado nos EUA, seu uso garante condições sanitárias ótimas em processos larvais da aquicultura.",
      benefits: [
        "Desinfecção eficaz de ovos e pós-larvas",
        "Livre de vírus, bactérias, fungos e parasitas",
        "Melhora a taxa de sobrevivência em estágios iniciais",
        "Contribui para manter um ambiente sanitário na incubação"
      ],
      presentation: [
        "Recipientes plásticos de 1 galão"
      ],
      specifications: [
        { key: "Iodo total", value: "12,9%" },
        { key: "Povidona iodada (PVP-I)", value: "10%" },
        { key: "Iodo livre", value: "1%" },
        { key: "pH (25°C)", value: "6,8" },
        { key: "Diluição", value: "100 vezes para obter 100 ppm de iodo livre" },
        { key: "Tempo de imersão", value: "10 minutos" }
      ]
    }
  },

  // Emerald - AD004 (PRIORITY PRODUCT - Batch 2)
  "AD004": {
    es: {
      name: "Emerald",
      description: "Premezcla aromatizante en polvo para especies acuícolas como camarones y peces. Formulada en forma de microperlas, contiene una combinación estandarizada de aceite esencial de canela (>10%), encapsulado en aceite vegetal hidrogenado para garantizar su estabilidad y liberación controlada.",
      benefits: [
      "Aumenta la palatabilidad del alimento.",
      "Mejora la integridad y función de la barrera intestinal.",
      "Reduce desórdenes digestivos.",
      "Estimula el sistema inmunológico.",
      "Disminuye la carga bacteriana.",
      "Actúa como aromatizante para mejorar la aceptación del alimento."
    ],
      presentation: [
      "Fundas de 1 kg",
      "Vida útil de 24 meses en empaque cerrado",
      "Conservar en lugar fresco, seco y protegido del aire y la luz"
    ],
      specifications: [
      {
        "key": "Dosis recomendada",
        "value": "1 – 5 g/kg de alimento"
      },
      {
        "key": "Vía de administración",
        "value": "mezclado en el alimento balanceado"
      }
    ]
    },
    en: {
      name: "Emerald",
      description: "Flavoring powder premix for aquatic species such as shrimp and fish. Formulated as microbeads, it contains a standardized combination of cinnamon essential oil (>10%), encapsulated in hydrogenated vegetable oil to ensure stability and controlled release.",
      benefits: [
        "Increases feed palatability",
        "Improves integrity and function of intestinal barrier",
        "Reduces digestive disorders",
        "Stimulates the immune system",
        "Decreases bacterial load",
        "Acts as flavoring to improve feed acceptance"
      ],
      presentation: [
        "1 kg bags",
        "24-month shelf life in closed packaging",
        "Store in cool, dry place protected from air and light"
      ],
      specifications: [
        { key: "Cinnamon essential oil", value: ">10%" },
        { key: "Recommended dose", value: "1 – 5 g/kg of feed" },
        { key: "Administration route", value: "mixed in balanced feed" },
        { key: "Shelf life", value: "24 months" }
      ]
    },
    pt: {
      name: "Emerald",
      description: "Pré-mistura aromatizante em pó para espécies aquáticas como camarões e peixes. Formulada em forma de microesferas, contém uma combinação padronizada de óleo essencial de canela (>10%), encapsulado em óleo vegetal hidrogenado para garantir sua estabilidade e liberação controlada.",
      benefits: [
        "Aumenta a palatabilidade do alimento",
        "Melhora a integridade e função da barreira intestinal",
        "Reduz distúrbios digestivos",
        "Estimula o sistema imunológico",
        "Diminui a carga bacteriana",
        "Atua como aromatizante para melhorar a aceitação do alimento"
      ],
      presentation: [
        "Sacos de 1 kg",
        "Vida útil de 24 meses em embalagem fechada",
        "Conservar em local fresco, seco e protegido do ar e da luz"
      ],
      specifications: [
        { key: "Óleo essencial de canela", value: ">10%" },
        { key: "Dose recomendada", value: "1 – 5 g/kg de alimento" },
        { key: "Via de administração", value: "misturado na ração balanceada" },
        { key: "Vida útil", value: "24 meses" }
      ]
    }
  },

  // Florfenicol - AD005 (PRIORITY PRODUCT - Batch 2)
  "AD005": {
    es: {
      name: "Florfenicol",
      description: "Antibiótico de amplio espectro aprobado por la FDA para el tratamiento de enfermedades bacterianas en organismos acuícolas. Recomendado para uso en camarones y peces en sistemas de laboratorio y camaroneras. Es eficaz contra diversas bacterias patógenas responsables de infecciones comunes en acuicultura.",
      benefits: [
      "Antibiótico de amplio espectro contra infecciones bacterianas.",
      "Eficaz frente a Vibrio harveyi, V. vulnificus, V. parahaemolyticus, Aeromonas sp., entre otros.",
      "Mejora la salud y supervivencia de los camarones al controlar patógenos bacterianos."
    ],
      presentation: [
      "Bolsas de 1 kg",
      "Conservar en un lugar fresco y seco",
      "Evitar exposición directa a la luz solar",
      "Mantener fuera del alcance de los niños"
    ],
      specifications: [
      {
        "key": "Florfenicol",
        "value": "20%"
      },
      {
        "key": "Excipientes",
        "value": "80%"
      },
      {
        "key": "Dosis",
        "value": "3 a 5 kg por tonelada de alimento balanceado"
      },
      {
        "key": "Especificación",
        "value": "La dosis puede variar según indicación técnica"
      },
      {
        "key": "Periodo de retiro",
        "value": "30 días desde la última administración"
      }
    ]
    },
    en: {
      name: "Florfenicol",
      description: "Broad-spectrum antibiotic approved by the FDA for the treatment of bacterial diseases in aquaculture organisms. Recommended for use in shrimp and fish in laboratory systems and shrimp farms. It is effective against various pathogenic bacteria responsible for common infections in aquaculture.",
      benefits: [
        "Broad-spectrum antibiotic against bacterial infections",
        "Effective against Vibrio harveyi, V. vulnificus, V. parahaemolyticus, Aeromonas sp., among others",
        "Improves shrimp health and survival by controlling bacterial pathogens"
      ],
      presentation: [
        "1 kg bags",
        "Store in a cool and dry place",
        "Avoid direct sunlight exposure",
        "Keep out of reach of children"
      ],
      specifications: [
        { key: "Florfenicol", value: "20%" },
        { key: "Excipients", value: "80%" },
        { key: "Dose", value: "3 to 5 kg per ton of balanced feed" },
        { key: "Withdrawal period", value: "30 days from last administration" }
      ]
    },
    pt: {
      name: "Florfenicol",
      description: "Antibiótico de amplo espectro aprovado pela FDA para o tratamento de doenças bacterianas em organismos aquícolas. Recomendado para uso em camarões e peixes em sistemas de laboratório e fazendas de camarão. É eficaz contra várias bactérias patogênicas responsáveis por infecções comuns na aquicultura.",
      benefits: [
        "Antibiótico de amplo espectro contra infecções bacterianas",
        "Eficaz contra Vibrio harveyi, V. vulnificus, V. parahaemolyticus, Aeromonas sp., entre outros",
        "Melhora a saúde e sobrevivência dos camarões ao controlar patógenos bacterianos"
      ],
      presentation: [
        "Sacos de 1 kg",
        "Conservar em local fresco e seco",
        "Evitar exposição direta à luz solar",
        "Manter fora do alcance das crianças"
      ],
      specifications: [
        { key: "Florfenicol", value: "20%" },
        { key: "Excipientes", value: "80%" },
        { key: "Dose", value: "3 a 5 kg por tonelada de ração balanceada" },
        { key: "Período de retirada", value: "30 dias desde a última administração" }
      ]
    }
  },

  // Oxitetraciclina - AD006 (PRIORITY PRODUCT - Batch 2)
  "AD006": {
    es: {
      name: "Oxitetraciclina",
      description: "Antibiótico de amplio espectro autorizado por la FDA para uso en acuicultura. Diseñado para el tratamiento de bacterias grampositivas, gramnegativas, anaerobias y otros patógenos como Vibrio, Chlamydia, Mycoplasmas, protozoarios, rickettsias, Salmonella, Staphylococcus y Streptococcus. Se utiliza en sistemas de laboratorio y camaroneras para garantizar la salud de los organismos acuáticos.",
      benefits: [
      "Efectivo contra una amplia variedad de bacterias y microorganismos.",
      "Aprobado para uso en especies acuícolas.",
      "Combate infecciones bacterianas que afectan la productividad y supervivencia en cultivo."
    ],
      presentation: [
      "Bolsas de 1 kg",
      "Tambores de 25 kg",
      "Conservar en lugar fresco y seco",
      "Proteger de la luz solar directa y prolongada",
      "Mantener fuera del alcance de los niños"
    ],
      specifications: [
      {
        "key": "Oxitetraciclina",
        "value": "98% (concentrado)"
      },
      {
        "key": "Excipientes",
        "value": "2%"
      },
      {
        "key": "Especificación",
        "value": "La dosis debe determinarse según análisis bacteriológicos y valores de Concentración Mínima Inhibitoria (MIC)."
      }
    ]
    },
    en: {
      name: "Oxytetracycline",
      description: "Broad-spectrum antibiotic authorized by the FDA for use in aquaculture. Designed for the treatment of gram-positive, gram-negative, anaerobic bacteria and other pathogens such as Vibrio, Chlamydia, Mycoplasmas, protozoa, rickettsia, Salmonella, Staphylococcus and Streptococcus. Used in laboratory systems and shrimp farms to ensure the health of aquatic organisms.",
      benefits: [
        "Effective against a wide variety of bacteria and microorganisms",
        "Approved for use in aquaculture species",
        "Combats bacterial infections that affect productivity and survival in culture"
      ],
      presentation: [
        "1 kg bags",
        "25 kg drums",
        "Store in cool and dry place",
        "Protect from direct and prolonged sunlight",
        "Keep out of reach of children"
      ],
      specifications: [
        { key: "Oxytetracycline", value: "98% (concentrate)" },
        { key: "Excipients", value: "2%" },
        { key: "Dosage", value: "According to bacteriological analysis and MIC values" }
      ]
    },
    pt: {
      name: "Oxitetraciclina",
      description: "Antibiótico de amplo espectro autorizado pela FDA para uso na aquicultura. Projetado para o tratamento de bactérias gram-positivas, gram-negativas, anaeróbias e outros patógenos como Vibrio, Chlamydia, Mycoplasmas, protozoários, rickettsia, Salmonella, Staphylococcus e Streptococcus. Utilizado em sistemas de laboratório e fazendas de camarão para garantir a saúde dos organismos aquáticos.",
      benefits: [
        "Eficaz contra uma ampla variedade de bactérias e microorganismos",
        "Aprovado para uso em espécies aquícolas",
        "Combate infecções bacterianas que afetam a produtividade e sobrevivência no cultivo"
      ],
      presentation: [
        "Sacos de 1 kg",
        "Tambores de 25 kg",
        "Conservar em local fresco e seco",
        "Proteger da luz solar direta e prolongada",
        "Manter fora do alcance das crianças"
      ],
      specifications: [
        { key: "Oxitetraciclina", value: "98% (concentrado)" },
        { key: "Excipientes", value: "2%" },
        { key: "Dosagem", value: "Segundo análise bacteriológica e valores MIC" }
      ]
    }
  },

  // Prime Booster - AD007 (PRIORITY PRODUCT - Batch 3)
  "AD007": {
    es: {
      name: "Prime Booster",
      description: "Enriquecedor nutricional formulado con una combinación de vitaminas, minerales y fosfolípidos con alto contenido de DHA. Diseñado para fortalecer el sistema inmunológico rudimentario del camarón en todos sus estadios, ayudando a prevenir enfermedades e infecciones bacterianas y virales. Su uso incrementa la supervivencia y mejora la salud general del cultivo.",
      benefits: [
      "Refuerza el sistema inmunológico del camarón.",
      "Ayuda a prevenir infecciones bacterianas y virales.",
      "Mejora la respuesta frente al estrés.",
      "Incrementa la tasa de supervivencia en laboratorio y camaronera.",
      "Aporta DHA, vitaminas y minerales esenciales."
    ],
      presentation: [
      "Fundas de 1 kg",
      "Sacos de 24 kg",
      "Vida útil de 24 meses en empaque cerrado",
      "Conservar en lugar fresco y seco",
      "Evitar exposición directa al aire y luz"
    ],
      specifications: [
      {
        "key": "Camaronera",
        "value": "1 – 2 g/kg de alimento por día"
      },
      {
        "key": "Laboratorio",
        "value": ""
      },
      {
        "key": "Enriquecimiento de artemia",
        "value": "3 g/lb"
      },
      {
        "key": "Larvas",
        "value": "1 g/kg de alimento diario en todos los estadios"
      }
    ]
    },
    en: {
      name: "Prime Booster",
      description: "Nutritional enricher formulated with a combination of vitamins, minerals and phospholipids with high DHA content. Designed to strengthen the rudimentary immune system of shrimp in all stages, helping to prevent diseases and bacterial and viral infections. Its use increases survival and improves overall crop health.",
      benefits: [
        "Strengthens shrimp immune system",
        "Helps prevent bacterial and viral infections",
        "Improves stress response",
        "Increases survival rate in laboratory and shrimp farm",
        "Provides essential DHA, vitamins and minerals"
      ],
      presentation: [
        "1 kg bags",
        "24 kg sacks",
        "24-month shelf life in closed packaging",
        "Store in cool and dry place",
        "Avoid direct exposure to air and light"
      ],
      specifications: [
        { key: "Shrimp farm", value: "1 – 2 g/kg of feed per day" },
        { key: "Artemia enrichment", value: "3 g/lb" },
        { key: "Larvae", value: "1 g/kg of feed daily in all stages" }
      ]
    },
    pt: {
      name: "Prime Booster",
      description: "Enriquecedor nutricional formulado com uma combinação de vitaminas, minerais e fosfolípidos com alto teor de DHA. Projetado para fortalecer o sistema imunológico rudimentar do camarão em todos os seus estágios, ajudando a prevenir doenças e infecções bacterianas e virais. Seu uso aumenta a sobrevivência e melhora a saúde geral do cultivo.",
      benefits: [
        "Fortalece o sistema imunológico do camarão",
        "Ajuda a prevenir infecções bacterianas e virais",
        "Melhora a resposta ao estresse",
        "Aumenta a taxa de sobrevivência em laboratório e fazenda de camarão",
        "Fornece DHA, vitaminas e minerais essenciais"
      ],
      presentation: [
        "Sacos de 1 kg",
        "Sacos de 24 kg",
        "Vida útil de 24 meses em embalagem fechada",
        "Conservar em local fresco e seco",
        "Evitar exposição direta ao ar e à luz"
      ],
      specifications: [
        { key: "Fazenda de camarão", value: "1 – 2 g/kg de ração por dia" },
        { key: "Enriquecimento de artêmia", value: "3 g/lb" },
        { key: "Larvas", value: "1 g/kg de ração diária em todos os estágios" }
      ]
    }
  },

  // Protector D3 + Zinc Activado - AD008 (PRIORITY PRODUCT - Batch 3)
  "AD008": {
    es: {
      name: "Protector D3 + Zinc Activado",
      description: "Premezcla vitamínico-mineral formulada para camarones Penaeus vannamei en todas sus fases, incluyendo larvarias. Su formulación equilibrada en electrolitos, minerales y vitaminas fortalece la salud del animal, mejora el equilibrio iónico en el medio acuático y contribuye al crecimiento y supervivencia en sistemas de laboratorio y camaronera.",
      benefits: [
      "Fortalece la salud general del camarón.",
      "Mejora el equilibrio iónico en el medio acuático.",
      "Estimula el crecimiento y desarrollo saludable.",
      "Contribuye a una mayor supervivencia en todas las etapas.",
      "Aporta vitaminas esenciales y zinc activado con función inmunoestimulante."
    ],
      presentation: [
      "Envases sellados al vacío de 1 kg",
      "Conservar sobre tarimas, en lugar seco, ventilado y protegido de la luz solar"
    ],
      specifications: [
      {
        "key": "Electrolitos",
        "value": "Calcio, magnesio, potasio"
      },
      {
        "key": "Minerales",
        "value": "Zinc, sodio, yodo, selenio, hierro, cobalto, cobre, manganeso"
      },
      {
        "key": "Vitaminas",
        "value": "C, E, H2, K3, B6, B5, B1, A, B2, B12, B9, B3, D3"
      },
      {
        "key": "Vitamina A",
        "value": "mínimo 2,800,000 UI/kg"
      },
      {
        "key": "Vitamina D3",
        "value": "mínimo 1,000,000 UI/kg"
      },
      {
        "key": "Vitamina E",
        "value": "mínimo 12,500 UI/kg"
      },
      {
        "key": "Zinc",
        "value": "mínimo 3,500 UI/kg"
      },
      {
        "key": "Camaronera",
        "value": ""
      },
      {
        "key": "Pre-cría",
        "value": "4 – 5 g/kg de alimento"
      },
      {
        "key": "Engorde",
        "value": "5 – 6 g/kg de alimento"
      },
      {
        "key": "Laboratorio",
        "value": "Según indicaciones del técnico"
      },
      {
        "key": "Vía de administración",
        "value": "Mezclado en el alimento balanceado y/o directo al agua de cultivo"
      }
    ]
    },
    en: {
      name: "Protector D3 + Activated Zinc",
      description: "Vitamin-mineral premix formulated for Penaeus vannamei shrimp in all phases, including larval. Its balanced formulation of electrolytes, minerals and vitamins strengthens animal health, improves ionic balance in the aquatic environment and contributes to growth and survival in laboratory and shrimp farm systems.",
      benefits: [
        "Strengthens overall shrimp health",
        "Improves ionic balance in aquatic environment",
        "Stimulates healthy growth and development",
        "Contributes to higher survival in all stages",
        "Provides essential vitamins and activated zinc with immunostimulating function"
      ],
      presentation: [
        "1 kg vacuum-sealed containers",
        "Store on pallets, in dry, ventilated place protected from sunlight"
      ],
      specifications: [
        { key: "Vitamin A", value: "minimum 2,800,000 IU/kg" },
        { key: "Vitamin D3", value: "minimum 1,000,000 IU/kg" },
        { key: "Vitamin E", value: "minimum 12,500 IU/kg" },
        { key: "Zinc", value: "minimum 3,500 IU/kg" },
        { key: "Pre-growing", value: "4 – 5 g/kg of feed" },
        { key: "Growing", value: "5 – 6 g/kg of feed" }
      ]
    },
    pt: {
      name: "Protector D3 + Zinco Ativado",
      description: "Pré-mistura vitamínico-mineral formulada para camarões Penaeus vannamei em todas as fases, incluindo larvais. Sua formulação equilibrada em eletrólitos, minerais e vitaminas fortalece a saúde do animal, melhora o equilíbrio iônico no meio aquático e contribui para o crescimento e sobrevivência em sistemas de laboratório e fazenda de camarão.",
      benefits: [
        "Fortalece a saúde geral do camarão",
        "Melhora o equilíbrio iônico no ambiente aquático",
        "Estimula o crescimento e desenvolvimento saudável",
        "Contribui para maior sobrevivência em todas as etapas",
        "Fornece vitaminas essenciais e zinco ativado com função imunoestimulante"
      ],
      presentation: [
        "Recipientes selados a vácuo de 1 kg",
        "Conservar sobre paletes, em local seco, ventilado e protegido da luz solar"
      ],
      specifications: [
        { key: "Vitamina A", value: "mínimo 2.800.000 UI/kg" },
        { key: "Vitamina D3", value: "mínimo 1.000.000 UI/kg" },
        { key: "Vitamina E", value: "mínimo 12.500 UI/kg" },
        { key: "Zinco", value: "mínimo 3.500 UI/kg" },
        { key: "Pré-crescimento", value: "4 – 5 g/kg de ração" },
        { key: "Crescimento", value: "5 – 6 g/kg de ração" }
      ]
    }
  },

  // Saponina - AD009 (PRIORITY PRODUCT - Batch 3)
  "AD009": {
    es: {
      name: "Saponina",
      description: "Producto natural y orgánico utilizado en la acuicultura, especialmente en camaroneras, para eliminar peces no deseados, mejillones, parásitos e insectos nocivos en los estanques. Es seguro para los humanos, no deja residuos, y además promueve el crecimiento y la muda de los camarones.",
      benefits: [
      "Elimina peces, insectos y parásitos no deseados sin dañar al camarón.",
      "Se disuelve rápidamente y no deja residuos.",
      "Estimula la muda (ecdisis) y el crecimiento.",
      "Previene enfermedades como branquias negras.",
      "Puede utilizarse como agente de limpieza del estanque."
    ],
      presentation: [
      "Sacos de 10 kg",
      "Conservar en lugar seco, alejado de la luz y la humedad"
    ],
      specifications: [
      {
        "key": "Apariencia",
        "value": "Polvo amarillo claro"
      },
      {
        "key": "Materia activa",
        "value": "mínimo 75%"
      },
      {
        "key": "Formación de espuma",
        "value": "160 – 190 mm"
      },
      {
        "key": "Solubilidad en agua",
        "value": "Fácil"
      },
      {
        "key": "pH",
        "value": "5.0 – 6.0"
      },
      {
        "key": "Tensión superficial",
        "value": "32.86 mN/m"
      },
      {
        "key": "HLB",
        "value": "10.9 – 16"
      },
      {
        "key": "CMC (Concentración micelar crítica)",
        "value": "0.5%"
      },
      {
        "key": "Piscina seca",
        "value": ""
      },
      {
        "key": "Especificación",
        "value": "Subir el nivel de agua a 30 cm"
      },
      {
        "key": "Especificación",
        "value": "Aplicar 25 kg/ha (previamente diluidos en 20 L de agua por cada 100 g)"
      },
      {
        "key": "Especificación",
        "value": "Reposar de 2 a 3 días, desechar el agua, lavar la piscina y llenar nuevamente"
      },
      {
        "key": "Piscina llena",
        "value": ""
      },
      {
        "key": "Día 1",
        "value": "Aplicar 35 kg/ha diluidos, reducir el nivel del agua en 30%, sellar compuertas, no alimentar"
      },
      {
        "key": "Día 2",
        "value": "Aumentar el nivel al 15% con flujo suave, monitorear oxígeno, no alimentar"
      },
      {
        "key": "Día 3",
        "value": "Recuperar nivel al 100% con flujo normal, alimentar al 50%"
      },
      {
        "key": "Día 4",
        "value": "Flujo y alimentación normal"
      },
      {
        "key": "Advertencia",
        "value": "Considerar que el camarón no esté en proceso de muda antes de aplicar."
      }
    ]
    },
    en: {
      name: "Saponin",
      description: "Natural and organic product used in aquaculture, especially in shrimp farms, to eliminate unwanted fish, mussels, parasites and harmful insects in ponds. It is safe for humans, leaves no residues, and also promotes shrimp growth and molting.",
      benefits: [
        "Eliminates unwanted fish, insects and parasites without harming shrimp",
        "Dissolves quickly and leaves no residues",
        "Stimulates molting (ecdysis) and growth",
        "Prevents diseases such as black gills",
        "Can be used as pond cleaning agent"
      ],
      presentation: [
        "10 kg sacks",
        "Store in dry place, away from light and humidity"
      ],
      specifications: [
        { key: "Appearance", value: "Light yellow powder" },
        { key: "Active matter", value: "minimum 75%" },
        { key: "Foam formation", value: "160 – 190 mm" },
        { key: "pH", value: "5.0 – 6.0" },
        { key: "Dry pond", value: "25 kg/ha diluted in 20 L water" },
        { key: "Full pond", value: "35 kg/ha diluted" }
      ]
    },
    pt: {
      name: "Saponina",
      description: "Produto natural e orgânico utilizado na aquicultura, especialmente em fazendas de camarão, para eliminar peixes indesejados, mexilhões, parasitas e insetos nocivos nos tanques. É seguro para humanos, não deixa resíduos e também promove o crescimento e a muda dos camarões.",
      benefits: [
        "Elimina peixes, insetos e parasitas indesejados sem prejudicar o camarão",
        "Dissolve rapidamente e não deixa resíduos",
        "Estimula a muda (ecdise) e o crescimento",
        "Previne doenças como brânquias negras",
        "Pode ser usado como agente de limpeza do tanque"
      ],
      presentation: [
        "Sacos de 10 kg",
        "Conservar em local seco, longe da luz e umidade"
      ],
      specifications: [
        { key: "Aparência", value: "Pó amarelo claro" },
        { key: "Matéria ativa", value: "mínimo 75%" },
        { key: "Formação de espuma", value: "160 – 190 mm" },
        { key: "pH", value: "5,0 – 6,0" },
        { key: "Tanque seco", value: "25 kg/ha diluídos em 20 L água" },
        { key: "Tanque cheio", value: "35 kg/ha diluídos" }
      ]
    }
  },

  // Vevovitall - AD010 (PRIORITY PRODUCT - Batch 3)
  "AD010": {
    es: {
      name: "Vevovitall",
      description: "Aditivo alimentario en forma de hojuelas blancas compuesto por ácido benzoico, diseñado para mejorar la salud intestinal y la eficiencia alimentaria en peces y camarones. Actúa como conservante, reduciendo la actividad microbiana tanto en el alimento como en el sistema digestivo del animal. Aprobado como fuente segura de ácido benzoico para acuicultura.",
      benefits: [
      "Conserva y estabiliza el alimento balanceado.",
      "Efectivo contra hongos y levaduras.",
      "Mejora la salud intestinal del camarón y del pez.",
      "Reduce trastornos digestivos.",
      "Optimiza el rendimiento alimenticio.",
      "Favorece un ambiente intestinal con microflora equilibrada."
    ],
      presentation: [
      "Fundas de 1 kg",
      "Conservar en lugar fresco, seco y ventilado, por debajo de 25 °C"
    ],
      specifications: [
      {
        "key": "Dosis",
        "value": "0.5 – 5 g/kg de alimento"
      },
      {
        "key": "Uso",
        "value": "Mezclar con el alimento, adicionar pegante y suministrar"
      },
      {
        "key": "Condiciones de almacenamiento",
        "value": ""
      },
      {
        "key": "Vida útil",
        "value": "24 meses desde la fecha de fabricación"
      },
      {
        "key": "Temperatura",
        "value": "Almacenar por debajo de 25°C"
      }
    ]
    },
    en: {
      name: "Vevovitall",
      description: "Feed additive in white flake form composed of benzoic acid, designed to improve intestinal health and feed efficiency in fish and shrimp. Acts as a preservative, reducing microbial activity both in feed and in the animal\\'s digestive system. Approved as a safe source of benzoic acid for aquaculture.",
      benefits: [
        "Preserves and stabilizes balanced feed",
        "Effective against fungi and yeasts",
        "Improves intestinal health of shrimp and fish",
        "Reduces digestive disorders",
        "Optimizes feed performance",
        "Promotes intestinal environment with balanced microflora"
      ],
      presentation: [
        "1 kg bags",
        "Store in cool, dry and ventilated place, below 25°C"
      ],
      specifications: [
        { key: "Dose", value: "0.5 – 5 g/kg of feed" },
        { key: "Shelf life", value: "24 months from manufacturing date" },
        { key: "Storage temperature", value: "Below 25°C" }
      ]
    },
    pt: {
      name: "Vevovitall",
      description: "Aditivo alimentar em forma de flocos brancos composto por ácido benzoico, projetado para melhorar a saúde intestinal e a eficiência alimentar em peixes e camarões. Atua como conservante, reduzindo a atividade microbiana tanto na ração quanto no sistema digestivo do animal. Aprovado como fonte segura de ácido benzoico para aquicultura.",
      benefits: [
        "Conserva e estabiliza a ração balanceada",
        "Eficaz contra fungos e leveduras",
        "Melhora a saúde intestinal do camarão e do peixe",
        "Reduz distúrbios digestivos",
        "Otimiza o desempenho alimentar",
        "Favorece um ambiente intestinal com microflora equilibrada"
      ],
      presentation: [
        "Sacos de 1 kg",
        "Conservar em local fresco, seco e ventilado, abaixo de 25°C"
      ],
      specifications: [
        { key: "Dose", value: "0,5 – 5 g/kg de ração" },
        { key: "Vida útil", value: "24 meses a partir da data de fabricação" },
        { key: "Temperatura de armazenamento", value: "Abaixo de 25°C" }
      ]
    }
  },

  // Vitamina C - AD011 (PRIORITY PRODUCT - Batch 3)
  "AD011": {
    es: {
      name: "Vitamina C",
      description: "Vitamina C (L-Ácido Ascórbico al 99%) utilizada como suplemento nutricional en camarones y peces. Puede aplicarse mezclada con el alimento o directamente en el agua, especialmente para neutralizar residuos de cloro tras la clorinación o para preservar la calidad del agua en sistemas de cultivo larvario.",
      benefits: [
      "Estimula el sistema inmunológico de los camarones.",
      "Neutraliza el cloro residual en el agua.",
      "Contribuye a mantener la calidad del agua.",
      "Mejora la salud general y la resistencia al estrés."
    ],
      presentation: [
      "Envases sellados al vacío de 1 kg",
      "Tambores de 25 kg"
    ],
      specifications: [
      {
        "key": "Camaronera",
        "value": "0.5 – 1 g/kg de alimento"
      },
      {
        "key": "Laboratorio",
        "value": ""
      },
      {
        "key": "Especificación",
        "value": "2 – 6 ppm en agua para neutralizar cloro residual"
      },
      {
        "key": "Especificación",
        "value": "0.5 – 1 ppm en combinación con alimento para estimular el sistema inmunológico"
      },
      {
        "key": "Condiciones de almacenamiento",
        "value": ""
      },
      {
        "key": "Especificación",
        "value": "Almacenar en lugar fresco (24 °C)"
      },
      {
        "key": "Especificación",
        "value": "Proteger de la luz y la humedad"
      }
    ]
    },
    en: {
      name: "Vitamin C",
      description: "Vitamin C (L-Ascorbic Acid 99%) used as nutritional supplement in shrimp and fish. Can be applied mixed with feed or directly in water, especially to neutralize chlorine residues after chlorination or to preserve water quality in larval culture systems.",
      benefits: [
        "Stimulates shrimp immune system",
        "Neutralizes residual chlorine in water",
        "Contributes to maintaining water quality",
        "Improves general health and stress resistance"
      ],
      presentation: [
        "1 kg vacuum-sealed containers",
        "25 kg drums"
      ],
      specifications: [
        { key: "Purity", value: "L-Ascorbic Acid 99%" },
        { key: "Shrimp farm", value: "0.5 – 1 g/kg of feed" },
        { key: "Laboratory", value: "2 – 6 ppm in water to neutralize chlorine" },
        { key: "Immunological", value: "0.5 – 1 ppm combined with feed" },
        { key: "Storage", value: "24°C, protect from light and humidity" }
      ]
    },
    pt: {
      name: "Vitamina C",
      description: "Vitamina C (Ácido L-Ascórbico 99%) utilizada como suplemento nutricional em camarões e peixes. Pode ser aplicada misturada com a ração ou diretamente na água, especialmente para neutralizar resíduos de cloro após a cloração ou para preservar a qualidade da água em sistemas de cultivo larval.",
      benefits: [
        "Estimula o sistema imunológico dos camarões",
        "Neutraliza o cloro residual na água",
        "Contribui para manter a qualidade da água",
        "Melhora a saúde geral e a resistência ao estresse"
      ],
      presentation: [
        "Recipientes selados a vácuo de 1 kg",
        "Tambores de 25 kg"
      ],
      specifications: [
        { key: "Pureza", value: "Ácido L-Ascórbico 99%" },
        { key: "Fazenda de camarão", value: "0,5 – 1 g/kg de ração" },
        { key: "Laboratório", value: "2 – 6 ppm na água para neutralizar cloro" },
        { key: "Imunológico", value: "0,5 – 1 ppm em combinação com ração" },
        { key: "Armazenamento", value: "24°C, proteger da luz e umidade" }
      ]
    }
  },

  // Vitamina C Monofosfatada - AD012 (PRIORITY PRODUCT - Batch 3)
  "AD012": {
    es: {
      name: "Vitamina C Monofosfatada",
      description: "Vitamina C estabilizada (L-Ácido Ascórbico al 35%) en forma monofosfatada, diseñada para resistir altas temperaturas y proteger su actividad biológica durante el procesamiento del alimento. Recomendado para formulaciones extruidas o peletizadas gracias a su alta estabilidad y biodisponibilidad.",
      benefits: [
      "Alta estabilidad térmica para procesos de granulación y extrusión.",
      "Alta biodisponibilidad.",
      "Proporciona protección molecular del ácido ascórbico.",
      "Ideal para alimentos balanceados de alta temperatura."
    ],
      presentation: [
      "Envases sellados al vacío de 1 kg",
      "Cartones de 25 kg"
    ],
      specifications: [
      {
        "key": "Apariencia",
        "value": "Polvo blanco o amarillo"
      },
      {
        "key": "Fórmula molecular",
        "value": "C₆H₈O₉P"
      },
      {
        "key": "Peso molecular",
        "value": "256.11"
      },
      {
        "key": "Contenido de vitamina C",
        "value": "35%"
      },
      {
        "key": "pH",
        "value": "7.0 – 9.5"
      },
      {
        "key": "Pérdida al secar",
        "value": "< 6.0 %"
      },
      {
        "key": "Condiciones de almacenamiento",
        "value": ""
      },
      {
        "key": "Especificación",
        "value": "Mantener en lugar fresco (24 °C)"
      },
      {
        "key": "Especificación",
        "value": "Proteger de la luz y la humedad"
      }
    ]
    },
    en: {
      name: "Monophosphated Vitamin C",
      description: "Stabilized Vitamin C (L-Ascorbic Acid 35%) in monophosphated form, designed to resist high temperatures and protect its biological activity during feed processing. Recommended for extruded or pelleted formulations thanks to its high stability and bioavailability.",
      benefits: [
        "High thermal stability for granulation and extrusion processes",
        "High bioavailability",
        "Provides molecular protection of ascorbic acid",
        "Ideal for high-temperature balanced feeds"
      ],
      presentation: [
        "1 kg vacuum-sealed containers",
        "25 kg cartons"
      ],
      specifications: [
        { key: "Appearance", value: "White or yellow powder" },
        { key: "Molecular formula", value: "C₆H₈O₉P" },
        { key: "Molecular weight", value: "256.11" },
        { key: "Vitamin C content", value: "35%" },
        { key: "pH", value: "7.0 – 9.5" },
        { key: "Loss on drying", value: "< 6.0%" }
      ]
    },
    pt: {
      name: "Vitamina C Monofosfatada",
      description: "Vitamina C estabilizada (Ácido L-Ascórbico 35%) em forma monofosfatada, projetada para resistir a altas temperaturas e proteger sua atividade biológica durante o processamento da ração. Recomendada para formulações extrusadas ou peletizadas graças à sua alta estabilidade e biodisponibilidade.",
      benefits: [
        "Alta estabilidade térmica para processos de granulação e extrusão",
        "Alta biodisponibilidade",
        "Fornece proteção molecular do ácido ascórbico",
        "Ideal para rações balanceadas de alta temperatura"
      ],
      presentation: [
        "Recipientes selados a vácuo de 1 kg",
        "Caixas de 25 kg"
      ],
      specifications: [
        { key: "Aparência", value: "Pó branco ou amarelo" },
        { key: "Fórmula molecular", value: "C₆H₈O₉P" },
        { key: "Peso molecular", value: "256,11" },
        { key: "Conteúdo de vitamina C", value: "35%" },
        { key: "pH", value: "7,0 – 9,5" },
        { key: "Perda na secagem", value: "< 6,0%" }
      ]
    }
  },

  // Artemia Adulta Congelada - AL002 (FEED PRODUCT - Batch 4)
  "AL002": {
    es: {
      name: "Artemia Adulta Congelada",
      description: "La biomasa de artemia adulta enriquecida y congelada (Artemia Frozen), está lista para ser utilizada en los laboratorios de producción de nauplios y postlarvas de camarón.\n\nContiene 100% artemia adulta, cosechada en el Lago Mono, en el norte de California, enriquecida con emulsiones formuladas con ingredientes marinos de alta calidad que aseguran la disponibilidad apropiada de micronutrientes esenciales tales como aminoácidos esenciales, HUFAS (ácidos grasos altamente insaturados y de cadena larga), vitaminas, minerales y pigmentos carotenoides requeridos para el desarrollo de reproductores de camarón.\n\nEl producto es congelado logrando así el propósito de hacer que en el menor tiempo se conserven intactas las propiedades y beneficios nutricionales de la artemia adulta enriquecida.",
      benefits: [
      "Teniendo muy seriamente en cuenta que la bioseguridad es un factor vital en la industria acuícola, certificamos que la artemia congelada esta libre de patógenos virales específicos tales como: WSSV (White Spot Syndrome Virus), IHHNV (Infectious Hypodermal and Haemotopoietic Necrosis Virus), TSV (Taura Syndrome Virus), YHV (Yellow Head Virus)."
    ],
      presentation: [
      "PRESENTACIÓN Y ALMACENAMIENTO",
      "Fundas de 1 kg. Almacenar a -18°C. Este producto debe de ser protegido de humedad, contaminación y luz del sol. Seguro para el uso indicado, mantener fuera del alcance de los niños.",
      "APLICACIÓN",
      "Para maduración en etapa de reproducción se puede sugerir en el rango del 3 - 8 % de la biomasa de camarón P. Vannamei en el tanque; el porcentaje total que se utilice puede ser dividido en dos dosis en el día.",
      "Se recomienda ajustar diariamente los porcentajes de alimentos a la saciedad de sus reproductores.",
      "En el área de larvicultura, la utilización de artemia enriquecida se complementa muy bien a los regímenes dietéticos conocidos desde los estadíos postlarvales (PL4- PL5 en adelante)."
    ],
      specifications: [
      {
        "key": "Especificación",
        "value": "Biomasa de Artemia enriquecida con vitaminas."
      },
      {
        "key": "Especificación",
        "value": "Proteína.\t58% Lípidos.\t13%"
      },
      {
        "key": "Especificación",
        "value": "Ácidos grasos.\t15.3 mg/g"
      },
      {
        "key": "Especificación",
        "value": "Vitamina C.\t1000 ppm"
      },
      {
        "key": "Especificación",
        "value": "Vitamina A.\t10000 IU/Kg"
      },
      {
        "key": "Especificación",
        "value": "Vitamina E.\t300 ppm"
      },
      {
        "key": "Especificación",
        "value": "Vitamina D3.\t3000 IU/Kg"
      },
      {
        "key": "Especificación",
        "value": "Astaxantina.\t250 ppm"
      },
      {
        "key": "Especificación",
        "value": "N-3 HUFA’s.\t200 mg/g"
      },
      {
        "key": "Especificación",
        "value": "28\tDHA.\t2.74 mg/g"
      }
    ]
    },
    en: {
      name: "Frozen Adult Artemia",
      description: "Enriched and frozen adult artemia biomass (Artemia Frozen), ready to be used in shrimp nauplii and postlarvae production laboratories. Contains 100% adult artemia, harvested from Mono Lake in Northern California, enriched with emulsions formulated with high-quality marine ingredients that ensure proper availability of essential micronutrients such as essential amino acids, HUFAS (highly unsaturated and long-chain fatty acids), vitamins, minerals and carotenoid pigments required for shrimp broodstock development.",
      benefits: [
        "Free of specific viral pathogens: WSSV, IHHNV, TSV, YHV",
        "Enriched with vitamins A, C, D3 and E",
        "High HUFA\\'s and DHA content for reproductive development",
        "100% adult artemia biomass from Mono Lake, California",
        "Preserves intact nutritional properties through rapid freezing"
      ],
      presentation: [
        "1 kg bags",
        "Store at -18°C",
        "Protect from humidity, contamination and sunlight",
        "Keep out of reach of children"
      ],
      specifications: [
        { key: "Protein", value: "58%" },
        { key: "Lipids", value: "13%" },
        { key: "Vitamin C", value: "1000 ppm" },
        { key: "Vitamin A", value: "10000 IU/Kg" },
        { key: "Astaxanthin", value: "250 ppm" },
        { key: "DHA", value: "2.74 mg/g" },
        { key: "Reproduction", value: "3-8% shrimp biomass/day" },
        { key: "Larviculture", value: "PL4-PL5 onwards" }
      ]
    },
    pt: {
      name: "Artêmia Adulta Congelada",
      description: "A biomassa de artêmia adulta enriquecida e congelada (Artemia Frozen), está pronta para ser utilizada nos laboratórios de produção de náuplios e pós-larvas de camarão. Contém 100% artêmia adulta, colhida no Lago Mono, no norte da Califórnia, enriquecida com emulsões formuladas com ingredientes marinhos de alta qualidade que asseguram a disponibilidade apropriada de micronutrientes essenciais tais como aminoácidos essenciais, HUFAS (ácidos graxos altamente insaturados e de cadeia longa), vitaminas, minerais e pigmentos carotenoides necessários para o desenvolvimento de reprodutores de camarão.",
      benefits: [
        "Livre de patógenos virais específicos: WSSV, IHHNV, TSV, YHV",
        "Enriquecida com vitaminas A, C, D3 e E",
        "Alto conteúdo de HUFA\\'s e DHA para desenvolvimento reprodutivo",
        "Biomassa 100% artêmia adulta do Lago Mono, Califórnia",
        "Conserva propriedades nutricionais intactas mediante congelamento rápido"
      ],
      presentation: [
        "Sacos de 1 kg",
        "Armazenar a -18°C",
        "Proteger da umidade, contaminação e luz solar",
        "Manter fora do alcance das crianças"
      ],
      specifications: [
        { key: "Proteína", value: "58%" },
        { key: "Lipídios", value: "13%" },
        { key: "Vitamina C", value: "1000 ppm" },
        { key: "Vitamina A", value: "10000 IU/Kg" },
        { key: "Astaxantina", value: "250 ppm" },
        { key: "DHA", value: "2,74 mg/g" },
        { key: "Reprodução", value: "3-8% biomassa camarão/dia" },
        { key: "Larvicultura", value: "PL4-PL5 em diante" }
      ]
    }
  },

  // Brine Shrimp Flake - AL003 (FEED PRODUCT - Batch 4)
  "AL003": {
    es: {
      name: "Brine Shrimp Flake",
      description: "Dieta en hojuelas desarrollada en EE. UU., diseñada para complementar alimentos naturales y otras dietas larvales. Elaborada con ingredientes naturales de alta calidad, incluyendo un elevado contenido de Artemia. Enriquecida con vitaminas, minerales y aminoácidos esenciales para lograr alta supervivencia y crecimiento acelerado en larvas de camarón.",
      benefits: [
      "Alta atractabilidad y óptima digestibilidad",
      "Favorece una muda saludable y mejora la supervivencia",
      "Enriquecido con Vpak (Vitality Pak) para reforzar la resistencia a enfermedades",
      "Promueve el rápido crecimiento y desarrollo en etapas de Mysis a Postlarval (PL)",
      "Mejora la coloración del tracto digestivo en Penaeus vannamei",
      "Contiene Artemia y calamar de calidad superior",
      "Incluye minerales traza proteinados y conservantes para mayor estabilidad y vida útil"
    ],
      presentation: [
      "Baldes de 10 kg",
      "Mantiene su valor nutritivo hasta por 1 año desde su fabricación",
      "Almacenar en lugar fresco (22 °C), seco, ventilado y protegido de la luz solar",
      "No requiere refrigeración ni condiciones especiales de transporte"
    ],
      specifications: [
      {
        "key": "Proteína cruda",
        "value": "mínimo 50.0%"
      },
      {
        "key": "Grasa cruda",
        "value": "mínimo 13.0%"
      },
      {
        "key": "Fibra cruda",
        "value": "máximo 3.0%"
      },
      {
        "key": "Humedad",
        "value": "máximo 10.0%"
      },
      {
        "key": "Ceniza",
        "value": "máximo 10.0%"
      },
      {
        "key": "Fósforo",
        "value": "mínimo 1.1%"
      },
      {
        "key": "Especificación",
        "value": "Proteínas animales marinas"
      },
      {
        "key": "Especificación",
        "value": "Proteínas vegetales"
      },
      {
        "key": "Especificación",
        "value": "Levaduras"
      },
      {
        "key": "Especificación",
        "value": "Aceites vegetales y de pescado"
      },
      {
        "key": "Especificación",
        "value": "Almidones vegetales"
      },
      {
        "key": "Especificación",
        "value": "Premezclas de vitaminas y minerales"
      },
      {
        "key": "Especificación",
        "value": "Antioxidantes"
      },
      {
        "key": "Especificación",
        "value": "Pigmentos"
      },
      {
        "key": "Especificación",
        "value": "Aglutinantes biodegradables"
      }
    ]
    },
    en: {
      name: "Brine Shrimp Flake",
      description: "Flake diet developed in the USA, designed to complement natural foods and other larval diets. Made with high-quality natural ingredients, including high Artemia content. Enriched with vitamins, minerals and essential amino acids to achieve high survival and accelerated growth in shrimp larvae.",
      benefits: [
        "High attractability and optimal digestibility",
        "Promotes healthy molting and improves survival",
        "Enriched with Vpak (Vitality Pak) to strengthen disease resistance",
        "Promotes rapid growth and development from Mysis to Postlarval (PL) stages",
        "Improves digestive tract coloration in Penaeus vannamei",
        "Contains superior quality Artemia and squid",
        "Includes chelated trace minerals and preservatives for greater stability and shelf life"
      ],
      presentation: [
        "10 kg buckets",
        "Maintains nutritional value for up to 1 year from manufacture",
        "Store in cool place (22°C), dry, ventilated and protected from sunlight",
        "No refrigeration or special transport conditions required"
      ],
      specifications: [
        { key: "Crude protein", value: "minimum 50.0%" },
        { key: "Crude fat", value: "minimum 13.0%" },
        { key: "Crude fiber", value: "maximum 3.0%" },
        { key: "Moisture", value: "maximum 10.0%" },
        { key: "Ash", value: "maximum 10.0%" },
        { key: "Phosphorus", value: "minimum 1.1%" }
      ]
    },
    pt: {
      name: "Brine Shrimp Flake",
      description: "Dieta em flocos desenvolvida nos EUA, projetada para complementar alimentos naturais e outras dietas larvais. Elaborada com ingredientes naturais de alta qualidade, incluindo alto conteúdo de Artêmia. Enriquecida com vitaminas, minerais e aminoácidos essenciais para alcançar alta sobrevivência e crescimento acelerado em larvas de camarão.",
      benefits: [
        "Alta atratividade e digestibilidade ótima",
        "Favorece uma muda saudável e melhora a sobrevivência",
        "Enriquecido com Vpak (Vitality Pak) para reforçar a resistência a doenças",
        "Promove o crescimento rápido e desenvolvimento de estágios Mysis a Pós-larval (PL)",
        "Melhora a coloração do trato digestivo em Penaeus vannamei",
        "Contém Artêmia e lula de qualidade superior",
        "Inclui minerais traço quelados e conservantes para maior estabilidade e vida útil"
      ],
      presentation: [
        "Baldes de 10 kg",
        "Mantém seu valor nutritivo por até 1 ano desde a fabricação",
        "Armazenar em local fresco (22°C), seco, ventilado e protegido da luz solar",
        "Não requer refrigeração nem condições especiais de transporte"
      ],
      specifications: [
        { key: "Proteína bruta", value: "mínimo 50,0%" },
        { key: "Gordura bruta", value: "mínimo 13,0%" },
        { key: "Fibra bruta", value: "máximo 3,0%" },
        { key: "Umidade", value: "máximo 10,0%" },
        { key: "Cinza", value: "máximo 10,0%" },
        { key: "Fósforo", value: "mínimo 1,1%" }
      ]
    }
  },

  // Calamares - AL004 (FEED PRODUCT - Batch 4)
  "AL004": {
    es: {
      name: "Calamares",
      description: "La alimentación es de fundamental importancia en el proceso de maduración y reproducción.\n\nDentro de los compuestos fundamentales en la dieta se encuentran los ácidos grasos de la serie linolénica (W3, de origen marino), colesterol y sus derivados aportados por la dieta del calamar. Nuestro calamar (Loligo opalescens) proviene del mar de California, EEUU, es capturado y enfriado por aire sin aditivos ni preservantes. Libres de WSSV, TSV, NHP, IHHNV, Vibrios,",
      benefits: [
      "Por ser un producto de alta calidad puede ser usado como carnada para la actividad de pesca deportiva e industrial. En ciertos casos se utilizan algunos de estos alimentos naturales suplementados con dietas peletizadas como EZ mate y Redimate."
    ],
      presentation: [
      "PRESENTACIÓN Y ALMACENAMIENTO",
      "Bloques congelados de 10kg.",
      "Debe almacenarse bajo condiciones de congelamiento a -18°C. Este producto debe de ser protegido de humedad, contaminación y luz del sol.",
      "APLICACIÓN",
      "La alimentación se realizará sin restricciones, que podrá consistir en una dieta natural combinada de krill, calamar, artemia congelada y mejillón. El calamar se sugiere suministrar diariamente en cantidades que van de 17 a 20% de la biomasa del tanque, repartida en 2 a 4 raciones diarias."
    ],
      specifications: [
      {
        "key": "Especificación",
        "value": "Proteína.        16% Humedad        80%"
      },
      {
        "key": "Especificación",
        "value": "Grasa.        1.2 gramos"
      },
      {
        "key": "Especificación",
        "value": "Carbohidratos.        4 gramos"
      },
      {
        "key": "Especificación",
        "value": "Sodio.        298 mg"
      },
      {
        "key": "Especificación",
        "value": "Calorías.        140"
      },
      {
        "key": "Especificación",
        "value": "Grasa corporal 7mm- w3 PERFIL DE ÁCIDOS GRASOS Monoinsaturados.        5.4%"
      },
      {
        "key": "Especificación",
        "value": "Poliinsaturados.        59.50%"
      }
    ]
    },
    en: {
      name: "Squid",
      description: "Feeding is of fundamental importance in the maturation and reproduction process. Among the fundamental compounds in the diet are linolenic acid series fatty acids (W3, of marine origin), cholesterol and its derivatives provided by the squid diet. Our squid (Loligo opalescens) comes from the California sea, USA, is caught and air-cooled without additives or preservatives. Free from WSSV, TSV, NHP, IHHNV, Vibrios.",
      benefits: [
        "Being a high-quality product, it can be used as bait for sport and industrial fishing activities",
        "In certain cases, some of these natural foods are used supplemented with pelleted diets such as EZ mate and Redimate",
        "Free from pathogens: WSSV, TSV, NHP, IHHNV, Vibrios",
        "Caught and processed without additives or preservatives"
      ],
      presentation: [
        "10kg frozen blocks",
        "Must be stored under freezing conditions at -18°C",
        "Protect from humidity, contamination and sunlight"
      ],
      specifications: [
        { key: "Protein", value: "16%" },
        { key: "Moisture", value: "80%" },
        { key: "Fat", value: "1.2 grams" },
        { key: "Carbohydrates", value: "4 grams" },
        { key: "Sodium", value: "298 mg" },
        { key: "Calories", value: "140" },
        { key: "Monounsaturated", value: "5.4%" },
        { key: "Polyunsaturated", value: "59.50%" },
        { key: "Daily dose", value: "17-20% tank biomass" }
      ]
    },
    pt: {
      name: "Lulas",
      description: "A alimentação é de fundamental importância no processo de maturação e reprodução. Entre os compostos fundamentais na dieta encontram-se os ácidos graxos da série linolênica (W3, de origem marinha), colesterol e seus derivados fornecidos pela dieta da lula. Nossa lula (Loligo opalescens) provém do mar da Califórnia, EUA, é capturada e resfriada ao ar sem aditivos nem conservantes. Livres de WSSV, TSV, NHP, IHHNV, Vibrios.",
      benefits: [
        "Por ser um produto de alta qualidade pode ser usado como isca para a atividade de pesca esportiva e industrial",
        "Em certos casos utilizam-se alguns destes alimentos naturais suplementados com dietas peletizadas como EZ mate e Redimate",
        "Livre de patógenos: WSSV, TSV, NHP, IHHNV, Vibrios",
        "Capturada e processada sem aditivos nem conservantes"
      ],
      presentation: [
        "Blocos congelados de 10kg",
        "Deve armazenar-se sob condições de congelamento a -18°C",
        "Proteger da umidade, contaminação e luz do sol"
      ],
      specifications: [
        { key: "Proteína", value: "16%" },
        { key: "Umidade", value: "80%" },
        { key: "Gordura", value: "1,2 gramas" },
        { key: "Carboidratos", value: "4 gramas" },
        { key: "Sódio", value: "298 mg" },
        { key: "Calorias", value: "140" },
        { key: "Monoinsaturados", value: "5,4%" },
        { key: "Poliinsaturados", value: "59,50%" },
        { key: "Dose diária", value: "17-20% biomassa tanque" }
      ]
    }
  },

  // Cistos de Artemia - AL005 (FEED PRODUCT - Batch 4)
  "AL005": {
    es: {
      name: "Cistos de Artemia",
      description: "Quistes de Artemia franciscana cosechados en el Gran Lago Salado de Utah, EE.UU., con altos estándares de calidad y tecnología de procesamiento. Pueden usarse hidratados o decapsulados, según necesidad.",
      benefits: [
      "Producto bioseguro, de alto valor nutricional, ideal para alimentación larvaria por su pequeño tamaño de nauplio, excelente digestibilidad y fácil manipulación."
    ],
      presentation: [
      "Latas selladas al vacío de 454g",
      "Baldes sellados al vacío de 7kg",
      "Almacenar en un lugar fresco, seco, bien ventilado y alejado de la luz solar. No requiere refrigeración mientras esté sellado."
    ],
      specifications: [
      {
        "key": "Proteína Cruda",
        "value": "54% mín."
      },
      {
        "key": "Grasa Cruda",
        "value": "14.2% mín."
      },
      {
        "key": "Fibra Cruda",
        "value": "27.3% máx."
      },
      {
        "key": "Humedad",
        "value": "3.6% máx."
      },
      {
        "key": "Especificación",
        "value": "Utilizar según requerimientos del laboratorio, como alimento vivo luego de su eclosión. Puede aplicarse como quiste hidratado o decapsulado, según conveniencia y etapa larvaria."
      }
    ]
    },
    en: {
      name: "Artemia Cysts",
      description: "Artemia franciscana cysts harvested from the Great Salt Lake of Utah, USA, with high quality standards and processing technology. Can be used hydrated or decapsulated, as needed.",
      benefits: [
        "Biosafe product with high nutritional value",
        "Ideal for larval feeding due to its small nauplius size",
        "Excellent digestibility and easy handling"
      ],
      presentation: [
        "454g vacuum-sealed cans",
        "7kg vacuum-sealed buckets",
        "Store in cool, dry, well-ventilated place away from sunlight",
        "No refrigeration required while sealed"
      ],
      specifications: [
        { key: "Crude Protein", value: "54% min." },
        { key: "Crude Fat", value: "14.2% min." },
        { key: "Crude Fiber", value: "27.3% max." },
        { key: "Moisture", value: "3.6% max." }
      ]
    },
    pt: {
      name: "Cistos de Artêmia",
      description: "Cistos de Artemia franciscana colhidos no Grande Lago Salgado de Utah, EUA, com altos padrões de qualidade e tecnologia de processamento. Podem ser usados hidratados ou descapsulados, conforme necessidade.",
      benefits: [
        "Produto bioseguro, de alto valor nutricional",
        "Ideal para alimentação larval por seu pequeno tamanho de náuplio",
        "Excelente digestibilidade e fácil manipulação"
      ],
      presentation: [
        "Latas seladas a vácuo de 454g",
        "Baldes selados a vácuo de 7kg",
        "Armazenar em local fresco, seco, bem ventilado e longe da luz solar",
        "Não requer refrigeração enquanto estiver selado"
      ],
      specifications: [
        { key: "Proteína Bruta", value: "54% mín." },
        { key: "Gordura Bruta", value: "14,2% mín." },
        { key: "Fibra Bruta", value: "27,3% máx." },
        { key: "Umidade", value: "3,6% máx." }
      ]
    }
  },

  // Espirulina - AL006 (FEED PRODUCT - Batch 4)
  "AL006": {
    es: {
      name: "Espirulina",
      description: "La Espirulina Mackay Marine es una microalga azul verdosa comestible (Arthrospira platensis), cultivada y procesada en EE.UU. Se presenta en forma de polvo fino con un alto contenido nutricional. Ideal como ración o aditivo para el cultivo de larvas de camarón, larvas de peces y artemia.",
      benefits: [
      "Aumenta la fertilidad y la reproducción en cultivos acuáticos",
      "Mejora el crecimiento y peso de larvas de camarón, peces y artemia",
      "Estimula el apetito",
      "Mejora la coloración natural de diversas especies acuáticas",
      "Fuente natural de proteínas, vitaminas y pigmentos bioactivos"
    ],
      presentation: [
      "Presentaciones:",
      "Spirulina Microfina: Lata de 500 g (sellada al vacío)",
      "Spirulina Regular: Funda de 1 kg",
      "Condiciones de almacenamiento:",
      "Guardar en lugar fresco y seco",
      "No exceder los 70°F (21°C)"
    ],
      specifications: [
      {
        "key": "Proteína cruda (mínima)",
        "value": "60–70%"
      },
      {
        "key": "Carbohidratos (mínima)",
        "value": "15–20%"
      },
      {
        "key": "Grasa cruda (máxima)",
        "value": "6–8%"
      },
      {
        "key": "Fibra cruda (máxima)",
        "value": "8–10%"
      },
      {
        "key": "Minerales (máxima)",
        "value": "7–10%"
      },
      {
        "key": "Humedad (máxima)",
        "value": "3–7%"
      },
      {
        "key": "Ácidos grasos",
        "value": ""
      },
      {
        "key": "Ácido linoleico",
        "value": "10 mg"
      },
      {
        "key": "Ácido gamma-linolénico (GLA)",
        "value": "20 mg"
      },
      {
        "key": "Pigmentos (por 100g)",
        "value": ""
      },
      {
        "key": "Ficocianina (azul)",
        "value": "150 mg"
      },
      {
        "key": "Clorofila (verde)",
        "value": "11 mg"
      },
      {
        "key": "Carotenoides",
        "value": "3.5 mg"
      },
      {
        "key": "Características físicas",
        "value": ""
      },
      {
        "key": "Especificación",
        "value": "Polvo fino color azul verdoso oscuro"
      },
      {
        "key": "Especificación",
        "value": "Compuesto 100% de Espirulina"
      },
      {
        "key": "Densidad",
        "value": "0.45–0.60 (en agua)"
      },
      {
        "key": "Ingrediente activo",
        "value": ""
      },
      {
        "key": "Especificación",
        "value": "Arthrospira platensis"
      }
    ]
    },
    en: {
      name: "Spirulina",
      description: "Mackay Marine Spirulina is an edible blue-green microalgae (Arthrospira platensis), cultivated and processed in the USA. It comes in fine powder form with high nutritional content. Ideal as feed or additive for shrimp larvae, fish larvae and artemia culture.",
      benefits: [
        "Increases fertility and reproduction in aquatic cultures",
        "Improves growth and weight of shrimp larvae, fish and artemia",
        "Stimulates appetite",
        "Improves natural coloration of various aquatic species",
        "Natural source of proteins, vitamins and bioactive pigments"
      ],
      presentation: [
        "Microfine Spirulina: 500g can (vacuum sealed)",
        "Regular Spirulina: 1kg bag",
        "Store in cool and dry place",
        "Do not exceed 70°F (21°C)"
      ],
      specifications: [
        { key: "Crude protein", value: "60–70%" },
        { key: "Carbohydrates", value: "15–20%" },
        { key: "Crude fat", value: "6–8%" },
        { key: "Crude fiber", value: "8–10%" },
        { key: "Minerals", value: "7–10%" },
        { key: "Moisture", value: "3–7%" },
        { key: "Phycocyanin", value: "150 mg/100g" },
        { key: "Chlorophyll", value: "11 mg/100g" },
        { key: "Carotenoids", value: "3.5 mg/100g" }
      ]
    },
    pt: {
      name: "Espirulina",
      description: "A Espirulina Mackay Marine é uma microalga azul-esverdeada comestível (Arthrospira platensis), cultivada e processada nos EUA. Apresenta-se em forma de pó fino com alto conteúdo nutricional. Ideal como ração ou aditivo para o cultivo de larvas de camarão, larvas de peixes e artêmia.",
      benefits: [
        "Aumenta a fertilidade e a reprodução em cultivos aquáticos",
        "Melhora o crescimento e peso de larvas de camarão, peixes e artêmia",
        "Estimula o apetite",
        "Melhora a coloração natural de diversas espécies aquáticas",
        "Fonte natural de proteínas, vitaminas e pigmentos bioativos"
      ],
      presentation: [
        "Spirulina Microfina: Lata de 500g (selada a vácuo)",
        "Spirulina Regular: Saco de 1kg",
        "Guardar em local fresco e seco",
        "Não exceder os 70°F (21°C)"
      ],
      specifications: [
        { key: "Proteína bruta", value: "60–70%" },
        { key: "Carboidratos", value: "15–20%" },
        { key: "Gordura bruta", value: "6–8%" },
        { key: "Fibra bruta", value: "8–10%" },
        { key: "Minerais", value: "7–10%" },
        { key: "Umidade", value: "3–7%" },
        { key: "Ficocianina", value: "150 mg/100g" },
        { key: "Clorofila", value: "11 mg/100g" },
        { key: "Carotenoides", value: "3,5 mg/100g" }
      ]
    }
  },

  // EZ Artemia (Microencapsulados) - AL007
  "AL007": {
    es: {
      name: "EZ Artemia (Microencapsulados)",
      description: "Dieta líquida microencapsulada formulada por Zeigler Bros. Inc. (EE. UU.) como un sustituto balanceado y bioseguro de los nauplios de Artemia. Diseñada para proporcionar valor nutricional, sabor, textura y pigmentación similares a la Artemia viva, asegurando una alta digestibilidad, crecimiento acelerado y bioseguridad en el cultivo de larvas de camarón.",
      benefits: [
      "Sustituye eficazmente a los nauplios de Artemia",
      "Producto líquido, microencapsulado, altamente energético y balanceado",
      "Mejora la digestibilidad gracias a enzimas y extracto de artemia",
      "Libre de bacterias y virus",
      "Estimula el crecimiento y la resistencia al Vibrio y otras enfermedades",
      "No contamina el agua",
      "Puede refrigerarse (no congelar)"
    ],
      presentation: [
      "Envases de 2 kg",
      "Almacenar en lugar fresco, seco y ventilado",
      "No exponer a la luz solar ni a fuentes de calor",
      "No requiere refrigeración si está en su envase sellado",
      "Agitar antes de usar"
    ],
      specifications: [
      {
        "key": "Proteína cruda",
        "value": "mínimo 52%"
      },
      {
        "key": "Grasa cruda",
        "value": "mínimo 17%"
      },
      {
        "key": "Fibra cruda",
        "value": "máximo 3.7%"
      },
      {
        "key": "Humedad",
        "value": "0%"
      },
      {
        "key": "Fósforo",
        "value": "máximo 0.6%"
      },
      {
        "key": "Proteína cruda",
        "value": "mínimo 14%"
      },
      {
        "key": "Grasa cruda",
        "value": "mínimo 4.5%"
      },
      {
        "key": "Fibra cruda",
        "value": "máximo 1%"
      },
      {
        "key": "Humedad",
        "value": "máximo 73%"
      },
      {
        "key": "Fósforo",
        "value": "máximo 0.1%"
      },
      {
        "key": "Especificación",
        "value": "Proteínas marinas y vegetales"
      },
      {
        "key": "Especificación",
        "value": "Subproductos de granos procesados"
      },
      {
        "key": "Especificación",
        "value": "Lecitina"
      },
      {
        "key": "Especificación",
        "value": "Minerales y vitaminas"
      },
      {
        "key": "Especificación",
        "value": "Conservantes, probióticos y levaduras"
      },
      {
        "key": "Especificación",
        "value": "Estabilizantes y pigmentos"
      }
    ]
    },
    en: {
      name: "EZ Artemia (Microencapsulated)",
      description: "Microencapsulated liquid diet formulated by Zeigler Bros. Inc. (USA) as a balanced and biosecure substitute for Artemia nauplii. Designed to provide nutritional value, flavor, texture and pigmentation similar to live Artemia, ensuring high digestibility, accelerated growth and biosecurity in shrimp larvae culture.",
      benefits: [
        "Effectively replaces Artemia nauplii",
        "Liquid, microencapsulated, highly energetic and balanced product",
        "Improves digestibility thanks to enzymes and artemia extract",
        "Free of bacteria and viruses",
        "Stimulates growth and resistance to Vibrio and other diseases",
        "Does not contaminate water",
        "Can be refrigerated (do not freeze)"
      ],
      presentation: [
        "2 kg containers",
        "Store in cool, dry and ventilated place",
        "Do not expose to sunlight or heat sources",
        "Does not require refrigeration if in sealed container",
        "Shake before use"
      ],
      specifications: [
        { key: "Crude protein (dry weight)", value: "52% min." },
        { key: "Crude fat (dry weight)", value: "17% min." },
        { key: "Crude protein (liquid weight)", value: "14% min." },
        { key: "Crude fat (liquid weight)", value: "4.5% min." },
        { key: "Moisture", value: "73% max." }
      ]
    },
    pt: {
      name: "EZ Artemia (Microencapsulado)",
      description: "Dieta líquida microencapsulada formulada pela Zeigler Bros. Inc. (EUA) como substituto balanceado e biosseguro dos náuplios de Artemia. Projetada para fornecer valor nutricional, sabor, textura e pigmentação similares à Artemia viva, garantindo alta digestibilidade, crescimento acelerado e biossegurança no cultivo de larvas de camarão.",
      benefits: [
        "Substitui eficazmente os náuplios de Artemia",
        "Produto líquido, microencapsulado, altamente energético e balanceado",
        "Melhora a digestibilidade graças a enzimas e extrato de artemia",
        "Livre de bactérias e vírus",
        "Estimula o crescimento e a resistência ao Vibrio e outras doenças",
        "Não contamina a água",
        "Pode ser refrigerado (não congelar)"
      ],
      presentation: [
        "Recipientes de 2 kg",
        "Armazenar em local fresco, seco e ventilado",
        "Não expor à luz solar nem a fontes de calor",
        "Não requer refrigeração se estiver em recipiente selado",
        "Agitar antes de usar"
      ],
      specifications: [
        { key: "Proteína bruta (peso seco)", value: "52% mín." },
        { key: "Gordura bruta (peso seco)", value: "17% mín." },
        { key: "Proteína bruta (peso líquido)", value: "14% mín." },
        { key: "Gordura bruta (peso líquido)", value: "4,5% mín." },
        { key: "Umidade", value: "73% máx." }
      ]
    }
  },

  // EZ Artemia Ultra (Microencapsulados) - AL008
  "AL008": {
    es: {
      name: "EZ Artemia Ultra (Microencapsulados)",
      description: "Dieta líquida microencapsulada de nueva generación, formulada en EE. UU. para superar el perfil nutricional de la Artemia enriquecida. EZ Artemia Ultra ofrece una composición de nutrientes estable, biosegura y libre de patógenos, lo que la convierte en una alternativa confiable frente a la variabilidad de la Artemia tradicional. Su diseño garantiza alta digestibilidad, mejor salud intestinal y un óptimo rendimiento larvario.",
      benefits: [
      "Mayor densidad y digestibilidad de nutrientes",
      "Microencapsulación mejorada para mayor estabilidad en la columna de agua",
      "Formulación precisa con proteínas y aceites marinos de alta calidad",
      "Proporciona resultados consistentes y bioseguros",
      "Contiene probióticos mejorados para promover salud intestinal y calidad del agua",
      "Mejor rendimiento larvario comprobado en ensayos",
      "Distribución optimizada del tamaño de partícula"
    ],
      presentation: [
      "Envases de 2 kg",
      "Almacenar en lugar fresco y seco (22 °C / 72 °F)",
      "No congelar",
      "Una vez abierto, utilizar en un plazo de 4 semanas",
      "Mantener el envase tapado después de cada uso"
    ],
      specifications: [
      {
        "key": "Proteína cruda",
        "value": "mínimo 12% (45% en peso seco)"
      },
      {
        "key": "Grasa cruda",
        "value": "mínimo 4.5% (45% en peso seco)"
      },
      {
        "key": "Fibra cruda",
        "value": "máximo 1.0%"
      },
      {
        "key": "Humedad",
        "value": "máximo 73.0%"
      },
      {
        "key": "Fósforo",
        "value": "mínimo 0.1%"
      },
      {
        "key": "Ceniza",
        "value": "mínimo 6.5%"
      },
      {
        "key": "Especificación",
        "value": "Proteínas animales marinas"
      },
      {
        "key": "Especificación",
        "value": "Proteínas vegetales (incluidas algas)"
      },
      {
        "key": "Especificación",
        "value": "Levadura"
      },
      {
        "key": "Especificación",
        "value": "Aceites de pescado y vegetales"
      },
      {
        "key": "Especificación",
        "value": "Almidones vegetales"
      },
      {
        "key": "Especificación",
        "value": "Minerales y vitaminas"
      },
      {
        "key": "Especificación",
        "value": "Antioxidantes, pigmentos y aglutinantes biodegradables"
      }
    ]
    },
    en: {
      name: "EZ Artemia Ultra (Microencapsulated)",
      description: "Next-generation microencapsulated liquid diet, formulated in the USA to surpass the nutritional profile of enriched Artemia. EZ Artemia Ultra offers a stable, biosecure and pathogen-free nutrient composition, making it a reliable alternative to the variability of traditional Artemia.",
      benefits: [
        "Higher nutrient density and digestibility",
        "Improved microencapsulation for greater stability in water column",
        "Precise formulation with high-quality marine proteins and oils",
        "Provides consistent and biosecure results",
        "Contains improved probiotics to promote intestinal health and water quality",
        "Better larval performance proven in trials",
        "Optimized particle size distribution"
      ],
      presentation: [
        "2 kg containers",
        "Store in cool and dry place (22°C / 72°F)",
        "Do not freeze",
        "Once opened, use within 4 weeks",
        "Keep container closed after each use"
      ],
      specifications: [
        { key: "Crude protein (liquid weight)", value: "12% min. (45% dry weight)" },
        { key: "Crude fat (liquid weight)", value: "4.5% min. (45% dry weight)" },
        { key: "Crude fiber", value: "1.0% max." },
        { key: "Moisture", value: "73.0% max." },
        { key: "Phosphorus", value: "0.1% min." }
      ]
    },
    pt: {
      name: "EZ Artemia Ultra (Microencapsulado)",
      description: "Dieta líquida microencapsulada de nova geração, formulada nos EUA para superar o perfil nutricional da Artemia enriquecida. EZ Artemia Ultra oferece uma composição de nutrientes estável, biossegura e livre de patógenos, tornando-se uma alternativa confiável à variabilidade da Artemia tradicional.",
      benefits: [
        "Maior densidade e digestibilidade de nutrientes",
        "Microencapsulação melhorada para maior estabilidade na coluna d'água",
        "Formulação precisa com proteínas e óleos marinhos de alta qualidade",
        "Fornece resultados consistentes e biosseguros",
        "Contém probióticos melhorados para promover saúde intestinal e qualidade da água",
        "Melhor desempenho larval comprovado em ensaios",
        "Distribuição otimizada do tamanho de partícula"
      ],
      presentation: [
        "Recipientes de 2 kg",
        "Armazenar em local fresco e seco (22°C / 72°F)",
        "Não congelar",
        "Uma vez aberto, utilizar em prazo de 4 semanas",
        "Manter o recipiente fechado após cada uso"
      ],
      specifications: [
        { key: "Proteína bruta (peso líquido)", value: "12% mín. (45% peso seco)" },
        { key: "Gordura bruta (peso líquido)", value: "4,5% mín. (45% peso seco)" },
        { key: "Fibra bruta", value: "1,0% máx." },
        { key: "Umidade", value: "73,0% máx." },
        { key: "Fósforo", value: "0,1% mín." }
      ]
    }
  },

  // EZ Larva (Microencapsulados) - AL009
  "AL009": {
    es: {
      name: "EZ Larva (Microencapsulados)",
      description: "Dieta líquida microencapsulada desarrollada por Zeigler Bros. Inc. (EE. UU.) para larvas de camarón. Formulada como una ración balanceada, con partículas suaves y húmedas que facilitan el consumo. Producida mediante un proceso en frío para preservar nutrientes sensibles como pigmentos, ácidos grasos Omega-3 y enzimas. Su fórmula es biosegura, con resultados negativos frente a patógenos como WSSV (Mancha Blanca), EMS y otros virus.",
      benefits: [
      "Dieta microencapsulada de alta atracción y palatabilidad",
      "No afecta la calidad del agua; minimiza la lixiviación",
      "Estimula la alimentación activa y el crecimiento larvario",
      "Contiene enzimas que mejoran la digestibilidad",
      "Incluye inmunoestimulantes para fortalecer el sistema inmune",
      "Proporciona energía y nutrición equilibrada"
    ],
      presentation: [
      "Envases de 2 kg",
      "Almacenar en lugar fresco y seco (22 °C / 72 °F)",
      "No congelar",
      "Una vez abierto, usar en un máximo de 4 semanas",
      "Mantener el envase cerrado después de cada uso"
    ],
      specifications: [
      {
        "key": "Proteína cruda",
        "value": "mínimo 36.7%"
      },
      {
        "key": "Grasa cruda",
        "value": "mínimo 20%"
      },
      {
        "key": "Fibra cruda",
        "value": "máximo 3.3%"
      },
      {
        "key": "Humedad",
        "value": "0%"
      },
      {
        "key": "Fósforo",
        "value": "mínimo 0.7%"
      },
      {
        "key": "Proteína cruda",
        "value": "mínimo 11%"
      },
      {
        "key": "Grasa cruda",
        "value": "mínimo 6%"
      },
      {
        "key": "Fibra cruda",
        "value": "máximo 1%"
      },
      {
        "key": "Humedad",
        "value": "máximo 70%"
      },
      {
        "key": "Fósforo",
        "value": "mínimo 0.2%"
      }
    ]
    },
    en: {
      name: "EZ Larva (Microencapsulated)",
      description: "Microencapsulated liquid diet developed by Zeigler Bros. Inc. (USA) for shrimp larvae. Formulated as a balanced ration, with soft and moist particles that facilitate consumption. Produced through a cold process to preserve sensitive nutrients such as pigments, Omega-3 fatty acids and enzymes.",
      benefits: [
        "Microencapsulated diet with high attraction and palatability",
        "Does not affect water quality; minimizes leaching",
        "Stimulates active feeding and larval growth",
        "Contains enzymes that improve digestibility",
        "Includes immunostimulants to strengthen the immune system",
        "Provides balanced energy and nutrition"
      ],
      presentation: [
        "2 kg containers",
        "Store in cool and dry place (22°C / 72°F)",
        "Do not freeze",
        "Once opened, use within maximum 4 weeks",
        "Keep container closed after each use"
      ],
      specifications: [
        { key: "Crude protein (dry weight)", value: "36.7% min." },
        { key: "Crude fat (dry weight)", value: "20% min." },
        { key: "Crude protein (liquid weight)", value: "11% min." },
        { key: "Crude fat (liquid weight)", value: "6% min." },
        { key: "Moisture", value: "70% max." }
      ]
    },
    pt: {
      name: "EZ Larva (Microencapsulado)",
      description: "Dieta líquida microencapsulada desenvolvida pela Zeigler Bros. Inc. (EUA) para larvas de camarão. Formulada como ração balanceada, com partículas suaves e úmidas que facilitam o consumo. Produzida através de processo a frio para preservar nutrientes sensíveis como pigmentos, ácidos graxos Ômega-3 e enzimas.",
      benefits: [
        "Dieta microencapsulada de alta atração e palatabilidade",
        "Não afeta a qualidade da água; minimiza a lixiviação",
        "Estimula a alimentação ativa e o crescimento larval",
        "Contém enzimas que melhoram a digestibilidade",
        "Inclui imunoestimulantes para fortalecer o sistema imune",
        "Fornece energia e nutrição equilibrada"
      ],
      presentation: [
        "Recipientes de 2 kg",
        "Armazenar em local fresco e seco (22°C / 72°F)",
        "Não congelar",
        "Uma vez aberto, usar em máximo de 4 semanas",
        "Manter o recipiente fechado após cada uso"
      ],
      specifications: [
        { key: "Proteína bruta (peso seco)", value: "36,7% mín." },
        { key: "Gordura bruta (peso seco)", value: "20% mín." },
        { key: "Proteína bruta (peso líquido)", value: "11% mín." },
        { key: "Gordura bruta (peso líquido)", value: "6% mín." },
        { key: "Umidade", value: "70% máx." }
      ]
    }
  },

  // EZ Mate - AL010
  "AL010": {
    es: {
      name: "EZ Mate",
      description: "Dieta en polvo para maduración de camarones elaborada por Zeigler Bros. Inc. (EE. UU.), diseñada para estimular una mayor eficiencia reproductiva en sistemas de maduración, mejorando la producción de nauplios saludables y fortaleciendo el desempeño reproductivo en cada desove.",
      benefits: [
      "Mejora la eficiencia de la maduración",
      "Estimula la producción de nauplios saludables",
      "Favorece la fertilidad y copulación",
      "Alto contenido de astaxantina, colesterol, vitamina C y HUFAs",
      "Alternativa eficaz a alimentos frescos como poliquetos, calamar o biomasa de artemia"
    ],
      presentation: [
      "Latas de 500 g (polvo seco)",
      "Almacenar en un lugar fresco, seco, ventilado, alejado de la luz solar y de las paredes",
      "Una vez abierta la lata, refrigerar y consumir antes de tres meses",
      "No requiere condiciones especiales de transporte",
      "Mantener fuera del alcance de los niños"
    ],
      specifications: [
      {
        "key": "Proteína cruda",
        "value": "mínimo 55%"
      },
      {
        "key": "Grasa cruda",
        "value": "mínimo 12%"
      },
      {
        "key": "Fibra cruda",
        "value": "máximo 3%"
      },
      {
        "key": "Ceniza",
        "value": "máximo 13%"
      },
      {
        "key": "Fósforo",
        "value": "mínimo 1.1%"
      },
      {
        "key": "Humedad",
        "value": "máximo 10%"
      }
    ]
    },
    en: {
      name: "EZ Mate",
      description: "Powder diet for shrimp maturation manufactured by Zeigler Bros. Inc. (USA), designed to stimulate greater reproductive efficiency in maturation systems, improving the production of healthy nauplii and strengthening reproductive performance in each spawning.",
      benefits: [
        "Improves maturation efficiency",
        "Stimulates production of healthy nauplii",
        "Favors fertility and copulation",
        "High content of astaxanthin, cholesterol, vitamin C and HUFAs",
        "Effective alternative to fresh foods like polychaetes, squid or artemia biomass"
      ],
      presentation: [
        "500 g cans (dry powder)",
        "Store in a cool, dry, ventilated place, away from sunlight and walls",
        "Once opened, refrigerate and consume within three months",
        "Does not require special transport conditions",
        "Keep out of reach of children"
      ],
      specifications: [
        { key: "Crude protein", value: "55% min." },
        { key: "Crude fat", value: "12% min." },
        { key: "Crude fiber", value: "3% max." },
        { key: "Ash", value: "13% max." },
        { key: "Phosphorus", value: "1.1% min." },
        { key: "Moisture", value: "10% max." }
      ]
    },
    pt: {
      name: "EZ Mate",
      description: "Dieta em pó para maturação de camarões elaborada pela Zeigler Bros. Inc. (EUA), projetada para estimular maior eficiência reprodutiva em sistemas de maturação, melhorando a produção de náuplios saudáveis e fortalecendo o desempenho reprodutivo em cada desova.",
      benefits: [
        "Melhora a eficiência da maturação",
        "Estimula a produção de náuplios saudáveis",
        "Favorece a fertilidade e copulação",
        "Alto conteúdo de astaxantina, colesterol, vitamina C e HUFAs",
        "Alternativa eficaz a alimentos frescos como políquetos, lula ou biomassa de artemia"
      ],
      presentation: [
        "Latas de 500 g (pó seco)",
        "Armazenar em local fresco, seco, ventilado, longe da luz solar e das paredes",
        "Uma vez aberta a lata, refrigerar e consumir antes de três meses",
        "Não requer condições especiais de transporte",
        "Manter fora do alcance das crianças"
      ],
      specifications: [
        { key: "Proteína bruta", value: "55% mín." },
        { key: "Gordura bruta", value: "12% mín." },
        { key: "Fibra bruta", value: "3% máx." },
        { key: "Cinza", value: "13% máx." },
        { key: "Fósforo", value: "1,1% mín." },
        { key: "Umidade", value: "10% máx." }
      ]
    }
  },

  // Flake Negro de Artemia - AL011
  "AL011": {
    es: {
      name: "Flake Negro de Artemia",
      description: "Dieta premium en hojuelas formulada para el óptimo desarrollo y sobrevivencia de larvas de camarón, especialmente eficaz durante los estadios de Mysis y Postlarva (PL). También puede utilizarse en larvas de peces. Su fórmula nutricionalmente balanceada proporciona proteínas, vitaminas y minerales esenciales para una salud robusta y crecimiento acelerado.",
      benefits: [
      "Alta atractabilidad, palatabilidad y digestibilidad.",
      "Gran estabilidad y flotabilidad en la columna de agua.",
      "Proporciona una coloración oscura prolongada en el hepatopáncreas e intestino.",
      "Apoya una salud integral y mejora la vitalidad de las larvas."
    ],
      presentation: [
      "Baldes de 5 kg",
      "Almacenar en un lugar fresco, seco, bien ventilado y protegido de la luz solar. No requiere refrigeración ni condiciones especiales de transporte. Mantener fuera del alcance de los niños."
    ],
      specifications: [
      {
        "key": "Proteína Cruda",
        "value": "45% mín."
      },
      {
        "key": "Grasa Cruda",
        "value": "9% mín."
      },
      {
        "key": "Fibra Cruda",
        "value": "3% máx."
      },
      {
        "key": "Ceniza Total",
        "value": "8% máx."
      },
      {
        "key": "Humedad",
        "value": "10% máx."
      },
      {
        "key": "Especificación",
        "value": "Proteína animal marina, extracto de levaduras, colesterol, vitaminas, minerales, lecitina y antioxidantes."
      }
    ]
    },
    en: {
      name: "Artemia Black Flake",
      description: "Premium flake diet formulated for optimal development and survival of shrimp larvee, especially effective during Mysis and Postlarva (PL) stages. Can also be used for fish larvae. Its nutritionally balanced formula provides essential proteins, vitamins and minerals for robust health and accelerated growth.",
      benefits: [
        "High attractability, palatability and digestibility",
        "Great stability and buoyancy in water column",
        "Provides prolonged dark coloration in hepatopancreas and intestine",
        "Supports comprehensive health and improves larval vitality"
      ],
      presentation: [
        "5 kg buckets",
        "Store in cool, dry, well-ventilated place protected from sunlight",
        "Does not require refrigeration or special transport conditions",
        "Keep out of reach of children"
      ],
      specifications: [
        { key: "Crude Protein", value: "45% min." },
        { key: "Crude Fat", value: "9% min." },
        { key: "Crude Fiber", value: "3% max." },
        { key: "Total Ash", value: "8% max." },
        { key: "Moisture", value: "10% max." }
      ]
    },
    pt: {
      name: "Flake Negro de Artemia",
      description: "Dieta premium em flocos formulada para o desenvolvimento ótimo e sobrevivência de larvas de camarão, especialmente eficaz durante os estágios de Mysis e Pós-larva (PL). Também pode ser utilizada em larvas de peixes. Sua fórmula nutricionalmente balanceada fornece proteínas, vitaminas e minerais essenciais para saúde robusta e crescimento acelerado.",
      benefits: [
        "Alta atratividade, palatabilidade e digestibilidade",
        "Grande estabilidade e flutuabilidade na coluna d'água",
        "Proporciona coloração escura prolongada no hepatopâncreas e intestino",
        "Apoia saúde integral e melhora a vitalidade das larvas"
      ],
      presentation: [
        "Baldes de 5 kg",
        "Armazenar em local fresco, seco, bem ventilado e protegido da luz solar",
        "Não requer refrigeração nem condições especiais de transporte",
        "Manter fora do alcance das crianças"
      ],
      specifications: [
        { key: "Proteína Bruta", value: "45% mín." },
        { key: "Gordura Bruta", value: "9% mín." },
        { key: "Fibra Bruta", value: "3% máx." },
        { key: "Cinza Total", value: "8% máx." },
        { key: "Umidade", value: "10% máx." }
      ]
    }
  },

  // Gold Feed (Microparticulados) - AL012
  "AL012": {
    es: {
      name: "Gold Feed (Microparticulados)",
      description: "Alimento microparticulado premium formulado especialmente para larvas de camarón en estadios de Mysis y Postlarva (PL). Su composición con ingredientes marinos de alta calidad asegura una nutrición eficiente, crecimiento saludable y excelente supervivencia.",
      benefits: [
      "Alta palatabilidad, digestibilidad y flotabilidad. Estimula el apetito, promueve una coloración oscura saludable del hepatopáncreas e intestino, y mejora el desempeño larval gracias a sus proteínas marinas altamente digeribles."
    ],
      presentation: [
      "Fundas de aluminio selladas al vacío de 3 kg",
      "Almacenar en lugar fresco, seco y ventilado. No requiere refrigeración ni condiciones especiales de transporte. Mantener fuera del alcance de los niños."
    ],
      specifications: [
      {
        "key": "Proteína Cruda",
        "value": "50% mín."
      },
      {
        "key": "Grasa Cruda",
        "value": "9% mín."
      },
      {
        "key": "Fibra Cruda",
        "value": "3% máx."
      },
      {
        "key": "Ceniza Total",
        "value": "8% máx."
      },
      {
        "key": "Humedad",
        "value": "5% máx."
      },
      {
        "key": "Especificación",
        "value": "CARACTERÍSTICAS FÍSICAS"
      },
      {
        "key": "Aspecto",
        "value": "Microparticulado"
      },
      {
        "key": "Color",
        "value": "Oscuro"
      },
      {
        "key": "Olor",
        "value": "Mariscoso"
      },
      {
        "key": "Tamaños de partícula disponibles",
        "value": "<150 μm, <250 μm, <350 μm"
      },
      {
        "key": "Ajustar dosis según el estadio larval. Frecuencia de alimentación",
        "value": "4–6 veces al día en estadios iniciales y 8–12 veces en PL. Distribuir uniformemente para mayor eficiencia."
      }
    ]
    },
    en: {
      name: "Gold Feed (Microparticulated)",
      description: "Premium microparticulated feed specially formulated for shrimp larvae in Mysis and Postlarva (PL) stages. Its composition with high-quality marine ingredients ensures efficient nutrition, healthy growth and excellent survival.",
      benefits: [
        "High palatability, digestibility and buoyancy",
        "Stimulates appetite",
        "Promotes healthy dark coloration of hepatopancreas and intestine",
        "Improves larval performance thanks to highly digestible marine proteins"
      ],
      presentation: [
        "3 kg vacuum-sealed aluminum bags",
        "Store in cool, dry and ventilated place",
        "Does not require refrigeration or special transport conditions",
        "Keep out of reach of children"
      ],
      specifications: [
        { key: "Crude Protein", value: "50% min." },
        { key: "Crude Fat", value: "9% min." },
        { key: "Crude Fiber", value: "3% max." },
        { key: "Total Ash", value: "8% max." },
        { key: "Moisture", value: "5% max." },
        { key: "Available sizes", value: "<150 μm, <250 μm, <350 μm" }
      ]
    },
    pt: {
      name: "Gold Feed (Microparticulado)",
      description: "Alimento microparticulado premium formulado especialmente para larvas de camarão em estágios de Mysis e Pós-larva (PL). Sua composição com ingredientes marinhos de alta qualidade assegura nutrição eficiente, crescimento saudável e excelente sobrevivência.",
      benefits: [
        "Alta palatabilidade, digestibilidade e flutuabilidade",
        "Estimula o apetite",
        "Promove coloração escura saudável do hepatopâncreas e intestino",
        "Melhora o desempenho larval graças a suas proteínas marinhas altamente digestíveis"
      ],
      presentation: [
        "Sacos de alumínio selados a vácuo de 3 kg",
        "Armazenar em local fresco, seco e ventilado",
        "Não requer refrigeração nem condições especiais de transporte",
        "Manter fora do alcance das crianças"
      ],
      specifications: [
        { key: "Proteína Bruta", value: "50% mín." },
        { key: "Gordura Bruta", value: "9% mín." },
        { key: "Fibra Bruta", value: "3% máx." },
        { key: "Cinza Total", value: "8% máx." },
        { key: "Umidade", value: "5% máx." },
        { key: "Tamanhos disponíveis", value: "<150 μm, <250 μm, <350 μm" }
      ]
    }
  },

  // Krill Congelado - AL013
  "AL013": {
    es: {
      name: "Krill Congelado",
      description: "El Krill (FRESH FROZEN KRILL – ANTARTIC KRILL) procesado en Canadá y capturado en el Océano Austral, es un alimento ampliamente utilizado en la acuicultura, en cultivos de peces y camarones, principalmente en la etapa de maduración. Alimento con alto contenido de Omega-3 que promueve la salud y bienestar del camarón por sus altos contenidos de fosfolípidos, colina y astaxantina, los mismos que realizan funciones biológicas esenciales tanto como factores enzimáticos, como reguladores del sistema inmune. Permite suplir las necesidades y requerimientos de los reproductores de Penaeus vannamei en el proceso de maduración.",
      benefits: [
      "Incrementa porcentaje en hembras copuladas.",
      "Mayor número de nauplios por hembra.",
      "Porcentaje mayor de huevos viables.",
      "Nauplios de mejor calidad.",
      "Alta supervivencia en las postlarvas.",
      "Mejora la sobrevivencia en hembras."
    ],
      presentation: [
      "APLICACIÓN",
      "Alimentación sugerida para los camarones reproductores en los laboratorios de maduración que mantienen ciclo cerrado: De 3 al 8% de la biomasa de los organismos.",
      "PRESENTACIÓN Y ALMACENAMIENTO",
      "Presentación de 25kg. Mantener congelado a -20°C, debe estar protegido de la humedad, contaminación, luz directa",
      "del sol. No apto para el consumo humano."
    ],
      specifications: [
      {
        "key": "Especificación",
        "value": "PERFIL NUTRICIONAL"
      },
      {
        "key": "Especificación",
        "value": "Proteína (Min.).        12% Grasa (Min.).                4%"
      },
      {
        "key": "Especificación",
        "value": "Ceniza (Min.).        2.3%"
      },
      {
        "key": "Especificación",
        "value": "Colesterol (Min.).        46 mg"
      },
      {
        "key": "Especificación",
        "value": "Fibra (Min.).        1%"
      },
      {
        "key": "Especificación",
        "value": "Vitamina D (Min.).        0.23 mg"
      },
      {
        "key": "Especificación",
        "value": "Calcio (Min.).        282 mg"
      },
      {
        "key": "Especificación",
        "value": "Hierro (Min.).        0.71 mg"
      },
      {
        "key": "Especificación",
        "value": "Potasio (Min.).        233 mg"
      },
      {
        "key": "Especificación",
        "value": "PERFIL DE ÁCIDOS GRASOS"
      },
      {
        "key": "Especificación",
        "value": "Grasa saturada (Min.).        41.8%"
      },
      {
        "key": "Especificación",
        "value": "Monoinsaturado (Min.).        20.1%"
      },
      {
        "key": "Especificación",
        "value": "Poliinsaturado (Min.).        37.9%"
      },
      {
        "key": "Especificación",
        "value": "Grasas trans (Min.).        0.01%"
      },
      {
        "key": "Especificación",
        "value": "Colesterol (Min.).        49.48 mg/100gms"
      },
      {
        "key": "Especificación",
        "value": "Libre de patógenos, contaminantes, con humedad Max del 80%, mide entre 3-6 cm de largo."
      }
    ]
    },
    en: {
      name: "Frozen Krill",
      description: "Krill processed in Canada and caught in the Southern Ocean, is a food widely used in aquaculture, in fish and shrimp farming, mainly in the maturation stage. Food with high Omega-3 content that promotes shrimp health and wellbeing due to its high content of phospholipids, choline and astaxanthin.",
      benefits: [
        "Increases percentage of mated females",
        "Higher number of nauplii per female",
        "Higher percentage of viable eggs",
        "Better quality nauplii",
        "High survival in postlarvae",
        "Improves survival in females"
      ],
      presentation: [
        "25kg presentation",
        "Keep frozen at -20°C",
        "Must be protected from humidity, contamination, direct sunlight",
        "Not suitable for human consumption",
        "Suggested feeding: 3 to 8% of organism biomass"
      ],
      specifications: [
        { key: "Protein", value: "12% min." },
        { key: "Fat", value: "4% min." },
        { key: "Ash", value: "2.3% min." },
        { key: "Cholesterol", value: "46 mg" },
        { key: "Moisture", value: "80% max." },
        { key: "Size", value: "3-6 cm long" }
      ]
    },
    pt: {
      name: "Krill Congelado",
      description: "O Krill processado no Canadá e capturado no Oceano Austral, é um alimento amplamente utilizado na aquicultura, em cultivos de peixes e camarões, principalmente na etapa de maturação. Alimento com alto conteúdo de Ômega-3 que promove a saúde e bem-estar do camarão por seus altos conteúdos de fosfolípidos, colina e astaxantina.",
      benefits: [
        "Incrementa porcentagem em fêmeas copuladas",
        "Maior número de náuplios por fêmea",
        "Porcentagem maior de ovos viáveis",
        "Náuplios de melhor qualidade",
        "Alta sobrevivência nas pós-larvas",
        "Melhora a sobrevivência em fêmeas"
      ],
      presentation: [
        "Apresentação de 25kg",
        "Manter congelado a -20°C",
        "Deve estar protegido da umidade, contaminação, luz direta do sol",
        "Não adequado para consumo humano",
        "Alimentação sugerida: De 3 a 8% da biomassa dos organismos"
      ],
      specifications: [
        { key: "Proteína", value: "12% mín." },
        { key: "Gordura", value: "4% mín." },
        { key: "Cinza", value: "2,3% mín." },
        { key: "Colesterol", value: "46 mg" },
        { key: "Umidade", value: "80% máx." },
        { key: "Tamanho", value: "3-6 cm de comprimento" }
      ]
    }
  },

  // Larva Z - Plus (Microparticulados) - AL015
  "AL015": {
    es: {
      name: "Larva Z - Plus (Microparticulados)",
      description: "Dieta especializada para larvas y postlarvas de camarón desarrollada por Zeigler Bros. Inc. (EE. UU.). Su formulación balanceada incluye ingredientes de alta calidad para promover el crecimiento, el desarrollo saludable y la resistencia inmunológica en etapas tempranas del cultivo. Las micropartículas semiflotantes permiten una mejor disponibilidad del alimento en la columna de agua.",
      benefits: [
      "Micropartículas de hundimiento lento para mejor absorción en la columna de agua.",
      "Altos niveles de ácidos grasos insaturados (HUFA) para favorecer el desarrollo larval.",
      "Contiene Vpak para estimular el sistema inmunológico.",
      "Promueve el crecimiento eficiente y la supervivencia de larvas y postlarva"
    ],
      presentation: [
      "Latas de 500 g",
      "Almacenar en lugar fresco, seco, ventilado, alejado de la luz solar y de las paredes",
      "Producto seguro y sin requisitos especiales de transporte",
      "Latas abiertas: conservar cerradas a 20 °C o menos"
    ],
      specifications: [
      {
        "key": "Proteína cruda",
        "value": "mínimo 50%"
      },
      {
        "key": "Grasa cruda",
        "value": "mínimo 15%"
      },
      {
        "key": "Fibra cruda",
        "value": "máximo 2%"
      },
      {
        "key": "Ceniza cruda",
        "value": "máximo 8%"
      },
      {
        "key": "Humedad",
        "value": "máximo 12%"
      },
      {
        "key": "Fósforo",
        "value": "máximo 0.9%"
      },
      {
        "key": "Especificación",
        "value": "Proteínas marinas y vegetales"
      },
      {
        "key": "Especificación",
        "value": "Lecitina"
      },
      {
        "key": "Especificación",
        "value": "Levadura"
      },
      {
        "key": "Especificación",
        "value": "Subproductos de granos procesados"
      },
      {
        "key": "Especificación",
        "value": "Aminoácidos"
      },
      {
        "key": "Especificación",
        "value": "Minerales y vitaminas"
      },
      {
        "key": "Especificación",
        "value": "Conservantes y pigmentos"
      }
    ]
    },
    en: {
      name: "Larva Z - Plus (Microparticulated)",
      description: "Specialized diet for shrimp larvae and postlarvae developed by Zeigler Bros. Inc. (USA). Its balanced formulation includes high-quality ingredients to promote growth, healthy development and immune resistance in early culture stages. Semi-floating microparticles allow better feed availability in the water column.",
      benefits: [
        "Slow-sinking microparticles for better absorption in water column",
        "High levels of unsaturated fatty acids (HUFA) to favor larval development",
        "Contains Vpak to stimulate the immune system",
        "Promotes efficient growth and survival of larvae and postlarvae"
      ],
      presentation: [
        "500 g cans",
        "Store in cool, dry, ventilated place, away from sunlight and walls",
        "Safe product with no special transport requirements",
        "Opened cans: keep closed at 20°C or less"
      ],
      specifications: [
        { key: "Crude protein", value: "50% min." },
        { key: "Crude fat", value: "15% min." },
        { key: "Crude fiber", value: "2% max." },
        { key: "Crude ash", value: "8% max." },
        { key: "Moisture", value: "12% max." },
        { key: "Phosphorus", value: "0.9% max." }
      ]
    },
    pt: {
      name: "Larva Z - Plus (Microparticulado)",
      description: "Dieta especializada para larvas e pós-larvas de camarão desenvolvida pela Zeigler Bros. Inc. (EUA). Sua formulação balanceada inclui ingredientes de alta qualidade para promover o crescimento, desenvolvimento saudável e resistência imunológica em estágios iniciais do cultivo. As micropartículas semiflutuantes permitem melhor disponibilidade do alimento na coluna d'água.",
      benefits: [
        "Micropartículas de afundamento lento para melhor absorção na coluna d'água",
        "Altos níveis de ácidos graxos insaturados (HUFA) para favorecer o desenvolvimento larval",
        "Contém Vpak para estimular o sistema imunológico",
        "Promove crescimento eficiente e sobrevivência de larvas e pós-larvas"
      ],
      presentation: [
        "Latas de 500 g",
        "Armazenar em local fresco, seco, ventilado, longe da luz solar e das paredes",
        "Produto seguro e sem requisitos especiais de transporte",
        "Latas abertas: conservar fechadas a 20°C ou menos"
      ],
      specifications: [
        { key: "Proteína bruta", value: "50% mín." },
        { key: "Gordura bruta", value: "15% mín." },
        { key: "Fibra bruta", value: "2% máx." },
        { key: "Cinza bruta", value: "8% máx." },
        { key: "Umidade", value: "12% máx." },
        { key: "Fósforo", value: "0,9% máx." }
      ]
    }
  },

  // Mejillones - AL016
  "AL016": {
    es: {
      name: "Mejillones",
      description: "Dentro de los compuestos fundamentales en la dieta se encuentran los ácidos grasos de la serie linolénica (w3, de origen marino), colesterol y sus derivados. Los moluscos como los mejillones pueden suministrar hasta 94,6 kcal a partir del consumo de ácidos grasos Omega-3 EPA y DHA, ambos como fuente nutricional más adecuada en la maduración combinada con calamares y artemia. También contiene los aminoácidos esenciales como la lisina que contribuye a la regulación celular.\n\nNuestro mejillón (Mytilus chilensis) proviene de la acuicultura de Chile y es procesado sin aditivos ni preservantes y contiene el siguiente perfil nutricional de acuerdo a 100gr. Están libres de enfermedades por virus de: WSSV, TSV, NHP, IHHNV, Vibrios, Baculovirus.",
      benefits: [
      "El mejillón es considerado un buen alimento para el proceso de maduración de los camarones en tanques controlados, ya que aporta nutrientes como las proteínas, aminoácidos esenciales, ácidos grasos Omega-3, vitamina B-12, Fósforo, Potasio y Zinc."
    ],
      presentation: [
      "PRESENTACIÓN Y ALMACENAMIENTO",
      "Cartones de 13,4kg, contiene fundas transparentes de 3.35kg. Almacenar a -18 C. Este producto debe de ser protegido de humedad, contaminación y luz del sol. Seguro para el uso indicado, mantener fuera del alcance de los niños.",
      "APLICACIÓN",
      "Se recomienda la dosificación de mejillón entre el 2 - 4% de la biomasa del tanque, el cual puede ser repartido en 2 a 4 raciones diarias. En ciertos casos se utilizan algunos de estos alimentos naturales suplementados con dietas peletizadas como EZ mate y Redimate."
    ],
      specifications: [
      {
        "key": "Especificación",
        "value": "Proteína.\t14,8 gr Grasas totales (ácidos grasos saturados).\t1,08 gr"
      },
      {
        "key": "Especificación",
        "value": "Carbohidratos.\t6,36 gr"
      },
      {
        "key": "Especificación",
        "value": "EPA.\t231 mg"
      },
      {
        "key": "Especificación",
        "value": "DHA.\t92,6 mg"
      },
      {
        "key": "Especificación",
        "value": "Calorías.\t94,6 kcal"
      },
      {
        "key": "Especificación",
        "value": "Humedad.\t(Máximo) 37%"
      }
    ]
    },
    en: {
      name: "Mussels",
      description: "Mollusks like mussels can supply up to 94.6 kcal from consumption of Omega-3 fatty acids EPA and DHA, both as the most suitable nutritional source in maturation combined with squid and artemia. Our mussel (Mytilus chilensis) comes from Chilean aquaculture and is processed without additives or preservatives.",
      benefits: [
        "Mussels are considered good food for shrimp maturation process in controlled tanks",
        "Provides nutrients such as proteins, essential amino acids, Omega-3 fatty acids",
        "Contains vitamin B-12, Phosphorus, Potassium and Zinc",
        "Free from viral diseases: WSSV, TSV, NHP, IHHNV, Vibrios, Baculovirus"
      ],
      presentation: [
        "13.4kg cartons, contains 3.35kg transparent bags",
        "Store at -18°C",
        "Must be protected from humidity, contamination and sunlight",
        "Keep out of reach of children",
        "Dosage: between 2 - 4% of tank biomass, divided into 2 to 4 daily rations"
      ],
      specifications: [
        { key: "Protein", value: "14.8 gr" },
        { key: "Total fats", value: "1.08 gr" },
        { key: "Carbohydrates", value: "6.36 gr" },
        { key: "EPA", value: "231 mg" },
        { key: "DHA", value: "92.6 mg" },
        { key: "Calories", value: "94.6 kcal" },
        { key: "Moisture", value: "37% max." }
      ]
    },
    pt: {
      name: "Mexilhões",
      description: "Moluscos como mexilhões podem fornecer até 94,6 kcal a partir do consumo de ácidos graxos Ômega-3 EPA e DHA, ambos como fonte nutricional mais adequada na maturação combinada com lulas e artemia. Nosso mexilhão (Mytilus chilensis) provém da aquicultura do Chile e é processado sem aditivos nem preservantes.",
      benefits: [
        "O mexilhão é considerado um bom alimento para o processo de maturação dos camarões em tanques controlados",
        "Fornece nutrientes como proteínas, aminoácidos essenciais, ácidos graxos Ômega-3",
        "Contém vitamina B-12, Fósforo, Potássio e Zinco",
        "Livre de doenças por vírus de: WSSV, TSV, NHP, IHHNV, Vibrios, Baculovirus"
      ],
      presentation: [
        "Caixas de 13,4kg, contém sacos transparentes de 3,35kg",
        "Armazenar a -18°C",
        "Deve estar protegido da umidade, contaminação e luz do sol",
        "Manter fora do alcance das crianças",
        "Dosagem: entre 2 - 4% da biomassa do tanque, dividida em 2 a 4 rações diárias"
      ],
      specifications: [
        { key: "Proteína", value: "14,8 gr" },
        { key: "Gorduras totais", value: "1,08 gr" },
        { key: "Carboidratos", value: "6,36 gr" },
        { key: "EPA", value: "231 mg" },
        { key: "DHA", value: "92,6 mg" },
        { key: "Calorias", value: "94,6 kcal" },
        { key: "Umidade", value: "37% máx." }
      ]
    }
  },

  // MPs (Microparticulados) - AL017
  "AL017": {
    es: {
      name: "MPs (Microparticulados)",
      description: "Alimento microparticulado de alta calidad para larvas de camarón y peces. Su formulación nutricional completa, con excelente estabilidad y flotabilidad, está diseñada para maximizar la salud, crecimiento y sobrevivencia en las primeras etapas de desarrollo.",
      benefits: [
      "Proporciona una dieta balanceada que estimula el crecimiento, la vitalidad y una coloración oscura prolongada en el hepatopáncreas e intestino. Su permanencia en la columna de agua permite un mejor aprovechamiento por parte de las larvas."
    ],
      presentation: [
      "Latas de 500g",
      "Baldes de 4kg",
      "Almacenar en un lugar fresco, seco y protegido de la luz solar. No requiere refrigeración mientras el empaque esté sellado."
    ],
      specifications: [
      {
        "key": "Proteína Cruda",
        "value": "50% mín."
      },
      {
        "key": "Grasa Cruda",
        "value": "14% mín."
      },
      {
        "key": "Fibra Cruda",
        "value": "3% máx."
      },
      {
        "key": "Ceniza Total",
        "value": "6% máx."
      },
      {
        "key": "Humedad",
        "value": "6% máx."
      },
      {
        "key": "Especificación",
        "value": "Utilizar en fases larvarias de camarones y peces según requerimientos nutricionales y protocolo de alimentación en laboratorio."
      }
    ]
    },
    en: {
      name: "MPs (Microparticulated)",
      description: "High-quality microparticulated feed for shrimp and fish larvae. Its complete nutritional formulation, with excellent stability and buoyancy, is designed to maximize health, growth and survival in the early stages of development.",
      benefits: [
        "Provides a balanced diet that stimulates growth, vitality and prolonged dark coloration in hepatopancreas and intestine",
        "Its permanence in the water column allows better utilization by larvae"
      ],
      presentation: [
        "500g cans",
        "4kg buckets",
        "Store in cool, dry place protected from sunlight",
        "Does not require refrigeration while package is sealed"
      ],
      specifications: [
        { key: "Crude Protein", value: "50% min." },
        { key: "Crude Fat", value: "14% min." },
        { key: "Crude Fiber", value: "3% max." },
        { key: "Total Ash", value: "6% max." },
        { key: "Moisture", value: "6% max." }
      ]
    },
    pt: {
      name: "MPs (Microparticulado)",
      description: "Alimento microparticulado de alta qualidade para larvas de camarão e peixes. Sua formulação nutricional completa, com excelente estabilidade e flutuabilidade, é projetada para maximizar saúde, crescimento e sobrevivência nos primeiros estágios de desenvolvimento.",
      benefits: [
        "Fornece dieta balanceada que estimula crescimento, vitalidade e coloração escura prolongada no hepatopâncreas e intestino",
        "Sua permanência na coluna d'água permite melhor aproveitamento pelas larvas"
      ],
      presentation: [
        "Latas de 500g",
        "Baldes de 4kg",
        "Armazenar em local fresco, seco e protegido da luz solar",
        "Não requer refrigeração enquanto a embalagem estiver selada"
      ],
      specifications: [
        { key: "Proteína Bruta", value: "50% mín." },
        { key: "Gordura Bruta", value: "14% mín." },
        { key: "Fibra Bruta", value: "3% máx." },
        { key: "Cinza Total", value: "6% máx." },
        { key: "Umidade", value: "6% máx." }
      ]
    }
  },

  // P. Vannamei Microparticulado - AL018
  "AL018": {
    es: {
      name: "P. Vannamei Microparticulado",
      description: "P. vannamei Microparticulado es una dieta balanceada diseñada por Higashimaru Co., Ltd. para el cultivo en laboratorio de larvas de camarón Litopenaeus vannamei. Esta dieta está formulada para cubrir los requerimientos nutricionales desde la etapa zoea hasta postlarva (PL), utilizando partículas de tres tamaños (30 a 300 micras) que se adaptan a las diferentes fases del desarrollo larval. Hecho en Japón",
      benefits: [
      "Satisface los requerimientos nutricionales completos de larvas de P. vannamei",
      "Optimiza el crecimiento desde zoea hasta postlarva",
      "Favorece una alimentación eficiente según el tamaño larval",
      "Mejora la tasa de supervivencia en cultivos de laboratorio",
      "Apoya el desarrollo saludable y uniforme de las larvas",
      "Formulación estable y de alta digestibilidad"
    ],
      presentation: [
      "Presentación: Fundas de 1 kg",
      "Condiciones de almacenamiento:",
      "Conservar en un lugar fresco (15 °C / 57 °F) y seco",
      "Evitar la exposición directa a la luz solar",
      "Consumir lo antes posible después de abrir la bolsa"
    ],
      specifications: [
      {
        "key": "Proteína cruda (mínima)",
        "value": "52%"
      },
      {
        "key": "Grasa cruda (mínima)",
        "value": "7%"
      },
      {
        "key": "Fibra cruda (máxima)",
        "value": "3%"
      },
      {
        "key": "Ceniza cruda (máxima)",
        "value": "16%"
      },
      {
        "key": "Humedad (máxima)",
        "value": "10%"
      },
      {
        "key": "Fósforo (mínima)",
        "value": "1%"
      },
      {
        "key": "Tamaños de partículas disponibles",
        "value": ""
      },
      {
        "key": "#0",
        "value": "30–50 micras"
      },
      {
        "key": "#1",
        "value": "80–130 micras"
      },
      {
        "key": "#2",
        "value": "200–300 micras"
      },
      {
        "key": "Especificación",
        "value": "Proteínas de origen animal y marino"
      },
      {
        "key": "Especificación",
        "value": "Aceites marinos y vegetales"
      },
      {
        "key": "Especificación",
        "value": "Algas"
      },
      {
        "key": "Especificación",
        "value": "Levaduras"
      },
      {
        "key": "Especificación",
        "value": "Pigmentos"
      },
      {
        "key": "Especificación",
        "value": "Colesterol"
      },
      {
        "key": "Especificación",
        "value": "Vitaminas y minerales esenciales"
      }
    ]
    },
    en: {
      name: "P. Vannamei Microparticulated",
      description: "P. vannamei Microparticulated is a balanced diet designed by Higashimaru Co., Ltd. for laboratory culture of Litopenaeus vannamei shrimp larvae. This diet is formulated to cover nutritional requirements from zoea stage to postlarva (PL), using particles of three sizes that adapt to different phases of larval development. Made in Japan.",
      benefits: [
        "Satisfies complete nutritional requirements of P. vannamei larvae",
        "Optimizes growth from zoea to postlarva",
        "Favors efficient feeding according to larval size",
        "Improves survival rate in laboratory cultures",
        "Supports healthy and uniform larval development",
        "Stable formulation with high digestibility"
      ],
      presentation: [
        "1 kg bags",
        "Store in cool place (15°C / 57°F) and dry",
        "Avoid direct sunlight exposure",
        "Consume as soon as possible after opening bag"
      ],
      specifications: [
        { key: "Crude protein", value: "52% min." },
        { key: "Crude fat", value: "7% min." },
        { key: "Crude fiber", value: "3% max." },
        { key: "Crude ash", value: "16% max." },
        { key: "Moisture", value: "10% max." },
        { key: "Phosphorus", value: "1% min." },
        { key: "Available sizes", value: "#0: 30–50μm, #1: 80–130μm, #2: 200–300μm" }
      ]
    },
    pt: {
      name: "P. Vannamei Microparticulado",
      description: "P. vannamei Microparticulado é uma dieta balanceada projetada pela Higashimaru Co., Ltd. para cultivo em laboratório de larvas de camarão Litopenaeus vannamei. Esta dieta é formulada para cobrir os requisitos nutricionais desde o estágio zoea até pós-larva (PL), utilizando partículas de três tamanhos que se adaptam às diferentes fases do desenvolvimento larval. Feito no Japão.",
      benefits: [
        "Satisfaz os requisitos nutricionais completos das larvas de P. vannamei",
        "Otimiza o crescimento de zoea a pós-larva",
        "Favorece alimentação eficiente de acordo com o tamanho larval",
        "Melhora a taxa de sobrevivência em cultivos de laboratório",
        "Apoia desenvolvimento saudável e uniforme das larvas",
        "Formulação estável e de alta digestibilidade"
      ],
      presentation: [
        "Sacos de 1 kg",
        "Conservar em local fresco (15°C / 57°F) e seco",
        "Evitar exposição direta à luz solar",
        "Consumir o mais breve possível após abrir o saco"
      ],
      specifications: [
        { key: "Proteína bruta", value: "52% mín." },
        { key: "Gordura bruta", value: "7% mín." },
        { key: "Fibra bruta", value: "3% máx." },
        { key: "Cinza bruta", value: "16% máx." },
        { key: "Umidade", value: "10% máx." },
        { key: "Fósforo", value: "1% mín." },
        { key: "Tamanhos disponíveis", value: "#0: 30–50μm, #1: 80–130μm, #2: 200–300μm" }
      ]
    }
  },

  // Pre-Mix PL Raceway 40-9 - AL019
  "AL019": {
    es: {
      name: "Pre-Mix PL Raceway 40-9",
      description: "Mini pellet formulado especialmente para post-larvas de camarón Penaeus vannamei durante su transición de criaderos controlados a estanques o piscinas con menor productividad primaria. Elaborado por Zeigler Bros. Inc. (EE. UU.), este alimento busca mejorar la aclimatación, crecimiento y supervivencia en los primeros 30 a 45 días de cultivo intensivo.",
      benefits: [
      "Alto contenido de HUFAs (ácidos grasos altamente insaturados) de origen marino de alta calidad",
      "Mejora el rendimiento zootécnico y la calidad del agua",
      "Permite alimentación de precisión por su variedad de tamaños de partícula",
      "Facilita la aclimatación y mejora la supervivencia de las post-larvas"
    ],
      presentation: [
      "Sacos de 20 kg",
      "Vida útil de hasta 24 meses desde la fecha de fabricación",
      "Almacenar en lugar fresco, seco, bien ventilado y protegido de la luz solar",
      "No requiere refrigeración si se mantiene en su empaque original sellado",
      "No requiere condiciones especiales de transporte"
    ],
      specifications: [
      {
        "key": "Proteína cruda",
        "value": "mínimo 40%"
      },
      {
        "key": "Grasa cruda",
        "value": "mínimo 9%"
      },
      {
        "key": "Fibra cruda",
        "value": "máximo 3%"
      },
      {
        "key": "Humedad",
        "value": "máximo 10%"
      },
      {
        "key": "Ceniza",
        "value": "máximo 13%"
      },
      {
        "key": "Fósforo",
        "value": "mínimo 1.1%"
      }
    ]
    },
    en: {
      name: "Pre-Mix PL Raceway 40-9",
      description: "Mini pellet specially formulated for Penaeus vannamei shrimp post-larvae during their transition from controlled nurseries to ponds or pools with lower primary productivity. Manufactured by Zeigler Bros. Inc. (USA), this feed aims to improve acclimatization, growth and survival in the first 30 to 45 days of intensive culture.",
      benefits: [
        "High content of HUFAs (highly unsaturated fatty acids) of high-quality marine origin",
        "Improves zootechnical performance and water quality",
        "Allows precision feeding due to its variety of particle sizes",
        "Facilitates acclimatization and improves post-larval survival"
      ],
      presentation: [
        "20 kg bags",
        "Shelf life up to 24 months from manufacturing date",
        "Store in cool, dry, well-ventilated place protected from sunlight",
        "Does not require refrigeration if kept in original sealed package",
        "Does not require special transport conditions"
      ],
      specifications: [
        { key: "Crude protein", value: "40% min." },
        { key: "Crude fat", value: "9% min." },
        { key: "Crude fiber", value: "3% max." },
        { key: "Moisture", value: "10% max." },
        { key: "Ash", value: "13% max." },
        { key: "Phosphorus", value: "1.1% min." }
      ]
    },
    pt: {
      name: "Pre-Mix PL Raceway 40-9",
      description: "Mini pellet formulado especialmente para pós-larvas de camarão Penaeus vannamei durante sua transição de criatórios controlados para tanques ou piscinas com menor produtividade primária. Elaborado pela Zeigler Bros. Inc. (EUA), este alimento busca melhorar a aclimatação, crescimento e sobrevivência nos primeiros 30 a 45 dias de cultivo intensivo.",
      benefits: [
        "Alto conteúdo de HUFAs (ácidos graxos altamente insaturados) de origem marinha de alta qualidade",
        "Melhora o desempenho zootécnico e a qualidade da água",
        "Permite alimentação de precisão por sua variedade de tamanhos de partícula",
        "Facilita a aclimatação e melhora a sobrevivência das pós-larvas"
      ],
      presentation: [
        "Sacos de 20 kg",
        "Vida útil de até 24 meses desde a data de fabricação",
        "Armazenar em local fresco, seco, bem ventilado e protegido da luz solar",
        "Não requer refrigeração se mantido em sua embalagem original selada",
        "Não requer condições especiais de transporte"
      ],
      specifications: [
        { key: "Proteína bruta", value: "40% mín." },
        { key: "Gordura bruta", value: "9% mín." },
        { key: "Fibra bruta", value: "3% máx." },
        { key: "Umidade", value: "10% máx." },
        { key: "Cinza", value: "13% máx." },
        { key: "Fósforo", value: "1,1% mín." }
      ]
    }
  },

  // Redi-Mate - AL020
  "AL020": {
    es: {
      name: "Redi-Mate",
      description: "Redi-Mate es una dieta semi-húmeda de alta calidad, especialmente formulada para la maduración de camarones peneidos. Mejora significativamente los índices reproductivos, incrementa la producción de nauplios viables y fortalece la bioseguridad del sistema. Contiene Vpak (Vitality Pak) para reforzar la salud y resistencia inmunológica del animal.",
      benefits: [
      "Mejora la eficiencia reproductiva del camarón al aumentar la cantidad y calidad de nauplios, gracias a su alta palatabilidad, bioseguridad y aporte balanceado de nutrientes esenciales como HUFAs, astaxantina y vitaminas. Su formulación semi-húmeda reduce el uso de alimento fresco, mejora la salud gonadal y es compatible con alimentadores automáticos, asegurando mejores resultados en maduración."
    ],
      presentation: [
      "Pellet semi-húmedo en baldes de 15 kg y fundas de 5 kg.",
      "Vida útil: Hasta 2 años desde la fecha de fabricación.",
      "Condiciones: Almacenar en un lugar fresco, seco, ventilado y protegido de la luz solar.",
      "No requiere refrigeración ni condiciones especiales de transporte.",
      "Mantener fuera del alcance de los niños."
    ],
      specifications: [
      {
        "key": "Proteína Cruda",
        "value": "mínimo 40.0%"
      },
      {
        "key": "Grasa Cruda",
        "value": "mínimo 9.0%"
      },
      {
        "key": "Fibra Cruda",
        "value": "máximo 2.0%"
      },
      {
        "key": "Humedad",
        "value": "máximo 30.0%"
      },
      {
        "key": "Ceniza",
        "value": "máximo 10.0%"
      },
      {
        "key": "Fósforo",
        "value": "mínimo 1.0%"
      },
      {
        "key": "Especificación",
        "value": "Dosificar 2.5% a 3.5% de la biomasa por día, ajustando según el consumo observado."
      },
      {
        "key": "Especificación",
        "value": "Por cada 1 kg de Redi-Mate, reducir 3.5 kg de alimento fresco."
      },
      {
        "key": "Especificación",
        "value": "Puede usarse de forma continua con alimentadores automáticos o repartirse en 4 a 6 raciones diarias, alternando con alimentos frescos."
      }
    ]
    },
    en: {
      name: "Redi-Mate",
      description: "Redi-Mate is a high-quality semi-moist diet, specially formulated for peneid shrimp maturation. Significantly improves reproductive indices, increases viable nauplii production and strengthens system biosecurity. Contains Vpak (Vitality Pak) to reinforce animal health and immune resistance.",
      benefits: [
        "Improves shrimp reproductive efficiency by increasing nauplii quantity and quality",
        "High palatability, biosecurity and balanced supply of essential nutrients like HUFAs, astaxanthin and vitamins",
        "Its semi-moist formulation reduces fresh food usage",
        "Improves gonadal health and is compatible with automatic feeders",
        "Ensures better maturation results"
      ],
      presentation: [
        "Semi-moist pellet in 15 kg buckets and 5 kg bags",
        "Shelf life: Up to 2 years from manufacturing date",
        "Store in cool, dry, ventilated place protected from sunlight",
        "Does not require refrigeration or special transport conditions",
        "Keep out of reach of children"
      ],
      specifications: [
        { key: "Crude Protein", value: "40.0% min." },
        { key: "Crude Fat", value: "9.0% min." },
        { key: "Crude Fiber", value: "2.0% max." },
        { key: "Moisture", value: "30.0% max." },
        { key: "Ash", value: "10.0% max." },
        { key: "Phosphorus", value: "1.0% min." },
        { key: "Dosage", value: "2.5% to 3.5% of biomass per day" }
      ]
    },
    pt: {
      name: "Redi-Mate",
      description: "Redi-Mate é uma dieta semi-úmida de alta qualidade, especialmente formulada para maturação de camarões peneídeos. Melhora significativamente os índices reprodutivos, incrementa a produção de náuplios viáveis e fortalece a biossegurança do sistema. Contém Vpak (Vitality Pak) para reforçar a saúde e resistência imunológica do animal.",
      benefits: [
        "Melhora a eficiência reprodutiva do camarão ao aumentar a quantidade e qualidade de náuplios",
        "Alta palatabilidade, biossegurança e aporte balanceado de nutrientes essenciais como HUFAs, astaxantina e vitaminas",
        "Sua formulação semi-úmida reduz o uso de alimento fresco",
        "Melhora a saúde gonadal e é compatível com alimentadores automáticos",
        "Assegura melhores resultados na maturação"
      ],
      presentation: [
        "Pellet semi-úmido em baldes de 15 kg e sacos de 5 kg",
        "Vida útil: Até 2 anos desde a data de fabricação",
        "Armazenar em local fresco, seco, ventilado e protegido da luz solar",
        "Não requer refrigeração nem condições especiais de transporte",
        "Manter fora do alcance das crianças"
      ],
      specifications: [
        { key: "Proteína Bruta", value: "40,0% mín." },
        { key: "Gordura Bruta", value: "9,0% mín." },
        { key: "Fibra Bruta", value: "2,0% máx." },
        { key: "Umidade", value: "30,0% máx." },
        { key: "Cinza", value: "10,0% máx." },
        { key: "Fósforo", value: "1,0% mín." },
        { key: "Dosagem", value: "2,5% a 3,5% da biomassa por dia" }
      ]
    }
  },

  // Shrimp Meal Starter 55-15 - AL021
  "AL021": {
    es: {
      name: "Shrimp Meal Starter 55-15",
      description: "Dieta desarrollada por Zeigler Bros. Inc. (EE. UU.) para raceways y pre-cría de camarones. Se trata de un alimento altamente nutricional, diseñado para favorecer un crecimiento rápido y una aclimatación eficiente de las postlarvas durante su siembra.",
      benefits: [
      "Altos niveles de HUFA (Ácidos Grasos Altamente Insaturados) de origen marino",
      "Reservas nutricionales de rápida disponibilidad que favorecen la aclimatación en siembra",
      "Mejora la tasa de supervivencia al ofrecer un perfil nutricional completo",
      "Micropartículas libres de bacterias patógenas",
      "Óptima digestibilidad que favorece el crecimiento en estadios tempranos de postlarva"
    ],
      presentation: [
      "Baldes de 16.3 kg",
      "Sacos de 20 kg",
      "Vida útil de hasta 24 meses desde la fecha de fabricación",
      "Almacenar en lugar fresco, seco y bien ventilado, protegido de la luz solar y lejos de las paredes",
      "No requiere refrigeración si permanece sellado en su empaque original",
      "No requiere condiciones especiales de transporte"
    ],
      specifications: [
      {
        "key": "Proteína cruda",
        "value": "mínimo 55%"
      },
      {
        "key": "Grasa cruda",
        "value": "mínimo 15%"
      },
      {
        "key": "Fibra cruda",
        "value": "máximo 2%"
      },
      {
        "key": "Humedad",
        "value": "máximo 10%"
      },
      {
        "key": "Ceniza",
        "value": "máximo 12%"
      },
      {
        "key": "Fósforo",
        "value": "mínimo 1.3%"
      },
      {
        "key": "Especificación",
        "value": "Proteínas animales (marinas y terrestres)"
      },
      {
        "key": "Especificación",
        "value": "Proteínas vegetales"
      },
      {
        "key": "Especificación",
        "value": "Subproductos de granos procesados"
      },
      {
        "key": "Especificación",
        "value": "Lecitina"
      },
      {
        "key": "Especificación",
        "value": "Levaduras"
      },
      {
        "key": "Especificación",
        "value": "Conservantes"
      },
      {
        "key": "Especificación",
        "value": "Vitaminas y minerales"
      }
    ]
    },
    en: {
      name: "Shrimp Meal Starter 55-15",
      description: "Diet developed by Zeigler Bros. Inc. (USA) for raceways and shrimp pre-nursery. It is a highly nutritional feed, designed to favor rapid growth and efficient acclimatization of postlarvae during stocking.",
      benefits: [
        "High levels of HUFA (Highly Unsaturated Fatty Acids) of marine origin",
        "Fast-availability nutritional reserves that favor acclimatization during stocking",
        "Improves survival rate by offering a complete nutritional profile",
        "Microparticles free of pathogenic bacteria",
        "Optimal digestibility that favors growth in early postlarval stages"
      ],
      presentation: [
        "16.3 kg buckets",
        "20 kg bags",
        "Shelf life up to 24 months from manufacturing date",
        "Store in cool, dry and well-ventilated place, protected from sunlight and away from walls",
        "Does not require refrigeration if kept sealed in original package",
        "Does not require special transport conditions"
      ],
      specifications: [
        { key: "Crude protein", value: "55% min." },
        { key: "Crude fat", value: "15% min." },
        { key: "Crude fiber", value: "2% max." },
        { key: "Moisture", value: "10% max." },
        { key: "Ash", value: "12% max." },
        { key: "Phosphorus", value: "1.3% min." }
      ]
    },
    pt: {
      name: "Shrimp Meal Starter 55-15",
      description: "Dieta desenvolvida pela Zeigler Bros. Inc. (EUA) para raceways e pré-cria de camarões. Trata-se de um alimento altamente nutricional, projetado para favorecer crescimento rápido e aclimatação eficiente das pós-larvas durante sua estocagem.",
      benefits: [
        "Altos níveis de HUFA (Ácidos Graxos Altamente Insaturados) de origem marinha",
        "Reservas nutricionais de rápida disponibilidade que favorecem a aclimatação na estocagem",
        "Melhora a taxa de sobrevivência ao oferecer perfil nutricional completo",
        "Micropartículas livres de bactérias patogênicas",
        "Ótima digestibilidade que favorece o crescimento em estágios iniciais de pós-larva"
      ],
      presentation: [
        "Baldes de 16,3 kg",
        "Sacos de 20 kg",
        "Vida útil de até 24 meses desde a data de fabricação",
        "Armazenar em local fresco, seco e bem ventilado, protegido da luz solar e longe das paredes",
        "Não requer refrigeração se permanecer selado em sua embalagem original",
        "Não requer condições especiais de transporte"
      ],
      specifications: [
        { key: "Proteína bruta", value: "55% mín." },
        { key: "Gordura bruta", value: "15% mín." },
        { key: "Fibra bruta", value: "2% máx." },
        { key: "Umidade", value: "10% máx." },
        { key: "Cinza", value: "12% máx." },
        { key: "Fósforo", value: "1,3% mín." }
      ]
    }
  },

  // Z Pro (Microparticulados) - AL022
  "AL022": {
    es: {
      name: "Z Pro (Microparticulados)",
      description: "Dieta premium desarrollada por Zeigler Bros. Inc. (EE. UU.), formulada específicamente para la alimentación de camarones desde la fase Zoea (Z) hasta Postlarval (PL). Diseñada para promover un rápido crecimiento y fortalecer el sistema inmunológico, manteniendo la calidad del agua y optimizando la eficiencia proteica en sistemas de cultivo larvario.",
      benefits: [
      "Alta digestibilidad y atractabilidad por su base de proteínas marinas",
      "Mejora el crecimiento y salud larval",
      "Contiene Vpak (Vitality Pak) para aumentar la resistencia a enfermedades",
      "Optimiza el uso proteico sin comprometer la calidad del agua",
      "Empaque con nitrógeno para asegurar estabilidad y seguridad del producto"
    ],
      presentation: [
      "Dieta seca",
      "Z PRO 150: Latas de 500 g envasadas con nitrógeno",
      "Z PRO 250 y 350: Fundas de 4 kg envasadas con nitrógeno"
    ],
      specifications: [
      {
        "key": "Proteína cruda",
        "value": "mínimo 44%"
      },
      {
        "key": "Grasa cruda",
        "value": "mínimo 8.0%"
      },
      {
        "key": "Fibra cruda",
        "value": "máximo 2.0%"
      },
      {
        "key": "Humedad",
        "value": "máximo 12.0%"
      },
      {
        "key": "Ceniza",
        "value": "máximo 13.0%"
      },
      {
        "key": "Fósforo",
        "value": "mínimo 1.0%"
      },
      {
        "key": "Especificación",
        "value": "Proteínas marinas y vegetales"
      },
      {
        "key": "Especificación",
        "value": "Lecitina"
      },
      {
        "key": "Especificación",
        "value": "Levadura"
      },
      {
        "key": "Especificación",
        "value": "Subproductos de granos procesados"
      },
      {
        "key": "Especificación",
        "value": "Aminoácidos"
      },
      {
        "key": "Especificación",
        "value": "Minerales y vitaminas"
      },
      {
        "key": "Especificación",
        "value": "Conservantes"
      },
      {
        "key": "Almacenamiento",
        "value": ""
      },
      {
        "key": "Especificación",
        "value": "Conservar en lugar fresco (22 °C), seco, ventilado y sin exposición directa al sol"
      },
      {
        "key": "Especificación",
        "value": "El almacenamiento refrigerado o congelado prolonga su vida útil"
      },
      {
        "key": "Latas abiertas",
        "value": "conservar bien cerradas a 20 °C o menos"
      }
    ]
    },
    en: {
      name: "Z Pro (Microparticulated)",
      description: "Premium diet developed by Zeigler Bros. Inc. (USA), specifically formulated for feeding shrimp from Zoea (Z) to Postlarval (PL) phase. Designed to promote rapid growth and strengthen the immune system, maintaining water quality and optimizing protein efficiency in larval culture systems.",
      benefits: [
        "High digestibility and attractability due to its marine protein base",
        "Improves larval growth and health",
        "Contains Vpak (Vitality Pak) to increase disease resistance",
        "Optimizes protein use without compromising water quality",
        "Nitrogen packaging to ensure product stability and safety"
      ],
      presentation: [
        "Dry diet",
        "Z PRO 150: 500 g cans packed with nitrogen",
        "Z PRO 250 and 350: 4 kg bags packed with nitrogen",
        "Store in cool place (22°C), dry, ventilated and without direct sun exposure",
        "Refrigerated or frozen storage prolongs shelf life",
        "Opened cans: keep tightly closed at 20°C or less"
      ],
      specifications: [
        { key: "Crude protein", value: "44% min." },
        { key: "Crude fat", value: "8.0% min." },
        { key: "Crude fiber", value: "2.0% max." },
        { key: "Moisture", value: "12.0% max." },
        { key: "Ash", value: "13.0% max." },
        { key: "Phosphorus", value: "1.0% min." }
      ]
    },
    pt: {
      name: "Z Pro (Microparticulado)",
      description: "Dieta premium desenvolvida pela Zeigler Bros. Inc. (EUA), formulada especificamente para alimentação de camarões desde a fase Zoea (Z) até Pós-larval (PL). Projetada para promover crescimento rápido e fortalecer o sistema imunológico, mantendo a qualidade da água e otimizando a eficiência proteíca em sistemas de cultivo larval.",
      benefits: [
        "Alta digestibilidade e atratividade por sua base de proteínas marinhas",
        "Melhora o crescimento e saúde larval",
        "Contém Vpak (Vitality Pak) para aumentar a resistência a doenças",
        "Otimiza o uso proteíco sem comprometer a qualidade da água",
        "Embalagem com nitrogênio para assegurar estabilidade e segurança do produto"
      ],
      presentation: [
        "Dieta seca",
        "Z PRO 150: Latas de 500 g embaladas com nitrogênio",
        "Z PRO 250 e 350: Sacos de 4 kg embalados com nitrogênio",
        "Conservar em local fresco (22°C), seco, ventilado e sem exposição direta ao sol",
        "O armazenamento refrigerado ou congelado prolonga sua vida útil",
        "Latas abertas: conservar bem fechadas a 20°C ou menos"
      ],
      specifications: [
        { key: "Proteína bruta", value: "44% mín." },
        { key: "Gordura bruta", value: "8,0% mín." },
        { key: "Fibra bruta", value: "2,0% máx." },
        { key: "Umidade", value: "12,0% máx." },
        { key: "Cinza", value: "13,0% máx." },
        { key: "Fósforo", value: "1,0% mín." }
      ]
    }
  },

  // ZM Feed para Zoea / Mysis - AL023
  "AL023": {
    es: {
      name: "ZM Feed para Zoea / Mysis",
      description: "ZM FEED es una dieta microparticulada especialmente formulada para la alimentación de larvas de camarón en las etapas Zoea y Mysis, diseñada para su aplicación en tanques de laboratorio. Elaborado en Japón, este alimento combina ingredientes marinos de alta calidad y aditivos esenciales para garantizar un óptimo desarrollo larval. Su formulación equilibrada cumple con los requerimientos nutricionales de los primeros estadios del P. vannamei. Hecho en Japón.",
      benefits: [
      "Óptimo desarrollo larval en etapas Zoea y Mysis",
      "Formulación equilibrada según requerimientos nutricionales del P. vannamei",
      "Microparticulado facilita la ingesta en estadios larvales tempranos",
      "Tecnología japonesa de fabricación",
      "Mejora supervivencia y crecimiento larval"
    ],
      presentation: [
      "Producto importado de Japón. Presentación en envases apropiados para uso en laboratorio de larvas."
    ],
      specifications: [
      {
        "key": "Especificación",
        "value": "Especialmente diseñado para larvas en etapas Zoea y Mysis"
      },
      {
        "key": "Especificación",
        "value": "Uso en tanques de laboratorio"
      },
      {
        "key": "Especificación",
        "value": "Formulación microparticulada de origen japonés"
      },
      {
        "key": "Especificación",
        "value": "Ingredientes marinos de alta calidad"
      },
      {
        "key": "Especificación",
        "value": "COMPOSICIÓN"
      },
      {
        "key": "Especificación",
        "value": "Proteínas marinas seleccionadas"
      },
      {
        "key": "Especificación",
        "value": "Aditivos esenciales para desarrollo larval"
      },
      {
        "key": "Especificación",
        "value": "Micronutrientes específicos para P. vannamei"
      }
    ]
    },
    en: {
      name: "ZM Feed for Zoea / Mysis",
      description: "ZM FEED is a microparticulated diet specially formulated for feeding shrimp larvae in Zoea and Mysis stages, designed for application in laboratory tanks. Made in Japan, this feed combines high-quality marine ingredients and essential additives to guarantee optimal larval development. Its balanced formulation meets the nutritional requirements of P. vannamei early stages.",
      benefits: [
        "Optimal larval development in Zoea and Mysis stages",
        "Balanced formulation according to P. vannamei nutritional requirements",
        "High-quality marine ingredients guarantee nutritional absorption",
        "Microparticulated facilitates intake in early larval stages",
        "Japanese manufacturing technology",
        "Improves larval survival and growth"
      ],
      presentation: [
        "Product imported from Japan",
        "Presentation in appropriate containers for larval laboratory use",
        "Specially designed for larvae in Zoea and Mysis stages",
        "Use in laboratory tanks"
      ],
      specifications: [
        { key: "Origin", value: "Made in Japan" },
        { key: "Application", value: "Zoea and Mysis stages" },
        { key: "Type", value: "Microparticulated" },
        { key: "Ingredients", value: "Selected marine proteins" },
        { key: "Additives", value: "Essential for larval development" },
        { key: "Micronutrients", value: "Specific for P. vannamei" }
      ]
    },
    pt: {
      name: "ZM Feed para Zoea / Mysis",
      description: "ZM FEED é uma dieta microparticulada especialmente formulada para alimentação de larvas de camarão nos estágios Zoea e Mysis, projetada para aplicação em tanques de laboratório. Elaborado no Japão, este alimento combina ingredientes marinhos de alta qualidade e aditivos essenciais para garantir desenvolvimento larval ótimo. Sua formulação equilibrada atende aos requisitos nutricionais dos primeiros estágios do P. vannamei.",
      benefits: [
        "Desenvolvimento larval ótimo em estágios Zoea e Mysis",
        "Formulação equilibrada segundo requisitos nutricionais do P. vannamei",
        "Ingredientes marinhos de alta qualidade garantem absorção nutricional",
        "Microparticulado facilita a ingestão em estágios larvais iniciais",
        "Tecnologia japonesa de fabricação",
        "Melhora sobrevivência e crescimento larval"
      ],
      presentation: [
        "Produto importado do Japão",
        "Apresentação em recipientes apropriados para uso em laboratório de larvas",
        "Especialmente projetado para larvas em estágios Zoea e Mysis",
        "Uso em tanques de laboratório"
      ],
      specifications: [
        { key: "Origem", value: "Fabricado no Japão" },
        { key: "Aplicação", value: "Estágios Zoea e Mysis" },
        { key: "Tipo", value: "Microparticulado" },
        { key: "Ingredientes", value: "Proteínas marinhas selecionadas" },
        { key: "Aditivos", value: "Essenciais para desenvolvimento larval" },
        { key: "Micronutrientes", value: "Específicos para P. vannamei" }
      ]
    }
  },

  // ========== EQUIPOS CATEGORY ==========

  // Ammo Lock - EQ001
  "EQ001": {
    es: {
      name: "Ammo Lock",
      description: "El amonio es un compuesto tóxico para los cultivos acuícolas porque ocasiona: Daños severos en las branquias, problemas en la osmorregulación, desgaste en los tejidos, disminución de la tasa de crecimiento e incluso mortalidades. Por ello, se elaboró AMMO LOCK, desintoxicante que tiene la capacidad de convertir el amonio en una forma no tóxica y evitar perjuicios por este compuesto dentro del estanque.",
      benefits: [
      "Actúa contrarrestando el efecto de cloro y cloraminas.",
      "Está avalado por la Universidad de Georgia, Escuela de Medicina Veterinaria,",
      "Departamento de Microbiología Médica."
    ],
      presentation: [
      "Líquido. Envases de: 16 oz"
    ],
      specifications: [
      {
        "key": "VOLUMEN DE AGUA",
        "value": "10 galones DOSIS SUGERIDA: 5 mL"
      },
      {
        "key": "VOLUMEN DE AGUA",
        "value": "1 tonelada DOSIS SUGERIDA: 125 mL"
      }
    ]
    },
    en: {
      name: "Ammo Lock",
      description: "Ammonia is a toxic compound for aquaculture crops because it causes: Severe damage to gills, osmoregulation problems, tissue wear, decreased growth rate and even mortality. Therefore, AMMO LOCK was developed, a detoxifier that has the ability to convert ammonia into a non-toxic form and prevent damage from this compound within the pond.",
      benefits: [
        "Acts by counteracting the effect of chlorine and chloramines",
        "Endorsed by the University of Georgia, School of Veterinary Medicine, Department of Medical Microbiology",
        "Converts ammonia into a non-toxic form",
        "Prevents ammonia damage within the pond"
      ],
      presentation: [
        "Liquid. 16 oz containers"
      ],
      specifications: [
        { key: "Dose for 10 gallons", value: "5 mL" },
        { key: "Dose for 1 ton", value: "125 mL" }
      ]
    },
    pt: {
      name: "Ammo Lock",
      description: "A amônia é um composto tóxico para cultivos aquícolas porque causa: Danos severos nas brânquias, problemas na osmorregulação, desgaste nos tecidos, diminuição da taxa de crescimento e até mortalidade. Por isso, foi desenvolvido AMMO LOCK, desintoxicante que tem a capacidade de converter a amônia em forma não tóxica e evitar prejuízos por este composto dentro do tanque.",
      benefits: [
        "Atua neutralizando o efeito do cloro e cloraminas",
        "Avalizado pela Universidade da Geórgia, Escola de Medicina Veterinária, Departamento de Microbiologia Médica",
        "Converte a amônia em forma não tóxica",
        "Evita prejuízos por amônia dentro do tanque"
      ],
      presentation: [
        "Líquido. Recipientes de: 16 oz"
      ],
      specifications: [
        { key: "Dose para 10 galões", value: "5 mL" },
        { key: "Dose para 1 tonelada", value: "125 mL" }
      ]
    }
  },

  // Balanzas Ohaus - EQ002
  "EQ002": {
    es: {
      name: "Balanzas Ohaus",
      description: "Balanzas OHAUS de diferentes dimensiones y capacidades bajo pedido.",
      benefits: [],
      presentation: [
      "Balanza Scout Pro 400 x 0.1 g.",
      "Balanza Scout Pro 600 x 0.1 g.",
      "Balanza Scout Pro 2000 x 0.1 g.",
      "Balanza Scout Pro 1200 x 0.1 g.",
      "Balanza Triple Brazo con Dia"
    ],
      specifications: [
      {
        "key": "Especificación",
        "value": "Pantalla LCD de alto contraste que indica claramente datos de peso y"
      },
      {
        "key": "Especificación",
        "value": "baterías."
      },
      {
        "key": "Especificación",
        "value": "Botones para su fácil operación."
      },
      {
        "key": "Especificación",
        "value": "Platillo redondo o cuadrado de acero inoxidable."
      },
      {
        "key": "Especificación",
        "value": "Gancho integrado para pesar por debajo de la balanza."
      },
      {
        "key": "Especificación",
        "value": "Conectividad USB o RS232 opcionales."
      },
      {
        "key": "Especificación",
        "value": "Soporte de seguridad integral."
      },
      {
        "key": "Especificación",
        "value": "Apagado automático."
      }
    ]
    },
    en: {
      name: "Ohaus Scales",
      description: "OHAUS scales of different dimensions and capacities on request.",
      benefits: [
        "High contrast LCD display that clearly indicates weight data and applications",
        "Stability indicators, overload conditions and battery status",
        "Buttons for easy operation",
        "Round or square stainless steel pan",
        "Integrated hook for under-scale weighing",
        "Optional USB or RS232 connectivity",
        "Integral security bracket",
        "Automatic shutdown"
      ],
      presentation: [
        "Scout Pro 400 x 0.1 g Scale",
        "Scout Pro 600 x 0.1 g Scale",
        "Scout Pro 2000 x 0.1 g Scale",
        "Scout Pro 1200 x 0.1 g Scale",
        "Triple Beam Scale with Dia"
      ],
      specifications: [
        { key: "Display", value: "High contrast LCD" },
        { key: "Pan material", value: "Stainless steel" },
        { key: "Connectivity", value: "Optional USB or RS232" },
        { key: "Functions", value: "Automatic shutdown" }
      ]
    },
    pt: {
      name: "Balanças Ohaus",
      description: "Balanças OHAUS de diferentes dimensões e capacidades sob encomenda.",
      benefits: [
        "Display LCD de alto contraste que indica claramente dados de peso e aplicações",
        "Indicadores de estabilidade, condições de sobrecarga e estado das baterias",
        "Botões para fácil operação",
        "Prato redondo ou quadrado de aço inoxidável",
        "Gancho integrado para pesar por baixo da balança",
        "Conectividade USB ou RS232 opcionais",
        "Suporte de segurança integral",
        "Desligamento automático"
      ],
      presentation: [
        "Balança Scout Pro 400 x 0,1 g",
        "Balança Scout Pro 600 x 0,1 g",
        "Balança Scout Pro 2000 x 0,1 g",
        "Balança Scout Pro 1200 x 0,1 g",
        "Balança Triplo Braço com Dia"
      ],
      specifications: [
        { key: "Display", value: "LCD de alto contraste" },
        { key: "Material do prato", value: "Aço inoxidável" },
        { key: "Conectividade", value: "USB ou RS232 opcional" },
        { key: "Funções", value: "Desligamento automático" }
      ]
    }
  },

  // Blowers All Star - EQ003
  "EQ003": {
    es: {
      name: "Blowers All Star",
      description: "",
      benefits: [
      "Rendimiento de alta eficiencia",
      "Motor AC de jaula de 2 polos IP 54 TEFC",
      "Aislamiento clase H"
    ],
      presentation: [],
      specifications: []
    },
    en: {
      name: "All Star Blowers",
      description: "High efficiency blowers for aquaculture applications.",
      benefits: [
        "High efficiency performance",
        "2-pole squirrel cage AC motor IP 54 TEFC",
        "Class H insulation"
      ],
      presentation: [
        "Available in different models"
      ],
      specifications: [
        { key: "Motor", value: "2-pole squirrel cage AC" },
        { key: "Protection", value: "IP 54 TEFC" },
        { key: "Insulation", value: "Class H" },
        { key: "Performance", value: "High efficiency" }
      ]
    },
    pt: {
      name: "Sopradores All Star",
      description: "Sopradores de alta eficiência para aplicações aquícolas.",
      benefits: [
        "Desempenho de alta eficiência",
        "Motor AC gaiola de esquilo 2 polos IP 54 TEFC",
        "Isolamento classe H"
      ],
      presentation: [
        "Disponíveis em diferentes modelos"
      ],
      specifications: [
        { key: "Motor", value: "AC gaiola de esquilo 2 polos" },
        { key: "Proteção", value: "IP 54 TEFC" },
        { key: "Isolamento", value: "Classe H" },
        { key: "Desempenho", value: "Alta eficiência" }
      ]
    }
  },

  // Blowers Gast - EQ004
  "EQ004": {
    es: {
      name: "Blowers Gast",
      description: "Modelos con motor estándar.",
      benefits: [
      "Construcción robusta de aluminio y hierro fundido.",
      "Contienen una nueva grasa de poliurea que extiende la vida del rodamiento y",
      "ofrece una resistencia superior al lavado, oxidación y corrosión.",
      "Motores multi-voltaje a prueba de explosiones."
    ],
      presentation: [],
      specifications: []
    },
    en: {
      name: "Gast Blowers",
      description: "Models with standard motor.",
      benefits: [
        "Robust construction of aluminum and cast iron",
        "Contains new polyurea grease that extends bearing life",
        "Offers superior resistance to washdown, oxidation and corrosion",
        "Multi-voltage explosion-proof motors"
      ],
      presentation: [
        "Models with standard motor",
        "Available in different configurations"
      ],
      specifications: [
        { key: "Construction", value: "Aluminum and cast iron" },
        { key: "Lubrication", value: "Polyurea grease" },
        { key: "Motor", value: "Multi-voltage explosion-proof" },
        { key: "Resistance", value: "Superior to washdown and corrosion" }
      ]
    },
    pt: {
      name: "Sopradores Gast",
      description: "Modelos com motor padrão.",
      benefits: [
        "Construção robusta de alumínio e ferro fundido",
        "Contém nova graxa de poliureia que estende a vida do rolamento",
        "Oferece resistência superior à lavagem, oxidação e corrosão",
        "Motores multi-voltagem à prova de explosão"
      ],
      presentation: [
        "Modelos com motor padrão",
        "Disponíveis em diferentes configurações"
      ],
      specifications: [
        { key: "Construção", value: "Alumínio e ferro fundido" },
        { key: "Lubrificação", value: "Graxa de poliureia" },
        { key: "Motor", value: "Multi-voltagem à prova de explosão" },
        { key: "Resistência", value: "Superior à lavagem e corrosão" }
      ]
    }
  },

  // Bolso Filtrantes de Polipropileno - EQ005
  "EQ005": {
    es: {
      name: "Bolso Filtrantes de Polipropileno",
      description: "El proceso de líquidos con bolsas filtrantes funciona como un filtro de\nprofundidad y es muy recomendable para filtrar líquidos con un gran número de\npartículas sólidas o gelatinosas. En un filtro de profundidad, el área disponible para la retención de sólidos no\nes solo la superficie del elemento de filtro, también actúa el grosor del medio\nfiltrante a través del cual se pasa.",
      benefits: [
      "Su principal ventaja, es su alta capacidad de retención de partículas y su alto",
      "flujo. Siendo una de las mejores soluciones económicas para muchas"
    ],
      presentation: [
      "Bolso filtrante corto 1 micra.",
      "Bolso filtrante largo 1 micra.",
      "Bolso filtrante corto 5 micras.",
      "Bolso filtrante largo 5 micras.",
      "Bolso filtrante largo 10 micras.",
      "Bolso filtrante largo 50 micras."
    ],
      specifications: [
      {
        "key": "Especificación",
        "value": "Clasificaciones de filtración de 1 - 5 - 10 - 50 micras."
      },
      {
        "key": "Especificación",
        "value": "Alta capacidad de retención."
      },
      {
        "key": "Especificación",
        "value": "Amplia compatibilidad química."
      },
      {
        "key": "Especificación",
        "value": "Filtración económica."
      },
      {
        "key": "Material principal de fabricación",
        "value": "Polipropileno."
      }
    ]
    },
    en: {
      name: "Filter Bags Polypropylene",
      description: "Liquid processing with filter bags works as a depth filter and is highly recommended for filtering liquids with a large number of solid or gelatinous particles. In a depth filter, the area available for solid retention is not only the surface of the filter element, but also the thickness of the filter medium through which it passes.",
      benefits: [
        "Its main advantage is its high particle retention capacity and high flow",
        "One of the best economical solutions for many liquid filtration applications",
        "High retention capacity",
        "Broad chemical compatibility",
        "Economical filtration"
      ],
      presentation: [
        "Short filter bag 1 micron",
        "Long filter bag 1 micron",
        "Short filter bag 5 microns",
        "Long filter bag 5 microns",
        "Long filter bag 10 microns",
        "Long filter bag 50 microns"
      ],
      specifications: [
        { key: "Filtration ratings", value: "1 - 5 - 10 - 50 microns" },
        { key: "Main material", value: "Polypropylene" },
        { key: "Retention capacity", value: "High" },
        { key: "Chemical compatibility", value: "Broad" }
      ]
    },
    pt: {
      name: "Sacos Filtrantes de Polipropileno",
      description: "O processamento de líquidos com sacos filtrantes funciona como filtro de profundidade e é altamente recomendável para filtrar líquidos com grande número de partículas sólidas ou gelatinosas. Em filtro de profundidade, a área disponível para retenção de sólidos não é apenas a superfície do elemento filtrante, mas também a espessura do meio filtrante pelo qual passa.",
      benefits: [
        "Sua principal vantagem é sua alta capacidade de retenção de partículas e alto fluxo",
        "Uma das melhores soluções econômicas para muitas aplicações de filtração de líquidos",
        "Alta capacidade de retenção",
        "Ampla compatibilidade química",
        "Filtração econômica"
      ],
      presentation: [
        "Saco filtrante curto 1 micra",
        "Saco filtrante longo 1 micra",
        "Saco filtrante curto 5 micras",
        "Saco filtrante longo 5 micras",
        "Saco filtrante longo 10 micras",
        "Saco filtrante longo 50 micras"
      ],
      specifications: [
        { key: "Classificações de filtração", value: "1 - 5 - 10 - 50 micras" },
        { key: "Material principal", value: "Polipropileno" },
        { key: "Capacidade de retenção", value: "Alta" },
        { key: "Compatibilidade química", value: "Ampla" }
      ]
    }
  },

  // ========== PROBIÓTICOS CATEGORY ==========

  // Hatchery Prime - PB001
  "PB001": {
    es: {
      name: "Hatchery Prime",
      description: "Es un producto de biorremediación utilizado en los criaderos de acuicultura para mejorar la calidad del agua y reducir los patógenos que alteran las condiciones del ambiente, estimulando el crecimiento de microorganismos para degradar contaminantes.",
      benefits: [
      "Disminuye amoníaco para mejorar la calidad del agua.",
      "Inhíbe, suprime y excluye competitivamente las bacterias patógenas, incluido el Vibrio.",
      "Contiene bacterias esporuladas no patógenas para garantizar altas concentraciones de bacterias vivas.",
      "Se puede aplicar durante la preparación o con poblaciones de organismos (camarones o peces).",
      "Actúa en agua dulce, salobre y salada."
    ],
      presentation: [
      "PRESENTACIÓN Y ALMACENAMIENTO",
      "Tachos de 3kg, tabletas de 3gr de color blanco-amarillento. Almacenar en un lugar fresco, seco, bien ventilado, no exponer a la luz solar y alejarlo de las paredes.",
      "No requiere de Refrigeración.",
      "No requiere condiciones especiales de transporte.",
      "APLICACIÓN",
      "Para uso en acuacultura, para mejorar la calidad del agua y reducir los patógenos. No apto para consumo humano.",
      "Dosis recomendadas:"
    ],
      specifications: [
      {
        "key": "Especificación",
        "value": "Conteo de bacterias.\t1,00 X 109 ufc/g"
      },
      {
        "key": "Especificación",
        "value": "Bacillus amyloliquefaciens\t1,00 X 10 9ufc/g"
      },
      {
        "key": "Especificación",
        "value": "Bacillus licheniformis\t1,00 X 109ufc/g"
      },
      {
        "key": "Especificación",
        "value": "Bacillus polymyxa\t1,00 X 109 ufc/g"
      },
      {
        "key": "Especificación",
        "value": "Bacillus pumilus\t2,00 X 109 ufc/g"
      },
      {
        "key": "Especificación",
        "value": "Carrier.\t90% Cloruro de sodio"
      },
      {
        "key": "Especificación",
        "value": "ESPECIFICACIONES DEL PRODUCTO"
      },
      {
        "key": "Especificación",
        "value": "Conteo de bacterias.\t5,00 x 109 ufc/g"
      },
      {
        "key": "Especificación",
        "value": "pH.\tNeutro"
      },
      {
        "key": "Especificación",
        "value": "Rango eficaz del pH .......................... 5,8 - 10,5"
      },
      {
        "key": "Especificación",
        "value": "Tiempo de vida útil ............................ 5,8 - 10,5"
      },
      {
        "key": "Especificación",
        "value": "Temperatura eficaz\t.. 10 - 30°C"
      }
    ]
    },
    en: {
      name: "Hatchery Prime",
      description: "It is a bioremediation product used in aquaculture hatcheries to improve water quality and reduce pathogens that alter environmental conditions, stimulating the growth of microorganisms to degrade contaminants.",
      benefits: [
        "Decreases ammonia to improve water quality",
        "Inhibits, suppresses and competitively excludes pathogenic bacteria, including Vibrio",
        "Contains non-pathogenic spore bacteria to ensure high concentrations of live bacteria",
        "Can be applied during preparation or with organism populations (shrimp or fish)",
        "Works in fresh, brackish and salt water"
      ],
      presentation: [
        "3kg buckets, 3gr white-yellowish tablets",
        "Store in cool, dry, well-ventilated place, do not expose to sunlight and keep away from walls",
        "Does not require refrigeration",
        "Does not require special transport conditions",
        "For aquaculture use, not suitable for human consumption"
      ],
      specifications: [
        { key: "Bacterial count", value: "5.00 x 10^9 cfu/g" },
        { key: "Bacillus amyloliquefaciens", value: "1.00 X 10^9 cfu/g" },
        { key: "Bacillus licheniformis", value: "1.00 X 10^9 cfu/g" },
        { key: "Bacillus polymyxa", value: "1.00 X 10^9 cfu/g" },
        { key: "Bacillus pumilus", value: "2.00 X 10^9 cfu/g" },
        { key: "pH", value: "Neutral" },
        { key: "Effective pH range", value: "5.8 - 10.5" },
        { key: "Effective temperature", value: "10 - 30°C" }
      ]
    },
    pt: {
      name: "Hatchery Prime",
      description: "É um produto de biorremediação utilizado em incubatórios de aquicultura para melhorar a qualidade da água e reduzir patógenos que alteram as condições ambientais, estimulando o crescimento de microrganismos para degradar contaminantes.",
      benefits: [
        "Diminui amônia para melhorar a qualidade da água",
        "Inibe, suprime e exclui competitivamente bactérias patogênicas, incluindo Vibrio",
        "Contém bactérias esporuladas não patogênicas para garantir altas concentrações de bactérias vivas",
        "Pode ser aplicado durante a preparação ou com populações de organismos (camarões ou peixes)",
        "Atua em água doce, salobra e salgada"
      ],
      presentation: [
        "Baldes de 3kg, comprimidos de 3gr de cor branco-amarelada",
        "Armazenar em local fresco, seco, bem ventilado, não expor à luz solar e manter longe das paredes",
        "Não requer refrigeração",
        "Não requer condições especiais de transporte",
        "Para uso em aquicultura, não adequado para consumo humano"
      ],
      specifications: [
        { key: "Contagem de bactérias", value: "5,00 x 10^9 ufc/g" },
        { key: "Bacillus amyloliquefaciens", value: "1,00 X 10^9 ufc/g" },
        { key: "Bacillus licheniformis", value: "1,00 X 10^9 ufc/g" },
        { key: "Bacillus polymyxa", value: "1,00 X 10^9 ufc/g" },
        { key: "Bacillus pumilus", value: "2,00 X 10^9 ufc/g" },
        { key: "pH", value: "Neutro" },
        { key: "Faixa eficaz de pH", value: "5,8 - 10,5" },
        { key: "Temperatura eficaz", value: "10 - 30°C" }
      ]
    }
  },

  // PondToss - PB002
  "PB002": {
    es: {
      name: "PondToss",
      description: "PondToss son premezclas de bacterias de diferentes usos, las\ncuales sirven para degradar desechos orgánicamente sano para el\ncultivo de camarones o peces. Se compone de cepas de bacterias\nliofilizadas, las cuales son microorganismos encargados de digerir\naltas concentraciones de materia orgánica de una manera segura y\nnatural, red",
      benefits: [
      "Produce péptidos que ayudan a combatir a los patógenos negativos como vibrios.",
      "Produce Bio-Floc como alimento proteinizado mientras controla los componentes del agua.",
      "Coloniza el tracto digestivo de los organismos.",
      "Mejora el crecimiento, supervivencia y conversión alimenticia en camarones y peces.",
      "Reduce la demanda biológica de oxígeno (DBO).",
      "Elimina sabores y olores desagradables.",
      "Se puede aplicar durante la preparación de los estanques o durante el cultivo."
    ],
      presentation: [
      "PRESENTACIÓN Y ALMACENAMIENTO",
      "Presentación de 1 kilo en 4 fundas biodegradables de 250gr c/u. Almacenar en un lugar fresco, seco, bien ventilado, no exponer a la luz solar y alejarlo de las paredes. No requiere de Refrigeración. No requiere condiciones especiales de transporte.",
      "APLICACIÓN",
      "Laboratorio:",
      "3gr./ton cada 6 - 8 horas.",
      "Camaronera:",
      "Dosis inicial: 1 kg./ha una vez por dos semanas. Mantenimiento: 0,5 kg./ha semana, durante el ciclo de engorde.",
      "*Para eliminar el mal sabor del camarón: 1 kg/ha, dos días antes de cosecha."
    ],
      specifications: [
      {
        "key": "Concentración",
        "value": "4% UFC"
      },
      {
        "key": "Especificación",
        "value": "Bacillus pumilus\t4.95 x 108 cfu/g"
      },
      {
        "key": "Especificación",
        "value": "Bacillus subtilis\t7.70 x 108 cfu/g"
      },
      {
        "key": "Especificación",
        "value": "Bacillus amyloliquefaciens\t7.15 x 108 cfu/g"
      },
      {
        "key": "Especificación",
        "value": "Bacillus licheniformis\t2.20 x 108 cfu/g"
      },
      {
        "key": "Especificación",
        "value": "Aminoácidos.\t24,2%"
      },
      {
        "key": "Especificación",
        "value": "Micronutrientes Trazas.\t2,7%"
      },
      {
        "key": "Especificación",
        "value": "Carrier.\tDestilado de maiz."
      },
      {
        "key": "Especificación",
        "value": "ESPECIFICACIONES DEL PRODUCTO"
      },
      {
        "key": "Especificación",
        "value": "Conteo de bacterias\t6 x 10"
      },
      {
        "key": "Especificación",
        "value": "Aspecto\tGranulado color canela"
      },
      {
        "key": "Especificación",
        "value": "Olor\tLevadura"
      },
      {
        "key": "Especificación",
        "value": "pH.\tNeutro"
      },
      {
        "key": "Especificación",
        "value": "Rango eficaz del pH\t5.8 a 10.5"
      },
      {
        "key": "Especificación",
        "value": "Tiempo de vida útil\t3 años"
      },
      {
        "key": "Especificación",
        "value": "Rango eficaz de temperatura\t10° a 38°C (50° a 100° F)"
      },
      {
        "key": "Especificación",
        "value": "Actúa en agua dulce, salobre y salada."
      }
    ]
    },
    en: {
      name: "PondToss",
      description: "PondToss are bacterial premixes for different uses, which serve to degrade waste organically healthy for shrimp or fish culture. It is composed of freeze-dried bacterial strains, which are microorganisms responsible for digesting high concentrations of organic matter in a safe and natural way.",
      benefits: [
        "Produces peptides that help fight negative pathogens like vibrios",
        "Produces Bio-Floc as proteinized food while controlling water components",
        "Colonizes the digestive tract of organisms",
        "Improves growth, survival and feed conversion in shrimp and fish",
        "Reduces biological oxygen demand (BOD)",
        "Eliminates unpleasant tastes and odors",
        "Can be applied during pond preparation or during culture"
      ],
      presentation: [
        "1 kilo presentation in 4 biodegradable bags of 250gr each",
        "Store in cool, dry, well-ventilated place, do not expose to sunlight and keep away from walls",
        "Does not require refrigeration",
        "Does not require special transport conditions"
      ],
      specifications: [
        { key: "Bacillus pumilus", value: "4.95 x 10^8 cfu/g" },
        { key: "Bacillus subtilis", value: "7.70 x 10^8 cfu/g" },
        { key: "Bacillus amyloliquefaciens", value: "7.15 x 10^8 cfu/g" },
        { key: "Bacillus licheniformis", value: "2.20 x 10^8 cfu/g" },
        { key: "Amino acids", value: "24.2%" },
        { key: "Trace micronutrients", value: "2.7%" },
        { key: "Appearance", value: "Cinnamon-colored granules" },
        { key: "pH", value: "Neutral" },
        { key: "Effective pH range", value: "5.8 to 10.5" },
        { key: "Shelf life", value: "3 years" },
        { key: "Effective temperature", value: "10° to 38°C" }
      ]
    },
    pt: {
      name: "PondToss",
      description: "PondToss são pré-misturas de bactérias de diferentes usos, que servem para degradar resíduos organicamente saudáveis para cultivo de camarões ou peixes. Compõe-se de cepas de bactérias liofilizadas, que são microrganismos encarregados de digerir altas concentrações de matéria orgânica de forma segura e natural.",
      benefits: [
        "Produz peptídeos que ajudam a combater patógenos negativos como vibrios",
        "Produz Bio-Floc como alimento proteinizado enquanto controla os componentes da água",
        "Coloniza o trato digestivo dos organismos",
        "Melhora o crescimento, sobrevivência e conversão alimentar em camarões e peixes",
        "Reduz a demanda biológica de oxigênio (DBO)",
        "Elimina sabores e odores desagradáveis",
        "Pode ser aplicado durante a preparação dos tanques ou durante o cultivo"
      ],
      presentation: [
        "Apresentação de 1 quilo em 4 sacos biodegradáveis de 250gr cada",
        "Armazenar em local fresco, seco, bem ventilado, não expor à luz solar e manter longe das paredes",
        "Não requer refrigeração",
        "Não requer condições especiais de transporte"
      ],
      specifications: [
        { key: "Bacillus pumilus", value: "4,95 x 10^8 ufc/g" },
        { key: "Bacillus subtilis", value: "7,70 x 10^8 ufc/g" },
        { key: "Bacillus amyloliquefaciens", value: "7,15 x 10^8 ufc/g" },
        { key: "Bacillus licheniformis", value: "2,20 x 10^8 ufc/g" },
        { key: "Aminoácidos", value: "24,2%" },
        { key: "Micronutrientes traço", value: "2,7%" },
        { key: "Aparência", value: "Granulado cor canela" },
        { key: "pH", value: "Neutro" },
        { key: "Faixa eficaz de pH", value: "5,8 a 10,5" },
        { key: "Vida útil", value: "3 anos" },
        { key: "Temperatura eficaz", value: "10° a 38°C" }
      ]
    }
  },

  // Terminate - PB003
  "PB003": {
    es: {
      name: "Terminate",
      description: "Terminate es una mezcla que contiene cuatro tipos de bacterias\nliofilizadas de diferentes usos, las cuales sirven para mejorar la\nsalud del animal, y promover un medio sano para el cultivo de\ncamarones o peces. Contiene aminoácidos y minerales.",
      benefits: [
      "Disminuye niveles de metabolitos tóxicos tales como amonio, nitrito y otros gases nocivos.",
      "Disuelve materia en descomposición, alimento no consumido y demás material orgánico precipitable. Reduce altas concentraciones de algas azul verdosas en los estanques evitando olores y sabores desagradables.",
      "Puede ser aplicado durante la preparación de la piscina o con poblaciones de organismos acuáticos.",
      "Sirve como biorremediador de aguas estancadas y actúa tanto en agua dulce como en agua salada.",
      "Coloniza el sistema digestivo del camarón, mejorando la absorción de nutrientes.",
      "Protege al animal de bacterias patógenas, promoviendo el crecimiento y supervivencia del cultivo."
    ],
      presentation: [
      "Tachos de 1 kg en 4 fundas biodegradables de 250gr c/u. ",
      "Almacenar en un lugar fresco, seco, bien ventilado, no exponer a",
      "la luz solar y alejarlo de las paredes.",
      "No requiere refrigeración.",
      "No requiere condiciones especiales de transporte."
    ],
      specifications: [
      {
        "key": "Especificación",
        "value": "En tanque de producción de larvas."
      },
      {
        "key": "Especificación",
        "value": "Puntas / retrolavado (100gr en una tonelada de agua)."
      },
      {
        "key": "Especificación",
        "value": "Cultivo de artemia (1gr en una tonelada de agua.)"
      },
      {
        "key": "Camaronera",
        "value": ""
      },
      {
        "key": "En agua",
        "value": "200 - 500gr / ha/ semana."
      },
      {
        "key": "En alimento",
        "value": ""
      },
      {
        "key": "Mantenimiento",
        "value": "4 - 6 g/kg de alimento."
      },
      {
        "key": "Tratamiento",
        "value": "10g/kg de alimento."
      }
    ]
    },
    en: {
      name: "Terminate",
      description: "Terminate is a mixture containing four types of freeze-dried bacteria for different uses, which serve to improve animal health and promote a healthy environment for shrimp or fish culture. Contains amino acids and minerals.",
      benefits: [
        "Decreases levels of toxic metabolites such as ammonia, nitrite and other harmful gases",
        "Dissolves decomposing matter, unconsumed food and other precipitable organic material",
        "Reduces high concentrations of blue-green algae in ponds avoiding unpleasant odors and flavors",
        "Can be applied during pool preparation or with aquatic organism populations",
        "Serves as bioremediation for stagnant waters and acts in both fresh and salt water",
        "Colonizes the shrimp's digestive system, improving nutrient absorption",
        "Protects the animal from pathogenic bacteria, promoting crop growth and survival"
      ],
      presentation: [
        "1 kg buckets in 4 biodegradable bags of 250gr each",
        "Store in cool, dry, well-ventilated place, do not expose to sunlight and keep away from walls",
        "Does not require refrigeration",
        "Does not require special transport conditions"
      ],
      specifications: [
        { key: "Laboratory application - Production tank", value: "100gr in one ton of water" },
        { key: "Laboratory application - Artemia culture", value: "1gr in one ton of water" },
        { key: "Farm - In water", value: "200 - 500gr / ha/ week" },
        { key: "Farm - Maintenance", value: "4 - 6 g/kg of feed" },
        { key: "Farm - Treatment", value: "10g/kg of feed" }
      ]
    },
    pt: {
      name: "Terminate",
      description: "Terminate é uma mistura que contém quatro tipos de bactérias liofilizadas de diferentes usos, que servem para melhorar a saúde do animal e promover um meio saudável para cultivo de camarões ou peixes. Contém aminoácidos e minerais.",
      benefits: [
        "Diminui níveis de metabólitos tóxicos como amônia, nitrito e outros gases nocivos",
        "Dissolve matéria em decomposição, alimento não consumido e demais material orgânico precipitável",
        "Reduz altas concentrações de algas azul-esverdeadas nos tanques evitando odores e sabores desagradáveis",
        "Pode ser aplicado durante a preparação da piscina ou com populações de organismos aquáticos",
        "Serve como biorremediador de águas estagnadas e atua tanto em água doce como em água salgada",
        "Coloniza o sistema digestivo do camarão, melhorando a absorção de nutrientes",
        "Protege o animal de bactérias patogênicas, promovendo crescimento e sobrevivência do cultivo"
      ],
      presentation: [
        "Baldes de 1 kg em 4 sacos biodegradáveis de 250gr cada",
        "Armazenar em local fresco, seco, bem ventilado, não expor à luz solar e manter longe das paredes",
        "Não requer refrigeração",
        "Não requer condições especiais de transporte"
      ],
      specifications: [
        { key: "Aplicação laboratório - Tanque produção", value: "100gr em uma tonelada de água" },
        { key: "Aplicação laboratório - Cultivo artemia", value: "1gr em uma tonelada de água" },
        { key: "Fazenda - Na água", value: "200 - 500gr / ha/ semana" },
        { key: "Fazenda - Manutenção", value: "4 - 6 g/kg de alimento" },
        { key: "Fazenda - Tratamento", value: "10g/kg de alimento" }
      ]
    }
  },

  // Waste & Sludge Reducer™ (WSR) - PB004
  "PB004": {
    es: {
      name: "Waste & Sludge Reducer™ (WSR)",
      description: "Contiene cepas bacterianas probióticas que mejoran la calidad del suelo y agua. Contiene cuatro especies de Bacillus que usan múltiples modos de acción para disminuir desechos orgánicos. El producto contiene bacterias esporuladas para garantizar altas concentraciones de bacterias vivas.",
      benefits: [
      "Biorremediador de suelo, disminuye la materia orgánica.",
      "Reduce los residuos orgánicos, las heces, los olores desagradables y los sólidos suspendidos.",
      "Reducción de la demanda biológica de oxígeno (DBO) y mejoramiento del potencial redox (reducción y oxidación).",
      "Reduce las concentraciones de amonio, nitrito, sulfuro de hidrógeno, hierro y otros gases nocivos.",
      "Puede aplicarse durante la preparación o con poblaciones de organismos (camarones o peces).",
      "Actúa en agua dulce, salobre y agua salada.",
      "Sirve como biorremediador del canal de reservorio, canal de drenaje y aguas estancadas."
    ],
      presentation: [
      "Tachos de 3kg, tabletas de 3gr de color azul.",
      "Almacenar en un lugar fresco, seco, bien ventilado, no exponer a la luz solar y alejado de las paredes.",
      "No requiere de Refrigeración.",
      "No requiere condiciones especiales de transporte.",
      "Seguro para el uso indicado, mantener fuera del alcance de los niños.",
      "APLICACIÓN",
      "Laboratorio:",
      "3- 6gr/ton (1 - 2 pastillas)",
      "Camaronera:",
      "Canales de drenaje y reservorio aplicar 250gr cada 100m/semana.",
      "Dosis: 0,25 - 1,00kg/ha/semana según el porcentaje de materia orgánica."
    ],
      specifications: [
      {
        "key": "Bacterias genéricas",
        "value": ""
      },
      {
        "key": "Concentración",
        "value": "6% UFC"
      },
      {
        "key": "Especificación",
        "value": "Bacillus amyloliquefaciens...................................... 1.02 x 109  ufc/g"
      },
      {
        "key": "Especificación",
        "value": "Bacillus licheniformis        5,10 X 108"
      },
      {
        "key": "Especificación",
        "value": "Bacillus megaterium        5,10 X 108"
      },
      {
        "key": "Especificación",
        "value": "Bacillus pumilus        5,10 X 108"
      },
      {
        "key": "Especificación",
        "value": "Carrier        94% cloruro de sodio"
      },
      {
        "key": "Especificación",
        "value": "ESPECIFICACIONES DEL PRODUCTO"
      },
      {
        "key": "Especificación",
        "value": "Aspecto        Píldora azul pH        Neutro"
      },
      {
        "key": "Especificación",
        "value": "Rango eficaz del pH        5,8 a 10,5"
      },
      {
        "key": "Especificación",
        "value": "Tiempo de vida útil        3 años"
      },
      {
        "key": "Especificación",
        "value": "Rango eficaz de temperatura        10° a 38°C (50° a 100° F)"
      }
    ]
    },
    en: {
      name: "Waste & Sludge Reducer™ (WSR)",
      description: "Contains probiotic bacterial strains that improve soil and water quality. Contains four Bacillus species that use multiple modes of action to reduce organic waste. The product contains spore bacteria to ensure high concentrations of live bacteria.",
      benefits: [
        "Soil bioremediation, reduces organic matter",
        "Reduces organic waste, feces, unpleasant odors and suspended solids",
        "Reduction of biological oxygen demand (BOD) and improvement of redox potential",
        "Reduces concentrations of ammonia, nitrite, hydrogen sulfide, iron and other harmful gases",
        "Can be applied during preparation or with organism populations (shrimp or fish)",
        "Works in fresh, brackish and salt water",
        "Serves as bioremediation for reservoir channel, drainage channel and stagnant waters"
      ],
      presentation: [
        "3kg buckets, 3gr blue tablets",
        "Store in cool, dry, well-ventilated place, do not expose to sunlight and keep away from walls",
        "Does not require refrigeration",
        "Does not require special transport conditions",
        "Safe for intended use, keep out of reach of children"
      ],
      specifications: [
        { key: "Bacillus amyloliquefaciens", value: "1.02 x 10^9 cfu/g" },
        { key: "Bacillus licheniformis", value: "5.10 X 10^8" },
        { key: "Bacillus megaterium", value: "5.10 X 10^8" },
        { key: "Bacillus pumilus", value: "5.10 X 10^8" },
        { key: "Appearance", value: "Blue pill" },
        { key: "pH", value: "Neutral" },
        { key: "Effective pH range", value: "5.8 to 10.5" },
        { key: "Shelf life", value: "3 years" },
        { key: "Effective temperature", value: "10° to 38°C" },
        { key: "Laboratory", value: "3- 6gr/ton (1 - 2 tablets)" },
        { key: "Farm - Channels", value: "250gr every 100m/week" },
        { key: "Farm - Dose", value: "0.25 - 1.00kg/ha/week" }
      ]
    },
    pt: {
      name: "Waste & Sludge Reducer™ (WSR)",
      description: "Contém cepas bacterianas probióticas que melhoram a qualidade do solo e da água. Contém quatro espécies de Bacillus que usam múltiplos modos de ação para diminuir resíduos orgânicos. O produto contém bactérias esporuladas para garantir altas concentrações de bactérias vivas.",
      benefits: [
        "Biorremediação do solo, diminui a matéria orgânica",
        "Reduz os resíduos orgânicos, as fezes, os odores desagradáveis e os sólidos suspensos",
        "Redução da demanda biológica de oxigênio (DBO) e melhoria do potencial redox",
        "Reduz as concentrações de amônia, nitrito, sulfeto de hidrogênio, ferro e outros gases nocivos",
        "Pode ser aplicado durante a preparação ou com populações de organismos (camarões ou peixes)",
        "Atua em água doce, salobra e água salgada",
        "Serve como biorremediação do canal de reservatório, canal de drenagem e águas estagnadas"
      ],
      presentation: [
        "Baldes de 3kg, comprimidos de 3gr de cor azul",
        "Armazenar em local fresco, seco, bem ventilado, não expor à luz solar e manter longe das paredes",
        "Não requer refrigeração",
        "Não requer condições especiais de transporte",
        "Seguro para uso indicado, manter fora do alcance das crianças"
      ],
      specifications: [
        { key: "Bacillus amyloliquefaciens", value: "1,02 x 10^9 ufc/g" },
        { key: "Bacillus licheniformis", value: "5,10 X 10^8" },
        { key: "Bacillus megaterium", value: "5,10 X 10^8" },
        { key: "Bacillus pumilus", value: "5,10 X 10^8" },
        { key: "Aparência", value: "Pílula azul" },
        { key: "pH", value: "Neutro" },
        { key: "Faixa eficaz de pH", value: "5,8 a 10,5" },
        { key: "Vida útil", value: "3 anos" },
        { key: "Temperatura eficaz", value: "10° a 38°C" },
        { key: "Laboratório", value: "3- 6gr/ton (1 - 2 comprimidos)" },
        { key: "Fazenda - Canais", value: "250gr a cada 100m/semana" },
        { key: "Fazenda - Dose", value: "0,25 - 1,00kg/ha/semana" }
      ]
    }
  },

  // ========== QUÍMICOS CATEGORY ==========

  // Ácido Fórmico - QU001
  "QU001": {
    es: {
      name: "Ácido Fórmico",
      description: "Ácido orgánico con propiedades acidificantes y antimicrobianas, ideal para el control de patógenos en agua de laboratorios y camaroneras. De uso frecuente en la desinfección general en sistemas de acuicultura, mejora la inmunidad de los camarones y contribuye a la reducción de enfermedades bacterianas.",
      benefits: [
      "Elimina y controla patógenos como Vibrio spp., E. coli y Salmonella sp.",
      "Mejora la calidad e inocuidad del camarón (P. vannamei)",
      "Fortalece el sistema inmunológico del animal",
      "Aumenta la tasa de supervivencia y reduce los costos de producción",
      "Actúa como desinfectante de amplio espectro",
      "Compatible con diferentes etapas del cultivo (larvas, precría y engorde)"
    ],
      presentation: [
      "Presentación: Tachos de 25 kg",
      "Vida útil: 24 meses desde la fecha de fabricación",
      "Condiciones de almacenamiento:",
      "Mantener herméticamente cerrado",
      "Guardar en lugar seco, ventilado, protegido del sol",
      "Alejar de fuentes de fuego, chispas y alimentos"
    ],
      specifications: [
      {
        "key": "Pureza del ácido fórmico",
        "value": "85%"
      },
      {
        "key": "Apariencia",
        "value": "Líquido incoloro"
      },
      {
        "key": "Olor",
        "value": "Ligeramente irritante"
      },
      {
        "key": "Densidad",
        "value": "1,218 g/cm³"
      },
      {
        "key": "Residuos de evaporación",
        "value": "0.010"
      },
      {
        "key": "Impurezas (ppm)",
        "value": ""
      },
      {
        "key": "Hierro",
        "value": "3"
      },
      {
        "key": "Cromo",
        "value": "1"
      },
      {
        "key": "Níquel",
        "value": "1"
      },
      {
        "key": "Cloruro",
        "value": "3"
      },
      {
        "key": "Dosis de aplicación",
        "value": ""
      },
      {
        "key": "Zoea - Mysis",
        "value": "2–4 ppm"
      },
      {
        "key": "Postlarva",
        "value": "10 ppm"
      },
      {
        "key": "Raceways",
        "value": "20 ppm"
      },
      {
        "key": "Precría",
        "value": "1 ml/kg de alimento"
      },
      {
        "key": "Engorde",
        "value": "1.5–2 ml/kg de alimento"
      }
    ]
    },
    en: {
      name: "Formic Acid",
      description: "Organic acid with acidifying and antimicrobial properties, ideal for pathogen control in laboratory and farm water. Frequently used in general disinfection in aquaculture systems, improves shrimp immunity and contributes to the reduction of bacterial diseases.",
      benefits: [
        "Eliminates and controls pathogens such as Vibrio spp., E. coli and Salmonella sp.",
        "Improves shrimp quality and safety (P. vannamei)",
        "Strengthens the animal's immune system",
        "Increases survival rate and reduces production costs",
        "Acts as broad-spectrum disinfectant",
        "Compatible with different culture stages (larvae, pre-nursery and grow-out)"
      ],
      presentation: [
        "25 kg drums",
        "Shelf life: 24 months from manufacturing date",
        "Keep hermetically sealed",
        "Store in dry, ventilated place, protected from sun",
        "Keep away from fire sources, sparks and food"
      ],
      specifications: [
        { key: "Formic acid purity", value: "85%" },
        { key: "Appearance", value: "Colorless liquid" },
        { key: "Density", value: "1.218 g/cm³" },
        { key: "Zoea - Mysis", value: "2–4 ppm" },
        { key: "Postlarva", value: "10 ppm" },
        { key: "Raceways", value: "20 ppm" },
        { key: "Pre-nursery", value: "1 ml/kg of feed" },
        { key: "Grow-out", value: "1.5–2 ml/kg of feed" }
      ]
    },
    pt: {
      name: "Ácido Fórmico",
      description: "Ácido orgânico com propriedades acidificantes e antimicrobianas, ideal para controle de patógenos em água de laboratórios e fazendas. De uso frequente na desinfecção geral em sistemas de aquicultura, melhora a imunidade dos camarões e contribui para a redução de doenças bacterianas.",
      benefits: [
        "Elimina e controla patógenos como Vibrio spp., E. coli e Salmonella sp.",
        "Melhora a qualidade e inocuidade do camarão (P. vannamei)",
        "Fortalece o sistema imunológico do animal",
        "Aumenta a taxa de sobrevivência e reduz os custos de produção",
        "Atua como desinfetante de amplo espectro",
        "Compatível com diferentes estágios do cultivo (larvas, pré-cria e engorda)"
      ],
      presentation: [
        "Tambores de 25 kg",
        "Vida útil: 24 meses desde a data de fabricação",
        "Manter hermeticamente fechado",
        "Guardar em local seco, ventilado, protegido do sol",
        "Manter longe de fontes de fogo, faíscas e alimentos"
      ],
      specifications: [
        { key: "Pureza do ácido fórmico", value: "85%" },
        { key: "Aparência", value: "Líquido incolor" },
        { key: "Densidade", value: "1,218 g/cm³" },
        { key: "Zoea - Mysis", value: "2–4 ppm" },
        { key: "Pós-larva", value: "10 ppm" },
        { key: "Raceways", value: "20 ppm" },
        { key: "Pré-cria", value: "1 ml/kg de alimento" },
        { key: "Engorda", value: "1,5–2 ml/kg de alimento" }
      ]
    }
  },

  // Ácido Húmico - QU002
  "QU002": {
    es: {
      name: "Ácido Húmico",
      description: "El Ácido Húmico es un bioestimulante natural que mejora la calidad del agua en sistemas de cultivo acuático. Tiene efecto floculante y promueve la sedimentación de partículas, además de fortalecer el sistema inmunológico de camarones y peces. Se usa como clarificante del agua y como aditivo alimentario para aumentar la resistencia a enfermedades y mejorar el crecimiento.",
      benefits: [
      "Reduce la eutrofización provocada por alimentos y fertilizantes acumulados.",
      "Clarifica el agua floculando y sedimentando residuos flotantes.",
      "Refuerza la inmunidad celular y humoral en camarones juveniles, reduciendo infecciones.",
      "Mejora la salud de peces, acelerando la curación, reduciendo patógenos y promoviendo el crecimiento.",
      "Reduce la turbidez y mejora la calidad del agua del cultivo."
    ],
      presentation: [
      "Presentación: Sacos de 25 kg",
      "Condiciones de almacenamiento:",
      "Lugar seco, ventilado y protegido del sol",
      "Mantener el producto herméticamente cerrado",
      "Temperatura ambiente adecuada",
      "Vida útil prolongada bajo buenas prácticas de almacenamiento"
    ],
      specifications: [
      {
        "key": "Estado físico",
        "value": "Polvo sólido"
      },
      {
        "key": "Función principal",
        "value": "Floculante, inmunoestimulante, clarificador del agua, promotor del crecimiento"
      },
      {
        "key": "Frecuencia de uso",
        "value": "Cada 48 horas en etapas iniciales, semanalmente en fases de cultivo"
      },
      {
        "key": "Dosis",
        "value": ""
      },
      {
        "key": "Laboratorio",
        "value": "0.5–1 ppm en Mysis / 3 ppm en PL"
      },
      {
        "key": "Precría",
        "value": "5 kg/ha cada 48 h"
      },
      {
        "key": "Camaroneras",
        "value": ""
      },
      {
        "key": "Especificación",
        "value": "5 kg/ha al llenar piscina"
      },
      {
        "key": "Especificación",
        "value": "5 kg/ha por semana durante 2 semanas"
      },
      {
        "key": "Especificación",
        "value": "Luego, 5 kg/ha semana por medio"
      }
    ]
    },
    en: {
      name: "Humic Acid",
      description: "Humic Acid is a natural biostimulant that improves water quality in aquatic culture systems. It has a flocculating effect and promotes particle sedimentation, in addition to strengthening the immune system of shrimp and fish. It is used as a water clarifier and as a feed additive to increase disease resistance and improve growth.",
      benefits: [
        "Reduces eutrophication caused by accumulated food and fertilizers",
        "Clarifies water by flocculating and sedimenting floating residues",
        "Reinforces cellular and humoral immunity in juvenile shrimp, reducing infections",
        "Improves fish health, accelerating healing, reducing pathogens and promoting growth",
        "Reduces turbidity and improves culture water quality"
      ],
      presentation: [
        "25 kg bags",
        "Dry, ventilated place protected from sun",
        "Keep product hermetically sealed",
        "Adequate room temperature",
        "Extended shelf life under good storage practices"
      ],
      specifications: [
        { key: "Physical state", value: "Solid powder" },
        { key: "Main function", value: "Flocculant, immunostimulant, clarifier, growth promoter" },
        { key: "Laboratory", value: "0.5–1 ppm in Mysis / 3 ppm in PL" },
        { key: "Pre-nursery", value: "5 kg/ha every 48 h" },
        { key: "Farms - Filling", value: "5 kg/ha when filling pond" },
        { key: "Farms - Initial", value: "5 kg/ha per week for 2 weeks" },
        { key: "Farms - Maintenance", value: "5 kg/ha every other week" }
      ]
    },
    pt: {
      name: "Ácido Húmico",
      description: "O Ácido Húmico é um bioestimulante natural que melhora a qualidade da água em sistemas de cultivo aquático. Tem efeito floculante e promove a sedimentação de partículas, além de fortalecer o sistema imunológico de camarões e peixes. É usado como clarificante da água e como aditivo alimentar para aumentar a resistência a doenças e melhorar o crescimento.",
      benefits: [
        "Reduz a eutrofização provocada por alimentos e fertilizantes acumulados",
        "Clarifica a água floculando e sedimentando resíduos flutuantes",
        "Reforça a imunidade celular e humoral em camarões juvenis, reduzindo infecções",
        "Melhora a saúde dos peixes, acelerando a cura, reduzindo patógenos e promovendo o crescimento",
        "Reduz a turbidez e melhora a qualidade da água do cultivo"
      ],
      presentation: [
        "Sacos de 25 kg",
        "Local seco, ventilado e protegido do sol",
        "Manter o produto hermeticamente fechado",
        "Temperatura ambiente adequada",
        "Vida útil prolongada sob boas práticas de armazenamento"
      ],
      specifications: [
        { key: "Estado físico", value: "Pó sólido" },
        { key: "Função principal", value: "Floculante, imunoestimulante, clarificador, promotor do crescimento" },
        { key: "Laboratório", value: "0,5–1 ppm em Mysis / 3 ppm em PL" },
        { key: "Pré-cria", value: "5 kg/ha a cada 48 h" },
        { key: "Fazendas - Enchimento", value: "5 kg/ha ao encher viveiro" },
        { key: "Fazendas - Inicial", value: "5 kg/ha por semana durante 2 semanas" },
        { key: "Fazendas - Manutenção", value: "5 kg/ha semana sim, semana não" }
      ]
    }
  },

  // Ácido Nítrico - QU003
  "QU003": {
    es: {
      name: "Ácido Nítrico",
      description: "El Ácido Nítrico es un compuesto químico con propiedades desinfectantes y acidificantes, utilizado ampliamente en el mantenimiento de bioseguridad de cultivos acuáticos. Es altamente eficaz en la desinfección de tanques, equipos y superficies que han estado en contacto con materia orgánica, contribuyendo a evitar la contaminación cruzada.",
      benefits: [
      "Desinfección eficaz de tanques, tuberías, redes y utensilios de trabajo",
      "Reducción de pH del agua para manejo de condiciones físicas del cultivo",
      "Previene contaminaciones cruzadas, mejorando la bioseguridad",
      "Mejora la efectividad de limpieza, actuando mejor sobre superficies libres de residuos orgánicos",
      "Contribuye a un cultivo exitoso al mantener condiciones sanitarias adecuadas"
    ],
      presentation: [
      "Presentación: Envases de 35 kg",
      "Vida útil: 24 meses desde la fecha de fabricación",
      "Condiciones de almacenamiento:",
      "Temperatura inferior a 25°C",
      "Almacenar en lugar seco, fresco y alejado de fuentes de calor o productos incompatibles",
      "Mantener bien cerrado y etiquetado"
    ],
      specifications: [
      {
        "key": "Concentración",
        "value": "68% de pureza"
      },
      {
        "key": "Uso principal",
        "value": "Desinfección de instalaciones, materiales y reducción del pH del agua"
      },
      {
        "key": "Dosis recomendadas",
        "value": ""
      },
      {
        "key": "Para acidificar agua",
        "value": "1000 ppm (dejar actuar 12 horas y enjuagar)"
      },
      {
        "key": "Para desinfección de materiales",
        "value": "100 ppm"
      },
      {
        "key": "Compatibilidad",
        "value": "Se debe agregar siempre el ácido al agua, nunca al revés"
      },
      {
        "key": "Nivel toxicológico",
        "value": "Alto"
      },
      {
        "key": "Precauciones",
        "value": ""
      },
      {
        "key": "Especificación",
        "value": "Evitar contacto con combustibles y agentes corrosivos"
      },
      {
        "key": "Especificación",
        "value": "Medir pH post-retrolavado para verificar eliminación completa"
      },
      {
        "key": "Especificación",
        "value": "En caso de contacto con piel, lavar con abundante agua y jabón"
      }
    ]
    },
    en: {
      name: "Nitric Acid",
      description: "Nitric Acid is a chemical compound with disinfectant and acidifying properties, widely used in maintaining biosecurity of aquatic crops. It is highly effective in disinfecting tanks, equipment and surfaces that have been in contact with organic matter, helping to prevent cross-contamination.",
      benefits: [
        "Effective disinfection of tanks, pipes, nets and work utensils",
        "Water pH reduction for managing physical culture conditions",
        "Prevents cross-contamination, improving biosecurity",
        "Improves cleaning effectiveness, working better on surfaces free of organic residues",
        "Contributes to successful culture by maintaining adequate sanitary conditions"
      ],
      presentation: [
        "35 kg containers",
        "Shelf life: 24 months from manufacturing date",
        "Temperature below 25°C",
        "Store in dry, cool place away from heat sources or incompatible products",
        "Keep tightly closed and labeled"
      ],
      specifications: [
        { key: "Concentration", value: "68% purity" },
        { key: "Main use", value: "Facility disinfection, materials and water pH reduction" },
        { key: "To acidify water", value: "1000 ppm (let act 12 hours and rinse)" },
        { key: "For material disinfection", value: "100 ppm" },
        { key: "Toxicological level", value: "High" },
        { key: "Precaution", value: "Always add acid to water, never the reverse" }
      ]
    },
    pt: {
      name: "Ácido Nítrico",
      description: "O Ácido Nítrico é um composto químico com propriedades desinfetantes e acidificantes, amplamente utilizado na manutenção da biossegurança de cultivos aquáticos. É altamente eficaz na desinfecção de tanques, equipamentos e superfícies que estiveram em contato com matéria orgânica, contribuindo para evitar contaminação cruzada.",
      benefits: [
        "Desinfecção eficaz de tanques, tubulações, redes e utensílios de trabalho",
        "Redução do pH da água para manejo de condições físicas do cultivo",
        "Previne contaminações cruzadas, melhorando a biossegurança",
        "Melhora a efetividade da limpeza, atuando melhor sobre superfícies livres de resíduos orgânicos",
        "Contribui para um cultivo bem-sucedido ao manter condições sanitárias adequadas"
      ],
      presentation: [
        "Recipientes de 35 kg",
        "Vida útil: 24 meses desde a data de fabricação",
        "Temperatura inferior a 25°C",
        "Armazenar em local seco, fresco e longe de fontes de calor ou produtos incompatíveis",
        "Manter bem fechado e etiquetado"
      ],
      specifications: [
        { key: "Concentração", value: "68% de pureza" },
        { key: "Uso principal", value: "Desinfecção de instalações, materiais e redução do pH da água" },
        { key: "Para acidificar água", value: "1000 ppm (deixar agir 12 horas e enxaguar)" },
        { key: "Para desinfecção de materiais", value: "100 ppm" },
        { key: "Nível toxicológico", value: "Alto" },
        { key: "Precaução", value: "Sempre adicionar o ácido à água, nunca o contrário" }
      ]
    }
  },

  // Cloro Granulado - QU004
  "QU004": {
    es: {
      name: "Cloro Granulado",
      description: "Desinfectante de amplio espectro con un 70% de pureza, utilizado como parte de los programas de bioseguridad en laboratorios, criaderos, camaroneras y empacadoras. Su acción elimina eficazmente bacterias, virus y hongos en superficies, utensilios, tanques y sistemas de cultivo.",
      benefits: [
      "Elimina eficazmente microorganismos patógenos.",
      "Favorece programas de bioseguridad en centros de producción acuícola.",
      "Previene brotes de enfermedades antes de la siembra de postlarvas.",
      "Ideal para limpieza profunda de superficies, equipos y sistemas hidráulicos."
    ],
      presentation: [
      "Presentación: Tanques de 45 kg",
      "Almacenamiento:",
      "Guardar en lugar seco y ventilado.",
      "Mantener en su empaque original, alejado de la luz solar directa.",
      "Evitar el contacto con materiales combustibles y fuentes de ignición."
    ],
      specifications: [
      {
        "key": "Forma",
        "value": "Granulado"
      },
      {
        "key": "Concentración activa",
        "value": "70%"
      },
      {
        "key": "Color",
        "value": "Blanco"
      },
      {
        "key": "Olor",
        "value": "Clorado"
      },
      {
        "key": "Laboratorios de larvas",
        "value": ""
      },
      {
        "key": "Especificación",
        "value": "Usar una solución de 100 ppm para desinfección de tanques, pisos y tuberías."
      },
      {
        "key": "Especificación",
        "value": "Llenar los tanques, dejar actuar durante la noche, vaciar, enjuagar con agua y dejar secar completamente."
      },
      {
        "key": "Camaroneras y otros usos",
        "value": ""
      },
      {
        "key": "Especificación",
        "value": "20-50 gramos por laguna de 1 metro de diámetro."
      },
      {
        "key": "Empacadoras",
        "value": ""
      },
      {
        "key": "Especificación",
        "value": "Aplicar 400 ppm sobre el suelo como desinfectante."
      }
    ]
    },
    en: {
      name: "Granulated Chlorine",
      description: "Broad-spectrum disinfectant with 70% purity, used as part of biosecurity programs in laboratories, hatcheries, farms and packing plants. Its action effectively eliminates bacteria, viruses and fungi on surfaces, utensils, tanks and culture systems.",
      benefits: [
        "Effectively eliminates pathogenic microorganisms",
        "Favors biosecurity programs in aquaculture production centers",
        "Prevents disease outbreaks before postlarval stocking",
        "Ideal for deep cleaning of surfaces, equipment and hydraulic systems"
      ],
      presentation: [
        "45 kg drums",
        "Store in dry and ventilated place",
        "Keep in original packaging, away from direct sunlight",
        "Avoid contact with combustible materials and ignition sources"
      ],
      specifications: [
        { key: "Form", value: "Granulated" },
        { key: "Active concentration", value: "70%" },
        { key: "Color", value: "White" },
        { key: "Odor", value: "Chlorinated" },
        { key: "Larval laboratories", value: "100 ppm for disinfection" },
        { key: "Farms", value: "20-50 grams per 1 meter diameter pond" },
        { key: "Packing plants", value: "400 ppm on floor" }
      ]
    },
    pt: {
      name: "Cloro Granulado",
      description: "Desinfetante de amplo espectro com 70% de pureza, utilizado como parte dos programas de biossegurança em laboratórios, incubatórios, fazendas e empacotadoras. Sua ação elimina eficazmente bactérias, vírus e fungos em superfícies, utensílios, tanques e sistemas de cultivo.",
      benefits: [
        "Elimina eficazmente microrganismos patogênicos",
        "Favorece programas de biossegurança em centros de produção aquícola",
        "Previne surtos de doenças antes da estocagem de pós-larvas",
        "Ideal para limpeza profunda de superfícies, equipamentos e sistemas hidráulicos"
      ],
      presentation: [
        "Tambores de 45 kg",
        "Guardar em local seco e ventilado",
        "Manter em sua embalagem original, longe da luz solar direta",
        "Evitar contato com materiais combustíveis e fontes de ignição"
      ],
      specifications: [
        { key: "Forma", value: "Granulado" },
        { key: "Concentração ativa", value: "70%" },
        { key: "Cor", value: "Branco" },
        { key: "Odor", value: "Clorado" },
        { key: "Laboratórios de larvas", value: "100 ppm para desinfecção" },
        { key: "Fazendas", value: "20-50 gramas por lagoa de 1 metro de diâmetro" },
        { key: "Empacotadoras", value: "400 ppm no chão" }
      ]
    }
  },

  // Cloruro de Magnesio - QU005
  "QU005": {
    es: {
      name: "Cloruro de Magnesio",
      description: "El Cloruro de Magnesio es un suplemento mineral esencial de alta pureza utilizado en sistemas acuáticos, especialmente en cultivos de camarón. Su aplicación fortalece el metabolismo basal de los organismos acuáticos, favorece el desarrollo muscular y mejora la salud general de larvas y juveniles. \nCertificaciones: EDQM y CEP (Unión Europea)",
      benefits: [
      "Mejora el metabolismo basal en organismos acuáticos",
      "Fortalece el desarrollo de músculos y tejidos",
      "Suple deficiencias minerales en el medio de cultivo",
      "Favorece la salud y resistencia de camarones en todas las fases"
    ],
      presentation: [
      "Presentación:",
      "Sacos de 25 kg",
      "Frascos de 1 kg",
      "Condiciones de almacenamiento:",
      "Conservar en lugar seco, lejos de la luz solar",
      "Cerrar herméticamente el envase una vez abierto",
      "Utilizar pallets y mantener etiquetado para evitar contaminación cruzada"
    ],
      specifications: [
      {
        "key": "Pureza",
        "value": "46,5%"
      },
      {
        "key": "Origen",
        "value": "Israel / Holanda"
      },
      {
        "key": "Certificaciones",
        "value": ""
      },
      {
        "key": "EDQM",
        "value": "Dirección Europea para la Calidad de Medicamentos"
      },
      {
        "key": "CEP",
        "value": "Certificado de Conformidad con las normas farmacéuticas europeas"
      },
      {
        "key": "Tanques de larvas y raceways",
        "value": "2 g por tonelada de agua"
      },
      {
        "key": "En camaroneras (mezcla con alimento)",
        "value": "12 a 20 kg por tonelada de alimento"
      }
    ]
    },
    en: {
      name: "Magnesium Chloride",
      description: "Magnesium Chloride is an essential high-purity mineral supplement used in aquatic systems, especially in shrimp culture. Its application strengthens the basal metabolism of aquatic organisms, favors muscle development and improves the general health of larvae and juveniles. Certifications: EDQM and CEP (European Union)",
      benefits: [
        "Improves basal metabolism in aquatic organisms",
        "Strengthens muscle and tissue development",
        "Supplies mineral deficiencies in the culture medium",
        "Favors shrimp health and resistance in all phases"
      ],
      presentation: [
        "25 kg bags",
        "1 kg bottles",
        "Store in dry place, away from sunlight",
        "Seal container tightly once opened",
        "Use pallets and keep labeled to avoid cross-contamination"
      ],
      specifications: [
        { key: "Purity", value: "46.5%" },
        { key: "Origin", value: "Israel / Netherlands" },
        { key: "Certifications", value: "EDQM and CEP (European Union)" },
        { key: "Larval tanks and raceways", value: "2 g per ton of water" },
        { key: "Farms (with feed)", value: "12 to 20 kg per ton of feed" }
      ]
    },
    pt: {
      name: "Cloreto de Magnésio",
      description: "O Cloreto de Magnésio é um suplemento mineral essencial de alta pureza utilizado em sistemas aquáticos, especialmente em cultivos de camarão. Sua aplicação fortalece o metabolismo basal dos organismos aquáticos, favorece o desenvolvimento muscular e melhora a saúde geral de larvas e juvenis. Certificações: EDQM e CEP (União Europeia)",
      benefits: [
        "Melhora o metabolismo basal em organismos aquáticos",
        "Fortalece o desenvolvimento de músculos e tecidos",
        "Supre deficiências minerais no meio de cultivo",
        "Favorece a saúde e resistência de camarões em todas as fases"
      ],
      presentation: [
        "Sacos de 25 kg",
        "Frascos de 1 kg",
        "Conservar em local seco, longe da luz solar",
        "Fechar hermeticamente o recipiente uma vez aberto",
        "Utilizar paletes e manter etiquetado para evitar contaminação cruzada"
      ],
      specifications: [
        { key: "Pureza", value: "46,5%" },
        { key: "Origem", value: "Israel / Holanda" },
        { key: "Certificações", value: "EDQM e CEP (União Europeia)" },
        { key: "Tanques de larvas e raceways", value: "2 g por tonelada de água" },
        { key: "Fazendas (com alimento)", value: "12 a 20 kg por tonelada de alimento" }
      ]
    }
  },

  // Cloruro de Potasio - QU006
  "QU006": {
    es: {
      name: "Cloruro de Potasio",
      description: "El Cloruro de Potasio es un suplemento mineral altamente puro y esencial para el cultivo de camarón, especialmente en sistemas de baja salinidad. El potasio es fundamental para mantener el equilibrio electroquímico del camarón, ya que se pierde en cada muda y debe ser repuesto para garantizar una buena salud, crecimiento y supervivencia.",
      benefits: [
      "Suple deficiencias de potasio en aguas de baja salinidad",
      "Mejora la supervivencia, el crecimiento y la salud general del camarón",
      "Ayuda a mantener el equilibrio osmótico y electroquímico",
      "Fundamental para una recuperación rápida tras las mudas frecuentes",
      "Soporta sistemas de cultivo intensivo con altas densidades"
    ],
      presentation: [
      "Presentación:",
      "Sacos de 25 kg",
      "Frascos de 1 kg",
      "Condiciones de almacenamiento:",
      "Conservar en lugar seco, fresco y protegido de la luz",
      "Mantener en su empaque original sellado",
      "Una vez abierto, usar bajo normas de Buenas Prácticas de Manufactura (BPM)"
    ],
      specifications: [
      {
        "key": "Pureza",
        "value": "98%"
      },
      {
        "key": "Origen",
        "value": "Israel"
      },
      {
        "key": "Certificaciones",
        "value": ""
      },
      {
        "key": "EDQM",
        "value": "European Directorate for the Quality of Medicines"
      },
      {
        "key": "CEP",
        "value": "Certificate of Suitability to the monographs of the European Pharmacopoeia"
      },
      {
        "key": "Tanques de larvas y/o raceways",
        "value": "0.5 ppm"
      },
      {
        "key": "En camaroneras (mezclado con alimento)",
        "value": "3 a 5 g por kg de alimento"
      }
    ]
    },
    en: {
      name: "Potassium Chloride",
      description: "Potassium Chloride is a highly pure and essential mineral supplement for shrimp culture, especially in low salinity systems. Potassium is fundamental to maintain the electrochemical balance of shrimp, as it is lost in each molt and must be replaced to ensure good health, growth and survival.",
      benefits: [
        "Supplies potassium deficiencies in low salinity waters",
        "Improves survival, growth and general health of shrimp",
        "Helps maintain osmotic and electrochemical balance",
        "Fundamental for rapid recovery after frequent molts",
        "Supports intensive culture systems with high densities"
      ],
      presentation: [
        "25 kg bags",
        "1 kg bottles",
        "Store in dry, cool place protected from light",
        "Keep in original sealed package",
        "Once opened, use under Good Manufacturing Practices (GMP) standards"
      ],
      specifications: [
        { key: "Purity", value: "98%" },
        { key: "Origin", value: "Israel" },
        { key: "Certifications", value: "EDQM and CEP" },
        { key: "Larval tanks and/or raceways", value: "0.5 ppm" },
        { key: "Farms (mixed with feed)", value: "3 to 5 g per kg of feed" }
      ]
    },
    pt: {
      name: "Cloreto de Potássio",
      description: "O Cloreto de Potássio é um suplemento mineral altamente puro e essencial para o cultivo de camarão, especialmente em sistemas de baixa salinidade. O potássio é fundamental para manter o equilíbrio eletroquímico do camarão, já que se perde em cada muda e deve ser reposto para garantir boa saúde, crescimento e sobrevivência.",
      benefits: [
        "Supre deficiências de potássio em águas de baixa salinidade",
        "Melhora a sobrevivência, crescimento e saúde geral do camarão",
        "Ajuda a manter o equilíbrio osmótico e eletroquímico",
        "Fundamental para recuperação rápida após as mudas frequentes",
        "Suporta sistemas de cultivo intensivo com altas densidades"
      ],
      presentation: [
        "Sacos de 25 kg",
        "Frascos de 1 kg",
        "Conservar em local seco, fresco e protegido da luz",
        "Manter em sua embalagem original selada",
        "Uma vez aberto, usar sob normas de Boas Práticas de Manufatura (BPM)"
      ],
      specifications: [
        { key: "Pureza", value: "98%" },
        { key: "Origem", value: "Israel" },
        { key: "Certificações", value: "EDQM e CEP" },
        { key: "Tanques de larvas e/ou raceways", value: "0,5 ppm" },
        { key: "Fazendas (misturado com alimento)", value: "3 a 5 g por kg de alimento" }
      ]
    }
  },

  // EDTA (4Na) - QU007
  "QU007": {
    es: {
      name: "EDTA (4Na)",
      description: "EDTA (ácido etilendiaminotetraacético tetrasódico) es un potente agente quelante utilizado ampliamente en acuicultura para eliminar metales pesados del agua como hierro, cobre y magnesio. Su alta estabilidad, solubilidad en agua y eficacia lo convierten en un componente esencial para mejorar la calidad del medio acuático en todas las etapas del cultivo de camarón.",
      benefits: [
      "Elimina metales pesados del agua como hierro, magnesio y cobre",
      "Mejora la calidad del agua para el cultivo de camarones y otras especies acuáticas",
      "Previene toxicidades que afectan la inmunidad y el crecimiento larval",
      "Potencia la maduración y sobrevivencia en todas las etapas del cultivo",
      "Producto altamente soluble y estable",
      "Apto para procesos de maduración, larvicultura y transporte de larvas",
      "Compatible con protocolos de bioseguridad y sostenibilidad"
    ],
      presentation: [
      "Maduración:",
      "Tanques de desove: 5 – 10 ppm",
      "Reservorios de desove y agua para nauplios: 2 – 5 ppm",
      "Larvicultura:",
      "Siembra, Zoea 2, Mysis 1 y Mysis 3: 10 ppm",
      "Transporte de larvas:",
      "10 ppm",
      "PRESENTACIÓN Y ALMACENAMIENTO:",
      "Presentación: Sacos de 25 kg",
      "Almacenamiento:",
      "Lugar seco y ventilado",
      "Proteger de la luz solar",
      "No necesita refrigeración si se mantiene en su empaque original",
      "Vida útil: 24 meses"
    ],
      specifications: [
      {
        "key": "Apariencia",
        "value": "Polvo blanco cristalino"
      },
      {
        "key": "Olor",
        "value": "Sin olor"
      },
      {
        "key": "Solubilidad",
        "value": "Soluble en agua"
      },
      {
        "key": "Densidad",
        "value": "0.71 g/cm³"
      },
      {
        "key": "pH (solución acuosa)",
        "value": "10.5 – 11.5"
      },
      {
        "key": "Quelato",
        "value": "Mínimo 220 mg/g"
      },
      {
        "key": "Pureza",
        "value": "99%"
      },
      {
        "key": "Cloro",
        "value": "0.001%"
      },
      {
        "key": "Sulfato",
        "value": "0.01%"
      },
      {
        "key": "Metales pesados",
        "value": "0.001%"
      },
      {
        "key": "Solución al 1%",
        "value": "Transparente"
      },
      {
        "key": "Peso molecular",
        "value": "452.2 g/mol"
      },
      {
        "key": "Fórmula química",
        "value": "C₁₀H₁₂N₂Na₄O₈·4H₂O"
      }
    ]
    },
    en: {
      name: "EDTA (4Na)",
      description: "EDTA (tetrasodium ethylenediaminetetraacetic acid) is a powerful chelating agent widely used in aquaculture to remove heavy metals from water such as iron, copper and magnesium. Its high stability, water solubility and efficacy make it an essential component for improving aquatic environment quality in all stages of shrimp culture.",
      benefits: [
        "Removes heavy metals from water such as iron, magnesium and copper",
        "Improves water quality for shrimp and other aquatic species culture",
        "Prevents toxicities that affect immunity and larval growth",
        "Enhances maturation and survival in all culture stages",
        "Highly soluble and stable product",
        "Suitable for maturation, larviculture and larval transport processes",
        "Compatible with biosecurity and sustainability protocols"
      ],
      presentation: [
        "25 kg bags",
        "Storage in dry and ventilated place",
        "Protect from sunlight",
        "No refrigeration needed if kept in original packaging",
        "Shelf life: 24 months"
      ],
      specifications: [
        { key: "Appearance", value: "White crystalline powder" },
        { key: "Solubility", value: "Soluble in water" },
        { key: "Density", value: "0.71 g/cm³" },
        { key: "pH (aqueous solution)", value: "10.5 – 11.5" },
        { key: "Chelate", value: "Minimum 220 mg/g" },
        { key: "Purity", value: "99%" },
        { key: "Molecular weight", value: "452.2 g/mol" },
        { key: "Maturation - Spawning tanks", value: "5 – 10 ppm" },
        { key: "Maturation - Reservoirs", value: "2 – 5 ppm" },
        { key: "Larviculture - Stocking, Zoea 2, Mysis 1 and Mysis 3", value: "10 ppm" },
        { key: "Larval transport", value: "10 ppm" }
      ]
    },
    pt: {
      name: "EDTA (4Na)",
      description: "EDTA (ácido etilenodiaminotetracético tetrassódico) é um potente agente quelante amplamente utilizado na aquicultura para remover metais pesados da água como ferro, cobre e magnésio. Sua alta estabilidade, solubilidade em água e eficácia o tornam um componente essencial para melhorar a qualidade do meio aquático em todas as etapas do cultivo de camarão.",
      benefits: [
        "Remove metais pesados da água como ferro, magnésio e cobre",
        "Melhora a qualidade da água para o cultivo de camarões e outras espécies aquáticas",
        "Previne toxicidades que afetam a imunidade e o crescimento larval",
        "Potencializa a maturação e sobrevivência em todas as etapas do cultivo",
        "Produto altamente solúvel e estável",
        "Adequado para processos de maturação, larvicultura e transporte de larvas",
        "Compatível com protocolos de biossegurança e sustentabilidade"
      ],
      presentation: [
        "Sacos de 25 kg",
        "Armazenamento em local seco e ventilado",
        "Proteger da luz solar",
        "Não necessita refrigeração se mantido na embalagem original",
        "Vida útil: 24 meses"
      ],
      specifications: [
        { key: "Aparência", value: "Pó branco cristalino" },
        { key: "Solubilidade", value: "Solúvel em água" },
        { key: "Densidade", value: "0,71 g/cm³" },
        { key: "pH (solução aquosa)", value: "10,5 – 11,5" },
        { key: "Quelato", value: "Mínimo 220 mg/g" },
        { key: "Pureza", value: "99%" },
        { key: "Peso molecular", value: "452,2 g/mol" },
        { key: "Maturação - Tanques de desova", value: "5 – 10 ppm" },
        { key: "Maturação - Reservatórios", value: "2 – 5 ppm" },
        { key: "Larvicultura - Estocagem, Zoea 2, Mysis 1 e Mysis 3", value: "10 ppm" },
        { key: "Transporte de larvas", value: "10 ppm" }
      ]
    }
  },

  // Formaldehído (Formol) - QU008
  "QU008": {
    es: {
      name: "Formaldehído (Formol)",
      description: "El formaldehído, conocido en solución acuosa como formol, es un desinfectante y antiparasitario de amplio espectro utilizado en la acuicultura. Es eficaz en el tratamiento de infecciones bacterianas, fúngicas y parasitarias, además de ser utilizado para la desinfección de instalaciones, huevos, alevines y equipos. Su capacidad para eliminar organismos patógenos garantiza ambientes acuáticos más saludables y seguros.",
      benefits: [
      "Acción rápida y efectiva contra bacterias, hongos, algas y parásitos",
      "Excelente para la prevención y control de infecciones en peces y huevos",
      "Ayuda a proteger la salud de los alevines y poblaciones acuáticas en general",
      "Puede usarse para limpiar y desinfectar sistemas y equipos de cultivo",
      "Su solubilidad en agua permite una distribución uniforme en estanques y tanques",
      "Reduce significativamente el riesgo de brotes de enfermedades"
    ],
      presentation: [
      "Presentación: Envases de 35 kg",
      "Vida útil: 24 meses a partir de la fecha de fabricación",
      "Condiciones de almacenamiento:",
      "Lugar fresco y seco (<25°C)",
      "Envase herméticamente cerrado",
      "Lejos de fuentes de calor, chispas y de alimentos o bebidas"
    ],
      specifications: [
      {
        "key": "Pureza",
        "value": "37%"
      },
      {
        "key": "Solubilidad",
        "value": "Totalmente soluble en agua"
      },
      {
        "key": "Dosis y aplicaciones típicas",
        "value": ""
      },
      {
        "key": "Especificación",
        "value": "Control de parásitos"
      },
      {
        "key": "Especificación",
        "value": "Desinfección de huevos y alevines"
      },
      {
        "key": "Especificación",
        "value": "Tratamiento de enfermedades bacterianas"
      },
      {
        "key": "Especificación",
        "value": "Control de algas y microorganismos"
      },
      {
        "key": "Especificación",
        "value": "Acondicionamiento del agua"
      },
      {
        "key": "Nivel toxicológico",
        "value": "Tóxico"
      },
      {
        "key": "Especificación",
        "value": "Uso seguro bajo indicaciones del fabricante"
      },
      {
        "key": "Especificación",
        "value": "Mantener alejado de niños y fuentes de calor"
      },
      {
        "key": "Especificación",
        "value": "Usar equipo de protección personal al manipular"
      }
    ]
    },
    en: {
      name: "Formaldehyde (Formalin)",
      description: "Formaldehyde, known in aqueous solution as formalin, is a broad-spectrum disinfectant and antiparasitic used in aquaculture. It is effective in treating bacterial, fungal and parasitic infections, as well as being used for disinfecting facilities, eggs, fry and equipment. Its ability to eliminate pathogenic organisms ensures healthier and safer aquatic environments.",
      benefits: [
        "Rapid and effective action against bacteria, fungi, algae and parasites",
        "Excellent for prevention and control of infections in fish and eggs",
        "Helps protect the health of fry and aquatic populations in general",
        "Can be used to clean and disinfect culture systems and equipment",
        "Its water solubility allows uniform distribution in ponds and tanks",
        "Significantly reduces the risk of disease outbreaks"
      ],
      presentation: [
        "35 kg containers",
        "Shelf life: 24 months from manufacturing date",
        "Cool and dry place (<25°C)",
        "Hermetically sealed container",
        "Away from heat sources, sparks and food or beverages"
      ],
      specifications: [
        { key: "Purity", value: "37%" },
        { key: "Solubility", value: "Completely soluble in water" },
        { key: "Physical presentation", value: "Transparent liquid with penetrating odor" },
        { key: "Toxicological level", value: "Toxic" },
        { key: "Parasite control", value: "According to manufacturer's instructions" },
        { key: "Egg and fry disinfection", value: "Use under technical supervision" },
        { key: "Bacterial disease treatment", value: "Specific dosing required" },
        { key: "Algae and microorganism control", value: "Controlled application" }
      ]
    },
    pt: {
      name: "Formaldeído (Formol)",
      description: "O formaldeído, conhecido em solução aquosa como formol, é um desinfetante e antiparasitário de amplo espectro utilizado na aquicultura. É eficaz no tratamento de infecções bacterianas, fúngicas e parasitárias, além de ser utilizado para a desinfecção de instalações, ovos, alevinos e equipamentos. Sua capacidade de eliminar organismos patógenos garante ambientes aquáticos mais saudáveis e seguros.",
      benefits: [
        "Ação rápida e efetiva contra bactérias, fungos, algas e parasitas",
        "Excelente para prevenção e controle de infecções em peixes e ovos",
        "Ajuda a proteger a saúde dos alevinos e populações aquáticas em geral",
        "Pode ser usado para limpar e desinfetar sistemas e equipamentos de cultivo",
        "Sua solubilidade em água permite distribuição uniforme em tanques e viveiros",
        "Reduz significativamente o risco de surtos de doenças"
      ],
      presentation: [
        "Recipientes de 35 kg",
        "Vida útil: 24 meses a partir da data de fabricação",
        "Local fresco e seco (<25°C)",
        "Recipiente hermeticamente fechado",
        "Longe de fontes de calor, faíscas e de alimentos ou bebidas"
      ],
      specifications: [
        { key: "Pureza", value: "37%" },
        { key: "Solubilidade", value: "Completamente solúvel em água" },
        { key: "Apresentação física", value: "Líquido transparente com odor penetrante" },
        { key: "Nível toxicológico", value: "Tóxico" },
        { key: "Controle de parasitas", value: "Conforme instruções do fabricante" },
        { key: "Desinfecção de ovos e alevinos", value: "Uso sob supervisão técnica" },
        { key: "Tratamento de doenças bacterianas", value: "Dosagem específica requerida" },
        { key: "Controle de algas e microrganismos", value: "Aplicação controlada" }
      ]
    }
  },

  // Metasilicato de Sodio - QU009
  "QU009": {
    es: {
      name: "Metasilicato de Sodio",
      description: "El Metasilicato de Sodio es un fertilizante microgranulado soluble utilizado en cultivos acuáticos, especialmente en laboratorios y camaroneras, para estimular la producción de algas diatomeas que sirven como fuente de alimento natural para larvas y postlarvas de camarón.",
      benefits: [
      "Aporta silicio al medio acuático, fomentando floraciones de diatomeas (microalgas ricas en nutrientes).",
      "Estimula la producción de alimento natural para camarones en etapa larvaria y postlarvaria.",
      "Mejora la calidad del agua y del ambiente microbiano en los sistemas de cultivo.",
      "Compatible con protocolos estándar como el método Guillard en laboratorios de cultivo."
    ],
      presentation: [
      "Presentación:",
      "Sacos de 25 kg",
      "Frascos de 1 kg",
      "Vida útil: 24 meses desde la fecha de fabricación",
      "Condiciones de almacenamiento:",
      "Temperatura inferior a 25°C",
      "Lugar fresco, seco y protegido de la luz directa"
    ],
      specifications: [
      {
        "key": "Pureza",
        "value": "57.7%"
      },
      {
        "key": "Formato",
        "value": "Microgranulado soluble"
      },
      {
        "key": "Laboratorios",
        "value": "Se emplea en cultivos de diatomeas bajo el método Guillard, integrándose a la Solución Madre:"
      },
      {
        "key": "Especificación",
        "value": "NaNO₃ 75 g/L dH₂O → 1 mL"
      },
      {
        "key": "Especificación",
        "value": "NaH₂PO₄·H₂O 5 g/L dH₂O → 1 mL"
      },
      {
        "key": "Especificación",
        "value": "Na₂SiO₃·9H₂O 30 g/L dH₂O → 1 mL"
      },
      {
        "key": "Especificación",
        "value": "Solución de metales traza → 1 mL"
      },
      {
        "key": "Especificación",
        "value": "Solución vitamínica → 0.5 mL"
      },
      {
        "key": "Solución de Metales Traza (dH₂O)",
        "value": ""
      },
      {
        "key": "Especificación",
        "value": "FeCl₃·6H₂O – 3.15 g"
      },
      {
        "key": "Especificación",
        "value": "Na₂EDTA·2H₂O – 4.36 g"
      },
      {
        "key": "Especificación",
        "value": "CuSO₄·5H₂O – 9.8 g/L"
      },
      {
        "key": "Especificación",
        "value": "Na₂MoO₄·2H₂O – 6.3 g/L"
      },
      {
        "key": "Especificación",
        "value": "ZnSO₄·7H₂O – 22.0 g/L"
      },
      {
        "key": "Especificación",
        "value": "CoCl₂·6H₂O – 10.0 g/L"
      },
      {
        "key": "Especificación",
        "value": "MnCl₂·4H₂O – 180.0 g/L"
      },
      {
        "key": "Camaroneras",
        "value": ""
      },
      {
        "key": "Dosis inicial",
        "value": "10 kg/ha"
      },
      {
        "key": "Dosis de mantenimiento",
        "value": "1.5 kg/ha"
      }
    ]
    },
    en: {
      name: "Sodium Metasilicate",
      description: "Sodium Metasilicate is a soluble microgranulated fertilizer used in aquatic cultures, especially in laboratories and shrimp farms, to stimulate the production of diatom algae that serve as a natural food source for shrimp larvae and postlarvae.",
      benefits: [
        "Provides silicon to the aquatic environment, promoting diatom blooms",
        "Stimulates the production of natural food for shrimp in larval and postlarval stages",
        "Improves water quality and microbial environment in culture systems",
        "Compatible with standard protocols such as Guillard method in culture laboratories"
      ],
      presentation: [
        "25 kg bags",
        "1 kg bottles",
        "Shelf life: 24 months from manufacturing date",
        "Temperature below 25°C",
        "Cool, dry place protected from direct light"
      ],
      specifications: [
        { key: "Purity", value: "57.7%" },
        { key: "Format", value: "Soluble microgranulated" },
        { key: "Shrimp farms - Initial dose", value: "10 kg/ha" },
        { key: "Shrimp farms - Maintenance dose", value: "1.5 kg/ha" },
        { key: "Laboratories - Guillard method", value: "30 g/L dH₂O → 1 mL" },
        { key: "Chemical formula", value: "Na₂SiO₃·9H₂O" }
      ]
    },
    pt: {
      name: "Metassilicato de Sódio",
      description: "O Metassilicato de Sódio é um fertilizante microgranulado solúvel utilizado em cultivos aquáticos, especialmente em laboratórios e camaroneiras, para estimular a produção de algas diatomáceas que servem como fonte de alimento natural para larvas e pós-larvas de camarão.",
      benefits: [
        "Fornece silício ao meio aquático, promovendo florações de diatomáceas",
        "Estimula a produção de alimento natural para camarões em estágio larval e pós-larval",
        "Melhora a qualidade da água e do ambiente microbiano nos sistemas de cultivo",
        "Compatível com protocolos padrão como o método Guillard em laboratórios de cultivo"
      ],
      presentation: [
        "Sacos de 25 kg",
        "Frascos de 1 kg",
        "Vida útil: 24 meses desde a data de fabricação",
        "Temperatura inferior a 25°C",
        "Local fresco, seco e protegido da luz direta"
      ],
      specifications: [
        { key: "Pureza", value: "57,7%" },
        { key: "Formato", value: "Microgranulado solúvel" },
        { key: "Camaroneiras - Dose inicial", value: "10 kg/ha" },
        { key: "Camaroneiras - Dose de manutenção", value: "1,5 kg/ha" },
        { key: "Laboratórios - Método Guillard", value: "30 g/L dH₂O → 1 mL" },
        { key: "Fórmula química", value: "Na₂SiO₃·9H₂O" }
      ]
    }
  },

  // Nitrato de Sodio - QU010
  "QU010": {
    es: {
      name: "Nitrato de Sodio",
      description: "El Nitrato de Sodio es un fertilizante de alta pureza utilizado en cultivos acuáticos, especialmente en camaroneras, para fomentar la proliferación del fitoplancton y zooplancton, elementos clave en la cadena alimentaria de camarones y peces. Su aplicación mejora la calidad del ecosistema acuático y promueve un ambiente favorable para el desarrollo larval.",
      benefits: [
      "Fomenta la producción de fitoplancton y zooplancton, alimentos naturales esenciales en las etapas iniciales del cultivo de camarón y peces.",
      "El fitoplancton libera oxígeno durante el día, equilibrando el consumo por parte de bacterias, materia orgánica y otros organismos.",
      "Reduce la penetración de luz solar en el fondo del estanque, limitando el crecimiento de macrofitas indeseadas.",
      "Mejora la calidad del agua y el ambiente microbiano en estanques de cultivo."
    ],
      presentation: [
      "Presentación:",
      "Sacos de 25 kg",
      "Vida útil: 24 meses desde la fecha de fabricación",
      "Condiciones de almacenamiento:",
      "Lugar fresco, seco, a temperatura inferior a 25°C",
      "Mantener el producto cerrado en su empaque original",
      "Evitar el contacto con fuentes de calor o fuego (en caso de incendio, usar solo agua)"
    ],
      specifications: [
      {
        "key": "Pureza",
        "value": "99.3%"
      },
      {
        "key": "Tipo",
        "value": "Fertilizante nitrogenado"
      },
      {
        "key": "En camaroneras",
        "value": ""
      },
      {
        "key": "Relación recomendada N",
        "value": "P = 20:1 para promover floraciones óptimas de diatomeas."
      },
      {
        "key": "Dosis sugerida",
        "value": "20 kg/ha"
      }
    ]
    },
    en: {
      name: "Sodium Nitrate",
      description: "Sodium Nitrate is a high purity fertilizer used in aquatic cultures, especially in shrimp farms, to promote the proliferation of phytoplankton and zooplankton, key elements in the food chain of shrimp and fish. Its application improves the quality of the aquatic ecosystem and promotes a favorable environment for larval development.",
      benefits: [
        "Promotes the production of phytoplankton and zooplankton, essential natural foods",
        "Phytoplankton releases oxygen during the day, balancing system consumption",
        "Reduces sunlight penetration to the pond bottom",
        "Limits the growth of unwanted macrophytes",
        "Improves water quality and microbial environment in culture ponds"
      ],
      presentation: [
        "25 kg bags",
        "Shelf life: 24 months from manufacturing date",
        "Cool, dry place at temperature below 25°C",
        "Keep product closed in original packaging",
        "Avoid contact with heat sources or fire"
      ],
      specifications: [
        { key: "Purity", value: "99.3%" },
        { key: "Type", value: "Nitrogen fertilizer" },
        { key: "Recommended ratio", value: "N:P = 20:1" },
        { key: "Suggested dose", value: "20 kg/ha" },
        { key: "Chemical formula", value: "NaNO₃" }
      ]
    },
    pt: {
      name: "Nitrato de Sódio",
      description: "O Nitrato de Sódio é um fertilizante de alta pureza utilizado em cultivos aquáticos, especialmente em camaroneiras, para fomentar a proliferação do fitoplâncton e zooplâncton, elementos-chave na cadeia alimentar de camarões e peixes. Sua aplicação melhora a qualidade do ecossistema aquático e promove um ambiente favorável para o desenvolvimento larval.",
      benefits: [
        "Fomenta a produção de fitoplâncton e zooplâncton, alimentos naturais essenciais",
        "O fitoplâncton libera oxigênio durante o dia, equilibrando o consumo do sistema",
        "Reduz a penetração da luz solar no fundo do viveiro",
        "Limita o crescimento de macrófitas indesejadas",
        "Melhora a qualidade da água e o ambiente microbiano em viveiros de cultivo"
      ],
      presentation: [
        "Sacos de 25 kg",
        "Vida útil: 24 meses desde a data de fabricação",
        "Local fresco, seco, em temperatura inferior a 25°C",
        "Manter o produto fechado em sua embalagem original",
        "Evitar o contato com fontes de calor ou fogo"
      ],
      specifications: [
        { key: "Pureza", value: "99,3%" },
        { key: "Tipo", value: "Fertilizante nitrogenado" },
        { key: "Relação recomendada", value: "N:P = 20:1" },
        { key: "Dose sugerida", value: "20 kg/ha" },
        { key: "Fórmula química", value: "NaNO₃" }
      ]
    }
  },

  // Nitrato Sódico Potásico - QU011
  "QU011": {
    es: {
      name: "Nitrato Sódico Potásico",
      description: "El Nitrato Sódico Potásico es un fertilizante natural especialmente formulado para mantener el equilibrio iónico en sistemas acuáticos. Aporta nitrógeno y potasio, elementos esenciales que mejoran el crecimiento, reducen el estrés fisiológico y fomentan el desarrollo del fitoplancton, fuente de alimento natural para camarones.",
      benefits: [
      "Evita desbalances iónicos al aportar potasio (K⁺), estabilizando el pH del sistema.",
      "Reduce la formación de fosfatos de calcio, que secuestran iones vitales como K y Mg.",
      "Promueve el crecimiento saludable de los camarones.",
      "Disminuye estrés, calambres musculares y mortalidades masivas.",
      "Incrementa la producción de microalgas, esenciales como alimento natural.",
      "Mejora el entorno acuático durante los períodos de muda."
    ],
      presentation: [
      "Presentación: Sacos de 25 kg",
      "Vida útil: 24 meses desde la fecha de fabricación",
      "Condiciones de almacenamiento:",
      "Lugar seco, fresco, a temperatura inferior a 25°C",
      "Mantener en empaque original, bien cerrado",
      "Proteger de la humedad y exposición solar",
      "APLICACIÓN:",
      "Camaroneras:",
      "Aplicar en relación N:P = 20:1 para floraciones de diatomeas",
      "Dosis recomendada: 20 kg por hectárea"
    ],
      specifications: [
      {
        "key": "Índice NPK",
        "value": "15-00-02"
      },
      {
        "key": "Contenido de Nitrógeno (N)",
        "value": "15%"
      },
      {
        "key": "Contenido de Potasio como K₂O",
        "value": "2%"
      },
      {
        "key": "Densidad aparente",
        "value": "1.1 Ton/m³"
      },
      {
        "key": "Ángulo de reposo",
        "value": "28˚"
      },
      {
        "key": "pH (10% en solución acuosa)",
        "value": "Neutro"
      },
      {
        "key": "Solubilidad en agua (20°C)",
        "value": "85 kg por cada 100 L"
      },
      {
        "key": "Apariencia",
        "value": "Cristales blancos e inodoros"
      }
    ]
    },
    en: {
      name: "Sodium Potassium Nitrate",
      description: "Sodium Potassium Nitrate is a natural fertilizer specially formulated to maintain ionic balance in aquatic systems. It provides nitrogen and potassium, essential elements that improve growth, reduce physiological stress and promote phytoplankton development, a natural food source for shrimp.",
      benefits: [
        "Prevents ionic imbalances by providing potassium (K⁺), stabilizing system pH",
        "Reduces calcium phosphate formation, which sequesters vital ions like K and Mg",
        "Promotes healthy shrimp growth",
        "Decreases stress, muscle cramps and mass mortalities",
        "Increases microalgae production, essential as natural food",
        "Improves aquatic environment during molting periods"
      ],
      presentation: [
        "25 kg bags",
        "Shelf life: 24 months from manufacturing date",
        "Dry, cool place at temperature below 25°C",
        "Keep in original packaging, tightly closed",
        "Protect from moisture and sun exposure"
      ],
      specifications: [
        { key: "NPK Index", value: "15-00-02" },
        { key: "Nitrogen (N) content", value: "15%" },
        { key: "Potassium as K₂O content", value: "2%" },
        { key: "Bulk density", value: "1.1 Ton/m³" },
        { key: "pH (10% in aqueous solution)", value: "Neutral" },
        { key: "Water solubility (20°C)", value: "85 kg per 100 L" },
        { key: "Appearance", value: "White and odorless crystals" },
        { key: "Shrimp farms - Recommended dose", value: "20 kg per hectare" }
      ]
    },
    pt: {
      name: "Nitrato Sódico Potássico",
      description: "O Nitrato Sódico Potássico é um fertilizante natural especialmente formulado para manter o equilíbrio iônico em sistemas aquáticos. Fornece nitrogênio e potássio, elementos essenciais que melhoram o crescimento, reduzem o estresse fisiológico e fomentam o desenvolvimento do fitoplâncton, fonte de alimento natural para camarões.",
      benefits: [
        "Evita desequilíbrios iônicos ao fornecer potássio (K⁺), estabilizando o pH do sistema",
        "Reduz a formação de fosfatos de cálcio, que sequestram íons vitais como K e Mg",
        "Promove o crescimento saudável dos camarões",
        "Diminui estresse, cãibras musculares e mortalidades em massa",
        "Incrementa a produção de microalgas, essenciais como alimento natural",
        "Melhora o ambiente aquático durante os períodos de muda"
      ],
      presentation: [
        "Sacos de 25 kg",
        "Vida útil: 24 meses desde a data de fabricação",
        "Local seco, fresco, em temperatura inferior a 25°C",
        "Manter na embalagem original, bem fechada",
        "Proteger da umidade e exposição solar"
      ],
      specifications: [
        { key: "Índice NPK", value: "15-00-02" },
        { key: "Conteúdo de Nitrogênio (N)", value: "15%" },
        { key: "Conteúdo de Potássio como K₂O", value: "2%" },
        { key: "Densidade aparente", value: "1,1 Ton/m³" },
        { key: "pH (10% em solução aquosa)", value: "Neutro" },
        { key: "Solubilidade em água (20°C)", value: "85 kg por cada 100 L" },
        { key: "Aparência", value: "Cristais brancos e inodoros" },
        { key: "Camaroneiras - Dose recomendada", value: "20 kg por hectare" }
      ]
    }
  },

  // Orthotolidine (OTO) - QU012
  "QU012": {
    es: {
      name: "Orthotolidine (OTO)",
      description: "Reactivo líquido utilizado para la determinación cualitativa y semicuantitativa de cloro en el agua de piscinas, tanques y reservorios, mediante un cambio de color fácil de interpretar. Ideal para aplicaciones en laboratorios de acuicultura y sistemas de tratamiento de agua.",
      benefits: [
      "Método rápido y simple para verificar presencia y concentración de cloro",
      "Útil para asegurar niveles seguros de cloro en sistemas de acuicultura",
      "Ideal para uso en laboratorios, criaderos y centros de cultivo acuático",
      "No requiere instrumentación especializada"
    ],
      presentation: [
      "Presentación: Frascos de 240 ml",
      "Condiciones de almacenamiento:",
      "Mantener en lugar seco, fresco y ventilado",
      "Proteger de la luz solar directa",
      "Mantener alejado del alcance de niños y agentes corrosivos"
    ],
      specifications: [
      {
        "key": "Nombre químico",
        "value": "N,N-Dietil-P-Fenilendiamina"
      },
      {
        "key": "Apariencia",
        "value": "Líquido incoloro a blanco"
      },
      {
        "key": "Solubilidad",
        "value": "Soluble en agua"
      },
      {
        "key": "Reacción colorimétrica",
        "value": ""
      },
      {
        "key": "0.0 mg/l cloro",
        "value": "Transparente, sin color"
      },
      {
        "key": "0.3 mg/l cloro",
        "value": "Amarillo muy pálido"
      },
      {
        "key": "3.0 mg/l cloro",
        "value": "Amarillo intenso"
      },
      {
        "key": "Especificación",
        "value": "Llenar un tubo de ensayo con 10 ml de agua a analizar."
      },
      {
        "key": "Especificación",
        "value": "Añadir 4 gotas de OTO (Orthotolidine)."
      },
      {
        "key": "Especificación",
        "value": "Tapar y agitar suavemente para mezclar."
      },
      {
        "key": "Especificación",
        "value": "Comparar el color obtenido con los estándares de color del comparador bajo luz natural."
      }
    ]
    },
    en: {
      name: "Orthotolidine (OTO)",
      description: "Liquid reagent used for qualitative and semi-quantitative determination of chlorine in pool, tank and reservoir water, through an easy-to-interpret color change. Ideal for applications in aquaculture laboratories and water treatment systems.",
      benefits: [
        "Quick and simple method to verify chlorine presence and concentration",
        "Useful for ensuring safe chlorine levels in aquaculture systems",
        "Ideal for use in laboratories, hatcheries and aquatic culture centers",
        "Does not require specialized instrumentation"
      ],
      presentation: [
        "240 ml bottles",
        "Keep in dry, cool and ventilated place",
        "Protect from direct sunlight",
        "Keep away from children and corrosive agents"
      ],
      specifications: [
        { key: "Chemical name", value: "N,N-Diethyl-P-Phenylenediamine" },
        { key: "Appearance", value: "Colorless to white liquid" },
        { key: "Solubility", value: "Soluble in water" },
        { key: "0.0 mg/l chlorine", value: "Transparent, colorless" },
        { key: "0.3 mg/l chlorine", value: "Very pale yellow" },
        { key: "3.0 mg/l chlorine", value: "Intense yellow" },
        { key: "Water sample", value: "10 ml" },
        { key: "Dosage", value: "4 drops of OTO" }
      ]
    },
    pt: {
      name: "Ortotoluidina (OTO)",
      description: "Reagente líquido utilizado para determinação qualitativa e semi-quantitativa de cloro na água de piscinas, tanques e reservatórios, através de uma mudança de cor fácil de interpretar. Ideal para aplicações em laboratórios de aquicultura e sistemas de tratamento de água.",
      benefits: [
        "Método rápido e simples para verificar presença e concentração de cloro",
        "Útil para assegurar níveis seguros de cloro em sistemas de aquicultura",
        "Ideal para uso em laboratórios, criadouros e centros de cultivo aquático",
        "Não requer instrumentação especializada"
      ],
      presentation: [
        "Frascos de 240 ml",
        "Manter em local seco, fresco e ventilado",
        "Proteger da luz solar direta",
        "Manter longe do alcance de crianças e agentes corrosivos"
      ],
      specifications: [
        { key: "Nome químico", value: "N,N-Dietil-P-Fenilenodiamina" },
        { key: "Aparência", value: "Líquido incolor a branco" },
        { key: "Solubilidade", value: "Solúvel em água" },
        { key: "0,0 mg/l cloro", value: "Transparente, sem cor" },
        { key: "0,3 mg/l cloro", value: "Amarelo muito pálido" },
        { key: "3,0 mg/l cloro", value: "Amarelo intenso" },
        { key: "Amostra de água", value: "10 ml" },
        { key: "Dosagem", value: "4 gotas de OTO" }
      ]
    }
  },

  // Percarbonato de Sodio - QU013
  "QU013": {
    es: {
      name: "Percarbonato de Sodio",
      description: "El Percarbonato de Sodio es un compuesto con propiedades desinfectantes, oxigenantes y antiparasitarias, utilizado en sistemas acuáticos como laboratorios de larvas y camaroneras. Su acción se basa en la liberación gradual de oxígeno, permitiendo el control de bacterias, algas y materia orgánica en el sedimento.",
      benefits: [
      "Controla algas no deseadas",
      "Efecto antiparasitario y desinfectante",
      "Libera oxígeno de forma paulatina, mejorando la calidad del agua",
      "Reduce bacterias y materia orgánica en el sedimento",
      "Apto para agua dulce, salobre y salada"
    ],
      presentation: [
      "Presentación:",
      "Sacos de 25 kg",
      "Condiciones de almacenamiento:",
      "Lugar fresco y seco, alejado de la luz directa del sol",
      "Lejos de combustibles y agentes corrosivos",
      "Mantener en su empaque original, bien sellado",
      "No apto para consumo humano"
    ],
      specifications: [
      {
        "key": "Pureza",
        "value": "98%"
      },
      {
        "key": "Origen",
        "value": "China"
      },
      {
        "key": "Certificaciones",
        "value": ""
      },
      {
        "key": "EDQM",
        "value": "Dirección Europea para la Calidad de Medicamentos"
      },
      {
        "key": "CEP",
        "value": "Certificado de Conformidad con Farmacopeas Europeas"
      },
      {
        "key": "Laboratorio de larvas",
        "value": "2–3 ppm por la noche (a partir del estadio Mysis)"
      },
      {
        "key": "Camaroneras",
        "value": "10–15 kg/ha"
      },
      {
        "key": "Control de algas",
        "value": "2.5 ppm"
      }
    ]
    },
    en: {
      name: "Sodium Percarbonate",
      description: "Sodium Percarbonate is a compound with disinfectant, oxygenating and antiparasitic properties, used in aquatic systems such as larval laboratories and shrimp farms. Its action is based on the gradual release of oxygen, allowing the control of bacteria, algae and organic matter in sediment.",
      benefits: [
        "Controls unwanted algae",
        "Antiparasitic and disinfectant effect",
        "Gradually releases oxygen, improving water quality",
        "Reduces bacteria and organic matter in sediment",
        "Suitable for fresh, brackish and salt water"
      ],
      presentation: [
        "25 kg bags",
        "Cool and dry place, away from direct sunlight",
        "Away from fuels and corrosive agents",
        "Keep in original packaging, well sealed",
        "Not suitable for human consumption"
      ],
      specifications: [
        { key: "Purity", value: "98%" },
        { key: "Origin", value: "China" },
        { key: "Certifications", value: "EDQM: European Directorate for the Quality of Medicines" },
        { key: "Certifications", value: "CEP: Certificate of Suitability to European Pharmacopoeia" },
        { key: "Larval laboratory", value: "2–3 ppm at night (from Mysis stage)" },
        { key: "Shrimp farms", value: "10–15 kg/ha" },
        { key: "Algae control", value: "2.5 ppm" }
      ]
    },
    pt: {
      name: "Percarbonato de Sódio",
      description: "O Percarbonato de Sódio é um composto com propriedades desinfetantes, oxigenantes e antiparasitárias, utilizado em sistemas aquáticos como laboratórios de larvas e camaroneiras. Sua ação baseia-se na liberação gradual de oxigênio, permitindo o controle de bactérias, algas e matéria orgânica no sedimento.",
      benefits: [
        "Controla algas indesejadas",
        "Efeito antiparasitário e desinfetante",
        "Libera oxigênio de forma gradual, melhorando a qualidade da água",
        "Reduz bactérias e matéria orgânica no sedimento",
        "Adequado para água doce, salobra e salgada"
      ],
      presentation: [
        "Sacos de 25 kg",
        "Local fresco e seco, longe da luz solar direta",
        "Longe de combustíveis e agentes corrosivos",
        "Manter na embalagem original, bem vedada",
        "Não adequado para consumo humano"
      ],
      specifications: [
        { key: "Pureza", value: "98%" },
        { key: "Origem", value: "China" },
        { key: "Certificações", value: "EDQM: Diretoria Europeia para a Qualidade de Medicamentos" },
        { key: "Certificações", value: "CEP: Certificado de Adequação à Farmacopeia Europeia" },
        { key: "Laboratório de larvas", value: "2–3 ppm à noite (a partir do estágio Mysis)" },
        { key: "Camaroneiras", value: "10–15 kg/ha" },
        { key: "Controle de algas", value: "2,5 ppm" }
      ]
    }
  },

  // Peróxido de Hidrógeno - QU014
  "QU014": {
    es: {
      name: "Peróxido de Hidrógeno",
      description: "El Peróxido de Hidrógeno (H₂O₂) es un potente agente oxidante y desinfectante utilizado en cultivos acuáticos para el control de bacterias anaeróbicas, hongos, mohos y materia orgánica. Libera oxígeno activo, mejorando los niveles de oxígeno disuelto en el agua y reduciendo la carga microbiana en ambientes de cultivo como camaroneras y laboratorios.",
      benefits: [
      "Mejora inmediata de oxígeno disuelto (DO)",
      "Oxida la materia orgánica acumulada en el sistema",
      "Destruye bacterias, hongos, mohos y agentes patógenos",
      "Reduce riesgos de enfermedades en el cultivo",
      "Ideal para sistemas de alta densidad y zonas con problemas de oxigenación"
    ],
      presentation: [
      "Presentación:",
      "Canecas de 30 kg y 35 kg",
      "Condiciones de almacenamiento:",
      "Vida útil: 24 meses desde su fabricación",
      "Almacenar en un lugar fresco y ventilado",
      "Mantener alejado de combustibles, calor y materiales corrosivos",
      "Uso exclusivo profesional – No apto para consumo humano"
    ],
      specifications: [
      {
        "key": "Pureza",
        "value": "50%"
      },
      {
        "key": "Origen",
        "value": "Corea del Sur"
      },
      {
        "key": "Certificaciones",
        "value": ""
      },
      {
        "key": "EDQM",
        "value": "European Directorate for the Quality of Medicines"
      },
      {
        "key": "CEP",
        "value": "Certificate of Suitability to the monographs of the European Pharmacopoeia"
      },
      {
        "key": "Incrementar oxígeno disuelto (DO)",
        "value": ""
      },
      {
        "key": "Especificación",
        "value": "Para 3.0 ppm DO → 8 L/ha"
      },
      {
        "key": "Especificación",
        "value": "Para 2.5 ppm DO → 10 L/ha"
      },
      {
        "key": "Especificación",
        "value": "Para 2.0 ppm DO → 12 L/ha"
      },
      {
        "key": "Como desinfectante (tanques/tuberías)",
        "value": "100 ppm"
      },
      {
        "key": "Especificación",
        "value": "Monitorear niveles de oxígeno cada hora tras su aplicación"
      }
    ]
    },
    en: {
      name: "Hydrogen Peroxide",
      description: "Hydrogen Peroxide (H₂O₂) is a powerful oxidizing and disinfectant agent used in aquatic cultures for the control of anaerobic bacteria, fungi, molds and organic matter. It releases active oxygen, improving dissolved oxygen levels in water and reducing microbial load in culture environments such as shrimp farms and laboratories.",
      benefits: [
        "Immediate improvement of dissolved oxygen (DO)",
        "Oxidizes organic matter accumulated in the system",
        "Destroys bacteria, fungi, molds and pathogenic agents",
        "Reduces disease risks in culture",
        "Ideal for high-density systems and areas with oxygenation problems"
      ],
      presentation: [
        "30 kg and 35 kg containers",
        "Shelf life: 24 months from manufacturing",
        "Store in a cool and ventilated place",
        "Keep away from fuels, heat and corrosive materials",
        "Professional use only – Not suitable for human consumption"
      ],
      specifications: [
        { key: "Purity", value: "50%" },
        { key: "Origin", value: "South Korea" },
        { key: "Certifications", value: "EDQM: European Directorate for the Quality of Medicines" },
        { key: "Certifications", value: "CEP: Certificate of Suitability to the European Pharmacopoeia" },
        { key: "For 3.0 ppm DO", value: "8 L/ha" },
        { key: "For 2.5 ppm DO", value: "10 L/ha" },
        { key: "For 2.0 ppm DO", value: "12 L/ha" },
        { key: "Disinfectant (tanks/pipes)", value: "100 ppm" }
      ]
    },
    pt: {
      name: "Peróxido de Hidrogênio",
      description: "O Peróxido de Hidrogênio (H₂O₂) é um potente agente oxidante e desinfetante utilizado em cultivos aquáticos para o controle de bactérias anaeróbicas, fungos, bolores e matéria orgânica. Libera oxigênio ativo, melhorando os níveis de oxigênio dissolvido na água e reduzindo a carga microbiana em ambientes de cultivo como camaroneiras e laboratórios.",
      benefits: [
        "Melhoria imediata do oxigênio dissolvido (OD)",
        "Oxida a matéria orgânica acumulada no sistema",
        "Destrói bactérias, fungos, bolores e agentes patógenos",
        "Reduz riscos de doenças no cultivo",
        "Ideal para sistemas de alta densidade e zonas com problemas de oxigenação"
      ],
      presentation: [
        "Recipientes de 30 kg e 35 kg",
        "Vida útil: 24 meses desde sua fabricação",
        "Armazenar em local fresco e ventilado",
        "Manter longe de combustíveis, calor e materiais corrosivos",
        "Uso exclusivo profissional – Não adequado para consumo humano"
      ],
      specifications: [
        { key: "Pureza", value: "50%" },
        { key: "Origem", value: "Coreia do Sul" },
        { key: "Certificações", value: "EDQM: Diretoria Europeia para a Qualidade de Medicamentos" },
        { key: "Certificações", value: "CEP: Certificado de Adequação à Farmacopeia Europeia" },
        { key: "Para 3,0 ppm OD", value: "8 L/ha" },
        { key: "Para 2,5 ppm OD", value: "10 L/ha" },
        { key: "Para 2,0 ppm OD", value: "12 L/ha" },
        { key: "Desinfetante (tanques/tubulações)", value: "100 ppm" }
      ]
    }
  },

  // Refrigerante Ecológico R507 - QU015
  "QU015": {
    es: {
      name: "Refrigerante Ecológico R507",
      description: "El R-507 es un refrigerante ecológico HFC (hidrógeno-flúor-carbono), en mezcla azeotrópica, ideal para aplicaciones de refrigeración comercial de media y baja temperatura (-10 a -15°C). No presenta deslizamiento de temperatura, lo que garantiza estabilidad térmica durante su uso. Es una alternativa eficiente y segura a gases refrigerantes tradicionales como R22 y R404.",
      benefits: [
      "No daña la capa de ozono (ODP = 0)",
      "Alta pureza y estabilidad térmica",
      "Compatible con sistemas que utilizan R22, R502, R404, R408A, HP80",
      "Biodegradable y más seguro para el medio ambiente que otros refrigerantes tradicionales",
      "Ideal para sistemas de refrigeración de baja y media temperatura comercial",
      "Mezcla azeotrópica: no cambia su composición durante la fase de evaporación"
    ],
      presentation: [
      "Presentación: Cilindros de 11.3 kg (no recargables)",
      "Condiciones de almacenamiento:",
      "Mantener en lugar fresco, ventilado y protegido del sol",
      "No exponer a temperaturas mayores de 52°C",
      "Mantener fuera del alcance de los niños y lejos de fuentes de calor o agentes corrosivos",
      "Vida útil: Según condiciones de almacenamiento y empaque original cerrado"
    ],
      specifications: [
      {
        "key": "Apariencia",
        "value": "Transparente"
      },
      {
        "key": "Olor",
        "value": "Inodoro"
      },
      {
        "key": "Pureza",
        "value": "≥ 99.5%"
      },
      {
        "key": "Ácido",
        "value": "Máx. 0.001%"
      },
      {
        "key": "Residuos evaporados",
        "value": "Máx. 0.01%"
      },
      {
        "key": "Gases no condensables",
        "value": "Máx. 1.5%"
      },
      {
        "key": "Potencial de calentamiento global (GWP)",
        "value": "3985"
      },
      {
        "key": "Potencial de agotamiento de ozono (ODP)",
        "value": "0"
      },
      {
        "key": "Clasificación de seguridad",
        "value": "A1 (baja toxicidad, no inflamable)"
      }
    ]
    },
    en: {
      name: "Ecological Refrigerant R507",
      description: "R-507 is an ecological HFC (hydrogen-fluorocarbon) refrigerant, in azeotropic mixture, ideal for medium and low temperature commercial refrigeration applications (-10 to -15°C). It does not present temperature drift, which guarantees thermal stability during use. It is an efficient and safe alternative to traditional refrigerant gases such as R22 and R404.",
      benefits: [
        "Does not damage the ozone layer (ODP = 0)",
        "High purity and thermal stability",
        "Compatible with systems using R22, R502, R404, R408A, HP80",
        "Biodegradable and safer for the environment",
        "Ideal for low and medium temperature commercial refrigeration systems",
        "Azeotropic mixture: does not change composition during evaporation"
      ],
      presentation: [
        "11.3 kg cylinders (non-refillable)",
        "Keep in cool, ventilated place protected from sun",
        "Do not expose to temperatures above 52°C",
        "Keep out of reach of children",
        "Away from heat sources or corrosive agents"
      ],
      specifications: [
        { key: "Appearance", value: "Transparent" },
        { key: "Odor", value: "Odorless" },
        { key: "Purity", value: "≥ 99.5%" },
        { key: "Acid", value: "Max. 0.001%" },
        { key: "Evaporated residues", value: "Max. 0.01%" },
        { key: "Non-condensable gases", value: "Max. 1.5%" },
        { key: "Global warming potential (GWP)", value: "3985" },
        { key: "Ozone depletion potential (ODP)", value: "0" },
        { key: "Safety classification", value: "A1 (low toxicity, non-flammable)" }
      ]
    },
    pt: {
      name: "Refrigerante Ecológico R507",
      description: "O R-507 é um refrigerante ecológico HFC (hidrogênio-flúor-carbono), em mistura azeotrópica, ideal para aplicações de refrigeração comercial de média e baixa temperatura (-10 a -15°C). Não apresenta deslizamento de temperatura, o que garante estabilidade térmica durante seu uso. É uma alternativa eficiente e segura aos gases refrigerantes tradicionais como R22 e R404.",
      benefits: [
        "Não prejudica a camada de ozônio (ODP = 0)",
        "Alta pureza e estabilidade térmica",
        "Compatível com sistemas que utilizam R22, R502, R404, R408A, HP80",
        "Biodegradável e mais seguro para o meio ambiente",
        "Ideal para sistemas de refrigeração de baixa e média temperatura comercial",
        "Mistura azeotrópica: não muda composição durante evaporação"
      ],
      presentation: [
        "Cilindros de 11,3 kg (não recarregáveis)",
        "Manter em local fresco, ventilado e protegido do sol",
        "Não expor a temperaturas superiores a 52°C",
        "Manter fora do alcance de crianças",
        "Longe de fontes de calor ou agentes corrosivos"
      ],
      specifications: [
        { key: "Aparência", value: "Transparente" },
        { key: "Odor", value: "Inodoro" },
        { key: "Pureza", value: "≥ 99,5%" },
        { key: "Ácido", value: "Máx. 0,001%" },
        { key: "Resíduos evaporados", value: "Máx. 0,01%" },
        { key: "Gases não condensáveis", value: "Máx. 1,5%" },
        { key: "Potencial de aquecimento global (GWP)", value: "3985" },
        { key: "Potencial de depleção de ozônio (ODP)", value: "0" },
        { key: "Classificação de segurança", value: "A1 (baixa toxicidade, não inflamável)" }
      ]
    }
  },

  // Sulfato de Aluminio - QU016
  "QU016": {
    es: {
      name: "Sulfato de Aluminio (SO4)3 Al2",
      description: "El sulfato de aluminio es un agente coagulante altamente eficaz, utilizado en acuicultura para clarificar el agua, controlar nutrientes y reducir la carga de patógenos. Su uso es común en sistemas de cultivo intensivo como criaderos de camarón y piscifactorías, donde se requiere mantener una alta calidad del agua.",
      benefits: [
      "Clarifica el agua al precipitar sólidos suspendidos y turbidez",
      "Controla nutrientes como el fósforo, ayudando a prevenir la eutrofización",
      "Reduce patógenos al eliminar materia orgánica en suspensión",
      "Mejora la calidad del agua y el ambiente para peces y camarones",
      "Favorece la salud y crecimiento de las especies acuáticas"
    ],
      presentation: [
      "Presentación: Sacos de 25 kg",
      "Condiciones de almacenamiento:",
      "Mantener en un lugar seco y ventilado",
      "Proteger de la luz solar directa",
      "Alejar de alimentos, bebidas, fuentes de fuego o chispas",
      "Mantener el empaque herméticamente cerrado",
      "Vida útil: 24 meses"
    ],
      specifications: [
      {
        "key": "Fórmula química",
        "value": "Al₂(SO₄)₃"
      },
      {
        "key": "Apariencia",
        "value": "Sólido cristalino blanco o levemente gris"
      },
      {
        "key": "Solubilidad",
        "value": "Alta solubilidad en agua"
      },
      {
        "key": "Origen",
        "value": "Turquía"
      },
      {
        "key": "Pureza típica",
        "value": "Grado técnico para uso acuícola"
      },
      {
        "key": "pH en solución acuosa",
        "value": "Ácido (efecto reductor del pH del agua)"
      },
      {
        "key": "Compatibilidad",
        "value": "Usado como coagulante en tratamientos de agua acuícola"
      }
    ]
    },
    en: {
      name: "Aluminum Sulfate (SO₄)₃ Al₂",
      description: "Aluminum sulfate is a highly effective coagulating agent used in aquaculture to clarify water, control nutrients and reduce pathogen load. Its use is common in intensive culture systems such as shrimp hatcheries and fish farms, where maintaining high water quality is required.",
      benefits: [
        "Clarifies water by precipitating suspended solids and turbidity",
        "Controls nutrients such as phosphorus, helping prevent eutrophication",
        "Reduces pathogens by removing suspended organic matter",
        "Improves water quality and environment for fish and shrimp",
        "Favors the health and growth of aquatic species"
      ],
      presentation: [
        "25 kg bags",
        "Keep in a dry and ventilated place",
        "Protect from direct sunlight",
        "Keep away from food, beverages, fire sources or sparks",
        "Keep package hermetically sealed",
        "Shelf life: 24 months"
      ],
      specifications: [
        { key: "Chemical formula", value: "Al₂(SO₄)₃" },
        { key: "Appearance", value: "White or slightly gray crystalline solid" },
        { key: "Solubility", value: "High water solubility" },
        { key: "Origin", value: "Turkey" },
        { key: "Typical purity", value: "Technical grade for aquaculture use" },
        { key: "pH in aqueous solution", value: "Acidic (water pH reducing effect)" },
        { key: "Compatibility", value: "Used as coagulant in aquaculture water treatments" }
      ]
    },
    pt: {
      name: "Sulfato de Alumínio (SO₄)₃ Al₂",
      description: "O sulfato de alumínio é um agente coagulante altamente eficaz, utilizado na aquicultura para clarificar a água, controlar nutrientes e reduzir a carga de patógenos. Seu uso é comum em sistemas de cultivo intensivo como criadouros de camarão e pisciculturas, onde é necessário manter alta qualidade da água.",
      benefits: [
        "Clarifica a água ao precipitar sólidos suspensos e turbidez",
        "Controla nutrientes como o fósforo, ajudando a prevenir a eutrofização",
        "Reduz patógenos ao eliminar matéria orgânica em suspensão",
        "Melhora a qualidade da água e o ambiente para peixes e camarões",
        "Favorece a saúde e crescimento das espécies aquáticas"
      ],
      presentation: [
        "Sacos de 25 kg",
        "Manter em local seco e ventilado",
        "Proteger da luz solar direta",
        "Manter longe de alimentos, bebidas, fontes de fogo ou faíscas",
        "Manter a embalagem hermeticamente fechada",
        "Vida útil: 24 meses"
      ],
      specifications: [
        { key: "Fórmula química", value: "Al₂(SO₄)₃" },
        { key: "Aparência", value: "Sólido cristalino branco ou levemente cinza" },
        { key: "Solubilidade", value: "Alta solubilidade em água" },
        { key: "Origem", value: "Turquia" },
        { key: "Pureza típica", value: "Grau técnico para uso aquícola" },
        { key: "pH em solução aquosa", value: "Ácido (efeito redutor do pH da água)" },
        { key: "Compatibilidade", value: "Usado como coagulante em tratamentos de água aquícola" }
      ]
    }
  },

  // Thiosulfato de Sodio - QU017
  "QU017": {
    es: {
      name: "Thiosulfato de Sodio",
      description: "El Tiosulfato de Sodio es un compuesto altamente eficaz para la neutralización del cloro en sistemas de acuicultura. Su uso es esencial en procesos que requieren la eliminación segura del cloro antes de la introducción de organismos acuáticos, especialmente nauplios, ya que el exceso de cloro puede causar deformidades y mortalidad temprana.",
      benefits: [
      "Neutraliza eficientemente el cloro en el agua",
      "Protege los nauplios y postlarvas de deformidades y estrés químico",
      "Compatible con sistemas de acuicultura, criaderos y laboratorios",
      "Evita toxicidad y mejora la tasa de supervivencia en larvicultura"
    ],
      presentation: [
      "Presentaciones:",
      "Sacos de 25 kg",
      "Frascos de 1 kg",
      "Condiciones de almacenamiento:",
      "Almacenar en un lugar seco, fresco y ventilado",
      "Evitar la exposición directa al sol y mantener alejado de fuentes de calor",
      "Mantener fuera del alcance de los niños y agentes corrosivos"
    ],
      specifications: [
      {
        "key": "Pureza",
        "value": "98.5%"
      },
      {
        "key": "Apariencia",
        "value": "Cristalino, soluble en agua"
      },
      {
        "key": "Certificaciones",
        "value": "EDQM y CEP"
      },
      {
        "key": "Inflamabilidad",
        "value": "Inflamable en altas concentraciones"
      },
      {
        "key": "Vida útil",
        "value": "24 meses a partir de la fecha de fabricación si se almacena en condiciones óptimas (≤ 25°C)"
      },
      {
        "key": "Neutralización de cloro",
        "value": ""
      },
      {
        "key": "Especificación",
        "value": "Se sugiere un rango de 2 a 7 g por tonelada de agua para neutralizar 1 parte de cloro."
      },
      {
        "key": "Especificación",
        "value": "La dosis exacta dependerá del nivel de cloro presente, aireación y recirculación del sistema."
      }
    ]
    },
    en: {
      name: "Sodium Thiosulfate",
      description: "Sodium Thiosulfate is a highly effective compound for chlorine neutralization in aquaculture systems. Its use is essential in processes that require safe chlorine removal before introducing aquatic organisms, especially nauplii, as excess chlorine can cause deformities and early mortality.",
      benefits: [
        "Efficiently neutralizes chlorine in water",
        "Protects nauplii and postlarvae from deformities and chemical stress",
        "Compatible with aquaculture systems, hatcheries and laboratories",
        "Prevents toxicity and improves survival rate in larviculture"
      ],
      presentation: [
        "25 kg bags",
        "1 kg bottles",
        "Store in a dry, cool and ventilated place",
        "Avoid direct sun exposure and keep away from heat sources",
        "Keep out of reach of children and corrosive agents"
      ],
      specifications: [
        { key: "Purity", value: "98.5%" },
        { key: "Appearance", value: "Crystalline, water soluble" },
        { key: "Certifications", value: "EDQM and CEP" },
        { key: "Flammability", value: "Flammable at high concentrations" },
        { key: "Shelf life", value: "24 months from manufacturing date (≤ 25°C)" },
        { key: "Chlorine neutralization", value: "2 to 7 g per ton of water to neutralize 1 part chlorine" }
      ]
    },
    pt: {
      name: "Tiossulfato de Sódio",
      description: "O Tiossulfato de Sódio é um composto altamente eficaz para a neutralização do cloro em sistemas de aquicultura. Seu uso é essencial em processos que requerem a remoção segura do cloro antes da introdução de organismos aquáticos, especialmente náuplios, já que o excesso de cloro pode causar deformidades e mortalidade precoce.",
      benefits: [
        "Neutraliza eficientemente o cloro na água",
        "Protege os náuplios e pós-larvas de deformidades e estresse químico",
        "Compatível com sistemas de aquicultura, criadouros e laboratórios",
        "Evita toxicidade e melhora a taxa de sobrevivência na larvicultura"
      ],
      presentation: [
        "Sacos de 25 kg",
        "Frascos de 1 kg",
        "Armazenar em local seco, fresco e ventilado",
        "Evitar exposição solar direta e manter longe de fontes de calor",
        "Manter fora do alcance de crianças e agentes corrosivos"
      ],
      specifications: [
        { key: "Pureza", value: "98,5%" },
        { key: "Aparência", value: "Cristalino, solúvel em água" },
        { key: "Certificações", value: "EDQM e CEP" },
        { key: "Inflamabilidade", value: "Inflamável em altas concentrações" },
        { key: "Vida útil", value: "24 meses a partir da data de fabricação (≤ 25°C)" },
        { key: "Neutralização de cloro", value: "2 a 7 g por tonelada de água para neutralizar 1 parte de cloro" }
      ]
    }
  },

  // Trilon B - EDTA - QU018
  "QU018": {
    es: {
      name: "Trilon B - EDTA",
      description: "Trilon B es un agente quelante producido por BASF, compuesto por sales de sodio de EDTA. Su función principal es la quelación de metales pesados como hierro, magnesio y cobre en soluciones acuosas. Es ampliamente utilizado en acuicultura en procesos de maduración, larvicultura y transporte de larvas. Es estable, biodegradable y respetuoso con el ecosistema.",
      benefits: [
      "Quelante eficaz de metales pesados, especialmente hierro, cobre y magnesio",
      "Ayuda a mantener condiciones de agua estables y seguras en acuicultura",
      "Biodegradable y ecológico, ideal para sistemas sustentables",
      "Mejora la calidad del agua, reduciendo toxicidades por metales",
      "Facilita procesos críticos como la maduración y transporte larval",
      "Compatible con otras soluciones y suplementos acuícolas"
    ],
      presentation: [
      "Polvo: Sacos de 25 kg",
      "Líquido: Tambores de 250 kg",
      "Vida útil: 2 años en empaque original sellado a temperatura ambiente",
      "Una vez abierto, debe usarse inmediatamente",
      "Almacenar en lugar fresco, seco y ventilado"
    ],
      specifications: [
      {
        "key": "Trilon B líquido",
        "value": "39%"
      },
      {
        "key": "Trilon B polvo",
        "value": "87%"
      },
      {
        "key": "Trilon M polvo",
        "value": "87%"
      },
      {
        "key": "Maduración",
        "value": ""
      },
      {
        "key": "Tanques de desove",
        "value": "5 – 10 ppm Trilon B líquido"
      },
      {
        "key": "Reservorios para desove",
        "value": "2 – 5 ppm Trilon M"
      },
      {
        "key": "Agua para nauplios",
        "value": "2 – 5 ppm Trilon B líquido"
      },
      {
        "key": "Larvicultura",
        "value": ""
      },
      {
        "key": "Siembra a Mysis 3",
        "value": "10 ppm Trilon B"
      },
      {
        "key": "Reservorios de producción",
        "value": "10 – 20 ppm"
      },
      {
        "key": "Transporte de larvas",
        "value": "10 ppm Trilon B"
      },
      {
        "key": "Medidas de seguridad",
        "value": ""
      },
      {
        "key": "Especificación",
        "value": "Producto inflamable"
      },
      {
        "key": "Especificación",
        "value": "Utilizar ropa de protección"
      },
      {
        "key": "Especificación",
        "value": "Mantener fuera del alcance de los niños"
      }
    ]
    },
    en: {
      name: "Trilon B - EDTA",
      description: "Trilon B is a chelating agent produced by BASF, composed of sodium salts of EDTA. Its main function is the chelation of heavy metals such as iron, magnesium and copper in aqueous solutions. It is widely used in aquaculture in maturation, larviculture and larval transport processes. It is stable, biodegradable and ecosystem-friendly.",
      benefits: [
        "Effective chelant of heavy metals, especially iron, copper and magnesium",
        "Helps maintain stable and safe water conditions in aquaculture",
        "Biodegradable and ecological, ideal for sustainable systems",
        "Improves water quality during critical processes such as maturation and larviculture",
        "Compatible with all stages of shrimp culture",
        "Stable product with long shelf life"
      ],
      presentation: [
        "Trilon B liquid: Various presentations",
        "Trilon B powder: Bags and smaller containers",
        "Trilon M powder: Specific presentations",
        "Use protective clothing",
        "Keep out of reach of children",
        "Flammable product - necessary precautions"
      ],
      specifications: [
        { key: "Trilon B liquid", value: "39%" },
        { key: "Trilon B powder", value: "87%" },
        { key: "Trilon M powder", value: "87%" },
        { key: "Maturation - Spawning tanks", value: "5 – 10 ppm Trilon B liquid" },
        { key: "Maturation - Spawning reservoirs", value: "2 – 5 ppm Trilon M" },
        { key: "Maturation - Water for nauplii", value: "2 – 5 ppm Trilon B liquid" },
        { key: "Larviculture - Stocking to Mysis 3", value: "10 ppm Trilon B" },
        { key: "Production reservoirs", value: "10 – 20 ppm" },
        { key: "Larval transport", value: "10 ppm Trilon B" }
      ]
    },
    pt: {
      name: "Trilon B - EDTA",
      description: "Trilon B é um agente quelante produzido pela BASF, composto por sais de sódio de EDTA. Sua função principal é a quelação de metais pesados como ferro, magnésio e cobre em soluções aquosas. É amplamente utilizado na aquicultura em processos de maturação, larvicultura e transporte de larvas. É estável, biodegradável e respeitoso com o ecossistema.",
      benefits: [
        "Quelante eficaz de metais pesados, especialmente ferro, cobre e magnésio",
        "Ajuda a manter condições de água estáveis e seguras na aquicultura",
        "Biodegradável e ecológico, ideal para sistemas sustentáveis",
        "Melhora a qualidade da água durante processos críticos como maturação e larvicultura",
        "Compatível com todas as etapas do cultivo de camarão",
        "Produto estável com longa vida útil"
      ],
      presentation: [
        "Trilon B líquido: Apresentações variadas",
        "Trilon B pó: Sacos e recipientes menores",
        "Trilon M pó: Apresentações específicas",
        "Utilizar roupas de proteção",
        "Manter fora do alcance de crianças",
        "Produto inflamável - precauções necessárias"
      ],
      specifications: [
        { key: "Trilon B líquido", value: "39%" },
        { key: "Trilon B pó", value: "87%" },
        { key: "Trilon M pó", value: "87%" },
        { key: "Maturação - Tanques de desova", value: "5 – 10 ppm Trilon B líquido" },
        { key: "Maturação - Reservatórios para desova", value: "2 – 5 ppm Trilon M" },
        { key: "Maturação - Água para náuplios", value: "2 – 5 ppm Trilon B líquido" },
        { key: "Larvicultura - Estocagem a Mysis 3", value: "10 ppm Trilon B" },
        { key: "Reservatórios de produção", value: "10 – 20 ppm" },
        { key: "Transporte de larvas", value: "10 ppm Trilon B" }
      ]
    }
  },

  // Filtro de Cartucho Plisado - EQ006
  "EQ006": {
    es: {
      name: "Cámara Neubauer",
      description: "Cámara de Neubauer o hemocitómetro es un instrumento para realizar el\nrecuento de esporas y células en un medio líquido.",
      benefits: [
      "Esta cámara de recuento está adaptada al microscopio de campo claro o al de",
      "contraste de fases. Se cubre la cámara con un cubreobjetos que se adhiere por",
      "simple tensión superficial (en especial una vez que se haya añadido la muestra",
      "líquida)."
    ],
      presentation: [],
      specifications: [
      {
        "key": "El cálculo de la concentración de células se puede expresar así",
        "value": ""
      },
      {
        "key": "Especificación",
        "value": "Partículas / μl = (partículas contadas) / [ (superficie contada (mm²)"
      },
      {
        "key": "Especificación",
        "value": "profundidad de la cámara (mm) ] dilución."
      }
    ]
    },
    en: {
      name: "Pleated Cartridge Filter",
      description: "Pleated cartridge filters are designed for high-efficiency filtration in aquaculture water systems. Their pleated design maximizes filtration surface area, providing superior retention of particles and contaminants. Manufactured with corrosion-resistant materials compatible with seawater.",
      benefits: [
        "Maximum filtration surface thanks to pleated design",
        "High capacity for suspended particle retention",
        "Corrosion resistant and seawater compatible",
        "Easy installation and maintenance",
        "Significantly improves water quality",
        "Long lifespan in marine conditions"
      ],
      presentation: [
        "10-inch filters: Standard for small systems",
        "20-inch filters: For medium systems",
        "30-inch filters: For large systems",
        "Different micron ratings available",
        "Compatible with industry standard housings"
      ],
      specifications: [
        { key: "Available length", value: "10, 20, 30 inches" },
        { key: "Micron rating", value: "1, 5, 10, 25, 50 microns" },
        { key: "Material", value: "Pleated polypropylene" },
        { key: "Maximum temperature", value: "60°C" },
        { key: "Maximum pressure", value: "6 bar" },
        { key: "Connection", value: "Standard 2.5 inches" }
      ]
    },
    pt: {
      name: "Filtro de Cartucho Plissado",
      description: "Os filtros de cartucho plissado são projetados para filtração de alta eficiência em sistemas de água para aquicultura. Seu design plissado maximiza a área de superfície de filtração, proporcionando retenção superior de partículas e contaminantes. Fabricados com materiais resistentes à corrosão e compatíveis com água salgada.",
      benefits: [
        "Máxima superfície de filtração graças ao design plissado",
        "Alta capacidade de retenção de partículas suspensas",
        "Resistente à corrosão e compatível com água salgada",
        "Fácil instalação e manutenção",
        "Melhora significativamente a qualidade da água",
        "Longa vida útil em condições marinhas"
      ],
      presentation: [
        "Filtros de 10 polegadas: Padrão para sistemas pequenos",
        "Filtros de 20 polegadas: Para sistemas médios",
        "Filtros de 30 polegadas: Para sistemas grandes",
        "Diferentes níveis de micronagem disponíveis",
        "Compatível com carcaças padrão da indústria"
      ],
      specifications: [
        { key: "Comprimento disponível", value: "10, 20, 30 polegadas" },
        { key: "Micronagem", value: "1, 5, 10, 25, 50 mícrons" },
        { key: "Material", value: "Polipropileno plissado" },
        { key: "Temperatura máxima", value: "60°C" },
        { key: "Pressão máxima", value: "6 bar" },
        { key: "Conexão", value: "Padrão 2,5 polegadas" }
      ]
    }
  },

  // Sistema de Aireación por Difusores - EQ007
  "EQ007": {
    es: {
      name: "Cámara Sedgewick",
      description: "Cámara de recuento Sedgewick Rafter para contar partículas y\nmicroorganismos en 1 ml de agua u otros líquidos transparentes.",
      benefits: [
      "Diseñadas para facilitar el recuento de grandes cantidades de zooplancton.",
      "El pequeño tamaño de nuestras cámaras, hace que sean aptas para utilizarse en",
      "microscopio estereoscópico."
    ],
      presentation: [],
      specifications: [
      {
        "key": "Especificación",
        "value": "La cámara de 50 x 20 x 1 mm (= 1 cm³) es graduada con un retículo de 1 mm que"
      },
      {
        "key": "Especificación",
        "value": "subdivide 1 ml en 1000 μl."
      },
      {
        "key": "Especificación",
        "value": "Entrega con un cubreobjetos aprox. 60 x 30 x 1 mm"
      },
      {
        "key": "Especificación",
        "value": "No se necesita el retículo para muchas aplicaciones, sobre todo para métodos"
      },
      {
        "key": "Especificación",
        "value": "APHA y al analizar grandes especies de plancton."
      },
      {
        "key": "Especificación",
        "value": "Es apta para el uso con microscopios convencionales y microscopios invertidos."
      },
      {
        "key": "Especificación",
        "value": "Se puede usar en combinación con micrómetros oculares."
      }
    ]
    },
    en: {
      name: "Diffuser Aeration System",
      description: "Complete diffuser aeration system designed specifically for shrimp ponds and aquaculture systems. Includes high-efficiency diffusers that generate fine bubbles to maximize oxygen transfer. The system optimizes water oxygenation maintaining ideal levels for shrimp growth.",
      benefits: [
        "High efficiency oxygen transfer",
        "Uniform oxygen distribution throughout the pond",
        "Reduces stress in aquatic organisms",
        "Low energy consumption system",
        "Easy installation and maintenance",
        "Significantly improves survival rates"
      ],
      presentation: [
        "Basic kit: For ponds up to 1 hectare",
        "Medium kit: For ponds 1-3 hectares",
        "Large kit: For ponds over 3 hectares",
        "Additional diffusers available separately",
        "Includes installation hoses and connectors"
      ],
      specifications: [
        { key: "Diffuser type", value: "Micro-perforated membrane" },
        { key: "Bubble size", value: "1-3 mm" },
        { key: "Working pressure", value: "0.5-2.0 bar" },
        { key: "Transfer capacity", value: "2.5-4.0 kg O2/kWh" },
        { key: "Material", value: "UV-resistant EPDM" },
        { key: "Lifespan", value: "3-5 years" }
      ]
    },
    pt: {
      name: "Sistema de Aeração por Difusores",
      description: "Sistema completo de aeração por difusores projetado especificamente para viveiros de camarão e sistemas aquícolas. Inclui difusores de alta eficiência que geram bolhas finas para maximizar a transferência de oxigênio. O sistema otimiza a oxigenação da água mantendo níveis ideais para o crescimento de camarões.",
      benefits: [
        "Transferência de oxigênio de alta eficiência",
        "Distribuição uniforme de oxigênio em todo o viveiro",
        "Reduz o estresse nos organismos aquáticos",
        "Sistema de baixo consumo energético",
        "Fácil instalação e manutenção",
        "Melhora significativamente as taxas de sobrevivência"
      ],
      presentation: [
        "Kit básico: Para viveiros até 1 hectare",
        "Kit médio: Para viveiros de 1-3 hectares",
        "Kit grande: Para viveiros superiores a 3 hectares",
        "Difusores adicionais disponíveis separadamente",
        "Inclui mangueiras e conectores de instalação"
      ],
      specifications: [
        { key: "Tipo de difusor", value: "Membrana microperfurada" },
        { key: "Tamanho da bolha", value: "1-3 mm" },
        { key: "Pressão de trabalho", value: "0,5-2,0 bar" },
        { key: "Capacidade de transferência", value: "2,5-4,0 kg O2/kWh" },
        { key: "Material", value: "EPDM resistente a UV" },
        { key: "Vida útil", value: "3-5 anos" }
      ]
    }
  },

  // Bomba Centrífuga de Agua Salada - EQ008
  "EQ008": {
    es: {
      name: "Chemetrics Kit de Alcalinidad Total",
      description: "Las pruebas de alcalinidad total de CHEMETRICS determinan el total usando un valorante de ácido clorhídrico y un indicador verde de bromocresol/rojo de\nmetilo. Los resultados son expresados como ppm (mg/L) CaCO3.",
      benefits: [
      "Titulantes de un solo uso sellado y confiable.",
      "Procedimiento rápido y sencillo: no es necesario contar las gotas.",
      "No se necesitan buretas ni otros equipos.",
      "Se puede realizar una titulación en cualquier lugar.",
      "Apagado automático"
    ],
      presentation: [
      "30 pruebas de titulación de alcalinidad total: treinta ampollas con conjuntos de válvulas, solución activadora, titulador, vaso de muestra de 25 ml e instrucciones."
    ],
      specifications: []
    },
    en: {
      name: "Saltwater Centrifugal Pump",
      description: "Specialized centrifugal pump for saltwater handling in aquaculture systems. Built with corrosion-resistant materials to ensure lasting performance in marine environments. Ideal for filling and draining ponds, water recirculation and filtration systems in shrimp farms.",
      benefits: [
        "Superior resistance to saltwater corrosion",
        "High flow rate with optimized energy efficiency",
        "Robust design for continuous operation",
        "Minimal maintenance required",
        "Quiet operation and reduced vibration",
        "Versatile horizontal or vertical installation"
      ],
      presentation: [
        "1 HP pump: For small and medium systems",
        "3 HP pump: For medium and large systems",
        "5 HP pump: For industrial systems",
        "Includes coupling and mounting base",
        "High-efficiency three-phase electric motor"
      ],
      specifications: [
        { key: "Available power", value: "1, 3, 5 HP" },
        { key: "Maximum flow", value: "50-200 m³/h" },
        { key: "Head", value: "15-40 meters" },
        { key: "Maximum suction", value: "8 meters" },
        { key: "Impeller material", value: "316 stainless steel" },
        { key: "Connections", value: "2, 3, 4 inches" }
      ]
    },
    pt: {
      name: "Bomba Centrífuga de Água Salgada",
      description: "Bomba centrífuga especializada para manuseio de água salgada em sistemas aquícolas. Construída com materiais resistentes à corrosão para garantir desempenho duradouro em ambientes marinhos. Ideal para enchimento e esvaziamento de viveiros, recirculação de água e sistemas de filtração em fazendas de camarão.",
      benefits: [
        "Resistência superior à corrosão da água salgada",
        "Alto fluxo com eficiência energética otimizada",
        "Design robusto para operação contínua",
        "Manutenção mínima requerida",
        "Operação silenciosa e vibração reduzida",
        "Instalação versátil horizontal ou vertical"
      ],
      presentation: [
        "Bomba 1 HP: Para sistemas pequenos e médios",
        "Bomba 3 HP: Para sistemas médios e grandes",
        "Bomba 5 HP: Para sistemas industriais",
        "Inclui acoplamento e base de montagem",
        "Motor elétrico trifásico de alta eficiência"
      ],
      specifications: [
        { key: "Potência disponível", value: "1, 3, 5 HP" },
        { key: "Vazão máxima", value: "50-200 m³/h" },
        { key: "Altura manométrica", value: "15-40 metros" },
        { key: "Sucção máxima", value: "8 metros" },
        { key: "Material do impulsor", value: "Aço inoxidável 316" },
        { key: "Conexões", value: "2, 3, 4 polegadas" }
      ]
    }
  },

  // Medidor de Oxígeno Disuelto Digital - EQ009
  "EQ009": {
    es: {
      name: "Chemetrics Kit de Amonio",
      description: "Kit de Amonio Chemetrics, permite realizar pruebas para determinar concentraciones de amoníaco, son aplicables para acuarios, piscinas camaroneras, efluentes de aguas residuales, agua de mar, abastecimientos naturales de agua, aguas de calderas, aguas de reposición, etc.",
      benefits: [],
      presentation: [
      "30 ampollas"
    ],
      specifications: [
      {
        "key": "Especificación",
        "value": "El kit emplea la nesslerización directa. En una solución sumamente alcalina, el amoníaco reacciona con reactivo de Nessler (K2HgI4) para producir un complejo de color amarillo en proporción directa a la concentración de"
      },
      {
        "key": "Especificación",
        "value": "amoníaco."
      }
    ]
    },
    en: {
      name: "Digital Dissolved Oxygen Meter",
      description: "High-precision digital meter for dissolved oxygen monitoring in aquaculture systems. Equipped with fast-response electrochemical sensor and easy-to-read LCD display. Essential for maintaining optimal oxygen levels in shrimp ponds and ensuring the health of aquatic organisms.",
      benefits: [
        "Accurate and reliable dissolved oxygen measurement",
        "Fast response electrochemical sensor",
        "Large, easy-to-read LCD display",
        "Automatic and manual calibration available",
        "Water resistant with IP67 protection",
        "Memory to store up to 1000 readings"
      ],
      presentation: [
        "Portable meter: With carrying case",
        "Oxygen probe: 10-meter cable",
        "Calibration kit: Standard solutions included",
        "Data download software",
        "Operating manual in English"
      ],
      specifications: [
        { key: "Measurement range", value: "0-20 mg/L (ppm)" },
        { key: "Accuracy", value: "±0.1 mg/L" },
        { key: "Resolution", value: "0.01 mg/L" },
        { key: "Response time", value: "30 seconds" },
        { key: "Operating temperature", value: "0-50°C" },
        { key: "Protection", value: "IP67" }
      ]
    },
    pt: {
      name: "Medidor de Oxigênio Dissolvido Digital",
      description: "Medidor digital de alta precisão para monitoramento de oxigênio dissolvido em sistemas aquícolas. Equipado com sensor eletroquímico de resposta rápida e display LCD de fácil leitura. Essencial para manter níveis ótimos de oxigênio em viveiros de camarão e garantir a saúde dos organismos aquáticos.",
      benefits: [
        "Medição precisa e confiável de oxigênio dissolvido",
        "Resposta rápida do sensor eletroquímico",
        "Display LCD grande e fácil de ler",
        "Calibração automática e manual disponível",
        "Resistente à água com proteção IP67",
        "Memória para armazenar até 1000 leituras"
      ],
      presentation: [
        "Medidor portátil: Com estojo de transporte",
        "Sonda de oxigênio: Cabo de 10 metros",
        "Kit de calibração: Soluções padrão incluídas",
        "Software de download de dados",
        "Manual de operação em português"
      ],
      specifications: [
        { key: "Faixa de medição", value: "0-20 mg/L (ppm)" },
        { key: "Precisão", value: "±0,1 mg/L" },
        { key: "Resolução", value: "0,01 mg/L" },
        { key: "Tempo de resposta", value: "30 segundos" },
        { key: "Temperatura de operação", value: "0-50°C" },
        { key: "Proteção", value: "IP67" }
      ]
    }
  },

  // Filtro UV-C para Esterilización - EQ010
  "EQ010": {
    es: {
      name: "Chemetrics Kit de Dióxido de Carbono",
      description: "El dióxido de carbono (CO2) disuelto está presente de forma natural como resultado de la respiración animal, la descomposición de la materia orgánica, y la descomposición de ciertos minerales. es la mayor fuente de acidez en muestras de agua. Los kits de prueba de dióxido de carbono de CHEMETRICS emplean un sodio Titulante de hidróxido e indicador de fenolftaleína. Los resultados se expresan como ppm (mg/L) de CO2.",
      benefits: [
      "Titulantes de un solo uso sellados y confiables",
      "Procedimiento rápido y sencillo: no es necesario contar las gotas no se necesitan buretas ni otros equipos",
      "Se puede realizar la titulación en cualquier lugar"
    ],
      presentation: [
      "30 pruebas y contiene treinta ampollas con conjunto de válvula."
    ],
      specifications: [
      {
        "key": "Rango",
        "value": "10 - 1000ppm"
      }
    ]
    },
    en: {
      name: "UV-C Sterilization Filter",
      description: "UV-C ultraviolet light sterilization system designed to eliminate bacteria, viruses and pathogenic microorganisms in aquaculture systems. UV-C technology provides effective chemical-free disinfection, maintaining water quality and reducing disease risks in shrimp and other aquatic organisms.",
      benefits: [
        "Effective pathogen elimination without chemicals",
        "Significant improvement in water quality",
        "Reduced disease risk",
        "Continuous and automatic operation",
        "No chemical residues in water",
        "Low energy consumption"
      ],
      presentation: [
        "25W unit: For systems up to 5,000 L/h",
        "55W unit: For systems up to 15,000 L/h",
        "110W unit: For systems up to 30,000 L/h",
        "Includes replacement UV-C lamp",
        "Pipeline mounting system included"
      ],
      specifications: [
        { key: "Available power", value: "25W, 55W, 110W" },
        { key: "Flow capacity", value: "5,000-30,000 L/h" },
        { key: "Effectiveness", value: "99.9% pathogen elimination" },
        { key: "Lamp lifespan", value: "8,000-10,000 hours" },
        { key: "Housing material", value: "316L stainless steel" },
        { key: "Connections", value: "1, 2, 3 inches" }
      ]
    },
    pt: {
      name: "Filtro UV-C para Esterilização",
      description: "Sistema de esterilização por luz ultravioleta UV-C projetado para eliminar bactérias, vírus e microorganismos patogênicos em sistemas aquícolas. A tecnologia UV-C proporciona desinfecção efetiva sem químicos, mantendo a qualidade da água e reduzindo riscos de doenças em camarões e outros organismos aquáticos.",
      benefits: [
        "Eliminação efetiva de patógenos sem químicos",
        "Melhoria significativa da qualidade da água",
        "Redução do risco de doenças",
        "Operação contínua e automática",
        "Sem resíduos químicos na água",
        "Baixo consumo energético"
      ],
      presentation: [
        "Unidade 25W: Para sistemas até 5.000 L/h",
        "Unidade 55W: Para sistemas até 15.000 L/h",
        "Unidade 110W: Para sistemas até 30.000 L/h",
        "Inclui lâmpada UV-C de reposição",
        "Sistema de montagem em tubulação incluído"
      ],
      specifications: [
        { key: "Potência disponível", value: "25W, 55W, 110W" },
        { key: "Capacidade de fluxo", value: "5.000-30.000 L/h" },
        { key: "Efetividade", value: "99,9% eliminação patógenos" },
        { key: "Vida útil da lâmpada", value: "8.000-10.000 horas" },
        { key: "Material da carcaça", value: "Aço inoxidável 316L" },
        { key: "Conexões", value: "1, 2, 3 polegadas" }
      ]
    }
  },

  // Skimmer de Proteínas para Acuicultura - EQ011
  "EQ011": {
    es: {
      name: "Chemetrics Kit de Dureza",
      description: "La dureza es una medida del contenido mineral del agua. El calcio y el magnesio\nson los minerales más comunes que contribuyen a la dureza.\nEl método para la de dureza total es aplicable a la industria de acuicultura,\naguas superficiales, de calderas y salmueras, piscinas camaroneras, etc.",
      benefits: [
      "Titulantes de un solo uso sellados y confiables",
      "Procedimiento rápido y sencillo: no es necesario contar las gotas",
      "No se necesitan buretas ni otros equipos",
      "Se puede realizar la titulación en cualquier lugar",
      "El reactivo es estable",
      "Vida útil de 8 meses"
    ],
      presentation: [
      "30 pruebas por titulación: treinta ampollas con conjun-",
      "tos de válvulas, titulador, vaso de muestra de 25 ml e instrucciones. Los resulta-",
      "dos se expresan como ppm (mg/L) de CaCO3."
    ],
      specifications: [
      {
        "key": "Rango",
        "value": "20 - 200ppm / Rango: 10 - 1000ppm"
      }
    ]
    },
    en: {
      name: "Protein Skimmer for Aquaculture",
      description: "Specialized protein skimmer for recirculating aquaculture systems (RAS). Uses air injection foaming technology to remove dissolved organic compounds, proteins and other contaminants from water. Essential for maintaining excellent water quality in intensive culture systems.",
      benefits: [
        "Efficient removal of dissolved organic matter",
        "Significant improvement in water quality",
        "Reduces biological load on filtration systems",
        "Continuous and automatic operation",
        "Compact and energy efficient design",
        "Easy maintenance and cleaning"
      ],
      presentation: [
        "Small model: For systems up to 10,000 L",
        "Medium model: For systems up to 50,000 L",
        "Large model: For systems up to 100,000 L",
        "Includes recirculation pump",
        "Automatic drainage system"
      ],
      specifications: [
        { key: "Processing capacity", value: "10,000-100,000 L" },
        { key: "Removal efficiency", value: "85-95% organic matter" },
        { key: "Energy consumption", value: "0.5-2.5 kW" },
        { key: "Construction material", value: "Acrylic and PVC" },
        { key: "Pump included", value: "High pressure centrifugal" },
        { key: "Contact time", value: "3-5 minutes" }
      ]
    },
    pt: {
      name: "Skimmer de Proteínas para Aquicultura",
      description: "Skimmer de proteínas especializado para sistemas de recirculação em aquicultura (RAS). Utiliza tecnologia de espumação por injeção de ar para remover compostos orgânicos dissolvidos, proteínas e outros contaminantes da água. Essencial para manter excelente qualidade de água em sistemas intensivos de cultivo.",
      benefits: [
        "Remoção eficiente de matéria orgânica dissolvida",
        "Melhoria significativa da qualidade da água",
        "Reduz a carga biológica em sistemas de filtração",
        "Operação contínua e automática",
        "Design compacto e energeticamente eficiente",
        "Fácil manutenção e limpeza"
      ],
      presentation: [
        "Modelo pequeno: Para sistemas até 10.000 L",
        "Modelo médio: Para sistemas até 50.000 L",
        "Modelo grande: Para sistemas até 100.000 L",
        "Inclui bomba de recirculação",
        "Sistema de drenagem automática"
      ],
      specifications: [
        { key: "Capacidade de processamento", value: "10.000-100.000 L" },
        { key: "Eficiência de remoção", value: "85-95% matéria orgânica" },
        { key: "Consumo energético", value: "0,5-2,5 kW" },
        { key: "Material de construção", value: "Acrílico e PVC" },
        { key: "Bomba incluída", value: "Centrífuga de alta pressão" },
        { key: "Tempo de contato", value: "3-5 minutos" }
      ]
    }
  },

  // Sistema de Biofiltracion RAS - EQ012
  "EQ012": {
    es: {
      name: "Chemetrics Kit de Fosfato",
      description: "El kit de prueba para fosfato emplea la química del cloruro de estaño. En una\nsolución acídica, el ortofosfato reacciona con el molibdato de amonio para\nformar ácido molibdofosfórico, que luego es reducido por el cloruro de estaño\nal intensamente coloreado azul de molibdeno. La intensidad del color azul\nresultante es directamente proporcional a la concentración de fosfato.",
      benefits: [],
      presentation: [
      "30 pruebas: comparadores de rango bajo y alto, solución activadora, vaso de",
      "muestra de 25 ml, tapa del vaso de muestra e instrucciones."
    ],
      specifications: [
      {
        "key": "Rango",
        "value": "0 - 0.1 & 0 - 1"
      }
    ]
    },
    en: {
      name: "RAS Biofiltration System",
      description: "Complete biofiltration system for recirculating aquaculture systems (RAS). Includes moving bed biofilters (MBBR) with high specific surface filtration media. Provides efficient nitrification converting toxic ammonia to less harmful nitrates, maintaining optimal water quality for aquatic organism growth.",
      benefits: [
        "Efficient conversion of ammonia to nitrates",
        "High biological processing capacity",
        "Long-lasting filtration media",
        "Self-cleaning system with low maintenance",
        "Rapid colonization of beneficial bacteria",
        "Modular and scalable design"
      ],
      presentation: [
        "Basic system: For 20,000 L culture volume",
        "Medium system: For 100,000 L culture volume",
        "Industrial system: For 500,000 L culture volume",
        "Includes K3 biofilter media",
        "Aeration system included"
      ],
      specifications: [
        { key: "Loading capacity", value: "2-15 kg NH4/m³/day" },
        { key: "Specific surface", value: "500 m²/m³" },
        { key: "Retention time", value: "30-60 minutes" },
        { key: "Oxygen required", value: "4.5 kg O2/kg NH4" },
        { key: "Media material", value: "High density polyethylene" },
        { key: "Conversion efficiency", value: ">95% NH4 to NO3" }
      ]
    },
    pt: {
      name: "Sistema de Biofiltração RAS",
      description: "Sistema completo de biofiltração para sistemas de recirculação aquícola (RAS). Inclui biofiltros de leito móvel (MBBR) com meios de filtração de alta superfície específica. Proporciona nitrificação eficiente convertendo amônia tóxica em nitratos menos prejudiciais, mantendo a qualidade da água ótima para o crescimento de organismos aquáticos.",
      benefits: [
        "Conversão eficiente de amônia em nitratos",
        "Alta capacidade de processamento biológico",
        "Meios de filtração de longa duração",
        "Sistema auto-limpante com baixa manutenção",
        "Colonização rápida de bactérias benéficas",
        "Design modular e escalável"
      ],
      presentation: [
        "Sistema básico: Para 20.000 L de cultivo",
        "Sistema médio: Para 100.000 L de cultivo",
        "Sistema industrial: Para 500.000 L de cultivo",
        "Inclui meios biofiltrantes K3",
        "Sistema de aeração incluído"
      ],
      specifications: [
        { key: "Capacidade de carga", value: "2-15 kg NH4/m³/dia" },
        { key: "Superfície específica", value: "500 m²/m³" },
        { key: "Tempo de retenção", value: "30-60 minutos" },
        { key: "Oxigênio requerido", value: "4,5 kg O2/kg NH4" },
        { key: "Material dos meios", value: "Polietileno de alta densidade" },
        { key: "Eficiência de conversão", value: ">95% NH4 para NO3" }
      ]
    }
  },

  // Medidor Multiparámetro de Agua - EQ013
  "EQ013": {
    es: {
      name: "Chemetrics Kit de Hierro",
      description: "El método de análisis de hierro emplea la química de la fenantrolina. El hierro ferroso reacciona con fenantrolina para formar un complejo de color anaranjado con intensidad en proporción directa a la concentración de hierro ferroso. El hierro total se determina agregando una mezcla de ácido tioglicólico y amoníaco a la muestra. Esta mezcla disuelve la mayoría de las formas de hierro particulado.",
      benefits: [],
      presentation: [
      "30 pruebas: recambio, comparadores de rango bajo y alto, solución activadora, vaso de muestra de 25 ml e instrucciones."
    ],
      specifications: [
      {
        "key": "Rango",
        "value": "0 - 0.1 & 0 - 1"
      }
    ]
    },
    en: {
      name: "Multi-parameter Water Meter",
      description: "Advanced digital meter capable of measuring multiple critical water parameters simultaneously. Includes sensors for pH, dissolved oxygen, conductivity, salinity, temperature and turbidity. Specifically designed for continuous monitoring in aquaculture systems, with data logging capability and programmable alarms.",
      benefits: [
        "Simultaneous measurement of multiple parameters",
        "Continuous monitoring and automatic data logging",
        "Programmable alarms for critical values",
        "Easy navigation touchscreen",
        "WiFi connection for remote monitoring",
        "Automatic and manual calibration"
      ],
      presentation: [
        "Main unit: With 7-inch touchscreen",
        "Multi-parameter probe: 20-meter cable",
        "Monitoring software: License included",
        "Calibration kit: Standard solutions",
        "Water-resistant carrying case"
      ],
      specifications: [
        { key: "Parameters measured", value: "pH, DO, Conductivity, Salinity, Temperature, Turbidity" },
        { key: "pH accuracy", value: "±0.01 units" },
        { key: "DO accuracy", value: "±0.1 mg/L" },
        { key: "Conductivity range", value: "0-200 mS/cm" },
        { key: "Internal memory", value: "10,000 records" },
        { key: "Connectivity", value: "WiFi, USB, RS485" }
      ]
    },
    pt: {
      name: "Medidor Multiparâmetro de Água",
      description: "Medidor digital avançado capaz de medir múltiplos parâmetros críticos da água simultaneamente. Inclui sensores para pH, oxigênio dissolvido, condutividade, salinidade, temperatura e turbidez. Projetado especificamente para monitoramento contínuo em sistemas aquícolas, com capacidade de registro de dados e alarmes programáveis.",
      benefits: [
        "Medição simultânea de múltiplos parâmetros",
        "Monitoramento contínuo e registro automático de dados",
        "Alarmes programáveis para valores críticos",
        "Tela sensível ao toque de fácil navegação",
        "Conexão WiFi para monitoramento remoto",
        "Calibração automática e manual"
      ],
      presentation: [
        "Unidade principal: Com tela sensível ao toque de 7 polegadas",
        "Sonda multiparâmetro: Cabo de 20 metros",
        "Software de monitoramento: Licença incluída",
        "Kit de calibração: Soluções padrão",
        "Estojo de transporte resistente à água"
      ],
      specifications: [
        { key: "Parâmetros medidos", value: "pH, OD, Condutividade, Salinidade, Temperatura, Turbidez" },
        { key: "Precisão pH", value: "±0,01 unidades" },
        { key: "Precisão OD", value: "±0,1 mg/L" },
        { key: "Faixa condutividade", value: "0-200 mS/cm" },
        { key: "Memória interna", value: "10.000 registros" },
        { key: "Conectividade", value: "WiFi, USB, RS485" }
      ]
    }
  },

  // Filtro de Arena y Grava Automatizado - EQ014
  "EQ014": {
    es: {
      name: "Chemetrics Kit de Nitrato",
      description: "El kit de prueba para nitrato emplea el método de reducción de cadmio. El nitrato se reduce a nitrito en presencia de cadmio. En una solución acídica, el nitrito diazotiza con una amina aromática primaria y luego se une a otra molécula orgánica para producir un tinte rosa-anaranjado. La intensidad del color\nresultante es directamente proporcional a la concentración de nitrato.",
      benefits: [],
      presentation: [
      "30 pruebas: recambio, comparador, vaso de muestra de",
      "25 ml, tubo de reacción con tapa e instrucciones."
    ],
      specifications: [
      {
        "key": "Rango",
        "value": "0 - 4.5ppm"
      }
    ]
    },
    en: {
      name: "Automated Sand and Gravel Filter",
      description: "Automated mechanical filtration system with multi-layer sand and gravel media. Designed for efficient removal of suspended solids in aquaculture systems. Includes programmable automatic backwash system that maintains filtration efficiency without manual intervention. Ideal for pre-treatment in RAS systems and effluent treatment.",
      benefits: [
        "Efficient removal of suspended solids",
        "Automatic backwash system",
        "Multiple filtration layers",
        "Continuous operation without supervision",
        "Low energy consumption",
        "Durable fiberglass construction"
      ],
      presentation: [
        "Small filter: 1.2m diameter, up to 50 m³/h",
        "Medium filter: 2.0m diameter, up to 150 m³/h",
        "Large filter: 3.0m diameter, up to 350 m³/h",
        "Automatic control system included",
        "Automatic backwash valves"
      ],
      specifications: [
        { key: "Flow capacity", value: "50-350 m³/h" },
        { key: "Filtration efficiency", value: ">95% solids >50 microns" },
        { key: "Backwash frequency", value: "Automatic every 24-72h" },
        { key: "Working pressure", value: "2-6 bar" },
        { key: "Tank material", value: "Fiberglass" },
        { key: "Filter media", value: "Silica sand and gravel" }
      ]
    },
    pt: {
      name: "Filtro de Areia e Cascalho Automatizado",
      description: "Sistema de filtração mecânica automatizado com meios de areia e cascalho de múltiplas camadas. Projetado para remoção eficiente de sólidos suspensos em sistemas aquícolas. Inclui sistema de retrolavagem automática programável que mantém a eficiência de filtração sem intervenção manual. Ideal para pré-tratamento em sistemas RAS e tratamento de efluentes.",
      benefits: [
        "Remoção eficiente de sólidos suspensos",
        "Sistema de retrolavagem automática",
        "Múltiplas camadas de filtração",
        "Operação contínua sem supervisão",
        "Baixo consumo energético",
        "Construção durável em fibra de vidro"
      ],
      presentation: [
        "Filtro pequeno: 1,2m diâmetro, até 50 m³/h",
        "Filtro médio: 2,0m diâmetro, até 150 m³/h",
        "Filtro grande: 3,0m diâmetro, até 350 m³/h",
        "Sistema de controle automático incluído",
        "Válvulas de retrolavagem automáticas"
      ],
      specifications: [
        { key: "Capacidade de fluxo", value: "50-350 m³/h" },
        { key: "Eficiência de filtração", value: ">95% sólidos >50 mícrons" },
        { key: "Frequência retrolavagem", value: "Automática a cada 24-72h" },
        { key: "Pressão de trabalho", value: "2-6 bar" },
        { key: "Material do tanque", value: "Fibra de vidro" },
        { key: "Meios filtrantes", value: "Areia silícea e cascalho" }
      ]
    }
  },

  // Generador de Ozono para Acuicultura - EQ015
  "EQ015": {
    es: {
      name: "Chemetrics Kit de Nitrito",
      description: "El kit de prueba para nitrito CHEMets emplea el método de formación de tinte. En una solución acídica, el nitrito diazotiza con una amina aromática primaria Dihidrocloruro de etilendiamina (NED) y luego se une a otra molécula orgánica para producir un tinte de color fuerte. La intensidad del color rosa resultante es proporcional a la concentración de nitrito en la muestra.",
      benefits: [],
      presentation: [
      "30 pruebas: Comparadores de rango bajo y alto, Solución acidificante, vaso de",
      "muestra de 25 mL e instrucciones."
    ],
      specifications: [
      {
        "key": "Rango",
        "value": "0 - 0.1 & 0 - 1"
      }
    ]
    },
    en: {
      name: "Ozone Generator for Aquaculture",
      description: "Aquaculture-grade ozone generator designed for advanced disinfection and water quality improvement. Uses corona discharge technology to produce high-purity ozone. Ozone provides powerful oxidation of organic matter, pathogen elimination and improved water clarity without leaving chemical residues.",
      benefits: [
        "Powerful disinfection without chemical residues",
        "Effective oxidation of organic matter",
        "Significant improvement in water clarity",
        "Elimination of unpleasant odors and flavors",
        "Reduction in traditional chemical consumption",
        "Automatic dose control by ORP"
      ],
      presentation: [
        "5g/h generator: For systems up to 100,000 L",
        "10g/h generator: For systems up to 250,000 L",
        "20g/h generator: For systems up to 500,000 L",
        "Includes venturi mixing system",
        "Automatic ORP controller included"
      ],
      specifications: [
        { key: "Ozone production", value: "5-20 g O3/h" },
        { key: "Concentration", value: "80-120 mg O3/L air" },
        { key: "Oxygen purity", value: "90-95%" },
        { key: "Energy consumption", value: "8-12 kWh/kg O3" },
        { key: "Control", value: "Automatic by ORP" },
        { key: "Contact time", value: "3-10 minutes" }
      ]
    },
    pt: {
      name: "Gerador de Ozônio para Aquicultura",
      description: "Gerador de ozônio de grau aquícola projetado para desinfecção avançada e melhoria da qualidade da água. Utiliza tecnologia de descarga corona para produzir ozônio de alta pureza. O ozônio proporciona oxidação potente de matéria orgânica, eliminação de patógenos e melhoria da clareza da água sem deixar resíduos químicos.",
      benefits: [
        "Desinfecção potente sem resíduos químicos",
        "Oxidação eficaz de matéria orgânica",
        "Melhoria significativa da clareza da água",
        "Eliminação de odores e sabores desagradáveis",
        "Redução do consumo de químicos tradicionais",
        "Controle automático de dose por ORP"
      ],
      presentation: [
        "Gerador 5g/h: Para sistemas até 100.000 L",
        "Gerador 10g/h: Para sistemas até 250.000 L",
        "Gerador 20g/h: Para sistemas até 500.000 L",
        "Inclui sistema de mistura por venturi",
        "Controlador ORP automático incluído"
      ],
      specifications: [
        { key: "Produção de ozônio", value: "5-20 g O3/h" },
        { key: "Concentração", value: "80-120 mg O3/L ar" },
        { key: "Pureza do oxigênio", value: "90-95%" },
        { key: "Consumo energético", value: "8-12 kWh/kg O3" },
        { key: "Controle", value: "Automático por ORP" },
        { key: "Tempo de contato", value: "3-10 minutos" }
      ]
    }
  },

  // Blower de Alta Presión para Aireación - EQ016
  "EQ016": {
    es: {
      name: "Chemetrics Kit de Peróxido de Hidrógeno",
      description: "Este kit de valoración de peróxido de hidrógeno viene en una caja de cartón y contiene todo lo necesario para realizar 30 pruebas: treinta ampollas con conjuntos de válvulas, jeringa de 1,0 ml, jeringa de 3,0 ml, titulador, vaso de muestra\nde 25 ml, e instrucciones. El kit para peróxido de hidrógeno emplea un titulador de sulfato de cerio y\nferroína como indicador de resultado.",
      benefits: [
      "Titulantes de un solo uso sellados y confiables",
      "Procedimiento rápido y sencillo: no es necesario contar las gotas",
      "No se necesitan buretas ni otros equipos",
      "Se puede realizar la titulación en cualquier lugar"
    ],
      presentation: [
      "30 ampollas"
    ],
      specifications: [
      {
        "key": "Rango",
        "value": "0.1 - 1.0%"
      }
    ]
    },
    en: {
      name: "High Pressure Blower for Aeration",
      description: "High-pressure centrifugal blower specially designed for aeration systems in aquaculture. Provides constant airflow and stable pressure to feed diffusers and intensive aeration systems. Robust construction with high-quality bearings for continuous 24/7 operation in marine environments.",
      benefits: [
        "High pressure and constant airflow",
        "Silent operation with low vibration level",
        "Robust design for continuous operation",
        "Optimized energy efficiency",
        "Resistant to corrosive environments",
        "Easy preventive maintenance"
      ],
      presentation: [
        "1.5 kW blower: For small systems up to 2 Ha",
        "3.0 kW blower: For medium systems up to 5 Ha",
        "5.5 kW blower: For large systems up to 10 Ha",
        "Includes inlet and outlet silencer",
        "Anti-vibration base included"
      ],
      specifications: [
        { key: "Available power", value: "1.5, 3.0, 5.5 kW" },
        { key: "Maximum pressure", value: "80-120 mbar" },
        { key: "Airflow", value: "50-400 m³/h" },
        { key: "Noise level", value: "<75 dB" },
        { key: "Efficiency", value: ">85%" },
        { key: "IP protection", value: "IP55" }
      ]
    },
    pt: {
      name: "Soprador de Alta Pressão para Aeração",
      description: "Soprador centrífugo de alta pressão especialmente projetado para sistemas de aeração em aquicultura. Proporciona fluxo de ar constante e pressão estável para alimentar difusores e sistemas de aeração intensiva. Construção robusta com rolamentos de alta qualidade para operação contínua 24/7 em ambientes marinhos.",
      benefits: [
        "Alta pressão e fluxo constante de ar",
        "Operação silenciosa com baixo nível de vibração",
        "Design robusto para operação contínua",
        "Eficiência energética otimizada",
        "Resistente a ambientes corrosivos",
        "Fácil manutenção preventiva"
      ],
      presentation: [
        "Soprador 1,5 kW: Para sistemas pequenos até 2 Ha",
        "Soprador 3,0 kW: Para sistemas médios até 5 Ha",
        "Soprador 5,5 kW: Para sistemas grandes até 10 Ha",
        "Inclui silenciador de entrada e saída",
        "Base anti-vibração incluída"
      ],
      specifications: [
        { key: "Potência disponível", value: "1,5, 3,0, 5,5 kW" },
        { key: "Pressão máxima", value: "80-120 mbar" },
        { key: "Vazão de ar", value: "50-400 m³/h" },
        { key: "Nível de ruído", value: "<75 dB" },
        { key: "Eficiência", value: ">85%" },
        { key: "Proteção IP", value: "IP55" }
      ]
    }
  },

  // Sistema de Control Automático de Cultivo - EQ017
  "EQ017": {
    es: {
      name: "Chemetrics Kit de Sulfito",
      description: "Los kits de prueba para sulfito emplean la químíca yodométrica. En una solución acídica, el sulfito se titula con un titulador de yoduro-yodato y un indicador\nde almidón. Se añade ácido sulfámico a la muestra para evitar interferencias del\nnitrito.",
      benefits: [],
      presentation: [
      "30 pruebas: treinta ampollas con conjuntos de válvulas, solución neutralizadora, titulador, vaso de muestra de 25 ml e instrucciones."
    ],
      specifications: [
      {
        "key": "Rango",
        "value": "0 - 0.1 & 0 - 1"
      }
    ]
    },
    en: {
      name: "Automatic Aquaculture Control System",
      description: "Comprehensive automated control and monitoring system for aquaculture farms. Includes multiple sensors, programmable controllers and management software to automate feeding, aeration, water quality and other critical parameters. Enables remote monitoring via internet and automatic report generation to optimize production.",
      benefits: [
        "Automatic control of all critical parameters",
        "Remote monitoring via internet and mobile app",
        "Automatic alerts via SMS and email",
        "Automatic feeding optimization",
        "Complete historical data recording",
        "Significant reduction in operating costs"
      ],
      presentation: [
        "Basic system: Control of 4 parameters",
        "Standard system: Control of 8 parameters",
        "Premium system: Control of 16 parameters",
        "Management software included",
        "iOS and Android mobile app"
      ],
      specifications: [
        { key: "Controlled parameters", value: "4, 8, 16 depending on model" },
        { key: "Included sensors", value: "DO, pH, Temperature, Salinity" },
        { key: "Connectivity", value: "WiFi, 4G, Ethernet" },
        { key: "Storage", value: "5 years of data" },
        { key: "Feeders", value: "Up to 8 controlled" },
        { key: "Aerators", value: "Up to 16 controlled" }
      ]
    },
    pt: {
      name: "Sistema de Controle Automático de Cultivo",
      description: "Sistema de controle e monitoramento automatizado integral para fazendas aquícolas. Inclui sensores múltiplos, controladores programáveis e software de gestão para automatizar alimentação, aeração, qualidade da água e outros parâmetros críticos. Permite monitoramento remoto via internet e geração de relatórios automáticos para otimizar a produção.",
      benefits: [
        "Controle automático de todos os parâmetros críticos",
        "Monitoramento remoto via internet e aplicativo móvel",
        "Alertas automáticos por SMS e email",
        "Otimização automática de alimentação",
        "Registro histórico completo de dados",
        "Redução significativa de custos operacionais"
      ],
      presentation: [
        "Sistema básico: Controle de 4 parâmetros",
        "Sistema padrão: Controle de 8 parâmetros",
        "Sistema premium: Controle de 16 parâmetros",
        "Software de gestão incluído",
        "Aplicativo móvel iOS e Android"
      ],
      specifications: [
        { key: "Parâmetros controlados", value: "4, 8, 16 conforme modelo" },
        { key: "Sensores incluídos", value: "OD, pH, Temperatura, Salinidade" },
        { key: "Conectividade", value: "WiFi, 4G, Ethernet" },
        { key: "Armazenamento", value: "5 anos de dados" },
        { key: "Alimentadores", value: "Até 8 controlados" },
        { key: "Aeradores", value: "Até 16 controlados" }
      ]
    }
  },

  // Bomba Dosificadora Química Digital - EQ018
  "EQ018": {
    es: {
      name: "Cinta Industrial Prime",
      description: "La cinta industrial de color negro es fabricado con material sensible a la presión y contiene adhesivos de alta calidad, siendo ideal para las reparaciones temporales\nde los revestimientos tipo liners en los tanques y piscinas para acuicultura y\nrecreación.",
      benefits: [
      "No es sensible a altas temperaturas ambientales, ni exposición UV y a la hu-",
      "medad.",
      "Es de grado alimenticio, no tóxico para producción acuícola.",
      "Alta resistencia, la cinta no se puede retirar fácilmente una vez adherido.",
      "Revestimiento antiadherente de papel."
    ],
      presentation: [
      "Ancho: 10 cm",
      "Largo: 15 m",
      "Peso estándar: 1,4 kg",
      "Espesor del adhesivo: 0,51 mm"
    ],
      specifications: [
      {
        "key": "Especificación",
        "value": "La superficie por pegar debe estar limpia y seca. La cinta no se adherirá si las"
      },
      {
        "key": "Especificación",
        "value": "superficies no están preparadas adecuadamente, superficies sucias o húmedas."
      },
      {
        "key": "Especificación",
        "value": "Deberán limpiarse en su totalidad con agua, toallas de papel, trapos secos u"
      },
      {
        "key": "Especificación",
        "value": "otros materiales que preparen la superficie para pegar la cinta."
      },
      {
        "key": "Especificación",
        "value": "Las acumulaciones de polvo también deben eliminarse para asegurar un"
      },
      {
        "key": "Especificación",
        "value": "pegado seguro."
      },
      {
        "key": "Especificación",
        "value": "Para una óptima adhesión se prefiere una temperatura en la superficie que"
      },
      {
        "key": "Especificación",
        "value": "esté por encima de los 10 a 15º C."
      },
      {
        "key": "Especificación",
        "value": "Si está por debajo de este rango, se debe utilizar una fuente de calor, como"
      },
      {
        "key": "Especificación",
        "value": "un soplador de aire caliente de uso industrial que es un método recomendado."
      }
    ]
    },
    en: {
      name: "Digital Chemical Dosing Pump",
      description: "Precision dosing pump with digital control for exact chemical application in aquaculture systems. Ideal for dosing probiotics, disinfectants, pH correctors and other additives. Programmable control system allows automatic dosing based on schedules, events or sensor readings.",
      benefits: [
        "Precise and repeatable dosing",
        "Programmable digital control",
        "Automatic dosing by events",
        "Low level and failure alarms",
        "Chemical-resistant construction",
        "Automatic calibration included"
      ],
      presentation: [
        "10 L/h pump: For small systems",
        "50 L/h pump: For medium systems",
        "200 L/h pump: For large systems",
        "Digital controller included",
        "Optional level sensors"
      ],
      specifications: [
        { key: "Pumping capacity", value: "10-200 L/h" },
        { key: "Dosing precision", value: "±1%" },
        { key: "Maximum pressure", value: "10 bar" },
        { key: "Materials", value: "PVDF, PTFE" },
        { key: "Control", value: "Digital with LCD display" },
        { key: "Programming", value: "20 different programs" }
      ]
    },
    pt: {
      name: "Bomba Dosadora Química Digital",
      description: "Bomba dosadora de precisão com controle digital para aplicação exata de químicos em sistemas aquícolas. Ideal para dosagem de probióticos, desinfetantes, corretores de pH e outros aditivos. Sistema de controle programável permite dosagem automática baseada em horários, eventos ou leituras de sensores.",
      benefits: [
        "Dosagem precisa e repetível",
        "Controle digital programável",
        "Dosagem automática por eventos",
        "Alarmes de baixo nível e falhas",
        "Construção resistente a químicos",
        "Calibração automática incluída"
      ],
      presentation: [
        "Bomba 10 L/h: Para sistemas pequenos",
        "Bomba 50 L/h: Para sistemas médios",
        "Bomba 200 L/h: Para sistemas grandes",
        "Controlador digital incluído",
        "Sensores de nível opcionais"
      ],
      specifications: [
        { key: "Capacidade de bombeamento", value: "10-200 L/h" },
        { key: "Precisão de dosagem", value: "±1%" },
        { key: "Pressão máxima", value: "10 bar" },
        { key: "Materiais", value: "PVDF, PTFE" },
        { key: "Controle", value: "Digital com display LCD" },
        { key: "Programação", value: "20 programas diferentes" }
      ]
    }
  },

  // Alimentador Automático Programable - EQ019
  "EQ019": {
    es: {
      name: "Freshwater",
      description: "Kit multiparámetros, rápido y fácil de usar.",
      benefits: [
      "Permite al productor acuícola",
      "mantener el control de los metabolitos tóxicos más perjudiciales dentro de su",
      "cultivo. Recomendado para agua dulce."
    ],
      presentation: [
      "Kit de 7 envases de 37 ML cada uno."
    ],
      specifications: []
    },
    en: {
      name: "Programmable Automatic Feeder",
      description: "High-precision automated feeding system for aquaculture. Allows programming multiple feeding schedules with exact quantities. Includes feed detection sensors and anti-waste system. Marine-resistant construction with stepper motor for precise dosing.",
      benefits: [
        "Precise and programmable feeding",
        "Multiple daily feeding schedules",
        "Integrated anti-waste system",
        "Automatic feed level detection",
        "Corrosion-resistant construction",
        "Remote control via mobile app"
      ],
      presentation: [
        "25 kg feeder: For small ponds",
        "100 kg feeder: For medium ponds",
        "300 kg feeder: For large ponds",
        "Digital controller included",
        "Optional solar panel for autonomy"
      ],
      specifications: [
        { key: "Hopper capacity", value: "25, 100, 300 kg" },
        { key: "Dosing precision", value: "±2 grams" },
        { key: "Daily programs", value: "Up to 20 schedules" },
        { key: "Distribution range", value: "5-15 meters" },
        { key: "Autonomy", value: "30 days with solar panel" },
        { key: "Connectivity", value: "WiFi, 4G optional" }
      ]
    },
    pt: {
      name: "Alimentador Automático Programável",
      description: "Sistema de alimentação automatizado de alta precisão para aquicultura. Permite programar múltiplos horários de alimentação com quantidades exatas. Inclui sensores de detecção de ração e sistema anti-desperdício. Construção resistente a ambientes marinhos com motor de passo para dosagem precisa.",
      benefits: [
        "Alimentação precisa e programável",
        "Múltiplos horários de alimentação diários",
        "Sistema anti-desperdício integrado",
        "Detecção automática de nível de ração",
        "Construção resistente à corrosão",
        "Controle remoto via aplicativo móvel"
      ],
      presentation: [
        "Alimentador 25 kg: Para viveiros pequenos",
        "Alimentador 100 kg: Para viveiros médios",
        "Alimentador 300 kg: Para viveiros grandes",
        "Controlador digital incluído",
        "Painel solar opcional para autonomia"
      ],
      specifications: [
        { key: "Capacidade da tremonha", value: "25, 100, 300 kg" },
        { key: "Precisão de dosagem", value: "±2 gramas" },
        { key: "Programas diários", value: "Até 20 horários" },
        { key: "Alcance de distribuição", value: "5-15 metros" },
        { key: "Autonomia", value: "30 dias com painel solar" },
        { key: "Conectividade", value: "WiFi, 4G opcional" }
      ]
    }
  },

  // Clarificador de Agua por Sedimentación - EQ020
  "EQ020": {
    es: {
      name: "Kits API Calcio",
      description: "El calcio es uno de los elementos más importantes en un acuario de arrecife.\nLos invertebrados de los arrecifes, como los corales, crustáceos, moluscos e\nincluso algún tipo de algas incrustantes, necesitan calcio para crecer y man-\ntenerse sanos. Con el tiempo, el nivel de calcio disminuye a medida que lo\nutilizan los invertebrados o cuando reacciona con el exceso de fosfato.",
      benefits: [
      "Se puede usar tanto para acuarios frescos",
      "como para acuarios de agua salada."
    ],
      presentation: [
      "Contiene 2 frascos de prueba, instrucciones",
      "fáciles de usar y un tubo de ensayo."
    ],
      specifications: [
      {
        "key": "Especificación",
        "value": "El KIT DE PRUEBA DE CALCIO API mide niveles de calcio tan bajos como 20mg/L para ayudarle a mantener saludables a los habitantes de su arrecife."
      }
    ]
    },
    en: {
      name: "Water Clarifier by Sedimentation",
      description: "Sedimentation clarification system for removal of suspended solids and turbidity in aquaculture effluents. Uses gravitational sedimentation and flocculation principles to obtain clear water. Includes automated sludge collection system and inclined plate structure for greater efficiency.",
      benefits: [
        "Efficient removal of suspended solids",
        "Significant turbidity reduction",
        "Automated sludge system",
        "Continuous operation without chemicals",
        "Durable concrete/fiber construction",
        "Low energy consumption"
      ],
      presentation: [
        "10 m³/h clarifier: For small farms",
        "50 m³/h clarifier: For medium farms",
        "200 m³/h clarifier: For large farms",
        "Lamellar plate system included",
        "Sludge pump included"
      ],
      specifications: [
        { key: "Processing capacity", value: "10-200 m³/h" },
        { key: "Removal efficiency", value: ">90% suspended solids" },
        { key: "Turbidity reduction", value: ">95%" },
        { key: "Retention time", value: "2-4 hours" },
        { key: "Construction material", value: "Reinforced concrete/Fiberglass" },
        { key: "Sludge system", value: "Automatic extraction" }
      ]
    },
    pt: {
      name: "Clarificador de Água por Sedimentação",
      description: "Sistema de clarificação por sedimentação para remoção de sólidos suspensos e turbidez em efluentes aquícolas. Utiliza princípios de sedimentação gravitacional e floculação para obter água clara. Inclui sistema de coleta de lodo automatizado e estrutura de placas inclinadas para maior eficiência.",
      benefits: [
        "Remoção eficiente de sólidos suspensos",
        "Redução significativa de turbidez",
        "Sistema de lodo automatizado",
        "Operação contínua sem químicos",
        "Construção durável em concreto/fibra",
        "Baixo consumo energético"
      ],
      presentation: [
        "Clarificador 10 m³/h: Para fazendas pequenas",
        "Clarificador 50 m³/h: Para fazendas médias",
        "Clarificador 200 m³/h: Para fazendas grandes",
        "Sistema de placas lamelares incluído",
        "Bomba de lodo incluída"
      ],
      specifications: [
        { key: "Capacidade de processamento", value: "10-200 m³/h" },
        { key: "Eficiência de remoção", value: ">90% sólidos suspensos" },
        { key: "Redução de turbidez", value: ">95%" },
        { key: "Tempo de retenção", value: "2-4 horas" },
        { key: "Material de construção", value: "Concreto armado/Fibra de vidro" },
        { key: "Sistema de lodo", value: "Extração automática" }
      ]
    }
  },

  // Termómetro Digital de Precisión - EQ021
  "EQ021": {
    es: {
      name: "Kits API de pH",
      description: "El KIT DE PRUEBA DE pH DE RANGO ALTO API mide los cambios de pH en\nacuarios marinos, acuarios con cíclidos africanos y agua del grifo muy alcalina.",
      benefits: [
      "Se puede usar tanto para acuarios frescos",
      "como para acuarios de agua salada."
    ],
      presentation: [
      "Contiene 160 pruebas e incluye 1 frasco de",
      "prueba, instrucciones fáciles de usar, tubo de",
      "ensayo y tabla de colores."
    ],
      specifications: [
      {
        "key": "Especificación",
        "value": "El KIT DE PRUEBA DE pH DE RANGO ALTO API lee el pH del agua dentro"
      },
      {
        "key": "Especificación",
        "value": "del rango alto de 7,4 a 8,8 e incluye una botella de solución de prueba y un"
      },
      {
        "key": "Especificación",
        "value": "tubo de ensayo."
      }
    ]
    },
    en: {
      name: "Precision Digital Thermometer",
      description: "High-precision digital thermometer specifically calibrated for aquaculture applications. Equipped with fast-response submersible probe and easy-to-read digital display. Includes memory function for max and min, programmable alarms and calibration certification traceable to international standards.",
      benefits: [
        "Exceptional precision ±0.1°C",
        "Fast response in less than 10 seconds",
        "Automatic max and min memory",
        "Programmable temperature alarms",
        "Water resistant IP67",
        "Certified calibration included"
      ],
      presentation: [
        "Basic thermometer: With 1-meter probe",
        "Professional thermometer: With 3-meter probe",
        "Industrial thermometer: With 10-meter probe",
        "Calibration certificate included",
        "Protective case included"
      ],
      specifications: [
        { key: "Measurement range", value: "-50 to +150°C" },
        { key: "Accuracy", value: "±0.1°C" },
        { key: "Resolution", value: "0.01°C" },
        { key: "Response time", value: "<10 seconds" },
        { key: "Protection", value: "IP67" },
        { key: "Probe length", value: "1, 3, 10 meters" }
      ]
    },
    pt: {
      name: "Termômetro Digital de Precisão",
      description: "Termômetro digital de alta precisão especificamente calibrado para aplicações aquícolas. Equipado com sonda submersível de resposta rápida e display digital de fácil leitura. Inclui função de memória para máximas e mínimas, alarmes programáveis e certificação de calibração rastreável a padrões internacionais.",
      benefits: [
        "Precisão excepcional ±0,1°C",
        "Resposta rápida em menos de 10 segundos",
        "Memória de máximas e mínimas automática",
        "Alarmes programáveis de temperatura",
        "Resistente à água IP67",
        "Calibração certificada incluída"
      ],
      presentation: [
        "Termômetro básico: Com sonda de 1 metro",
        "Termômetro profissional: Com sonda de 3 metros",
        "Termômetro industrial: Com sonda de 10 metros",
        "Certificado de calibração incluído",
        "Estojo protetor incluído"
      ],
      specifications: [
        { key: "Faixa de medição", value: "-50 a +150°C" },
        { key: "Precisão", value: "±0,1°C" },
        { key: "Resolução", value: "0,01°C" },
        { key: "Tempo de resposta", value: "<10 segundos" },
        { key: "Proteção", value: "IP67" },
        { key: "Comprimento da sonda", value: "1, 3, 10 metros" }
      ]
    }
  },

  // Refractómetro Digital para Salinidad - EQ022
  "EQ022": {
    es: {
      name: "Kits API Dureza de Carbono",
      description: "",
      benefits: [
      "Se puede usar tanto para acuarios frescos",
      "como para acuarios de agua salada."
    ],
      presentation: [],
      specifications: []
    },
    en: {
      name: "Digital Refractometer for Salinity",
      description: "Precision digital refractometer for exact salinity measurement in marine aquaculture systems. Advanced digital technology with automatic temperature compensation (ATC) and automatic calibration. Ideal for continuous salinity monitoring in shrimp culture, marine fish and other aquatic organisms.",
      benefits: [
        "Precise digital salinity measurement",
        "Automatic temperature compensation",
        "Automatic calibration with distilled water",
        "Backlit LCD display",
        "Water and corrosion resistant",
        "Simple one-button operation"
      ],
      presentation: [
        "Basic refractometer: Range 0-100 ppt",
        "Professional refractometer: Range 0-150 ppt",
        "Complete kit: With calibration solutions",
        "Rugged carrying case",
        "English manual included"
      ],
      specifications: [
        { key: "Salinity range", value: "0-100/150 ppt" },
        { key: "Accuracy", value: "±0.1 ppt" },
        { key: "Resolution", value: "0.1 ppt" },
        { key: "Temperature compensation", value: "Automatic ATC" },
        { key: "Calibration", value: "Automatic with distilled water" },
        { key: "Protection", value: "IP65" }
      ]
    },
    pt: {
      name: "Refratômetro Digital para Salinidade",
      description: "Refratômetro digital de precisão para medição exata de salinidade em sistemas aquícolas marinhos. Tecnologia digital avançada com compensação automática de temperatura (ATC) e calibração automática. Ideal para monitoramento contínuo de salinidade em cultivos de camarão, peixes marinhos e outros organismos aquáticos.",
      benefits: [
        "Medição precisa de salinidade digital",
        "Compensação automática de temperatura",
        "Calibração automática com água destilada",
        "Display LCD retroiluminado",
        "Resistente à água e corrosão",
        "Operação simples com um botão"
      ],
      presentation: [
        "Refratômetro básico: Faixa 0-100 ppt",
        "Refratômetro profissional: Faixa 0-150 ppt",
        "Kit completo: Com soluções de calibração",
        "Estojo de transporte resistente",
        "Manual em português incluído"
      ],
      specifications: [
        { key: "Faixa de salinidade", value: "0-100/150 ppt" },
        { key: "Precisão", value: "±0,1 ppt" },
        { key: "Resolução", value: "0,1 ppt" },
        { key: "Compensação de temperatura", value: "Automática ATC" },
        { key: "Calibração", value: "Automática com água destilada" },
        { key: "Proteção", value: "IP65" }
      ]
    }
  },

  // Turbidímetro Portátil Digital - EQ023
  "EQ023": {
    es: {
      name: "Kits API Fosfato",
      description: "El fosfato puede ingresar a su acuario a través del agua del grifo, desechos\nde peces y sustancias orgánicas en descomposición, como alimentos no\nconsumidos y algas muertas. El exceso de fosfato contribuye a la aparición\nde algas antiestéticas y la proliferación de agua verde, y en agua salada, el\nexceso de fosfato puede inhibir el crecimiento de corales duros.",
      benefits: [
      "Se puede usar tanto para acuarios frescos",
      "como para acuarios de agua salada."
    ],
      presentation: [
      "Contiene 150 pruebas e incluye 2 soluciones de",
      "prueba, instrucciones fáciles de usar, tubo de",
      "ensayo y 2 tablas de colores."
    ],
      specifications: [
      {
        "key": "Especificación",
        "value": "El KIT DE PRUEBA DE FOSFATO API prueba los niveles de fosfato de 0 a 10"
      },
      {
        "key": "Especificación",
        "value": "ppm para que pueda controlar fácilmente el estado del agua de su acuario."
      }
    ]
    },
    en: {
      name: "Portable Digital Turbidimeter",
      description: "Portable digital turbidimeter for precise turbidity measurement in aquaculture systems. Uses 90° light scattering technology according to EPA and ISO standards. Essential for water quality monitoring, filtration efficiency and treatment system control. Includes calibration with certified standards.",
      benefits: [
        "Precise measurement according to EPA/ISO standards",
        "Portability for field measurements",
        "Calibration with certified standards",
        "Fast reading in seconds",
        "Automatic data logging",
        "Resistant to aquaculture environments"
      ],
      presentation: [
        "Basic turbidimeter: 0-1000 NTU",
        "Advanced turbidimeter: 0-4000 NTU",
        "Calibration kit: Standards included",
        "Data download software",
        "Transport case included"
      ],
      specifications: [
        { key: "Measurement range", value: "0-1000/4000 NTU" },
        { key: "Accuracy", value: "±2% of reading" },
        { key: "Resolution", value: "0.01 NTU" },
        { key: "Method", value: "90° scattering EPA/ISO" },
        { key: "Memory", value: "1000 measurements" },
        { key: "Protection", value: "IP67" }
      ]
    },
    pt: {
      name: "Turbidímetro Portátil Digital",
      description: "Turbidímetro digital portátil para medição precisa de turbidez em sistemas aquícolas. Utiliza tecnologia de dispersão de luz a 90° segundo padrões EPA e ISO. Essencial para monitoramento de qualidade da água, eficiência de filtração e controle de sistemas de tratamento. Inclui calibração com padrões certificados.",
      benefits: [
        "Medição precisa segundo padrões EPA/ISO",
        "Portabilidade para medições em campo",
        "Calibração com padrões certificados",
        "Leitura rápida em segundos",
        "Registro automático de dados",
        "Resistente a ambientes aquícolas"
      ],
      presentation: [
        "Turbidímetro básico: 0-1000 NTU",
        "Turbidímetro avançado: 0-4000 NTU",
        "Kit de calibração: Padrões incluídos",
        "Software de download de dados",
        "Maleta de transporte incluída"
      ],
      specifications: [
        { key: "Faixa de medição", value: "0-1000/4000 NTU" },
        { key: "Precisão", value: "±2% da leitura" },
        { key: "Resolução", value: "0,01 NTU" },
        { key: "Método", value: "Dispersão 90° EPA/ISO" },
        { key: "Memória", value: "1000 medições" },
        { key: "Proteção", value: "IP67" }
      ]
    }
  },

  // Analizador de Amoníaco Digital - EQ024
  "EQ024": {
    es: {
      name: "Kits API Amonio",
      description: "El kit de prueba de amoníaco API® mide el amoníaco para ayudar a\nprevenir la pérdida de peces, ya que el amoníaco es el principal factor\nestresante y mortal de los peces tropicales. El amoníaco se libera en un\nacuario en forma de alimentos no consumidos, materia orgánica en\ndescomposición y cuando los peces lo liberan a través de las branquias, la\norina y los desechos sólidos.",
      benefits: [
      "Se puede usar tanto para acuarios frescos",
      "como para acuarios de agua salada."
    ],
      presentation: [
      "Contiene 130 pruebas e incluye 2 soluciones de",
      "prueba, instrucciones fáciles de usar, tubo de",
      "prueba de vidrio y 2 tablas de colores."
    ],
      specifications: [
      {
        "key": "Especificación",
        "value": "El API Ammonia Test Kit es una prueba de salicilato libre de mercurio para"
      },
      {
        "key": "Especificación",
        "value": "peces de agua dulce y salada, y niveles de niveles de amoníaco de 0 a 8"
      },
      {
        "key": "Especificación",
        "value": "ppm."
      }
    ]
    },
    en: {
      name: "Digital Ammonia Analyzer",
      description: "Specialized digital analyzer for direct measurement of total ammonia in aquaculture systems. Uses ion-selective electrode technology for fast and accurate measurements. Essential for water quality monitoring and prevention of ammonia toxicity in aquatic organisms. Includes automatic temperature compensation.",
      benefits: [
        "Direct measurement of total ammonia",
        "Ion-selective electrode technology",
        "Automatic temperature compensation",
        "Fast measurements in 2 minutes",
        "Toxic level alerts",
        "Simple calibration with standards"
      ],
      presentation: [
        "Portable analyzer: With integrated electrode",
        "Electrode kit: Replacement electrode",
        "Calibration solutions: Certified standards",
        "Analysis software: For PC",
        "Rugged field case"
      ],
      specifications: [
        { key: "Measurement range", value: "0.1-1000 mg/L NH3" },
        { key: "Accuracy", value: "±3% of reading" },
        { key: "Response time", value: "2 minutes" },
        { key: "Temperature compensation", value: "Automatic" },
        { key: "Method", value: "Ion-selective electrode" },
        { key: "Memory", value: "500 measurements" }
      ]
    },
    pt: {
      name: "Analisador de Amônia Digital",
      description: "Analisador digital especializado para medição direta de amônia total em sistemas aquícolas. Utiliza tecnologia de eletrodo íon-seletivo para medições rápidas e precisas. Fundamental para monitoramento de qualidade da água e prevenção de toxicidade por amônia em organismos aquáticos. Inclui compensação automática de temperatura.",
      benefits: [
        "Medição direta de amônia total",
        "Tecnologia de eletrodo íon-seletivo",
        "Compensação automática de temperatura",
        "Medições rápidas em 2 minutos",
        "Alertas de níveis tóxicos",
        "Calibração simples com padrões"
      ],
      presentation: [
        "Analisador portátil: Com eletrodo integrado",
        "Kit de eletrodos: Eletrodo de reposição",
        "Soluções de calibração: Padrões certificados",
        "Software de análise: Para PC",
        "Estojo de campo robusto"
      ],
      specifications: [
        { key: "Faixa de medição", value: "0,1-1000 mg/L NH3" },
        { key: "Precisão", value: "±3% da leitura" },
        { key: "Tempo de resposta", value: "2 minutos" },
        { key: "Compensação de temperatura", value: "Automática" },
        { key: "Método", value: "Eletrodo íon-seletivo" },
        { key: "Memória", value: "500 medições" }
      ]
    }
  },

  // Medidor de Conductividad Eléctrica - EQ025
  "EQ025": {
    es: {
      name: "Kits API Nitrato",
      description: "Los altos niveles de nitrato en su acuario indican una acumulación de\ndesechos de pescado y compuestos orgánicos, lo que resulta en una\ncalidad del agua deficiente y un aumento en el crecimiento de algas. Por\nel contrario, mantener un bajo nivel de nitrato mejora la salud de los peces\ne invertebrados.",
      benefits: [
      "Se puede usar tanto para acuarios frescos",
      "como para acuarios de agua salada."
    ],
      presentation: [
      "Contiene 90 pruebas e incluye 2 soluciones de",
      "prueba, instrucciones fáciles de usar, tubo de",
      "prueba de vidrio y carta de colores."
    ],
      specifications: [
      {
        "key": "Especificación",
        "value": "Use el Kit de prueba de nitrato API® para asegurarse de que los niveles de"
      },
      {
        "key": "Especificación",
        "value": "nitrato en su tanque sean seguros y saludables para sus peces. El Nitrate"
      },
      {
        "key": "Especificación",
        "value": "Test Kit lee parámetros de 0 a 160 ppm y contiene 2 frascos de reactivo de"
      },
      {
        "key": "Especificación",
        "value": "prueba líquido, 2 tarjetas de color para facilitar la comparación, 1 tubo de"
      },
      {
        "key": "Especificación",
        "value": "vidrio con tapa hermética e instrucciones paso a paso sobre cómo"
      },
      {
        "key": "Especificación",
        "value": "corregir condiciones inseguras."
      }
    ]
    },
    en: {
      name: "Electrical Conductivity Meter",
      description: "Digital electrical conductivity meter for monitoring dissolved salt concentration in aquaculture systems. Includes automatic temperature compensation and multiple measurement ranges. Essential for salinity control, fertilization monitoring and evaluation of inlet water and effluent quality.",
      benefits: [
        "Precise conductivity measurement",
        "Automatic temperature compensation",
        "Multiple measurement ranges",
        "Automatic conversion to TDS and salinity",
        "Long-lasting replaceable electrode",
        "Simple calibration with standard solutions"
      ],
      presentation: [
        "Basic meter: Range 0-20 mS/cm",
        "Professional meter: Range 0-200 mS/cm",
        "Complete kit: With calibration solutions",
        "Replacement electrode: Available separately",
        "Water-resistant protective case"
      ],
      specifications: [
        { key: "Conductivity range", value: "0-20/200 mS/cm" },
        { key: "Accuracy", value: "±1% full scale" },
        { key: "Resolution", value: "0.01 mS/cm" },
        { key: "TDS conversion", value: "Automatic" },
        { key: "Temperature compensation", value: "Automatic 0-100°C" },
        { key: "Protection", value: "IP67" }
      ]
    },
    pt: {
      name: "Medidor de Condutividade Elétrica",
      description: "Medidor digital de condutividade elétrica para monitoramento da concentração de sais dissolvidos em sistemas aquícolas. Inclui compensação automática de temperatura e múltiplas faixas de medição. Essencial para controle de salinidade, monitoramento de fertilização e avaliação de qualidade da água de entrada e efluentes.",
      benefits: [
        "Medição precisa de condutividade",
        "Compensação automática de temperatura",
        "Múltiplas faixas de medição",
        "Conversão automática para TDS e salinidade",
        "Eletrodo substituível de longa duração",
        "Calibração simples com soluções padrão"
      ],
      presentation: [
        "Medidor básico: Faixa 0-20 mS/cm",
        "Medidor profissional: Faixa 0-200 mS/cm",
        "Kit completo: Com soluções de calibração",
        "Eletrodo de reposição: Disponível separadamente",
        "Estojo protetor resistente à água"
      ],
      specifications: [
        { key: "Faixa de condutividade", value: "0-20/200 mS/cm" },
        { key: "Precisão", value: "±1% escala completa" },
        { key: "Resolução", value: "0,01 mS/cm" },
        { key: "Conversão TDS", value: "Automática" },
        { key: "Compensação de temperatura", value: "Automática 0-100°C" },
        { key: "Proteção", value: "IP67" }
      ]
    }
  },

  // Microscopio para Análisis de Plancton - EQ026
  "EQ026": {
    es: {
      name: "Kits API Nitrito",
      description: "El nitrito se produce en el acuario en forma de desechos de pescado,\nalimentos no consumidos y bacterias nitrificantes en el ciclo natural de su\nacuario, ya que descompone el amoníaco. Los niveles bajos de nitrito\ninhiben la respiración y suprimen el sistema inmune, mientras que los\nniveles altos causan asfixia en los peces.",
      benefits: [
      "Se puede usar tanto para acuarios frescos",
      "como para acuarios de agua salada."
    ],
      presentation: [
      "Contiene 180 pruebas e incluye 1 solución de prueba,",
      "instrucciones fáciles de usar, tubo de prueba de vidrio",
      "y carta de colores."
    ],
      specifications: [
      {
        "key": "Especificación",
        "value": "El kit de prueba de nitrito API® lee"
      },
      {
        "key": "Especificación",
        "value": "los niveles de nitrito de forma rápida y precisa en su tanque y prueba los"
      },
      {
        "key": "Especificación",
        "value": "parámetros de 0 a 5 ppm."
      }
    ]
    },
    en: {
      name: "Microscope for Plankton Analysis",
      description: "Specialized biological microscope for analysis of phytoplankton, zooplankton and microorganisms in aquaculture systems. Equipped with high-resolution objectives, adjustable condenser and LED lighting system. Includes integrated digital camera for documentation and analysis software for counting and species identification.",
      benefits: [
        "Precise analysis of phytoplankton and zooplankton",
        "High-resolution objectives up to 1000x",
        "Integrated digital camera for documentation",
        "Analysis and counting software included",
        "Long-lasting LED lighting",
        "Stable base with anti-vibration system"
      ],
      presentation: [
        "Basic microscope: Objectives 40x, 100x, 400x",
        "Professional microscope: Objectives up to 1000x",
        "Analysis kit: With camera and software",
        "Accessories included: Slides and coverslips",
        "Species identification manual"
      ],
      specifications: [
        { key: "Available magnifications", value: "40x, 100x, 400x, 1000x" },
        { key: "Lighting type", value: "Adjustable LED" },
        { key: "Camera resolution", value: "5 MP" },
        { key: "Software included", value: "Analysis and counting" },
        { key: "Condenser", value: "Abbe NA 1.25" },
        { key: "Stage", value: "Graduated mechanical" }
      ]
    },
    pt: {
      name: "Microscópio para Análise de Plâncton",
      description: "Microscópio biológico especializado para análise de fitoplâncton, zooplâncton e microorganismos em sistemas aquícolas. Equipado com objetivas de alta resolução, condensador ajustável e sistema de iluminação LED. Inclui câmera digital integrada para documentação e software de análise para contagem e identificação de espécies.",
      benefits: [
        "Análise precisa de fitoplâncton e zooplâncton",
        "Objetivas de alta resolução até 1000x",
        "Câmera digital integrada para documentação",
        "Software de análise e contagem incluído",
        "Iluminação LED de longa duração",
        "Base estável com sistema anti-vibração"
      ],
      presentation: [
        "Microscópio básico: Objetivas 40x, 100x, 400x",
        "Microscópio profissional: Objetivas até 1000x",
        "Kit de análise: Com câmera e software",
        "Acessórios incluídos: Lâminas e lamínulas",
        "Manual de identificação de espécies"
      ],
      specifications: [
        { key: "Aumentos disponíveis", value: "40x, 100x, 400x, 1000x" },
        { key: "Tipo de iluminação", value: "LED ajustável" },
        { key: "Resolução da câmera", value: "5 MP" },
        { key: "Software incluído", value: "Análise e contagem" },
        { key: "Condensador", value: "Abbe NA 1,25" },
        { key: "Platina", value: "Mecânica graduada" }
      ]
    }
  },

  // Kit de Análisis de Calidad de Agua - EQ027
  "EQ027": {
    es: {
      name: "Malla Marines Roja",
      description: "Malla técnica de alto rendimiento elaborada con 100% poliéster texturizado, teñida por agotamiento, de color rojo. Ideal para aplicaciones en acuicultura, filtrado o protección. Ofrece durabilidad, resistencia y buen rendimiento por kilo de producto.",
      benefits: [
      "Alta resistencia y durabilidad gracias a su composición de poliéster texturizado.",
      "Excelente rendimiento: mayor cobertura por kilo.",
      "Teñida por agotamiento, lo que asegura color uniforme y buena fijación.",
      "Ideal para sistemas de filtración, sombreado o contención en ambientes húmedos o exigentes.",
      "Fácil de manejar y cortar."
    ],
      presentation: [
      "Presentación: Rollos de 200 metros",
      "Comercialización: Por metro lineal",
      "Almacenamiento: Guardar en lugar seco, protegido del sol directo y de humedad excesiva para conservar su color y estructura."
    ],
      specifications: [
      {
        "key": "Artículo",
        "value": "Marines"
      },
      {
        "key": "Composición",
        "value": "100% Poliéster texturizado"
      },
      {
        "key": "Ancho",
        "value": "1,60 m"
      },
      {
        "key": "Micraje",
        "value": "800 - 900 micras"
      },
      {
        "key": "Rendimiento",
        "value": "Aproximadamente 15 metros por kilo"
      },
      {
        "key": "Proceso de tintura",
        "value": "Por agotamiento"
      },
      {
        "key": "Proceso de lavado",
        "value": "No dejar en remojo con detergentes"
      },
      {
        "key": "Color",
        "value": "Rojo"
      }
    ]
    },
    en: {
      name: "Water Quality Analysis Kit",
      description: "Complete chemical analysis kit for comprehensive water quality evaluation in aquaculture systems. Includes reagents and materials for analysis of critical parameters such as ammonia, nitrites, nitrates, phosphates, hardness, alkalinity and other quality indicators. Designed for field use with fast and accurate results.",
      benefits: [
        "Complete analysis of critical parameters",
        "Fast results in the field",
        "High-quality reagents included",
        "Simple and safe procedures",
        "Rugged field case",
        "Detailed manual in English"
      ],
      presentation: [
        "Basic kit: 8 main parameters",
        "Professional kit: 15 complete parameters",
        "Industrial kit: 20 advanced parameters",
        "Replacement reagents available",
        "Water-resistant field case"
      ],
      specifications: [
        { key: "Analyzable parameters", value: "8, 15, 20 depending on kit" },
        { key: "Number of analyses", value: "50-100 per parameter" },
        { key: "Time per analysis", value: "5-15 minutes" },
        { key: "Accuracy", value: "±5% depending on parameter" },
        { key: "Reagent expiration", value: "24 months" },
        { key: "Storage temperature", value: "5-25°C" }
      ]
    },
    pt: {
      name: "Kit de Análise de Qualidade da Água",
      description: "Kit completo de análise química para avaliação integral de qualidade da água em sistemas aquícolas. Inclui reagentes e materiais para análise de parâmetros críticos como amônia, nitritos, nitratos, fosfatos, dureza, alcalinidade e outros indicadores de qualidade. Projetado para uso em campo com resultados rápidos e precisos.",
      benefits: [
        "Análise completa de parâmetros críticos",
        "Resultados rápidos em campo",
        "Reagentes de alta qualidade incluídos",
        "Procedimentos simples e seguros",
        "Estojo resistente para campo",
        "Manual detalhado em português"
      ],
      presentation: [
        "Kit básico: 8 parâmetros principais",
        "Kit profissional: 15 parâmetros completos",
        "Kit industrial: 20 parâmetros avançados",
        "Reagentes de reposição disponíveis",
        "Estojo de campo resistente à água"
      ],
      specifications: [
        { key: "Parâmetros analisáveis", value: "8, 15, 20 conforme kit" },
        { key: "Número de análises", value: "50-100 por parâmetro" },
        { key: "Tempo por análise", value: "5-15 minutos" },
        { key: "Precisão", value: "±5% conforme parâmetro" },
        { key: "Validade dos reagentes", value: "24 meses" },
        { key: "Temperatura de armazenamento", value: "5-25°C" }
      ]
    }
  },

  // Incubadora para Cultivo de Microalgas - EQ028
  "EQ028": {
    es: {
      name: "Mallas Nitex",
      description: "Mallas de precisión fabricadas con monofilamento sintético especializado, diseñadas para garantizar consistencia en la filtración. Son resistentes a bacterias, limpiadores, ácidos e insectos, ideales para ambientes exigentes como laboratorios, hatcheries, sistemas RAS y otras aplicaciones industriales o acuícolas.",
      benefits: [
      "Permite una filtración precisa y repetible",
      "No se deforma ni pierde estructura en uso prolongado",
      "Alta resistencia a agentes químicos y al desgaste",
      "Facilita la limpieza y el mantenimiento",
      "Compatible con procesos de bioseguridad exigentes"
    ],
      presentation: [
      "Presentación: Venta por metros lineales",
      "Almacenamiento: Mantener en lugar seco, limpio y protegido de la luz solar directa para preservar su integridad estructural y micraje."
    ],
      specifications: [
      {
        "key": "Material",
        "value": "Monofilamento sintético"
      },
      {
        "key": "Tipo de tejido",
        "value": "Tejido de precisión"
      },
      {
        "key": "Resistencia química",
        "value": "Alta (bacterias, limpiadores, ácidos, insectos)"
      },
      {
        "key": "Propiedades destacadas",
        "value": ""
      },
      {
        "key": "Especificación",
        "value": "Tamaño de poro constante"
      },
      {
        "key": "Especificación",
        "value": "Grosor definido"
      },
      {
        "key": "Especificación",
        "value": "Alta resistencia a la tracción"
      },
      {
        "key": "Especificación",
        "value": "Estabilidad dimensional"
      },
      {
        "key": "Especificación",
        "value": "Facilidad de limpieza"
      },
      {
        "key": "MICRAJES DISPONIBLES",
        "value": ""
      },
      {
        "key": "Especificación",
        "value": "75 micras"
      },
      {
        "key": "Especificación",
        "value": "100 micras"
      },
      {
        "key": "Especificación",
        "value": "200 micras"
      },
      {
        "key": "Especificación",
        "value": "300 micras"
      },
      {
        "key": "Especificación",
        "value": "400 micras"
      },
      {
        "key": "Especificación",
        "value": "600 micras"
      },
      {
        "key": "Especificación",
        "value": "1000 micras"
      }
    ]
    },
    en: {
      name: "Microalgae Cultivation Incubator",
      description: "Specialized incubator for controlled cultivation of microalgae used as live food in aquaculture. Includes precise temperature control, programmable LED lighting, orbital shaking and CO2 system. Ideal for production of Chlorella, Spirulina, Nannochloropsis and other microalgae species essential for larval feeding.",
      benefits: [
        "Precise temperature control ±0.5°C",
        "Programmable LED lighting by photoperiods",
        "Orbital shaking for homogeneous cultures",
        "Controlled CO2 injection system",
        "Multiple independent culture chambers",
        "Continuous monitoring and alarms"
      ],
      presentation: [
        "Small incubator: 4 chambers of 2L",
        "Medium incubator: 8 chambers of 5L",
        "Industrial incubator: 16 chambers of 10L",
        "Digital control system included",
        "Initial microalgae strain kit"
      ],
      specifications: [
        { key: "Number of chambers", value: "4, 8, 16 depending on model" },
        { key: "Volume per chamber", value: "2L, 5L, 10L" },
        { key: "Temperature range", value: "15-40°C ±0.5°C" },
        { key: "Lighting", value: "Full spectrum LED" },
        { key: "Shaking", value: "20-200 rpm orbital" },
        { key: "CO2 control", value: "0.1-5% concentration" }
      ]
    },
    pt: {
      name: "Incubadora para Cultivo de Microalgas",
      description: "Incubadora especializada para cultivo controlado de microalgas utilizadas como alimento vivo em aquicultura. Inclui controle preciso de temperatura, iluminação LED programável, agitação orbital e sistema de CO2. Ideal para produção de Chlorella, Spirulina, Nannochloropsis e outras espécies de microalgas essenciais para alimentação de larvas.",
      benefits: [
        "Controle preciso de temperatura ±0,5°C",
        "Iluminação LED programável por fotoperíodos",
        "Agitação orbital para cultivos homogêneos",
        "Sistema de injeção de CO2 controlado",
        "Múltiplas câmaras de cultivo independentes",
        "Monitoramento contínuo e alarmes"
      ],
      presentation: [
        "Incubadora pequena: 4 câmaras de 2L",
        "Incubadora média: 8 câmaras de 5L",
        "Incubadora industrial: 16 câmaras de 10L",
        "Sistema de controle digital incluído",
        "Kit inicial de cepas de microalgas"
      ],
      specifications: [
        { key: "Número de câmaras", value: "4, 8, 16 conforme modelo" },
        { key: "Volume por câmara", value: "2L, 5L, 10L" },
        { key: "Faixa de temperatura", value: "15-40°C ±0,5°C" },
        { key: "Iluminação", value: "LED full spectrum" },
        { key: "Agitação", value: "20-200 rpm orbital" },
        { key: "Controle CO2", value: "0,1-5% concentração" }
      ]
    }
  },

  // Contador de Partículas Digital - EQ029
  "EQ029": {
    es: {
      name: "Mallas para Piscinas Camaroneras",
      description: "Mallas sintéticas de alta resistencia diseñadas para aplicaciones en acuicultura. Fabricadas con polímeros de calidad, son resistentes a bacterias, duraderas, con protección UV y configuradas en forma rómbica para máxima eficiencia de filtrado y protección estructural.",
      benefits: [
      "Alta durabilidad y resistencia mecánica.",
      "Protección contra exposición prolongada al sol gracias a su tratamiento UV.",
      "Diseño antibacteriano que previene acumulaciones nocivas.",
      "Fácil de cortar e instalar en sistemas de filtrado, protección de tanques o esclusas.",
      "Versatilidad de calibres según la necesidad del cultivo o instalación."
    ],
      presentation: [
      "Presentación por metraje:",
      "Malla 5277: Rollos de 50 metros",
      "Mallas 5255, 5201, 5256: Rollos de 25 metros",
      "Peso del rollo: Aproximadamente 16,8 kg",
      "Almacenamiento:",
      "Mantener en lugar seco, alejado de fuentes de calor y rayos solares cuando no esté en uso.",
      "Puede almacenarse en posición vertical u horizontal sin riesgo de deformación."
    ],
      specifications: [
      {
        "key": "Material",
        "value": "Polímero"
      },
      {
        "key": "Color",
        "value": "Negro"
      },
      {
        "key": "Configuración",
        "value": "Malla rómbica (refuerzo en modelos 5277 y 5255)"
      },
      {
        "key": "Protección UV",
        "value": "Sí"
      },
      {
        "key": "Resistencia bacteriana",
        "value": "Alta"
      },
      {
        "key": "Malla 5277",
        "value": "1x1 mm"
      },
      {
        "key": "Malla 5255",
        "value": "3x3 mm"
      },
      {
        "key": "Malla 5201",
        "value": "4x4 mm"
      },
      {
        "key": "Malla 5256",
        "value": "6x6 mm"
      }
    ]
    },
    en: {
      name: "Digital Particle Counter",
      description: "Automatic digital counter for rapid and accurate analysis of phytoplankton, zooplankton and other particle density in suspension. Uses image analysis technology for automatic counting and size classification. Essential for primary productivity monitoring, live food density and quality control in hatcheries.",
      benefits: [
        "Fast and accurate automatic counting",
        "Particle size classification",
        "Advanced digital image analysis",
        "Integrated species database",
        "Automatic reports with graphics",
        "Simple and user-friendly interface"
      ],
      presentation: [
        "Basic counter: Guided manual analysis",
        "Automatic counter: Species recognition",
        "Professional software: Expanded database",
        "Calibration kit: Standard spheres",
        "Local species manual"
      ],
      specifications: [
        { key: "Counting range", value: "10-10,000 particles/mL" },
        { key: "Particle size", value: "2-500 microns" },
        { key: "Counting accuracy", value: "±3%" },
        { key: "Analysis time", value: "30 seconds" },
        { key: "Optical resolution", value: "0.5 microns" },
        { key: "Database", value: "200+ species" }
      ]
    },
    pt: {
      name: "Contador de Partículas Digital",
      description: "Contador digital automático para análise rápida e precisa de densidade de fitoplâncton, zooplâncton e outras partículas em suspensão. Utiliza tecnologia de análise de imagem para contagem automática e classificação por tamanho. Essencial para monitoramento de produtividade primária, densidade de alimento vivo e controle de qualidade em hatcheries.",
      benefits: [
        "Contagem automática rápida e precisa",
        "Classificação por tamanho de partículas",
        "Análise de imagem digital avançada",
        "Base de dados de espécies integrada",
        "Relatórios automáticos com gráficos",
        "Interface simples e amigável"
      ],
      presentation: [
        "Contador básico: Análise manual guiada",
        "Contador automático: Reconhecimento de espécies",
        "Software profissional: Base de dados ampliada",
        "Kit de calibração: Esferas padrão",
        "Manual de espécies locais"
      ],
      specifications: [
        { key: "Faixa de contagem", value: "10-10.000 partículas/mL" },
        { key: "Tamanho de partículas", value: "2-500 mícrons" },
        { key: "Precisão de contagem", value: "±3%" },
        { key: "Tempo de análise", value: "30 segundos" },
        { key: "Resolução óptica", value: "0,5 mícrons" },
        { key: "Base de dados", value: "200+ espécies" }
      ]
    }
  },

  // Espectrofotómetro para Análisis de Agua - EQ030
  "EQ030": {
    es: {
      name: "Manguera de Vinil Transparente",
      description: "Aprobado por la FDA, de muy alta calidad con un diámetro ligeramente más\ngrande y pared más pesada que la\ntubería de acuario.",
      benefits: [
      "Este tubo tiene una capacidad nominal de 36 psi a 22 °C (72",
      "°F)."
    ],
      presentation: [
      "Rollos de 31 metros."
    ],
      specifications: [
      {
        "key": "Modelo",
        "value": "TP30HD Longitud: 100 pie Diámetro interior: 3/16 pulgadas Diámetro exterior: 5/16 pulgadas PSI: 40"
      }
    ]
    },
    en: {
      name: "Spectrophotometer for Water Analysis",
      description: "UV-Visible spectrophotometer specialized for advanced chemical analysis of water in aquaculture systems. Allows precise determination of nutrients, heavy metals, organic compounds and other critical parameters. Includes pre-programmed methods for aquaculture and analysis software with standard methods database.",
      benefits: [
        "High precision chemical analysis",
        "Pre-programmed methods for aquaculture",
        "Determination of nutrients and metals",
        "Complete UV-Visible range",
        "Advanced analysis software",
        "Traceable and certifiable results"
      ],
      presentation: [
        "Basic spectrophotometer: Essential methods",
        "Professional model: Complete methods",
        "Cuvette kit: Quartz and glass",
        "Specialized software: For aquaculture",
        "Calibration standards included"
      ],
      specifications: [
        { key: "Spectral range", value: "190-1100 nm" },
        { key: "Wavelength accuracy", value: "±0.1 nm" },
        { key: "Bandwidth", value: "0.5, 1.0, 2.0 nm" },
        { key: "Absorbance range", value: "0-4 Abs" },
        { key: "Methods included", value: "50+ aquaculture" },
        { key: "Light source", value: "D2 and W lamp" }
      ]
    },
    pt: {
      name: "Espectrofotômetro para Análise de Água",
      description: "Espectrofotômetro UV-Visível especializado para análise química avançada de água em sistemas aquícolas. Permite determinação precisa de nutrientes, metais pesados, compostos orgânicos e outros parâmetros críticos. Inclui métodos pré-programados para aquicultura e software de análise com base de dados de métodos padrão.",
      benefits: [
        "Análise química de alta precisão",
        "Métodos pré-programados para aquicultura",
        "Determinação de nutrientes e metais",
        "Faixa UV-Visível completa",
        "Software de análise avançado",
        "Resultados rastreáveis e certificáveis"
      ],
      presentation: [
        "Espectrofotômetro básico: Métodos essenciais",
        "Modelo profissional: Métodos completos",
        "Kit de cubetas: Quartzo e vidro",
        "Software especializado: Para aquicultura",
        "Padrões de calibração incluídos"
      ],
      specifications: [
        { key: "Faixa espectral", value: "190-1100 nm" },
        { key: "Precisão comprimento onda", value: "±0,1 nm" },
        { key: "Largura de banda", value: "0,5, 1,0, 2,0 nm" },
        { key: "Faixa de absorbância", value: "0-4 Abs" },
        { key: "Métodos incluídos", value: "50+ aquicultura" },
        { key: "Fonte de luz", value: "Lâmpada D2 e W" }
      ]
    }
  },

  // Esterilizador UV para Equipos - EQ031
  "EQ031": {
    es: {
      name: "Manguera Difusora",
      description: "Para obtener un ambiente adecuado en el estanque, la manguera difusora se\ndebe ubicar de acuerdo a la forma del mismo:\nEstanque circular:\nDebe ser ubicada de forma circular en el fondo del estanque.\nEstanque rectangular:\nDebe ser dividida en líneas verticales, ubicándolas en el fondo del estanque.",
      benefits: [
      "La manguera difusora Aerotube está compuesta por un material de polietileno",
      "poroso.",
      "Permite emitir micro burbujas y mantener alrededor del 90% a 95% del nivel de",
      "oxígeno en el agua."
    ],
      presentation: [
      "Por metro"
    ],
      specifications: [
      {
        "key": "Diámetro externo",
        "value": "2,54cm Diámetro interno: 1,27cm Grosor de la pared: 0,64cm Peso: 0,33 kg/m Longitud del rollo: 61m Peso del rollo: 20kg Presión de la rotura: 5,62 kgs/cm2 Flujo de aire: 0,037m3/min/m"
      }
    ]
    },
    en: {
      name: "UV Sterilizer for Equipment",
      description: "UV-C sterilizer specialized for disinfection of equipment, tools and surfaces in aquaculture laboratories and hatcheries. Compact design with closed chamber and programmable timer for effective sterilization cycles. Eliminates bacteria, viruses and fungi without chemicals, ensuring biosafety in critical operations.",
      benefits: [
        "Effective sterilization without chemicals",
        "Compact design for laboratory",
        "Programmable timer for automatic cycles",
        "Elimination of bacteria, viruses and fungi",
        "Safe operation with closed chamber",
        "Minimal maintenance required"
      ],
      presentation: [
        "Small model: Chamber 30x30x20 cm",
        "Medium model: Chamber 50x40x30 cm",
        "Large model: Chamber 80x60x40 cm",
        "Replacement UV-C lamp included",
        "Digital timer with LED display"
      ],
      specifications: [
        { key: "Chamber dimensions", value: "30x30x20 to 80x60x40 cm" },
        { key: "UV-C power", value: "15-55 watts" },
        { key: "Sterilization time", value: "5-30 minutes" },
        { key: "Efficacy", value: "99.9% microorganisms" },
        { key: "Lamp lifespan", value: "9,000 hours" },
        { key: "Interior material", value: "304 stainless steel" }
      ]
    },
    pt: {
      name: "Esterilizador UV para Equipamentos",
      description: "Esterilizador UV-C especializado para desinfecção de equipamentos, ferramentas e superfícies em laboratórios e hatcheries aquícolas. Design compacto com câmara fechada e timer programável para ciclos de esterilização efetivos. Elimina bactérias, vírus e fungos sem uso de químicos, garantindo biossegurança em operações críticas.",
      benefits: [
        "Esterilização efetiva sem químicos",
        "Design compacto para laboratório",
        "Timer programável para ciclos automáticos",
        "Eliminação de bactérias, vírus e fungos",
        "Operação segura com câmara fechada",
        "Manutenção mínima requerida"
      ],
      presentation: [
        "Modelo pequeno: Câmara 30x30x20 cm",
        "Modelo médio: Câmara 50x40x30 cm",
        "Modelo grande: Câmara 80x60x40 cm",
        "Lâmpada UV-C de reposição incluída",
        "Timer digital com display LED"
      ],
      specifications: [
        { key: "Dimensões da câmara", value: "30x30x20 a 80x60x40 cm" },
        { key: "Potência UV-C", value: "15-55 watts" },
        { key: "Tempo de esterilização", value: "5-30 minutos" },
        { key: "Eficácia", value: "99,9% microorganismos" },
        { key: "Vida útil da lâmpada", value: "9.000 horas" },
        { key: "Material interior", value: "Aço inoxidável 304" }
      ]
    }
  },

  // Agitador Magnético para Laboratorio - EQ032
  "EQ032": {
    es: {
      name: "Medidor de Calcio",
      description: "Medidor portátil de calcio con electrodo selectivo de iones, diseñado para ofrecer mediciones rápidas y precisas en campo o laboratorio. Su diseño compacto y resistente, sumado a su facilidad de uso y necesidad de muestra mínima, lo convierte en una herramienta ideal para aplicaciones en acuicultura, agricultura e investigación.",
      benefits: [
      "Permite análisis precisos de calcio con solo unas gotas de muestra.",
      "Ideal para monitoreo directo en campo o laboratorio.",
      "Portátil, práctico y con alta resistencia al agua, polvo y golpes.",
      "Fácil de usar, con calibración simple y rápida."
    ],
      presentation: [
      "Soluciones de calibración: 150 y 2000 ppm (14 ml c/u)",
      "2 baterías CR2032",
      "Jeringa dosificadora (2.5 ml)",
      "Manual de instrucciones",
      "Estuche rígido de transporte"
    ],
      specifications: [
      {
        "key": "Especificación",
        "value": "Características Principales"
      },
      {
        "key": "Especificación",
        "value": "A prueba de agua y polvo (IP67)"
      },
      {
        "key": "Especificación",
        "value": "Resistente a golpes"
      },
      {
        "key": "Especificación",
        "value": "Pantalla LCD con retroiluminación para condiciones de baja luz"
      },
      {
        "key": "Especificación",
        "value": "Sensor reemplazable"
      },
      {
        "key": "Especificación",
        "value": "Auto Hold y estabilización automática"
      },
      {
        "key": "Especificación",
        "value": "Apagado automático (30 min)"
      },
      {
        "key": "Especificación",
        "value": "Indicador de batería baja"
      },
      {
        "key": "Especificación",
        "value": "Construcción y Alimentación"
      },
      {
        "key": "Material",
        "value": "Carcasa Epoxi ABS / Sensor plano"
      },
      {
        "key": "Pantalla",
        "value": "LCD digital monocromática con retroiluminación"
      },
      {
        "key": "Dimensiones",
        "value": "164 × 29 × 20 mm"
      },
      {
        "key": "Peso",
        "value": "Aprox. 55 g (incluyendo baterías y sensor)"
      },
      {
        "key": "Alimentación",
        "value": "2 baterías CR2032"
      },
      {
        "key": "Duración",
        "value": "Aprox. 400 horas de uso continuo sin retroiluminación"
      }
    ]
    },
    en: {
      name: "Laboratory Magnetic Stirrer",
      description: "Precision magnetic stirrer for preparation of solutions, culture media and reagents in aquaculture laboratories. Includes variable speed control, optional heating and chemical-resistant platform. Essential for media preparation, salt dissolution and sample homogenization in water analysis.",
      benefits: [
        "Precise stirring speed control",
        "Chemical-resistant platform",
        "Optional controlled heating",
        "Silent and stable operation",
        "Magnetic stir bars included",
        "Compact design for laboratory"
      ],
      presentation: [
        "Basic stirrer: Stirring only, no heat",
        "Stirrer with heat: Temperature control",
        "Magnetic bar kit: Various sizes",
        "Universal support: For different flasks",
        "Operating manual included"
      ],
      specifications: [
        { key: "Speed range", value: "100-1500 rpm" },
        { key: "Stirring capacity", value: "Up to 5 liters" },
        { key: "Temperature range", value: "Ambient-300°C" },
        { key: "Temperature accuracy", value: "±1°C" },
        { key: "Platform", value: "Resistant ceramic" },
        { key: "Display", value: "Digital LED" }
      ]
    },
    pt: {
      name: "Agitador Magnético para Laboratório",
      description: "Agitador magnético de precisão para preparação de soluções, meios de cultivo e reagentes em laboratórios aquícolas. Inclui controle de velocidade variável, aquecimento opcional e plataforma resistente a químicos. Essencial para preparação de meios, dissolução de sais e homogeneização de amostras em análise de água.",
      benefits: [
        "Controle preciso de velocidade de agitação",
        "Plataforma resistente a químicos",
        "Aquecimento controlado opcional",
        "Operação silenciosa e estável",
        "Barras magnéticas incluídas",
        "Design compacto para laboratório"
      ],
      presentation: [
        "Agitador básico: Apenas agitação, sem calor",
        "Agitador com calor: Controle de temperatura",
        "Kit de barras magnéticas: Vários tamanhos",
        "Suporte universal: Para diferentes frascos",
        "Manual de operação incluído"
      ],
      specifications: [
        { key: "Faixa de velocidade", value: "100-1500 rpm" },
        { key: "Capacidade de agitação", value: "Até 5 litros" },
        { key: "Faixa de temperatura", value: "Ambiente-300°C" },
        { key: "Precisão de temperatura", value: "±1°C" },
        { key: "Plataforma", value: "Cerâmica resistente" },
        { key: "Display", value: "LED digital" }
      ]
    }
  },

  // Balanza Analítica de Precisión - EQ033
  "EQ033": {
    es: {
      name: "Medidor de Conductividad EC-11",
      description: "Medidor portátil compacto y de alta precisión diseñado para la medición de conductividad en campo o laboratorio. Su tecnología de doble electrodo bipolar y funciones automatizadas permiten lecturas confiables con un volumen mínimo de muestra. Es resistente, impermeable (IP67) y apto para condiciones exigentes. Ideal para aplicaciones en acuicultura, agricultura y análisis de calidad de agua.",
      benefits: [
      "Lectura rápida y precisa de conductividad con una muestra mínima.",
      "Portátil, confiable y resistente para uso en campo o laboratorio.",
      "Automatizaciones que simplifican la operación sin comprometer la precisión.",
      "Ideal para controlar la calidad del agua en cultivos acuícolas, agrícolas o análisis industriales."
    ],
      presentation: [
      "Soluciones de calibración: 1,41 mS/cm y 12,9 mS/cm (14 ml c/u)",
      "Solución de tratamiento de electrodo (4 ml)",
      "2 baterías CR2032",
      "Pipeta",
      "Manual de instrucciones",
      "Estuche portátil"
    ],
      specifications: [
      {
        "key": "Especificación",
        "value": "Características Principales"
      },
      {
        "key": "Especificación",
        "value": "A prueba de agua y polvo (IP67)"
      },
      {
        "key": "Especificación",
        "value": "Resistente a golpes y caídas"
      },
      {
        "key": "Especificación",
        "value": "Pantalla LCD amplia y retroiluminada"
      },
      {
        "key": "Requiere volumen mínimo de muestra",
        "value": "0.12 ml"
      },
      {
        "key": "Especificación",
        "value": "Sensor plano y reemplazable"
      },
      {
        "key": "Especificación",
        "value": "Apagado automático (30 min)"
      },
      {
        "key": "Especificación",
        "value": "Indicador de batería baja"
      },
      {
        "key": "Especificación",
        "value": "Construcción y Alimentación"
      },
      {
        "key": "Material",
        "value": "Carcasa Epoxi ABS"
      },
      {
        "key": "Pantalla",
        "value": "LCD monocromática con retroiluminación"
      },
      {
        "key": "Dimensiones",
        "value": "164 × 29 × 20 mm"
      },
      {
        "key": "Peso",
        "value": "Aprox. 55 g (incluyendo baterías y sensor)"
      },
      {
        "key": "Alimentación",
        "value": "2 baterías CR2032"
      },
      {
        "key": "Duración",
        "value": "Aprox. 400 horas de uso continuo sin retroiluminación"
      }
    ]
    },
    en: {
      name: "Precision Analytical Balance",
      description: "High-precision analytical balance for exact weighing of reagents, samples and standards in aquaculture laboratories. Equipped with electromagnetic load cell, anti-vibration weighing chamber and automatic internal calibration. Essential for solution preparation, additive dosing and quantitative analysis.",
      benefits: [
        "Exceptional precision of 0.1 mg",
        "Automatic internal calibration",
        "Anti-vibration chamber included",
        "Easy-to-use touchscreen",
        "Percentage weighing function",
        "USB connection for data"
      ],
      presentation: [
        "120g x 0.1mg balance: For routine analysis",
        "220g x 0.1mg balance: For large samples",
        "Anti-vibration kit: Isolation base",
        "Data software: For PC",
        "Certified calibration weights"
      ],
      specifications: [
        { key: "Maximum capacity", value: "120g, 220g" },
        { key: "Precision", value: "0.1 mg" },
        { key: "Linearity", value: "±0.2 mg" },
        { key: "Stabilization time", value: "3 seconds" },
        { key: "Calibration", value: "Automatic internal" },
        { key: "Connectivity", value: "USB, RS232" }
      ]
    },
    pt: {
      name: "Balança Analítica de Precisão",
      description: "Balança analítica de alta precisão para pesagem exata de reagentes, amostras e padrões em laboratórios aquícolas. Equipada com célula de carga eletromagnética, câmara de pesagem anti-vibração e calibração interna automática. Essencial para preparação de soluções, dosagem de aditivos e análises quantitativas.",
      benefits: [
        "Precisão excepcional de 0,1 mg",
        "Calibração interna automática",
        "Câmara anti-vibração incluída",
        "Tela sensível ao toque fácil de usar",
        "Função de pesagem percentual",
        "Conexão USB para dados"
      ],
      presentation: [
        "Balança 120g x 0,1mg: Para análises rotineiras",
        "Balança 220g x 0,1mg: Para amostras grandes",
        "Kit anti-vibração: Base isolante",
        "Software de dados: Para PC",
        "Pesos de calibração certificados"
      ],
      specifications: [
        { key: "Capacidade máxima", value: "120g, 220g" },
        { key: "Precisão", value: "0,1 mg" },
        { key: "Linearidade", value: "±0,2 mg" },
        { key: "Tempo de estabilização", value: "3 segundos" },
        { key: "Calibração", value: "Interna automática" },
        { key: "Conectividade", value: "USB, RS232" }
      ]
    }
  },

  // Centrífuga para Muestras Biológicas - EQ034
  "EQ034": {
    es: {
      name: "Medidor de pH",
      description: "",
      benefits: [
      "A prueba de agua y polvo, resistente a golpes.",
      "Peso 55 gramos.",
      "Pantalla amplia LCD con retroiluminación para ver resultados en lugares",
      "obscuros.",
      "Se necesita un volumen mínimo de muestra.",
      "Solo dos botones de calibración.",
      "Material de la carcaza de polímero Epoxi ABS."
    ],
      presentation: [
      "Soluciones de calibración pH 7.00 & 4.01",
      "(14 ml cada uno).",
      "Baterías CR2032 (2).",
      "Pipeta.",
      "Manual de instrucción y manual rápido.",
      "Estuche."
    ],
      specifications: [
      {
        "key": "Especificación",
        "value": "Características Principales"
      },
      {
        "key": "Especificación",
        "value": "A prueba de agua y polvo (IP67)"
      },
      {
        "key": "Especificación",
        "value": "Resistente a golpes y caídas"
      },
      {
        "key": "Especificación",
        "value": "Lectura directa con muestra mínima (0.3 ml)"
      },
      {
        "key": "Especificación",
        "value": "Calibración sencilla con solo dos botones"
      },
      {
        "key": "Especificación",
        "value": "Pantalla LCD retroiluminada"
      },
      {
        "key": "Especificación",
        "value": "Sensor reemplazable"
      },
      {
        "key": "Especificación",
        "value": "Apagado automático (30 min)"
      },
      {
        "key": "Especificación",
        "value": "Indicador de batería baja"
      },
      {
        "key": "Especificación",
        "value": "Funciones"
      },
      {
        "key": "Especificación",
        "value": "Reconocimiento automático de buffer"
      },
      {
        "key": "Especificación",
        "value": "Compensación automática de temperatura"
      },
      {
        "key": "Especificación",
        "value": "Calibración de temperatura"
      },
      {
        "key": "Especificación",
        "value": "Auto Hold / Estabilización automática"
      },
      {
        "key": "Especificación",
        "value": "Apagado automático"
      },
      {
        "key": "Especificación",
        "value": "Indicador de batería baja"
      },
      {
        "key": "Especificación",
        "value": "Construcción y Alimentación"
      },
      {
        "key": "Material",
        "value": "Carcasa Epoxi ABS, sensor plano"
      },
      {
        "key": "Dimensiones",
        "value": "164 x 29 x 20 mm"
      },
      {
        "key": "Peso",
        "value": "Aprox. 55 g (con sensor y baterías)"
      },
      {
        "key": "Alimentación",
        "value": "2 baterías CR2032"
      },
      {
        "key": "Autonomía",
        "value": "Aprox. 400 h sin retroiluminación"
      }
    ]
    },
    en: {
      name: "Centrifuge for Biological Samples",
      description: "High-speed desktop centrifuge for separation of biological samples in aquaculture laboratories. Designed for phytoplankton concentration, cell separation, water sample clarification and serum preparation. Includes interchangeable rotors and digital speed and time controls.",
      benefits: [
        "High speed up to 15,000 rpm",
        "Interchangeable rotors included",
        "Digital speed and time control",
        "Silent and safe operation",
        "Safety lid with lock",
        "Ideal for aquaculture samples"
      ],
      presentation: [
        "Basic centrifuge: With fixed angle rotor",
        "Professional centrifuge: With multiple rotors",
        "Tube kit: Various volumes",
        "Swing-out rotor: For culture plates",
        "Protocol manual included"
      ],
      specifications: [
        { key: "Maximum speed", value: "15,000 rpm" },
        { key: "Centrifugal force", value: "21,380 x g" },
        { key: "Capacity", value: "24 tubes x 1.5mL" },
        { key: "Time control", value: "1-99 minutes" },
        { key: "Noise level", value: "<58 dB" },
        { key: "Safety", value: "Lid with automatic lock" }
      ]
    },
    pt: {
      name: "Centrífuga para Amostras Biológicas",
      description: "Centrífuga de mesa de alta velocidade para separação de amostras biológicas em laboratórios aquícolas. Projetada para concentração de fitoplâncton, separação de células, clarificação de amostras de água e preparação de soros. Inclui rotores intercambiáveis e controles digitais de velocidade e tempo.",
      benefits: [
        "Alta velocidade até 15.000 rpm",
        "Rotores intercambiáveis incluídos",
        "Controle digital de velocidade e tempo",
        "Operação silenciosa e segura",
        "Tampa de segurança com trava",
        "Ideal para amostras aquícolas"
      ],
      presentation: [
        "Centrífuga básica: Com rotor de ângulo fixo",
        "Centrífuga profissional: Com rotores múltiplos",
        "Kit de tubos: Vários volumes",
        "Rotor swing-out: Para placas de cultivo",
        "Manual de protocolos incluído"
      ],
      specifications: [
        { key: "Velocidade máxima", value: "15.000 rpm" },
        { key: "Força centrífuga", value: "21.380 x g" },
        { key: "Capacidade", value: "24 tubos x 1,5mL" },
        { key: "Controle de tempo", value: "1-99 minutos" },
        { key: "Nível de ruído", value: "<58 dB" },
        { key: "Segurança", value: "Tampa com trava automática" }
      ]
    }
  },

  // Autoclave para Esterilización - EQ035
  "EQ035": {
    es: {
      name: "Medidor de Potasio",
      description: "Medidor portátil japonés de potasio de alta precisión, ideal para laboratorio y campo. Utiliza tecnología de electrodo selectivo de iones, requiere un volumen mínimo de muestra y ofrece lectura rápida, confiable y fácil gracias a su pantalla LCD con retroiluminación. Compacto, liviano y resistente, diseñado para pruebas rápidas en líquidos, suelos o soluciones nutritivas.",
      benefits: [
      "Alta portabilidad y fácil operación en campo o laboratorio.",
      "Requiere una cantidad mínima de muestra para análisis rápidos.",
      "Precisión confiable para decisiones inmediatas en acuicultura, agricultura o control de calidad.",
      "Larga duración de batería y resistente a condiciones adversas."
    ],
      presentation: [
      "Incluye estuche, soluciones de calibración de 150 y 2000 ppm (14 ml c/u), 2 baterías CR2032, 2 jeringas de 2.5 ml y manual de instrucciones."
    ],
      specifications: [
      {
        "key": "Especificación",
        "value": "Características Principales"
      },
      {
        "key": "Especificación",
        "value": "A prueba de agua y polvo (IP67)"
      },
      {
        "key": "Especificación",
        "value": "Resistente a golpes y caídas"
      },
      {
        "key": "Especificación",
        "value": "Lectura directa con muestra mínima (0.3 ml)"
      },
      {
        "key": "Especificación",
        "value": "Calibración sencilla con solo dos botones"
      },
      {
        "key": "Especificación",
        "value": "Pantalla LCD retroiluminada"
      },
      {
        "key": "Especificación",
        "value": "Sensor reemplazable"
      },
      {
        "key": "Especificación",
        "value": "Apagado automático (30 min)"
      },
      {
        "key": "Especificación",
        "value": "Indicador de batería baja"
      },
      {
        "key": "Especificación",
        "value": "Funciones"
      },
      {
        "key": "Especificación",
        "value": "Reconocimiento automático de buffer"
      },
      {
        "key": "Especificación",
        "value": "Compensación automática de temperatura"
      },
      {
        "key": "Especificación",
        "value": "Calibración de temperatura"
      },
      {
        "key": "Especificación",
        "value": "Auto Hold / Estabilización automática"
      },
      {
        "key": "Especificación",
        "value": "Apagado automático"
      },
      {
        "key": "Especificación",
        "value": "Indicador de batería baja"
      },
      {
        "key": "Especificación",
        "value": "Construcción y Alimentación"
      },
      {
        "key": "Material",
        "value": "Carcasa Epoxi ABS, sensor plano"
      },
      {
        "key": "Dimensiones",
        "value": "164 x 29 x 20 mm"
      },
      {
        "key": "Peso",
        "value": "Aprox. 55 g (con sensor y baterías)"
      },
      {
        "key": "Alimentación",
        "value": "2 baterías CR2032"
      },
      {
        "key": "Autonomía",
        "value": "Aprox. 400 h sin retroiluminación"
      }
    ]
    },
    en: {
      name: "Sterilization Autoclave",
      description: "Automatic benchtop autoclave for sterilization of culture media, instruments and laboratory materials in aquaculture facilities. Uses saturated steam under pressure for complete elimination of microorganisms. Includes pre-set programs, drying system and cycle validation to ensure effective sterilization.",
      benefits: [
        "Complete sterilization with saturated steam",
        "Automatic pre-set programs",
        "Integrated drying system",
        "Automatic cycle validation",
        "Stainless steel chamber",
        "Safe operation with multiple sensors"
      ],
      presentation: [
        "18L autoclave: For small laboratories",
        "35L autoclave: For medium laboratories",
        "75L autoclave: For large laboratories",
        "Accessories included: Trays and supports",
        "Validation kit: Biological indicators"
      ],
      specifications: [
        { key: "Chamber volume", value: "18L, 35L, 75L" },
        { key: "Maximum temperature", value: "134°C" },
        { key: "Maximum pressure", value: "2.2 bar" },
        { key: "Cycle time", value: "15-60 minutes" },
        { key: "Drying system", value: "Vacuum pump" },
        { key: "Programs", value: "5 pre-set programs" }
      ]
    },
    pt: {
      name: "Autoclave para Esterilização",
      description: "Autoclave de mesa automática para esterilização de meios de cultivo, instrumentos e materiais de laboratório em instalações aquícolas. Utiliza vapor saturado sob pressão para eliminação completa de microorganismos. Inclui programas pré-estabelecidos, sistema de secagem e validação de ciclos para garantir esterilização efetiva.",
      benefits: [
        "Esterilização completa com vapor saturado",
        "Programas pré-estabelecidos automáticos",
        "Sistema de secagem integrado",
        "Validação automática de ciclos",
        "Câmara de aço inoxidável",
        "Operação segura com múltiplos sensores"
      ],
      presentation: [
        "Autoclave 18L: Para laboratórios pequenos",
        "Autoclave 35L: Para laboratórios médios",
        "Autoclave 75L: Para laboratórios grandes",
        "Acessórios incluídos: Bandejas e suportes",
        "Kit de validação: Indicadores biológicos"
      ],
      specifications: [
        { key: "Volume da câmara", value: "18L, 35L, 75L" },
        { key: "Temperatura máxima", value: "134°C" },
        { key: "Pressão máxima", value: "2,2 bar" },
        { key: "Tempo de ciclo", value: "15-60 minutos" },
        { key: "Sistema de secagem", value: "Bomba de vácuo" },
        { key: "Programas", value: "5 programas pré-estabelecidos" }
      ]
    }
  },

  // Termostato Digital para Acuarios - EQ036
  "EQ036": {
    es: {
      name: "Microscopio",
      description: "Microscopio clínico de la vanguardia 1220CM-BP\nCabeza binocular",
      benefits: [],
      presentation: [],
      specifications: [
      {
        "key": "Tipo",
        "value": "óptico"
      },
      {
        "key": "Ergonomía",
        "value": "monocular"
      },
      {
        "key": "Otras características",
        "value": "LEDAumento: 4X objetivo, 10X, 40X, 100X (aceite)"
      },
      {
        "key": "Tipo objetivo",
        "value": "acromático (estruendo)"
      },
      {
        "key": "Sistema",
        "value": "óptico"
      },
      {
        "key": "Fijado",
        "value": "160 mm"
      },
      {
        "key": "Inclinación de visión",
        "value": "30 °; 360 ° rotativo"
      },
      {
        "key": "Ajuste interpupilar",
        "value": "55-75 milímetro"
      },
      {
        "key": "Ajuste",
        "value": "-5 dióptrico a +5"
      },
      {
        "key": "Especificación",
        "value": "Oculares 10X de campo ancho; 18 mm F.D"
      },
      {
        "key": "Especificación",
        "value": "4-Position; Echada reversa."
      }
    ]
    },
    en: {
      name: "Digital Thermostat for Aquariums",
      description: "Precision digital thermostat for automatic temperature control in culture tanks, laboratories and broodstock maintenance systems. Includes submersible external sensor, digital display, programmable alarms and PID control for exact temperature maintenance. Essential for larval culture systems and sensitive species maintenance.",
      benefits: [
        "Precise temperature control ±0.1°C",
        "High-precision submersible sensor",
        "Audible and visual alarms",
        "PID control for stability",
        "Backlit digital display",
        "Easy programming and operation"
      ],
      presentation: [
        "500W thermostat: For tanks up to 500L",
        "1000W thermostat: For tanks up to 1500L",
        "2000W thermostat: For tanks up to 3000L",
        "Additional sensor: Replacement available",
        "Installation manual included"
      ],
      specifications: [
        { key: "Available power", value: "500W, 1000W, 2000W" },
        { key: "Temperature range", value: "5-40°C" },
        { key: "Accuracy", value: "±0.1°C" },
        { key: "Resolution", value: "0.1°C" },
        { key: "Sensor length", value: "3 meters" },
        { key: "Protection", value: "IP65" }
      ]
    },
    pt: {
      name: "Termostato Digital para Aquários",
      description: "Termostato digital de precisão para controle automático de temperatura em tanques de cultivo, laboratórios e sistemas de manutenção de reprodutores. Inclui sensor externo submersível, display digital, alarmes programáveis e controle PID para manutenção exata de temperatura. Essencial para sistemas de cultivo larval e manutenção de espécies sensíveis.",
      benefits: [
        "Controle preciso de temperatura ±0,1°C",
        "Sensor submersível de alta precisão",
        "Alarmes audíveis e visuais",
        "Controle PID para estabilidade",
        "Display digital retroiluminado",
        "Fácil programação e operação"
      ],
      presentation: [
        "Termostato 500W: Para tanques até 500L",
        "Termostato 1000W: Para tanques até 1500L",
        "Termostato 2000W: Para tanques até 3000L",
        "Sensor adicional: Reposição disponível",
        "Manual de instalação incluído"
      ],
      specifications: [
        { key: "Potência disponível", value: "500W, 1000W, 2000W" },
        { key: "Faixa de temperatura", value: "5-40°C" },
        { key: "Precisão", value: "±0,1°C" },
        { key: "Resolução", value: "0,1°C" },
        { key: "Comprimento do sensor", value: "3 metros" },
        { key: "Proteção", value: "IP65" }
      ]
    }
  },

  // Sistema de Limpieza por Ultrasonido - EQ037
  "EQ037": {
    es: {
      name: "Neon OPTOD",
      description: "Oxímetro portátil de alta precisión para medición de oxígeno disuelto y temperatura en sistemas acuícolas. Utiliza sensor OPTOD con tecnología óptica de luminiscencia, ideal para ambientes de baja circulación. Procesa, registra y transmite datos de manera eficiente con almacenamiento interno de hasta 3000 mediciones.",
      benefits: [
      "Lecturas confiables y precisas incluso en condiciones con baja circulación de agua",
      "Bajo mantenimiento y operación sin consumo de oxígeno",
      "Gestión completa de datos y usuarios directamente desde el sensor",
      "Ideal para mediciones de campo gracias a su portabilidad y autonomía"
    ],
      presentation: [
      "Equipo portátil alimentado con 3 pilas AA. Incluye sensor OPTOD. Datos exportables vía WiFi. No requiere condiciones especiales de almacenamiento."
    ],
      specifications: [
      {
        "key": "Especificación",
        "value": "Características Principales"
      },
      {
        "key": "Especificación",
        "value": "Medición de oxígeno en mg/L, ppm y % de saturación"
      },
      {
        "key": "Especificación",
        "value": "Sensor óptico OPTOD de bajo mantenimiento (cambio cada 2 años)"
      },
      {
        "key": "Especificación",
        "value": "Almacenamiento interno de 3000 registros, descarga por WiFi"
      },
      {
        "key": "Especificación",
        "value": "Apagado automático, zoom, y visualización avanzada"
      },
      {
        "key": "Especificación",
        "value": "Datos Técnicos"
      },
      {
        "key": "Rango de oxígeno",
        "value": "0,00 – 20,00 mg/L / 0 – 200 %"
      },
      {
        "key": "Resolución",
        "value": "0,01"
      },
      {
        "key": "Precisión",
        "value": "±0,1 mg/L, ±0,1 %, ±0,5 °C"
      },
      {
        "key": "Compensaciones",
        "value": "Barométrica (auto), Salinidad (manual), Temperatura (auto)"
      }
    ]
    },
    en: {
      name: "Ultrasonic Cleaning System",
      description: "Professional ultrasonic cleaner for deep cleaning of instruments, equipment and aquaculture laboratory materials. Uses high-frequency ultrasonic waves for effective removal of contaminants, algae, biofilm and organic residues. Includes time, temperature and frequency control for different cleaning types.",
      benefits: [
        "Deep cleaning without aggressive chemicals",
        "Effective removal of biofilm and algae",
        "Time and temperature control",
        "Multiple cleaning frequencies",
        "Silent and safe operation",
        "Stainless steel basket included"
      ],
      presentation: [
        "3L cleaner: For small instruments",
        "10L cleaner: For medium equipment",
        "30L cleaner: For large equipment",
        "Additional baskets: Various sizes",
        "Biodegradable cleaning solution"
      ],
      specifications: [
        { key: "Tank volume", value: "3L, 10L, 30L" },
        { key: "Ultrasonic frequency", value: "25, 40, 80 kHz" },
        { key: "Ultrasonic power", value: "120-600W" },
        { key: "Temperature control", value: "Ambient-80°C" },
        { key: "Timer", value: "1-99 minutes" },
        { key: "Tank material", value: "316 stainless steel" }
      ]
    },
    pt: {
      name: "Sistema de Limpeza por Ultrassom",
      description: "Limpador ultrassônico profissional para limpeza profunda de instrumentos, equipamentos e materiais de laboratório aquícola. Utiliza ondas ultrassônicas de alta frequência para remoção efetiva de contaminantes, algas, biofilme e resíduos orgânicos. Inclui controle de tempo, temperatura e frequência para diferentes tipos de limpeza.",
      benefits: [
        "Limpeza profunda sem químicos agressivos",
        "Remoção efetiva de biofilme e algas",
        "Controle de tempo e temperatura",
        "Múltiplas frequências de limpeza",
        "Operação silenciosa e segura",
        "Cesta de aço inoxidável incluída"
      ],
      presentation: [
        "Limpador 3L: Para instrumentos pequenos",
        "Limpador 10L: Para equipamentos médios",
        "Limpador 30L: Para equipamentos grandes",
        "Cestas adicionais: Vários tamanhos",
        "Solução de limpeza biodegradável"
      ],
      specifications: [
        { key: "Volume do tanque", value: "3L, 10L, 30L" },
        { key: "Frequência ultrassônica", value: "25, 40, 80 kHz" },
        { key: "Potência ultrassônica", value: "120-600W" },
        { key: "Controle de temperatura", value: "Ambiente-80°C" },
        { key: "Timer", value: "1-99 minutos" },
        { key: "Material do tanque", value: "Aço inoxidável 316" }
      ]
    }
  },

  // Bomba Peristáltica Multicanal - EQ038
  "EQ038": {
    es: {
      name: "Oxigenómetro - Disuelto DO -120",
      description: "Oxigenómetro portátil japonés de alta precisión para mediciones de oxígeno disuelto y temperatura en campo. Equipado con sensor galvánico y carcasa resistente a caídas, polvo y agua (IP67), flota en el agua y permite lecturas en entornos exigentes. Ideal para acuicultura gracias a su durabilidad, amplio rango de medición y capacidad de almacenamiento de datos con registro de hora y fecha.",
      benefits: [
      "Ideal para trabajos prolongados en campo por su resistencia y duración de batería",
      "Alta precisión y confiabilidad en condiciones extremas",
      "Capacidad de registrar y exportar datos con sello de fecha y hora",
      "Fácil lectura y uso incluso en entornos oscuros o húmedos"
    ],
      presentation: [
      "Kit incluye medidor DO120, sensor galvánico 9551-20D con cable de 2 m. No requiere condiciones especiales de almacenamiento ni refrigeración."
    ],
      specifications: [
      {
        "key": "Especificación",
        "value": "Características Principales"
      },
      {
        "key": "Especificación",
        "value": "A prueba de agua y polvo (IP67)"
      },
      {
        "key": "Especificación",
        "value": "Resistente a caídas, flota en agua"
      },
      {
        "key": "Especificación",
        "value": "Pantalla LCD retroiluminada"
      },
      {
        "key": "Especificación",
        "value": "Registro de datos con fecha y hora"
      },
      {
        "key": "Especificación",
        "value": "Auto-hold y mensajes de diagnóstico"
      },
      {
        "key": "Especificación",
        "value": "Apagado automático programable (1 a 30 min)"
      },
      {
        "key": "Especificación",
        "value": "Compatible con laptops vía salida RS232C"
      },
      {
        "key": "Especificación",
        "value": "Memoria de hasta 1000 lecturas"
      },
      {
        "key": "Especificación",
        "value": "Datos Técnicos"
      },
      {
        "key": "Rango oxígeno disuelto",
        "value": "0.0 – 20.00 mg/L (0.0 – 200.0%)"
      },
      {
        "key": "Resolución oxígeno",
        "value": "0.01 mg/L o 0.1%"
      },
      {
        "key": "Precisión oxígeno",
        "value": "±0.1 mg/L"
      },
      {
        "key": "Rango de temperatura",
        "value": "-30.0 °C a 130.0 °C"
      },
      {
        "key": "Resolución temperatura",
        "value": "0.1 °C"
      },
      {
        "key": "Precisión temperatura",
        "value": "±0.4 °C"
      },
      {
        "key": "Compensación salinidad",
        "value": "0 – 40 ppt"
      },
      {
        "key": "Compensación barométrica",
        "value": "Sí"
      },
      {
        "key": "Calibración",
        "value": "1 o 2 puntos"
      },
      {
        "key": "Sensor",
        "value": "Galvánico con sensor de temperatura integrado"
      },
      {
        "key": "Salida de datos",
        "value": "RS232C"
      },
      {
        "key": "Conectores",
        "value": "BNC y jack tipo phono"
      },
      {
        "key": "Especificación",
        "value": "Alimentación y Autonomía"
      },
      {
        "key": "Especificación",
        "value": "2 baterías AAA (LR03), Ni-H recargables o adaptador"
      },
      {
        "key": "Duración batería",
        "value": "> 500 horas"
      }
    ]
    },
    en: {
      name: "Multi-Channel Peristaltic Pump",
      description: "Precision multi-channel peristaltic pump for simultaneous dosing of different solutions in aquaculture systems. Ideal for automatic application of probiotics, nutrients, medications and additives. Each channel is independent with individual flow control and schedule programming.",
      benefits: [
        "Simultaneous dosing of multiple products",
        "Independent control per channel",
        "Exceptional precision ±1%",
        "Easy tube change without contamination",
        "Automatic schedule programming",
        "Continuous 24/7 operation"
      ],
      presentation: [
        "4-channel pump: For basic systems",
        "8-channel pump: For advanced systems",
        "16-channel pump: For industrial systems",
        "Replacement tubes: Various diameters",
        "Control software included"
      ],
      specifications: [
        { key: "Number of channels", value: "4, 8, 16" },
        { key: "Flow per channel", value: "0.1-100 mL/min" },
        { key: "Accuracy", value: "±1%" },
        { key: "Maximum pressure", value: "2 bar" },
        { key: "Compatible tubes", value: "Silicone, PVC, Tygon" },
        { key: "Control", value: "Digital with LCD display" }
      ]
    },
    pt: {
      name: "Bomba Peristáltica Multicanal",
      description: "Bomba peristáltica de precisão com múltiplos canais para dosagem simultânea de diferentes soluções em sistemas aquícolas. Ideal para aplicação automática de probióticos, nutrientes, medicamentos e aditivos. Cada canal é independente com controle individual de fluxo e programação de horários.",
      benefits: [
        "Dosagem simultânea de múltiplos produtos",
        "Controle independente por canal",
        "Precisão excepcional ±1%",
        "Fácil troca de tubos sem contaminação",
        "Programação de horários automática",
        "Operação contínua 24/7"
      ],
      presentation: [
        "Bomba 4 canais: Para sistemas básicos",
        "Bomba 8 canais: Para sistemas avançados",
        "Bomba 16 canais: Para sistemas industriais",
        "Tubos de reposição: Vários diâmetros",
        "Software de controle incluído"
      ],
      specifications: [
        { key: "Número de canais", value: "4, 8, 16" },
        { key: "Vazão por canal", value: "0,1-100 mL/min" },
        { key: "Precisão", value: "±1%" },
        { key: "Pressão máxima", value: "2 bar" },
        { key: "Tubos compatíveis", value: "Silicone, PVC, Tygon" },
        { key: "Controle", value: "Digital com display LCD" }
      ]
    }
  },

  // Homogeneizador de Alta Velocidad - EQ039
  "EQ039": {
    es: {
      name: "Oxigenómetro - Oakton 260",
      description: "Medidor portátil de oxígeno disuelto y temperatura, diseñado con una carcasa robusta, antideslizante y resistente al agua (IP67), polvo e impactos. Su diseño ergonómico, interfaz intuitiva y funciones avanzadas lo convierten en una herramienta confiable para monitoreo en campo o laboratorio.",
      benefits: [
      "Mide con precisión parámetros esenciales como OD y temperatura",
      "Ideal para condiciones exigentes de campo y laboratorio",
      "Permite trazabilidad de datos con su función de registro digital",
      "Fácil de usar, transportar y configurar"
    ],
      presentation: [
      "Equipo portátil con cable de 2 m, portaelectrodos y soporte plegable. No requiere refrigeración ni almacenamiento especial."
    ],
      specifications: [
      {
        "key": "Especificación",
        "value": "Características Principales"
      },
      {
        "key": "Especificación",
        "value": "Carcasa antideslizante y resistente (IP67)"
      },
      {
        "key": "Especificación",
        "value": "Pantalla LCD monocromática con retroiluminación"
      },
      {
        "key": "Especificación",
        "value": "Registro de hasta 1000 datos"
      },
      {
        "key": "Especificación",
        "value": "Conectividad USB y RS-232"
      },
      {
        "key": "Especificación",
        "value": "Datos Técnicos"
      },
      {
        "key": "Oxígeno disuelto",
        "value": "0–20 mg/L, precisión ±0.1 mg/L"
      },
      {
        "key": "Temperatura",
        "value": "-30 a 130 °C, precisión ±0.5 °C"
      },
      {
        "key": "Resolución",
        "value": "0.01 mg/L y 0.1 °C"
      },
      {
        "key": "Alimentación",
        "value": "2 baterías AA"
      }
    ]
    },
    en: {
      name: "High-Speed Homogenizer",
      description: "High-speed homogenizer for sample preparation, emulsions and suspensions in aquaculture laboratories. Especially useful for food homogenization, probiotic suspension preparation and biological sample processing. Includes multiple heads for different applications.",
      benefits: [
        "Fast and efficient homogenization",
        "Multiple interchangeable heads",
        "Variable speed control",
        "Ergonomic and silent design",
        "Easy cleaning and sterilization",
        "Ideal for biological samples"
      ],
      presentation: [
        "Basic homogenizer: With standard head",
        "Complete kit: With multiple heads",
        "Additional heads: For different volumes",
        "Table stand: For hands-free operation",
        "Protocol manual included"
      ],
      specifications: [
        { key: "Maximum speed", value: "30,000 rpm" },
        { key: "Processing volume", value: "0.1-2000 mL" },
        { key: "Speed control", value: "Variable 1,000-30,000 rpm" },
        { key: "Heads included", value: "3-7 mm diameter" },
        { key: "Material", value: "316 stainless steel" },
        { key: "Noise level", value: "<60 dB" }
      ]
    },
    pt: {
      name: "Homogeneizador de Alta Velocidade",
      description: "Homogeneizador de alta velocidade para preparação de amostras, emulsões e suspensões em laboratórios aquícolas. Especialmente útil para homogeneização de alimentos, preparação de probióticos em suspensão e processamento de amostras biológicas. Inclui múltiplas cabeças para diferentes aplicações.",
      benefits: [
        "Homogeneização rápida e eficiente",
        "Múltiplas cabeças intercambiáveis",
        "Controle de velocidade variável",
        "Design ergonômico e silencioso",
        "Fácil limpeza e esterilização",
        "Ideal para amostras biológicas"
      ],
      presentation: [
        "Homogeneizador básico: Com cabeça padrão",
        "Kit completo: Com múltiplas cabeças",
        "Cabeças adicionais: Para diferentes volumes",
        "Suporte de mesa: Para operação mãos livres",
        "Manual de protocolos incluído"
      ],
      specifications: [
        { key: "Velocidade máxima", value: "30.000 rpm" },
        { key: "Volume de processamento", value: "0,1-2000 mL" },
        { key: "Controle de velocidade", value: "Variável 1.000-30.000 rpm" },
        { key: "Cabeças incluídas", value: "3-7 mm diâmetro" },
        { key: "Material", value: "Aço inoxidável 316" },
        { key: "Nível de ruído", value: "<60 dB" }
      ]
    }
  },

  // Dispensador Automático de Medios - EQ040
  "EQ040": {
    es: {
      name: "Oxigenómetro OxyGuard Polaris C",
      description: "Oxímetro portátil de campo con sonda galvánica que permite medir oxígeno disuelto (en mg/L y % de saturación), temperatura y compensación de salinidad. Diseñado para ambientes exigentes, ofrece gran autonomía, pantalla retroiluminada y calibración automática con ajuste a presión barométrica.",
      benefits: [
      "Equipamiento confiable para uso en campo y ambientes de cultivo exigentes",
      "Lecturas precisas gracias a su compensación barométrica y de temperatura",
      "Alta autonomía y facilidad de transporte para jornadas prolongadas",
      "Calibración automática que simplifica el manejo y reduce errores"
    ],
      presentation: [
      "Dispositivo portátil con sonda galvánica, clip desmontable, batería de 9V, membrana y solución electrolítica. No requiere condiciones especiales de almacenamiento."
    ],
      specifications: [
      {
        "key": "Especificación",
        "value": "Características Principales"
      },
      {
        "key": "Especificación",
        "value": "Medición de oxígeno (ppm / % saturación) y temperatura"
      },
      {
        "key": "Especificación",
        "value": "Calibración automática con verificación de estabilidad"
      },
      {
        "key": "Especificación",
        "value": "Compensación automática de temperatura y presión atmosférica"
      },
      {
        "key": "Especificación",
        "value": "Apagado automático para ahorro de energía"
      },
      {
        "key": "Especificación",
        "value": "Pantalla amplia con retroiluminación"
      },
      {
        "key": "Especificación",
        "value": "Incluye clip desmontable para sujetar al cinturón o portapapeles"
      },
      {
        "key": "Especificación",
        "value": "Opera hasta los 4000 msnm"
      },
      {
        "key": "Especificación",
        "value": "Batería de 9V con duración de hasta 1.400 horas"
      },
      {
        "key": "Especificación",
        "value": "Incluye membrana y solución estándar (electrolito)"
      },
      {
        "key": "Especificación",
        "value": "Datos Técnicos"
      },
      {
        "key": "Rango de oxígeno",
        "value": "0 – 60 ppm"
      },
      {
        "key": "Rango de temperatura",
        "value": "-5 °C a +45 °C"
      },
      {
        "key": "Longitud del cable",
        "value": "3 m y 8 m disponibles"
      }
    ]
    },
    en: {
      name: "Automatic Media Dispenser",
      description: "High-precision automatic dispenser for distribution of culture media, solutions and reagents in Petri dishes and test tubes. Essential for aquaculture microbiology laboratories and bacterial culture preparation. Includes programmable volume control and anti-drip system for maximum precision.",
      benefits: [
        "Precise and repeatable dispensing",
        "Programmable volume control",
        "Integrated anti-drip system",
        "Fast and efficient operation",
        "Easy calibration and cleaning",
        "Ideal for culture media"
      ],
      presentation: [
        "50mL dispenser: For small volumes",
        "250mL dispenser: For routine use",
        "1000mL dispenser: For large volumes",
        "Tube kit: Various diameters",
        "Adjustable table stand"
      ],
      specifications: [
        { key: "Reservoir capacity", value: "50mL, 250mL, 1000mL" },
        { key: "Dispensing volume", value: "0.1-50 mL" },
        { key: "Accuracy", value: "±1%" },
        { key: "Dispensing speed", value: "Adjustable" },
        { key: "Contact material", value: "Borosilicate and PTFE" },
        { key: "Sterilization", value: "Autoclavable" }
      ]
    },
    pt: {
      name: "Dispensador Automático de Meios",
      description: "Dispensador automático de alta precisão para distribuição de meios de cultivo, soluções e reagentes em placas de Petri e tubos de ensaio. Essencial para laboratórios de microbiologia aquícola e preparação de cultivos bacterianos. Inclui controle de volume programável e sistema anti-gotejamento para máxima precisão.",
      benefits: [
        "Dispensação precisa e repetível",
        "Controle de volume programável",
        "Sistema anti-gotejamento integrado",
        "Operação rápida e eficiente",
        "Fácil calibração e limpeza",
        "Ideal para meios de cultivo"
      ],
      presentation: [
        "Dispensador 50mL: Para volumes pequenos",
        "Dispensador 250mL: Para uso rotineiro",
        "Dispensador 1000mL: Para grandes volumes",
        "Kit de tubos: Vários diâmetros",
        "Suporte de mesa ajustável"
      ],
      specifications: [
        { key: "Capacidade do reservatório", value: "50mL, 250mL, 1000mL" },
        { key: "Volume de dispensação", value: "0,1-50 mL" },
        { key: "Precisão", value: "±1%" },
        { key: "Velocidade de dispensação", value: "Ajustável" },
        { key: "Material de contato", value: "Borossilicato e PTFE" },
        { key: "Esterilização", value: "Autoclavável" }
      ]
    }
  },

  // Medidor de Cloro Residual Digital - EQ041
  "EQ041": {
    es: {
      name: "Piedras Difusoras",
      description: "Los difusores de aire son ideales para producir una emisión homogénea de\npequeñas burbujas en su acuario de agua dulce o salada. Con estos difusores\npodrá crear columnas de burbujas sin necesitar una gran presión por parte de la\nbomba de aire, gracias a su estructura cerámica muy porosa. Estos difusores son\nimprescindibles en todo acuario debido a la gran amplitud de funciones que puede\ndesempeñar.",
      benefits: [
      "Todos los modelos de difusores cerámicos",
      "presentan flotabilidad negativa. Esto es una gran ventaja a la hora de mantenerlos",
      "en el fondo del acuario sin la necesidad de usar un lastre."
    ],
      presentation: [
      "Piedras difusoras AS15S",
      "Piedras difusoras AS3 (5x2.5x4)",
      "Piedras difusoras AS8L (8x4x4)",
      "Bubblemac Barb #0020",
      "Bubblemac Barb #0030",
      "Bubblemac Barb #0020F"
    ],
      specifications: [
      {
        "key": "Especificación",
        "value": "Está fabricado con polímeros plásticos y cerámica de alta calidad y"
      },
      {
        "key": "Especificación",
        "value": "durabilidad."
      },
      {
        "key": "Especificación",
        "value": "Químicamente inertes al agua."
      },
      {
        "key": "Especificación",
        "value": "Esta línea ofrece tres modelos rectangulares para adaptarse a las"
      },
      {
        "key": "Especificación",
        "value": "necesidades puntuales de cada aplicación."
      },
      {
        "key": "Especificación",
        "value": "Su conexión es de diámetro standard para manguera de 4/6 milímetros."
      }
    ]
    },
    en: {
      name: "Digital Residual Chlorine Meter",
      description: "Portable digital meter for precise determination of free and total chlorine in water treatment systems for aquaculture. Uses DPD colorimetric method with automatic temperature compensation. Essential for disinfection monitoring, inlet water quality control and treatment system verification.",
      benefits: [
        "Precise measurement of free and total chlorine",
        "Standard DPD colorimetric method",
        "Automatic temperature compensation",
        "Easy-to-read digital display",
        "Portable for field measurements",
        "Reagents included for 100 analyses"
      ],
      presentation: [
        "Basic meter: Free chlorine only",
        "Complete meter: Free and total chlorine",
        "Reagent kit: DPD1 and DPD3",
        "Replacement cuvettes: Pack of 6 units",
        "Rugged transport case"
      ],
      specifications: [
        { key: "Free chlorine range", value: "0.00-5.00 mg/L" },
        { key: "Total chlorine range", value: "0.00-5.00 mg/L" },
        { key: "Accuracy", value: "±0.01 mg/L" },
        { key: "Method", value: "DPD colorimetric" },
        { key: "Temperature compensation", value: "Automatic" },
        { key: "Protection", value: "IP67" }
      ]
    },
    pt: {
      name: "Medidor de Cloro Residual Digital",
      description: "Medidor digital portátil para determinação precisa de cloro livre e total em sistemas de tratamento de água para aquicultura. Utiliza método colorimétrico DPD com compensação automática de temperatura. Essencial para monitoramento de desinfecção, controle de qualidade da água de entrada e verificação de sistemas de tratamento.",
      benefits: [
        "Medição precisa de cloro livre e total",
        "Método colorimétrico DPD padrão",
        "Compensação automática de temperatura",
        "Display digital de fácil leitura",
        "Portátil para medições em campo",
        "Reagentes incluídos para 100 análises"
      ],
      presentation: [
        "Medidor básico: Cloro livre apenas",
        "Medidor completo: Cloro livre e total",
        "Kit de reagentes: DPD1 e DPD3",
        "Cubetas de reposição: Pacote de 6 unidades",
        "Estojo de transporte resistente"
      ],
      specifications: [
        { key: "Faixa cloro livre", value: "0,00-5,00 mg/L" },
        { key: "Faixa cloro total", value: "0,00-5,00 mg/L" },
        { key: "Precisão", value: "±0,01 mg/L" },
        { key: "Método", value: "Colorimétrico DPD" },
        { key: "Compensação de temperatura", value: "Automática" },
        { key: "Proteção", value: "IP67" }
      ]
    }
  },

  // Sistema de Monitoreo Remoto IoT - EQ042
  "EQ042": {
    es: {
      name: "Salinómetro -11",
      description: "Salinómetro portátil de alta precisión con sensor plano, ideal para mediciones rápidas y confiables de salinidad en agua de mar, soluciones nutritivas y muestras de laboratorio o campo. Diseñado con materiales resistentes, pantalla retroiluminada y tecnología de medición con electrodos bipolares, este equipo requiere solo una pequeña cantidad de muestra y ofrece lecturas claras, estables y automáticas.",
      benefits: [
      "Ideal para mediciones rápidas y precisas con muy poco volumen de muestra.",
      "Apto para condiciones de campo exigentes gracias a su resistencia al agua, polvo y golpes.",
      "Calibración y operación sencillas, incluso para personal no técnico.",
      "Alta portabilidad, ideal para monitoreo directo de salinidad en acuicultura, alimentos, aguas residuales y más."
    ],
      presentation: [
      "Soluciones de calibración a 0.5% y 5.0% (14 ml c/u)",
      "Solución de tratamiento de electrodo (4 ml)",
      "2 baterías CR2032",
      "Pipeta",
      "Manual de instrucciones",
      "Estuche portátil"
    ],
      specifications: [
      {
        "key": "Especificación",
        "value": "Características Principales"
      },
      {
        "key": "Especificación",
        "value": "A prueba de agua y polvo (IP67)"
      },
      {
        "key": "Especificación",
        "value": "Resistente a golpes"
      },
      {
        "key": "Especificación",
        "value": "Pantalla LCD monocromática con retroiluminación"
      },
      {
        "key": "Especificación",
        "value": "Sensor plano reemplazable"
      },
      {
        "key": "Especificación",
        "value": "Auto Hold y Auto Estable"
      },
      {
        "key": "Especificación",
        "value": "Apagado automático (30 min)"
      },
      {
        "key": "Especificación",
        "value": "Indicador de batería baja"
      },
      {
        "key": "Especificación",
        "value": "Reconocimiento automático de buffer"
      },
      {
        "key": "Especificación",
        "value": "Calibración automática de temperatura"
      },
      {
        "key": "Especificación",
        "value": "Sensor robusto ideal para campo y laboratorio. Construcción y Alimentación"
      },
      {
        "key": "Material",
        "value": "Carcasa de Epoxi ABS / Sensor plano"
      },
      {
        "key": "Dimensiones",
        "value": "164 × 29 × 20 mm"
      },
      {
        "key": "Peso",
        "value": "Aprox. 50 g (incluyendo baterías)"
      },
      {
        "key": "Alimentación",
        "value": "2 baterías CR2032"
      },
      {
        "key": "Duración",
        "value": "Aprox. 400 horas de uso continuo sin retroiluminación"
      }
    ]
    },
    en: {
      name: "IoT Remote Monitoring System",
      description: "Comprehensive IoT-based remote monitoring system for continuous tracking of critical parameters in aquaculture farms. Includes wireless sensors, communications gateway, cloud platform and mobile application. Enables 24/7 supervision, automatic alerts and historical data analysis for production optimization.",
      benefits: [
        "24/7 remote monitoring via internet",
        "Long-range wireless sensors",
        "Automatic alerts by SMS and email",
        "Cloud platform with data analytics",
        "iOS and Android mobile app",
        "Simple installation without cables"
      ],
      presentation: [
        "Basic kit: 4 sensors + gateway",
        "Professional kit: 8 sensors + gateway",
        "Industrial kit: 16 sensors + gateway",
        "Additional sensors: Available separately",
        "Cloud subscription: 1 year included"
      ],
      specifications: [
        { key: "Included sensors", value: "Temperature, pH, DO, Salinity" },
        { key: "Wireless range", value: "Up to 2 km" },
        { key: "Battery autonomy", value: "12 months" },
        { key: "Connectivity", value: "LoRaWAN, 4G, WiFi" },
        { key: "Platform", value: "Cloud with API" },
        { key: "Data frequency", value: "Configurable 1-60 min" }
      ]
    },
    pt: {
      name: "Sistema de Monitoramento Remoto IoT",
      description: "Sistema integral de monitoramento remoto baseado em IoT para acompanhamento contínuo de parâmetros críticos em fazendas aquícolas. Inclui sensores sem fio, gateway de comunicações, plataforma cloud e aplicativo móvel. Permite supervisão 24/7, alertas automáticos e análise de dados históricos para otimização de produção.",
      benefits: [
        "Monitoramento remoto 24/7 via internet",
        "Sensores sem fio de longo alcance",
        "Alertas automáticos por SMS e email",
        "Plataforma cloud com análise de dados",
        "Aplicativo móvel iOS e Android",
        "Instalação simples sem cabos"
      ],
      presentation: [
        "Kit básico: 4 sensores + gateway",
        "Kit profissional: 8 sensores + gateway",
        "Kit industrial: 16 sensores + gateway",
        "Sensores adicionais: Disponíveis separadamente",
        "Assinatura cloud: 1 ano incluído"
      ],
      specifications: [
        { key: "Sensores incluídos", value: "Temperatura, pH, OD, Salinidade" },
        { key: "Alcance sem fio", value: "Até 2 km" },
        { key: "Autonomia da bateria", value: "12 meses" },
        { key: "Conectividade", value: "LoRaWAN, 4G, WiFi" },
        { key: "Plataforma", value: "Cloud com API" },
        { key: "Frequência de dados", value: "Configurável 1-60 min" }
      ]
    }
  },

  // Liofilizador de Sobremesa - EQ043
  "EQ043": {
    es: {
      name: "Salinómetro Vee Gee STX-3",
      description: "Refractómetro manual de alta precisión diseñado para medir la concentración de sal (ppt) y la gravedad específica (GE) en agua de mar. Fabricado con materiales resistentes y equipado con compensación automática de temperatura (ATC), ofrece lecturas estables y exactas sin necesidad de alimentación eléctrica. Ideal para aplicaciones en acuicultura, laboratorios, industria alimentaria y campo.",
      benefits: [
      "Precisión inmediata sin necesidad de energía eléctrica.",
      "Alta durabilidad y portabilidad para uso en campo o laboratorio.",
      "Medición estable gracias a su diseño ergonómico y protección térmica.",
      "Ideal para monitoreo de salinidad en acuicultura, acuarios marinos, alimentos y más."
    ],
      presentation: [
      "Equipo portátil.No requiere condiciones especiales de almacenamiento."
    ],
      specifications: [
      {
        "key": "Rango de medición",
        "value": ""
      },
      {
        "key": "Salinidad",
        "value": "0 a 100 ppt (partes por mil)"
      },
      {
        "key": "Gravedad específica",
        "value": "1.000 a 1.070"
      },
      {
        "key": "Compensación de temperatura",
        "value": ""
      },
      {
        "key": "Especificación",
        "value": "Automática (ATC), permite lecturas precisas sin importar la temperatura ambiente"
      },
      {
        "key": "Material y diseño",
        "value": ""
      },
      {
        "key": "Especificación",
        "value": "Prisma de vidrio óptico en carcasa metálica"
      },
      {
        "key": "Especificación",
        "value": "Cuerpo de metal duradero con recubrimiento exterior de caucho"
      },
      {
        "key": "Especificación",
        "value": "Empuñadura de goma que protege contra el calor de la mano y asegura mediciones estables"
      },
      {
        "key": "Especificación",
        "value": "Diseño tipo telescopio aerodinámico"
      },
      {
        "key": "Dimensiones",
        "value": "40 × 40 × 185 mm"
      }
    ]
    },
    en: {
      name: "Benchtop Freeze Dryer",
      description: "Compact benchtop freeze dryer for preservation of biological samples, microbial cultures and biotechnological products in aquaculture laboratories. Uses sublimation technology for low-temperature dehydration preserving structure and viability of materials. Essential for bacterial strain and probiotic conservation.",
      benefits: [
        "Preservation without structural damage",
        "Conservation of biological viability",
        "Complete automated process",
        "Long-term storage",
        "Temperature and vacuum control",
        "Compact design for laboratory"
      ],
      presentation: [
        "2.5L freeze dryer: For small samples",
        "4.5L freeze dryer: For routine use",
        "Vial kit: Different sizes",
        "Vacuum pump: Included",
        "Specific protocol manual"
      ],
      specifications: [
        { key: "Chamber capacity", value: "2.5L, 4.5L" },
        { key: "Minimum temperature", value: "-55°C" },
        { key: "Vacuum", value: "0.1 mbar" },
        { key: "Condenser capacity", value: "3-6 kg ice" },
        { key: "Cycle time", value: "12-48 hours" },
        { key: "Control", value: "Automatic with display" }
      ]
    },
    pt: {
      name: "Liofilizador de Bancada",
      description: "Liofilizador de bancada compacto para preservação de amostras biológicas, cultivos microbianos e produtos biotecnológicos em laboratórios aquícolas. Utiliza tecnologia de sublimação para desidratação a baixa temperatura preservando a estrutura e viabilidade dos materiais. Essencial para conservação de cepas bacterianas e probióticos.",
      benefits: [
        "Preservação sem dano estrutural",
        "Conservação de viabilidade biológica",
        "Processo automatizado completo",
        "Armazenamento a longo prazo",
        "Controle de temperatura e vácuo",
        "Design compacto para laboratório"
      ],
      presentation: [
        "Liofilizador 2,5L: Para amostras pequenas",
        "Liofilizador 4,5L: Para uso rotineiro",
        "Kit de frascos: Diferentes tamanhos",
        "Bomba de vácuo: Incluída",
        "Manual de protocolos específicos"
      ],
      specifications: [
        { key: "Capacidade da câmara", value: "2,5L, 4,5L" },
        { key: "Temperatura mínima", value: "-55°C" },
        { key: "Vácuo", value: "0,1 mbar" },
        { key: "Capacidade do condensador", value: "3-6 kg gelo" },
        { key: "Tempo de ciclo", value: "12-48 horas" },
        { key: "Controle", value: "Automático com display" }
      ]
    }
  },

  // Cámara de Flujo Laminar - EQ044
  "EQ044": {
    es: {
      name: "Smart Spectro",
      description: "Un espectrofotómetro fácil de usar y preciso. Con selección automática de\nlongitudes de onda, pruebas preprogramadas y un rendimiento superior.",
      benefits: [],
      presentation: [],
      specifications: []
    },
    en: {
      name: "Laminar Flow Chamber",
      description: "Horizontal laminar flow chamber for sterile work in aquaculture microbiology laboratories. Provides particle-free environment for microbial culture manipulation, sterile media preparation and aseptic transfers. Includes HEPA filter, UV lighting and stainless steel work surface.",
      benefits: [
        "Completely sterile work environment",
        "High-efficiency HEPA filtration",
        "Uniform horizontal laminar flow",
        "Stainless steel surface",
        "Germicidal UV lighting",
        "Silent and safe operation"
      ],
      presentation: [
        "90cm chamber: For individual work",
        "120cm chamber: For standard work",
        "150cm chamber: For multiple work",
        "Replacement HEPA filter",
        "Accessory kit included"
      ],
      specifications: [
        { key: "Work width", value: "90cm, 120cm, 150cm" },
        { key: "Flow velocity", value: "0.45 m/s ±20%" },
        { key: "Filtration", value: "HEPA 99.99%" },
        { key: "Noise level", value: "<65 dB" },
        { key: "Lighting", value: "LED + germicidal UV" },
        { key: "Material", value: "304 stainless steel" }
      ]
    },
    pt: {
      name: "Câmara de Fluxo Laminar",
      description: "Câmara de fluxo laminar horizontal para trabalho estéril em laboratórios de microbiologia aquícola. Proporciona ambiente livre de partículas para manipulação de cultivos microbianos, preparação de meios estéreis e transferências assépticas. Inclui filtro HEPA, iluminação UV e superfície de trabalho de aço inoxidável.",
      benefits: [
        "Ambiente de trabalho completamente estéril",
        "Filtração HEPA de alta eficiência",
        "Fluxo laminar horizontal uniforme",
        "Superfície de aço inoxidável",
        "Iluminação UV germicida",
        "Operação silenciosa e segura"
      ],
      presentation: [
        "Câmara 90cm: Para trabalho individual",
        "Câmara 120cm: Para trabalho padrão",
        "Câmara 150cm: Para trabalho múltiplo",
        "Filtro HEPA de reposição",
        "Kit de acessórios incluído"
      ],
      specifications: [
        { key: "Largura de trabalho", value: "90cm, 120cm, 150cm" },
        { key: "Velocidade do fluxo", value: "0,45 m/s ±20%" },
        { key: "Filtração", value: "HEPA 99,99%" },
        { key: "Nível de ruído", value: "<65 dB" },
        { key: "Iluminação", value: "LED + UV germicida" },
        { key: "Material", value: "Aço inoxidável 304" }
      ]
    }
  },

  // Termómetro - EQ045
  "EQ045": {
    es: {
      name: "Termómetro",
      description: "",
      benefits: [],
      presentation: [],
      specifications: [
      {
        "key": "Color",
        "value": "amarillo"
      },
      {
        "key": "Material",
        "value": "vidrio"
      },
      {
        "key": "Tamaño",
        "value": "150 * 30 * 2mm"
      }
    ]
    },
    en: {
      name: "Thermometer",
      description: "",
      benefits: [],
      presentation: [],
      specifications: [
        { key: "Color", value: "yellow" },
        { key: "Material", value: "glass" },
        { key: "Size", value: "150 * 30 * 2mm" }
      ]
    },
    pt: {
      name: "Termômetro",
      description: "",
      benefits: [],
      presentation: [],
      specifications: [
        { key: "Cor", value: "amarelo" },
        { key: "Material", value: "vidro" },
        { key: "Tamanho", value: "150 * 30 * 2mm" }
      ]
    }
  },

  // Concentrador de Muestras por Centrifugación - EQ046
  "EQ046": {
    es: {
      name: "Tirillas pH",
      description: "",
      benefits: [],
      presentation: [
      "Rango pH: 4.5 - 10.0",
      "Envase de plástico."
    ],
      specifications: []
    },
    en: {
      name: "Sample Concentrator by Centrifugation",
      description: "High-speed centrifugal concentrator for rapid concentration of microorganisms, cells and suspended particles. Ideal for concentration of phytoplankton, bacteria and other aquatic microorganisms. Includes fixed angle and swing-out rotors for different applications. Silent operation with advanced safety system.",
      benefits: [
        "Rapid concentration of microorganisms",
        "Interchangeable rotors included",
        "Silent operation <50 dB",
        "Advanced safety system",
        "Digital parameter control",
        "Ideal for aquatic samples"
      ],
      presentation: [
        "4,000 rpm concentrator: For delicate samples",
        "10,000 rpm concentrator: For general use",
        "15,000 rpm concentrator: For high speed",
        "Additional rotors: Different capacities",
        "Concentration tubes included"
      ],
      specifications: [
        { key: "Maximum speed", value: "4,000-15,000 rpm" },
        { key: "Centrifugal force", value: "Up to 25,000 x g" },
        { key: "Capacity", value: "6-24 tubes" },
        { key: "Tube volume", value: "0.5-50 mL" },
        { key: "Noise level", value: "<50 dB" },
        { key: "Timer", value: "1-99 minutes" }
      ]
    },
    pt: {
      name: "Concentrador de Amostras por Centrifugação",
      description: "Concentrador centrífugo de alta velocidade para concentração rápida de microorganismos, células e partículas em suspensão. Ideal para concentração de fitoplâncton, bactérias e outros microorganismos aquáticos. Inclui rotores de ângulo fixo e swing-out para diferentes aplicações. Operação silenciosa com sistema de segurança avançado.",
      benefits: [
        "Concentração rápida de microorganismos",
        "Rotores intercambiáveis incluídos",
        "Operação silenciosa <50 dB",
        "Sistema de segurança avançado",
        "Controle digital de parâmetros",
        "Ideal para amostras aquáticas"
      ],
      presentation: [
        "Concentrador 4.000 rpm: Para amostras delicadas",
        "Concentrador 10.000 rpm: Para uso geral",
        "Concentrador 15.000 rpm: Para alta velocidade",
        "Rotores adicionais: Diferentes capacidades",
        "Tubos de concentração incluídos"
      ],
      specifications: [
        { key: "Velocidade máxima", value: "4.000-15.000 rpm" },
        { key: "Força centrífuga", value: "Até 25.000 x g" },
        { key: "Capacidade", value: "6-24 tubos" },
        { key: "Volume dos tubos", value: "0,5-50 mL" },
        { key: "Nível de ruído", value: "<50 dB" },
        { key: "Timer", value: "1-99 minutos" }
      ]
    }
  },

  // Sistema de Purificación de Agua Ultra Pura - EQ047
  "EQ047": {
    es: {
      name: "Tubos API",
      description: "API, Tubos de prueba de plástico, repuesto con tapas para\ncualquier kit de prueba de acuario, incluyendo el kit de\nprueba maestro de agua dulce API (caja de 24 unidades).",
      benefits: [],
      presentation: [
      "Caja de 24 tubos de ensayo"
    ],
      specifications: [
      {
        "key": "Especificación",
        "value": "Contiene tapones de plástico."
      },
      {
        "key": "Especificación",
        "value": "Para usar cuando los tubos originales se han perdido"
      },
      {
        "key": "Especificación",
        "value": "o dañado"
      }
    ]
    },
    en: {
      name: "Ultra Pure Water Purification System",
      description: "Complete water purification system for obtaining Type I ultra pure water for critical applications in aquaculture laboratories. Combines multiple technologies: reverse osmosis, deionization, UV filtration and ultrafiltration. Produces water with conductivity <1 µS/cm for reagent preparation, culture media and precision analysis.",
      benefits: [
        "Ultra pure water with conductivity <1 µS/cm",
        "Multiple purification technologies",
        "Continuous quality monitoring",
        "On-demand production",
        "Integrated UV disinfection system",
        "Automatic dispenser included"
      ],
      presentation: [
        "10 L/h system: For small laboratories",
        "30 L/h system: For medium laboratories",
        "60 L/h system: For large laboratories",
        "Replacement cartridges: Annual kit",
        "Optional storage tank"
      ],
      specifications: [
        { key: "Production", value: "10, 30, 60 L/h" },
        { key: "Conductivity", value: "<1 µS/cm" },
        { key: "TOC", value: "<10 ppb" },
        { key: "Bacteria", value: "<1 CFU/mL" },
        { key: "Particles", value: "<0.1 µm filtered" },
        { key: "System", value: "RO + DI + UV + UF" }
      ]
    },
    pt: {
      name: "Sistema de Purificação de Água Ultra Pura",
      description: "Sistema completo de purificação de água para obtenção de água ultra pura tipo I para aplicações críticas em laboratórios aquícolas. Combina múltiplas tecnologias: osmose reversa, deionização, filtração UV e ultrafiltração. Produz água com condutividade <1 µS/cm para preparação de reagentes, meios de cultivo e análises de precisão.",
      benefits: [
        "Água ultra pura com condutividade <1 µS/cm",
        "Múltiplas tecnologias de purificação",
        "Monitoramento contínuo de qualidade",
        "Produção sob demanda",
        "Sistema de desinfecção UV integrado",
        "Dispensador automático incluído"
      ],
      presentation: [
        "Sistema 10 L/h: Para laboratórios pequenos",
        "Sistema 30 L/h: Para laboratórios médios",
        "Sistema 60 L/h: Para laboratórios grandes",
        "Cartuchos de reposição: Kit anual",
        "Tanque de armazenamento opcional"
      ],
      specifications: [
        { key: "Produção", value: "10, 30, 60 L/h" },
        { key: "Condutividade", value: "<1 µS/cm" },
        { key: "TOC", value: "<10 ppb" },
        { key: "Bactérias", value: "<1 CFU/mL" },
        { key: "Partículas", value: "<0,1 µm filtradas" },
        { key: "Sistema", value: "RO + DI + UV + UF" }
      ]
    }
  },

  // Estación de Trabajo Multifuncional - EQ048
  "EQ048": {
    es: {
      name: "Waterlink Spin Touch",
      description: "Fotómetro digital avanzado para pruebas rápidas y precisas en agua dulce y salada. Utiliza discos prellenados (SpinDisk™) para ejecutar de 8 a 10 pruebas simultáneas en solo 2 minutos con menos de 3 ml de muestra.",
      benefits: [
      "Ahorra tiempo con resultados rápidos y confiables",
      "Reduce errores humanos con reactivos premedidos",
      "Facilita el control y seguimiento de calidad del agua",
      "Mejora la toma de decisiones mediante historial y alertas"
    ],
      presentation: [
      "Equipo portátil con discos individuales. No requiere condiciones especiales de almacenamiento."
    ],
      specifications: [
      {
        "key": "Especificación",
        "value": "Características Principales"
      },
      {
        "key": "Especificación",
        "value": "Realiza hasta 10 pruebas simultáneas en 2 minutos"
      },
      {
        "key": "Especificación",
        "value": "Registro automático de fecha, hora y resultados"
      },
      {
        "key": "Especificación",
        "value": "Panel de monitoreo con alertas e historial por estanque"
      },
      {
        "key": "Especificación",
        "value": "Compatible con app WaterLink® (iOS y Android)"
      },
      {
        "key": "Especificación",
        "value": "Datos Técnicos"
      },
      {
        "key": "Muestra requerida",
        "value": "< 3 ml"
      },
      {
        "key": "Tipo de disco",
        "value": "SpinDisk™ (descartable)"
      },
      {
        "key": "Tipo de agua",
        "value": "Dulce y salada"
      },
      {
        "key": "Visualización",
        "value": "Resultados en tiempo real"
      }
    ]
    },
    en: {
      name: "Multifunctional Workstation",
      description: "Comprehensive workstation that combines multiple essential equipment for aquaculture laboratories in a single compact unit. Includes magnetic stirrer, precision balance, pH meter, automatic dispenser and heating system. Modular design that optimizes laboratory space and improves work efficiency.",
      benefits: [
        "Multiple equipment in one unit",
        "Compact design that saves space",
        "Unified control interface",
        "Synchronized calibration of all equipment",
        "Easy centralized maintenance",
        "Ideal for small laboratories"
      ],
      presentation: [
        "Basic station: 5 integrated equipment",
        "Professional station: 8 integrated equipment",
        "Complete station: 12 integrated equipment",
        "Additional modules: Expandable",
        "Integrated management software"
      ],
      specifications: [
        { key: "Integrated equipment", value: "5, 8, 12 depending on model" },
        { key: "Dimensions", value: "120x80x40 cm" },
        { key: "Weight", value: "85-150 kg" },
        { key: "Power supply", value: "220V single phase" },
        { key: "Control", value: "15-inch touchscreen" },
        { key: "Connectivity", value: "USB, Ethernet, WiFi" }
      ]
    },
    pt: {
      name: "Estação de Trabalho Multifuncional",
      description: "Estação de trabalho integral que combina múltiplos equipamentos essenciais para laboratórios aquícolas em uma única unidade compacta. Inclui agitador magnético, balança de precisão, medidor de pH, dispensador automático e sistema de aquecimento. Design modular que otimiza o espaço do laboratório e melhora a eficiência do trabalho.",
      benefits: [
        "Múltiplos equipamentos em uma unidade",
        "Design compacto que economiza espaço",
        "Interface unificada de controle",
        "Calibração sincronizada de todos os equipamentos",
        "Fácil manutenção centralizada",
        "Ideal para laboratórios pequenos"
      ],
      presentation: [
        "Estação básica: 5 equipamentos integrados",
        "Estação profissional: 8 equipamentos integrados",
        "Estação completa: 12 equipamentos integrados",
        "Módulos adicionais: Expansíveis",
        "Software de gestão integrado"
      ],
      specifications: [
        { key: "Equipamentos integrados", value: "5, 8, 12 conforme modelo" },
        { key: "Dimensões", value: "120x80x40 cm" },
        { key: "Peso", value: "85-150 kg" },
        { key: "Alimentação", value: "220V monofásico" },
        { key: "Controle", value: "Tela sensível ao toque 15 polegadas" },
        { key: "Conectividade", value: "USB, Ethernet, WiFi" }
      ]
    }
  }
};

// Función para obtener la traducción de un producto
export const getProductTranslation = (
  productId: string,
  language: Language,
  field: keyof ProductTranslation
): any => {
  const translation = productTranslations[productId]?.[language];
  if (!translation) {
    console.warn(`No translation found for product ${productId} in language ${language}`);
    return null;
  }
  return translation[field];
};

// Función para verificar si un producto tiene traducciones disponibles
export const hasProductTranslation = (productId: string): boolean => {
  return productId in productTranslations;
};

export default productTranslations;
