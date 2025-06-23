import { NextResponse } from "next/server"

// Fallback products that load immediately
const FALLBACK_PRODUCTS = [
  {
    id: 1,
    productName: "iPhone 13 Pro",
    price: 999.0,
    image: "/placeholder.svg?height=200&width=200",
    productDescription: "Latest iPhone with advanced camera system",
  },
  {
    id: 2,
    productName: "Fujifilm Instax Camera",
    price: 79.99,
    image: "/placeholder.svg?height=200&width=200",
    productDescription: "Instant camera for capturing memories",
  },
  {
    id: 3,
    productName: "Portable Bluetooth Speaker",
    price: 119.0,
    discountPrice: 139.99,
    image: "/placeholder.svg?height=200&width=200",
    productDescription: "High-quality wireless speaker",
  },
  {
    id: 4,
    productName: "HD Wireless Headphones",
    price: 99.99,
    image: "/placeholder.svg?height=200&width=200",
    productDescription: "Premium wireless headphones",
  },
  {
    id: 5,
    productName: "4K OLED Smart TV",
    price: 1299.99,
    image: "/placeholder.svg?height=200&width=200",
    productDescription: "Ultra HD smart television",
  },
  {
    id: 6,
    productName: "Gaming Laptop",
    price: 1599.99,
    image: "/placeholder.svg?height=200&width=200",
    productDescription: "High-performance gaming laptop",
  },
  {
    id: 7,
    productName: "Wireless Mouse",
    price: 29.99,
    image: "/placeholder.svg?height=200&width=200",
    productDescription: "Ergonomic wireless mouse",
  },
  {
    id: 8,
    productName: "Mechanical Keyboard",
    price: 149.99,
    image: "/placeholder.svg?height=200&width=200",
    productDescription: "RGB mechanical gaming keyboard",
  },
]

// Create a fetch with timeout
async function fetchWithTimeout(url: string, options: RequestInit, timeout = 5000) {
  const controller = new AbortController()
  const timeoutId = setTimeout(() => controller.abort(), timeout)

  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal,
    })
    clearTimeout(timeoutId)
    return response
  } catch (error) {
    clearTimeout(timeoutId)
    throw error
  }
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const page = searchParams.get("page") || "1"
    const limit = searchParams.get("limit") || "20"
    const category = searchParams.get("category")

    console.log("Recommended products API route called - attempting external API...")

    // Try different endpoint variations with timeout
    const endpoints = [
      "http://92.246.130.25:9090/api/v1/public/product/products/all",
      "http://92.246.130.25:9090/api/v1/public/product/products",
      "http://92.246.130.25:9090/api/v1/public/products",
    ]

    let response
    let lastError

    for (const endpoint of endpoints) {
      try {
        let apiUrl = endpoint

        // Build query parameters
        const queryParams = new URLSearchParams()
        queryParams.append("page", page)
        queryParams.append("limit", limit)
        if (category && category.trim() !== "") {
          queryParams.append("category", category)
        }

        if (queryParams.toString()) {
          apiUrl += `?${queryParams.toString()}`
        }

        console.log(`Trying endpoint: ${apiUrl}`)

        response = await fetchWithTimeout(
          apiUrl,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
              "User-Agent": "NextJS-App",
            },
          },
          5000, // 5 second timeout
        )

        if (response.ok) {
          console.log(`Success with endpoint: ${endpoint}`)
          break // Success, exit the loop
        } else {
          lastError = new Error(`HTTP error! status: ${response.status} for ${endpoint}`)
        }
      } catch (err) {
        console.log(`Failed endpoint ${endpoint}:`, err.message)
        lastError = err
        continue // Try next endpoint
      }
    }

    if (response && response.ok) {
      const data = await response.json()
      console.log("Successfully fetched products from external API")

      // Return external API data if successful
      const productsData = Array.isArray(data) ? data : data.products || data.data || data.result || []

      return NextResponse.json({
        success: true,
        source: "external_api",
        products: productsData,
        data: productsData,
        total: productsData.length,
      })
    } else {
      throw lastError || new Error("All endpoints failed")
    }
  } catch (error) {
    console.log("External API failed, using fallback products:", error.message)

    // Return fallback products immediately if external API fails
    return NextResponse.json({
      success: true,
      source: "fallback",
      products: FALLBACK_PRODUCTS,
      data: FALLBACK_PRODUCTS,
      total: FALLBACK_PRODUCTS.length,
      message: "Using default products due to API timeout or error",
    })
  }
}
