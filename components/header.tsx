import { ShoppingCart } from "lucide-react"

export function Header() {
  return (
    <header className="h-16 border-b border-border bg-card">
      <div className="flex h-full items-center justify-between px-6">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
            <ShoppingCart className="h-5 w-5 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-lg font-semibold text-foreground">Sistema PDV</h1>
            <p className="text-xs text-muted-foreground">Ponto de Venda</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-right">
            <p className="text-sm font-medium text-foreground">Operador</p>
            <p className="text-xs text-muted-foreground">Caixa 01</p>
          </div>
        </div>
      </div>
    </header>
  )
}
