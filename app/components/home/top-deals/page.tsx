import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CalendarCheck, ChevronLeft, ChevronRight } from "lucide-react";

export default function TopDeals() {
    return(
        <>
            {/* New Products */}
        <section className="py-12 flex items-center justify-center">
          <div className="container px-4">
            <div className="mb-8 flex items-center justify-between">
              <h2 className="text-2xl font-bold">Our Top Deals</h2>
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
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
              {[
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
              ].map((product, index) => (
                <div
                  key={index}
                  className="group relative rounded-lg border bg-background p-2"
                >
                  {product.tag && (
                    <Badge className="absolute left-3 top-3 bg-[#ff5e3a]">
                      {product.tag}
                    </Badge>
                  )}
                  <div className="relative mb-2 aspect-square overflow-hidden rounded-md bg-[#0000FF]">
                    {/*<Image
                      src={`/placeholder.svg?height=200&width=200&text=Product`}
                      alt={product.name}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />*/}
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
            <div className="mt-8 flex items-center justify-center gap-2">
              <Button variant="outline" size="icon" className="h-8 w-8">
                <ChevronLeft className="h-4 w-4" />
              </Button>
              {[1, 2, 3, 4, 5].map((page) => (
                <Button
                  key={page}
                  variant={page === 3 ? "default" : "outline"}
                  size="icon"
                  className={
                    page === 3
                      ? "h-8 w-8 bg-[#ff5e3a] hover:bg-[#ff5e3a]/90"
                      : "h-8 w-8"
                  }
                >
                  {page}
                </Button>
              ))}
              <Button variant="outline" size="icon" className="h-8 w-8">
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </section>
        </>
    )
}