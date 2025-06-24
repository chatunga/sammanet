"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CalendarCheck, ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useEffect } from "react";

export default function TopDeals() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const productsPerSlide = 3;
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

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % totalSlides);
    }, 4000); // Change slide every 4 seconds

    return () => clearInterval(interval);
  }, [currentSlide, isAutoPlaying, totalSlides]);

  // Pause auto-play when user interacts
  const handleUserInteraction = () => {
    setIsAutoPlaying(false);
    // Resume auto-play after 10 seconds of no interaction
    setTimeout(() => setIsAutoPlaying(true), 10000);
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
      <section className="py-12 flex items-center justify-center border-2 border-gray-200 rounded-lg mx-4 my-6">
        <div className="container px-4">
          <div className="mb-8 flex items-center justify-between">
            <h2 className="text-2xl font-bold">Our Top Credit Deals</h2>
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">Sort by:</span>
              <select className="rounded-md border border-input bg-background px-3 py-1 text-sm">
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
                    <div className="grid grid-cols-3 gap-4">
                      {allProducts
                        .slice(
                          slideIndex * productsPerSlide,
                          (slideIndex + 1) * productsPerSlide
                        )
                        .map((product, index) => (
                          <div
                            key={`${slideIndex}-${index}`}
                            className="group relative rounded-lg border bg-background p-2"
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
                              {/* <Image
                              src={product.image || "/placeholder.svg"}
                              alt={product.name}
                              width={200}
                              height={200}
                              className="object-cover w-full h-[160px] rounded-md"
                              />*/}
                            </div>
                            <div className="p-2">
                              <h3 className="line-clamp-2 text-sm font-medium">
                                {product.name}
                              </h3>
                              <div className="mt-1 flex items-center gap-2">
                                <span className="font-medium text-[#ff5e3a]">
                                  {product.price}
                                </span>
                                {product.discount && (
                                  <span className="text-xs text-muted-foreground line-through">
                                    {product.discount}
                                  </span>
                                )}
                              </div>
                              <hr className="my-2" />
                              <p className="text-sm">{product.creditSale}</p>
                              <div className="flex items-center mt-2">
                                <CalendarCheck color="blue" size={14} /> &nbsp;
                                <span className="text-[#0000FF] text-sm">
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
          <div className="mt-8 flex items-center justify-center gap-2">
            {Array.from({ length: totalSlides }).map((_, index) => (
              <Button
                key={index}
                variant={index === currentSlide ? "default" : "outline"}
                size="icon"
                className={
                  index === currentSlide
                    ? "h-8 w-8 bg-[#ff5e3a] hover:bg-[#ff5e3a]/90"
                    : "h-8 w-8"
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
