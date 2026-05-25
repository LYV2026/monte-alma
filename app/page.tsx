import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, ChevronDown, Star } from 'lucide-react'
import { getFeaturedProducts } from '@/data/products'
import { ProductCard } from '@/components/ProductCard'
import { getContactWhatsAppURL } from '@/lib/whatsapp'

export const metadata: Metadata = {
  title: 'Monte Alma | Productos Macrobióticos y Suplementos Naturales en Costa Rica',
  description: 'Tu tienda de bienestar natural en Costa Rica. Suplementos y productos macrobióticos seleccionados, pedidos fáciles por WhatsApp.',
}

const benefits = [
  { icon: '🌿', title: 'Productos naturales', desc: 'Seleccionados con criterio, pensados para tu bienestar integral.' },
  { icon: '📱', title: 'Pedido por WhatsApp', desc: 'Simple, rápido y cercano. Sin filas ni formularios complicados.' },
  { icon: '🇨🇷', title: 'Somos ticos', desc: 'Atención local, real y personalizada desde Tibás, Costa Rica.' },
  { icon: '🚚', title: 'Coordinamos entrega', desc: 'Entrega o retiro según tu conveniencia. Te acompañamos.' },
]

const brands = [
  { name: 'Green Labs', logo: '/brand/brand-green-labs.jpg', slug: 'Green Labs' },
  { name: 'Best Life', logo: '/brand/brand-best-life.jpg', slug: 'Best Life' },
  { name: 'Dr. Clark', logo: '/brand/brand-dr-clark.jpg', slug: 'Dr. Clark' },
  { name: 'La Casita Natural', logo: '/brand/brand-la-casita-natural.jpg', slug: 'La Casita Natural' },
]

const needs = [
  { emoji: '😴', label: 'Dormir mejor', slug: 'Dormir mejor' },
  { emoji: '🧘', label: 'Relajación', slug: 'Relajación y bienestar' },
  { emoji: '⚡', label: 'Energía', slug: 'Energía y vitalidad' },
  { emoji: '🫀', label: 'Digestión', slug: 'Digestión y metabolismo' },
  { emoji: '🩸', label: 'Azúcar y equilibrio', slug: 'Azúcar y equilibrio' },
  { emoji: '✨', label: 'Antioxidantes', slug: 'Antioxidantes' },
  { emoji: '💪', label: 'Músculos', slug: 'Músculos y recuperación' },
  { emoji: '🌸', label: 'Piel y cabello', slug: 'Piel y cabello' },
]

const steps = [
  { n: '01', title: 'Explorá la tienda', desc: 'Navegá por categorías o filtrá según tu necesidad.' },
  { n: '02', title: 'Agregá al carrito', desc: 'Seleccioná los productos que querés y ajustá cantidades.' },
  { n: '03', title: 'Enviá tu pedido', desc: 'Con un clic, tu pedido va directo a nuestro WhatsApp.' },
  { n: '04', title: 'Coordinamos juntos', desc: 'Te respondemos rápido para coordinar entrega y pago.' },
]

const testimonials = [
  { name: 'Ana Vargas', location: 'San José', rating: 5, text: 'El magnesio y la melatonina cambiaron mi rutina nocturna. Por fin duermo sin interrupciones. ¡El servicio por WhatsApp es súper fácil!' },
  { name: 'Roberto Jiménez', location: 'Heredia', rating: 5, text: 'Llevo 3 meses con el Glicofix y la Moringa en mi rutina diaria. Siento más energía y los resultados de laboratorio hablan solos.' },
  { name: 'Marcela Solís', location: 'Cartago', rating: 5, text: 'La Hierba Luna es mi salvación para los días estresantes. Yuliana siempre me asesora super bien sobre qué producto es mejor para mí.' },
]

const faqs = [
  { q: '¿Cómo realizo un pedido?', a: 'Agregá los productos que querés al carrito y presioná "Enviar pedido por WhatsApp". Te escribiremos de inmediato para coordinar entrega y forma de pago.' },
  { q: '¿Hacen entregas a domicilio?', a: 'Sí. Coordinamos entregas en el Gran Área Metropolitana. También podés pasar a retirar en Tibás. Consultanos por WhatsApp para más detalles.' },
  { q: '¿Cuáles son los métodos de pago?', a: 'Aceptamos SINPE Móvil, transferencia bancaria y efectivo. Te indicamos todos los detalles al confirmar tu pedido.' },
  { q: '¿Los productos son seguros?', a: 'Todos son suplementos alimenticios de marcas reconocidas. Si tenés alguna condición médica, consultá con tu médico antes de consumirlos.' },
  { q: '¿Puedo pedir un producto que no veo en la tienda?', a: '¡Por supuesto! Escribinos por WhatsApp y con gusto te ayudamos a encontrar lo que buscás.' },
]

