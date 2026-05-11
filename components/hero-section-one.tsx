import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { HeroHeader } from "./header";
import { AltArrowRight, PlayCircle } from "@solar-icons/react";
import Image from "next/image";
import Busha from "@/components/ui/pngs/busha-updated.png";

export default function HeroSection() {
  return (
  <>
    <main className="overflow-hidden">
      <section className="bg-linear-to-b to-muted from-background">
        <div className="py-36 mx-auto w-full max-w-5xl px-6">
          <div className="flex flex-col md:flex-row md:items-center gap-12">
            
            {/* Left - Text */}
            <div className="md:w-1/2 shrink-0">
              <h1 className="max-w-md text-balance text-5xl font-medium md:text-6xl">
                Universal payments for Business
              </h1>
              <p className="text-muted-foreground my-8 text-balance text-xl">
                Collect payments from your customers in any currency, fiat or crypto, & settle in your preferred local currency seamlessly.
              </p>
              <div className="flex items-center gap-3">
                <Button asChild size="lg" className="pr-4.5">
                  <Link href="/signup">
                    <span className="text-nowrap">Get Started</span>
                    <AltArrowRight weight="BoldDuotone" className="opacity-50 size-5" />
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="pl-5">
                  <Link href="#">
                    <PlayCircle weight="BoldDuotone" className="size-6 text-primary" />
                    <span className="text-nowrap">Watch video</span>
                  </Link>
                </Button>
              </div>
              <div className="mt-10">
                <p className="text-muted-foreground">Trusted by teams at :</p>
                <div className="mt-6 flex items-center gap-8">
                  <Image src={Busha} alt="Busha logo" height={20} width={76} />
                </div>
              </div>
            </div>

            {/* Right - Image */}
            <div className="md:w-1/2">
              <Image
                src="/mist/tailark.png"
                alt="app screen"
                width={2880}
                height={1842}
                className="w-full h-auto rounded-xl border border-[#eadbc9] shadow-md"
              />
            </div>

          </div>
        </div>
      </section>
    </main>
  </>
);
}