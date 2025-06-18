import Link from "next/link";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Search, ShoppingCart, User } from "lucide-react";
import MainLogo from "@/public/logo.png";

export default function Header() {
  const [isSearchVisible, setSearchVisible] = useState(false);
  const toggleSearch = () => {
    setSearchVisible((prev: boolean) => !prev);
  };
  return (
    <>
      {/* Main header */}
      <header className="w-full border-b-[2px] border-b-[#0000FF] bg-white py-4">
        <div className="container flex items-center justify-between px-4">
          <Link href="/" className="flex items-center space-x-2">
            <Image
              src={MainLogo}
              alt="Main Logo"
              width={120}
              height={40}
              priority
            />
          </Link>

          {/* Desktop search bar */}
          <div className="relative hidden w-full max-w-md mx-8 lg:flex">
            <Input
              type="search"
              placeholder="Search Products..."
              className="w-full pr-10 rounded-md border-gray-300"
            />
            <Button
              size="default"
              variant="default"
              className="absolute right-0 top-0 h-full"
            >
              SEARCH
            </Button>
          </div>

          <div className="flex items-center gap-4 lg:gap-6">
            {/* Mobile search toggle button */}
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={toggleSearch}
              aria-label="Toggle search"
            >
              <Search className="h-6 w-6" />
            </Button>

            <Link href="#" className="flex items-center gap-2">
              <div className="relative">
                <ShoppingCart className="h-6 w-6" />
                <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-[#ff5e3a] text-[10px] text-white">
                  0
                </span>
              </div>
              <div className="hidden flex-col items-start lg:flex">
                <span className="text-xs text-muted-foreground">Cart</span>
                <span className="text-sm font-medium">$00.00</span>
              </div>
            </Link>

            <Link href="#" className="flex items-center gap-2">
              <User className="h-6 w-6" />
              <div className="hidden flex-col items-start lg:flex">
                <span className="text-xs text-muted-foreground">User</span>
                <span className="text-sm font-medium">Sign In</span>
              </div>
            </Link>
          </div>
        </div>

        {/* Mobile search bar - conditionally rendered */}
        {isSearchVisible && (
          <div className="container px-4 mt-4 lg:hidden">
            <div className="relative w-full">
              <Input
                type="search"
                placeholder="Search Products..."
                className="w-full pr-10 rounded-md border-gray-300"
              />
              <Button
                size="default"
                variant="default"
                className="absolute right-0 top-0 h-full"
              >
                SEARCH
              </Button>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
