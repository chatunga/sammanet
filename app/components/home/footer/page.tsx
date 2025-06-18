import Image from "next/image";
import MainLogo from "@/public/logo.png";
import Link from "next/link";
import { Facebook, Instagram, Twitter } from "lucide-react";
export default function Footer() {
  return (
    <>
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
    </>
  );
}
