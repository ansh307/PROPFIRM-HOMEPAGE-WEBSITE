"use client";
import Image from "next/image";
import { Check } from "lucide-react";
import { useRouter } from "next/navigation";

export default function CTASection() {
  const router = useRouter();
  const SIGN_UP_URL = process.env.NEXT_PUBLIC_SIGN_UP_URL ?? "/signup";
  return (
    <section className=" text-white py-14 sm:py-20 xl:py-32 px-6 overflow-hidden relative z-30">
      <div className="max-w-6xl mx-auto">
        {/* Main CTA Card */}
        <div className="relative  rounded-3xl bg-gradient-to-b from-green-600 to-green-800 p-10 py-0 flex flex-col lg:flex-row  lg:items-center justify-between gap-12">
          {/* Left Content */}
          <div className="max-w-xl my-10 lg:my-0">
            <h2 className="text-4xl md:text-[2.75rem] font-bold leading-tighter mb-6">
              Start Your EFT
              <br className="hidden lg:block" /> Challenge Today
            </h2>

            <ul className="space-y-3 mb-7">
              {[
                "As many Free Trials as you need",
                "Up to $200,000 EFT Account",
                "Performance-based rewards",
              ].map((text) => (
                <li
                  key={text}
                  className="flex items-center gap-2 text-white/90 font-semibold"
                >
                  <span className="w-4 h-4 rounded-full bg-white flex items-center justify-center">
                    <Check className="w-3 h-3 text-green-600" />
                  </span>
                  {text}
                </li>
              ))}
            </ul>

            <div className="flex gap-4 text-sm ">
              <button
                aria-label="Start EFT Challenge"
                onClick={() => router.push(`${SIGN_UP_URL}`)}
                className="px-6 py-3 rounded-lg bg-white text-black font-semibold hover:bg-gray-100 transition z-10"
              >
                EFT Challenge
              </button>
              <button
                aria-label="Start Free Trial"
                onClick={() => router.push(`${SIGN_UP_URL}`)}
                className="px-6 py-3 rounded-lg border border-white/40 hover:bg-white/10 transition z-10"
              >
                Free Trial
              </button>
            </div>
          </div>

          {/* Right Image */}
          <div className="relative w-full max-w-lg mx-auto lg:mx-0">
            <Image
              src="/homepage/images/EFT-pict.png"
              alt="EFT Dashboard"
              width={700}
              height={500}
              className="rounded-xl shadow-2xl scale-105 -translate-y-10"
              priority
            />
          </div>

          <div className="absolute bottom-0 left-0 w-full h-22 bg-gradient-to-b from-transparent via-green-800/95 to-green-800 rounded-3xl z-0 " />

          {/* Soft Glow */}
          <div className="absolute inset-0 bg-gradient-to-r from-green-400/10 to-transparent pointer-events-none rounded-3xl" />
        </div>

        {/* Trust Stats */}
        <div className="mt-16   justify-between text-center md:text-left hidden lg:flex">
          <div>
            <h3 className="text-xl font-semibold mb-2">
              Prove Your Skills with a Trusted Firm
            </h3>
            <p className="text-gray-400">
              We&apos;ve been empowering traders since 2015. Join them now!
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left pl-20 ">
            <div className="flex flex-col border-r border-gray-200/20">
              <p className="text-2xl font-bold">300K+</p>
              <p className="text-gray-400 max-w-38">Customers worldwide</p>
            </div>

            <div className="flex flex-col  border-r border-gray-200/20">
              <p className="text-2xl font-bold">$5M+</p>
              <p className="text-gray-400 max-w-38">
                Paid in rewards worldwide
              </p>
            </div>

            <div className="flex flex-col">
              <p className="text-2xl font-bold">4.8/5</p>
              <p className="text-gray-400">Trustpilot</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
