"use client";
import React, { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { end: 400, prefix: "$", suffix: "K", label: "Paid to Traders" },
  { end: 15, suffix: "K", label: "Active Traders" },
  { end: 150, suffix: "+", label: "Countries" },
  { end: 12, suffix: "h", label: "Avg Payout Time" },
];

export default function GlobalTradersStats() {
  return (
    <section className="relative  text-white  py-14 sm:py-20 xl:py-32 px-6 z-30">
      {/* Subtle top gradient line */}
      <div className="absolute top-10 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div className="max-w-5xl mx-auto">
        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4">
          {stats.map((stat, index) => (
            <Stat
              key={index}
              end={stat.end}
              prefix={stat.prefix}
              suffix={stat.suffix}
              label={stat.label}
            />
          ))}
        </div>
      </div>

      {/* Subtle bottom gradient line */}
      <div className="absolute bottom-10 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
    </section>
  );
}

function Stat({
  end,
  label,
  prefix = "",
  suffix = "",
}: {
  end: number;
  label: string;
  prefix?: string;
  suffix?: string;
}) {
  const numberRef = useRef<HTMLSpanElement>(null);

  useLayoutEffect(() => {
    if (!numberRef.current) return;

    const ctx = gsap.context(() => {
      const obj = { value: 0 };

      gsap.fromTo(
        obj,
        { value: 0 },
        {
          value: end,
          duration: 2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: numberRef.current,
            start: "top 90%",
            once: true,
          },
          onUpdate: () => {
            numberRef.current!.textContent = Math.round(
              obj.value,
            ).toLocaleString();
          },
        },
      );
    }, numberRef);

    return () => ctx.revert();
  }, [end]);

  return (
    <div className="text-center group">
      <p className="text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight">
        {prefix}
        <span ref={numberRef}>0</span>
        <span className="text-green-400">{suffix}</span>
      </p>
      <p className="text-gray-400 text-sm mt-2 group-hover:text-gray-300 transition-colors">
        {label}
      </p>
    </div>
  );
}
