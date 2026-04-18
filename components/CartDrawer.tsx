'use client'

import { X, Plus, Minus, Trash2, ShoppingBag, ArrowRight } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useCart } from './CartProvider'
import { formatCRC } from '@/lib/utils'

export function CartDrawer() {
  const { cart, count, total, isOpen, closeCart, removeFromCart, updateQuantity } = useCart()

  if (!isOpen) return null

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/40 z-50 animate-fade-in"
        onClick={closeCart}
      />

      {/* Drawer */}
      <div className="fixed right-0 top-0 h-full w-full max-w-md bg-brand-ivory z-50 shadow-2xl flex flex-col animate-slide-in-right">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-brand-beige">
          <div className="flex items-center gap-3">
            <ShoppingBag size={20} className="text-brand-green" />
            <h2 className="font-display text-2xl text-brand-charcoal">Tu carrito</h2>
            {count > 0 && (
              <span className="bg-brand-green text-white text-xs font-semibold px-2 py-0.5 rounded-full">
                {count}
              </span>
            )}
          </div>
          <button
            onClick={closeCart}
            className="p-2 rounded-full hover:bg-brand-beige transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-6 py-4">
          {cart.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full gap-4 text-center">
              <div className="w-20 h-20 rounded-full bg-brand-beige flex items-center justify-center">
                <ShoppingBag size={32} className="text-brand-sage" />
              </div>
              <p className="font-display text-2xl text-brand-charcoal">Tu carrito está vacío</p>
              <p className="text-sm text-brand-sage">Explorá nuestros productos y encontrá lo que tu cuerpo necesita.</p>
              <Link
                href="/tienda"
                onClick={closeCart}
                className="mt-2 bg-brand-green text-white px-6 py-2.5 rounded-full text-sm font-medium hover:bg-brand-green/90 transition-colors"
              >
                Ver tienda
              </Link>
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              {cart.map((item) => (
                <div key={item.product.id} className="flex gap-4 bg-white rounded-2xl p-3 shadow-soft">
                  <div className="relative w-20 h-20 flex-shrink-0 rounded-xl overflow-hidden bg-brand-beige">
                    <Image
                      src={item.product.image}
                      alt={item.product.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm text-brand-charcoal truncate">{item.product.name}</p>
                    <p className="text-xs text-brand-sage mt-0.5">{item.product.brand}</p>
                    <p className="text-brand-green font-semibold text-sm mt-1">
                      {formatCRC(item.product.priceCRC * item.quantity)}
                    </p>
                    <div className="flex items-center gap-2 mt-2">
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                        className="w-7 h-7 rounded-full bg-brand-beige flex items-center justify-center hover:bg-brand-sage/20 transition-colors"
                      >
                        <Minus size={12} />
                      </button>
                      <span className="text-sm font-semibold w-6 text-center">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                        className="w-7 h-7 rounded-full bg-brand-beige flex items-center justify-center hover:bg-brand-sage/20 transition-colors"
                      >
                        <Plus size={12} />
                      </button>
                      <button
                        onClick={() => removeFromCart(item.product.id)}
                        className="ml-auto p-1.5 rounded-full hover:bg-red-50 text-red-400 transition-colors"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {cart.length > 0 && (
          <div className="px-6 py-5 border-t border-brand-beige bg-white">
            <div className="flex items-center justify-between mb-4">
              <span className="text-brand-charcoal font-medium">Subtotal</span>
              <span className="font-display text-2xl text-brand-green">{formatCRC(total)}</span>
            </div>
            <Link
              href="/carrito"
              onClick={closeCart}
              className="flex items-center justify-center gap-2 w-full bg-brand-green text-white py-3.5 rounded-full font-medium hover:bg-brand-green/90 transition-all duration-200 group"
            >
              Finalizar pedido
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <p className="text-center text-xs text-brand-sage mt-3">
              Pedido se envía por WhatsApp • Coordinamos entrega y pago
            </p>
          </div>
        )}
      </div>
    </>
  )
}
