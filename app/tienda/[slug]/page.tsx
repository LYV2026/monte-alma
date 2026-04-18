import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft, Check, AlertCircle } from 'lucide-react'
import { products, getProductBySlug, getRelatedProducts } from '@/data/products'
import { formatCRC } from '@/lib/utils'
import { buildQuickWhatsAppURL } from '@/lib/whatsapp'
import { ProductCard } from '@/components/ProductCard'
import { AddToCartButton } from '@/components/AddToCartButton'

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const product = getProductBySlug(params.slug)
  if (!product) return {}
  return {
    title: product.name,
    description: product.shortDescription,
  }
}

export default function ProductDetailPage({ params }: { params: { slug: string } }) {
  const product = getProductBySlug(params.slug)
  if (!product) notFound()

  const related = getRelatedProducts(product, 4)

  return (
    <div className="min-h-screen bg-brand-ivory pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-brand-sage mb-8">
          <Link href="/" className="hover:text-brand-green transition-colors">Inicio</Link>
          <span>/</span>
          <Link href="/tienda" className="hover:text-brand-green transition-colors">Tienda</Link>
          <span>/</span>
          <span className="text-brand-charcoal">{product.name}</span>
        </nav>

        {/* Product section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Image */}
          <div className="relative aspect-square bg-brand-beige rounded-3xl overflow-hidden shadow-card">
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover"
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            <span className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm text-brand-green text-sm font-semibold px-3 py-1.5 rounded-full">
              {product.brand}
            </span>
          </div>

          {/* Info */}
          <div className="flex flex-col gap-5">
            {/* Category + needs */}
            <div className="flex flex-wrap gap-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-brand-sage bg-brand-beige px-3 py-1 rounded-full">
                {product.category}
              </span>
              {product.needs.map((need) => (
                <span key={need} className="text-xs bg-brand-green/10 text-brand-green px-3 py-1 rounded-full">
                  {need}
                </span>
              ))}
            </div>

            {/* Name */}
            <h1 className="font-display text-4xl md:text-5xl text-brand-charcoal leading-tight">
              {product.name}
            </h1>

            {/* Short desc */}
            <p className="text-brand-charcoal/70 leading-relaxed">{product.shortDescription}</p>

            {/* Price */}
            <div className="flex items-baseline gap-2">
              <span className="font-display text-4xl text-brand-green font-semibold">
                {formatCRC(product.priceCRC)}
              </span>
              <span className="text-brand-sage text-sm">CRC</span>
            </div>

            {/* Benefits */}
            <div>
              <h3 className="font-display text-xl text-brand-charcoal mb-3">Beneficios clave</h3>
              <ul className="flex flex-col gap-2">
                {product.benefits.map((b) => (
                  <li key={b} className="flex items-start gap-2.5 text-sm text-brand-charcoal/80">
                    <Check size={16} className="text-brand-green mt-0.5 flex-shrink-0" />
                    {b}
                  </li>
                ))}
              </ul>
            </div>

            {/* Usage */}
            <div className="bg-brand-beige rounded-2xl p-4">
              <h3 className="font-semibold text-brand-charcoal text-sm mb-1">Modo de uso</h3>
              <p className="text-sm text-brand-charcoal/70">{product.usage}</p>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <AddToCartButton product={product} className="flex-1" />
              <a
                href={buildQuickWhatsAppURL(product.name)}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-2 border-2 border-brand-green text-brand-green font-medium py-3.5 px-6 rounded-full hover:bg-brand-green hover:text-white transition-all duration-200"
              >
                <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                Pedir por WhatsApp
              </a>
            </div>

            {/* Warning */}
            <div className="flex items-start gap-2.5 text-xs text-brand-charcoal/50 bg-brand-beige/50 rounded-xl p-3">
              <AlertCircle size={14} className="flex-shrink-0 mt-0.5" />
              <p>{product.warnings}</p>
            </div>
          </div>
        </div>

        {/* Long description */}
        <div className="bg-white rounded-3xl p-8 mb-16 shadow-soft">
          <h2 className="font-display text-3xl text-brand-charcoal mb-4">Sobre este producto</h2>
          <p className="text-brand-charcoal/70 leading-relaxed text-base">{product.longDescription}</p>
        </div>

        {/* Related */}
        {related.length > 0 && (
          <div>
            <h2 className="font-display text-3xl md:text-4xl text-brand-charcoal mb-8">También te puede gustar</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {related.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
