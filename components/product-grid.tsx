"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Search, Plus } from "lucide-react"

const PRODUCTS = [
  {
    id: "1",
    name: "Café Expresso",
    price: 4.5,
    category: "Bebidas",
    image: "/coffee-cup.png",
  },
  {
    id: "2",
    name: "Cappuccino",
    price: 6.0,
    category: "Bebidas",
    image: "/frothy-cappuccino.png",
  },
  {
    id: "3",
    name: "Pão de Queijo",
    price: 3.5,
    category: "Alimentos",
    image: "/cheese-bread.png",
  },
  {
    id: "4",
    name: "Croissant",
    price: 5.0,
    category: "Alimentos",
    image: "/golden-croissant.png",
  },
  {
    id: "5",
    name: "Suco Natural",
    price: 7.0,
    category: "Bebidas",
    image: "/glass-of-orange-juice.png",
  },
  {
    id: "6",
    name: "Sanduíche",
    price: 12.0,
    category: "Alimentos",
    image: "/classic-sandwich.png",
  },
  {
    id: "7",
    name: "Bolo Caseiro",
    price: 8.0,
    category: "Alimentos",
    image: "/homemade-cake.jpg",
  },
  {
    id: "8",
    name: "Água Mineral",
    price: 3.0,
    category: "Bebidas",
    image: "/reusable-water-bottle.png",
  },
  {
    id: "9",
    name: "Refrigerante",
    price: 5.5,
    category: "Bebidas",
    image: "/soda-can.png",
  },
  {
    id: "10",
    name: "Salada",
    price: 15.0,
    category: "Alimentos",
    image: "/fresh-salad.png",
  },
  {
    id: "11",
    name: "Chá Gelado",
    price: 4.0,
    category: "Bebidas",
    image: "/iced-tea.png",
  },
  {
    id: "12",
    name: "Cookie",
    price: 4.5,
    category: "Alimentos",
    image: "/chocolate-cookie.png",
  },
]

interface ProductGridProps {
  onAddToCart: (product: { id: string; name: string; price: number; image: string }) => void
}

export function ProductGrid({ onAddToCart }: ProductGridProps) {
  const [search, setSearch] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string>("Todos")

  const categories = ["Todos", ...Array.from(new Set(PRODUCTS.map((p) => p.category)))]

  const filteredProducts = PRODUCTS.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(search.toLowerCase())
    const matchesCategory = selectedCategory === "Todos" || product.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  return (
    <div className="p-6">
      <div className="mb-6 space-y-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Buscar produtos..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="flex gap-2 overflow-x-auto pb-2">
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(category)}
              className="whitespace-nowrap"
            >
              {category}
            </Button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
        {filteredProducts.map((product) => (
          <Card
            key={product.id}
            className="group cursor-pointer overflow-hidden transition-all hover:shadow-lg"
            onClick={() => onAddToCart(product)}
          >
            <div className="aspect-square overflow-hidden bg-muted">
              <img
                src={product.image || "/placeholder.svg"}
                alt={product.name}
                className="h-full w-full object-cover transition-transform group-hover:scale-105"
              />
            </div>
            <div className="p-4">
              <p className="text-xs text-muted-foreground">{product.category}</p>
              <h3 className="mt-1 font-semibold text-foreground">{product.name}</h3>
              <div className="mt-2 flex items-center justify-between">
                <p className="text-lg font-bold text-foreground">R$ {product.price.toFixed(2)}</p>
                <Button size="icon" variant="ghost" className="h-8 w-8">
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
