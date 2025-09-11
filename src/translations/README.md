# Sistema de Traducción Nativo PRILABSA

## Descripción

Sistema de internacionalización (i18n) nativo desarrollado con React Context API, sin dependencias externas. Proporciona traducción entre español e inglés con persistencia en localStorage y detección automática del idioma del navegador.

## Características

- ✅ **Sin dependencias externas**: Basado en React Context API
- ✅ **TypeScript completo**: Tipado estricto y autocompletado
- ✅ **Persistencia**: Guarda preferencia en localStorage
- ✅ **Detección automática**: Detecta idioma del navegador
- ✅ **SEO optimizado**: Actualiza atributo `lang` del HTML
- ✅ **Validación en desarrollo**: Detecta claves faltantes
- ✅ **Fallbacks robustos**: Nunca rompe la aplicación

## Estructura de Archivos

```
src/
├── contexts/
│   └── LanguageContext.tsx     # Context y Provider principal
├── translations/
│   ├── index.ts                # Traducciones y funciones utilitarias
│   └── README.md               # Esta documentación
└── components/
    └── LanguageSelector.tsx     # Componente selector de idioma
```

## Uso Básico

### 1. Usar el hook en componentes

```tsx
import { useLanguage } from '../contexts/LanguageContext';

const MiComponente = () => {
  const { language, setLanguage, t } = useLanguage();

  return (
    <div>
      <h1>{t('home.hero.title')}</h1>
      <p>Idioma actual: {language}</p>
      <button onClick={() => setLanguage('en')}>English</button>
    </div>
  );
};
```

### 2. Integrar el selector de idioma

```tsx
import { LanguageSelector } from '../components/LanguageSelector';

const Header = () => {
  return (
    <header>
      <nav>{/* navegación */}</nav>
      <LanguageSelector showText={true} />
    </header>
  );
};
```

## Estructura de Traducciones

Las traducciones están organizadas por componentes y funcionalidades:

```typescript
const translations = {
  header: {
    navigation: {
      home: { es: 'INICIO', en: 'HOME' },
      about: { es: 'NOSOTROS', en: 'ABOUT' }
    }
  },
  footer: {
    contact: {
      title: { es: 'CONTACTO', en: 'CONTACT' }
    }
  }
};
```

## Agregar Nuevas Traducciones

### 1. Editar el archivo de traducciones

En `src/translations/index.ts`, agregar nuevas claves:

```typescript
const translations = {
  // ... traducciones existentes
  miNuevaSeccion: {
    titulo: { es: 'Mi Título', en: 'My Title' },
    descripcion: { es: 'Descripción', en: 'Description' }
  }
};
```

### 2. Usar en componentes

```tsx
const MiComponente = () => {
  const { t } = useLanguage();
  
  return (
    <div>
      <h2>{t('miNuevaSeccion.titulo')}</h2>
      <p>{t('miNuevaSeccion.descripcion')}</p>
    </div>
  );
};
```

## API del Hook useLanguage

```typescript
interface LanguageContextType {
  language: 'es' | 'en';              // Idioma actual
  setLanguage: (lang: Language) => void; // Cambiar idioma
  t: (key: string) => string;          // Función de traducción
}
```

## Componente LanguageSelector

### Props

```typescript
interface LanguageSelectorProps {
  className?: string;  // Clases CSS adicionales
  showText?: boolean;  // Mostrar texto del idioma (default: true)
}
```

### Ejemplo de uso

```tsx
// Selector completo con texto
<LanguageSelector showText={true} className="ml-4" />

// Selector solo con banderas (para móvil)
<LanguageSelector showText={false} className="md:hidden" />
```

## Validación en Desarrollo

El sistema incluye validación automática que detecta:

- Claves de traducción faltantes
- Traducciones vacías
- Inconsistencias entre idiomas

Los warnings aparecen en la consola del navegador solo en modo desarrollo.

## Persistencia y Detección

### localStorage
- **Clave**: `prilabsa-language`
- **Valores**: `'es'` | `'en'`

### Detección automática
1. Busca idioma guardado en localStorage
2. Si no existe, detecta idioma del navegador
3. Fallback a español si no puede detectar

### SEO
- Actualiza automáticamente `document.documentElement.lang`
- Mejora la indexación y accesibilidad

## Mejores Prácticas

### 1. Nomenclatura de claves
```typescript
// ✅ Bueno: Jerárquico y descriptivo
'header.navigation.home'
'footer.contact.phone'
'home.hero.title'

// ❌ Malo: Plano y confuso
'homeTitle'
'contactPhone'
```

### 2. Organización por componentes
```typescript
// ✅ Bueno: Agrupado por funcionalidad
const translations = {
  header: { /* todas las traducciones del header */ },
  footer: { /* todas las traducciones del footer */ },
  home: { /* todas las traducciones de la página inicio */ }
};
```

### 3. Textos largos
```typescript
// ✅ Bueno: Dividir en párrafos
description: {
  paragraph1: { es: 'Primer párrafo...', en: 'First paragraph...' },
  paragraph2: { es: 'Segundo párrafo...', en: 'Second paragraph...' }
}

// ❌ Malo: Texto muy largo en una sola clave
description: { es: 'Texto muy largo...', en: 'Very long text...' }
```

## Troubleshooting

### Problema: "Translation key not found"
**Solución**: Verificar que la clave existe en `src/translations/index.ts`

### Problema: Idioma no persiste
**Solución**: Verificar que localStorage está habilitado en el navegador

### Problema: Componente no re-renderiza al cambiar idioma
**Solución**: Asegurarse de que el componente está dentro del `LanguageProvider`

## Migración desde react-i18next

Si migras desde react-i18next:

1. Reemplazar `useTranslation()` por `useLanguage()`
2. Cambiar `t('key')` por `t('key')` (misma sintaxis)
3. Mover traducciones de archivos JSON a `src/translations/index.ts`
4. Remover dependencias de react-i18next del package.json

## Rendimiento

- **Bundle size**: ~2KB (vs ~50KB de react-i18next)
- **Runtime**: Acceso directo a objeto, sin parsing
- **Memory**: Todas las traducciones en memoria (aceptable para 2 idiomas)
- **Lazy loading**: No necesario para este volumen de traducciones

## Extensibilidad Futura

### Agregar más idiomas
```typescript
export type Language = 'es' | 'en' | 'fr' | 'pt';

const translations = {
  header: {
    navigation: {
      home: { 
        es: 'INICIO', 
        en: 'HOME', 
        fr: 'ACCUEIL', 
        pt: 'INÍCIO' 
      }
    }
  }
};
```

### Pluralización
```typescript
const translations = {
  common: {
    items: {
      zero: { es: 'Sin elementos', en: 'No items' },
      one: { es: '1 elemento', en: '1 item' },
      many: { es: '{{count}} elementos', en: '{{count}} items' }
    }
  }
};
```

### Interpolación
```typescript
// Función extendida para interpolación
const t = (key: string, params?: Record<string, string>): string => {
  let translation = getTranslation(key, language);
  
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      translation = translation.replace(`{{${key}}}`, value);
    });
  }
  
  return translation;
};

// Uso
t('welcome.message', { name: 'Juan' }); // "Bienvenido, Juan"
```