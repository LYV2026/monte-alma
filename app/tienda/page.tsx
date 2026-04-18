'use client'

import { useState, useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { SlidersHorizontal, X } from 'lucide-react'
import { products } from '@/data/products'
import { ProductCard } from '@/components/ProductCard'
import { ProductFilters } from '@/components/ProductFilters'
import { filterProducts, FilterState, DEFAULT_FILTERS } from '@/lib/filters'

const MAX_PRICE = 35000

function TiendaContent() {
  const searchParams = useSearchParams()
  const [filters, setFilters] = useState<FilterState>({
    ...DEFAULT_FILTERS,
    maxPrice: MAX_PRICE,
    need: searchParams.get('need') || '',
    category: searchParams.get('category') || '',
    brand: searchParams.get('brand') || '',
  })
  const [showFilters, setShowFilters] = useState(false)

  useEffect(() => {
    const need = searchParams.get('need') || ''
    const category = searchParams.get('category') || ''
    const brand = searchParams.get('brand') || ''
    if (need || category || brand) {
      setFilters((f) => ({ ...f, need, category, brand }))
    }
  }, [searchParams])

  const filtered = filterProducts(products, filters)

  return (
    <div className="min-h-screen bg-brand-ivory">
      {/* Page header */}
      <div className="bg-white border-b border-brand-beige pt-24 pb-10 px-4">
        <div className="max-w-7xl mx-auto">
          <p className="text-brand-gold font-medium tracking-widest uppercase text-xs mb-2">Catálogo</p>
          <h1 className="font-display text-4xl md:text-5xl text-brand-charcoal">Nuestra tienda</h1>
          <p className="text-brand-charcoal/60 mt-2 text-sm">
            {products.length} productos naturales seleccionados con cuidado
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-8">
          {/* Desktop Sidebar */}
          <div className="hidden lg:block w-64 flex-shrink-0">
            <div className="sticky top-24 bg-brand-ivory rounded-2xl p-5">
              <ProductFilters filters={filters} onChange={setFilters} total={filtered.length} />
            </div>
          </div>

          {/* Main */}
          <div className="flex-1 min-w-0">
            {/* Mobile filter button */}
            <div className="lg:hidden flex items-center justify-between mb-4">
              <p className="text-sm text-brand-sage">{filtered.length} productos</p>
              <button
                onClick={() => setShowFilters(true)}
                className="flex items-center gap-2 bg-white border border-brand-beige text-brand-charcoal text-sm font-medium px-4 py-2 rounded-full shadow-soft"
              >
                <SlidersHorizontal size={16} />
                Filtros
              </button>
            </div>

            {/* Mobile Filter Overlay */}
            {showFilters && (
              <>
                <div className="fixed inset-0 bg-black/40 z-40" onClick={() => setShowFilters(false)} />
                <div className="fixed left-0 top-0 h-full w-80 bg-brand-ivory z-50 overflow-y-auto p-6 shadow-2xl">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="font-display text-2xl text-brand-charcoal">Filtros</h3>
                    <button onClick={() => setShowFilters(false)} className="p-2 hover:bg-brand-beige rounded-full">
                      <X size={20} />
                    </button>
                  </div>
                  <ProductFilters filters={filters} onChange={setFilters} total={filtered.length} />
                  <button
                    onClick={() => setShowFilters(false)}
                    className="w-full mt-6 bg-brand-green text-white py-3 rounded-full font-medium"
                  >
                    Ver {filtered.length} productos
                  </button>
                </div>
              </>
            )}

            {/* Product grid */}
            {filtered.length === 0 ? (
              <div className="text-center py-20">
                <div className="text-5xl mb-4">🌿</div>
                <h3 className="font-display text-2xl text-brand-charcoal mb-2">Sin resultados</h3>
                <p className="text-brand-sage text-sm">Intentá con otros filtros o buscá otro término.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
                {filtered.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default function TiendaPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-brand-ivory pt-24 flex items-center justify-center"><div className="text-brand-sage">Cargando...</div></div>}>
      <TiendaContent />
    </Suspense>
  )
}
