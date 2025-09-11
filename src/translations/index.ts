import { Language } from '../contexts/LanguageContext';

// Tipo para las traducciones
type TranslationValue = {
  es: string;
  en: string;
  pt: string;
};

// Estructura de traducciones organizada por componentes
const translations = {
  // Header/Navegación
  header: {
    navigation: {
      home: { es: 'INICIO', en: 'HOME', pt: 'INÍCIO' },
      about: { es: 'NOSOTROS', en: 'ABOUT', pt: 'SOBRE NÓS' },
      contact: { es: 'CONTACTO', en: 'CONTACT', pt: 'CONTATO' },
      products: { es: 'PRODUCTOS', en: 'PRODUCTS', pt: 'PRODUTOS' },
      offices: { es: 'OFICINAS', en: 'OFFICES', pt: 'ESCRITÓRIOS' },
      news: { es: 'NOTICIAS', en: 'NEWS', pt: 'NOTÍCIAS' },
      blog: { es: 'BLOG', en: 'BLOG', pt: 'BLOG' },
      careers: { es: 'Trabaja con Nosotros', en: 'Work with Us', pt: 'Trabalhe Conosco' },
      search: { es: 'Buscar productos...', en: 'Search products...', pt: 'Buscar produtos...' }
    },
    inventory: {
      stats: {
        totalProducts: { es: 'Total Productos', en: 'Total Products', pt: 'Total de Produtos' },
        completeness: { es: 'Completitud', en: 'Completeness', pt: 'Completude' },
        totalAssets: { es: 'Total Assets', en: 'Total Assets', pt: 'Total de Ativos' },
        categories: { es: 'Categorías', en: 'Categories', pt: 'Categorias' }
      },
      form: {
        productPhoto: { es: 'Fotografía del Producto', en: 'Product Photo', pt: 'Foto do Produto' },
        uploadImage: { es: 'Subir imagen', en: 'Upload image', pt: 'Carregar imagem' },
        imageFormats: { es: 'PNG, JPG, WEBP hasta 10MB', en: 'PNG, JPG, WEBP up to 10MB', pt: 'PNG, JPG, WEBP até 10MB' },
        technicalSheet: { es: 'Ficha Técnica (PDF)', en: 'Technical Sheet (PDF)', pt: 'Ficha Técnica (PDF)' },
        uploadPdf: { es: 'Subir PDF', en: 'Upload PDF', pt: 'Carregar PDF' },
        descriptionPlaceholder: { es: 'Descripción detallada del producto, sus características y aplicaciones', en: 'Detailed description of the product, its characteristics and applications', pt: 'Descrição detalhada do produto, suas características e aplicações' }
      }
    },
    language: {
      spanish: { es: 'Español', en: 'Spanish', pt: 'Espanhol' },
      english: { es: 'Inglés', en: 'English', pt: 'Inglês' },
      portuguese: { es: 'Portugués', en: 'Portuguese', pt: 'Português' },
      selector: { es: 'Selector de idioma', en: 'Language selector', pt: 'Seletor de idioma' }
    }
  },

  // Footer
  footer: {
    contact: {
      title: { es: 'CONTÁCTANOS', en: 'CONTACT US', pt: 'FALE CONOSCO' },
      phone: { es: 'Teléfono:', en: 'Phone:', pt: 'Telefone:' },
      email: { es: 'Para más información escríbenos a', en: 'For more information write to us at', pt: 'Para mais informações, escreva para' }
    },
    location: {
      title: { es: 'UBICACIÓN', en: 'LOCATION', pt: 'LOCALIZAÇÃO' },
      address: { es: 'Dirección', en: 'Address', pt: 'Endereço' }
    },
    social: {
      title: { es: '¡SÍGUENOS!', en: 'FOLLOW US!', pt: 'SIGA-NOS!' }
    },
    legal: {
      privacy: { es: 'Política de Privacidad', en: 'Privacy Policy', pt: 'Política de Privacidade' },
      terms: { es: 'Términos y Condiciones', en: 'Terms & Conditions', pt: 'Termos e Condições' },
      legalNotice: { 
        es: 'Aviso Legal', 
        en: 'Legal Notice', 
        pt: 'Aviso Legal',
        commitment: {
          title: { es: 'Compromiso Legal', en: 'Legal Commitment', pt: 'Compromisso Legal' },
          content: { 
            es: 'En PRILABSA, nos comprometemos a operar con total transparencia y cumplimiento de la normativa legal vigente, garantizando la protección de nuestros usuarios y clientes.',
            en: 'At PRILABSA, we are committed to operating with complete transparency and compliance with current legal regulations, ensuring the protection of our users and clients.',
            pt: 'Na PRILABSA, comprometemo-nos a operar com total transparência e cumprimento da regulamentação legal vigente, garantindo a proteção de nossos usuários e clientes.'
          }
        }
      },
      cookiePolicy: { es: 'Política de Cookies', en: 'Cookie Policy', pt: 'Política de Cookies' }
    },
    copyright: {
      text: { 
        es: '© 2024 Prilabsa. Todos los derechos reservados.', 
        en: '© 2024 Prilabsa. All rights reserved.',
        pt: '© 2024 Prilabsa. Todos os direitos reservados.'
      }
    }
  },

  // Página de Inicio
  home: {
    hero: {
      title: {
      es: 'Somos proveedores de las mejores soluciones integrales\u00A0en',
      en: 'We are providers of the best comprehensive solutions\u00A0in',
      pt: 'Somos fornecedores das melhores soluções integrais\u00A0em'
    },
      subtitle: {
        es: 'Equipos, reactivos y servicios especializados para el sector salud',
        en: 'Equipment, reagents and specialized services for the health sector',
        pt: 'Equipamentos, reagentes e serviços especializados para o setor de saúde'
      },
      cta: {
        catalog: { es: 'CONOCE MÁS', en: 'LEARN MORE', pt: 'SAIBA MAIS' },
        contact: { es: 'Contactar', en: 'Contact Us', pt: 'Entre em Contato' }
      }
    },
    weAre: {
      title: { es: 'SOMOS', en: 'WE ARE', pt: 'SOMOS' },
      subtitle: {
        es: 'Tu socio estratégico en soluciones para laboratorios',
        en: 'Your strategic partner in laboratory solutions',
        pt: 'Seu parceiro estratégico em soluções para laboratórios'
      },
      description: {
        es: 'Prilabsa es una empresa multinacional fundada en 1992, dedicada a la comercialización de alimentos, probióticos, aditivos, equipos y químicos con altos estándares de calidad.',
        en: 'Prilabsa is a multinational company founded in 1992, dedicated to the commercialization of food, probiotics, additives, equipment and chemicals with high quality standards.',
        pt: 'A Prilabsa é uma empresa multinacional fundada em 1992, dedicada à comercialização de alimentos, probióticos, aditivos, equipamentos e produtos químicos com altos padrões de qualidade.'
      },
      sections: {
        excellence: {
          title: { es: 'Excelencia en Acuicultura', en: 'Excellence in Aquaculture', pt: 'Excelência em Aquicultura' },
          description: {
            es: 'Prilabsa es una empresa multinacional fundada en 1992, dedicada a la comercialización de alimentos, probióticos, aditivos, equipos y químicos con altos estándares de calidad.',
            en: 'Prilabsa is a multinational company founded in 1992, dedicated to the commercialization of food, probiotics, additives, equipment and chemicals with high quality standards.',
            pt: 'A Prilabsa é uma empresa multinacional fundada em 1992, dedicada à comercialização de alimentos, probióticos, aditivos, equipamentos e produtos químicos com altos padrões de qualidade.'
          }
        },
        coverage: {
          title: { es: 'Cobertura Integral', en: 'Comprehensive Coverage', pt: 'Cobertura Integral' },
          description: {
            es: 'Hemos cubierto todas las necesidades de laboratorios de camarón, peces y camaroneras, gracias al pleno conocimiento del medio ambiente y la sólida experiencia de nuestro personal capacitado en diversos mercados de la industria acuícola.',
            en: 'We have covered all the needs of shrimp, fish and shrimp farm laboratories, thanks to our full knowledge of the environment and the solid experience of our staff trained in various markets of the aquaculture industry.',
            pt: 'Cobrimos todas as necessidades de laboratórios de camarão, peixes e fazendas de camarão, graças ao pleno conhecimento do meio ambiente e à sólida experiência de nossa equipe treinada em diversos mercados da indústria aquícola.'
          }
        },
        presence: {
          title: { es: 'Presencia Continental', en: 'Continental Presence', pt: 'Presença Continental' },
          description: {
            es: 'Prilabsa ha expandido sus actividades en puntos estratégicos del continente americano, con oficinas comerciales y bodegas climatizadas en Ecuador (Guayaquil, Manta, Pedernales, San Vicente, Hualtaco, Machala, Esmeraldas, Libertad), USA (Miami), México (Mazatlán), Brasil (Natal, Aracati y Acaraú), Honduras (Choluteca), Panamá (Ciudad de Panamá), Nicaragua (Chinandega), Venezuela (Maracaibo) y Perú (Tumbes).',
      en: 'Prilabsa has expanded its activities in strategic points of the American continent, with commercial offices and climate-controlled warehouses in Ecuador (Guayaquil, Manta, Pedernales, San Vicente, Hualtaco, Machala, Esmeraldas, Libertad), USA (Miami), Mexico (Mazatlán), Brazil (Natal, Aracati and Acaraú), Honduras (Choluteca), Panama (Panama City), Nicaragua (Chinandega), Venezuela (Maracaibo) and Peru (Tumbes).',
      pt: 'A Prilabsa expandiu suas atividades em pontos estratégicos do continente americano, com escritórios comerciais e armazéns climatizados no Equador (Guayaquil, Manta, Pedernales, San Vicente, Hualtaco, Machala, Esmeraldas, Libertad), EUA (Miami), México (Mazatlán), Brasil (Natal, Aracati e Acaraú), Honduras (Choluteca), Panamá (Cidade do Panamá), Nicarágua (Chinandega), Venezuela (Maracaibo) e Peru (Tumbes).'
          }
        },
        leadership: {
          title: { es: 'Experiencia y Liderazgo', en: 'Experience and Leadership', pt: 'Experiência e Liderança' },
          description: {
            es: 'Con más de 32 años de experiencia y servicio en el sector, demostramos que la excelencia no se improvisa: se consolida a través de la eficiencia de cada miembro de nuestro equipo. Somos la solución integral del sector acuícola en las Américas.',
            en: 'With more than 32 years of experience and service in the sector, we demonstrate that excellence is not improvised: it is consolidated through the efficiency of each member of our team. We are the comprehensive solution for the aquaculture sector in the Americas.',
            pt: 'Com mais de 32 anos de experiência e serviço no setor, demonstramos que a excelência não se improvisa: se consolida através da eficiência de cada membro de nossa equipe. Somos a solução integral do setor aquícola nas Américas.'
          }
        }
      },
      stats: {
        experience: { es: 'Años de Experiencia', en: 'Years of Experience', pt: 'Anos de Experiência' },
        countries: { es: 'Países Atendidos', en: 'Countries Served', pt: 'Países Atendidos' },
        clients: { es: 'Clientes Satisfechos', en: 'Satisfied Clients', pt: 'Clientes Satisfeitos' },
        products: { es: 'Productos Disponibles', en: 'Available Products', pt: 'Produtos Disponíveis' }
      },
      watchVideo: { es: 'Ver Video', en: 'Watch Video', pt: 'Assistir Vídeo' }
    },
    catalog: {
      title: { es: 'NUESTROS PRODUCTOS', en: 'OUR PRODUCTS', pt: 'NOSSOS PRODUTOS' },
      subtitle: { es: 'Soluciones integrales para la industria acuícola con los más altos estándares de calidad', en: 'Comprehensive solutions for the aquaculture industry with the highest quality standards', pt: 'Soluções integrais para a indústria aquícola com os mais altos padrões de qualidade' },
      categories: {
        alimentos: { es: 'ALIMENTOS', en: 'FOOD', pt: 'ALIMENTOS' },
        probioticos: { es: 'PROBIÓTICOS', en: 'PROBIOTICS', pt: 'PROBIÓTICOS' },
        aditivos: { es: 'ADITIVOS', en: 'ADDITIVES', pt: 'ADITIVOS' },
        quimicos: { es: 'QUÍMICOS', en: 'CHEMICALS', pt: 'QUÍMICOS' },
        equipos: { es: 'EQUIPOS', en: 'EQUIPMENT', pt: 'EQUIPAMENTOS' }
      },
      descriptions: {
        alimentosDesc: { es: 'Revisa nuestro catálogo de productos de Alimentos aquí', en: 'Check our Food products catalog here', pt: 'Confira nosso catálogo de produtos de Alimentos aqui' },
        probioticosDesc: { es: 'Revisa nuestro catálogo de productos de Probióticos aquí', en: 'Check our Probiotics products catalog here', pt: 'Confira nosso catálogo de produtos de Probióticos aqui' },
        aditivosDesc: { es: 'Revisa nuestro catálogo de productos de Aditivos aquí', en: 'Check our Additives products catalog here', pt: 'Confira nosso catálogo de produtos de Aditivos aqui' },
        quimicosDesc: { es: 'Revisa nuestro catálogo de productos de Químicos aquí', en: 'Check our Chemicals products catalog here', pt: 'Confira nosso catálogo de produtos de Químicos aqui' },
        equiposDesc: { es: 'Revisa nuestro catálogo de productos de Equipos aquí', en: 'Check our Equipment products catalog here', pt: 'Confira nosso catálogo de produtos de Equipamentos aqui' }
      },
      viewProducts: { es: 'VER PRODUCTOS', en: 'VIEW PRODUCTS', pt: 'VER PRODUTOS' },
      viewAll: { es: 'Ver Todos los Productos →', en: 'View All Products →', pt: 'Ver Todos os Produtos →' },
      viewCatalog: { es: 'Ver Catálogo Completo', en: 'View Complete Catalog', pt: 'Ver Catálogo Completo' }
    },
    brands: {
      title: { es: 'Nuestras Marcas', en: 'Our Brands', pt: 'Nossas Marcas' },
      subtitle: { es: 'Distribuimos con orgullo productos de las marcas más reconocidas de la industria.', en: 'We proudly distribute products from the most recognized brands in the industry.', pt: 'Distribuímos com orgulho produtos das marcas mais reconhecidas da indústria.' }
    },
    agencies: {
      title: { es: 'NUESTRAS AGENCIAS', en: 'OUR AGENCIES', pt: 'NOSSAS AGÊNCIAS' },
      description: {
        es: 'Hemos expandido nuestras actividades en países establecidos como puntos estratégicos del continente Americano, contando con oficinas comerciales modernas y bodegas climatizadas.',
        en: 'We have expanded our activities in countries established as strategic points of the American continent, with modern commercial offices and climate-controlled warehouses.',
        pt: 'Expandimos nossas atividades em países estabelecidos como pontos estratégicos do continente americano, contando com escritórios comerciais modernos e armazéns climatizados.'
      },
      cta: { es: 'CONOCE MÁS', en: 'LEARN MORE', pt: 'SAIBA MAIS' }
    },
    video: {
      title: { es: 'Conoce PRILABSA', en: 'Meet PRILABSA', pt: 'Conheça a PRILABSA' },
      close: { es: 'Cerrar', en: 'Close', pt: 'Fechar' }
    }
  },

  // Página Quienes Somos
  aboutUs: {
    hero: {
      title: {
        es: 'Desde 1992, somos una multinacional dedicada a la comercialización\u00A0de',
        en: 'Since 1992, we are a multinational company dedicated to the commercialization\u00A0of',
        pt: 'Desde 1992, somos uma multinacional dedicada à comercialização\u00A0de'
      },
      animation: {
        productosAcuicolas: { es: 'productos acuícolas', en: 'aquaculture products', pt: 'produtos aquícolas' },
        solucionesIntegrales: { es: 'soluciones integrales', en: 'comprehensive solutions', pt: 'soluções integrais' }
      }
    },
    content: {
      title: { es: 'QUIÉNES SOMOS', en: 'ABOUT US', pt: 'QUEM SOMOS' },
      description: {
        es: 'Somos una multinacional fundada en el año 1992, nos dedicamos a la comercialización de productos relacionados a la industria acuícola con los estándares más altos de calidad y garantía en el mercado. Hemos cubierto las necesidades de laboratorios de larvas, camaroneras y piscicultura, gracias al pleno conocimiento y experiencia en el sólido mercado de la industria acuícola.',
        en: 'We are a multinational company founded in 1992, dedicated to the commercialization of products related to the aquaculture industry with the highest standards of quality and guarantee in the market. We have covered the needs of larvae laboratories, shrimp farms and fish farming, thanks to our full knowledge and experience in the solid market of the aquaculture industry.',
        pt: 'Somos uma multinacional fundada em 1992, nos dedicamos à comercialização de produtos relacionados à indústria aquícola com os mais altos padrões de qualidade e garantia no mercado. Cobrimos as necessidades de laboratórios de larvas, fazendas de camarão e piscicultura, graças ao pleno conhecimento e experiência no sólido mercado da indústria aquícola.'
      },
      mission: {
        title: { es: 'MISIÓN', en: 'MISSION', pt: 'MISSÃO' },
        description: {
          es: 'Ser socios estratégicos de nuestros clientes al ofrecer productos innovadores, bioseguros y de calidad para mejorar la producción de la industria en las Américas.',
          en: 'To be strategic partners of our clients by offering innovative, biosecure and quality products to improve the production of the industry in the Americas.',
          pt: 'Ser parceiros estratégicos de nossos clientes ao oferecer produtos inovadores, biosseguros e de qualidade para melhorar a produção da indústria nas Américas.'
        }
      },
      vision: {
        title: { es: 'VISIÓN Y VALORES', en: 'VISION AND VALUES', pt: 'VISÃO E VALORES' },
        description: {
          es: 'Ser la solución integral para el desarrollo de la industria acuícola, gracias a la competividad y calidad de nuestros productos. El éxito de nuestro trabajo se logra a través de valores corporativos que guían el comportamiento y las acciones de nuestros colaboradores: Innovación, Compromiso, Integridad y Confianza.',
          en: 'To be the comprehensive solution for the development of the aquaculture industry, thanks to the competitiveness and quality of our products. The success of our work is achieved through corporate values that guide the behavior and actions of our collaborators: Innovation, Commitment, Integrity and Trust.',
          pt: 'Ser a solução integral para o desenvolvimento da indústria aquícola, graças à competitividade e qualidade de nossos produtos. O sucesso de nosso trabalho é alcançado através de valores corporativos que orientam o comportamento e as ações de nossos colaboradores: Inovação, Compromisso, Integridade e Confiança.'
        }
      }
    }
  },

  // Página Oficinas
  offices: {
    hero: {
      title: {
        es: 'Conectamos y fortalecemos a todas las Américas. Nos encontramos en',
        en: 'We connect and strengthen all the Americas. We are located in',
        pt: 'Conectamos e fortalecemos todas as Américas. Estamos localizados em'
      },
      countries: {
        ecuador: { es: 'ECUADOR', en: 'ECUADOR', pt: 'EQUADOR' },
        brasil: { es: 'BRASIL', en: 'BRAZIL', pt: 'BRASIL' },
        usa: { es: 'USA', en: 'USA', pt: 'EUA' },
        mexico: { es: 'MÉXICO', en: 'MEXICO', pt: 'MÉXICO' },
        honduras: { es: 'HONDURAS', en: 'HONDURAS', pt: 'HONDURAS' },
        panama: { es: 'PANAMÁ', en: 'PANAMA', pt: 'PANAMÁ' },
        nicaragua: { es: 'NICARAGUA', en: 'NICARAGUA', pt: 'NICARÁGUA' },
        venezuela: { es: 'VENEZUELA', en: 'VENEZUELA', pt: 'VENEZUELA' },
        peru: { es: 'PERÚ', en: 'PERU', pt: 'PERU' }
      }
    },
    content: {
      title: { es: 'NUESTRAS OFICINAS', en: 'OUR OFFICES', pt: 'NOSSOS ESCRITÓRIOS' },
      description: {
        es: 'Hemos expandido nuestras actividades en países establecidos como puntos estratégicos del continente Americano, contando con oficinas comerciales modernas y bodegas climatizadas.',
        en: 'We have expanded our activities in countries established as strategic points of the American continent, with modern commercial offices and climate-controlled warehouses.',
        pt: 'Expandimos nossas atividades em países estabelecidos como pontos estratégicos do continente americano, contando com escritórios comerciais modernos e armazéns climatizados.'
      }
    }
  },

  // Newsletter
  newsletter: {
    title: { es: 'SUSCRÍBETE A NUESTRO NEWSLETTER', en: 'SUBSCRIBE TO OUR NEWSLETTER', pt: 'INSCREVA-SE EM NOSSA NEWSLETTER' },
    description: { 
      es: 'Recibe las últimas noticias, ofertas y tendencias de la industria directamente en tu correo.',
      en: 'Receive the latest news, offers and industry trends directly in your email.',
      pt: 'Receba as últimas notícias, ofertas e tendências da indústria diretamente em seu e-mail.'
    },
    placeholder: { es: 'Tu correo electrónico', en: 'Your email address', pt: 'Seu endereço de e-mail' },
    button: { es: 'SUSCRIBIRSE', en: 'SUBSCRIBE', pt: 'INSCREVER-SE' },
    privacy: { es: 'Acepto la política de privacidad', en: 'I accept the privacy policy', pt: 'Aceito a política de privacidade' },
    success: { es: '¡Gracias por suscribirte! Revisa tu bandeja de entrada.', en: 'Thank you for subscribing! Check your inbox.', pt: 'Obrigado por se inscrever! Verifique sua caixa de entrada.' },
    blogTitle: { es: 'Suscríbete a Nuestro Boletín', en: 'Subscribe to Our Newsletter', pt: 'Inscreva-se em Nosso Boletim' },
    blogDescription: {
      es: 'Recibe las últimas noticias, artículos y actualizaciones sobre la industria acuícola directamente en tu correo.',
      en: 'Receive the latest news, articles and updates about the aquaculture industry directly in your email.',
      pt: 'Receba as últimas notícias, artigos e atualizações sobre a indústria aquícola diretamente em seu e-mail.'
    },
    errors: {
      emailRequired: { es: 'El correo electrónico es obligatorio.', en: 'Email is required.', pt: 'O e-mail é obrigatório.' },
      emailInvalid: { es: 'Por favor, ingrese un correo electrónico válido.', en: 'Please enter a valid email address.', pt: 'Por favor, insira um endereço de e-mail válido.' },
      consentRequired: { es: 'He leído y acepto la Política de Privacidad.', en: 'I have read and accept the Privacy Policy.', pt: 'Li e aceito a Política de Privacidade.' }
    }
  },

  // Protected Route
  auth: {
    verifying: { es: 'Verificando autenticación...', en: 'Verifying authentication...', pt: 'Verificando autenticação...' }
  },

  // Historia
  history: {
    title: { es: 'Nuestra Historia', en: 'Our History', pt: 'Nossa História' },
    subtitle: { 
      es: 'Trazando el camino de la innovación acuícola desde 1992',
      en: 'Tracing the path of aquaculture innovation since 1992',
      pt: 'Traçando o caminho da inovação aquícola desde 1992'
    },
    timeline: {
      1992: { 
        es: 'Iniciamos operaciones en Guayaquil con una pequeña oficina y un equipo de solo tres personas. Comenzamos comercializando Artemia, sentando las bases de nuestra empresa.',
        en: 'We started operations in Guayaquil with a small office and a team of only three people. We began commercializing Artemia, laying the foundations of our company.',
        pt: 'Iniciamos operações em Guayaquil com um pequeno escritório e uma equipe de apenas três pessoas. Começamos comercializando Artêmia, estabelecendo as bases de nossa empresa.'
      },
      1998: { 
        es: 'Ampliamos nuestra presencia con la inauguración de oficinas en Salinas y Manta. Ese mismo año, incorporamos cuatro alimentos adicionales a nuestro portafolio.',
        en: 'We expanded our presence with the inauguration of offices in Salinas and Manta. That same year, we incorporated four additional feeds into our portfolio.',
        pt: 'Expandimos nossa presença com a inauguração de escritórios em Salinas e Manta. No mesmo ano, incorporamos quatro alimentos adicionais ao nosso portfólio.'
      },
      2000: { 
        es: 'Continuamos nuestra expansión nacional con la apertura de una agencia en Machala.',
        en: 'We continued our national expansion with the opening of an agency in Machala.',
        pt: 'Continuamos nossa expansão nacional com a abertura de uma agência em Machala.'
      },
      2001: { 
        es: 'Dimos el salto internacional al convertirnos en una empresa multinacional, inaugurando nuestra primera agencia fuera del país, en Miami, para explorar nuevos mercados.',
        en: 'We made the international leap by becoming a multinational company, inaugurating our first agency outside the country, in Miami, to explore new markets.',
        pt: 'Demos o salto internacional ao nos tornarmos uma empresa multinacional, inaugurando nossa primeira agência fora do país, em Miami, para explorar novos mercados.'
      },
      2002: { 
        es: 'Iniciamos una alianza estratégica con nuestro proveedor Mackay Marine, lo que nos permitió incluir Artemia del Lago de Utah en nuestra oferta.',
        en: 'We initiated a strategic alliance with our supplier Mackay Marine, which allowed us to include Artemia from Lake Utah in our offering.',
        pt: 'Iniciamos uma aliança estratégica com nosso fornecedor Mackay Marine, o que nos permitiu incluir Artêmia do Lago de Utah em nossa oferta.'
      },
      2003: { 
        es: 'Seguimos buscando nuevos mercados en el sur del continente, estableciendo agencias en Brasil.',
        en: 'We continued seeking new markets in the south of the continent, establishing agencies in Brazil.',
        pt: 'Continuamos buscando novos mercados no sul do continente, estabelecendo agências no Brasil.'
      },

      2008: { 
        es: 'Incorporamos alimentos congelados para reproductores a nuestro catálogo, fortaleciendo nuestra oferta especializada.',
        en: 'We incorporated frozen foods for broodstock into our catalog, strengthening our specialized offering.',
        pt: 'Incorporamos alimentos congelados para reprodutores ao nosso catálogo, fortalecendo nossa oferta especializada.'
      },
      2010: { 
        es: 'Introdujimos una nueva línea de bacterias para piscicultura e inauguramos nuestra primera agencia en Centroamérica.',
        en: 'We introduced a new line of bacteria for fish farming and inaugurated our first agency in Central America.',
        pt: 'Introduzimos uma nova linha de bactérias para piscicultura e inauguramos nossa primeira agência na América Central.'
      },

      2013: { 
        es: 'Ampliamos nuestra gama de productos con la incorporación de Zeigler Bros, fortaleciendo aún más nuestro portafolio.',
        en: 'We expanded our product range with the incorporation of Zeigler Bros, further strengthening our portfolio.',
        pt: 'Expandimos nossa gama de produtos com a incorporação da Zeigler Bros, fortalecendo ainda mais nosso portfólio.'
      },
      2014: { 
        es: 'Frente a los desafíos del sector, desarrollamos soluciones específicas para apoyar a nuestros clientes y al mercado acuícola.',
        en: 'Facing sector challenges, we developed specific solutions to support our clients and the aquaculture market.',
        pt: 'Diante dos desafios do setor, desenvolvemos soluções específicas para apoiar nossos clientes e o mercado aquícola.'
      },

      2018: { 
        es: 'Incursionamos en la línea de productos químicos para acuicultura, reafirmando nuestro compromiso con la innovación.',
        en: 'We ventured into the line of chemical products for aquaculture, reaffirming our commitment to innovation.',
        pt: 'Incursionamos na linha de produtos químicos para aquicultura, reafirmando nosso compromisso com a inovação.'
      },

      2023: { 
        es: 'Inauguramos nuestra agencia en Perú, consolidando nuestra presencia en la región.',
        en: 'We inaugurated our agency in Peru, consolidating our presence in the region.',
        pt: 'Inauguramos nossa agência no Peru, consolidando nossa presença na região.'
      },
      2024: { 
        es: 'Contamos con más de 100 personas completamente capacitadas, y nos mantenemos firmes en nuestro propósito de ser un referente en la industria acuícola. Seguimos creciendo con visión, pasión y compromiso.',
        en: 'We have more than 100 fully trained people, and we remain firm in our purpose of being a reference in the aquaculture industry. We continue growing with vision, passion and commitment.',
        pt: 'Contamos com mais de 100 pessoas completamente capacitadas, e nos mantemos firmes em nosso propósito de ser uma referência na indústria aquícola. Continuamos crescendo com visão, paixão e compromisso.'
      },

    }
  },

  // Catálogo
  catalog: {
    title: { es: 'Nuestro Catálogo de Productos', en: 'Our Product Catalog', pt: 'Nosso Catálogo de Produtos' },
    description: {
      es: 'Descarga nuestro catálogo completo con todos nuestros productos para la industria acuícola.',
      en: 'Download our complete catalog with all our products for the aquaculture industry.',
      pt: 'Baixe nosso catálogo completo com todos os nossos produtos para a indústria aquícola.'
    },
    downloadButton: { es: 'Descargar Catálogo PDF', en: 'Download PDF Catalog', pt: 'Baixar Catálogo PDF' }
  },

  // Página de Productos
  products: {
    title: { es: 'Productos', en: 'Products', pt: 'Produtos' },
    search: {
      placeholder: { es: 'Buscar categorías de productos...', en: 'Search product categories...', pt: 'Buscar categorias de produtos...' }
    },
    categories: {
      all: { es: 'Todos', en: 'All', pt: 'Todos' },
      aditivos: { es: 'Aditivos', en: 'Additives', pt: 'Aditivos' },
      alimentos: { es: 'Alimentos', en: 'Food', pt: 'Alimentos' },
      equipos: { es: 'Equipos', en: 'Equipment', pt: 'Equipamentos' },
      probioticos: { es: 'Probióticos', en: 'Probiotics', pt: 'Probióticos' },
      quimicos: { es: 'Químicos', en: 'Chemicals', pt: 'Químicos' }
    },
    filters: {
      title: { es: 'Filtrar productos', en: 'Filter products', pt: 'Filtrar produtos' },
      featured: { es: 'Solo destacados', en: 'Featured only', pt: 'Apenas em destaque' },
      withDatasheet: { es: 'Con ficha técnica', en: 'With datasheet', pt: 'Com ficha técnica' }
    },
    results: {
      empty: { es: 'No se encontraron productos', en: 'No products found', pt: 'Nenhum produto encontrado' },
      found: { es: 'productos encontrados', en: 'products found', pt: 'produtos encontrados' }
    },
    productDetail: {
       relatedProducts: { es: 'Productos Relacionados', en: 'Related Products', pt: 'Produtos Relacionados' },
       backToProducts: { es: 'Volver a Productos', en: 'Back to Products', pt: 'Voltar aos Produtos' },
       productNotFound: { es: 'Producto no encontrado', en: 'Product not found', pt: 'Produto não encontrado' },
       productCode: { es: 'Código del producto', en: 'Product code', pt: 'Código do produto' },
       downloadTechnicalSheet: { es: 'Descargar ficha técnica', en: 'Download technical sheet', pt: 'Baixar ficha técnica' },
       description: { es: 'Descripción', en: 'Description', pt: 'Descrição' },
       specifications: { es: 'Especificaciones', en: 'Specifications', pt: 'Especificações' },
       benefits: { es: 'Beneficios', en: 'Benefits', pt: 'Benefícios' },
       presentation: { es: 'Presentación', en: 'Presentation', pt: 'Apresentação' },
       category: { es: 'Categoría', en: 'Category', pt: 'Categoria' }
     },
    actions: {
      viewProduct: { es: 'Ver Producto', en: 'View Product', pt: 'Ver Produto' }
    },
    messages: {
      categoryNotFound: { es: 'Categoría no encontrada', en: 'Category not found', pt: 'Categoria não encontrada' }
    }
  },

  // Agencies Section
  agencies: {
    title: { es: 'NUESTRAS AGENCIAS', en: 'OUR AGENCIES', pt: 'NOSSAS AGÊNCIAS' },
    subtitle: {
      es: 'Hemos expandido nuestras actividades en países establecidos como puntos estratégicos del continente Americano, contando con oficinas comerciales modernas y bodegas climatizadas.',
      en: 'We have expanded our activities in established countries as strategic points of the American continent, with modern commercial offices and climate-controlled warehouses.',
      pt: 'Expandimos nossas atividades em países estabelecidos como pontos estratégicos do continente americano, com escritórios comerciais modernos e armazéns climatizados.'
    },
    continentalPresence: { es: 'Presencia Continental', en: 'Continental Presence', pt: 'Presença Continental' },
    countries: { es: 'Países', en: 'Countries', pt: 'Países' },
    offices: { es: 'Oficinas', en: 'Offices', pt: 'Escritórios' },
    locations: {
      ecuador: { es: 'Guayaquil, Manta, Pedernales, San Vicente, Hualtaco, Machala, Esmeraldas, Libertad', en: 'Guayaquil, Manta, Pedernales, San Vicente, Hualtaco, Machala, Esmeraldas, Libertad', pt: 'Guayaquil, Manta, Pedernales, San Vicente, Hualtaco, Machala, Esmeraldas, Libertad' },
      usa: { es: 'Miami', en: 'Miami', pt: 'Miami' },
      mexico: { es: 'Mazatlán', en: 'Mazatlán', pt: 'Mazatlán' },
      brazil: { es: 'Natal, Aracati, Acaraú', en: 'Natal, Aracati, Acaraú', pt: 'Natal, Aracati, Acaraú' },
      honduras: { es: 'Choluteca', en: 'Choluteca', pt: 'Choluteca' },
      panama: { es: 'Ciudad de Panamá', en: 'Panama City', pt: 'Cidade do Panamá' },
      nicaragua: { es: 'Chinandega', en: 'Chinandega', pt: 'Chinandega' },
      venezuela: { es: 'Maracaibo', en: 'Maracaibo', pt: 'Maracaibo' },
      peru: { es: 'Tumbes', en: 'Tumbes', pt: 'Tumbes' }
    }
  },

  // Brands Section
  brands: {
    qualityGuaranteed: {
      title: { es: 'Calidad Garantizada', en: 'Quality Guaranteed', pt: 'Qualidade Garantida' },
      description: { es: 'Productos con los más altos estándares de calidad', en: 'Products with the highest quality standards', pt: 'Produtos com os mais altos padrões de qualidade' }
    },
    fastDelivery: {
      title: { es: 'Entrega Rápida', en: 'Fast Delivery', pt: 'Entrega Rápida' },
      description: { es: 'Distribución eficiente en toda América', en: 'Efficient distribution throughout America', pt: 'Distribuição eficiente em toda a América' }
    },
    technicalSupport: {
      title: { es: 'Soporte Técnico', en: 'Technical Support', pt: 'Suporte Técnico' },
      description: { es: 'Asesoría especializada y soporte continuo', en: 'Specialized consulting and continuous support', pt: 'Consultoria especializada e suporte contínuo' }
    }
  },

  // Breadcrumbs
  breadcrumbs: {
    home: { es: 'Inicio', en: 'Home', pt: 'Início' },
    blog: { es: 'Blog', en: 'Blog', pt: 'Blog' },
    news: { es: 'Noticias', en: 'News', pt: 'Notícias' },
    products: { es: 'Productos', en: 'Products', pt: 'Produtos' },
    category: {
      alimentos: { es: 'Alimentos', en: 'Food', pt: 'Alimentos' },
      probioticos: { es: 'Probióticos', en: 'Probiotics', pt: 'Probióticos' },
      aditivos: { es: 'Aditivos', en: 'Additives', pt: 'Aditivos' },
      quimicos: { es: 'Químicos', en: 'Chemicals', pt: 'Químicos' },
      equipos: { es: 'Equipos', en: 'Equipment', pt: 'Equipamentos' }
    }
  },

  // Consentimiento
  consent: {
    text: { es: 'He leído y acepto la', en: 'I have read and accept the', pt: 'Li e aceito a' },
    privacyPolicy: { es: 'Política de Privacidad', en: 'Privacy Policy', pt: 'Política de Privacidade' },
    error: { es: 'Debe aceptar la política de privacidad para continuar.', en: 'You must accept the privacy policy to continue.', pt: 'Você deve aceitar a política de privacidade para continuar.' }
  },



  // Página Contáctanos
  contact: {
    hero: {
      title: { es: 'Contáctanos', en: 'Contact Us', pt: 'Entre em Contato' }
    },
    emails: {
      title: { es: 'NUESTROS CORREOS', en: 'OUR EMAILS', pt: 'NOSSOS E-MAILS' },
      description: { es: 'Comunícate directamente con el departamento que necesites.', en: 'Contact directly with the department you need.', pt: 'Entre em contato diretamente com o departamento que precisar.' },
      departments: {
        imports: { es: 'Importaciones', en: 'Imports', pt: 'Importações' },
        sales: { es: 'Comercial y Ventas', en: 'Commercial and Sales', pt: 'Comercial e Vendas' },
        hr: { es: 'Talento Humano', en: 'Human Resources', pt: 'Recursos Humanos' }
      }
    },
    form: {
      title: { es: 'PONTE EN CONTACTO', en: 'GET IN TOUCH', pt: 'ENTRE EM CONTATO' },
      description: { es: 'Estaremos encantados de atenderte.', en: 'We will be happy to assist you.', pt: 'Ficaremos felizes em atendê-lo.' },
      fields: {
        fullName: { es: 'Nombre Completo', en: 'Full Name', pt: 'Nome Completo' },
        company: { es: 'Empresa', en: 'Company', pt: 'Empresa' },
        email: { es: 'Correo Electrónico', en: 'Email Address', pt: 'Endereço de E-mail' },
        phone: { es: 'Teléfono', en: 'Phone', pt: 'Telefone' },
        message: { es: 'Mensaje', en: 'Message', pt: 'Mensagem' }
      },
      button: { es: 'Enviar Mensaje', en: 'Send Message', pt: 'Enviar Mensagem' },
      errors: {
        required: { es: 'Por favor, complete los campos obligatorios: Nombre, Email y Mensaje.', en: 'Please complete the required fields: Name, Email and Message.', pt: 'Por favor, preencha os campos obrigatórios: Nome, E-mail e Mensagem.' }
      },
      success: { es: '¡Gracias! Tu mensaje ha sido enviado. Nos pondremos en contacto contigo pronto.', en: 'Thank you! Your message has been sent. We will contact you soon.', pt: 'Obrigado! Sua mensagem foi enviada. Entraremos em contato em breve.' }
    }
  },

  // Página Trabaja con Nosotros
  careers: {
    hero: {
      title: { es: 'Trabaja con Nosotros', en: 'Work with Us', pt: 'Trabalhe Conosco' }
    },
    form: {
      title: { es: 'ÚNETE A NUESTRO EQUIPO', en: 'JOIN OUR TEAM', pt: 'JUNTE-SE À NOSSA EQUIPE' },
      description: { es: 'Buscamos talento apasionado por la innovación.', en: 'We are looking for talent passionate about innovation.', pt: 'Buscamos talentos apaixonados pela inovação.' },
      fields: {
        fullName: { es: 'Nombre Completo', en: 'Full Name', pt: 'Nome Completo' },
        email: { es: 'Correo Electrónico', en: 'Email Address', pt: 'Endereço de E-mail' },
        phone: { es: 'Teléfono', en: 'Phone', pt: 'Telefone' },
        country: { es: 'País de Residencia', en: 'Country of Residence', pt: 'País de Residência' },
        area: { es: 'Área de Interés', en: 'Area of Interest', pt: 'Área de Interesse' },
        cv: { es: 'Adjuntar CV (PDF, DOCX)', en: 'Attach CV (PDF, DOCX)', pt: 'Anexar Currículo (PDF, DOCX)' }
      },
      areas: {
        placeholder: { es: 'Selecciona un área', en: 'Select an area', pt: 'Selecione uma área' },
        sales: { es: 'Ventas y Comercial', en: 'Sales and Commercial', pt: 'Vendas e Comercial' },
        admin: { es: 'Administración y Finanzas', en: 'Administration and Finance', pt: 'Administração e Finanças' },
        logistics: { es: 'Logística y Operaciones', en: 'Logistics and Operations', pt: 'Logística e Operações' },
        rd: { es: 'Investigación y Desarrollo', en: 'Research and Development', pt: 'Pesquisa e Desenvolvimento' },
        marketing: { es: 'Marketing', en: 'Marketing', pt: 'Marketing' }
      },
      button: { es: 'Enviar Aplicación', en: 'Send Application', pt: 'Enviar Candidatura' },
      errors: {
        required: { es: 'Por favor, complete los campos obligatorios: Nombre, Email y CV.', en: 'Please complete the required fields: Name, Email and CV.', pt: 'Por favor, preencha os campos obrigatórios: Nome, E-mail e Currículo.' }
      },
      success: { es: '¡Gracias por tu interés! Hemos recibido tu aplicación y la revisaremos pronto.', en: 'Thank you for your interest! We have received your application and will review it soon.', pt: 'Obrigado pelo seu interesse! Recebemos sua candidatura e a analisaremos em breve.' }
    }
  },

  // Páginas legales
  legal: {
    privacyPolicy: {
      title: { es: 'Política de Privacidad', en: 'Privacy Policy', pt: 'Política de Privacidade' },
      subtitle: { 
        es: 'Su privacidad es importante para nosotros. Conozca cómo gestionamos sus datos.',
        en: 'Your privacy is important to us. Learn how we manage your data.',
        pt: 'Sua privacidade é importante para nós. Saiba como gerenciamos seus dados.'
      },
      breadcrumb: { es: 'Política de Privacidad', en: 'Privacy Policy', pt: 'Política de Privacidade' },
      commitment: {
        title: { es: 'Compromiso con la Privacidad', en: 'Privacy Commitment', pt: 'Compromisso com a Privacidade' },
        content: { 
          es: 'En PRILABSA, protegemos sus datos personales con los más altos estándares de seguridad y transparencia, cumpliendo con toda la normativa aplicable en materia de protección de datos.',
          en: 'At PRILABSA, we protect your personal data with the highest standards of security and transparency, complying with all applicable data protection regulations.',
          pt: 'Na PRILABSA, protegemos seus dados pessoais com os mais altos padrões de segurança e transparência, cumprindo com toda a regulamentação aplicável em matéria de proteção de dados.'
        }
      },
      sections: {
        section1: {
          number: { es: '1', en: '1', pt: '1' },
          heading: { 
            es: '¿QUIÉN ES EL RESPONSABLE DEL TRATAMIENTO DE SUS DATOS?',
            en: 'WHO IS RESPONSIBLE FOR PROCESSING YOUR DATA?',
            pt: 'QUEM É RESPONSÁVEL PELO TRATAMENTO DE SEUS DADOS?'
          },
          content: { 
            es: 'El responsable del tratamiento de los datos personales recogidos en este sitio web es <strong>PRIME LABORATORIO PRILAB SA</strong>, con RUC <strong>0991316043001</strong> y domicilio en <strong>AV. CARLOS JULIO AROSEMENA KM 2.5 VIA DAULE C.C. ALBAN BORJA PLANTA BAJA LOCAL 055 TARQUI, GUAYAQUIL, GUAYAS - ECUADOR</strong>.',
            en: 'The data controller for personal data collected on this website is <strong>PRIME LABORATORIO PRILAB SA</strong>, with RUC <strong>0991316043001</strong> and address at <strong>AV. CARLOS JULIO AROSEMENA KM 2.5 VIA DAULE C.C. ALBAN BORJA PLANTA BAJA LOCAL 055 TARQUI, GUAYAQUIL, GUAYAS - ECUADOR</strong>.',
            pt: 'O responsável pelo tratamento dos dados pessoais coletados neste site é <strong>PRIME LABORATORIO PRILAB SA</strong>, com RUC <strong>0991316043001</strong> e endereço em <strong>AV. CARLOS JULIO AROSEMENA KM 2.5 VIA DAULE C.C. ALBAN BORJA PLANTA BAJA LOCAL 055 TARQUI, GUAYAQUIL, GUAYAS - ECUADOR</strong>.'
          }
        },
        section2: {
          number: { es: '2', en: '2', pt: '2' },
          heading: { 
            es: '¿CON QUÉ FINALIDAD TRATAMOS SUS DATOS PERSONALES?',
            en: 'FOR WHAT PURPOSE DO WE PROCESS YOUR PERSONAL DATA?',
            pt: 'COM QUE FINALIDADE TRATAMOS SEUS DADOS PESSOAIS?'
          },
          content: { 
            es: 'En PRILABSA tratamos la información que nos facilita con el fin de gestionar la relación contractual o comercial, gestionar el envío de la información que nos solicita, facilitar a los interesados ofertas de nuestros servicios y/o productos de su interés y/o gestionar su candidatura.',
            en: 'At PRILABSA we process the information you provide to us in order to manage the contractual or commercial relationship, manage the sending of information you request, provide interested parties with offers of our services and/or products of interest and/or manage your application.',
            pt: 'Na PRILABSA tratamos as informações que você nos fornece com o objetivo de gerenciar a relação contratual ou comercial, gerenciar o envio das informações que você solicita, fornecer aos interessados ofertas de nossos serviços e/ou produtos de seu interesse e/ou gerenciar sua candidatura.'
          },
          subcontent: { 
            es: 'Específicamente, sus datos serán tratados para:',
            en: 'Specifically, your data will be processed for:',
            pt: 'Especificamente, seus dados serão tratados para:'
          },
          purposes: {
            contact: {
              title: { es: 'Formulario de Contacto', en: 'Contact Form', pt: 'Formulário de Contato' },
              description: { 
                es: 'Responder a sus consultas, solicitudes o peticiones relacionadas con nuestros productos acuícolas y servicios de laboratorio.',
                en: 'Respond to your inquiries, requests or petitions related to our aquaculture products and laboratory services.',
                pt: 'Responder às suas consultas, solicitações ou petições relacionadas aos nossos produtos aquícolas e serviços de laboratório.'
              }
            },
            careers: {
              title: { es: 'Trabaja con Nosotros', en: 'Work with Us', pt: 'Trabalhe Conosco' },
              description: { 
                es: 'Gestionar su proceso de selección y valorar su candidatura para actuales o futuros puestos de trabajo en el sector acuícola.',
                en: 'Manage your selection process and evaluate your application for current or future job positions in the aquaculture sector.',
                pt: 'Gerenciar seu processo de seleção e avaliar sua candidatura para posições de trabalho atuais ou futuras no setor aquícola.'
              }
            },
            newsletter: {
              title: { es: 'Suscripción a Newsletter', en: 'Newsletter Subscription', pt: 'Assinatura de Newsletter' },
              description: { 
                es: 'Enviarle comunicaciones comerciales, novedades técnicas o promociones de nuestros productos y servicios especializados en acuicultura.',
                en: 'Send you commercial communications, technical news or promotions of our products and services specialized in aquaculture.',
                pt: 'Enviar-lhe comunicações comerciais, novidades técnicas ou promoções de nossos produtos e serviços especializados em aquicultura.'
              }
            },
            quotes: {
              title: { es: 'Solicitudes de Cotización', en: 'Quote Requests', pt: 'Solicitações de Cotação' },
              description: { 
                es: 'Procesar sus requerimientos de productos para acuicultura y generar propuestas comerciales personalizadas.',
                en: 'Process your aquaculture product requirements and generate personalized commercial proposals.',
                pt: 'Processar seus requisitos de produtos para aquicultura e gerar propostas comerciais personalizadas.'
              }
            }
          }
        },
        section3: {
          number: { es: '3', en: '3', pt: '3' },
          heading: { 
            es: '¿CUÁL ES LA LEGITIMACIÓN PARA EL TRATAMIENTO DE SUS DATOS?',
            en: 'WHAT IS THE LEGAL BASIS FOR PROCESSING YOUR DATA?',
            pt: 'QUAL É A BASE LEGAL PARA O TRATAMENTO DE SEUS DADOS?'
          },
          content: { 
            es: 'La base legal para el tratamiento de sus datos es su <strong>consentimiento explícito</strong>, que otorga al marcar la casilla de aceptación correspondiente antes de enviar cualquier formulario.',
            en: 'The legal basis for processing your data is your <strong>explicit consent</strong>, which you grant by checking the corresponding acceptance box before submitting any form.',
            pt: 'A base legal para o tratamento de seus dados é seu <strong>consentimento explícito</strong>, que você concede ao marcar a caixa de aceitação correspondente antes de enviar qualquer formulário.'
          },
          warning: { 
            es: '<strong>Importante:</strong> Puede retirar su consentimiento en cualquier momento, sin que ello afecte a la licitud del tratamiento basado en el consentimiento previo a su retirada.',
            en: '<strong>Important:</strong> You can withdraw your consent at any time, without affecting the lawfulness of processing based on consent prior to its withdrawal.',
            pt: '<strong>Importante:</strong> Você pode retirar seu consentimento a qualquer momento, sem afetar a legalidade do tratamento baseado no consentimento anterior à sua retirada.'
          }
        },
        section4: {
          number: { es: '4', en: '4', pt: '4' },
          heading: { 
            es: '¿A QUÉ DESTINATARIOS SE COMUNICARÁN SUS DATOS?',
            en: 'TO WHICH RECIPIENTS WILL YOUR DATA BE COMMUNICATED?',
            pt: 'A QUAIS DESTINATÁRIOS SEUS DADOS SERÃO COMUNICADOS?'
          },
          content: { 
            es: 'PRILABSA no cederá sus datos a terceros, salvo obligación legal. Para el envío de newsletters y comunicaciones comerciales, es posible que utilicemos servicios de terceros (como Mailchimp, Brevo, etc.) que actuarán como encargados del tratamiento, con quienes se ha suscrito el correspondiente contrato de confidencialidad y protección de datos.',
            en: 'PRILABSA will not transfer your data to third parties, except for legal obligation. For sending newsletters and commercial communications, we may use third-party services (such as Mailchimp, Brevo, etc.) that will act as data processors, with whom the corresponding confidentiality and data protection contract has been signed.',
            pt: 'A PRILABSA não cederá seus dados a terceiros, exceto por obrigação legal. Para o envio de newsletters e comunicações comerciais, podemos usar serviços de terceiros (como Mailchimp, Brevo, etc.) que atuarão como processadores de dados, com quem foi assinado o correspondente contrato de confidencialidade e proteção de dados.'
          }
        },
        section5: {
          number: { es: '5', en: '5', pt: '5' },
          heading: { 
            es: '¿POR CUÁNTO TIEMPO CONSERVAREMOS SUS DATOS?',
            en: 'HOW LONG WILL WE KEEP YOUR DATA?',
            pt: 'POR QUANTO TEMPO MANTEREMOS SEUS DADOS?'
          },
          content: { 
            es: 'Los datos se conservarán mientras se mantenga la relación comercial o durante los años necesarios para cumplir con las obligaciones legales. En el caso de los currículums, se conservarán por un plazo máximo de un año para futuros procesos de selección.',
            en: 'Data will be kept as long as the commercial relationship is maintained or for the years necessary to comply with legal obligations. In the case of resumes, they will be kept for a maximum period of one year for future selection processes.',
            pt: 'Os dados serão mantidos enquanto a relação comercial for mantida ou pelos anos necessários para cumprir as obrigações legais. No caso de currículos, serão mantidos por um período máximo de um ano para futuros processos de seleção.'
          }
        },
        section6: {
          number: { es: '6', en: '6', pt: '6' },
          heading: { 
            es: '¿CUÁLES SON SUS DERECHOS CUANDO NOS FACILITA SUS DATOS?',
            en: 'WHAT ARE YOUR RIGHTS WHEN YOU PROVIDE US WITH YOUR DATA?',
            pt: 'QUAIS SÃO SEUS DIREITOS QUANDO VOCÊ NOS FORNECE SEUS DADOS?'
          },
          content: { 
            es: 'Usted tiene derecho a obtener confirmación sobre si en PRILABSA estamos tratando sus datos personales. Como titular de los datos, tiene derecho a acceder a sus datos personales, así como a solicitar la rectificación de los datos inexactos o, en su caso, solicitar su supresión cuando, entre otros motivos, los datos ya no sean necesarios para los fines que fueron recogidos.',
            en: 'You have the right to obtain confirmation about whether PRILABSA is processing your personal data. As the data subject, you have the right to access your personal data, as well as to request the rectification of inaccurate data or, where appropriate, request its deletion when, among other reasons, the data is no longer necessary for the purposes for which it was collected.',
            pt: 'Você tem o direito de obter confirmação sobre se a PRILABSA está processando seus dados pessoais. Como titular dos dados, você tem o direito de acessar seus dados pessoais, bem como solicitar a retificação de dados imprecisos ou, quando apropriado, solicitar sua exclusão quando, entre outros motivos, os dados não forem mais necessários para os fins para os quais foram coletados.'
          },
          contact: {
            title: { es: 'Para ejercer sus derechos:', en: 'To exercise your rights:', pt: 'Para exercer seus direitos:' },
            content: { 
              es: 'Puede dirigir una comunicación por escrito al domicilio social de PRILABSA o a la dirección de correo electrónico <strong>protecciondedatos@cofimar.com.ec</strong>, incluyendo en ambos casos fotocopia de su DNI o cédula de identidad.',
              en: 'You can send a written communication to the registered office of PRILABSA or to the email address <strong>protecciondedatos@cofimar.com.ec</strong>, including in both cases a photocopy of your ID or identity card.',
              pt: 'Você pode enviar uma comunicação por escrito para o endereço registrado da PRILABSA ou para o endereço de e-mail <strong>protecciondedatos@cofimar.com.ec</strong>, incluindo em ambos os casos uma fotocópia de seu documento de identidade.'
            }
          }
        },
        section7: {
          number: { es: '7', en: '7', pt: '7' },
          heading: { 
            es: '¿CÓMO HEMOS OBTENIDO SUS DATOS?',
            en: 'HOW HAVE WE OBTAINED YOUR DATA?',
            pt: 'COMO OBTIVEMOS SEUS DADOS?'
          },
          content: { 
            es: 'Los datos personales que tratamos en PRILABSA proceden directamente de usted a través de los formularios habilitados en el sitio web prilabsa.com.',
            en: 'The personal data we process at PRILABSA comes directly from you through the forms enabled on the prilabsa.com website.',
            pt: 'Os dados pessoais que processamos na PRILABSA vêm diretamente de você através dos formulários habilitados no site prilabsa.com.'
          },
          categories: { 
            es: '<strong>Las categorías de datos que se tratan son:</strong> Datos de identificación, direcciones postales o electrónicas, información comercial. No se tratan datos especialmente protegidos.',
            en: '<strong>The categories of data that are processed are:</strong> Identification data, postal or electronic addresses, commercial information. No specially protected data is processed.',
            pt: '<strong>As categorias de dados que são processados são:</strong> Dados de identificação, endereços postais ou eletrônicos, informações comerciais. Nenhum dado especialmente protegido é processado.'
          }
        }
      },
      lastUpdate: { 
        es: 'Última actualización: 31 de julio de 2025',
        en: 'Last updated: July 31, 2025',
        pt: 'Última atualização: 31 de julho de 2025'
      }
    },
    legalNotice: {
       title: { es: 'Aviso Legal', en: 'Legal Notice', pt: 'Aviso Legal' },
       subtitle: { 
         es: 'Información legal sobre el uso de este sitio web y nuestros servicios.',
         en: 'Legal information about the use of this website and our services.',
         pt: 'Informações legais sobre o uso deste site e nossos serviços.'
       },
       breadcrumb: { es: 'Aviso Legal', en: 'Legal Notice', pt: 'Aviso Legal' },
       sections: {
         section1: {
           number: { es: '1', en: '1', pt: '1' },
           heading: { 
             es: 'DATOS IDENTIFICATIVOS',
             en: 'IDENTIFICATION DATA',
             pt: 'DADOS DE IDENTIFICAÇÃO'
           },
           content: { 
             es: 'En cumplimiento con el deber de información recogido en artículo 10 de la Ley 34/2002, de 11 de julio, de Servicios de la Sociedad de la Información y del Comercio Electrónico, a continuación se reflejan los siguientes datos: la empresa titular de este sitio web es <strong>PRIME LABORATORIO PRILAB SA</strong>, con domicilio en <strong>AV. CARLOS JULIO AROSEMENA KM 2.5 VIA DAULE C.C. ALBAN BORJA PLANTA BAJA LOCAL 055 TARQUI, GUAYAQUIL, GUAYAS - ECUADOR</strong> y RUC <strong>0991316043001</strong>.',
             en: 'In compliance with the duty of information contained in article 10 of Law 34/2002, of July 11, on Information Society Services and Electronic Commerce, the following data is reflected below: the company that owns this website is <strong>PRIME LABORATORIO PRILAB SA</strong>, with address at <strong>AV. CARLOS JULIO AROSEMENA KM 2.5 VIA DAULE C.C. ALBAN BORJA PLANTA BAJA LOCAL 055 TARQUI, GUAYAQUIL, GUAYAS - ECUADOR</strong> and RUC <strong>0991316043001</strong>.',
             pt: 'Em cumprimento ao dever de informação contido no artigo 10 da Lei 34/2002, de 11 de julho, sobre Serviços da Sociedade da Informação e Comércio Eletrônico, os seguintes dados são refletidos abaixo: a empresa proprietária deste site é <strong>PRIME LABORATORIO PRILAB SA</strong>, com endereço em <strong>AV. CARLOS JULIO AROSEMENA KM 2.5 VIA DAULE C.C. ALBAN BORJA PLANTA BAJA LOCAL 055 TARQUI, GUAYAQUIL, GUAYAS - ECUADOR</strong> e RUC <strong>0991316043001</strong>.'
           }
         },
         section2: {
           number: { es: '2', en: '2', pt: '2' },
           heading: { 
             es: 'OBJETO',
             en: 'PURPOSE',
             pt: 'OBJETIVO'
           },
           content: { 
             es: 'PRILABSA tiene por objeto facilitar al público, en general, el conocimiento de las actividades que esta organización realiza y de los servicios que presta en el sector de la acuicultura, todo ello a través de este sitio web.',
             en: 'PRILABSA aims to provide the general public with knowledge of the activities that this organization carries out and the services it provides in the aquaculture sector, all through this website.',
             pt: 'A PRILABSA tem como objetivo fornecer ao público em geral o conhecimento das atividades que esta organização realiza e dos serviços que presta no setor da aquicultura, tudo através deste site.'
           }
         },
         section3: {
           number: { es: '3', en: '3', pt: '3' },
           heading: { 
             es: 'CONDICIONES DE ACCESO Y USO',
             en: 'ACCESS AND USE CONDITIONS',
             pt: 'CONDIÇÕES DE ACESSO E USO'
           },
           content: { 
             es: 'El sitio web de PRILABSA proporciona el acceso a multitud de informaciones, servicios, programas o datos (en adelante, "los contenidos") en Internet pertenecientes a PRILABSA o a sus licenciantes a los que el USUARIO pueda tener acceso. El USUARIO asume la responsabilidad del uso del portal. Dicha responsabilidad se extiende al registro que fuese necesario para acceder a determinados servicios o contenidos.',
             en: 'The PRILABSA website provides access to a multitude of information, services, programs or data (hereinafter, "the contents") on the Internet belonging to PRILABSA or its licensors to which the USER may have access. The USER assumes responsibility for the use of the portal. Such responsibility extends to the registration that may be necessary to access certain services or contents.',
             pt: 'O site da PRILABSA fornece acesso a uma multidão de informações, serviços, programas ou dados (doravante, "os conteúdos") na Internet pertencentes à PRILABSA ou seus licenciadores aos quais o USUÁRIO pode ter acesso. O USUÁRIO assume a responsabilidade pelo uso do portal. Tal responsabilidade se estende ao registro que possa ser necessário para acessar determinados serviços ou conteúdos.'
           }
         },
         section4: {
           number: { es: '4', en: '4', pt: '4' },
           heading: { 
             es: 'RESPONSABILIDAD',
             en: 'RESPONSIBILITY',
             pt: 'RESPONSABILIDADE'
           },
           content: { 
             es: 'PRILABSA no se responsabiliza, en ningún caso, de los daños y perjuicios de cualquier naturaleza que pudieran ocasionar, a título enunciativo: errores u omisiones en los contenidos, falta de disponibilidad del portal o la transmisión de virus o programas maliciosos o lesivos en los contenidos, a pesar de haber adoptado todas las medidas tecnológicas necesarias para evitarlo.',
             en: 'PRILABSA is not responsible, in any case, for damages of any nature that could be caused, by way of example: errors or omissions in the contents, lack of availability of the portal or the transmission of viruses or malicious or harmful programs in the contents, despite having adopted all the necessary technological measures to avoid it.',
             pt: 'A PRILABSA não é responsável, em nenhum caso, por danos de qualquer natureza que possam ser causados, a título exemplificativo: erros ou omissões nos conteúdos, falta de disponibilidade do portal ou transmissão de vírus ou programas maliciosos ou prejudiciais nos conteúdos, apesar de ter adotado todas as medidas tecnológicas necessárias para evitá-lo.'
           }
         },
         section5: {
           number: { es: '5', en: '5', pt: '5' },
           heading: { 
             es: 'MODIFICACIONES',
             en: 'MODIFICATIONS',
             pt: 'MODIFICAÇÕES'
           },
           content: { 
             es: 'PRILABSA se reserva el derecho de efectuar sin previo aviso las modificaciones que considere oportunas en su portal, pudiendo cambiar, suprimir o añadir tanto los contenidos y servicios que se presten a través de la misma como la forma en la que éstos aparezcan presentados o localizados en su portal.',
             en: 'PRILABSA reserves the right to make without prior notice the modifications it deems appropriate on its portal, being able to change, delete or add both the contents and services provided through it as well as the way in which they appear presented or located on its portal.',
             pt: 'A PRILABSA reserva-se o direito de fazer sem aviso prévio as modificações que considere apropriadas em seu portal, podendo alterar, excluir ou adicionar tanto os conteúdos e serviços fornecidos através dele, bem como a forma como eles aparecem apresentados ou localizados em seu portal.'
           }
         },
         section6: {
           number: { es: '6', en: '6', pt: '6' },
           heading: { 
             es: 'ENLACES',
             en: 'LINKS',
             pt: 'LINKS'
           },
           content: { 
             es: 'En el caso de que en el sitio web se dispusiesen enlaces o hipervínculos hacía otros sitios de Internet, PRILABSA no ejercerá ningún tipo de control sobre dichos sitios y contenidos. En ningún caso PRILABSA asumirá responsabilidad alguna por los contenidos de algún enlace perteneciente a un sitio web ajeno, ni garantizará la disponibilidad técnica, calidad, fiabilidad, exactitud, amplitud, veracidad, validez y constitucionalidad de cualquier material o información contenida en ninguno de dichos hipervínculos u otros sitios de Internet.',
             en: 'In the event that the website has links or hyperlinks to other Internet sites, PRILABSA will not exercise any type of control over such sites and contents. In no case will PRILABSA assume any responsibility for the contents of any link belonging to a third-party website, nor will it guarantee the technical availability, quality, reliability, accuracy, breadth, veracity, validity and constitutionality of any material or information contained in any of said hyperlinks or other Internet sites.',
             pt: 'No caso de o site ter links ou hiperlinks para outros sites da Internet, a PRILABSA não exercerá nenhum tipo de controle sobre tais sites e conteúdos. Em nenhum caso a PRILABSA assumirá qualquer responsabilidade pelos conteúdos de qualquer link pertencente a um site de terceiros, nem garantirá a disponibilidade técnica, qualidade, confiabilidade, precisão, amplitude, veracidade, validade e constitucionalidade de qualquer material ou informação contida em qualquer um dos referidos hiperlinks ou outros sites da Internet.'
           }
         },
         section7: {
           number: { es: '7', en: '7', pt: '7' },
           heading: { 
             es: 'DERECHO DE EXCLUSIÓN',
             en: 'RIGHT OF EXCLUSION',
             pt: 'DIREITO DE EXCLUSÃO'
           },
           content: { 
             es: 'PRILABSA se reserva el derecho a denegar o retirar el acceso a portal y/o los servicios ofrecidos sin previo aviso, a instancia propia o de un tercero, a aquellos usuarios que incumplan las presentes Condiciones Generales de Uso.',
             en: 'PRILABSA reserves the right to deny or withdraw access to the portal and/or the services offered without prior notice, at its own instance or that of a third party, to those users who breach these General Terms of Use.',
             pt: 'A PRILABSA reserva-se o direito de negar ou retirar o acesso ao portal e/ou aos serviços oferecidos sem aviso prévio, por sua própria iniciativa ou de terceiros, àqueles usuários que violem estes Termos Gerais de Uso.'
           }
         }
       },
       lastUpdate: { 
         es: 'Última actualización: 31 de julio de 2025',
         en: 'Last updated: July 31, 2025',
         pt: 'Última atualização: 31 de julho de 2025'
       },
       company: {
         label: { es: 'Empresa:', en: 'Company:', pt: 'Empresa:' },
         name: { es: 'PRIME LABORATORIO PRILAB SA', en: 'PRIME LABORATORIO PRILAB SA', pt: 'PRIME LABORATORIO PRILAB SA' }
       },
       address: {
         label: { es: 'Dirección:', en: 'Address:', pt: 'Endereço:' },
         full: { es: 'AV. CARLOS JULIO AROSEMENA KM 2.5 VIA DAULE C.C. ALBAN BORJA PLANTA BAJA LOCAL 055 TARQUI, GUAYAQUIL, GUAYAS - ECUADOR', en: 'AV. CARLOS JULIO AROSEMENA KM 2.5 VIA DAULE C.C. ALBAN BORJA PLANTA BAJA LOCAL 055 TARQUI, GUAYAQUIL, GUAYAS - ECUADOR', pt: 'AV. CARLOS JULIO AROSEMENA KM 2.5 VIA DAULE C.C. ALBAN BORJA PLANTA BAJA LOCAL 055 TARQUI, GUAYAQUIL, GUAYAS - ECUADOR' }
       },
     },
     cookiePolicy: {
       title: { es: 'Política de Cookies', en: 'Cookie Policy', pt: 'Política de Cookies' },
       cookieWarningWorking: { 
         es: '⚠️ Si decide desactivar las cookies, es posible que algunas funcionalidades de nuestro sitio web no operen correctamente.', 
         en: '⚠️ If you decide to disable cookies, some functionalities of our website may not operate correctly.', 
         pt: '⚠️ Se você decidir desativar os cookies, algumas funcionalidades do nosso site podem não operar corretamente.' 
       },
       subtitle: { 
         es: 'Información sobre el uso de cookies en nuestro sitio web.',
         en: 'Information about the use of cookies on our website.',
         pt: 'Informações sobre o uso de cookies em nosso site.'
       },
       breadcrumb: { es: 'Política de Cookies', en: 'Cookie Policy', pt: 'Política de Cookies' },
       sections: {
         section1: {
           number: { es: '1', en: '1', pt: '1' },
           heading: { 
             es: '¿QUÉ SON LAS COOKIES?',
             en: 'WHAT ARE COOKIES?',
             pt: 'O QUE SÃO COOKIES?'
           },
           content: { 
             es: 'Las cookies son archivos que se pueden descargar en su equipo a través de las páginas web. Son herramientas que tienen un papel esencial para la prestación de numerosos servicios de la sociedad de la información. Entre otros, permiten a una página web almacenar y recuperar información sobre los hábitos de navegación de un usuario o de su equipo y, dependiendo de la información obtenida, se pueden utilizar para reconocer al usuario y mejorar el servicio ofrecido.',
             en: 'Cookies are files that can be downloaded to your device through web pages. They are tools that play an essential role in providing numerous information society services. Among others, they allow a website to store and retrieve information about the browsing habits of a user or their device and, depending on the information obtained, can be used to recognize the user and improve the service offered.',
             pt: 'Cookies são arquivos que podem ser baixados para seu dispositivo através de páginas web. São ferramentas que desempenham um papel essencial na prestação de numerosos serviços da sociedade da informação. Entre outros, permitem que um site armazene e recupere informações sobre os hábitos de navegação de um usuário ou de seu dispositivo e, dependendo das informações obtidas, podem ser usados para reconhecer o usuário e melhorar o serviço oferecido.'
           }
         },
         section2: {
           number: { es: '2', en: '2', pt: '2' },
           heading: { 
             es: 'TIPOS DE COOKIES',
             en: 'TYPES OF COOKIES',
             pt: 'TIPOS DE COOKIES'
           },
           content: { 
             es: 'Según quien sea la entidad que gestione el dominio desde donde se envían las cookies y trate los datos que se obtengan se pueden distinguir dos tipos: cookies propias y cookies de terceros.',
             en: 'Depending on who is the entity that manages the domain from which cookies are sent and processes the data obtained, two types can be distinguished: own cookies and third-party cookies.',
             pt: 'Dependendo de quem é a entidade que gerencia o domínio de onde os cookies são enviados e processa os dados obtidos, dois tipos podem ser distinguidos: cookies próprios e cookies de terceiros.'
           }
         },
         section3: {
           number: { es: '3', en: '3', pt: '3' },
           heading: { 
             es: 'COOKIES UTILIZADAS EN ESTE SITIO WEB',
             en: 'COOKIES USED ON THIS WEBSITE',
             pt: 'COOKIES UTILIZADOS NESTE SITE'
           },
           content: { 
             es: 'A continuación se identifican las cookies que están siendo utilizadas en este portal así como su tipología y función:',
             en: 'Below are identified the cookies that are being used on this portal as well as their typology and function:',
             pt: 'Abaixo são identificados os cookies que estão sendo usados neste portal, bem como sua tipologia e função:'
           }
         },
         section4: {
           number: { es: '4', en: '4', pt: '4' },
           heading: { 
             es: 'ACEPTACIÓN DE LA POLÍTICA DE COOKIES',
             en: 'ACCEPTANCE OF THE COOKIE POLICY',
             pt: 'ACEITAÇÃO DA POLÍTICA DE COOKIES'
           },
           content: { 
             es: 'PRILABSA muestra información sobre su Política de cookies en el banner de cookies accesible en todas las páginas del sitio web. Ante esta información es posible llevar a cabo las siguientes acciones:',
             en: 'PRILABSA displays information about its Cookie Policy in the cookie banner accessible on all pages of the website. Given this information, it is possible to carry out the following actions:',
             pt: 'A PRILABSA exibe informações sobre sua Política de Cookies no banner de cookies acessível em todas as páginas do site. Diante dessas informações, é possível realizar as seguintes ações:'
           }
         },
         section5: {
           number: { es: '5', en: '5', pt: '5' },
           heading: { 
             es: 'CÓMO MODIFICAR LA CONFIGURACIÓN DE LAS COOKIES',
             en: 'HOW TO MODIFY COOKIE SETTINGS',
             pt: 'COMO MODIFICAR AS CONFIGURAÇÕES DE COOKIES'
           },
           content: { 
             es: 'Usted puede restringir, bloquear o borrar las cookies de PRILABSA o cualquier otra página web, utilizando su navegador. En cada navegador la operación es diferente, la función de "Ayuda" le permitirá conocer cómo hacerlo:',
             en: 'You can restrict, block or delete cookies from PRILABSA or any other website, using your browser. In each browser the operation is different, the "Help" function will allow you to know how to do it:',
             pt: 'Você pode restringir, bloquear ou excluir cookies da PRILABSA ou qualquer outro site, usando seu navegador. Em cada navegador a operação é diferente, a função "Ajuda" permitirá que você saiba como fazê-lo:'
           }
         }
       },
       lastUpdate: { 
         es: 'Última actualización: 31 de julio de 2025',
         en: 'Last updated: July 31, 2025',
         pt: 'Última atualização: 31 de julho de 2025'
       }
     },
     termsAndConditions: {
       title: { es: 'Términos y Condiciones', en: 'Terms and Conditions', pt: 'Termos e Condições' },
       subtitle: { 
         es: 'Términos de Uso del Sitio Web',
         en: 'Website Terms of Use',
         pt: 'Termos de Uso do Site'
       },
       breadcrumb: { es: 'Términos y Condiciones', en: 'Terms and Conditions', pt: 'Termos e Condições' },
       introduction: {
         es: 'Los presentes términos y condiciones de uso (en adelante, las "Condiciones") regulan el acceso y la utilización del sitio web prilabsa.com (en adelante, el "Sitio Web"), del que es titular PRIME LABORATORIO PRILAB SA (en adelante, "PRILABSA").',
         en: 'These terms and conditions of use (hereinafter, the "Conditions") regulate access to and use of the prilabsa.com website (hereinafter, the "Website"), which is owned by PRIME LABORATORIO PRILAB SA (hereinafter, "PRILABSA").',
         pt: 'Estes termos e condições de uso (doravante, as "Condições") regulam o acesso e uso do site prilabsa.com (doravante, o "Site"), que é propriedade da PRIME LABORATORIO PRILAB SA (doravante, "PRILABSA").'
       },
       sections: {
         section1: {
           number: { es: '1', en: '1', pt: '1' },
           heading: { 
             es: 'ACEPTACIÓN DE LOS TÉRMINOS',
             en: 'ACCEPTANCE OF TERMS',
             pt: 'ACEITAÇÃO DOS TERMOS'
           },
           content: { 
             es: 'El acceso y uso del Sitio Web implica la aceptación expresa y sin reservas de estas Condiciones en la versión publicada en el momento en que el usuario acceda al mismo. Si no está de acuerdo con estas Condiciones, no debe utilizar este Sitio Web.',
             en: 'Access to and use of the Website implies express and unreserved acceptance of these Conditions in the version published at the time the user accesses it. If you do not agree with these Conditions, you should not use this Website.',
             pt: 'O acesso e uso do Site implica aceitação expressa e sem reservas destas Condições na versão publicada no momento em que o usuário o acessa. Se você não concorda com estas Condições, não deve usar este Site.'
           }
         },
         section2: {
           number: { es: '2', en: '2', pt: '2' },
           heading: { 
             es: 'OBJETO',
             en: 'PURPOSE',
             pt: 'OBJETIVO'
           },
           content: { 
             es: 'El Sitio Web tiene por objeto facilitar al público el conocimiento de las actividades que PRILABSA realiza y de los servicios que presta, especialmente en el sector de la acuicultura y análisis de laboratorio.',
             en: 'The Website aims to provide the public with knowledge of the activities that PRILABSA carries out and the services it provides, especially in the aquaculture and laboratory analysis sector.',
             pt: 'O Site tem como objetivo fornecer ao público o conhecimento das atividades que a PRILABSA realiza e dos serviços que presta, especialmente no setor de aquicultura e análise laboratorial.'
           }
         },
         section3: {
           number: { es: '3', en: '3', pt: '3' },
           heading: { 
             es: 'CONDICIONES DE ACCESO Y USO',
             en: 'ACCESS AND USE CONDITIONS',
             pt: 'CONDIÇÕES DE ACESSO E USO'
           },
           content: { 
             es: 'El acceso al Sitio Web es gratuito salvo en lo relativo al coste de la conexión a través de la red de telecomunicaciones suministrada por el proveedor de acceso contratado por los usuarios. El uso del Sitio Web se realiza bajo la exclusiva responsabilidad del usuario.',
             en: 'Access to the Website is free except for the cost of connection through the telecommunications network provided by the access provider contracted by users. Use of the Website is carried out under the exclusive responsibility of the user.',
             pt: 'O acesso ao Site é gratuito, exceto pelo custo da conexão através da rede de telecomunicações fornecida pelo provedor de acesso contratado pelos usuários. O uso do Site é realizado sob a responsabilidade exclusiva do usuário.'
           }
         },
         section4: {
           number: { es: '4', en: '4', pt: '4' },
           heading: { 
             es: 'OBLIGACIONES DEL USUARIO',
             en: 'USER OBLIGATIONS',
             pt: 'OBRIGAÇÕES DO USUÁRIO'
           },
           content: { 
             es: 'El usuario se compromete a hacer un uso adecuado de los contenidos y servicios que PRILABSA ofrece a través de su Sitio Web y con carácter enunciativo pero no limitativo, a no emplearlos para incurrir en actividades ilícitas, ilegales o contrarias a la buena fe y al orden público.',
             en: 'The user undertakes to make appropriate use of the contents and services that PRILABSA offers through its Website and, by way of example but not limitation, not to use them to engage in illicit, illegal activities or activities contrary to good faith and public order.',
             pt: 'O usuário se compromete a fazer uso adequado dos conteúdos e serviços que a PRILABSA oferece através de seu Site e, a título exemplificativo mas não limitativo, a não usá-los para se envolver em atividades ilícitas, ilegais ou contrárias à boa fé e ordem pública.'
           }
         },
         section5: {
           number: { es: '5', en: '5', pt: '5' },
           heading: { 
             es: 'PROCESO DE COTIZACIÓN',
             en: 'QUOTATION PROCESS',
             pt: 'PROCESSO DE COTIZAÇÃO'
           },
           content: { 
             es: 'Los usuarios pueden solicitar cotizaciones a través del Sitio Web. Las cotizaciones proporcionadas son estimativas y pueden estar sujetas a modificaciones según las especificaciones finales del servicio requerido. PRILABSA se reserva el derecho de aceptar o rechazar cualquier solicitud de cotización.',
             en: 'Users can request quotations through the Website. The quotations provided are estimates and may be subject to modifications according to the final specifications of the required service. PRILABSA reserves the right to accept or reject any quotation request.',
             pt: 'Os usuários podem solicitar cotações através do Site. As cotações fornecidas são estimativas e podem estar sujeitas a modificações de acordo com as especificações finais do serviço requerido. A PRILABSA reserva-se o direito de aceitar ou rejeitar qualquer solicitação de cotação.'
           }
         },
         section6: {
           number: { es: '6', en: '6', pt: '6' },
           heading: { 
             es: 'LIMITACIÓN DE RESPONSABILIDAD',
             en: 'LIMITATION OF LIABILITY',
             pt: 'LIMITAÇÃO DE RESPONSABILIDADE'
           },
           content: { 
             es: 'PRILABSA no será responsable de los daños y perjuicios de cualquier naturaleza que puedan deberse a la falta de disponibilidad o de continuidad del funcionamiento del Sitio Web, a la defraudación de la utilidad que los usuarios hubieren podido atribuir al Sitio Web, a la falibilidad del Sitio Web, y en particular, aunque no de modo exclusivo, a las fallas en el acceso a las distintas páginas web del Sitio Web o a aquellas desde las que se preste el servicio.',
             en: 'PRILABSA will not be responsible for damages of any nature that may be due to the lack of availability or continuity of operation of the Website, to the disappointment of the utility that users may have attributed to the Website, to the fallibility of the Website, and in particular, although not exclusively, to failures in access to the different web pages of the Website or to those from which the service is provided.',
             pt: 'A PRILABSA não será responsável por danos de qualquer natureza que possam ser devidos à falta de disponibilidade ou continuidade de operação do Site, à decepção da utilidade que os usuários possam ter atribuído ao Site, à falibilidade do Site, e em particular, embora não exclusivamente, a falhas no acesso às diferentes páginas web do Site ou àquelas a partir das quais o serviço é prestado.'
           }
         },
         section7: {
           number: { es: '7', en: '7', pt: '7' },
           heading: { 
             es: 'ENLACES',
             en: 'LINKS',
             pt: 'LINKS'
           },
           content: { 
             es: 'En el caso de que en el Sitio Web se dispusiesen enlaces o hipervínculos hacia otros sitios de Internet, PRILABSA no ejercerá ningún tipo de control sobre dichos sitios y contenidos. En ningún caso PRILABSA asumirá responsabilidad alguna por los contenidos de algún enlace perteneciente a un sitio web ajeno.',
             en: 'In the event that the Website has links or hyperlinks to other Internet sites, PRILABSA will not exercise any type of control over such sites and contents. In no case will PRILABSA assume any responsibility for the contents of any link belonging to a third-party website.',
             pt: 'No caso de o Site ter links ou hiperlinks para outros sites da Internet, a PRILABSA não exercerá nenhum tipo de controle sobre tais sites e conteúdos. Em nenhum caso a PRILABSA assumirá qualquer responsabilidade pelos conteúdos de qualquer link pertencente a um site de terceiros.'
           }
         },
         section8: {
           number: { es: '8', en: '8', pt: '8' },
           heading: { 
             es: 'NULIDAD DE CLÁUSULAS',
             en: 'NULLITY OF CLAUSES',
             pt: 'NULIDADE DE CLÁUSULAS'
           },
           content: { 
             es: 'Si cualquier cláusula de las presentes Condiciones fuese declarada nula, las demás cláusulas seguirán vigentes y se interpretarán teniendo en cuenta la voluntad de las partes y la finalidad de estas Condiciones. PRILABSA podrá no ejercitar alguno de los derechos y facultades conferidos en estas Condiciones, lo que no implicará en ningún caso la renuncia a los mismos salvo reconocimiento expreso por parte de PRILABSA.',
             en: 'If any clause of these Conditions were declared null, the other clauses will remain in force and will be interpreted taking into account the will of the parties and the purpose of these Conditions. PRILABSA may not exercise some of the rights and powers conferred in these Conditions, which will not imply in any case the waiver of them except express recognition by PRILABSA.',
             pt: 'Se qualquer cláusula destas Condições for declarada nula, as outras cláusulas permanecerão em vigor e serão interpretadas levando em conta a vontade das partes e o propósito destas Condições. A PRILABSA pode não exercer alguns dos direitos e poderes conferidos nestas Condições, o que não implicará em nenhum caso a renúncia aos mesmos, exceto reconhecimento expresso pela PRILABSA.'
           }
         }
       },
       lastUpdate: { 
         es: 'Última actualización: 31 de julio de 2025',
         en: 'Last updated: July 31, 2025',
         pt: 'Última atualização: 31 de julho de 2025'
       }
     }
   },

  // Cotización
  quotation: {
    title: { es: 'Cotización', en: 'Quotation', pt: 'Cotação' },
    pageTitle: { es: 'MI COTIZACIÓN', en: 'MY QUOTATION', pt: 'MINHA COTAÇÃO' },
    myQuote: { es: 'Mi Cotización', en: 'My Quotation', pt: 'Minha Cotação' },
    subtitle: { es: 'Revise los productos seleccionados y ajuste las cantidades antes de generar su solicitud.', en: 'Review selected products and adjust quantities before generating your request.', pt: 'Revise os produtos selecionados e ajuste as quantidades antes de gerar sua solicitação.' },
    emptyMessage: { es: 'Tu carrito de cotización está vacío', en: 'Your quotation cart is empty', pt: 'Seu carrinho de cotação está vazio' },
    emptyCart: { es: 'Su carrito de cotización está vacío', en: 'Your quotation cart is empty', pt: 'Seu carrinho de cotação está vazio' },
    exploreMessage: { es: 'Explore nuestro catálogo para encontrar los productos que necesita.', en: 'Explore our catalog to find the products you need.', pt: 'Explore nosso catálogo para encontrar os produtos que você precisa.' },
    addProduct: { es: 'Agregar producto', en: 'Add product', pt: 'Adicionar produto' },
    removeProduct: { es: 'Eliminar producto', en: 'Remove product', pt: 'Remover produto' },
    quantity: { es: 'Cantidad', en: 'Quantity', pt: 'Quantidade' },
    actions: { es: 'Acciones', en: 'Actions', pt: 'Ações' },
    product: { es: 'Producto', en: 'Product', pt: 'Produto' },
    unit: { es: 'Unidad', en: 'Unit', pt: 'Unidade' },
    notes: { es: 'Notas', en: 'Notes', pt: 'Notas' },
    requestQuote: { es: 'Solicitar cotización', en: 'Request quote', pt: 'Solicitar cotação' },
    clearCart: { es: 'Limpiar carrito', en: 'Clear cart', pt: 'Limpar carrinho' },
    clearQuotation: { es: 'Limpiar Cotización', en: 'Clear Quotation', pt: 'Limpar Cotação' },
    sendQuotation: { es: 'Enviar Cotización', en: 'Send Quotation', pt: 'Enviar Cotação' },
    totalProducts: { es: 'Total de Productos:', en: 'Total Products:', pt: 'Total de Produtos:' },
    total: { es: 'Total', en: 'Total', pt: 'Total' },
    subtotal: { es: 'Subtotal', en: 'Subtotal', pt: 'Subtotal' },
    tax: { es: 'Impuestos', en: 'Tax', pt: 'Impostos' },
    shipping: { es: 'Envío', en: 'Shipping', pt: 'Envio' },
    discount: { es: 'Descuento', en: 'Discount', pt: 'Desconto' },
    redirectMessage: { es: 'Será redirigido al inicio en breve.', en: 'You will be redirected to home shortly.', pt: 'Você será redirecionado para o início em breve.' },
    simulationNote: { es: 'El envío de email es solo una simulación. Para recibir cotizaciones reales, debe integrarse un backend (SMTP, Brevo, SendGrid, etc).', en: 'Email sending is just a simulation. To receive real quotations, a backend must be integrated (SMTP, Brevo, SendGrid, etc).', pt: 'O envio de e-mail é apenas uma simulação. Para receber cotações reais, um backend deve ser integrado (SMTP, Brevo, SendGrid, etc).' },
    logoError: { es: 'No se pudo cargar el logo para el PDF. La descarga estará deshabilitada.', en: 'Could not load logo for PDF. Download will be disabled.', pt: 'Não foi possível carregar o logo para o PDF. O download será desabilitado.' },
    loading: { es: 'Cargando...', en: 'Loading...', pt: 'Carregando...' },
    downloadPdf: { es: 'Descargar PDF', en: 'Download PDF', pt: 'Baixar PDF' },
    confirmSend: { es: 'Confirmar Envío', en: 'Confirm Send', pt: 'Confirmar Envio' },
    form: {
      title: { es: 'Información de contacto', en: 'Contact information', pt: 'Informações de contato' },
      name: { es: 'Nombre completo *', en: 'Full name *', pt: 'Nome completo *' },
      email: { es: 'Email *', en: 'Email *', pt: 'E-mail *' },
      phone: { es: 'Teléfono', en: 'Phone', pt: 'Telefone' },
      company: { es: 'Empresa *', en: 'Company *', pt: 'Empresa *' },
      agency: { es: 'Agencia de destino *', en: 'Destination agency *', pt: 'Agência de destino *' },
      selectAgency: { es: 'Seleccione una agencia', en: 'Select an agency', pt: 'Selecione uma agência' },
      additionalComments: { es: 'Comentarios adicionales', en: 'Additional comments', pt: 'Comentários adicionais' },
      message: { es: 'Mensaje adicional', en: 'Additional message', pt: 'Mensagem adicional' },
      submit: { es: 'Enviar cotización', en: 'Send quotation', pt: 'Enviar cotação' },
      submitting: { es: 'Enviando...', en: 'Sending...', pt: 'Enviando...' },
      success: { es: 'Se ha abierto su cliente de correo con la cotización prellenada. Por favor, revise y envíe el email.', en: 'Your email client has been opened with the pre-filled quotation. Please review and send the email.', pt: 'Seu cliente de e-mail foi aberto com a cotação pré-preenchida. Por favor, revise e envie o e-mail.' },
      error: { es: 'Por favor, complete todos los campos obligatorios.', en: 'Please complete all required fields.', pt: 'Por favor, preencha todos os campos obrigatórios.' },
      validationError: { es: 'Error al enviar la cotización', en: 'Error sending quotation', pt: 'Erro ao enviar cotação' }
    }
  },

  // Blog y Noticias
  blog: {
    title: { es: 'Blog', en: 'Blog', pt: 'Blog' },
    pageTitle: { es: 'BLOG PRILABSA', en: 'PRILABSA BLOG', pt: 'BLOG PRILABSA' },
    subtitle: { es: 'Noticias, tendencias y conocimiento para la industria acuícola', en: 'News, trends and knowledge for the aquaculture industry', pt: 'Notícias, tendências e conhecimento para a indústria aquícola' },
    search: {
      placeholder: { es: 'Buscar en el blog...', en: 'Search in blog...', pt: 'Buscar no blog...' }
    },
    readMore: { es: 'Leer más', en: 'Read more', pt: 'Ler mais' },
    readArticle: { es: 'Leer artículo', en: 'Read article', pt: 'Ler artigo' },
    articleNotFound: { es: 'Artículo no encontrado', en: 'Article not found', pt: 'Artigo não encontrado' },
    backToBlog: { es: 'Volver al blog', en: 'Back to blog', pt: 'Voltar ao blog' },
    relatedArticles: { es: 'Artículos relacionados', en: 'Related articles', pt: 'Artigos relacionados' },
    publishedOn: { es: 'Publicado el', en: 'Published on', pt: 'Publicado em' },
    by: { es: 'por', en: 'by', pt: 'por' },
    tags: { es: 'Etiquetas', en: 'Tags', pt: 'Tags' },
    shareArticle: { es: 'Compartir artículo', en: 'Share article', pt: 'Compartilhar artigo' },
    noArticles: { es: 'No hay artículos disponibles', en: 'No articles available', pt: 'Nenhum artigo disponível' }
  },
  news: {
    title: { es: 'Noticias', en: 'News', pt: 'Notícias' },
    pageTitle: { es: 'SALA DE PRENSA', en: 'PRESS ROOM', pt: 'SALA DE IMPRENSA' },
    subtitle: { es: 'Noticias, comunicados y eventos de Prilabsa', en: 'News, press releases and events from Prilabsa', pt: 'Notícias, comunicados e eventos da Prilabsa' },
    search: {
      placeholder: { es: 'Buscar en noticias...', en: 'Search in news...', pt: 'Buscar nas notícias...' }
    },
    readMore: { es: 'Leer más', en: 'Read more', pt: 'Ler mais' },
    readNews: { es: 'Leer noticia', en: 'Read news', pt: 'Ler notícia' },
    newsNotFound: { es: 'Noticia no encontrada', en: 'News not found', pt: 'Notícia não encontrada' },
    backToNews: { es: 'Volver a noticias', en: 'Back to news', pt: 'Voltar às notícias' },
    relatedNews: { es: 'Noticias relacionadas', en: 'Related news', pt: 'Notícias relacionadas' },
    publishedOn: { es: 'Publicado el', en: 'Published on', pt: 'Publicado em' },
    by: { es: 'por', en: 'by', pt: 'por' },
    tags: { es: 'Etiquetas', en: 'Tags', pt: 'Tags' },
    shareNews: { es: 'Compartir noticia', en: 'Share news', pt: 'Compartilhar notícia' },
    noNews: { es: 'No hay noticias disponibles', en: 'No news available', pt: 'Nenhuma notícia disponível' },
    archive: { es: 'Archivo', en: 'Archive', pt: 'Arquivo' },
    allNews: { es: 'Todas las noticias', en: 'All news', pt: 'Todas as notícias' }
  },

  // Mensajes comunes
  common: {
    loading: { es: 'Cargando...', en: 'Loading...', pt: 'Carregando...' },
    error: { es: 'Error', en: 'Error', pt: 'Erro' },
    success: { es: 'Éxito', en: 'Success', pt: 'Sucesso' },
    cancel: { es: 'Cancelar', en: 'Cancel', pt: 'Cancelar' },
    confirm: { es: 'Confirmar', en: 'Confirm', pt: 'Confirmar' },
    save: { es: 'Guardar', en: 'Save', pt: 'Salvar' },
    edit: { es: 'Editar', en: 'Edit', pt: 'Editar' },
    delete: { es: 'Eliminar', en: 'Delete', pt: 'Excluir' },
    back: { es: 'Volver', en: 'Back', pt: 'Voltar' },
    next: { es: 'Siguiente', en: 'Next', pt: 'Próximo' },
    previous: { es: 'Anterior', en: 'Previous', pt: 'Anterior' },
    seeMore: { es: 'Ver más', en: 'See more', pt: 'Ver mais' },
    viewAll: { es: 'Ver todos', en: 'View all', pt: 'Ver todos' },
    viewFullScale: { es: 'Ver escala completa', en: 'View full scale', pt: 'Ver escala completa' },
    viewTokens: { es: 'Ver Tokens', en: 'View Tokens', pt: 'Ver Tokens' },
    viewComponents: { es: 'Ver Componentes', en: 'View Components', pt: 'Ver Componentes' },
    downloadCSS: { es: 'Descargar CSS', en: 'Download CSS', pt: 'Baixar CSS' },
    exportCSS: { es: 'Exportar CSS', en: 'Export CSS', pt: 'Exportar CSS' },
    exploreTokens: { es: 'Explorar Tokens', en: 'Explore Tokens', pt: 'Explorar Tokens' },
    exploreComponents: { es: 'Explorar Componentes', en: 'Explore Components', pt: 'Explorar Componentes' },
    exportResources: { es: 'Exportar Recursos', en: 'Export Resources', pt: 'Exportar Recursos' },
    mainTitle: { es: 'Título Principal', en: 'Main Title', pt: 'Título Principal' },
    secondaryTitle: { es: 'Título Secundario', en: 'Secondary Title', pt: 'Título Secundário' },
    subtitle: { es: 'Subtítulo', en: 'Subtitle', pt: 'Subtítulo' },
    bodyText: { es: 'Texto del cuerpo principal para párrafos y contenido.', en: 'Main body text for paragraphs and content.', pt: 'Texto do corpo principal para parágrafos e conteúdo.' },
    featuredComponents: { es: 'Componentes Destacados', en: 'Featured Components', pt: 'Componentes Destacados' },
    typography: { es: 'Tipografía', en: 'Typography', pt: 'Tipografia' },
    projectStatus: { es: 'Estado del Proyecto', en: 'Project Status', pt: 'Status do Projeto' },
    completed: { es: '✅ Completado', en: '✅ Completed', pt: '✅ Concluído' },
    inProgress: { es: '🔄 En Progreso', en: '🔄 In Progress', pt: '🔄 Em Progresso' },
    preview: { es: 'Preview', en: 'Preview', pt: 'Visualizar' },
    code: { es: 'Código', en: 'Code', pt: 'Código' },
    search: {
      placeholder: { es: 'Buscar...', en: 'Search...', pt: 'Buscar...' }
    },
    more: { es: 'más', en: 'more', pt: 'mais' }
  }
} as const;

