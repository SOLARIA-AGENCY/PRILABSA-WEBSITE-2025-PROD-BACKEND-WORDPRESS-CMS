import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { oficinasData } from '../data/oficinasData';

// Configurar iconos de Leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const OficinasMap: React.FC = () => {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // Dar tiempo para que el DOM esté completamente listo
    const timer = setTimeout(() => {
      setIsReady(true);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  if (!isReady) {
    return (
      <div className="w-full h-96 flex items-center justify-center bg-gray-100 rounded-lg">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-2"></div>
          <p className="text-gray-600">Cargando mapa...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
          <h2 className="text-2xl font-bold text-center mb-6" style={{color: '#3759C1'}}>
            Nuestras Oficinas en América
          </h2>
          <div className="w-full h-96 rounded-lg overflow-hidden shadow-md border border-gray-300">
            <MapContainer
              center={[0, -60]} // Centro aproximado de América Latina
              zoom={3}
              style={{ height: '100%', width: '100%' }}
              className="z-0"
            >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        
        {oficinasData.map((pais) =>
          pais.oficinas.map((oficina, index) => {
            // Usar las coordenadas del país para cada oficina
            // En una implementación más avanzada, cada oficina tendría sus propias coordenadas
            const [lng, lat] = pais.coordenadas;
            
            return (
              <Marker
                key={`${pais.nombre}-${oficina.ciudad}-${index}`}
                position={[lat, lng]}
              >
                <Popup>
                  <div className="p-2">
                    <h3 className="font-bold text-lg mb-2">
                      {oficina.ciudad}, {pais.nombre}
                    </h3>
                    <div className="space-y-1 text-sm">
                      {oficina.direccion.map((dir, dirIndex) => (
                        <p key={dirIndex} className="text-gray-700">
                          📍 {dir}
                        </p>
                      ))}
                      {oficina.telefono && (
                        <p className="text-gray-700">
                          📞 {oficina.telefono}
                        </p>
                      )}
                      {oficina.movil && (
                        <p className="text-gray-700">
                          📱 {oficina.movil}
                        </p>
                      )}
                      {oficina.email && (
                        <p className="text-gray-700">
                          ✉️ {oficina.email}
                        </p>
                      )}
                      {oficina.fax && (
                        <p className="text-gray-700">
                          📠 {oficina.fax}
                        </p>
                      )}
                      {oficina.rif && (
                        <p className="text-gray-700">
                          🏢 RIF: {oficina.rif}
                        </p>
                      )}
                    </div>
                  </div>
                </Popup>
              </Marker>
            );
          })
        )}
      </MapContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OficinasMap;
