import { Phone, MessageCircle } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function BedBanner() {
  return (
    <div className="w-full bg-white">
      {/* Main Banner Container */}
      <div className="relative w-full min-h-[350px] md:min-h-[450px] overflow-hidden">
        {/* Split Layout Container */}
        <div className="relative z-10 h-full min-h-[350px] md:min-h-[450px] flex flex-col md:flex-row">
          {/* Left Side - All Text Content */}
          <div
            className="flex-1 text-white px-6 md:px-8 lg:px-12 py-8 md:py-12 flex items-center"
            style={{
              background: "linear-gradient(to right, rgba(37, 99, 235, 0.95), rgba(249, 115, 22, 0.95))",
            }}
          >
            <div className="w-full max-w-2xl">
              <div className="text-center md:text-left">
                <h1 className="text-2xl md:text-3xl lg:text-2xl font-bold mb-4">When I was young,</h1>
                <p className="text-base md:text-lg lg:text-md mb-2">I thought mum and dad slept together, Because we didn't have enough blankets. But it wasn't about blankets. Comfort brings people closer!</p>
                <div className="text-lg md:text-xl lg:text-2xl font-bold mb-6">
                  <p className="mb-2 md:text-lg lg:text-md"></p>
                </div>

                {/* Product Information */}
                <div className="mb-6">
                  <h2 className="text-2xl md:text-3xl lg:text-xl font-bold mb-4">Just Sleep Right.</h2>
                  <div className="text-sm md:text-base lg:text-lg mb-2">
                    <span className="">Premium Beds | Flexible Payments</span>
                  </div>
                  <div className="text-lg md:text-xl font-bold mb-2">Two hearts. One space.</div>
                  <div className="text-base md:text-lg mb-4">Simply. Beautifully.</div>
                </div>

                {/* Inquire Button */}
                <div className="mb-4">
                  <Button
                    className="text-lg md:text-xl font-bold px-8 md:px-12 py-3 md:py-4 rounded-full border-2 border-white text-white bg-transparent hover:bg-white hover:text-blue-600 transition-all duration-300 shadow-lg"
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

          {/* Right Side - Image */}
          <div className="flex-1 relative">
            <div
              className="absolute inset-0 bg-cover bg-center bg-no-repeat"
              style={{
                backgroundImage: "url('/feature/bed-advert.png')",
              }}
            />
            {/* Optional overlay for better image visibility */}
            <div className="absolute inset-0 bg-black bg-opacity-10"></div>
          </div>
        </div>
      </div>


    </div>
  )
}
