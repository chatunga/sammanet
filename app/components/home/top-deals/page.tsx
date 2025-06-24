"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CalendarCheck, ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useEffect } from "react";

export default function TopDeals() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  // Detect screen size
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  const productsPerSlide = isMobile ? 1 : 3;
  const allProducts = [
    {
      name: "Tablet Pro 10.2 (2022)",
      price: "$329.00",
      discount: "$399.99",
      tag: "NEW",
      creditSale: "$121.23*/mo ($345.45* deposit)",
    },
    {
      name: "UltraBook Pro i7 (2023)",
      price: "$1,199.00",
      tag: "NEW",
      creditSale: "$121.23*/mo ($345.45* deposit)",
    },
    {
      name: "Wireless Headphones",
      price: "$99.00",
      tag: "NEW",
      creditSale: "$121.23*/mo ($345.45* deposit)",
    },
    {
      name: "Smart Watch Pro",
      price: "$349.00",
      discount: "$399.00",
      tag: "NEW",
      creditSale: "$121.23*/mo ($345.45* deposit)",
    },
    {
      name: "Digital Camera",
      price: "$1,499.99",
      tag: "NEW",
      creditSale: "$121.23*/mo ($345.45* deposit)",
    },
    {
      name: "Gaming Console",
      price: "$499.99",
      discount: "$599.99",
      tag: "HOT",
      creditSale: "$121.23*/mo ($345.45* deposit)",
    },
    {
      name: "Bluetooth Speaker",
      price: "$79.99",
      tag: "SALE",
      creditSale: "$121.23*/mo ($345.45* deposit)",
    },
    {
      name: "Laptop Stand",
      price: "$49.99",
      discount: "$69.99",
      tag: "NEW",
      creditSale: "$121.23*/mo ($345.45* deposit)",
    },
    {
      name: "Wireless Mouse",
      price: "$29.99",
      tag: "DEAL",
      creditSale: "$121.23*/mo ($345.45* deposit)",
    },
  ];
  const totalSlides = Math.ceil(allProducts.length / productsPerSlide);

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(
      () => {
        setCurrentSlide((prev) => (prev + 1) % totalSlides);
      },
      isMobile ? 3000 : 4000 // Faster on mobile
    );

    return () => clearInterval(interval);
  }, [currentSlide, isAutoPlaying, totalSlides, isMobile]);

  // Reset slide when screen size changes
  useEffect(() => {
    setCurrentSlide(0);
  }, [isMobile]);

  // Pause auto-play when user interacts
  const handleUserInteraction = () => {
    setIsAutoPlaying(false);
    // Resume auto-play after 8 seconds on mobile, 10 seconds on desktop
    setTimeout(() => setIsAutoPlaying(true), isMobile ? 8000 : 10000);
  };

  const nextSlide = () => {
    handleUserInteraction();
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  };

  const prevSlide = () => {
    handleUserInteraction();
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  const getCurrentProducts = () => {
    const startIndex = currentSlide * productsPerSlide;
    return allProducts.slice(startIndex, startIndex + productsPerSlide);
  };

  return (
    <>
      <section className="py-6 md:py-12 flex items-center justify-center border-2 border-gray-200 rounded-lg mx-2 md:mx-4 my-4 md:my-6">
        <div className="container px-3 md:px-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 md:mb-6 gap-3 md:gap-4">
            <div>
              <h2 className="text-xl md:text-2xl font-bold text-black-600 mb-1">
                Credit Deals
              </h2>
              <p className="text-sm md:text-base text-muted-foreground">
                Our top Credit Deals, Get in touch for more information!
              </p>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs md:text-sm text-muted-foreground">
                Sort by:
              </span>
              <select className="rounded-md border border-input bg-background px-2 md:px-3 py-1 text-xs md:text-sm">
                <option>All Categories</option>
                <option>Electronics</option>
                <option>Smartphones</option>
                <option>Accessories</option>
              </select>
            </div>
          </div>
          <hr />

          {/* Slider Container */}
          <div className="relative mt-6">
            {/* Navigation Buttons */}
            <div className="absolute -left-2 md:-left-4 top-1/2 -translate-y-1/2 z-10">
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8 md:h-10 md:w-10 rounded-full bg-white shadow-lg hover:bg-gray-50"
                onClick={prevSlide}
              >
                <ChevronLeft className="h-4 w-4 md:h-5 md:w-5" />
              </Button>
            </div>

            <div className="absolute -right-2 md:-right-4 top-1/2 -translate-y-1/2 z-10">
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8 md:h-10 md:w-10 rounded-full bg-white shadow-lg hover:bg-gray-50"
                onClick={nextSlide}
              >
                <ChevronRight className="h-4 w-4 md:h-5 md:w-5" />
              </Button>
            </div>

            {/* Products Grid */}
            <div className="overflow-hidden px-4 md:px-0">
              <div
                className="flex transition-transform duration-300 ease-in-out"
                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
              >
                {Array.from({ length: totalSlides }).map((_, slideIndex) => (
                  <div key={slideIndex} className="w-full flex-shrink-0">
                    <div
                      className={`gap-4 ${
                        isMobile ? "grid grid-cols-1" : "grid grid-cols-3"
                      }`}
                    >
                      {allProducts
                        .slice(
                          slideIndex * productsPerSlide,
                          (slideIndex + 1) * productsPerSlide
                        )
                        .map((product, index) => (
                          <div
                            key={`${slideIndex}-${index}`}
                            className="group relative rounded-lg border bg-background p-2 mx-auto max-w-sm md:max-w-none"
                          >
                            {product.tag && (
                              <Badge className="absolute left-3 top-3 bg-[#ff5e3a] z-10">
                                {product.tag}
                              </Badge>
                            )}
                            <div className="relative mb-2 aspect-square overflow-hidden rounded-md bg-[#0000FF]">
                              <div className="absolute right-2 top-2 flex flex-col gap-2">
                                <Button
                                  size="icon"
                                  variant="secondary"
                                  className="h-6 w-16 text-orange-500"
                                >
                                  Credit
                                </Button>
                              </div>
                            </div>
                            <div className="p-2">
                              <h3 className="line-clamp-2 text-sm md:text-base font-medium">
                                {product.name}
                              </h3>
                              <div className="mt-1 flex items-center gap-2">
                                <span className="font-medium text-[#ff5e3a] text-sm md:text-base">
                                  {product.price}
                                </span>
                                {product.discount && (
                                  <span className="text-xs text-muted-foreground line-through">
                                    {product.discount}
                                  </span>
                                )}
                              </div>
                              <hr className="my-2" />
                              <p className="text-xs md:text-sm">
                                {product.creditSale}
                              </p>
                              <div className="flex items-center mt-2">
                                <CalendarCheck
                                  color="blue"
                                  size={isMobile ? 12 : 14}
                                />{" "}
                                &nbsp;
                                <span className="text-[#0000FF] text-xs md:text-sm">
                                  Over 12 Months
                                </span>
                              </div>
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Slide Indicators */}
          <div className="mt-6 md:mt-8 flex items-center justify-center gap-1 md:gap-2">
            {Array.from({ length: totalSlides }).map((_, index) => (
              <Button
                key={index}
                variant={index === currentSlide ? "default" : "outline"}
                size="icon"
                className={
                  index === currentSlide
                    ? "h-6 w-6 md:h-8 md:w-8 bg-[#ff5e3a] hover:bg-[#ff5e3a]/90 text-xs md:text-sm"
                    : "h-6 w-6 md:h-8 md:w-8 text-xs md:text-sm"
                }
                onClick={() => {
                  handleUserInteraction();
                  setCurrentSlide(index);
                }}
              >
                {index + 1}
              </Button>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
