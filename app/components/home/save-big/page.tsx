import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function SaveBig (){
    return(
        <>
        {/* Save Big Section */}
        <section className="bg-gray-100 py-12 flex items-center justify-center">
          <div className="container grid gap-6 px-4 md:grid-cols-2">
            <div className="flex flex-col justify-center">
              <h2 className="text-2xl font-bold md:text-3xl">
                Effortless Shopping
              </h2>
              <p className="mt-2 text-muted-foreground">
                Relax, and discover a world of possibilities. Say goodbye to
                crowded stores and long lines. With effortless online shopping,
                you can find everything you need and have it delivered right to
                your door. Shop smarter, not harder experience the convenience
                and enjoy more free time.
              </p>
              <Button className="mt-6 w-fit bg-[#ff5e3a] hover:bg-[#ff5e3a]/90">
                Skip the lines, shop online.
              </Button>
            </div>
            <div className="relative h-[540px] w-[600px]" align="right">
              <Image
                src="/gallery/effortless.webp?height=320&width=600"
                alt="Online shopping"
                fill
                className="rounded-lg"
              />
            </div>
          </div>
        </section>
        </>
    )
}