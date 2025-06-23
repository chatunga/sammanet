"use client"

import { ChevronRight, Package, ShoppingCart, ShoppingCartIcon } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"

interface Product {
  id: number
  productName: string
  price: number
  discountPrice?: number
  image?: string
  productDescription?: string
}

export default function RecommendedProducts() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [source, setSource] = useState<string>("")

  useEffect(() => {
    fetchProducts()
  }, [])

  const fetchProducts = async () => {
    try {
      setLoading(true)
      setError(null)

      // Set a client-side timeout
      const controller = new AbortController()
      const timeoutId = setTimeout(() => {
        controller.abort()
        console.log("Client-side timeout reached for products")
      }, 8000) // 8 second client timeout

      const response = await fetch("/api/recommended-products", {
        signal: controller.signal,
      })

      clearTimeout(timeoutId)

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const result = await response.json()
      console.log("Products response:", result)

      const productsData = result.products || result.data || []
      setProducts(productsData)
      setSource(result.source || "unknown")
    } catch (err: any) {
      console.error("Error fetching products:", err)

      if (err.name === "AbortError") {
        setError("Request timed out")
      } else {
        setError("Failed to load products")
      }

      // Set fallback products immediately on any error
      setProducts([
        { id: 1, productName: "iPhone 13 Pro", price: 999.0, image: "/placeholder.svg?height=200&width=200" },
        { id: 2, productName: "Fujifilm Instax Camera", price: 79.99, image: "/placeholder.svg?height=200&width=200" },
        {
          id: 3,
          productName: "Portable Bluetooth Speaker",
          price: 119.0,
          discountPrice: 139.99,
          image: "/placeholder.svg?height=200&width=200",
        },
        { id: 4, productName: "HD Wireless Headphones", price: 99.99, image: "/placeholder.svg?height=200&width=200" },
        { id: 5, productName: "4K OLED Smart TV", price: 1299.99, image: "/placeholder.svg?height=200&width=200" },
      ])
      setSource("client_fallback")
    } finally {
      setLoading(false)
    }
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(price)
  }

  if (loading) {
    return (
      <section className="py-12 flex items-center justify-center">
        <div className="container px-4">
          <div className="mb-8 flex items-center justify-between">
            <h2 className="text-2xl font-bold">Recommended Products</h2>
            <Link href="/products" className="flex items-center gap-1 text-sm font-medium text-[#ff5e3a]">
              View All <ChevronRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-[#ff5e3a]"></div>
            <span className="ml-2">Loading products...</span>
          </div>
        </div>
      </section>
    )
  }

  if (error && products.length === 0) {
    return (
      <section className="py-12 flex items-center justify-center">
        <div className="container px-4">
          <div className="mb-8 flex items-center justify-between">
            <h2 className="text-2xl font-bold">Recommended Products</h2>
            <Link href="/products" className="flex items-center gap-1 text-sm font-medium text-[#ff5e3a]">
              View All <ChevronRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="text-center py-12">
            <p className="text-red-500 mb-4">{error}</p>
            <Button onClick={fetchProducts} className="bg-[#ff5e3a] hover:bg-[#ff5e3a]/90">
              Try Again
            </Button>
          </div>
        </div>
      </section>
    )
  }

  if (products.length === 0) {
    return (
      <section className="py-12 flex items-center justify-center">
        <div className="container px-4">
          <div className="mb-8 flex items-center justify-between">
            <h2 className="text-2xl font-bold">Recommended Products</h2>
            <Link href="/products" className="flex items-center gap-1 text-sm font-medium text-[#ff5e3a]">
              View All <ChevronRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="text-center py-12">
            <div className="mx-auto max-w-md">
              <div className="mb-4">
                <ShoppingCartIcon className="mx-auto h-12 w-12 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No Products Found</h3>
              <p className="text-gray-500 mb-4">No products found for this category or section</p>
            </div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <>
      {/* Recommended Products */}
      <section className="py-12 flex items-center justify-center">
        <div className="container px-4">
          <div className="mb-8 flex items-center justify-between">
            <h2 className="text-2xl font-bold">Recommended Products</h2>
            <Link href="/products" className="flex items-center gap-1 text-sm font-medium text-[#ff5e3a]">
              View All <ChevronRight className="h-4 w-4" />
            </Link>
          </div>

          {/* Show error message if there was an error but we have fallback data */}
          {error && products.length > 0 && (
            <div className="mb-4 text-sm text-amber-600 bg-amber-50 p-3 rounded">
              {error} - showing default products
            </div>
          )}

          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {products.slice(0, 10).map((product) => (
              <Link
                key={product.id}
                href={`/product/${product.id}`}
                className="group relative rounded-lg border bg-background p-2 hover:shadow-md transition-shadow"
              >
                <div className="relative mb-2 aspect-square overflow-hidden rounded-md bg-gray-100">
                  <Image
                    src={product.image || "/placeholder.svg?height=200&width=200"}
                    alt={product.productName}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <div className="p-2">
                  <h3 className="line-clamp-2 text-sm font-medium">{product.productName}</h3>
                  <div className="mt-1 flex items-center gap-2">
                    <span className="font-medium text-[#ff5e3a]">{formatPrice(product.price)}</span>
                    {product.discountPrice && product.discountPrice > product.price && (
                      <span className="text-xs text-muted-foreground line-through">
                        {formatPrice(product.discountPrice)}
                      </span>
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
