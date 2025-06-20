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
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

interface Category {
  id: number;
  category: string;
  description?: string;
}

export default function Banner() {
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
        <div className="container grid gap-6 px-4 md:grid-cols-3 lg:grid-cols-3">
          {/* Loans */}
          <div className="rounded-lg bg-gray-100 p-6">
            <div className="flex gap-4">
              <div className="relative h-[88px] w-[88px] flex-shrink-0 overflow-hidden rounded-md bg-gray-100">
                <Image
                  src="/feature/loan.png"
                  alt="Security"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex flex-col">
                <h3 className="text-xl font-bold">We offer Instant Loans</h3>
                <h3 className="text-sm font-medium"></h3>
                <Button
                  size="sm"
                  className="mt-4 w-fit bg-[#ff5e3a] hover:bg-[#ff5e3a]/90"
                >
                  Get Started
                </Button>
              </div>
            </div>
          </div>

          {/* Partners */}
          <div className="rounded-lg bg-gray-100 p-6">
            <div className="flex gap-4">
             <div className="relative h-[88px] w-[88px] flex-shrink-0 overflow-hidden rounded-md bg-gray-100">
                <Image
                  src="/feature/partners.png"
                  alt="Security"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex flex-col">
                <h3 className="text-xl font-bold">Range of Partner Stores</h3>
                <h3 className="text-sm font-medium"></h3>
                <Button
                  size="sm"
                  className="mt-4 w-fit bg-[#ff5e3a] hover:bg-[#ff5e3a]/90"
                >
                  Get Started
                </Button>
              </div>
            </div>
          </div>

          {/* Security Guarantee */}
          <div className="rounded-lg bg-gray-100 p-6">
            <div className="flex gap-4">
              <div className="relative h-[88px] w-[88px] flex-shrink-0 overflow-hidden rounded-md bg-gray-100">
                <Image
                  src="/feature/security.png"
                  alt="Security"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex flex-col">
                <h3 className="text-xl font-bold">Secure & Confidential</h3>
                <h3 className="text-sm font-medium"></h3>
                <Button
                  size="sm"
                  className="mt-4 w-fit bg-[#ff5e3a] hover:bg-[#ff5e3a]/90"
                >
                  Get Started
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
