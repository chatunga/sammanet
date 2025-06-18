import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function Features() {
  return (
    <>
      {/* Features */}
      <section className="border-t py-8">
        <div className="container px-4 items-center justify-center">
          <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-4">
            {[
              {
                title: "Free Delivery",
                description: "Free shipping on all orders over $250",
              },
              {
                title: "Money Guarantee",
                description: "30 day money back guarantee",
              },
              {
                title: "24/7 Support",
                description: "Friendly 24/7 customer support",
              },
              {
                title: "Secure Payment",
                description: "All cards accepted. 100% secure payment",
              },
            ].map((feature, index) => (
              <div key={index} className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#ff5e3a]/10">
                  <span className="text-xl text-[#ff5e3a]">🛒</span>
                </div>
                <div>
                  <h3 className="font-medium">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* Newsletter */}
      <section className="bg-[#ff5e3a] py-8 text-white">
        <div className="container px-4">
          <div className="flex flex-col items-center justify-between gap-4 text-center md:flex-row md:text-left">
            <div>
              <h2 className="text-xl font-bold">
                Subscribe to get our updates
              </h2>
              <p className="text-white/80">
                Be the first to know about new products and exclusive offers
              </p>
            </div>
            <div className="flex w-full max-w-md flex-col gap-2 sm:flex-row">
              <Input
                type="email"
                placeholder="Enter your email"
                className="flex-1 border-white/20 bg-white/10 text-white placeholder:text-white/60"
              />
              <Button className="bg-white text-[#ff5e3a] hover:bg-white/90">
                Subscribe
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
