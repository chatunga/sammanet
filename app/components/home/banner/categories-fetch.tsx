const fetchCategories = async (
  setLoading: (loading: boolean) => void,
  setError: (error: string | null) => void,
  setCategories: (categories: any[]) => void,
) => {
  try {
    setLoading(true)
    setError(null)

    // Use your proxy API route
    const response = await fetch("/api/categories")

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const result = await response.json()
    console.log("Categories result:", result)

    // Handle both successful API response and fallback data
    let categoriesData = []

    if (result.fallback) {
      // Using fallback data
      categoriesData = result.data || []
      console.log("Using fallback categories")
    } else {
      // Using real API data - adjust based on actual API response structure
      categoriesData = Array.isArray(result) ? result : result.categories || result.data || []
    }

    setCategories(categoriesData)
  } catch (err) {
    console.error("Error fetching categories:", err)
    setError("Failed to load categories")

    // Final fallback
    setCategories([
      { id: 1, category: "Electronics" },
      { id: 2, category: "Fashion/Apparel" },
      { id: 3, category: "Home & Kitchen" },
      { id: 4, category: "Health & Beauty" },
      { id: 5, category: "Sports & Outdoors" },
      { id: 6, category: "Books & Media" },
      { id: 7, category: "Automotive" },
    ])
  } finally {
    setLoading(false)
  }
}
