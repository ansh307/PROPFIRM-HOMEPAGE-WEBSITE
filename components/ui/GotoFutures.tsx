"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import gsap from "gsap";

const FUTURES_URL = process.env.NEXT_PUBLIC_FUTURES_URL!;

const GotoFutures = () => {
  const textRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!textRef.current) return;

    // Initial hidden state
    gsap.set(textRef.current, {
      autoAlpha: 0,
      width: 0,
      x: -10,
    });

    // First-time reveal
    const tl = gsap.timeline({ delay: 0.6 });

    tl.to(textRef.current, {
      autoAlpha: 1,
      width: "auto",
      x: 0,
      duration: 0.4,
      ease: "power2.out",
    }).to(textRef.current, {
      autoAlpha: 0,
      width: 0,
      x: -10,
      duration: 0.3,
      ease: "power2.in",
      delay: 1.2,
    });
  }, []);

  const showText = () => {
    if (!textRef.current) return;

    gsap.to(textRef.current, {
      autoAlpha: 1,
      width: "auto",
      x: 0,
      duration: 0.3,
      ease: "power2.out",
    });
  };

  const hideText = () => {
    if (!textRef.current) return;

    gsap.to(textRef.current, {
      autoAlpha: 0,
      width: 0,
      x: -10,
      duration: 0.25,
      ease: "power2.in",
    });
  };

  if (!FUTURES_URL) return null;

  return (
    <Link
      href={FUTURES_URL}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 sm:bottom-10 sm:right-10 z-40"
      onMouseEnter={showText}
      onMouseLeave={hideText}
    >
      <div className="flex justify-start items-center gap-2 px-3 py-3 sm:px-3 sm:pr-4 sm:py-3 rounded-full bg-black text-white shadow-lg border border-white/10 hover:bg-neutral-900 transition-colors">
        {/* Animated text */}
        <span
          ref={textRef}
          className="text-sm font-medium overflow-hidden whitespace-nowrap hidden sm:inline-block"
        >
          Futures
        </span>

        <ArrowUpRight className="w-4 h-4" />
      </div>
    </Link>
  );
};

export default GotoFutures;
