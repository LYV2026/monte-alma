'use client'

import { Product } from '@/data/products'

export type CartItem = {
  product: Product
  quantity: number
}

const CART_KEY = 'monte-alma-cart'

export function getCart(): CartItem[] {
  if (typeof window === 'undefined') return []
  try {
    const stored = localStorage.getItem(CART_KEY)
    return stored ? JSON.parse(stored) : []
  } catch {
    return []
  }
}

export function saveCart(items: CartItem[]): void {
  if (typeof window === 'undefined') return
  localStorage.setItem(CART_KEY, JSON.stringify(items))
}

export function addToCart(product: Product, quantity = 1): CartItem[] {
  const cart = getCart()
  const existing = cart.find((item) => item.product.id === product.id)
  if (existing) {
    existing.quantity += quantity
  } else {
    cart.push({ product, quantity })
  }
  saveCart(cart)
  return cart
}

export function removeFromCart(productId: string): CartItem[] {
  const cart = getCart().filter((item) => item.product.id !== productId)
  saveCart(cart)
  return cart
}

export function updateQuantity(productId: string, quantity: number): CartItem[] {
  const cart = getCart()
  const item = cart.find((i) => i.product.id === productId)
  if (item) {
    if (quantity <= 0) {
      return removeFromCart(productId)
    }
    item.quantity = quantity
    saveCart(cart)
  }
  return cart
}

export function clearCart(): void {
  saveCart([])
}

export function getCartTotal(cart: CartItem[]): number {
  return cart.reduce((sum, item) => sum + item.product.priceCRC * item.quantity, 0)
}

export function getCartCount(cart: CartItem[]): number {
  return cart.reduce((sum, item) => sum + item.quantity, 0)
}