// Función para obtener traducción por clave
export const getTranslation = (key: string, language: Language): string => {
  try {
    const keys = key.split('.');
    let current: any = translations;
    
    for (const k of keys) {
      if (current[k] === undefined) {
        console.warn(`Translation key not found: ${key}`);
        return key; // Fallback: devolver la clave si no se encuentra
      }
      current = current[k];
    }
    
    if (typeof current === 'object' && current[language]) {
      return current[language];
    }
    
    console.warn(`Translation not found for key: ${key}, language: ${language}`);
    return key; // Fallback
  } catch (error) {
    console.error(`Error getting translation for key: ${key}`, error);
    return key; // Fallback
  }
};

// Función para validar que todas las claves tienen traducciones en todos los idiomas
export const validateTranslations = (): void => {
  if (process.env.NODE_ENV === 'development') {
    const checkObject = (obj: any, path: string = '') => {
      for (const [key, value] of Object.entries(obj)) {
        const currentPath = path ? `${path}.${key}` : key;
        
        if (typeof value === 'object' && value !== null) {
          if ('es' in value && 'en' in value && 'pt' in value) {
            // Es una hoja de traducción
            if (!value.es || !value.en || !value.pt) {
              console.warn(`Missing translation at ${currentPath}:`, value);
            }
          } else {
            // Es un objeto anidado
            checkObject(value, currentPath);
          }
        }
      }
    };
    
    checkObject(translations);
  }
};

// Exportar tanto el objeto translations como la función getTranslation
export { translations };
export default translations;