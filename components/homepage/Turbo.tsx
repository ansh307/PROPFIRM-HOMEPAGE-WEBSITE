"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { DollarSign, Target, TrendingUp } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const Turbo = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const stepsRef = useRef<HTMLDivElement[]>([]);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 75%",
          once: true,
        },
      });

      // Title animation
      tl.from(titleRef.current, {
        opacity: 0,
        y: 40,
        duration: 0.8,
        ease: "power3.out",
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const steps = [
    {
      title: "Start for Just $8.88",
      desc: "Get RapidX access to your evaluation for only $8.88. No need to pay the full fee until you pass.",
      icon: DollarSign,
    },
    {
      title: "Pass First, Pay Later",
      desc: "Demonstrate your skills and pass. You only pay after successfully passing.",
      icon: Target,
    },
    {
      title: "Get Funded up to $150K",
      desc: "Keep 80% profits and get paid fast via Visa, Mastercard, Revolut & Crypto.",
      icon: TrendingUp,
    },
  ];

  return (
    <section
      ref={containerRef}
      className="w-full bg-black text-white py-16 sm:py-24 lg:py-32 px-6 relative overflow-hidden z-30"
    >
      <div className="max-w-7xl mx-auto">
        <div className="relative p-6 sm:p-10 lg:p-14 overflow-hidden">
          {/* HEADER */}
          <div className="text-center mb-12">
            <h1
              ref={titleRef}
              className="text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-green-600"
            >
              RapidX <span className="text-white">Funding</span>
            </h1>

            <p className="text-gray-400 mt-4 text-lg">
              Start now for just{" "}
              <span className="text-green-400 font-semibold">$8.88</span> pay
              the rest after you pass
            </p>
          </div>

          {/* GRID */}
          <div className="grid lg:grid-cols-5 gap-10 items-start">
            {/* LEFT */}
            <div className="lg:col-span-3">
              <h2 className="text-2xl font-semibold mb-6">How it works</h2>

              <div className="space-y-5">
                {steps.map((item, i) => {
                  const Icon = item.icon;
                  return (
                    <div
                      key={i}
                      ref={(el) => {
                        if (el) stepsRef.current[i] = el;
                      }}
                      className="flex items-start gap-4 p-5 rounded-2xl border border-l-6 border-l-green-600 border-green-500/10 bg-gradient-to-r from-green-500/5 to-transparent backdrop-blur-md transition"
                    >
                      <div className="w-12 h-12 flex items-center justify-center rounded-full border border-green-500/30 bg-green-500/10">
                        <Icon className="w-5 h-5 text-green-400" />
                      </div>

                      <div>
                        <h3 className="text-green-400 font-semibold text-lg">
                          {i + 1}. {item.title}
                        </h3>
                        <p className="text-sm text-gray-400 mt-1">
                          {item.desc}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Desktop PAYMENTS */}
              <div className="hidden lg:flex justify-center items-center gap-8 mt-10 opacity-70">
                {["Visa", "Mastercard", "revolut", "Bitcoin"].map((name) => (
                  <img
                    key={name}
                    src={`/homepage/svgs/${name}.svg`}
                    alt={name}
                    className="h-5 sm:h-12 opacity-40"
                    loading="lazy"
                  />
                ))}
              </div>
            </div>

            {/* RIGHT */}
            <div ref={cardRef} className="relative mt-4 lg:mt-0 lg:col-span-2">
              <div className="rounded-3xl border border-green-400/20 bg-gradient-to-br from-[#0b0f0c] to-black p-8 text-center shadow-[0_0_60px_rgba(10,181,0,0.15)]">
                <div className="text-yellow-300 text-3xl mb-3">⚡</div>

                <h3 className="text-2xl font-semibold mb-2">Instant Access</h3>

                <p className="text-gray-400 text-sm mb-6">
                  Get started in less than 60 seconds.
                </p>

                <Link
                  href="/turbo"
                  className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-green-400 to-green-500 text-black px-6 py-3 rounded-full font-semibold shadow-[0_0_20px_rgba(10,181,0,0.6)] hover:scale-105 transition"
                >
                  Get RapidX →
                </Link>

                <div className="mt-8 space-y-3 text-left text-sm text-gray-300 mx-auto w-max">
                  <p>✔ No hidden fees</p>
                  <p>✔ Pay only after you pass</p>
                  <p>✔ Secure & encrypted payments</p>
                  <p>✔ Fast & simple onboarding</p>
                </div>

                <div className="border-t border-green-400/5 my-6" />

                <div className="mt-6 text-green-400 text-lg">★★★★★</div>
                <p className="text-xs text-gray-400 mt-1">
                  Rated on Trustpilot
                </p>
              </div>
            </div>

            {/* Mobile PAYMENTS */}
            <div className="lg:hidden flex justify-center items-center gap-8 mt-10 opacity-70">
              {["Visa", "Mastercard", "revolut", "Bitcoin"].map((name) => (
                <img
                  key={name}
                  src={`/homepage/svgs/${name}.svg`}
                  alt={name}
                  className="h-8 sm:h-12 opacity-40"
                  loading="lazy"
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Turbo;
