"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Minus, Plus, Trash2, ShoppingBag } from "lucide-react"
import { useState } from "react"
import { CheckoutDialog } from "@/components/checkout-dialog"

interface CartItem {
  id: string
  name: string
  price: number
  quantity: number
  image: string
}

interface CartProps {
  items: CartItem[]
  onUpdateQuantity: (id: string, quantity: number) => void
  onRemoveItem: (id: string) => void
  onClearCart: () => void
}

export function Cart({ items, onUpdateQuantity, onRemoveItem, onClearCart }: CartProps) {
  const [showCheckout, setShowCheckout] = useState(false)

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const tax = subtotal * 0.1
  const total = subtotal + tax

  const handleCheckout = () => {
    setShowCheckout(true)
  }

  const handleCheckoutComplete = () => {
    onClearCart()
    setShowCheckout(false)
  }

  return (
    <>
      <div className="flex h-full flex-col bg-card">
        <div className="border-b border-border p-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-foreground">Carrinho</h2>
            {items.length > 0 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={onClearCart}
                className="text-muted-foreground hover:text-destructive"
              >
                Limpar
              </Button>
            )}
          </div>
          <p className="text-sm text-muted-foreground">
            {items.length} {items.length === 1 ? "item" : "itens"}
          </p>
        </div>

        <div className="flex-1 overflow-auto p-4">
          {items.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center text-center">
              <ShoppingBag className="h-16 w-16 text-muted-foreground/50" />
              <p className="mt-4 text-sm text-muted-foreground">Carrinho vazio</p>
              <p className="mt-1 text-xs text-muted-foreground">Adicione produtos para começar</p>
            </div>
          ) : (
            <div className="space-y-3">
              {items.map((item) => (
                <Card key={item.id} className="p-3">
                  <div className="flex gap-3">
                    <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-md bg-muted">
                      <img
                        src={item.image || "/placeholder.svg"}
                        alt={item.name}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="flex flex-1 flex-col">
                      <div className="flex items-start justify-between">
                        <h3 className="text-sm font-medium text-foreground">{item.name}</h3>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-6 w-6 text-muted-foreground hover:text-destructive"
                          onClick={() => onRemoveItem(item.id)}
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                      <p className="mt-1 text-sm font-semibold text-foreground">R$ {item.price.toFixed(2)}</p>
                      <div className="mt-2 flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-7 w-7 bg-transparent"
                          onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                        >
                          <Minus className="h-3 w-3" />
                        </Button>
                        <span className="w-8 text-center text-sm font-medium text-foreground">{item.quantity}</span>
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-7 w-7 bg-transparent"
                          onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                        >
                          <Plus className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>

        {items.length > 0 && (
          <div className="border-t border-border p-4">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Subtotal</span>
                <span className="font-medium text-foreground">R$ {subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Taxa (10%)</span>
                <span className="font-medium text-foreground">R$ {tax.toFixed(2)}</span>
              </div>
              <Separator />
              <div className="flex justify-between">
                <span className="text-lg font-semibold text-foreground">Total</span>
                <span className="text-lg font-bold text-foreground">R$ {total.toFixed(2)}</span>
              </div>
            </div>
            <Button className="mt-4 w-full" size="lg" onClick={handleCheckout}>
              Finalizar Venda
            </Button>
          </div>
        )}
      </div>

      <CheckoutDialog
        open={showCheckout}
        onOpenChange={setShowCheckout}
        total={total}
        onComplete={handleCheckoutComplete}
      />
    </>
  )
}
