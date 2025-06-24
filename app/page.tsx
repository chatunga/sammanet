"use client";

import FlashDeal from "./components/home/flash-deals/page";
import TestimonialSlider from "@/components/testimonial-slider";
import Header from "./components/home/header/page";
import Banner from "./components/home/banner/page";
import SaveBig from "./components/home/save-big/page";
import TopDeals from "./components/home/top-deals/page";
import FrequentAskedQuestions from "./components/home/faq/page";
import RecommendedProducts from "./components/home/recommended-products/pages";
import Features from "./components/home/features/pages";
import Footer from "./components/home/footer/page";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1">
        <Banner />
        {/* Testimonials Section (Added as requested) */}
        <section className="bg-gray-100 py-12 flex items-center justify-center">
          <div className="container px-4">
            <h2 className="mb-8 text-center text-2xl font-bold md:text-3xl">
              What Our Customers Say
            </h2>
            <TestimonialSlider />
          </div>
        </section>

        <section className="w-full py-8">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="w-full">
                <FlashDeal />
              </div>
              <div className="w-full">
                <TopDeals />
              </div>
            </div>
          </div>
        </section>
        <SaveBig />
        <TopDeals />
        <FrequentAskedQuestions />
        <RecommendedProducts />
        <Features />
      </main>

      <Footer />
    </div>
  );
}
