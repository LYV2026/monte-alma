'use client'

import { useState } from 'react'
import { MapPin, Mail, Clock, Phone } from 'lucide-react'
import { getContactWhatsAppURL } from '@/lib/whatsapp'

export default function ContactoPage() {
  const waURL = getContactWhatsAppURL()

  const [form, setForm] = useState({ name: '', email: '', message: '' })

  const handleSend = () => {
    if (!form.name.trim() || !form.message.trim()) return
    const text = `¡Hola Monte Alma! 🌿 Me comunico desde el sitio web.\n\n👤 Nombre: ${form.name}${form.email ? `\n📧 Correo: ${form.email}` : ''}\n\n💬 Mensaje:\n${form.message}`
    window.open(`https://wa.me/50672952666?text=${encodeURIComponent(text)}`, '_blank')
  }

  return (
    <div className="min-h-screen bg-brand-ivory pt-20">
      {/* Hero */}
      <div className="bg-white border-b border-brand-beige pt-16 pb-12 px-4 text-center">
        <div className="max-w-2xl mx-auto">
          <p className="text-brand-gold font-medium tracking-widest uppercase text-xs mb-3">Estamos aquí</p>
          <h1 className="font-display text-5xl md:text-6xl text-brand-charcoal mb-4">Hablemos</h1>
          <p className="text-brand-charcoal/60 leading-relaxed">
            Tenés una consulta, querés pedir asesoría o simplemente querés saber más sobre nuestros productos. Escribinos — estamos felices de ayudarte.
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Contact info */}
          <div className="flex flex-col gap-6">
            <h2 className="font-display text-3xl text-brand-charcoal">Información de contacto</h2>

            <div className="flex flex-col gap-4">
              {[
                { icon: Phone, label: 'WhatsApp', value: '+506 7295-2666', sub: 'La forma más rápida de comunicarse', href: waURL },
                { icon: Mail, label: 'Correo electrónico', value: 'montealma.cr@gmail.com', sub: 'Respondemos en el día', href: 'mailto:montealma.cr@gmail.com' },
                { icon: MapPin, label: 'Ubicación', value: 'Tibás, San José', sub: 'Costa Rica', href: null },
                { icon: Clock, label: 'Horario de atención', value: 'Lunes a Sábado', sub: '8:00 am – 7:00 pm', href: null },
              ].map((item) => (
                <div key={item.label} className="flex items-start gap-4 bg-white rounded-2xl p-4 shadow-soft">
                  <div className="w-10 h-10 rounded-full bg-brand-green/10 flex items-center justify-center flex-shrink-0">
                    <item.icon size={18} className="text-brand-green" />
                  </div>
                  <div>
                    <p className="text-xs text-brand-sage uppercase tracking-wider font-medium">{item.label}</p>
                    {item.href ? (
                      <a href={item.href} target={item.href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer" className="font-semibold text-brand-charcoal hover:text-brand-green transition-colors">
                        {item.value}
                      </a>
                    ) : (
                      <p className="font-semibold text-brand-charcoal">{item.value}</p>
                    )}
                    <p className="text-xs text-brand-charcoal/60 mt-0.5">{item.sub}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Big WhatsApp CTA */}
            <a
              href={waURL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-3 bg-[#25D366] text-white font-semibold py-4 px-6 rounded-2xl hover:bg-[#20ba57] transition-colors text-lg shadow-hover"
            >
              <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
              Escribir ahora por WhatsApp
            </a>
          </div>

          {/* Form → WhatsApp */}
          <div className="bg-white rounded-3xl shadow-soft p-8">
            <h2 className="font-display text-3xl text-brand-charcoal mb-2">Envianos un mensaje</h2>
            <p className="text-sm text-brand-charcoal/60 mb-6">Completá el formulario y te respondemos por WhatsApp a la brevedad.</p>

            <div className="flex flex-col gap-4">
              <div>
                <label className="block text-sm font-medium text-brand-charcoal mb-1.5">
                  Nombre <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  placeholder="Tu nombre"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full px-4 py-2.5 bg-brand-ivory border border-brand-beige rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-green/30 focus:border-brand-sage transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-brand-charcoal mb-1.5">
                  Correo electrónico <span className="text-brand-sage text-xs">(opcional)</span>
                </label>
                <input
                  type="email"
                  placeholder="tu@correo.com"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full px-4 py-2.5 bg-brand-ivory border border-brand-beige rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-green/30 focus:border-brand-sage transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-brand-charcoal mb-1.5">
                  Mensaje <span className="text-red-400">*</span>
                </label>
                <textarea
                  rows={5}
                  placeholder="¿En qué podemos ayudarte?"
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className="w-full px-4 py-2.5 bg-brand-ivory border border-brand-beige rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-green/30 focus:border-brand-sage transition-all resize-none"
                />
              </div>
              <button
                onClick={handleSend}
                disabled={!form.name.trim() || !form.message.trim()}
                className="w-full flex items-center justify-center gap-2 bg-[#25D366] disabled:opacity-50 disabled:cursor-not-allowed text-white font-medium py-3.5 rounded-full hover:bg-[#20ba57] transition-colors"
              >
                <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                Enviar por WhatsApp
              </button>
              <p className="text-center text-xs text-brand-sage">
                Se abrirá WhatsApp con tu mensaje listo para enviar
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
