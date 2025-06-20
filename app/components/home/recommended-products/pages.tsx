"use client"
import { ChevronRight, Loader2, Package } from "lucide-react"
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

  useEffect(() => {
    fetchProducts()
  }, [])

  const fetchProducts = async () => {
    try {
      setLoading(true)
      setError(null)

      // Try different endpoint variations
      const endpoints = [
        "http://92.246.130.25:9090/api/v1/public/product/products/all",
        "http://92.246.130.25:9090/api/v1/public/product/products",
        "http://92.246.130.25:9090/api/v1/public/products",
      ]

      let response
      let lastError

      for (const endpoint of endpoints) {
        try {
          response = await fetch(endpoint, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
              // Add common headers that might be required
              "User-Agent": "Mozilla/5.0 (compatible)",
            },
            // Add mode if CORS is an issue
            mode: "cors",
          })

          if (response.ok) {
            break // Success, exit the loop
          } else {
            lastError = new Error(`HTTP error! status: ${response.status} for ${endpoint}`)
          }
        } catch (err) {
          lastError = err
          continue // Try next endpoint
        }
      }

      if (!response || !response.ok) {
        throw lastError || new Error("All endpoints failed")
      }

      const data = await response.json()
      console.log("API Response:", data) // Debug log

      // Assuming the API returns an array of products
      // Adjust this based on the actual API response structure
      const productsData = Array.isArray(data) ? data : data.products || data.data || data.result || []

      setProducts(productsData)
    } catch (err) {
      console.error("Error fetching products:", err)
      setError(`Failed to load products: ${err instanceof Error ? err.message : "Unknown error"}`)

      // Fallback to default products on error
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
            <Link href="#" className="flex items-center gap-1 text-sm font-medium text-[#ff5e3a]">
              View All <ChevronRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin" />
            <span className="ml-2">Loading products...</span>
          </div>
        </div>
      </section>
    )
  }

  if (error) {
    return (
      <section className="py-12 flex items-center justify-center">
        <div className="container px-4">
          <div className="mb-8 flex items-center justify-between">
            <h2 className="text-2xl font-bold">Recommended Products</h2>
            <Link href="#" className="flex items-center gap-1 text-sm font-medium text-[#ff5e3a]">
              View All <ChevronRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="text-center py-12">
            <p className="text-red-500 mb-4">{error}</p>
            <Button onClick={fetchProducts} variant="outline">
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
                <Package className="mx-auto h-12 w-12 text-gray-400" />
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
