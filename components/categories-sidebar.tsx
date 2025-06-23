"use client"

import { useState, useEffect } from "react"
import { ChevronRight } from "lucide-react"
import Link from "next/link"

interface Category {
  id: number
  category: string
}

export default function CategoriesSidebar() {
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [source, setSource] = useState<string>("")

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true)
        setError(null)

        // Set a client-side timeout as well
        const controller = new AbortController()
        const timeoutId = setTimeout(() => {
          controller.abort()
          console.log("Client-side timeout reached")
        }, 8000) // 8 second client timeout

        const response = await fetch("/api/categories", {
          signal: controller.signal,
        })

        clearTimeout(timeoutId)

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }

        const result = await response.json()
        console.log("Categories response:", result)

        setCategories(result.data || [])
        setSource(result.source || "unknown")
      } catch (err: any) {
        console.error("Error fetching categories:", err)

        if (err.name === "AbortError") {
          setError("Request timed out")
        } else {
          setError("Failed to load categories")
        }

        // Set fallback categories immediately on any error
        setCategories([
          { id: 1, category: "Electronics" },
          { id: 2, category: "Fashion/Apparel" },
          { id: 3, category: "Home & Kitchen" },
          { id: 4, category: "Health & Beauty" },
          { id: 5, category: "Sports & Outdoors" },
          { id: 6, category: "Books & Media" },
          { id: 7, category: "Automotive" },
        ])
        setSource("client_fallback")
      } finally {
        setLoading(false)
      }
    }

    fetchCategories()
  }, [])

  if (loading) {
    return (
      <div className="flex items-center justify-center py-4">
        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-[#ff5e3a]"></div>
        <span className="ml-2 text-sm text-gray-600">Loading categories...</span>
      </div>
    )
  }

  return (
    <div>
      {error && (
        <div className="mb-3 text-xs text-amber-600 bg-amber-50 p-2 rounded">{error} - showing default categories</div>
      )}

      <ul className="space-y-1">
        {categories.map((category) => (
          <li key={category.id}>
            <Link
              href={`/category/${category.id}`}
              className="flex items-center justify-between rounded-md p-2 hover:bg-muted transition-colors group"
            >
              <span className="text-md text-gray-700 group-hover:text-gray-900">{category.category}</span>
              <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-gray-600" />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
