import React, { useState, useEffect, Suspense } from 'react';
import { useCotizacion } from '../hooks/useCotizacion';
import Layout from '../components/Layout';
import { Link } from 'react-router-dom';
import { Trash2, Plus, Minus, Send, FileDown, ShoppingCart } from 'lucide-react';
import { PDFDownloadLink } from '@react-pdf/renderer';
import StaticHero from '../components/StaticHero';
import Breadcrumbs from '../components/Breadcrumbs';
import { oficinasData } from '../data/oficinasData';
import { useLanguage } from '../contexts/LanguageContext';
import { translations } from '../translations';

// Carga perezosa del componente de PDF
const CotizacionPDF = React.lazy(() => import('../components/CotizacionPDF'));

const Cotizacion = () => {
  const { items, eliminarProducto, actualizarCantidad, limpiarCotizacion, getItemCount } = useCotizacion();
  const { language } = useLanguage();
  const [logoUrl, setLogoUrl] = useState('');
  const [isFormVisible, setIsFormVisible] = useState(false);

  // Estados para el formulario
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [empresa, setEmpresa] = useState('');
  const [comentarios, setComentarios] = useState('');
  const [agencia, setAgencia] = useState('');
  const [formError, setFormError] = useState('');
  const [formSuccess, setFormSuccess] = useState('');
  
  const { t } = useLanguage();
  const breadcrumbPaths = [
    { name: t('breadcrumbs.home'), path: '/' },
    { name: t('quotation.pageTitle'), path: '/cotizacion' },
  ];

  useEffect(() => {
    const fetchLogoAsDataURL = async () => {
      try {
        // Path corregido para build de Vite
        const response = await fetch('/assets/images/logos/logo-prilabsa-azul.png');
        if (!response.ok) throw new Error('No se pudo cargar el logo');
        const blob = await response.blob();
        const reader = new FileReader();
        reader.onloadend = () => {
          setLogoUrl(reader.result as string);
        };
        reader.readAsDataURL(blob);
      } catch (error) {
        setLogoUrl('');
        console.error('Error fetching logo for PDF:', error);
      }
    };
    fetchLogoAsDataURL();
  }, []);

  const handleCantidadChange = (idProducto: string, nuevaCantidad: number) => {
    if (nuevaCantidad >= 1) {
      actualizarCantidad(idProducto, nuevaCantidad);
    }
  };

  const handleProceedToForm = () => {
    setIsFormVisible(true);
  };

  const handleFormSubmit = () => {
    setFormError('');
    if (!nombre || !email || !empresa || !agencia) {
      setFormError(t('quotation.form.error'));
      return;
    }
    
    // Crear el contenido del email
    const subject = encodeURIComponent(`Solicitud de Cotización - ${empresa}`);
    const productList = items.map(({ producto, cantidad }) => 
      `- ${producto.name}${producto.productCode || producto.codigo ? ` [${producto.productCode || producto.codigo}]` : ''} (${producto.category}) - Cantidad: ${cantidad}`
    ).join('\n');
    
    const body = encodeURIComponent(
      `Estimado equipo de Prilabsa,\n\n` +
      `Solicito cotización para los siguientes productos:\n\n` +
      `DATOS DEL SOLICITANTE:\n` +
      `Nombre: ${nombre}\n` +
      `Email: ${email}\n` +
      `Empresa: ${empresa}\n` +
      `Agencia de destino: ${agencia}\n\n` +
      `PRODUCTOS SOLICITADOS:\n` +
      `${productList}\n\n` +
      `COMENTARIOS ADICIONALES:\n` +
      `${comentarios || 'Ninguno'}\n\n` +
      `Saludos cordiales,\n${nombre}`
    );
    
    // Abrir cliente de correo con datos prellenados
    const mailtoLink = `mailto:info@prilabsa.com.ec?subject=${subject}&body=${body}`;
    window.open(mailtoLink, '_blank');
    
    // Mostrar mensaje de confirmación
    setFormSuccess(t('quotation.form.success'));
    setTimeout(() => {
      setFormSuccess('');
    }, 8000);
  };

  const allOficinas = oficinasData.flatMap(pais => 
    pais.oficinas.map(oficina => `${oficina.ciudad}, ${pais.nombre}`)
  );

  return (
    <Layout>
      <StaticHero 
        title={translations.quotation.pageTitle[language]} 
        subtitle={translations.quotation.subtitle[language]}
        backgroundImage="/assets/iniciodev/prilabsa-hero.png" 
      />
      <Breadcrumbs paths={breadcrumbPaths} />

      <div className="container mx-auto px-4 py-16">
        {items.length === 0 && !formSuccess ? (
          <div className="text-center py-20">
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">{translations.quotation.emptyCart[language]}</h2>
            <p className="text-gray-500 mb-8">{translations.quotation.exploreMessage[language]}</p>
            <Link to="/productos" className="bg-orange-500 text-white font-bold py-3 px-6 rounded-lg hover:bg-orange-600 transition-colors uppercase text-sm inline-flex items-center">
              <ShoppingCart className="mr-2 h-5 w-5" />
              {translations.home.catalog.viewCatalog[language]}
            </Link>
          </div>
        ) : formSuccess ? (
          <div className="text-center py-20 bg-green-50 border border-green-200 rounded-lg">
            <h2 className="text-2xl font-semibold text-green-700 mb-4">{formSuccess}</h2>
            <p className="text-gray-600">{translations.quotation.redirectMessage[language]}</p>
            <div className="mt-4 text-sm text-orange-700 bg-orange-50 border border-orange-200 rounded p-2 max-w-xl mx-auto">
              <strong>Nota:</strong> {translations.quotation.simulationNote[language]}
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className={`lg:col-span-2 ${isFormVisible ? 'hidden lg:block' : ''}`}>
              <div className="bg-white shadow-md rounded-lg overflow-hidden">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="text-left py-3 px-4 font-semibold text-gray-600 uppercase text-sm">{translations.quotation.product[language]}</th>
                      <th className="text-center py-3 px-4 font-semibold text-gray-600 uppercase text-sm">{translations.quotation.quantity[language]}</th>
                      <th className="text-center py-3 px-4 font-semibold text-gray-600 uppercase text-sm">{translations.quotation.actions[language]}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {items.map(({ producto, cantidad }) => (
                      <tr key={producto.id} className="border-b border-gray-200">
                        <td className="py-4 px-4 flex items-center">
                          <img src={producto.image || producto.assets?.image?.path || '/assets/placeholder.png'} alt={producto.name} className="w-16 h-16 object-cover rounded-md mr-4" />
                          <div>
                            <Link to={`/productos/${producto.category}/${producto.slug}`} className="font-semibold text-gray-800 hover:text-orange-500">{producto.name}</Link>
                            {(producto.productCode || producto.codigo) && (
                              <p className="text-xs font-medium text-gray-600">CÓDIGO: {producto.productCode || producto.codigo}</p>
                            )}
                            <p className="text-sm text-gray-500 capitalize">{producto.category}</p>
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <div className="flex items-center justify-center">
                            <button onClick={() => handleCantidadChange(producto.id, cantidad - 1)} className="p-1 rounded-full bg-gray-200 hover:bg-gray-300"><Minus size={16} /></button>
                            <input
                              type="number"
                              value={cantidad}
                              onChange={(e) => handleCantidadChange(producto.id, parseInt(e.target.value))}
                              className="w-16 text-center border-transparent focus:border-gray-300 focus:ring-0"
                              min="1"
                            />
                            <button onClick={() => handleCantidadChange(producto.id, cantidad + 1)} className="p-1 rounded-full bg-gray-200 hover:bg-gray-300"><Plus size={16} /></button>
                          </div>
                        </td>
                        <td className="py-4 px-4 text-center">
                          <button onClick={() => eliminarProducto(producto.id)} className="text-red-500 hover:text-red-700">
                            <Trash2 size={20} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            
            <div className="lg:col-span-1">
              <div className="bg-white shadow-md rounded-lg p-6">
                <h2 className="text-xl font-bold text-gray-800 border-b pb-4 mb-4">{translations.quotation.myQuote[language]}</h2>
                <div className="flex justify-between mb-6">
                  <span className="font-semibold text-gray-600">{translations.quotation.totalProducts[language]}</span>
                  <span className="font-bold text-gray-800">{getItemCount()}</span>
                </div>
                
                {isFormVisible ? (
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="nombre" className="block text-sm font-medium text-gray-700">{translations.quotation.form.name[language]}</label>
                      <input type="text" id="nombre" value={nombre} onChange={e => setNombre(e.target.value)} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500" />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700">{translations.quotation.form.email[language]}</label>
                      <input type="email" id="email" value={email} onChange={e => setEmail(e.target.value)} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500" />
                    </div>
                    <div>
                      <label htmlFor="empresa" className="block text-sm font-medium text-gray-700">{translations.quotation.form.company[language]}</label>
                      <input type="text" id="empresa" value={empresa} onChange={e => setEmpresa(e.target.value)} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500" />
                    </div>
                    <div>
                      <label htmlFor="agencia" className="block text-sm font-medium text-gray-700">{translations.quotation.form.agency[language]}</label>
                      <select id="agencia" value={agencia} onChange={e => setAgencia(e.target.value)} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500">
                        <option value="" disabled>{translations.quotation.form.selectAgency[language]}</option>
                        {allOficinas.map(oficina => (
                          <option key={oficina} value={oficina}>{oficina}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label htmlFor="comentarios" className="block text-sm font-medium text-gray-700">{translations.quotation.form.additionalComments[language]}</label>
                      <textarea id="comentarios" value={comentarios} onChange={e => setComentarios(e.target.value)} rows={3} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"></textarea>
                    </div>
                    
                    {formError && <p className="text-sm text-red-600">{formError}</p>}

                    <button onClick={handleFormSubmit} className="w-full bg-green-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-green-700 transition-colors uppercase text-sm inline-flex items-center justify-center">
                      <Send className="h-5 w-5 mr-2" />
                      {translations.quotation.confirmSend[language]}
                    </button>
                    {/* Advertencia si el logo no se carga */}
                    {!logoUrl && (
                      <div className="text-sm text-red-600 bg-red-50 border border-red-200 rounded p-2 mt-2">
                        {translations.quotation.logoError[language]}
                      </div>
                    )}
                    {logoUrl && (
                      <Suspense fallback={<div className="text-center p-4">{translations.quotation.loading[language]}</div>}>
                         <PDFDownloadLink
                          document={<CotizacionPDF items={items} logoUrl={logoUrl} buyerInfo={{ nombre, email, empresa, comentarios }} selectedAgency={agencia} />}
                          fileName={`Cotizacion-Prilabsa-${new Date().toISOString().slice(0,10)}.pdf`}
                          className="w-full bg-red-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-red-700 transition-colors uppercase text-sm inline-flex items-center justify-center mt-2"
                        >
                          <FileDown className="mr-2 h-5 w-5" />
                          {translations.quotation.downloadPdf[language]}
                        </PDFDownloadLink>
                      </Suspense>
                    )}
                  </div>
                ) : (
                  <>
                    <button onClick={handleProceedToForm} className="w-full bg-orange-500 text-white font-bold py-3 px-4 rounded-lg hover:bg-orange-600 transition-colors uppercase text-sm mb-4 text-center block">
                      {translations.quotation.sendQuotation[language]}
                    </button>
                    <button onClick={limpiarCotizacion} className="w-full bg-gray-200 text-gray-700 font-bold py-3 px-4 rounded-lg hover:bg-gray-300 transition-colors uppercase text-sm">
                      {translations.quotation.clearQuotation[language]}
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Cotizacion;