export default function HomePage() {
  const featured = getFeaturedProducts()
  return (
    <>
      {/* HERO */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <Image src="/brand/hero-bg.jpg" alt="Monte Alma Costa Rica" fill className="object-cover" priority quality={90} />
          <div className="absolute inset-0 bg-gradient-to-r from-brand-charcoal/80 via-brand-charcoal/50 to-transparent" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">
          <div className="max-w-xl">
            <p className="text-brand-gold font-medium tracking-[0.2em] uppercase text-sm mb-4">🌿 Bienestar natural costarricense</p>
            <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl text-white leading-[1.05] mb-6">
              Bienestar natural<br /><em className="text-brand-gold not-italic">para tu día a día</em>
            </h1>
            <p className="text-white/80 text-lg leading-relaxed mb-8 font-light">Productos macrobióticos y suplementos naturales en Costa Rica, con atención cercana y pedidos fáciles por WhatsApp.</p>
            <div className="flex flex-wrap gap-3">
              <Link href="/tienda" className="inline-flex items-center gap-2 bg-brand-gold text-white font-medium px-7 py-3.5 rounded-full hover:bg-brand-gold/90 transition-all group">
                Comprar ahora <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <a href={getContactWhatsAppURL()} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/30 text-white font-medium px-7 py-3.5 rounded-full hover:bg-white/20 transition-all">
                <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                Escribinos
              </a>
            </div>
          </div>
        </div>
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-white/50">
          <span className="text-xs tracking-widest uppercase">Explorar</span>
          <ChevronDown size={16} className="animate-bounce" />
        </div>
      </section>

      {/* BENEFITS */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-brand-gold font-medium tracking-widest uppercase text-xs mb-3">¿Por qué Monte Alma?</p>
            <h2 className="font-display text-4xl md:text-5xl text-brand-charcoal">Tu aliado de confianza</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((b) => (
              <div key={b.title} className="text-center p-6 rounded-2xl bg-brand-ivory hover:shadow-card transition-shadow duration-300">
                <div className="text-4xl mb-4">{b.icon}</div>
                <h3 className="font-display text-xl text-brand-charcoal mb-2">{b.title}</h3>
                <p className="text-sm text-brand-charcoal/70 leading-relaxed">{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BRANDS */}
      <section className="py-16 bg-brand-beige">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <p className="text-brand-gold font-medium tracking-widest uppercase text-xs mb-3">Nuestros aliados</p>
            <h2 className="font-display text-4xl md:text-5xl text-brand-charcoal">Marcas que manejamos</h2>
            <p className="text-brand-charcoal/60 mt-3 text-sm">Tocá una marca para ver sus productos</p>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {brands.map((brand) => (
              <Link key={brand.slug} href={`/tienda?brand=${encodeURIComponent(brand.slug)}`}
                className="group bg-white rounded-2xl overflow-hidden shadow-soft hover:shadow-hover transition-all duration-300 hover:-translate-y-1">
                <div className="relative h-36 sm:h-44 w-full bg-white">
                  <Image src={brand.logo} alt={brand.name} fill className="object-cover group-hover:scale-105 transition-transform duration-500" sizes="(max-width: 640px) 50vw, 25vw" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute bottom-3 left-3 translate-y-2 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                    <span className="inline-flex items-center gap-1 bg-white text-brand-green text-xs font-semibold px-3 py-1.5 rounded-full shadow">
                      Ver productos <ArrowRight size={11} />
                    </span>
                  </div>
                </div>
                <div className="px-4 py-3 flex items-center justify-between border-t border-brand-beige">
                  <p className="font-semibold text-sm text-brand-charcoal">{brand.name}</p>
                  <ArrowRight size={14} className="text-brand-sage group-hover:text-brand-green group-hover:translate-x-1 transition-all" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED PRODUCTS */}
      <section className="py-20 bg-brand-ivory">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
            <div>
              <p className="text-brand-gold font-medium tracking-widest uppercase text-xs mb-3">Selección especial</p>
              <h2 className="font-display text-4xl md:text-5xl text-brand-charcoal">Productos destacados</h2>
            </div>
            <Link href="/tienda" className="inline-flex items-center gap-2 text-brand-green font-medium text-sm group">
              Ver todos <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {featured.map((product) => (<ProductCard key={product.id} product={product} />))}
          </div>
        </div>
      </section>

      {/* SHOP BY NEED */}
      <section className="py-20 bg-brand-green">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-brand-gold font-medium tracking-widest uppercase text-xs mb-3">Encontrá lo que necesitás</p>
            <h2 className="font-display text-4xl md:text-5xl text-white">Comprá por necesidad</h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {needs.map((need) => (
              <Link key={need.slug} href={`/tienda?need=${encodeURIComponent(need.slug)}`}
                className="group bg-white/10 hover:bg-white/20 border border-white/20 rounded-2xl p-4 text-center transition-all hover:scale-105">
                <div className="text-3xl mb-2">{need.emoji}</div>
                <p className="text-white font-medium text-sm">{need.label}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* HOW TO BUY */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="text-brand-gold font-medium tracking-widest uppercase text-xs mb-3">Simple y cercano</p>
            <h2 className="font-display text-4xl md:text-5xl text-brand-charcoal">¿Cómo comprás?</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((s, i) => (
              <div key={s.n} className="relative text-center">
                {i < steps.length - 1 && <div className="hidden lg:block absolute top-8 left-full w-full h-px border-t-2 border-dashed border-brand-beige z-0" />}
                <div className="w-16 h-16 rounded-full bg-brand-ivory flex items-center justify-center mx-auto mb-4 border-2 border-brand-beige">
                  <span className="font-display text-2xl text-brand-gold font-bold">{s.n}</span>
                </div>
                <h3 className="font-display text-xl text-brand-charcoal mb-2">{s.title}</h3>
                <p className="text-sm text-brand-charcoal/70 leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link href="/tienda" className="inline-flex items-center gap-2 bg-brand-green text-white font-medium px-8 py-4 rounded-full hover:bg-brand-green/90 transition-all group text-lg">
              Empezar a comprar <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-20 bg-brand-beige">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-brand-gold font-medium tracking-widest uppercase text-xs mb-3">Lo que dicen</p>
            <h2 className="font-display text-4xl md:text-5xl text-brand-charcoal">Experiencias reales</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t) => (
              <div key={t.name} className="bg-white rounded-2xl p-6 shadow-soft">
                <div className="flex gap-1 mb-4">{Array.from({ length: t.rating }).map((_, i) => <Star key={i} size={16} className="fill-brand-gold text-brand-gold" />)}</div>
                <p className="text-brand-charcoal/80 text-sm leading-relaxed mb-5 italic">"{t.text}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-brand-sage/30 flex items-center justify-center">
                    <span className="text-brand-green font-semibold text-sm">{t.name[0]}</span>
                  </div>
                  <div>
                    <p className="font-semibold text-sm text-brand-charcoal">{t.name}</p>
                    <p className="text-xs text-brand-sage">{t.location}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <p className="text-brand-gold font-medium tracking-widest uppercase text-xs mb-3">Preguntas frecuentes</p>
            <h2 className="font-display text-4xl md:text-5xl text-brand-charcoal">¿Tenés dudas?</h2>
          </div>
          <div className="flex flex-col gap-3">
            {faqs.map((faq) => (
              <details key={faq.q} className="group bg-brand-ivory rounded-2xl p-5 cursor-pointer">
                <summary className="flex items-center justify-between font-medium text-brand-charcoal list-none">
                  {faq.q}
                  <ChevronDown size={18} className="text-brand-sage group-open:rotate-180 transition-transform flex-shrink-0 ml-4" />
                </summary>
                <p className="mt-3 text-sm text-brand-charcoal/70 leading-relaxed">{faq.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="py-20 bg-brand-charcoal">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <div className="relative h-20 w-44 mx-auto mb-6">
            <Image src="/brand/logo-gold-main.jpg" alt="Monte Alma" fill className="object-contain" />
          </div>
          <h2 className="font-display text-4xl md:text-5xl text-white mb-4">
            Tu dosis diaria de <em className="text-brand-gold not-italic">pura vida</em>
          </h2>
          <p className="text-white/70 mb-8 leading-relaxed max-w-lg mx-auto">Comenzá tu rutina de bienestar natural hoy. Explorá nuestra tienda o escribinos directamente.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/tienda" className="inline-flex items-center gap-2 bg-brand-gold text-white font-medium px-7 py-3.5 rounded-full hover:bg-brand-gold/90 transition-all">Ver tienda completa</Link>
            <a href={getContactWhatsAppURL()} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 border border-white/30 text-white font-medium px-7 py-3.5 rounded-full hover:bg-white/10 transition-all">Consultar por WhatsApp</a>
          </div>
          <p className="mt-8 text-xs text-white/30">Suplementos alimenticios. No sustituyen una alimentación balanceada ni tratamientos médicos.</p>
        </div>
      </section>
    </>
  )
}
