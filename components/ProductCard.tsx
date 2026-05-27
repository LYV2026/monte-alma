'use client'

import Image from 'next/image'
import Link from 'next/link'
import { ShoppingBag, ArrowUpRight } from 'lucide-react'
import { Product } from '@/data/products'
import { formatCRC } from '@/lib/utils'
import { useCart } from './CartProvider'

export function ProductCard({ product }: { product: Product }) {
  const { addToCart } = useCart()

  return (
    <div className="group bg-white rounded-2xl overflow-hidden shadow-soft hover:shadow-hover transition-all duration-300 hover:-translate-y-1.5 flex flex-col border border-brand-beige/80 hover:border-brand-sage/30">
      {/* Image area */}
      <Link
        href={`/tienda/${product.slug}`}
        className="block relative aspect-[3/4] bg-brand-beige overflow-hidden cursor-pointer"
      >
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-contain group-hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        {/* Brand badge */}
        <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm text-brand-green text-xs font-semibold px-2.5 py-1 rounded-full shadow-sm">
          {product.brand}
        </span>
        {/* View overlay */}
        <div className="absolute inset-0 bg-brand-charcoal/0 group-hover:bg-brand-charcoal/5 transition-colors duration-300" />
        <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 translate-y-1 group-hover:translate-y-0 transition-all duration-200">
          <div className="w-8 h-8 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-sm">
            <ArrowUpRight size={14} className="text-brand-green" aria-hidden="true" />
          </div>
        </div>
      </Link>

      {/* Content */}
      <div className="flex flex-col flex-1 p-4 gap-2">
        <p className="text-[11px] text-brand-sage font-semibold uppercase tracking-wider">{product.category}</p>

        <Link href={`/tienda/${product.slug}`} className="cursor-pointer">
          <h3 className="font-display text-xl text-brand-charcoal leading-tight group-hover:text-brand-green transition-colors duration-200 line-clamp-2">
            {product.name}
          </h3>
        </Link>

        <p className="text-sm text-brand-charcoal/65 line-clamp-2 leading-relaxed flex-1">
          {product.shortDescription}
        </p>

        {/* Need tags */}
        {product.needs.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-1">
            {product.needs.slice(0, 2).map((need) => (
              <span
                key={need}
                className="text-[11px] bg-brand-green/8 text-brand-green px-2.5 py-0.5 rounded-full font-medium border border-brand-green/10"
              >
                {need}
              </span>
            ))}
          </div>
        )}

        {/* Price + CTA */}
        <div className="flex items-center justify-between mt-3 pt-3 border-t border-brand-beige">
          <p className="font-display text-2xl text-brand-green font-semibold leading-none">
            {formatCRC(product.priceCRC)}
          </p>
          <button
            onClick={() => addToCart(product)}
            className="flex items-center gap-1.5 bg-brand-green text-white text-sm font-medium px-4 py-2 rounded-full hover:bg-brand-green/90 active:scale-95 transition-all duration-200 cursor-pointer shadow-sm"
          >
            <ShoppingBag size={13} aria-hidden="true" />
            Agregar
          </button>
        </div>
      </div>
    </div>
  )
}
