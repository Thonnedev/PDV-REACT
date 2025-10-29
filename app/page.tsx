"use client"

import { useState } from "react"
import { ProductGrid } from "@/components/product-grid"
import { Cart } from "@/components/cart"
import { Header } from "@/components/header"

export default function POSPage() {
  const [cartItems, setCartItems] = useState<
    Array<{
      id: string
      name: string
      price: number
      quantity: number
      image: string
    }>
  >([])

  const addToCart = (product: { id: string; name: string; price: number; image: string }) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === product.id)
      if (existing) {
        return prev.map((item) => (item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item))
      }
      return [...prev, { ...product, quantity: 1 }]
    })
  }

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      setCartItems((prev) => prev.filter((item) => item.id !== id))
    } else {
      setCartItems((prev) => prev.map((item) => (item.id === id ? { ...item, quantity } : item)))
    }
  }

  const removeFromCart = (id: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id))
  }

  const clearCart = () => {
    setCartItems([])
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="flex h-[calc(100vh-4rem)]">
        <div className="flex-1 overflow-auto">
          <ProductGrid onAddToCart={addToCart} />
        </div>
        <div className="w-full md:w-96 border-l border-border">
          <Cart
            items={cartItems}
            onUpdateQuantity={updateQuantity}
            onRemoveItem={removeFromCart}
            onClearCart={clearCart}
          />
        </div>
      </div>
    </div>
  )
}
