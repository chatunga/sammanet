"use client";

import Link from "next/link";
import Image from "next/image";
import MainLogo from "@/public/logo.png";
import {
  ChevronRight,
  ChevronLeft,
  CalendarCheck,
  Facebook,
  Twitter,
  Instagram,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import FlashDeal from "./components/home/flash-deals/page";
import TestimonialSlider from "@/components/testimonial-slider";
import Header from "./components/home/header/page";
import Banner from "./components/home/banner/page";
import SaveBig from "./components/home/save-big/page";

export default function Home() {

  return (
    <div className="flex min-h-screen flex-col">
      <Header/>

      <main className="flex-1">
       <Banner/>
        {/* Testimonials Section (Added as requested) */}
        <section className="bg-gray-100 py-12 flex items-center justify-center">
          <div className="container px-4">
            <h2 className="mb-8 text-center text-2xl font-bold md:text-3xl">
              What Our Customers Say
            </h2>
            <TestimonialSlider />
          </div>
        </section>
        <FlashDeal />
        <SaveBig />
        
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

        {/* Tech Talk 
        <section className="bg-gray-100 py-12">
          <div className="container px-4">
            <div className="mb-8 flex items-center justify-between">
              <h2 className="text-2xl font-bold">Tech Talk</h2>
              <Link
                href="#"
                className="flex items-center gap-1 text-sm font-medium text-[#ff5e3a]"
              >
                View All <ChevronRight className="h-4 w-4" />
              </Link>
            </div>
            <p className="mb-8 text-muted-foreground">
              Stay up to date with the latest trends, reviews, and insights from
              our experts.
            </p>
            <div className="grid gap-6 md:grid-cols-3">
              {[
                {
                  title:
                    "High Quality vs Price: Why You Should Upgrade to Smart TV",
                  category: "REVIEW",
                },
                {
                  title:
                    "How to Choose the Right Laptop for Your Work and Gaming Needs",
                  category: "GUIDE",
                },
                {
                  title:
                    "The Future of Smart Home Technology: A Look Into Our Future",
                  category: "FEATURE",
                },
              ].map((article, index) => (
                <div
                  key={index}
                  className="overflow-hidden rounded-lg bg-white"
                >
                  <div className="relative h-48 w-full">
                    <Image
                      src={`/placeholder.svg?height=200&width=400&text=Tech Blog`}
                      alt={article.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <Badge className="mb-2 bg-[#ff5e3a]/10 text-[#ff5e3a]">
                      {article.category}
                    </Badge>
                    <h3 className="mb-2 font-medium">{article.title}</h3>
                    <Link
                      href="#"
                      className="text-sm font-medium text-[#ff5e3a]"
                    >
                      Read More
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>*/}

        {/* Our Choices Section 
        <section className="py-12 flex items-center justify-center">
          <div className="container px-4">
            <h2 className="mb-2 text-2xl font-bold">
              Our Choices for Top 10 Tech Gadgets in 2025
            </h2>
            <p className="mb-8 text-muted-foreground">
              Our experts have tested hundreds of products this year to bring
              you the absolute best tech gadgets available on the market.
            </p>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="rounded-lg border bg-card p-4 shadow-sm">
                <div className="flex items-center justify-between">
                  <Badge className="bg-[#ff5e3a]">FEATURED</Badge>
                  <div className="flex gap-2 text-xs text-muted-foreground">
                    <span>Review Score:</span>
                    <div className="flex">
                      {Array(5)
                        .fill(null)
                        .map((_, i) => (
                          <Star
                            key={i}
                            className="h-3 w-3 fill-[#ff5e3a] text-[#ff5e3a]"
                          />
                        ))}
                    </div>
                    <span>|</span>
                    <span>JUNE 2023</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>*/}

        {/* FAQ Section */}
        <section className="py-12 bg-gray-100">
          <div className="container px-4">
            <h2 className="mb-8 text-center text-2xl font-bold md:text-3xl">
              Frequently Asked Questions
            </h2>
            <div className="mx-auto max-w-3xl">
              <Accordion type="single" collapsible className="w-full">
                {[
                  {
                    question: "What payment methods do you accept?",
                    answer:
                      "We accept all major credit cards, PayPal, Apple Pay, and Google Pay. All transactions are secure and encrypted.",
                  },
                  {
                    question: "How long does product shipping take?",
                    answer:
                      "Standard shipping takes 3-5 business days. Express shipping (1-2 business days) is available for an additional fee. International shipping times vary by location.",
                  },
                  {
                    question: "Can I track my Loan application?",
                    answer:
                      "Yes, once your order ships, you'll receive a tracking number via email that you can use to monitor your package's progress. You can also track your order from your account dashboard.",
                  },
                  {
                    question: "Do you offer international shipping?",
                    answer:
                      "Yes, we ship to most countries worldwide. International shipping rates and delivery times vary depending on the destination.",
                  },
                  {
                    question: "Can I track my order?",
                    answer:
                      "Yes, once your order ships, you'll receive a tracking number via email that you can use to monitor your package's progress. You can also track your order from your account dashboard.",
                  },
                ].map((faq, index) => (
                  <AccordionItem key={index} value={`item-${index}`}>
                    <AccordionTrigger className="text-left">
                      <div className="flex items-center gap-2">
                        <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#ff5e3a]/10 text-[#ff5e3a]">
                          <span className="text-xs">{index + 1}</span>
                        </div>
                        {faq.question}
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="pl-8">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </section>

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
      </main>

      {/* Footer */}
      <footer className="border-t bg-background py-8">
        <div className="container px-4">
          <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-4">
            <div>
              <Image
                src={MainLogo || "/placeholder.svg"}
                alt="Main Logo"
                width={160}
              />
              <p className="mb-4 text-sm text-muted-foreground mt-4">
                Your one-stop destination for all your tech needs. Quality
                products, competitive prices, and exceptional service.
              </p>
              <div className="flex gap-4">
                <Link href="#" aria-label="Facebook">
                  <Facebook className="h-4 w-4 text-muted-foreground" />
                </Link>
                <Link href="#" aria-label="Twitter">
                  <Twitter className="h-4 w-4 text-muted-foreground" />
                </Link>
                <Link href="#" aria-label="Instagram">
                  <Instagram className="h-4 w-4 text-muted-foreground" />
                </Link>
              </div>
            </div>
            <div>
              <h3 className="mb-4 text-sm font-bold">Shop</h3>
              <ul className="space-y-2 text-sm">
                {[
                  "All Products",
                  "Credit Sales",
                  "Latest",
                  "Best Selling",
                  "Deals & Promotions",
                ].map((link) => (
                  <li key={link}>
                    <Link
                      href="#"
                      className="text-muted-foreground hover:text-foreground"
                    >
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="mb-4 text-sm font-bold">Information</h3>
              <ul className="space-y-2 text-sm">
                {[
                  "About Us",
                  "Contact Us",
                  "Privacy Policy",
                  "Returns Policy",
                  "Terms & Conditions",
                ].map((link) => (
                  <li key={link}>
                    <Link
                      href="#"
                      className="text-muted-foreground hover:text-foreground"
                    >
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="mb-4 text-sm font-bold">Customer Service</h3>
              <ul className="space-y-2 text-sm">
                {[
                  "My Account",
                  "Track Order",
                  "Customer Support",
                  "Returns & Exchanges",
                  "FAQ",
                ].map((link) => (
                  <li key={link}>
                    <Link
                      href="#"
                      className="text-muted-foreground hover:text-foreground"
                    >
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="mt-8 border-t pt-8 text-center text-sm text-muted-foreground">
            <p>
              Copyright &copy; {new Date().getFullYear()} Sammanet | All rights
              reserved.{" "}
              <span className="text-primary">POWERED BY SHIFT LOJIK</span>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
