import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Heart, Leaf, Shield, Users } from 'lucide-react'
import { getContactWhatsAppURL } from '@/lib/whatsapp'

export const metadata: Metadata = {
  title: 'Nosotros',
  description: 'Conocé la historia de Monte Alma, tu tienda de productos macrobióticos y suplementos naturales en Costa Rica.',
}

const values = [
  { icon: Leaf, title: 'Natural', desc: 'Seleccionamos productos basados en ingredientes naturales, pensados para complementar un estilo de vida saludable.' },
  { icon: Heart, title: 'Cercano', desc: 'Somos ticos, hablamos tu idioma y entendemos tu día a día. La atención personalizada no es un extra, es nuestra esencia.' },
  { icon: Shield, title: 'Confiable', desc: 'Trabajamos solo con marcas reconocidas y de calidad comprobada. Tu bienestar y confianza son nuestra prioridad.' },
  { icon: Users, title: 'Para todos', desc: 'Desde quien empieza hasta quien ya lleva años cuidando su salud. Tenemos algo para cada etapa de tu camino.' },
]

export default function NosotrosPage() {
  return (
    <div className="min-h-screen bg-brand-ivory pt-20">
      {/* Hero */}
      <section className="relative py-24 bg-brand-green overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <Image src="/brand/wellness.png" alt="" fill className="object-cover" />
        </div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <p className="text-brand-gold font-medium tracking-widest uppercase text-xs mb-4">Nuestra historia</p>
          <h1 className="font-display text-5xl md:text-6xl text-white mb-6 leading-tight">
            Nació del deseo de<br />
            <em className="text-brand-gold not-italic">vivir mejor</em>
          </h1>
          <p className="text-white/80 text-lg leading-relaxed max-w-xl mx-auto">
            Monte Alma es una tienda tica fundada con un propósito claro: acercar el bienestar natural a las familias costarricenses de una forma simple, confiable y con mucho cariño.
          </p>
        </div>
      </section>

      {/* Story */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
            <div>
              <p className="text-brand-gold font-medium tracking-widest uppercase text-xs mb-4">¿Quiénes somos?</p>
              <h2 className="font-display text-4xl md:text-5xl text-brand-charcoal mb-6 leading-tight">
                Detrás de Monte Alma hay una historia real
              </h2>
              <div className="flex flex-col gap-4 text-brand-charcoal/70 leading-relaxed">
                <p>
                  Monte Alma nació en Tibás, Costa Rica, de la mano de <strong className="text-brand-charcoal">Yuliana Mora Jaen</strong>, una mujer apasionada por el bienestar integral que buscaba opciones naturales para ella y su familia.
                </p>
                <p>
                  Lo que empezó como una búsqueda personal se convirtió en una misión: compartir con más personas los productos que realmente funcionan, con la atención cercana y honesta que todos merecemos.
                </p>
                <p>
                  Hoy, Monte Alma es un espacio de confianza donde cada producto es seleccionado con criterio, cada consulta es respondida con dedicación y cada pedido se hace con el calor humano que caracteriza a Costa Rica.
                </p>
                <p className="italic text-brand-green font-medium">
                  "Creo en el poder de lo natural. Creo en que pequeños cambios hacen grandes diferencias. Y creo que todos merecemos sentirnos bien." — Yuliana
                </p>
              </div>
            </div>
            <div className="relative">
              <div className="relative aspect-square rounded-3xl overflow-hidden shadow-card">
                <Image
                  src="/brand/about.jpg"
                  alt="Monte Alma Costa Rica"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="absolute -bottom-4 -left-4 bg-brand-gold text-white p-5 rounded-2xl shadow-lg">
                <p className="font-display text-3xl font-bold">🌿</p>
                <p className="font-semibold text-sm mt-1">Productos naturales</p>
                <p className="text-white/80 text-xs">con atención tica</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Philosophy */}
      <section className="py-20 bg-brand-beige">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <p className="text-brand-gold font-medium tracking-widest uppercase text-xs mb-4">Nuestra filosofía</p>
          <h2 className="font-display text-4xl md:text-5xl text-brand-charcoal mb-8">
            Bienestar integral, no soluciones mágicas
          </h2>
          <p className="text-brand-charcoal/70 text-lg leading-relaxed mb-6">
            En Monte Alma creemos que el bienestar real viene de hábitos consistentes, buena alimentación, descanso y suplementos que complementen ese estilo de vida. Nunca prometemos milagros porque no los hay.
          </p>
          <p className="text-brand-charcoal/70 leading-relaxed">
            Lo que sí ofrecemos es acompañarte con productos de calidad, asesoría honesta y una experiencia de compra tan simple como escribirle a un amigo. Porque eso somos: tu aliado de confianza en el camino hacia una vida más sana.
          </p>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-brand-gold font-medium tracking-widest uppercase text-xs mb-4">Lo que nos mueve</p>
            <h2 className="font-display text-4xl md:text-5xl text-brand-charcoal">Nuestros valores</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v) => (
              <div key={v.title} className="bg-brand-ivory rounded-2xl p-6 text-center hover:shadow-card transition-shadow">
                <div className="w-12 h-12 rounded-full bg-brand-green/10 flex items-center justify-center mx-auto mb-4">
                  <v.icon size={22} className="text-brand-green" />
                </div>
                <h3 className="font-display text-xl text-brand-charcoal mb-2">{v.title}</h3>
                <p className="text-sm text-brand-charcoal/70 leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-brand-charcoal">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="font-display text-4xl md:text-5xl text-white mb-4">
            ¿Querés conocer más?
          </h2>
          <p className="text-white/70 mb-8 leading-relaxed">
            Escribinos directamente por WhatsApp y con mucho gusto te asesoramos sobre cuál producto es el mejor aliado para tus necesidades.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href={getContactWhatsAppURL()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#25D366] text-white font-medium px-7 py-3.5 rounded-full hover:bg-[#20ba57] transition-colors"
            >
              <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
              Escribinos por WhatsApp
            </a>
            <Link
              href="/tienda"
              className="inline-flex items-center gap-2 border border-white/30 text-white font-medium px-7 py-3.5 rounded-full hover:bg-white/10 transition-colors"
            >
              Ver tienda <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
