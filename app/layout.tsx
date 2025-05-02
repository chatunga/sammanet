import type React from "react"
import "@/app/globals.css"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Sammanet",
  description: "Your one-stop destination for a wide range of products and services. We provide comprehensive support to manufacturers, wholesalers, and retailers, ensuring a seamless online shopping experience. Explore our extensive collection of high-quality products, including electronics, fashion, home decor, beauty essentials, and more. With our user-friendly interface and secure payment options, shopping has never been easier. Join our thriving community of satisfied customers today!",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
