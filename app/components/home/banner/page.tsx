"use client";
import BannerSlider from "@/components/banner-slider";
import {
  Bike,
  BookOpen,
  Car,
  ChevronRight,
  Heart,
  MapPin,
  Menu,
  MoreHorizontal,
  Shirt,
  Tv,
  Package,
  Loader2,
  CreditCard,
  Gift,
  Wallet,
  Shield,
  ChevronLeft,
} from "lucide-react";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";

interface Category {
  id: number;
  category: string;
  description?: string;
}

export default function Banner() {
   const scrollContainerRef = useRef<HTMLDivElement>(null)

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: -200,
        behavior: "smooth",
      })
    }
  }

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: 200,
        behavior: "smooth",
      })
    }
  } 
  
  const [isCategoryVisible, setCategoryVisible] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Icon mapping for categories
  const getIconForCategory = (categoryName: string | undefined) => {
    if (!categoryName || typeof categoryName !== "string") {
      return <Package className="h-5 w-5" />;
    }

    const name = categoryName.toLowerCase();
    if (
      name.includes("electronic") ||
      name.includes("tv") ||
      name.includes("tech")
    ) {
      return <Tv className="h-5 w-5" />;
    }
    if (
      name.includes("fashion") ||
      name.includes("apparel") ||
      name.includes("clothing")
    ) {
      return <Shirt className="h-5 w-5" />;
    }
    if (
      name.includes("home") ||
      name.includes("kitchen") ||
      name.includes("house")
    ) {
      return <MapPin className="h-5 w-5" />;
    }
    if (
      name.includes("health") ||
      name.includes("beauty") ||
      name.includes("cosmetic")
    ) {
      return <Heart className="h-5 w-5" />;
    }
    if (
      name.includes("sport") ||
      name.includes("outdoor") ||
      name.includes("fitness")
    ) {
      return <Bike className="h-5 w-5" />;
    }
    if (
      name.includes("book") ||
      name.includes("media") ||
      name.includes("education")
    ) {
      return <BookOpen className="h-5 w-5" />;
    }
    if (
      name.includes("automotive") ||
      name.includes("car") ||
      name.includes("vehicle")
    ) {
      return <Car className="h-5 w-5" />;
    }
    // Default icon
    return <Package className="h-5 w-5" />;
  };

  useEffect(() => {
    setMounted(true);
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(
        "http://92.246.130.25:9090/api/v1/public/product/categories"
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      // Assuming the API returns an array of categories
      // Adjust this based on the actual API response structure
      const categoriesData = Array.isArray(data)
        ? data
        : data.categories || data.data || [];

      setCategories(categoriesData);
    } catch (err) {
      console.error("Error fetching categories:", err);
      setError("Failed to load categories");

      // Fallback to default categories on error
      setCategories([
        { id: 1, category: "Electronics" },
        { id: 2, category: "Fashion/Apparel" },
        { id: 3, category: "Home & Kitchen" },
        { id: 4, category: "Health & Beauty" },
        { id: 5, category: "Sports & Outdoors" },
        { id: 6, category: "Books & Media" },
        { id: 7, category: "Automotive" },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const toggleCategories = () => {
    setCategoryVisible((prev: boolean) => !prev);
  };

  const renderCategories = () => {
    if (loading) {
      return (
        <div className="flex items-center justify-center py-8">
          <Loader2 className="h-6 w-6 animate-spin" />
          <span className="ml-2">Loading categories...</span>
        </div>
      );
    }

    if (error) {
      return (
        <div className="text-center py-4">
          <p className="text-red-500 text-sm mb-2">{error}</p>
          
        </div>
      );
    }
  
    return (
      <ul className="space-y-2">
        {categories.map((category) => (
          <li key={category.id}>
            <Link
              href={`/category/${category.id}`}
              className="flex items-center justify-between rounded-md p-2 hover:bg-muted"
            >
              <div className="flex items-center gap-2">
                {/*{getIconForCategory(category.category)}*/}
                <span>{category.category || "Unnamed Category"}</span>
              </div>
              <ChevronRight className="h-4 w-4 text-muted-foreground" />
            </Link>
          </li>
        ))}
        {categories.length > 0 && (
          <li>
            <Link
              href="/categories"
              className="flex items-center justify-between rounded-md p-2 hover:bg-muted"
            >
              <div className="flex items-center gap-2">
                <MoreHorizontal className="h-5 w-5" />
                <span>More Categories</span>
              </div>
              <ChevronRight className="h-4 w-4 text-muted-foreground" />
            </Link>
          </li>
        )}
      </ul>
    );
  };

  // Don't render interactive elements until mounted
  if (!mounted) {
    return (
      <div>
        {/* Category Sidebar and Banner Section */}
        <section className="container px-4 py-6">
          <div className="flex flex-col gap-6 md:flex-row">
            {/* Category Sidebar */}
            <div className="relative w-full md:w-72">
              {/* Mobile Toggle Button - Hidden during SSR */}
              <div className="md:hidden flex items-center gap-2 p-2 w-full mb-2 bg-[#ff5e3a] text-white rounded-lg opacity-50">
                <Menu className="h-5 w-5" />
                <span>All Categories</span>
              </div>

              {/* Categories List - Always visible during SSR */}
              <div className="w-full rounded-lg border bg-background p-4 shadow-sm block md:block">
                <h2 className="mb-4 text-lg font-bold border-b">
                  All Categories
                </h2>
                <div className="flex items-center justify-center py-8">
                  <Loader2 className="h-6 w-6 animate-spin" />
                  <span className="ml-2">Loading categories...</span>
                </div>
              </div>
            </div>

            {/* Banner Carousel */}
            <BannerSlider />
          </div>
        </section>
      </div>
    );
  }

  return (
    <div>
      {/* Category Sidebar and Banner Section */}
      <section className="container px-4 py-6">
        <div className="flex flex-col gap-6 md:flex-row">
          {/* Category Sidebar */}
          <div className="relative w-full md:w-72">
            {/* Mobile Toggle Button */}
            <button
              className="md:hidden flex items-center gap-2 p-2 w-full mb-2 bg-[#ff5e3a] text-white rounded-lg"
              onClick={toggleCategories}
            >
              <Menu className="h-5 w-5" />
              <span>
                {isCategoryVisible ? "Hide Categories" : "All Categories"}
              </span>
            </button>

            {/* Categories List */}
            <div
              className={`w-full rounded-lg border bg-background p-4 shadow-sm ${
                isCategoryVisible ? "block" : "hidden md:block"
              }`}
            >
              <h2 className="mb-4 text-lg font-bold border-b">
                All Categories
              </h2>
              {renderCategories()}
            </div>
          </div>

          {/* Banner Carousel */}
          <BannerSlider />
        </div>
      </section>
      {/*Quick Sections */}
  <section className="py-12 border-t border-b flex items-center justify-center">
      <div className="container px-4 relative">
        {/* Left Navigation Button - Only on small screens */}
        <Button
          onClick={scrollLeft}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white hover:bg-gray-100 text-gray-600 border border-gray-300 rounded-full p-2 h-10 w-10 shadow-md md:hidden"
        >
          <ChevronLeft className="w-4 h-4" />
        </Button>

        {/* Mobile: Scrollable Container, Desktop: Grid */}
        <div
          ref={scrollContainerRef}
          className="flex gap-4 overflow-x-auto scrollbar-hide px-12 md:px-0 md:grid md:grid-cols-4 md:overflow-visible"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {/* Instant Loans */}
          <Button className="bg-[#ff5e3a] hover:bg-[#ff5e3a]/90 text-white rounded-full px-6 py-4 h-auto flex items-center gap-3 justify-center flex-shrink-0 min-w-fit md:flex-shrink">
            <CreditCard className="w-6 h-6" />
            <span className="font-semibold whitespace-nowrap">We offer Instant Loans</span>
          </Button>

          {/* Rewards */}
          <Button className="bg-[#4682b4] hover:bg-[#4682b4]/90 text-white rounded-full px-6 py-4 h-auto flex items-center gap-3 justify-center flex-shrink-0 min-w-fit md:flex-shrink">
            <Gift className="w-6 h-6" />
            <span className="font-semibold whitespace-nowrap">Rewards</span>
          </Button>

          {/* Payment Plans */}
          <Button className="bg-[#28a745] hover:bg-[#28a745]/90 text-white rounded-full px-6 py-4 h-auto flex items-center gap-3 justify-center flex-shrink-0 min-w-fit md:flex-shrink">
            <Wallet className="w-6 h-6" />
            <span className="font-semibold whitespace-nowrap">Payment Plans</span>
          </Button>

          {/* Security */}
          <Button className="bg-[#6f42c1] hover:bg-[#6f42c1]/90 text-white rounded-full px-6 py-4 h-auto flex items-center gap-3 justify-center flex-shrink-0 min-w-fit md:flex-shrink">
            <Shield className="w-6 h-6" />
            <span className="font-semibold whitespace-nowrap">Secure & Confidential</span>
          </Button>
        </div>

        {/* Right Navigation Button - Only on small screens */}
        <Button
          onClick={scrollRight}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white hover:bg-gray-100 text-gray-600 border border-gray-300 rounded-full p-2 h-10 w-10 shadow-md md:hidden"
        >
          <ChevronRight className="w-4 h-4" />
        </Button>
      </div>
    </section>
    </div>
  );
}
