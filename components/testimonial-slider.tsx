"use client"

import type React from "react"

import { useState, useEffect, useCallback } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight, Star } from "lucide-react"

// Expanded testimonial data
const testimonials = [
  {
    name: "Tinashe Chatunga",
    role: "Founder Shift Lojik",
    comment:
      "I've been shopping here for years and the quality of products and customer service is consistently excellent. The fast shipping make this my go to store.",
    rating: 5,
    image: "/testimonials/img1.jpg",
  },
  {
    name: "Lorraine Chatunga",
    role: "Professional Photographer",
    comment:
      "I've been shopping here for years and the quality of products and customer service is consistently excellent. The fast shipping make this my go to store.",
    rating: 5,
    image: "/testimonials/img1.jpg",
  },
  {
    name: "Patience Chatunga",
    role: "Business Developer",
    comment:
      "The product selection is unmatched and the website makes it so easy to find exactly what I'm looking for. Delivery was faster than expected!",
    rating: 5,
    image: "/testimonials/img1.jpg",
  },
  {
    name: "Tinashe Chatunga",
    role: "UI/UX Designer",
    comment:
      "As a designer, I appreciate the quality and attention to detail in every product. Customer service was exceptional when I needed to make a return.",
    rating: 4,
    image: "/testimonials/img1.jpg",
  },
  {
    name: "Mr CEO",
    role: "Software Developer",
    comment:
      "The tech products I've purchased have exceeded my expectations. The detailed specifications and honest reviews helped me make informed decisions.",
    rating: 5,
    image: "/testimonials/img1.jpg",
  },
  {
    name: "Flexy The Guy",
    role: "Student",
    comment:
      "The student discounts are amazing! I was able to get all my electronics for school at great prices. The website is also super easy to navigate.",
    rating: 5,
    image: "/testimonials/img1.jpg",
  },
]

export default function TestimonialSlider() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const [touchStart, setTouchStart] = useState(0)
  const [touchEnd, setTouchEnd] = useState(0)

  // Calculate how many testimonials to show per slide based on screen size
  const [itemsPerSlide, setItemsPerSlide] = useState(2)

  // Update items per slide based on window width
  useEffect(() => {
    const handleResize = () => {
      setItemsPerSlide(window.innerWidth < 768 ? 1 : 2)
    }

    // Set initial value
    handleResize()

    // Add event listener
    window.addEventListener("resize", handleResize)

    // Clean up
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  // Calculate total number of slides
  const totalSlides = Math.ceil(testimonials.length / itemsPerSlide)

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
      }, 6000) // Change slide every 6 seconds
    }

    return () => {
      if (interval) clearInterval(interval)
    }
  }, [isAutoPlaying, nextSlide])

  // Pause auto-play when user interacts with slider
  const handleMouseEnter = () => setIsAutoPlaying(false)
  const handleMouseLeave = () => setIsAutoPlaying(true)

  return (
    <div className="relative py-4">
      {/* Slider container */}
      <div
        className="relative overflow-hidden"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* Slides */}
        <div
          className="flex transition-transform duration-500 ease-out"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {/* Generate slides based on itemsPerSlide */}
          {Array.from({ length: totalSlides }).map((_, slideIndex) => (
            <div key={slideIndex} className="min-w-full flex flex-col md:flex-row gap-6">
              {testimonials
                .slice(slideIndex * itemsPerSlide, slideIndex * itemsPerSlide + itemsPerSlide)
                .map((testimonial, testimonialIndex) => (
                  <div
                    key={testimonialIndex}
                    className="flex-1 grid grid-cols-1 md:grid-cols-5 rounded-lg bg-white p-6 shadow-sm"
                  >
                    <div className="md:col-span-2 flex flex-col items-center">
                      <div className="mb-4 flex flex-col items-center">
                        <div className="relative h-24 w-24 md:h-32 md:w-32 lg:h-48 lg:w-48 overflow-hidden rounded-full bg-gray-200">
                          <Image
                            src={
                              testimonial.image || `/placeholder.svg?height=156&width=156&text=${testimonial.name[0]}`
                            }
                            alt={testimonial.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div>
                          <h3 className="font-medium text-center mt-3">{testimonial.name}</h3>
                          <p className="text-sm text-muted-foreground text-center">{testimonial.role}</p>
                          <div className="flex justify-center mt-2">
                            {Array.from({ length: 5 }).map((_, i) => (
                              <Star
                                key={i}
                                className={`h-4 w-4 ${
                                  i < testimonial.rating ? "fill-[#ff5e3a] text-[#ff5e3a]" : "text-gray-300"
                                }`}
                              />
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="md:col-span-3 flex items-center justify-center text-base md:text-lg text-muted-foreground text-center">
                      <p className="italic">"{testimonial.comment}"</p>
                    </div>
                  </div>
                ))}
            </div>
          ))}
        </div>

        {/* Navigation Arrows */}
        <button
          className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-white p-2 shadow-md transition-all hover:bg-gray-100"
          onClick={prevSlide}
          aria-label="Previous testimonial"
        >
          <ChevronLeft className="h-5 w-5 text-gray-600" />
        </button>
        <button
          className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-white p-2 shadow-md transition-all hover:bg-gray-100"
          onClick={nextSlide}
          aria-label="Next testimonial"
        >
          <ChevronRight className="h-5 w-5 text-gray-600" />
        </button>
      </div>

      {/* Indicators */}
      <div className="mt-6 flex justify-center space-x-2">
        {Array.from({ length: totalSlides }).map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`h-2 w-2 rounded-full transition-all md:h-2 md:w-8 ${
              index === currentSlide ? "bg-[#ff5e3a] md:w-12" : "bg-gray-300 hover:bg-gray-400"
            }`}
            aria-label={`Go to testimonial slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}
