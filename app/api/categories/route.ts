import { NextResponse } from "next/server"

// Fallback categories that load immediately
const FALLBACK_CATEGORIES = [
  { id: 1, category: "Electronics" },
  { id: 2, category: "Fashion/Apparel" },
  { id: 3, category: "Home & Kitchen" },
  { id: 4, category: "Health & Beauty" },
  { id: 5, category: "Sports & Outdoors" },
  { id: 6, category: "Books & Media" },
  { id: 7, category: "Automotive" },
  { id: 8, category: "Toys & Games" },
  { id: 9, category: "Garden & Outdoor" },
  { id: 10, category: "Office Supplies" },
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

export async function GET() {
  try {
    console.log("Categories API route called - attempting external API...")

    // Try to fetch from external API with 5 second timeout
    const response = await fetchWithTimeout(
      "http://92.246.130.25:9090/api/v1/public/product/categories",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      },
      5000, // 5 second timeout
    )

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data = await response.json()
    console.log("Successfully fetched categories from external API")

    // Return external API data if successful
    return NextResponse.json({
      success: true,
      source: "external_api",
      data: Array.isArray(data) ? data : data.categories || data.data || FALLBACK_CATEGORIES,
    })
  } catch (error) {
    console.log(
      "External API failed, using fallback categories:",
      error instanceof Error ? error.message : String(error)
    )

    // Return fallback categories immediately if external API fails
    return NextResponse.json({
      success: true,
      source: "fallback",
      data: FALLBACK_CATEGORIES,
      message: "Using default categories due to API timeout or error",
    })
  }
}
