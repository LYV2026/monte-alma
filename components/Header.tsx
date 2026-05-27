'use client'

import Link from 'next/link'
import Image from 'next/image'
import { ShoppingBag, Menu, X } from 'lucide-react'
import { useState, useEffect } from 'react'
import { useCart } from './CartProvider'
import { CartDrawer } from './CartDrawer'

const navLinks = [
  { href: '/', label: 'Inicio' },
  { href: '/tienda', label: 'Tienda' },
  { href: '/nosotros', label: 'Nosotros' },
  { href: '/contacto', label: 'Contacto' },
]

const WhatsAppIcon = () => (
  <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current flex-shrink-0" aria-hidden="true">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
)

export function Header() {
  const { count, openCart } = useCart()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          scrolled
            ? 'bg-brand-ivory/95 backdrop-blur-md shadow-soft border-b border-brand-beige'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">

            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 flex-shrink-0 cursor-pointer">
              <div className="relative h-14 w-44 md:h-16 md:w-52">
                <Image
                  src="/brand/logo-gold-main.jpg"
                  alt="Monte Alma"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-7" aria-label="Navegación principal">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-sm font-medium tracking-wide uppercase transition-colors duration-200 relative group font-body cursor-pointer ${
                    scrolled ? 'text-brand-charcoal hover:text-brand-green' : 'text-white/90 hover:text-white'
                  }`}
                >
                  {link.label}
                  <span className="absolute -bottom-0.5 left-0 right-0 h-px bg-brand-gold scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-left" />
                </Link>
              ))}
            </nav>

            {/* Actions */}
            <div className="flex items-center gap-2">

              {/* Cart button */}
              <button
                onClick={openCart}
                className={`relative p-2.5 rounded-full transition-colors duration-200 cursor-pointer ${
                  scrolled ? 'hover:bg-brand-beige text-brand-charcoal' : 'hover:bg-white/15 text-white'
                }`}
                aria-label="Abrir carrito"
              >
                <ShoppingBag size={21} />
                {count > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 bg-brand-green text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center leading-none">
                    {count > 9 ? '9+' : count}
                  </span>
                )}
              </button>

              {/* WhatsApp CTA (desktop) */}
              <a
                href="https://wa.me/50672952666"
                target="_blank"
                rel="noopener noreferrer"
                className="hidden md:flex items-center gap-2 bg-brand-green text-white text-sm font-medium px-4 py-2.5 rounded-full hover:bg-brand-green/90 transition-all duration-200 cursor-pointer shadow-sm"
              >
                <WhatsAppIcon />
                Escribinos
              </a>

              {/* Mobile menu toggle */}
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className={`md:hidden p-2.5 rounded-full transition-colors duration-200 cursor-pointer ${
                  scrolled ? 'hover:bg-brand-beige text-brand-charcoal' : 'hover:bg-white/15 text-white'
                }`}
                aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
                aria-expanded={menuOpen}
              >
                {menuOpen ? <X size={21} /> : <Menu size={21} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden bg-brand-ivory/98 backdrop-blur-md border-t border-brand-beige animate-fade-in">
            <nav className="flex flex-col px-4 py-4 gap-0.5" aria-label="Menú móvil">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="py-3.5 px-3 text-brand-charcoal font-medium border-b border-brand-beige last:border-0 hover:text-brand-green hover:bg-brand-beige/50 rounded-xl transition-all duration-200 cursor-pointer"
                >
                  {link.label}
                </Link>
              ))}
              <a
                href="https://wa.me/50672952666"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 flex items-center justify-center gap-2 bg-brand-green text-white font-medium py-3.5 px-4 rounded-full cursor-pointer hover:bg-brand-green/90 transition-colors duration-200"
              >
                <WhatsAppIcon />
                Escribinos por WhatsApp
              </a>
            </nav>
          </div>
        )}
      </header>

      <CartDrawer />
    </>
  )
}
