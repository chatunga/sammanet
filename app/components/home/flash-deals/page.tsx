"use client"

import { useState, useEffect } from "react"
import { ShoppingCart, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

// Mock data for flash deal products
const flashDealProducts = [
  {
    id: 1,
    name: "Wireless Noise-Cancelling Headphones",
    originalPrice: 299.99,
    discountedPrice: 199.99,
    image: "/placeholder.svg?height=200&width=200",
    description: "Premium sound quality with active noise cancellation",
    rating: 4.5,
    reviews: 732,
  },
  {
    id: 2,
    name: "Smart Fitness Watch",
    originalPrice: 149.99,
    discountedPrice: 89.99,
    image: "/placeholder.svg?height=200&width=200",
    description: "Track your fitness goals with precision",
    rating: 4.3,
    reviews: 456,
  },
  {
    id: 3,
    name: "Ultra HD 4K Action Camera",
    originalPrice: 249.99,
    discountedPrice: 179.99,
    image: "/placeholder.svg?height=200&width=200",
    description: "Capture your adventures in stunning detail",
    rating: 4.7,
    reviews: 891,
  },
  {
    id: 4,
    name: "Portable Bluetooth Speaker",
    originalPrice: 79.99,
    discountedPrice: 49.99,
    image: "/placeholder.svg?height=200&width=200",
    description: "Powerful sound in a compact design",
    rating: 4.2,
    reviews: 234,
  },
  {
    id: 5,
    name: "Ergonomic Gaming Chair",
    originalPrice: 199.99,
    discountedPrice: 129.99,
    image: "/placeholder.svg?height=200&width=200",
    description: "Ultimate comfort for extended gaming sessions",
    rating: 4.6,
    reviews: 567,
  },
  {
    id: 6,
    name: "Wireless Gaming Mouse",
    originalPrice: 89.99,
    discountedPrice: 59.99,
    image: "/placeholder.svg?height=200&width=200",
    description: "Precision gaming with wireless freedom",
    rating: 4.4,
    reviews: 123,
  },
]

// Calculate discount percentage
const calculateDiscount = (original: number, discounted: number) => {
  return Math.round(((original - discounted) / original) * 100)
}

// Countdown Timer Component
const CountdownTimer = ({ endTime }: { endTime: Date }) => {
  const [timeLeft, setTimeLeft] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0,
  })

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = endTime.getTime() - new Date().getTime()

      if (difference > 0) {
        setTimeLeft({
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        })
      }
    }

    calculateTimeLeft()
    const timer = setInterval(calculateTimeLeft, 1000)

    return () => clearInterval(timer)
  }, [endTime])

  const formatTime = (time: number) => {
    return time < 10 ? `0${time}` : time
  }

  return (
    <div className="flex items-center gap-2 text-lg md:text-2xl font-bold">
      <div className="flex gap-1">
        <div className="bg-orange-500 text-white rounded px-2 py-1 min-w-[2rem] md:min-w-[2.5rem] text-center text-sm md:text-base">
          {formatTime(timeLeft.hours)}
        </div>
        <span className="text-red-500">:</span>
        <div className="bg-orange-500 text-white rounded px-2 py-1 min-w-[2rem] md:min-w-[2.5rem] text-center text-sm md:text-base">
          {formatTime(timeLeft.minutes)}
        </div>
        <span className="text-red-500">:</span>
        <div className="bg-orange-500 text-white rounded px-2 py-1 min-w-[2rem] md:min-w-[2.5rem] text-center text-sm md:text-base">
          {formatTime(timeLeft.seconds)}
        </div>
      </div>
    </div>
  )
}

// Product Card Component
const ProductCard = ({ product, isMobile }: { product: (typeof flashDealProducts)[0]; isMobile: boolean }) => {
  const discountPercentage = calculateDiscount(product.originalPrice, product.discountedPrice)

  return (
    <Card className={`h-full flex flex-col ${isMobile ? "w-[180px] flex-shrink-0" : "mx-auto max-w-sm md:max-w-none"}`}>
      <div className="relative p-2 md:p-4">
        <Badge className="absolute top-1 right-1 md:top-2 md:right-2 bg-orange-500 hover:bg-orange-600 text-xs z-10">
          -{discountPercentage}%
        </Badge>
        <div className="aspect-square overflow-hidden rounded-md bg-[#0000FF] mb-2">
          {/* Product image placeholder */}
        </div>
      </div>
      <CardContent className="flex-grow pt-0 px-2 md:px-4">
        <h3 className="font-semibold text-xs md:text-base line-clamp-2 mb-1">{product.name}</h3>
        <div className="flex items-baseline gap-1 md:gap-2 mt-1">
          <span className="text-sm md:text-lg font-bold text-orange-500">${product.discountedPrice.toFixed(2)}</span>
          <span className="text-xs md:text-sm text-muted-foreground line-through">
            ${product.originalPrice.toFixed(2)}
          </span>
        </div>
        <div className="flex items-center gap-1 mt-1">
          <div className="flex text-yellow-400 text-xs">
            
          </div>
        </div>
      </CardContent>
      <CardFooter className="pt-0 px-2 md:px-4">
        <Button className="w-full bg-orange-500 hover:bg-orange-600 text-xs md:text-base py-1 md:py-2">
          <ShoppingCart className="h-3 w-3 md:h-4 md:w-4 mr-1 md:mr-2" />
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  )
}

