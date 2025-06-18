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
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

export default function Banner() {
  const [isCategoryVisible, setCategoryVisible] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleCategories = () => {
    setCategoryVisible((prev: boolean) => !prev);
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
                <ul className="space-y-2">
                  {[
                    { name: "Electronics", icon: <Tv className="h-5 w-5" /> },
                    {
                      name: "Fashion/Apparel",
                      icon: <Shirt className="h-5 w-5" />,
                    },
                    {
                      name: "Home & Kitchen",
                      icon: <MapPin className="h-5 w-5" />,
                    },
                    {
                      name: "Health & Beauty",
                      icon: <Heart className="h-5 w-5" />,
                    },
                    {
                      name: "Sports & Outdoors",
                      icon: <Bike className="h-5 w-5" />,
                    },
                    {
                      name: "Books & Media",
                      icon: <BookOpen className="h-5 w-5" />,
                    },
                    { name: "Automotive", icon: <Car className="h-5 w-5" /> },
                    {
                      name: "More Categories",
                      icon: <MoreHorizontal className="h-5 w-5" />,
                    },
                  ].map((category, index) => (
                    <li key={index}>
                      <Link
                        href="#"
                        className="flex items-center justify-between rounded-md p-2 hover:bg-muted"
                      >
                        <div className="flex items-center gap-2">
                          {category.icon}
                          <span>{category.name}</span>
                        </div>
                        <ChevronRight className="h-4 w-4 text-muted-foreground" />
                      </Link>
                    </li>
                  ))}
                </ul>
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
              <ul className="space-y-2">
                {[
                  { name: "Electronics", icon: <Tv className="h-5 w-5" /> },
                  {
                    name: "Fashion/Apparel",
                    icon: <Shirt className="h-5 w-5" />,
                  },
                  {
                    name: "Home & Kitchen",
                    icon: <MapPin className="h-5 w-5" />,
                  },
                  {
                    name: "Health & Beauty",
                    icon: <Heart className="h-5 w-5" />,
                  },
                  {
                    name: "Sports & Outdoors",
                    icon: <Bike className="h-5 w-5" />,
                  },
                  {
                    name: "Books & Media",
                    icon: <BookOpen className="h-5 w-5" />,
                  },
                  { name: "Automotive", icon: <Car className="h-5 w-5" /> },
                  {
                    name: "More Categories",
                    icon: <MoreHorizontal className="h-5 w-5" />,
                  },
                ].map((category, index) => (
                  <li key={index}>
                    <Link
                      href="#"
                      className="flex items-center justify-between rounded-md p-2 hover:bg-muted"
                    >
                      <div className="flex items-center gap-2">
                        {category.icon}
                        <span>{category.name}</span>
                      </div>
                      <ChevronRight className="h-4 w-4 text-muted-foreground" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Banner Carousel */}
          <BannerSlider />
        </div>
      </section>
      {/*Quick Sections */}
      <section className="py-12 border-t border-b flex items-center justify-center">
        <div className="container grid gap-6 px-4 md:grid-cols-4 lg:grid-cols-4">
          {/* Loans */}
          <div className="rounded-lg bg-gray-100 p-6">
            <div className="flex gap-4">
              <div className="relative h-32 w-32 flex-shrink-0 overflow-hidden rounded-md bg-gray-100">
                <Image
                  src="/placeholder.svg?height=128&width=128"
                  alt="TV"
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
          {/* Repayment */}
          <div className="rounded-lg bg-gray-100 p-6">
            <div className="flex gap-4">
              <div className="relative h-32 w-32 flex-shrink-0 overflow-hidden rounded-md bg-gray-100">
                <Image
                  src="/placeholder.svg?height=128&width=128"
                  alt="TV"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex flex-col">
                <h3 className="text-xl font-bold">Flexible Repayment</h3>
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
              <div className="relative h-32 w-32 flex-shrink-0 overflow-hidden rounded-md bg-gray-100">
                <Image
                  src="/placeholder.svg?height=128&width=128"
                  alt="TV"
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
              <div className="relative h-32 w-32 flex-shrink-0 overflow-hidden rounded-md bg-gray-100">
                <Image
                  src="/placeholder.svg?height=128&width=128"
                  alt="TV"
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
