import type { Metadata } from 'next'
import './globals.css'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { WhatsAppButton } from '@/components/WhatsAppButton'
import { CartProvider } from '@/components/CartProvider'

export const metadata: Metadata = {
  title: {
    default: 'Monte Alma | Productos Macrobióticos y Suplementos Naturales en Costa Rica',
    template: '%s | Monte Alma',
  },
  description:
    'Tienda online de productos macrobióticos y suplementos naturales en Costa Rica. Pedidos fáciles por WhatsApp. Atención cercana y personalizada. Tu dosis diaria de pura vida.',
  keywords: [
    'productos macrobióticos Costa Rica',
    'suplementos naturales Costa Rica',
    'tienda wellness Costa Rica',
    'bienestar natural Costa Rica',
    'suplementos por WhatsApp Costa Rica',
    'Monte Alma',
  ],
  authors: [{ name: 'Monte Alma' }],
  creator: 'Monte Alma',
  openGraph: {
    type: 'website',
    locale: 'es_CR',
    url: 'https://montealma.cr',
    siteName: 'Monte Alma',
    title: 'Monte Alma | Tu dosis diaria de pura vida',
    description: 'Productos macrobióticos y suplementos naturales en Costa Rica. Pedidos por WhatsApp.',
    images: [{ url: '/brand/logo-gold.jpg', width: 1200, height: 630, alt: 'Monte Alma' }],
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className="bg-brand-ivory font-body antialiased">
        <CartProvider>
          <Header />
          <main>{children}</main>
          <Footer />
          <WhatsAppButton />
        </CartProvider>
      </body>
    </html>
  )
}
