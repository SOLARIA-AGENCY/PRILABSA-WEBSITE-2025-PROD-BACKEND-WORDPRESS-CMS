import { useEffect } from 'react';

/**
 * ExternalRedirect Component
 *
 * Redirige a URLs externas (www.prilabsa.com) mostrando un estado de carga.
 * Usado para separar contenido institucional (www) del catálogo (productos subdomain).
 *
 * @param to - URL completa a la que redirigir (ej: https://www.prilabsa.com/quienes-somos)
 */
export const ExternalRedirect = ({ to }: { to: string }) => {
  useEffect(() => {
    // Redirigir inmediatamente
    window.location.href = to;
  }, [to]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-50">
      <div className="text-center max-w-md mx-auto px-4">
        {/* Spinner animado */}
        <div className="mb-6">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600 mx-auto"></div>
        </div>

        {/* Mensaje de redirección */}
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">
          Redirigiendo...
        </h2>
        <p className="text-gray-600 text-sm">
          Te estamos llevando a <span className="font-medium text-blue-600">{to}</span>
        </p>

        {/* Fallback por si JavaScript no carga */}
        <noscript>
          <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <p className="text-yellow-800 text-sm mb-2">
              JavaScript está deshabilitado. Haz clic en el enlace:
            </p>
            <a
              href={to}
              className="text-blue-600 hover:text-blue-800 underline font-medium"
            >
              Ir a {to}
            </a>
          </div>
        </noscript>
      </div>
    </div>
  );
};
