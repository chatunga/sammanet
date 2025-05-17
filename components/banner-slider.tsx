"use client"

import type React from "react"

import { useState, useEffect, useCallback } from "react"
import Image from "next/image"
import Link from "next/link"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

// Banner data with images, titles, descriptions, and CTAs
const bannerData = [
  {
    id: 1,
    image: "/modern-electronics-store.png",
    title: "Summer Sale",
    subtitle: "Up to 50% Off",
    description: "Shop the latest electronics and gadgets with incredible discounts.",
    cta: "Shop Now",
    ctaLink: "/summer-sale",
    color: "from-blue-900 to-blue-700",
    textColor: "text-white",
  },
  {
    id: 2,
    image: "/blue-orange-fashion.png",
    title: "New Arrivals",
    subtitle: "Fresh Collection",
    description: "Discover the latest trends and styles for the season.",
    cta: "Explore",
    ctaLink: "/new-arrivals",
    color: "from-orange-600 to-orange-400",
    textColor: "text-white",
  },
  {
    id: 3,
    image: "/blue-orange-appliances.png",
    title: "Home Essentials",
    subtitle: "Smart Living",
    description: "Transform your home with our curated selection of essentials.",
    cta: "View Collection",
    ctaLink: "/home-essentials",
    color: "from-blue-700 to-blue-500",
    textColor: "text-white",
  },
  {
    id: 4,
    image: "/placeholder.svg?height=450&width=800&query=tech gadgets with blue and orange theme",
    title: "Tech Deals",
    subtitle: "Limited Time Offers",
    description: "Upgrade your tech with exclusive deals on top brands.",
    cta: "Get Deals",
    ctaLink: "/tech-deals",
    color: "from-orange-500 to-orange-300",
    textColor: "text-white",
  },
  {
    id: 5,
    image: "/placeholder.svg?height=450&width=800&query=special offers with blue and orange theme",
    title: "Special Offers",
    subtitle: "Members Only",
    description: "Sign up today and get access to exclusive member-only offers.",
    cta: "Join Now",
    ctaLink: "/membership",
    color: "from-blue-800 to-blue-600",
    textColor: "text-white",
  },
]

export default function BannerSlider() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const [touchStart, setTouchStart] = useState(0)
  const [touchEnd, setTouchEnd] = useState(0)

  const totalSlides = bannerData.length

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev === totalSlides - 1 ? 0 : prev + 1))
  }, [totalSlides])

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev === 0 ? totalSlides - 1 : prev - 1))
  }, [totalSlides])

  const goToSlide = (index: number) => {
    setCurrentSlide(index)
    // Reset auto-play timer when manually changing slides
    setIsAutoPlaying(true)
  }

  // Handle touch events for swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX)
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX)
  }

  const handleTouchEnd = () => {
    if (touchStart - touchEnd > 50) {
      // Swipe left
      nextSlide()
    }

    if (touchStart - touchEnd < -50) {
      // Swipe right
      prevSlide()
    }
  }

  // Auto-play functionality
  useEffect(() => {
    let interval: NodeJS.Timeout

    if (isAutoPlaying) {
      interval = setInterval(() => {
        nextSlide()
      }, 5000) // Change slide every 5 seconds
    }

    return () => {
      if (interval) clearInterval(interval)
    }
  }, [isAutoPlaying, nextSlide])

  // Pause auto-play when user interacts with slider
  const handleMouseEnter = () => setIsAutoPlaying(false)
  const handleMouseLeave = () => setIsAutoPlaying(true)

  return (
    <div
      className="relative h-[300px] w-full overflow-hidden rounded-lg md:h-[450px]"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Slides */}
      <div
        className="h-full w-full transition-transform duration-500 ease-out"
        style={{ transform: `translateX(-${currentSlide * 100}%)`, display: "flex" }}
      >
        {bannerData.map((banner) => (
          <div key={banner.id} className="relative h-full min-w-full">
            {/* Background Image */}
            <div className="absolute inset-0">
              <Image
                src={banner.image || "/placeholder.svg"}
                alt={banner.title}
                fill
                className="object-cover"
                priority={banner.id === 1}
              />
              {/* Gradient Overlay */}
              <div className={`absolute inset-0 bg-gradient-to-r ${banner.color} opacity-60`}></div>
            </div>

            {/* Content */}
            <div className="absolute inset-0 flex items-center ml-8">
              <div className="container px-6 md:px-10">
                <div className="max-w-lg">
                  <span className="mb-2 inline-block rounded-full bg-white/20 px-4 py-1 text-sm font-medium backdrop-blur-sm">
                    {banner.subtitle}
                  </span>
                  <h2 className={`mb-3 text-3xl font-bold md:text-5xl ${banner.textColor}`}>{banner.title}</h2>
                  <p className={`mb-6 max-w-md text-sm md:text-base ${banner.textColor} opacity-90`}>
                    {banner.description}
                  </p>
                  <Link href={banner.ctaLink}>
                    <Button className="bg-[#ff5e3a] hover:bg-[#ff5e3a]/90 text-white">{banner.cta}</Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      <button
        className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-white/30 p-2 backdrop-blur-sm transition-all hover:bg-white/50 md:p-3"
        onClick={prevSlide}
        aria-label="Previous slide"
      >
        <ChevronLeft className="h-5 w-5 text-white md:h-6 md:w-6" />
      </button>
      <button
        className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-white/30 p-2 backdrop-blur-sm transition-all hover:bg-white/50 md:p-3"
        onClick={nextSlide}
        aria-label="Next slide"
      >
        <ChevronRight className="h-5 w-5 text-white md:h-6 md:w-6" />
      </button>

      {/* Indicators */}
      <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 space-x-2">
        {bannerData.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`h-2 w-2 rounded-full transition-all md:h-3 md:w-10 md:rounded-md ${
              index === currentSlide ? "bg-[#ff5e3a] md:w-14" : "bg-white/50 hover:bg-white/80"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}
