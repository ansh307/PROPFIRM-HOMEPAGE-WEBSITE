"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, AlertTriangle, ShieldIcon, UserIcon } from "lucide-react";
import { GoGraph } from "react-icons/go";

const StatItem = ({
  icon,
  value,
  label,
}: {
  icon: React.ReactNode;
  value: string;
  label: string;
}) => (
  <div className="flex flex-col items-center lg:items-start">
    <div className="flex gap-2 items-center">
      <span className="rounded-full bg-gradient-to-r from-green-500/20 to-green-600/5 border p-2">
        {icon}
      </span>
      <h3 className="text-sm sm:text-lg font-semibold">{value}</h3>
    </div>
    <p className="text-xs text-gray-400 pt-1">{label}</p>
  </div>
);

const Hero = () => {
  const handleScroll = () => {
    document.querySelector("#choosechallenge")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <section className="relative min-h-screen w-full flex items-center bg-black text-white px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto w-full flex flex-col lg:flex-row items-center gap-10 z-10">
        {/* LEFT */}
        <div className="w-full lg:w-3/5 pr-0 lg:pr-12 py-10 sm:py-12 lg:py-0">
          <div className="max-w-3xl mx-auto lg:mx-0 text-center lg:text-left pt-20">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-4 py-2 mb-6 backdrop-blur-md">
              <span className="bg-green-500 text-black text-xs font-semibold px-3 py-1 rounded-full">
                NEW
              </span>
              <span className="text-sm text-gray-300 whitespace-nowrap">
                FUNDING TRADERS SINCE 2025
              </span>
            </div>

            {/* Heading */}
            <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6">
              YOUR PROP FIRM
              <br />
              TO{" "}
              <span className="text-green-500 drop-shadow-[0_0_12px_rgba(34,197,94,0.6)]">
                RISK-FREE
              </span>
              <br />
              FUNDING
            </h1>

            {/* Description */}
            <p className="text-sm sm:text-base md:text-lg text-gray-400 mb-10 max-w-xl mx-auto lg:mx-0 leading-relaxed">
              Trade our prop firm capital, keep up to 100% of the simulated
              profits, and never worry about losses.
            </p>

            {/* CTA */}
            <div className="flex flex-col sm:flex-row gap-4 mb-12 justify-center lg:justify-start">
              <Link
                aria-label="Get Funded"
                href={`${process.env.NEXT_PUBLIC_SIGN_IN_URL}`}
                onClick={handleScroll}
                className="group bg-green-500 hover:bg-green-600 text-black px-6 py-3 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all"
              >
                Get Funded
                <span className="bg-black text-white w-7 h-7 rounded-full flex items-center justify-center">
                  <ArrowRight size={16} className="text-green-500" />
                </span>
              </Link>

              <button
                aria-label="View Pricing"
                onClick={handleScroll}
                className="group border border-white/20 hover:border-green-500 px-6 py-3 rounded-xl font-medium flex items-center justify-center gap-2 text-white hover:text-green-400 transition-all"
              >
                View Pricing
                <ArrowRight size={16} className="text-green-500" />
              </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-center lg:text-left">
              <StatItem
                icon={<UserIcon size={14} className="text-green-500" />}
                value="10K+"
                label="Traders Funded"
              />
              <StatItem
                icon={<GoGraph size={14} className="text-green-500" />}
                value="$50M+"
                label="Capital Deployed"
              />
              <StatItem
                icon={<ShieldIcon size={14} className="text-green-500" />}
                value="100%"
                label="Profit Retention"
              />
              <StatItem
                icon={<AlertTriangle size={14} className="text-green-500" />}
                value="0"
                label="Personal Risk"
              />
            </div>

            {/* Trust */}
            <div className="flex flex-col sm:flex-row items-center gap-4 mt-8 justify-center lg:justify-start">
              <div className="flex -space-x-3">
                {[1, 2, 3, 4].map((i) => (
                  <Image
                    key={i}
                    src={`/homepage/images/avatars/${i}.jpg`}
                    width={32}
                    height={32}
                    alt="Trader"
                    className="rounded-full border border-black"
                    loading="lazy"
                  />
                ))}
              </div>

              <div>
                <div className="text-green-500 text-sm">★★★★★</div>
                <p className="text-xs text-gray-400">
                  Trusted by 10,000+ traders worldwide
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT (VIDEO / IMAGE) */}
        <div className="absolute inset-0 -z-10 lg:relative lg:z-0 w-full lg:w-2/5">
          <div className="w-full h-full lg:h-[625px] overflow-hidden lg:rounded-xl">
            {/* Desktop Video */}
            <video
              src="/homepage/videos/hero-1.mp4"
              autoPlay
              muted
              loop
              playsInline
              preload="none"
              poster="/homepage/images/hero-poster.png"
              className="block w-full h-full object-cover"
            />

            {/* Mobile Image */}
            {/* <Image
              src="/homepage/images/hero-poster.png"
              alt="Hero background"
              fill
              priority
              className="object-cover lg:hidden opacity-40"
            /> */}
          </div>

          {/* Mobile Overlay */}
          <div className="absolute inset-0 bg-black/60 lg:hidden"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
