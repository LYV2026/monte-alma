'use client'

import React, { createContext, useContext, useEffect, useState, useCallback } from 'react'
import { CartItem, getCart, addToCart as addItem, removeFromCart as removeItem, updateQuantity as updateQty, clearCart as clear, getCartCount, getCartTotal } from '@/lib/cart'
import { Product } from '@/data/products'

type CartContextType = {
  cart: CartItem[]
  count: number
  total: number
  addToCart: (product: Product, quantity?: number) => void
  removeFromCart: (productId: string) => void
  updateQuantity: (productId: string, quantity: number) => void
  clearCart: () => void
  isOpen: boolean
  openCart: () => void
  closeCart: () => void
}

const CartContext = createContext<CartContextType | null>(null)

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([])
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    setCart(getCart())
  }, [])

  const addToCart = useCallback((product: Product, quantity = 1) => {
    const updated = addItem(product, quantity)
    setCart([...updated])
    setIsOpen(true)
  }, [])

  const removeFromCart = useCallback((productId: string) => {
    const updated = removeItem(productId)
    setCart([...updated])
  }, [])

  const updateQuantity = useCallback((productId: string, quantity: number) => {
    const updated = updateQty(productId, quantity)
    setCart([...updated])
  }, [])

  const clearCart = useCallback(() => {
    clear()
    setCart([])
  }, [])

  const count = getCartCount(cart)
  const total = getCartTotal(cart)

  return (
    <CartContext.Provider value={{ cart, count, total, addToCart, removeFromCart, updateQuantity, clearCart, isOpen, openCart: () => setIsOpen(true), closeCart: () => setIsOpen(false) }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used within CartProvider')
  return ctx
}
