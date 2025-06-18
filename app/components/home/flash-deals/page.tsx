"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Clock, ShoppingCart } from "lucide-react"
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
  },
  {
    id: 2,
    name: "Smart Fitness Watch",
    originalPrice: 149.99,
    discountedPrice: 89.99,
    image: "/placeholder.svg?height=200&width=200",
    description: "Track your fitness goals with precision",
  },
  {
    id: 3,
    name: "Ultra HD 4K Action Camera",
    originalPrice: 249.99,
    discountedPrice: 179.99,
    image: "/placeholder.svg?height=200&width=200",
    description: "Capture your adventures in stunning detail",
  },
  {
    id: 4,
    name: "Portable Bluetooth Speaker",
    originalPrice: 79.99,
    discountedPrice: 49.99,
    image: "/placeholder.svg?height=200&width=200",
    description: "Powerful sound in a compact design",
  },
  {
    id: 5,
    name: "Ergonomic Gaming Chair",
    originalPrice: 199.99,
    discountedPrice: 129.99,
    image: "/placeholder.svg?height=200&width=200",
    description: "Ultimate comfort for extended gaming sessions",
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
    <div className="flex items-center gap-2 text-xl md:text-2xl font-bold">
      {/*<Clock className="h-5 w-5 md:h-12 md:w-12 text-orange-500" />*/}
      <div className="flex gap-1">
        <div className="bg-orange-500 text-white rounded px-2 py-1 min-w-[2.5rem] text-center">
          {formatTime(timeLeft.hours)}
        </div>
        <span className="text-red-500">:</span>
        <div className="bg-orange-500 text-white rounded px-2 py-1 min-w-[2.5rem] text-center">
          {formatTime(timeLeft.minutes)}
        </div>
        <span className="text-red-500">:</span>
        <div className="bg-orange-500 text-white rounded px-2 py-1 min-w-[2.5rem] text-center">
          {formatTime(timeLeft.seconds)}
        </div>
      </div>
    </div>
  )
}

// Product Card Component
const ProductCard = ({ product }: { product: (typeof flashDealProducts)[0] }) => {
  const discountPercentage = calculateDiscount(product.originalPrice, product.discountedPrice)

  return (
    <Card className="h-full flex flex-col">
      <div className="relative p-4">
        <Badge className="absolute top-2 right-2 bg-orange-500 hover:bg-orange-600">-{discountPercentage}%</Badge>
        <div className="p-4 mb-2 aspect-square overflow-hidden rounded-md bg-[#0000FF]">
         {/* <Image
            src={product.image || "/placeholder.svg"}
            alt={product.name}
            width={200}
            height={200}
            className="object-cover w-full h-[160px] rounded-md"
          />*/}
        </div>
      </div>
      <CardContent className="flex-grow pt-4">
        <h3 className="font-semibold text-lg line-clamp-2 mb-1">{product.name}</h3>
        <p className="text-sm text-muted-foreground line-clamp-2 mb-2">{product.description}</p>
        <div className="flex items-baseline gap-2 mt-2">
          <span className="text-lg font-bold text-orange-500">${product.discountedPrice.toFixed(2)}</span>
          <span className="text-sm text-muted-foreground line-through">${product.originalPrice.toFixed(2)}</span>
        </div>
      </CardContent>
      <CardFooter className="pt-0">
        <Button className="w-full bg-orange-500 hover:bg-orange-600">
          <ShoppingCart className="h-4 w-4 mr-2" />
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  )
}

export default function FlashDeal() {
  // Set flash deal end time to 24 hours from now
  const [endTime] = useState(() => {
    const end = new Date()
    end.setHours(end.getHours() + 24)
    return end
  })

  return (
    <section className="py-8 px-4 md:px-6 lg:px-8 bg-white from-orange-50 to-orange-50">
      <div className="max-w-8xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
          <div>
            <h2 className="text-2xl md:text-2xl font-bold text-black-600 mb-1">Flash Deals</h2>
            <p className="text-muted-foreground">Incredible savings for a limited time only!</p>
          </div>
          <CountdownTimer endTime={endTime} />
        </div>
        <hr/>
        {/* Mobile scrollable view */}
        <div className="md:hidden overflow-x-auto pb-4 -mx-4 px-4">
          <div className="flex gap-4" style={{ minWidth: "min-content" }}>
            {flashDealProducts.map((product) => (
              <div key={product.id} className="w-[220px] flex-shrink-0">
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </div>

        {/* Desktop grid view */}
        <div className="hidden md:grid grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-4 mt-5">
          {flashDealProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        <div className="mt-8 text-center">
          <Button variant="outline" className="border-blue-800 text-blue-800 hover:bg-blue-800 hover:text-white">
            View All Flash Deals
          </Button>
        </div>
      </div>
    </section>
  )
}
