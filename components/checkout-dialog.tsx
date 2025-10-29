"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { CreditCard, Banknote, CheckCircle2 } from "lucide-react"

interface CheckoutDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  total: number
  onComplete: () => void
}

export function CheckoutDialog({ open, onOpenChange, total, onComplete }: CheckoutDialogProps) {
  const [paymentMethod, setPaymentMethod] = useState<"cash" | "card" | null>(null)
  const [cashAmount, setCashAmount] = useState("")
  const [isComplete, setIsComplete] = useState(false)

  const change = cashAmount ? Number.parseFloat(cashAmount) - total : 0

  const handleComplete = () => {
    setIsComplete(true)
    setTimeout(() => {
      onComplete()
      setIsComplete(false)
      setPaymentMethod(null)
      setCashAmount("")
    }, 2000)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        {isComplete ? (
          <div className="flex flex-col items-center justify-center py-8">
            <CheckCircle2 className="h-16 w-16 text-green-600" />
            <h3 className="mt-4 text-xl font-semibold text-foreground">Venda Concluída!</h3>
            <p className="mt-2 text-sm text-muted-foreground">Obrigado pela compra</p>
          </div>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle>Finalizar Venda</DialogTitle>
              <DialogDescription>
                Total a pagar: <span className="font-bold text-foreground">R$ {total.toFixed(2)}</span>
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label>Forma de Pagamento</Label>
                <div className="grid grid-cols-2 gap-2">
                  <Button
                    variant={paymentMethod === "cash" ? "default" : "outline"}
                    className="h-20 flex-col gap-2"
                    onClick={() => setPaymentMethod("cash")}
                  >
                    <Banknote className="h-6 w-6" />
                    <span>Dinheiro</span>
                  </Button>
                  <Button
                    variant={paymentMethod === "card" ? "default" : "outline"}
                    className="h-20 flex-col gap-2"
                    onClick={() => setPaymentMethod("card")}
                  >
                    <CreditCard className="h-6 w-6" />
                    <span>Cartão</span>
                  </Button>
                </div>
              </div>

              {paymentMethod === "cash" && (
                <div className="space-y-2">
                  <Label htmlFor="cash-amount">Valor Recebido</Label>
                  <Input
                    id="cash-amount"
                    type="number"
                    step="0.01"
                    placeholder="0.00"
                    value={cashAmount}
                    onChange={(e) => setCashAmount(e.target.value)}
                  />
                  {change > 0 && (
                    <p className="text-sm text-muted-foreground">
                      Troco: <span className="font-semibold text-foreground">R$ {change.toFixed(2)}</span>
                    </p>
                  )}
                  {change < 0 && cashAmount && <p className="text-sm text-destructive">Valor insuficiente</p>}
                </div>
              )}

              {paymentMethod === "card" && (
                <div className="rounded-lg border border-border bg-muted p-4 text-center">
                  <CreditCard className="mx-auto h-8 w-8 text-muted-foreground" />
                  <p className="mt-2 text-sm text-muted-foreground">Aguardando pagamento na máquina...</p>
                </div>
              )}
            </div>

            <div className="flex gap-2">
              <Button variant="outline" className="flex-1 bg-transparent" onClick={() => onOpenChange(false)}>
                Cancelar
              </Button>
              <Button
                className="flex-1"
                onClick={handleComplete}
                disabled={!paymentMethod || (paymentMethod === "cash" && (!cashAmount || change < 0))}
              >
                Confirmar
              </Button>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  )
}
