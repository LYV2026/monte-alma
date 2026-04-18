'use client'

import { useState } from 'react'
import { ShoppingBag, Check } from 'lucide-react'
import { Product } from '@/data/products'
import { useCart } from './CartProvider'
import { cn } from '@/lib/utils'

type Props = {
  product: Product
  className?: string
}

export function AddToCartButton({ product, className }: Props) {
  const { addToCart } = useCart()
  const [added, setAdded] = useState(false)

  const handleAdd = () => {
    addToCart(product)
    setAdded(true)
    setTimeout(() => setAdded(false), 1800)
  }

  return (
    <button
      onClick={handleAdd}
      className={cn(
        'flex items-center justify-center gap-2 font-medium py-3.5 px-6 rounded-full transition-all duration-200',
        added
          ? 'bg-brand-sage text-white'
          : 'bg-brand-green text-white hover:bg-brand-green/90 active:scale-95',
        className
      )}
    >
      {added ? (
        <>
          <Check size={18} />
          ¡Agregado!
        </>
      ) : (
        <>
          <ShoppingBag size={18} />
          Agregar al carrito
        </>
      )}
    </button>
  )
}
