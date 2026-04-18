'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Plus, Minus, Trash2, ShoppingBag, ArrowRight, ArrowLeft } from 'lucide-react'
import { useCart } from '@/components/CartProvider'
import { formatCRC } from '@/lib/utils'
import { buildWhatsAppURL } from '@/lib/whatsapp'

export default function CarritoPage() {
  const { cart, total, removeFromCart, updateQuantity, clearCart } = useCart()

  const [form, setForm] = useState({ name: '', location: '', notes: '' })
  const [errors, setErrors] = useState<{ name?: string; location?: string }>({})

  const validate = () => {
    const e: typeof errors = {}
    if (!form.name.trim()) e.name = 'Tu nombre es requerido'
    if (!form.location.trim()) e.location = 'Indicá tu ubicación o zona'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleSend = () => {
    if (!validate() || cart.length === 0) return
    const url = buildWhatsAppURL(cart, form)
    window.open(url, '_blank')
  }

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-brand-ivory pt-24 flex items-center justify-center px-4">
        <div className="text-center">
          <div className="w-24 h-24 rounded-full bg-brand-beige flex items-center justify-center mx-auto mb-6">
            <ShoppingBag size={40} className="text-brand-sage" />
          </div>
          <h1 className="font-display text-4xl text-brand-charcoal mb-3">Tu carrito está vacío</h1>
          <p className="text-brand-charcoal/60 mb-8 max-w-xs mx-auto">
            Explorá nuestra tienda y encontrá los productos perfectos para tu rutina de bienestar.
          </p>
          <Link
            href="/tienda"
            className="inline-flex items-center gap-2 bg-brand-green text-white font-medium px-7 py-3.5 rounded-full hover:bg-brand-green/90 transition-colors"
          >
            <ArrowLeft size={18} />
            Ir a la tienda
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-brand-ivory pt-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Header */}
        <div className="mb-8">
          <Link href="/tienda" className="inline-flex items-center gap-2 text-sm text-brand-sage hover:text-brand-green transition-colors mb-4">
            <ArrowLeft size={16} /> Seguir comprando
          </Link>
          <h1 className="font-display text-4xl md:text-5xl text-brand-charcoal">Tu carrito</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Products */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            {cart.map((item) => (
              <div key={item.product.id} className="bg-white rounded-2xl p-4 shadow-soft flex gap-4">
                <Link href={`/tienda/${item.product.slug}`} className="relative w-24 h-24 flex-shrink-0 rounded-xl overflow-hidden bg-brand-beige">
                  <Image
                    src={item.product.image}
                    alt={item.product.name}
                    fill
                    className="object-cover"
                  />
                </Link>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <Link href={`/tienda/${item.product.slug}`}>
                        <h3 className="font-medium text-brand-charcoal hover:text-brand-green transition-colors">
                          {item.product.name}
                        </h3>
                      </Link>
                      <p className="text-xs text-brand-sage mt-0.5">{item.product.brand} · {item.product.category}</p>
                    </div>
                    <button
                      onClick={() => removeFromCart(item.product.id)}
                      className="p-1.5 rounded-full hover:bg-red-50 text-red-400 transition-colors flex-shrink-0"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                  <div className="flex items-center justify-between mt-3">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                        className="w-8 h-8 rounded-full bg-brand-beige flex items-center justify-center hover:bg-brand-sage/20 transition-colors"
                      >
                        <Minus size={14} />
                      </button>
                      <span className="text-sm font-semibold w-8 text-center">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                        className="w-8 h-8 rounded-full bg-brand-beige flex items-center justify-center hover:bg-brand-sage/20 transition-colors"
                      >
                        <Plus size={14} />
                      </button>
                    </div>
                    <p className="font-display text-xl text-brand-green font-semibold">
                      {formatCRC(item.product.priceCRC * item.quantity)}
                    </p>
                  </div>
                </div>
              </div>
            ))}

            <button
              onClick={clearCart}
              className="text-sm text-red-400 hover:text-red-600 transition-colors self-start ml-1"
            >
              Vaciar carrito
            </button>
          </div>

          {/* Checkout */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-soft p-6 sticky top-24">
              <h2 className="font-display text-2xl text-brand-charcoal mb-5">Completar pedido</h2>

              {/* Form */}
              <div className="flex flex-col gap-4 mb-6">
                <div>
                  <label className="block text-sm font-medium text-brand-charcoal mb-1.5">
                    Tu nombre <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Ej: María Rodríguez"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className={`w-full px-4 py-2.5 bg-brand-ivory border rounded-xl text-sm focus:outline-none focus:ring-2 transition-all ${
                      errors.name ? 'border-red-300 focus:ring-red-200' : 'border-brand-beige focus:ring-brand-green/30 focus:border-brand-sage'
                    }`}
                  />
                  {errors.name && <p className="text-xs text-red-400 mt-1">{errors.name}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-brand-charcoal mb-1.5">
                    Ubicación / zona <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Ej: San José, Heredia, Cartago..."
                    value={form.location}
                    onChange={(e) => setForm({ ...form, location: e.target.value })}
                    className={`w-full px-4 py-2.5 bg-brand-ivory border rounded-xl text-sm focus:outline-none focus:ring-2 transition-all ${
                      errors.location ? 'border-red-300 focus:ring-red-200' : 'border-brand-beige focus:ring-brand-green/30 focus:border-brand-sage'
                    }`}
                  />
                  {errors.location && <p className="text-xs text-red-400 mt-1">{errors.location}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-brand-charcoal mb-1.5">
                    Observaciones <span className="text-brand-sage text-xs">(opcional)</span>
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Alergias, preferencia de horario de entrega, etc."
                    value={form.notes}
                    onChange={(e) => setForm({ ...form, notes: e.target.value })}
                    className="w-full px-4 py-2.5 bg-brand-ivory border border-brand-beige rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-green/30 focus:border-brand-sage transition-all resize-none"
                  />
                </div>
              </div>

              {/* Summary */}
              <div className="border-t border-brand-beige pt-4 mb-5">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm text-brand-charcoal/70">Productos ({cart.reduce((s, i) => s + i.quantity, 0)})</span>
                  <span className="text-sm font-medium">{formatCRC(total)}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-brand-charcoal/70">Envío</span>
                  <span className="text-xs text-brand-sage">A coordinar</span>
                </div>
                <div className="flex items-center justify-between mt-3 pt-3 border-t border-brand-beige">
                  <span className="font-semibold text-brand-charcoal">Subtotal</span>
                  <span className="font-display text-2xl text-brand-green">{formatCRC(total)}</span>
                </div>
              </div>

              {/* Send */}
              <button
                onClick={handleSend}
                className="w-full flex items-center justify-center gap-2 bg-[#25D366] text-white font-medium py-4 px-6 rounded-full hover:bg-[#20ba57] transition-all duration-200 group text-base"
              >
                <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                Enviar pedido por WhatsApp
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </button>
              <p className="text-center text-xs text-brand-sage mt-3">
                Se abrirá WhatsApp con tu pedido listo para enviar
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
