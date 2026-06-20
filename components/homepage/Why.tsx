"use client";
import React from "react";
import Image from "next/image";

const Why = () => {
  const features = [
    {
      id: "01",
      title: "No Time Limit",
      image: "/homepage/images/why/time.png",
      points: [
        "No Expiry Dates",
        "Trade When You're Ready",
        "Focus on Consistency",
      ],
    },
    {
      id: "02",
      title: "Fast Progress",
      image: "/homepage/images/why/progress.png",
      points: [
        "Quick Evaluations",
        "Instant Funding Opportunities",
        "Scale Up to 200%",
      ],
    },
    {
      id: "03",
      title: "Unique Programs",
      image: "/homepage/images/why/programs.png",
      points: [
        "Multiple Program Options",
        "Tailored to Your Style",
        "Wide Range of Benefits",
      ],
    },
    {
      id: "04",
      title: "A Modern Platform",
      image: "/homepage/images/why/platform.png",
      points: [
        "Powerful & Intuitive Platform",
        "Real-Time Data & Analytics",
        "Connected to Liquidity Providers",
      ],
    },
  ];

  return (
    <section className="relative text-white py-20 px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* 🔹 Heading */}
        <div className="text-center mb-16">
          {/* <p className="text-green-500 text-sm tracking-widest mb-3">
            BUILT FOR TRADERS
          </p> */}
          <h2 className="text-3xl md:text-5xl font-bold leading-tight">
            Why choose our <br />
            <span className="text-green-500">Prop trading</span> company?
          </h2>
          <p className="text-gray-400 mt-2 max-w-xl mx-auto text-sm">
            Empowering traders with tools, freedom, and support to succeed.
          </p>
        </div>

        {/* 🔹 Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 auto-rows-[300px] md:auto-rows-[280px]">
          <Card feature={features[0]} className="md:col-span-6" />
          <Card feature={features[1]} className="md:col-span-6" />
          <Card feature={features[2]} className="md:col-span-6" />
          <Card feature={features[3]} className="md:col-span-6" />
        </div>
      </div>
    </section>
  );
};

export default Why;

/* ----------------------- */
/* 🔹 Card Component */
/* ----------------------- */

const Card = ({ feature, className }: { feature: any; className?: string }) => {
  return (
    <div
      className={`relative rounded-2xl overflow-hidden border border-green-500/10 
      bg-gradient-to-br from-white/5 to-white/[0.02]
      backdrop-blur-xl group transition-all duration-500
      hover:border-green-500/40 hover:shadow-[0_0_40px_rgba(34,197,94,0.15)]
      ${className}`}
    >
      {/* 🔹 Image */}
      <div className="absolute inset-0">
        <Image
          src={feature.image}
          alt={feature.title}
          fill
          className="object-cover opacity-90 group-hover:scale-105 transition duration-700"
        />
      </div>

      {/* 🔹 Dark Overlay */}
      {/* <div className="absolute inset-0 bg-black/60" /> */}

      {/* 🔹 Content */}
      <div className="relative z-10 h-full flex flex-col justify-end p-6">
        {/* Number Badge */}
        <div
          className="absolute top-4 left-4 bg-green-500/10 border border-green-500/30 
                        text-green-400 text-xs px-3 py-1 rounded-md"
        >
          {feature.id}
        </div>

        <h3 className="text-lg font-semibold mb-3">{feature.title}</h3>

        <ul className="space-y-1 text-sm text-gray-300">
          {feature.points.map((point: string, i: number) => (
            <li key={i} className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-green-500 rounded-full" />
              {point}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
