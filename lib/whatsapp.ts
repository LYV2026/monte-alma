import { CartItem, getCartTotal } from './cart'
import { formatCRC } from './utils'

const WA_NUMBER = '50672952666'

export type CustomerData = {
  name: string
  location: string
  notes: string
}

export function buildWhatsAppMessage(cart: CartItem[], customer: CustomerData): string {
  const lines = cart.map((item) => `• ${item.product.name} x${item.quantity} — ${formatCRC(item.product.priceCRC * item.quantity)}`)
  const subtotal = getCartTotal(cart)

  const message = [
    '¡Hola Monte Alma! 🌿 Quiero realizar este pedido:',
    '',
    ...lines,
    '',
    `*Subtotal: ${formatCRC(subtotal)}*`,
    '',
    `👤 Nombre: ${customer.name}`,
    `📍 Ubicación: ${customer.location}`,
    customer.notes ? `📝 Observaciones: ${customer.notes}` : null,
    '',
    'Quedo pendiente para coordinar entrega y pago. ¡Gracias!',
  ]
    .filter((line) => line !== null)
    .join('\n')

  return message
}

export function buildWhatsAppURL(cart: CartItem[], customer: CustomerData): string {
  const message = buildWhatsAppMessage(cart, customer)
  return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(message)}`
}

export function buildQuickWhatsAppURL(productName: string): string {
  const message = `¡Hola Monte Alma! 🌿 Estoy interesado/a en el producto *${productName}*. ¿Me pueden dar más información?`
  return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(message)}`
}

export function getContactWhatsAppURL(): string {
  const message = '¡Hola Monte Alma! 🌿 Me gustaría recibir más información sobre sus productos.'
  return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(message)}`
}
