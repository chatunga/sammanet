import { Phone, MessageCircle } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function BedBanner() {
  return (
    <div className="w-full bg-white">
      {/* Main Banner Container with Background Image */}
      <div className="relative w-full min-h-[350px] md:min-h-[450px] overflow-hidden">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('/feature/bed-advert.png')",
          }}
        />

        {/* Gradient Overlay Container */}
        <div className="relative z-10 h-full min-h-[350px] md:min-h-[450px] flex flex-col">
          {/* Main Content Container */}
          <div
            className="flex-1 text-white px-6 md:px-8 lg:px-12 py-8 md:py-12"
            style={{
              background: "linear-gradient(to right, rgba(37, 99, 235, 0.85), rgba(249, 115, 22, 0.85))",
            }}
          >
            <div className="max-w-7xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center relative">
                {/* Vertical Separator Line - Only visible on desktop */}
                <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-white opacity-60 transform -translate-x-1/2"></div>

                {/* Left Content */}
                <div className="text-center md:text-left md:pr-6">
                  <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4">When I was young,</h1>
                  <p className=" md:text-md lg:text-lg mb-2 ">I thought mom and dad slept together...</p>
                  <p className="md:text-md lg:text-lg mb-6">Because we didn't have enough blankets.</p>
                  <div className="text-lg md:text-xl lg:text-2xl font-bold">
                    <p className="mb-2">But it wasn't about blankets.</p>
                    <p>Comfort brings people closer.</p>
                  </div>
                </div>

                {/* Right Content */}
                <div className="text-center md:text-left md:pl-6">
                  <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">Just Sleep Right.</h2>
                  <div className="text-sm md:text-base lg:text-lg mb-2">
                    <span className="font-semibold">Premium Beds | Flexible Payments</span>
                  </div>
                  <div className="text-lg md:text-xl font-bold mb-2">Two hearts. One space.</div>
                  <div className="text-base md:text-lg mb-6">Simply. Beautifully.</div>

                  <div className="flex flex-col md:flex-row items-center md:items-start gap-4">
                    <div className="text-sm md:text-base font-regular text-center md:text-left">
                      <p>Rise Above Your Limits.</p>
                      <p>Just Do It Your Way.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Inquire Button Section */}
          <div
            className="py-6 md:py-8 flex justify-center items-center"
            style={{
              background: "linear-gradient(to right, rgba(37, 99, 235, 0.85), rgba(249, 115, 22, 0.85))",
            }}
          >
            <Button
              className="text-lg md:text-lg font-semi-bold px-8 md:px-12 py-3 md:py-4 rounded-full border-2 border-white text-white bg-transparent hover:bg-white transition-all duration-300 shadow-lg"
              style={{
                background: "linear-gradient(to right, rgba(37, 99, 235, 0.9), rgba(249, 115, 22, 0.9))",
              }}
            >
              Inquire Now
            </Button>
          </div>
        </div>
      </div>

    </div>
  )
}