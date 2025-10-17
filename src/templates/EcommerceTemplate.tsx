import { ReactNode } from 'react'
import { PageTemplate } from './PageTemplate'
import { BrandLogoLeft } from '@/components/BrandLogoLeft'
import { SocialLinks } from '@/components/SocialLinks'
import { FloatingCart } from '@/components/FloatingCart'
import { ProfileMenu } from '@/components/ProfileMenu'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { ShoppingCart } from 'lucide-react'
import { useCartUI } from '@/components/CartProvider'
import { useCart } from '@/contexts/CartContext'

interface EcommerceTemplateProps {
  children: ReactNode
  pageTitle?: string
  showCart?: boolean
  className?: string
  headerClassName?: string
  footerClassName?: string
  layout?: 'default' | 'full-width' | 'centered'
}

export const EcommerceTemplate = ({
  children,
  pageTitle,
  showCart = true,
  className,
  headerClassName,
  footerClassName,
  layout = 'default'
}: EcommerceTemplateProps) => {
  const { openCart } = useCartUI()
  const { getTotalItems } = useCart()
  const totalItems = getTotalItems()

  const header = (
    <div className={`py-4 bg-white/95 backdrop-blur-sm shadow-sm ${headerClassName}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="transform hover:scale-105 transition-transform duration-200">
              <BrandLogoLeft />
            </Link>
          </div>

          {/* Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <nav className="flex space-x-6">
              <Link 
                to="/" 
                className="text-gray-700 hover:text-purple-600 transition-colors font-semibold relative group"
              >
                Inicio
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 group-hover:w-full transition-all duration-300"></span>
              </Link>
              <Link 
                to="/blog" 
                className="text-gray-700 hover:text-purple-600 transition-colors font-semibold relative group"
              >
                Blog
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 group-hover:w-full transition-all duration-300"></span>
              </Link>
            </nav>
          </div>

          {/* Profile & Cart */}
          <div className="flex items-center space-x-2">
            <ProfileMenu />
            
            {showCart && (
              <Button
                variant="ghost"
                size="icon"
                onClick={openCart}
                className="relative hover:bg-purple-50 transition-colors"
                aria-label="Ver carrito"
              >
                <ShoppingCart className="h-5 w-5 text-gray-700" />
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-xs font-black rounded-full h-5 w-5 flex items-center justify-center shadow-lg animate-scale-in">
                    {totalItems > 99 ? '99+' : totalItems}
                  </span>
                )}
              </Button>
            )}
          </div>
        </div>

        {/* Page Title */}
        {pageTitle && (
          <div className="mt-6">
            <h1 className="text-3xl font-black text-gray-900">
              {pageTitle}
            </h1>
          </div>
        )}
      </div>
    </div>
  )

  const footer = (
    <div className={`bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white py-16 ${footerClassName}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Brand */}
          <div className="animate-fade-in">
            <BrandLogoLeft />
            <p className="mt-4 text-gray-300 text-sm leading-relaxed">
              Tu tienda de confianza para sneakers y ropa masculina. Estilo urbano, calidad premium.
            </p>
          </div>

          {/* Links */}
          <div className="animate-fade-in animate-delay-100">
            <h3 className="font-black text-lg mb-4 text-white">Enlaces Rápidos</h3>
            <div className="space-y-3">
              <Link 
                to="/" 
                className="block text-gray-300 hover:text-white transition-colors hover:translate-x-1 transform duration-200"
              >
                → Inicio
              </Link>
              <Link 
                to="/blog" 
                className="block text-gray-300 hover:text-white transition-colors hover:translate-x-1 transform duration-200"
              >
                → Blog
              </Link>
            </div>
          </div>

          {/* Social Links */}
          <div className="animate-fade-in animate-delay-200">
            <h3 className="font-black text-lg mb-4 text-white">Síguenos</h3>
            <SocialLinks />
            <p className="mt-4 text-gray-300 text-sm">
              Mantente al día con las últimas tendencias y ofertas exclusivas
            </p>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/20 text-center">
          <p className="text-gray-400 text-sm">
            &copy; 2024 Tu Tienda. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </div>
  )

  return (
    <>
      <PageTemplate 
        header={header}
        footer={footer}
        className={className}
        layout={layout}
      >
        {children}
      </PageTemplate>
      
      {showCart && <FloatingCart />}
    </>
  )
}