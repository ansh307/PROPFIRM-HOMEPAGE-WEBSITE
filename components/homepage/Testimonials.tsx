"use client";

import { Play } from "lucide-react";
import { useState } from "react";

const testimonials = [
  {
    name: "Choon Chiat",
    country: "Malaysia",
    flag: "🇲🇾",
    youtubeViews: "193K",
    rewardsEarned: "$30,182",
    tradingStyle: "Scalper",
    thumbnail: "/homepage/images/testimonial-placeholder.jpg",
  },
  {
    name: "Ugnius",
    country: "Lithuania",
    flag: "🇱🇹",
    youtubeViews: "37K",
    rewardsEarned: "$99,706",
    tradingStyle: "Day trader",
    thumbnail: "/homepage/images/testimonial-placeholder.jpg",
  },
  {
    name: "Richard",
    country: "Canada",
    flag: "🇨🇦",
    youtubeViews: "119K",
    rewardsEarned: "$32,500",
    tradingStyle: "Swing trader",
    thumbnail: "/homepage/images/testimonial-placeholder.jpg",
  },
  {
    name: "Paul",
    country: "USA",
    flag: "🇺🇸",
    youtubeViews: "350K",
    rewardsEarned: "$500,180",
    tradingStyle: "Scalper",
    thumbnail: "/homepage/images/testimonial-placeholder.jpg",
  },
  {
    name: "Choon Chiat",
    country: "Malaysia",
    flag: "🇲🇾",
    youtubeViews: "193K",
    rewardsEarned: "$30,182",
    tradingStyle: "Scalper",
    thumbnail: "/homepage/images/testimonial-placeholder.jpg",
  },
  {
    name: "Ugnius",
    country: "Lithuania",
    flag: "🇱🇹",
    youtubeViews: "37K",
    rewardsEarned: "$99,706",
    tradingStyle: "Day trader",
    thumbnail: "/homepage/images/testimonial-placeholder.jpg",
  },
];

const Testimonials = () => {
  return (
    <section
      id="testimonials"
      className=" text-white py-12 sm:py-16 md:py-20 overflow-hidden z-30 relative"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 mb-12 sm:mb-16">
        {/* Header */}
        <div className="text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-8 sm:mb-10">
            Trusted by Millions of Traders
          </h2>
          <div className="flex flex-wrap justify-center items-center gap-6 sm:gap-8 md:gap-20">
            <div className="flex flex-col items-center">
              <p className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-1 sm:mb-2">
                300K+
              </p>
              <p className="text-gray-400 text-xs sm:text-sm">
                Customers worldwide
              </p>
            </div>
            <div className="flex flex-col items-center">
              <p className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-1 sm:mb-2">
                $5M+
              </p>
              <p className="text-gray-400 text-xs sm:text-sm">
                Paid in rewards worldwide
              </p>
            </div>
            <div className="flex flex-col items-center">
              <p className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-1 sm:mb-2">
                126+
              </p>
              <p className="text-gray-400 text-xs sm:text-sm">
                Countries served
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Scrolling Cards Container */}
      <div className="relative">
        <div className="flex gap-4 sm:gap-6 animate-scroll-left hover:[animation-play-state:paused]">
          {/* Duplicate the testimonials array for seamless loop */}
          {[...testimonials, ...testimonials].map((testimonial, index) => (
            <TestimonialCard key={index} testimonial={testimonial} />
          ))}
        </div>

        {/* Gradient Overlays */}
        <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-24 md:w-32 bg-gradient-to-r from-black to-transparent pointer-events-none z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-24 md:w-32 bg-gradient-to-l from-black to-transparent pointer-events-none z-10" />
      </div>

      <style jsx>{`
        @keyframes scroll-left {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        .animate-scroll-left {
          animation: scroll-left 25s linear infinite;
        }

        .animate-scroll-left:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
};

function TestimonialCard({
  testimonial,
}: {
  testimonial: (typeof testimonials)[0];
}) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="flex-shrink-0 w-[280px] sm:w-[320px] md:w-[360px] bg-black rounded-xl overflow-hidden border border-gray-800 hover:border-gray-700 transition-all duration-300 z-30 relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Video Thumbnail */}
      <div className="relative aspect-video bg-white/10 group cursor-pointer">
        {/* <img
          src={testimonial.thumbnail}
          alt={testimonial.name}
          className="w-full h-full object-cover"
        /> */}
        {/* YouTube Badge */}
        {/* <div className="absolute top-3 left-3 bg-green-600 px-3 py-1 rounded-full flex items-center gap-2 text-xs font-semibold">
          <span className="w-4 h-4 flex items-center justify-center">▶</span>
          <span>YouTube • {testimonial.youtubeViews} Views</span>
        </div> */}
        {/* Play Button Overlay */}
        <div className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/50 transition-colors">
          <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center group-hover:scale-110 transition-transform">
            <Play className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-white fill-white" />
          </div>
        </div>
      </div>

      {/* Card Content */}
      <div className="p-4 sm:p-5">
        {/* Name and Country */}
        <div className="flex items-center gap-2 mb-3 sm:mb-4">
          <span className="text-xl sm:text-2xl">{testimonial.flag}</span>
          <div>
            <h3 className="font-bold text-base sm:text-lg">
              {testimonial.name}
            </h3>
            <p className="text-gray-400 text-xs sm:text-sm">
              {testimonial.country}
            </p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-3 sm:gap-4">
          <div>
            <p className="text-[10px] sm:text-xs text-gray-500 uppercase tracking-wide mb-1">
              Rewards Earned
            </p>
            <p className="font-bold text-base sm:text-lg">
              {testimonial.rewardsEarned}
            </p>
          </div>
          <div>
            <p className="text-[10px] sm:text-xs text-gray-500 uppercase tracking-wide mb-1">
              Trading Style
            </p>
            <p className="font-bold text-base sm:text-lg">
              {testimonial.tradingStyle}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Testimonials;
