'use client'

import Image from 'next/image'
import Link from 'next/link'
import { ShoppingBag } from 'lucide-react'
import { Product } from '@/data/products'
import { formatCRC } from '@/lib/utils'
import { useCart } from './CartProvider'

export function ProductCard({ product }: { product: Product }) {
  const { addToCart } = useCart()

  return (
    <div className="group bg-white rounded-2xl overflow-hidden shadow-soft hover:shadow-hover transition-all duration-300 flex flex-col">
      <Link href={`/tienda/${product.slug}`} className="block relative aspect-[3/4] bg-brand-beige overflow-hidden">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-contain group-hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm text-brand-green text-xs font-semibold px-2.5 py-1 rounded-full">
          {product.brand}
        </span>
      </Link>
      <div className="flex flex-col flex-1 p-4 gap-2">
        <p className="text-xs text-brand-sage font-medium uppercase tracking-wider">{product.category}</p>
        <Link href={`/tienda/${product.slug}`}>
          <h3 className="font-display text-xl text-brand-charcoal leading-tight group-hover:text-brand-green transition-colors line-clamp-2">
            {product.name}
          </h3>
        </Link>
        <p className="text-sm text-brand-charcoal/70 line-clamp-2 leading-relaxed flex-1">{product.shortDescription}</p>
        <div className="flex flex-wrap gap-1 mt-1">
          {product.needs.slice(0, 2).map((need) => (
            <span key={need} className="text-xs bg-brand-beige text-brand-green px-2 py-0.5 rounded-full">{need}</span>
          ))}
        </div>
        <div className="flex items-center justify-between mt-3 pt-3 border-t border-brand-beige">
          <p className="font-display text-2xl text-brand-green font-semibold">{formatCRC(product.priceCRC)}</p>
          <button
            onClick={() => addToCart(product)}
            className="flex items-center gap-1.5 bg-brand-green text-white text-sm font-medium px-4 py-2 rounded-full hover:bg-brand-green/90 active:scale-95 transition-all duration-200"
          >
            <ShoppingBag size={14} />
            Agregar
          </button>
        </div>
      </div>
    </div>
  )
}
