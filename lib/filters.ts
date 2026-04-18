import { Product } from '@/data/products'

export type FilterState = {
  brand: string
  category: string
  need: string
  minPrice: number
  maxPrice: number
  search: string
  sort: 'default' | 'price-asc' | 'price-desc' | 'name-asc'
}

export const DEFAULT_FILTERS: FilterState = {
  brand: '',
  category: '',
  need: '',
  minPrice: 0,
  maxPrice: 999999,
  search: '',
  sort: 'default',
}

export function filterProducts(products: Product[], filters: FilterState): Product[] {
  let result = [...products]

  if (filters.search) {
    const q = filters.search.toLowerCase()
    result = result.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.shortDescription.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.brand.toLowerCase().includes(q)
    )
  }

  if (filters.brand) {
    result = result.filter((p) => p.brand === filters.brand)
  }

  if (filters.category) {
    result = result.filter((p) => p.category === filters.category)
  }

  if (filters.need) {
    result = result.filter((p) => p.needs.includes(filters.need))
  }

  result = result.filter((p) => p.priceCRC >= filters.minPrice && p.priceCRC <= filters.maxPrice)

  switch (filters.sort) {
    case 'price-asc':
      result.sort((a, b) => a.priceCRC - b.priceCRC)
      break
    case 'price-desc':
      result.sort((a, b) => b.priceCRC - a.priceCRC)
      break
    case 'name-asc':
      result.sort((a, b) => a.name.localeCompare(b.name))
      break
  }

  return result
}
