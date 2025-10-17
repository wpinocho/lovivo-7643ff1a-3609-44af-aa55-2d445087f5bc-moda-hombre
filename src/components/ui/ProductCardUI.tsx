import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"
import { HeadlessProductCard } from "@/components/headless/HeadlessProductCard"
import type { Product } from "@/lib/supabase"
import { ShoppingBag } from "lucide-react"

interface ProductCardUIProps {
  product: Product
}

export const ProductCardUI = ({ product }: ProductCardUIProps) => {
  return (
    <HeadlessProductCard product={product}>
      {(logic) => (
        <Card className="group bg-white border-2 border-gray-100 hover:border-purple-300 transition-all duration-300 overflow-hidden card-hover-effect">
          <CardContent className="p-0">
            <Link to={`/products/${logic.product.slug}`} className="block">
              <div className="aspect-square bg-gradient-to-br from-gray-100 to-gray-200 rounded-t-lg overflow-hidden relative">
                {(logic.matchingVariant?.image || (logic.product.images && logic.product.images.length > 0)) ? (
                  <img
                    src={(logic.matchingVariant?.image as any) || logic.product.images![0]}
                    alt={logic.product.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-400">
                    <ShoppingBag className="h-16 w-16" />
                  </div>
                )}

                {/* Badges con animación */}
                <div className="absolute top-3 left-3 flex flex-col gap-2">
                  {logic.discountPercentage && (
                    <span className="bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs font-black px-3 py-1.5 rounded-full shadow-lg animate-scale-in">
                      -{logic.discountPercentage}% OFF
                    </span>
                  )}
                  {logic.product.featured && (
                    <span className="bg-gradient-to-r from-orange-500 to-yellow-500 text-white text-xs font-black px-3 py-1.5 rounded-full shadow-lg animate-scale-in animate-delay-100">
                      ⭐ DESTACADO
                    </span>
                  )}
                  {!logic.inStock && (
                    <span className="bg-gray-900 text-white text-xs font-black px-3 py-1.5 rounded-full shadow-lg">
                      AGOTADO
                    </span>
                  )}
                </div>

                {/* Overlay hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
            </Link>

            <div className="p-4">
              <Link to={`/products/${logic.product.slug}`}>
                <h3 className="text-gray-900 font-bold text-base mb-2 line-clamp-2 group-hover:text-purple-600 transition-colors">
                  {logic.product.title}
                </h3>
                {logic.product.description && (
                  <p className="text-gray-500 text-xs mb-3 line-clamp-2">
                    {logic.product.description.replace(/<[^>]*>/g, '')}
                  </p>
                )}
              </Link>

              {logic.hasVariants && logic.options && (
                <div className="mb-3 space-y-2">
                  {logic.options.map((opt) => (
                    <div key={opt.id}>
                      <div className="text-xs font-bold text-gray-700 mb-1.5">{opt.name}</div>
                      <div className="flex flex-wrap gap-2">
                        {opt.values.filter(val => logic.isOptionValueAvailable(opt.name, val)).map((val) => {
                          const isSelected = logic.selected[opt.name] === val
                          const swatch = opt.name.toLowerCase() === 'color' ? opt.swatches?.[val] : undefined

                          if (swatch) {
                            return (
                              <button
                                key={val}
                                type="button"
                                onClick={() => logic.handleOptionChange(opt.name, val)}
                                title={`${opt.name}: ${val}`}
                                className={`h-7 w-7 rounded-full border-2 transition-all duration-200 ${
                                  isSelected 
                                    ? 'border-purple-600 ring-2 ring-purple-300 scale-110' 
                                    : 'border-gray-300 hover:border-purple-400'
                                } ${logic.selected[opt.name] && !isSelected ? 'opacity-40' : ''}`}
                                style={{ backgroundColor: swatch }}
                                aria-label={`${opt.name}: ${val}`}
                              />
                            )
                          }

                          return (
                            <button
                              key={val}
                              type="button"
                              onClick={() => logic.handleOptionChange(opt.name, val)}
                              className={`border-2 rounded-lg px-3 py-1.5 text-xs font-bold transition-all duration-200 ${
                                isSelected 
                                  ? 'border-purple-600 bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-md scale-105' 
                                  : logic.selected[opt.name] && !isSelected
                                    ? 'border-gray-300 bg-white text-gray-400 opacity-40'
                                    : 'border-gray-300 bg-white text-gray-700 hover:border-purple-400 hover:text-purple-600'
                              }`}
                              aria-pressed={isSelected}
                              aria-label={`${opt.name}: ${val}`}
                              title={`${opt.name}: ${val}`}
                            >
                              {val}
                            </button>
                          )
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                <div className="flex flex-col">
                  <span className="text-gray-900 font-black text-lg">
                    {logic.formatMoney(logic.currentPrice)}
                  </span>
                  {logic.currentCompareAt && logic.currentCompareAt > logic.currentPrice && (
                    <span className="text-gray-400 text-sm line-through">
                      {logic.formatMoney(logic.currentCompareAt)}
                    </span>
                  )}
                </div>
                <Button
                  variant="default"
                  size="sm"
                  onClick={() => {
                    logic.onAddToCartSuccess()
                    logic.handleAddToCart()
                  }}
                  disabled={!logic.canAddToCart}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {logic.inStock ? (
                    <>
                      <ShoppingBag className="h-4 w-4 mr-1" />
                      Agregar
                    </>
                  ) : (
                    'Agotado'
                  )}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </HeadlessProductCard>
  )
}