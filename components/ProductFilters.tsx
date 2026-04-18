'use client'

import { Search, SlidersHorizontal, X } from 'lucide-react'
import { FilterState } from '@/lib/filters'
import { BRANDS, CATEGORIES, NEEDS, products } from '@/data/products'

const MAX_PRICE = 35000
const MIN_PRICE = 0

type Props = {
  filters: FilterState
  onChange: (filters: FilterState) => void
  total: number
}

export function ProductFilters({ filters, onChange, total }: Props) {
  const update = (key: keyof FilterState, value: string | number) =>
    onChange({ ...filters, [key]: value })

  const clearAll = () =>
    onChange({ brand: '', category: '', need: '', minPrice: 0, maxPrice: MAX_PRICE, search: '', sort: 'default' })

  const hasFilters = filters.brand || filters.category || filters.need || filters.search || filters.minPrice > 0 || filters.maxPrice < MAX_PRICE

  return (
    <aside className="w-full">
      {/* Search */}
      <div className="relative mb-5">
        <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-brand-sage" />
        <input
          type="text"
          placeholder="Buscar producto..."
          value={filters.search}
          onChange={(e) => update('search', e.target.value)}
          className="w-full pl-10 pr-4 py-3 bg-white border border-brand-beige rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-green/30 focus:border-brand-sage transition-all"
        />
        {filters.search && (
          <button onClick={() => update('search', '')} className="absolute right-3 top-1/2 -translate-y-1/2 text-brand-sage hover:text-brand-charcoal">
            <X size={15} />
          </button>
        )}
      </div>

      {/* Results + Clear */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2 text-sm text-brand-sage">
          <SlidersHorizontal size={15} />
          <span>{total} {total === 1 ? 'producto' : 'productos'}</span>
        </div>
        {hasFilters && (
          <button onClick={clearAll} className="text-xs text-brand-green hover:underline font-medium">
            Limpiar filtros
          </button>
        )}
      </div>

      {/* Sort */}
      <div className="mb-5">
        <label className="block text-xs font-semibold uppercase tracking-wider text-brand-sage mb-2">Ordenar</label>
        <select
          value={filters.sort}
          onChange={(e) => update('sort', e.target.value)}
          className="w-full px-3 py-2.5 bg-white border border-brand-beige rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-green/30 appearance-none cursor-pointer"
        >
          <option value="default">Destacados</option>
          <option value="price-asc">Precio: menor a mayor</option>
          <option value="price-desc">Precio: mayor a menor</option>
          <option value="name-asc">Nombre A–Z</option>
        </select>
      </div>

      {/* Brand */}
      <div className="mb-5">
        <label className="block text-xs font-semibold uppercase tracking-wider text-brand-sage mb-2">Marca</label>
        <div className="flex flex-col gap-1.5">
          <button
            onClick={() => update('brand', '')}
            className={`text-left text-sm px-3 py-2 rounded-lg transition-colors ${!filters.brand ? 'bg-brand-green text-white' : 'bg-white text-brand-charcoal hover:bg-brand-beige'}`}
          >
            Todas las marcas
          </button>
          {BRANDS.map((brand) => (
            <button
              key={brand}
              onClick={() => update('brand', filters.brand === brand ? '' : brand)}
              className={`text-left text-sm px-3 py-2 rounded-lg transition-colors ${filters.brand === brand ? 'bg-brand-green text-white' : 'bg-white text-brand-charcoal hover:bg-brand-beige'}`}
            >
              {brand}
            </button>
          ))}
        </div>
      </div>

      {/* Category */}
      <div className="mb-5">
        <label className="block text-xs font-semibold uppercase tracking-wider text-brand-sage mb-2">Categoría</label>
        <div className="flex flex-col gap-1.5">
          <button
            onClick={() => update('category', '')}
            className={`text-left text-sm px-3 py-2 rounded-lg transition-colors ${!filters.category ? 'bg-brand-green text-white' : 'bg-white text-brand-charcoal hover:bg-brand-beige'}`}
          >
            Todas
          </button>
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => update('category', filters.category === cat ? '' : cat)}
              className={`text-left text-sm px-3 py-2 rounded-lg transition-colors ${filters.category === cat ? 'bg-brand-green text-white' : 'bg-white text-brand-charcoal hover:bg-brand-beige'}`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Need */}
      <div className="mb-5">
        <label className="block text-xs font-semibold uppercase tracking-wider text-brand-sage mb-2">¿Qué buscás?</label>
        <div className="flex flex-wrap gap-2">
          {NEEDS.map((need) => (
            <button
              key={need}
              onClick={() => update('need', filters.need === need ? '' : need)}
              className={`text-xs px-3 py-1.5 rounded-full border transition-all ${filters.need === need ? 'bg-brand-green text-white border-brand-green' : 'bg-white text-brand-charcoal border-brand-beige hover:border-brand-sage'}`}
            >
              {need}
            </button>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div className="mb-2">
        <label className="block text-xs font-semibold uppercase tracking-wider text-brand-sage mb-3">
          Precio máximo: <span className="text-brand-green font-bold">₡{filters.maxPrice.toLocaleString('es-CR')}</span>
        </label>
        <input
          type="range"
          min={MIN_PRICE}
          max={MAX_PRICE}
          step={500}
          value={filters.maxPrice}
          onChange={(e) => update('maxPrice', Number(e.target.value))}
          className="w-full accent-brand-green"
        />
        <div className="flex justify-between text-xs text-brand-sage mt-1">
          <span>₡0</span>
          <span>₡35.000</span>
        </div>
      </div>
    </aside>
  )
}
