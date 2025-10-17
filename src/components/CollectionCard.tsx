import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { type Collection } from '@/lib/supabase'
import { ArrowRight, Package } from 'lucide-react'

interface CollectionCardProps {
  collection: Collection
  onViewProducts: (collectionId: string) => void
}

export const CollectionCard = ({ collection, onViewProducts }: CollectionCardProps) => {
  return (
    <Card className="group bg-white border-2 border-gray-100 hover:border-purple-300 overflow-hidden card-hover-effect">
      <CardContent className="p-0">
        <div className="aspect-[4/3] bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden relative">
          {collection.image ? (
            <>
              <img 
                src={collection.image} 
                alt={collection.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300"></div>
            </>
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-400">
              <Package className="h-20 w-20" />
            </div>
          )}
          
          {/* Badge Featured */}
          {collection.featured && (
            <div className="absolute top-4 right-4">
              <span className="bg-gradient-to-r from-orange-500 to-yellow-500 text-white text-xs font-black px-3 py-1.5 rounded-full shadow-lg animate-scale-in">
                ⭐ DESTACADO
              </span>
            </div>
          )}

          {/* Título sobre la imagen */}
          <div className="absolute bottom-0 left-0 right-0 p-6">
            <h3 className="text-white font-black text-2xl mb-2 text-shadow">
              {collection.name}
            </h3>
          </div>
        </div>
        
        <div className="p-5 bg-gradient-to-br from-white to-gray-50">
          {collection.description && (
            <p className="text-gray-600 text-sm mb-4 line-clamp-2">
              {collection.description}
            </p>
          )}
          
          <Button 
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 group"
            onClick={() => onViewProducts(collection.id)}
          >
            Ver Productos
            <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}