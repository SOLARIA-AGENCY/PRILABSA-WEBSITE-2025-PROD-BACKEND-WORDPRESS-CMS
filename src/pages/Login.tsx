import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Eye, EyeOff, Lock, User } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';

export const Login: React.FC = () => {
  const [formData, setFormData] = useState({
    username: 'ADMIN-PRILABSA',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  
  // Redirigir si ya está autenticado
  useEffect(() => {
    if (isAuthenticated) {
      const from = (location.state as any)?.from?.pathname || '/inventario-productos';
      navigate(from, { replace: true });
    }
  }, [isAuthenticated, navigate, location]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // Simular un pequeño delay para mejor UX
    await new Promise(resolve => setTimeout(resolve, 500));

    const success = login(formData.username, formData.password);
    
    if (success) {
      const from = (location.state as any)?.from?.pathname || '/inventario-productos';
      navigate(from, { replace: true });
    } else {
      setError('Credenciales incorrectas. Verifique su usuario y contraseña.');
    }
    
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header Original */}
      <Header />
      
      {/* Mini-hero azul */}
      <div className="w-full h-32 bg-blue-900 opacity-60 relative z-10"></div>
      
      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center px-4 py-8 relative">
        {/* Background Image - PRILABSA Pedernales */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-70"
          style={{
            backgroundImage: 'url(/images/prilabsa pedernales.png)',
          }}
        />
        
        {/* Login Form Container con efecto frost */}
        <div className="relative z-10 w-full max-w-md">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-2 text-blue-900 drop-shadow-lg">
              Sistema de Inventario
            </h1>
            <p className="text-blue-800 font-medium drop-shadow-md">
              Acceso al sistema de gestión de productos
            </p>
          </div>

          <form className="mt-8 space-y-6 bg-white/20 backdrop-blur-md rounded-xl p-8 shadow-2xl border border-white/30" onSubmit={handleSubmit}>
            <div className="rounded-md shadow-sm space-y-4">
              <div>
                <label htmlFor="username" className="sr-only">
                  Usuario
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-blue-600" />
                  </div>
                  <input
                    id="username"
                    name="username"
                    type="text"
                    required
                    className="appearance-none rounded-lg relative block w-full px-3 py-3 pl-10 border-2 border-blue-200 placeholder-gray-500 text-gray-900 bg-white/95 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm shadow-lg"
                    placeholder="Usuario"
                    value={formData.username}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div>
                <label htmlFor="password" className="sr-only">
                  Contraseña
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-blue-600" />
                  </div>
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    required
                    className="appearance-none rounded-lg relative block w-full px-3 py-3 pl-10 pr-10 border-2 border-blue-200 placeholder-gray-500 text-gray-900 bg-white/95 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm shadow-lg"
                    placeholder="Contraseña"
                    value={formData.password}
                    onChange={handleInputChange}
                  />
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                    <button
                      type="button"
                      className="text-blue-600 hover:text-blue-800"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className="h-5 w-5" />
                      ) : (
                        <Eye className="h-5 w-5" />
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {error && (
              <div className="rounded-md bg-red-100/90 backdrop-blur-sm border-2 border-red-300 p-4 shadow-lg">
                <div className="text-sm text-red-800 font-medium">{error}</div>
              </div>
            )}

            <div>
              <button
                type="submit"
                disabled={isLoading}
                className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed shadow-xl transform transition-all duration-200 hover:scale-105"
              >
                {isLoading ? (
                  <div className="flex items-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Verificando...
                  </div>
                ) : (
                  'Acceder al Inventario'
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
      
      {/* Footer Original */}
      <Footer />
    </div>
  );
};

export default Login;