import { useContext } from 'react';
import { CotizacionContext, CotizacionContextType } from '../context/cotizacionDefinition';

export const useCotizacion = (): CotizacionContextType => {
  const context = useContext(CotizacionContext);
  if (!context) {
    throw new Error('useCotizacion debe ser usado dentro de un CotizacionProvider');
  }
  return context;
};
