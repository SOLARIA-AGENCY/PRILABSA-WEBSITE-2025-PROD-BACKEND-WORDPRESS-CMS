export interface CategoriaProducto {
  id: string;
  titulo: string;
  descripcion: string;
  imagen: string;
  enlace: string;
  translations?: {
    [key: string]: {
      titulo: string;
      descripcion: string;
    };
  };
}

export const categoriasProductos: CategoriaProducto[] = [
  {
    id: 'alimentos',
    titulo: 'ALIMENTOS',
    descripcion: 'Alimentos formulados para cada etapa del ciclo acuícola, optimizando nutrición y rendimiento en peces y camarones.',
    imagen: '/assets/iniciodev/nuestro catalogo/ALIMENTOS.svg',
    enlace: '/productos/alimentos',
  },
  {
    id: 'probioticos',
    titulo: 'PROBIÓTICOS',
    descripcion: 'Probióticos especializados para mejorar la salud, el equilibrio microbiano y la calidad del agua en sistemas acuícolas.',
    imagen: '/assets/iniciodev/nuestro catalogo/PROBIOTICOS.svg',
    enlace: '/productos/probioticos',
  },
  {
    id: 'aditivos',
    titulo: 'ADITIVOS',
    descripcion: 'Aditivos nutricionales y funcionales para potenciar el crecimiento, la inmunidad y el bienestar de organismos acuáticos.',
    imagen: '/assets/iniciodev/nuestro catalogo/ADITIVOS.svg',
    enlace: '/productos/aditivos',
  },
  {
    id: 'quimicos',
    titulo: 'QUÍMICOS',
    descripcion: 'Químicos para el manejo, desinfección y tratamiento eficiente del agua en instalaciones acuícolas.',
    imagen: '/assets/iniciodev/nuestro catalogo/QUIMICOS.svg',
    enlace: '/productos/quimicos',
  },
  {
    id: 'equipos',
    titulo: 'EQUIPOS',
    descripcion: 'Equipos especializados para monitoreo, medición y manejo eficiente en sistemas de acuicultura.',
    imagen: '/assets/iniciodev/nuestro catalogo/EQUIPOS.svg',
    enlace: '/productos/equipos',
  },

];

// Helper function to get translated category content
export const getCategoryTranslation = (category: CategoriaProducto, language: 'es' | 'en' | 'pt') => {
  if (category.translations && category.translations[language]) {
    return category.translations[language];
  }
  // Fallback to Spanish
  return {
    titulo: category.titulo,
    descripcion: category.descripcion
  };
};
