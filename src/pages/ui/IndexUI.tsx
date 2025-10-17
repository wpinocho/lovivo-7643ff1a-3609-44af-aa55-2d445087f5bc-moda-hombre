import { ProductCard } from '@/components/ProductCard';
import { CollectionCard } from '@/components/CollectionCard';
import { FloatingCart } from '@/components/FloatingCart';
import { NewsletterSection } from '@/components/NewsletterSection';
import { EcommerceTemplate } from '@/templates/EcommerceTemplate';
import type { UseIndexLogicReturn } from '@/components/headless/HeadlessIndex';
import { Zap, TrendingUp, Shield } from 'lucide-react';

interface IndexUIProps {
  logic: UseIndexLogicReturn;
}

export const IndexUI = ({ logic }: IndexUIProps) => {
  const {
    collections,
    loading,
    loadingCollections,
    selectedCollectionId,
    filteredProducts,
    handleViewCollectionProducts,
    handleShowAllProducts,
  } = logic;

  return (
    <EcommerceTemplate showCart={true}>
      {/* Hero Section con degradado animado */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 py-24 md:py-32">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDE2YzAtMi4yMSAxLjc5LTQgNC00czQgMS43OSA0IDQtMS43OSA0LTQgNC00LTEuNzktNC00em0wIDI0YzAtMi4yMSAxLjc5LTQgNC00czQgMS43OSA0IDQtMS43OSA0LTQgNC00LTEuNzktNC00ek0xMiAxNmMwLTIuMjEgMS43OS00IDQtNHM0IDEuNzkgNCA0LTEuNzkgNC00IDQtNC0xLjc5LTQtNHptMCAyNGMwLTIuMjEgMS43OS00IDQtNHM0IDEuNzkgNCA0LTEuNzkgNC00IDQtNC0xLjc5LTQtNHoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-20"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center animate-fade-in-up">
            <div className="inline-block mb-4">
              <span className="bg-gradient-to-r from-blue-500 to-purple-500 text-white text-sm font-bold px-4 py-2 rounded-full animate-scale-in">
                🔥 Nueva Colección 2024
              </span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-black text-white mb-6 animate-fade-in-up animate-delay-100">
              Estilo Urbano
              <span className="block mt-2 bg-gradient-to-r from-blue-400 via-purple-400 to-orange-400 bg-clip-text text-transparent animate-gradient-shift bg-[length:200%_auto]">
                Para Hombres
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto animate-fade-in-up animate-delay-200">
              Descubre las últimas tendencias en sneakers y ropa masculina. Calidad premium, estilo único.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up animate-delay-300">
              <button 
                onClick={() => {
                  const productsSection = document.getElementById('products-section');
                  productsSection?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-lg font-bold text-lg hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-2xl"
              >
                Ver Productos
              </button>
              <button 
                onClick={() => {
                  const collectionsSection = document.getElementById('collections-section');
                  collectionsSection?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="bg-white/10 backdrop-blur-sm text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-white/20 transform hover:scale-105 transition-all duration-300 border-2 border-white/30"
              >
                Explorar Colecciones
              </button>
            </div>
          </div>

          {/* Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16 animate-fade-in-up animate-delay-400">
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300 transform hover:scale-105">
              <Zap className="h-10 w-10 text-yellow-400 mb-4" />
              <h3 className="text-white font-bold text-lg mb-2">Envío Express</h3>
              <p className="text-gray-300 text-sm">Recibe tus productos en 24-48 horas</p>
            </div>
            
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300 transform hover:scale-105">
              <TrendingUp className="h-10 w-10 text-green-400 mb-4" />
              <h3 className="text-white font-bold text-lg mb-2">Últimas Tendencias</h3>
              <p className="text-gray-300 text-sm">Productos actualizados semanalmente</p>
            </div>
            
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300 transform hover:scale-105">
              <Shield className="h-10 w-10 text-blue-400 mb-4" />
              <h3 className="text-white font-bold text-lg mb-2">Compra Segura</h3>
              <p className="text-gray-300 text-sm">Garantía de devolución 30 días</p>
            </div>
          </div>
        </div>
      </section>

      {/* Collections Section */}
      {!loadingCollections && collections.length > 0 && (
        <section id="collections-section" className="py-16 bg-gradient-to-b from-gray-50 to-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12 animate-fade-in">
              <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">
                Nuestras <span className="gradient-text">Colecciones</span>
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Explora nuestras categorías exclusivas diseñadas para el hombre moderno
              </p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {collections.map((collection, index) => (
                <div 
                  key={collection.id}
                  className={`animate-fade-in-up animate-delay-${(index + 1) * 100}`}
                >
                  <CollectionCard 
                    collection={collection} 
                    onViewProducts={handleViewCollectionProducts} 
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Products Section */}
      <section id="products-section" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between mb-12 animate-fade-in">
            <div>
              <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-2">
                {selectedCollectionId 
                  ? collections.find(c => c.id === selectedCollectionId)?.name || 'Productos' 
                  : 'Productos Destacados'
                }
              </h2>
              <p className="text-lg text-gray-600">
                {selectedCollectionId 
                  ? 'Productos seleccionados de esta colección'
                  : 'Lo mejor de nuestra tienda'
                }
              </p>
            </div>
            {selectedCollectionId && (
              <button
                onClick={handleShowAllProducts}
                className="mt-4 md:mt-0 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-lg font-bold hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-300 shadow-lg"
              >
                Ver Todos los Productos
              </button>
            )}
          </div>
          
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="bg-gray-200 rounded-xl h-96 animate-pulse"></div>
              ))}
            </div>
          ) : filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {filteredProducts.map((product, index) => (
                <div 
                  key={product.id}
                  className={`animate-scale-in animate-delay-${(index % 4) * 100}`}
                >
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-gray-50 rounded-xl">
              <p className="text-xl text-gray-600 mb-4">No hay productos disponibles</p>
              {selectedCollectionId && (
                <button
                  onClick={handleShowAllProducts}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-lg font-bold hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-300"
                >
                  Ver Todos los Productos
                </button>
              )}
            </div>
          )}
        </div>
      </section>

      {/* Newsletter Section */}
      <NewsletterSection />

      <FloatingCart />
    </EcommerceTemplate>
  );
};