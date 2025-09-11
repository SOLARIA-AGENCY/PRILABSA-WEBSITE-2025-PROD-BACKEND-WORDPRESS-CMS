import { Helmet } from '@dr.pogodin/react-helmet';

interface SEOHeadProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: 'website' | 'article' | 'product';
  author?: string;
  publishedTime?: string;
  modifiedTime?: string;
  section?: string;
  tags?: string[];
}

const SEOHead: React.FC<SEOHeadProps> = ({
  title = 'Prilabsa - Soluciones Integrales en Acuicultura',
  description = 'Prilabsa es líder en soluciones integrales para acuicultura. Ofrecemos equipos especializados, probióticos, aditivos y químicos de alta calidad para el sector acuícola en Ecuador y Latinoamérica.',
  keywords = 'prilabsa, acuicultura, probióticos, equipos acuícolas, químicos, aditivos, soluciones integrales, Ecuador, laboratorio, análisis',
  image = 'https://prilabsa.solaria.agency/assets/images/logos/prilabsa-logo.png',
  url = 'https://prilabsa.solaria.agency',
  type = 'website',
  author = 'Prilabsa - Prime Laboratorio Prilab SA',
  publishedTime,
  modifiedTime,
  section,
  tags
}) => {
  const fullTitle = title.includes('Prilabsa') ? title : `${title} | Prilabsa`;
  const canonicalUrl = url || window.location.href;

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content={author} />
      <meta name="robots" content="index, follow" />
      <link rel="canonical" href={canonicalUrl} />

      {/* Open Graph Meta Tags */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:site_name" content="Prilabsa" />
      <meta property="og:image" content={image} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:locale" content="es_EC" />
      
      {/* Article specific Open Graph tags */}
      {type === 'article' && (
        <>
          {author && <meta property="article:author" content={author} />}
          {publishedTime && <meta property="article:published_time" content={publishedTime} />}
          {modifiedTime && <meta property="article:modified_time" content={modifiedTime} />}
          {section && <meta property="article:section" content={section} />}
          {tags && tags.map(tag => (
            <meta key={tag} property="article:tag" content={tag} />
          ))}
        </>
      )}

      {/* Twitter Card Meta Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {/* Business Information */}
      <meta name="geo.region" content="EC-G" />
      <meta name="geo.placename" content="Guayaquil" />
      <meta name="geo.position" content="-2.170998;-79.922359" />
      <meta name="ICBM" content="-2.170998, -79.922359" />

      {/* JSON-LD Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          "name": "Prilabsa",
          "legalName": "Prime Laboratorio Prilab SA",
          "url": "https://www.prilabsa.com",
          "logo": "https://www.prilabsa.com/assets/images/logos/prilabsa-logo.png",
          "description": "Líder en soluciones integrales para acuicultura. Equipos, probióticos y químicos especializados.",
          "address": {
            "@type": "PostalAddress",
            "streetAddress": "AV. CARLOS JULIO AROSEMENA KM 2.5 VIA DAULE C.C. ALBAN BORJA PLANTA BAJA LOCAL 055",
            "addressLocality": "Guayaquil",
            "addressRegion": "Guayas",
            "addressCountry": "EC"
          },
          "contactPoint": {
            "@type": "ContactPoint",
            "telephone": "+593-4-XXXXXXX",
            "contactType": "customer service",
            "email": "info@prilabsa.com"
          },
          "sameAs": [
            "https://facebook.com/prilabsa",
            "https://linkedin.com/company/prilabsa",
            "https://instagram.com/prilabsa"
          ],
          "foundingDate": "1992",
          "industry": "Acuicultura",
          "numberOfEmployees": "50-100"
        })}
      </script>
    </Helmet>
  );
};

export default SEOHead;