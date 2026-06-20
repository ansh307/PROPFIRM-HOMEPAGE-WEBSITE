"use client";

import Image from "next/image";
import { useRef } from "react";
import gsap from "gsap";

const COMING_SOON_IMAGES = [
  "/homepage/images/partners-31.png",
  "/homepage/images/partners-2.png",
];

export const PlatformCard = ({ img }: { img: string }) => {
  const logoRef = useRef<HTMLDivElement>(null);
  const comingRef = useRef<HTMLDivElement>(null);

  const isComingSoon = COMING_SOON_IMAGES.includes(img);

  const handleEnter = () => {
    if (!isComingSoon) return;

    gsap.to(logoRef.current, {
      y: -20,
      opacity: 0,
      duration: 0.35,
      ease: "power3.out",
    });

    gsap.to(comingRef.current, {
      y: 0,
      opacity: 1,
      duration: 0.35,
      ease: "power3.out",
      delay: 0.05,
    });
  };

  const handleLeave = () => {
    if (!isComingSoon) return;

    gsap.to(logoRef.current, {
      y: 0,
      opacity: 1,
      duration: 0.35,
      ease: "power3.out",
    });

    gsap.to(comingRef.current, {
      y: 20,
      opacity: 0,
      duration: 0.3,
      ease: "power3.out",
    });
  };

  return (
    <div
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      className="relative flex items-center justify-center rounded-2xl
                 bg-black border border-gray-800 
                 sm:h-36 sm:w-44 h-28 w-24
                 shadow-[0_0_0_1px_rgba(255,255,255,0.04)]
                 hover:border-gray-700 transition overflow-hidden"
    >
      {/* Logo */}
      <div ref={logoRef} className="will-change-transform">
        <Image
          src={img}
          alt="Trading Platform"
          width={120}
          height={60}
          className="object-contain opacity-90 w-20 sm:w-full  sm:h-full"
        />
      </div>

      {/* Coming soon */}
      {isComingSoon && (
        <div
          ref={comingRef}
          className="absolute text-xs sm:text-sm text-white/80
                     opacity-0 translate-y-5 font-semibold"
        >
          Coming Soon
        </div>
      )}
    </div>
  );
};
