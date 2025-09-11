import { useEffect } from 'react';

// Declaraciones globales para tracking
declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
    fbq?: (...args: any[]) => void;
    dataLayer?: any[];
  }
}

interface TrackingConfig {
  gaTrackingId?: string;
  fbPixelId?: string;
}

interface EventData {
  event_category?: string;
  event_label?: string;
  value?: number;
  custom_parameters?: Record<string, any>;
}

export const useTracking = (config?: TrackingConfig) => {
  const gaTrackingId = config?.gaTrackingId || import.meta.env.VITE_GA_TRACKING_ID;
  const fbPixelId = config?.fbPixelId || import.meta.env.VITE_FB_PIXEL_ID;

  // Inicializar Google Analytics
  const initializeGA = () => {
    if (!gaTrackingId || gaTrackingId === 'G-XXXXXXXXXX' || !gaTrackingId.startsWith('G-')) return;
    
    // Cargar gtag si no existe
    if (!window.gtag) {
      const script = document.createElement('script');
      script.async = true;
      script.src = `https://www.googletagmanager.com/gtag/js?id=${gaTrackingId}`;
      document.head.appendChild(script);

      window.dataLayer = window.dataLayer || [];
      window.gtag = function() {
        window.dataLayer?.push(arguments);
      };
      
      window.gtag('js', new Date());
      window.gtag('config', gaTrackingId, {
        page_title: document.title,
        page_location: window.location.href,
        send_page_view: true
      });
    }
  };

  // Inicializar Facebook Pixel
  const initializeFBPixel = () => {
    if (!fbPixelId || fbPixelId === 'XXXXXXXXXXXXXXXXX' || fbPixelId.length < 10) return;
    
    if (!window.fbq) {
      const script = document.createElement('script');
      script.innerHTML = `
        !function(f,b,e,v,n,t,s)
        {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
        n.callMethod.apply(n,arguments):n.queue.push(arguments)};
        if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
        n.queue=[];t=b.createElement(e);t.async=!0;
        t.src=v;s=b.getElementsByTagName(e)[0];
        s.parentNode.insertBefore(t,s)}(window, document,'script',
        'https://connect.facebook.net/en_US/fbevents.js');
        fbq('init', '${fbPixelId}');
        fbq('track', 'PageView');
      `;
      document.head.appendChild(script);

      // Noscript fallback
      const noscript = document.createElement('noscript');
      noscript.innerHTML = `
        <img height="1" width="1" style="display:none" 
             src="https://www.facebook.com/tr?id=${fbPixelId}&ev=PageView&noscript=1" />
      `;
      document.head.appendChild(noscript);
    }
  };

  // Tracking de eventos de Google Analytics
  const trackGAEvent = (eventName: string, eventData?: EventData) => {
    if (window.gtag && gaTrackingId && gaTrackingId !== 'G-XXXXXXXXXX' && gaTrackingId.startsWith('G-')) {
      window.gtag('event', eventName, {
        event_category: eventData?.event_category || 'engagement',
        event_label: eventData?.event_label,
        value: eventData?.value,
        ...eventData?.custom_parameters
      });
    }
  };

  // Tracking de eventos de Facebook Pixel
  const trackFBEvent = (eventName: string, eventData?: Record<string, any>) => {
    if (window.fbq && fbPixelId && fbPixelId !== 'XXXXXXXXXXXXXXXXX' && fbPixelId.length >= 10) {
      window.fbq('track', eventName, eventData);
    }
  };

  // Tracking combinado
  const trackEvent = (eventName: string, eventData?: EventData & Record<string, any>) => {
    trackGAEvent(eventName, eventData);
    trackFBEvent(eventName, eventData);
  };

  // Tracking de página vista
  const trackPageView = (pagePath?: string, pageTitle?: string) => {
    const path = pagePath || window.location.pathname;
    const title = pageTitle || document.title;

    // Google Analytics
    if (window.gtag && gaTrackingId && gaTrackingId !== 'G-XXXXXXXXXX' && gaTrackingId.startsWith('G-')) {
      window.gtag('config', gaTrackingId, {
        page_path: path,
        page_title: title,
        page_location: window.location.href
      });
    }

    // Facebook Pixel
    if (window.fbq && fbPixelId && fbPixelId !== 'XXXXXXXXXXXXXXXXX' && fbPixelId.length >= 10) {
      window.fbq('track', 'PageView');
    }
  };

  // Eventos específicos del negocio
  const trackProductView = (productId: string, productName: string, category?: string) => {
    trackEvent('view_item', {
      event_category: 'ecommerce',
      event_label: productId,
      item_id: productId,
      item_name: productName,
      item_category: category,
      content_type: 'product'
    });
  };

  const trackProductDownload = (productId: string, productName: string) => {
    trackEvent('download', {
      event_category: 'Product',
      event_label: productId,
      value: 1,
      item_id: productId,
      item_name: productName,
      content_type: 'product_download'
    });
  };

  const trackContactForm = (formType: string) => {
    trackEvent('form_submit', {
      event_category: 'Contact',
      event_label: formType,
      content_name: formType
    });
  };

  const trackSearch = (searchTerm: string, resultsCount?: number) => {
    trackEvent('search', {
      event_category: 'Search',
      event_label: searchTerm,
      search_term: searchTerm,
      value: resultsCount
    });
  };

  // Inicializar tracking al montar el componente
  useEffect(() => {
    initializeGA();
    initializeFBPixel();
  }, [gaTrackingId, fbPixelId]);

  return {
    trackEvent,
    trackPageView,
    trackProductView,
    trackProductDownload,
    trackContactForm,
    trackSearch,
    trackGAEvent,
    trackFBEvent,
    isGAEnabled: !!(gaTrackingId && gaTrackingId !== 'G-XXXXXXXXXX' && gaTrackingId.startsWith('G-')),
    isFBEnabled: !!(fbPixelId && fbPixelId !== 'XXXXXXXXXXXXXXXXX' && fbPixelId.length >= 10)
  };
};

export default useTracking;