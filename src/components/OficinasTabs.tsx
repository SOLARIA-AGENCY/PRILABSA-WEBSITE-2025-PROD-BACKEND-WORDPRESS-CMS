import React, { useState } from 'react';
import { oficinasData, Pais } from '../data/oficinasData';
import { MapPin, Phone, Mail, Smartphone, Printer, FileText } from 'lucide-react';

const OficinasTabs = () => {
  const [activeTab, setActiveTab] = useState(oficinasData[0]?.nombre);

  const paisesPrincipalesNombres = ['Ecuador', 'Brasil', 'USA', 'México'];
  const paisesPrincipales = oficinasData.filter(p => paisesPrincipalesNombres.includes(p.nombre));
  const otrosPaises = oficinasData.filter(p => !paisesPrincipalesNombres.includes(p.nombre));

        // NOTA DE DISEÑO:
  // Se utiliza `grid` y `place-items-center` para lograr un centrado vertical y horizontal
  // perfecto de los elementos internos (bandera y texto). Este método es más robusto
  // que flexbox para evitar problemas sutiles de alineación causados por la altura de línea del texto.
  const renderTabButton = (pais: Pais) => (
    <button
      key={pais.nombre}
      className={`grid place-items-center gap-2 p-4 mx-1 my-1 text-sm font-bold uppercase transition-all duration-300 focus:outline-none rounded-lg transform hover:-translate-y-1 w-28 h-28 ${
        activeTab === pais.nombre
          ? 'shadow-lg'
          : ''
      }`}
      onClick={() => setActiveTab(pais.nombre)}
      style={{
        color: activeTab === pais.nombre ? '#3759C1' : '#4B5563',
        backgroundColor: activeTab === pais.nombre ? 'rgba(255, 255, 255, 0.8)' : 'rgba(255, 255, 255, 0.4)',
      }}
    >
      <img src={pais.bandera} alt={`Bandera de ${pais.nombre}`} className="w-10 h-10 rounded-full shadow-md" />
      <span className="text-center">{pais.nombre}</span>
    </button>
  );

  return (
    <section 
      className="py-16 lg:py-24 bg-cover bg-center"
      style={{
        backgroundImage: `url('/assets/iniciodev/backgrounds_light/background_light_2.png')`,
      }}
    >
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold uppercase" style={{ color: '#3759C1' }}>
            Nuestras Sedes
          </h2>
          <p className="text-lg mt-2 font-semibold" style={{ color: '#3759C1' }}>
            Encuentra la oficina de Prilabsa más cercana a ti.
          </p>
        </div>

        <div className="flex flex-col items-center mb-8">
          <div className="flex justify-center flex-wrap max-w-4xl mx-auto">
            {paisesPrincipales.map(renderTabButton)}
          </div>
          <div className="flex justify-center flex-wrap max-w-4xl mx-auto mt-2">
            {otrosPaises.map(renderTabButton)}
          </div>
        </div>

        <div className="flex justify-center items-center min-h-[350px]">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 justify-items-center justify-center max-w-2xl w-full mx-auto h-full">
          {oficinasData
            .find((pais) => pais.nombre === activeTab)
            ?.oficinas.map((oficina) => (
              <div key={oficina.ciudad} className="bg-white bg-opacity-90 py-2 px-4 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300 backdrop-blur-sm w-full max-w-sm min-h-[180px] flex flex-col mx-auto">
                <h3 className="text-xl font-bold mb-3 text-center" style={{ color: '#3759C1' }}>{oficina.ciudad}</h3>
                <div className="space-y-2 text-gray-800 flex-1 flex flex-col justify-center">
                  <div className="flex items-start">
                    <MapPin className="w-5 h-5 mr-3 mt-1 text-orange-500 flex-shrink-0" style={{ color: '#f6921d' }} />
                    <span dangerouslySetInnerHTML={{ __html: oficina.direccion.join('<br />') }} />
                  </div>
                  {oficina.telefono && (
                    <div className="flex items-center">
                      <Phone className="w-5 h-5 mr-3 text-orange-500 flex-shrink-0" style={{ color: '#f6921d' }} />
                      <a href={`tel:${oficina.telefono.replace(/\s/g, '')}`} className="hover:text-blue-900">{oficina.telefono}</a>
                    </div>
                  )}
                  {oficina.movil && (
                    <div className="flex items-center">
                      <Smartphone className="w-5 h-5 mr-3 text-orange-500 flex-shrink-0" style={{ color: '#f6921d' }} />
                      <a href={`tel:${oficina.movil.replace(/\s/g, '')}`} className="hover:text-blue-900">{oficina.movil}</a>
                    </div>
                  )}
                  {oficina.fax && (
                    <div className="flex items-center">
                      <Printer className="w-5 h-5 mr-3 text-orange-500 flex-shrink-0" style={{ color: '#f6921d' }} />
                      <span>{oficina.fax}</span>
                    </div>
                  )}
                  {oficina.email && (
                    <div className="flex items-center">
                      <Mail className="w-5 h-5 mr-3 text-orange-500 flex-shrink-0" style={{ color: '#f6921d' }} />
                      <a href={`mailto:${oficina.email}`} className="hover:text-blue-900" title={`Enviar correo a ${oficina.email}`}>{oficina.email}</a>
                    </div>
                  )}
                  {oficina.rif && (
                    <div className="flex items-center">
                      <FileText className="w-5 h-5 mr-3 text-orange-500 flex-shrink-0" style={{ color: '#f6921d' }} />
                      <span>RIF: {oficina.rif}</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default OficinasTabs;
