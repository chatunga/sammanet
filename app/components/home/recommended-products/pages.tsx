import { ChevronRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function RecommendedProducts() {
  return (
    <>
      {/* Recommended Products */}
      <section className="py-12 flex items-center justify-center">
        <div className="container px-4">
          <div className="mb-8 flex items-center justify-between">
            <h2 className="text-2xl font-bold">Recommended Products</h2>
            <Link
              href="#"
              className="flex items-center gap-1 text-sm font-medium text-[#ff5e3a]"
            >
              View All <ChevronRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {[
              { name: "iPhone 13 Pro", price: "$999.00" },
              { name: "Fujifilm Instax Camera", price: "$79.99" },
              {
                name: "Portable Bluetooth Speaker",
                price: "$119.00",
                discount: "$139.99",
              },
              { name: "HD Wireless Headphones", price: "$99.99" },
              { name: "4K OLED Smart TV", price: "$1,299.99" },
            ].map((product, index) => (
              <div
                key={index}
                className="group relative rounded-lg border bg-background p-2"
              >
                <div className="relative mb-2 aspect-square overflow-hidden rounded-md bg-[#0000FF]">
                  {/*<Image
                      src={`/placeholder.svg?height=200&width=200&text=Product`}
                      alt={product.name}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
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
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