export default function FlashDeal() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const [isMobile, setIsMobile] = useState(false)

  // Detect screen size
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkScreenSize()
    window.addEventListener("resize", checkScreenSize)
    return () => window.removeEventListener("resize", checkScreenSize)
  }, [])

  const productsPerSlide = isMobile ? 1 : 3
  const totalSlides = Math.ceil(flashDealProducts.length / productsPerSlide)

  // Set flash deal end time to 24 hours from now
  const [endTime] = useState(() => {
    const end = new Date()
    end.setHours(end.getHours() + 24)
    return end
  })

  // Auto-play functionality (only for desktop)
  useEffect(() => {
    if (!isAutoPlaying || isMobile) return

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % totalSlides)
    }, 4000)

    return () => clearInterval(interval)
  }, [currentSlide, isAutoPlaying, totalSlides, isMobile])

  // Reset slide when screen size changes
  useEffect(() => {
    setCurrentSlide(0)
  }, [isMobile])

  // Pause auto-play when user interacts
  const handleUserInteraction = () => {
    setIsAutoPlaying(false)
    setTimeout(() => setIsAutoPlaying(true), 10000)
  }

  const nextSlide = () => {
    handleUserInteraction()
    setCurrentSlide((prev) => (prev + 1) % totalSlides)
  }

  const prevSlide = () => {
    handleUserInteraction()
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides)
  }

  return (
    <section className="py-6 md:py-8 px-3 md:px-6 lg:px-8 bg-white border-2 border-gray-200 rounded-lg mx-2 md:mx-4 my-4 md:my-6">
      <div className="max-w-8xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 md:mb-6 gap-3 md:gap-4">
          <div>
            <h2 className="text-xl md:text-2xl font-bold text-black-600 mb-1">Flash Deals</h2>
            <p className="text-sm md:text-base text-muted-foreground">Incredible savings for a limited time only!</p>
          </div>
          <CountdownTimer endTime={endTime} />
        </div>
        <hr />

        {/* Mobile Horizontal Scroll */}
        {isMobile ? (
          <div className="mt-4">
            <div
              className="flex gap-3 overflow-x-auto pb-4 scrollbar-hide"
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
              {flashDealProducts.map((product) => (
                <ProductCard key={product.id} product={product} isMobile={true} />
              ))}
            </div>
          </div>
        ) : (
          /* Desktop Slider */
          <div className="relative mt-6">
            {/* Navigation Buttons */}
            <div className="absolute -left-4 top-1/2 -translate-y-1/2 z-10">
              <Button
                variant="outline"
                size="icon"
                className="h-10 w-10 rounded-full bg-white shadow-lg hover:bg-gray-50"
                onClick={prevSlide}
              >
                <ChevronLeft className="h-5 w-5" />
              </Button>
            </div>

            <div className="absolute -right-4 top-1/2 -translate-y-1/2 z-10">
              <Button
                variant="outline"
                size="icon"
                className="h-10 w-10 rounded-full bg-white shadow-lg hover:bg-gray-50"
                onClick={nextSlide}
              >
                <ChevronRight className="h-5 w-5" />
              </Button>
            </div>

            {/* Products Grid */}
            <div className="overflow-hidden">
              <div
                className="flex transition-transform duration-300 ease-in-out"
                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
              >
                {Array.from({ length: totalSlides }).map((_, slideIndex) => (
                  <div key={slideIndex} className="w-full flex-shrink-0">
                    <div className="grid gap-4 grid-cols-3">
                      {flashDealProducts
                        .slice(slideIndex * productsPerSlide, (slideIndex + 1) * productsPerSlide)
                        .map((product) => (
                          <ProductCard key={`${slideIndex}-${product.id}`} product={product} isMobile={false} />
                        ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Slide Indicators */}
            <div className="mt-8 flex items-center justify-center gap-2">
              {Array.from({ length: totalSlides }).map((_, index) => (
                <Button
                  key={index}
                  variant={index === currentSlide ? "default" : "outline"}
                  size="icon"
                  className={
                    index === currentSlide ? "h-8 w-8 bg-orange-500 hover:bg-orange-600 text-sm" : "h-8 w-8 text-sm"
                  }
                  onClick={() => {
                    handleUserInteraction()
                    setCurrentSlide(index)
                  }}
                >
                  {index + 1}
                </Button>
              ))}
            </div>
          </div>
        )}

      </div>
    </section>
  )
}
