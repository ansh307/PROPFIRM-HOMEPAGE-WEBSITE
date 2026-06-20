"use client";
import Image from "next/image";
import { PlatformCard } from "../ui/PlatformCard";

export default function PlatformsPartners() {
  return (
    <section className=" text-white py-14 sm:py-20 xl:py-32 px-6 overflow-hidden relative z-30">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        {/* LEFT CONTENT */}
        <div className="max-w-xl">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight mb-6">
            We Support Major
            <br />
            Platforms
          </h2>

          <p className="text-gray-400 mb-8 leading-relaxed max-w-lg text-sm md:text-base ">
            At Epic Future Traders, we want to give you options. That’s why we
            offer the flexibility to tailor your experience and choose between
            MT4, MT5, DXtrade and cTrader. Pick the professional trading
            platform that suits you best.
          </p>

          <button
            aria-label="Explore supported platforms"
            className="px-6 py-3 rounded-lg bg-white text-black font-semibold hover:bg-gray-100 transition text-sm md:text-base "
          >
            Show more
          </button>
        </div>

        {/* RIGHT GRID */}
        <div className="relative">
          {/* Grid container */}
          <div className="relative grid grid-cols-3 gap-6 sm:pl-2">
            {/*(Left Top) */}
            <div className="col-start-1 row-start-1 ">
              <div
                className="flex items-center justify-center rounded-b-2xl
                border-b border-x border-t-0 border-gray-800 
                sm:h-36 sm:w-44 h-28 w-24
               transition bg-gradient-to-t from-black to-transparent"
              />
            </div>
            {/* TraderLocker */}
            <div className="col-start-2 row-start-1 translate-y-17 sm:translate-y-20">
              <PlatformCard img="/homepage/images/partners-11.png" />
            </div>

            {/* Empty Card (Top Right) */}
            <div className="col-start-3 row-start-1 ">
              <div
                className="flex items-center justify-center rounded-b-2xl
                border-b border-x border-t-0 border-gray-800
               sm:h-36 sm:w-44 h-28 w-24
              
               transition  bg-gradient-to-t from-black to-transparent"
              />
            </div>

            {/* CTrader */}
            <div className="col-start-1 row-start-2">
              <PlatformCard img="/homepage/images/partners-2.png" />
            </div>

            {/* Empty Card (Center Middle) */}
            {/* <div className="col-start-2 row-start-2 ">
              <div
                className="flex items-center justify-center rounded-2xl
                border border-white/10
               h-36 w-44
              
               transition"
              />
            </div> */}

            {/* MatchTrader */}
            <div className="col-start-3 row-start-2">
              <PlatformCard img="/homepage/images/partners-31.png" />
            </div>

            {/* Empty Card (Left Bottom) */}
            <div className="col-start-1 row-start-3 ">
              <div
                className="flex items-center justify-center rounded-t-2xl
                border-t border-x border-b-0 border-gray-800
              sm:h-36 sm:w-44 h-28 w-24 transition bg-gradient-to-b from-black to-transparent "
              />
            </div>

            {/* MT5 */}
            <div className="col-start-2 row-start-3 -translate-y-17 sm:-translate-y-20">
              <PlatformCard img="/homepage/images/partners-4.png" />
            </div>
            {/* Empty Card (Left Bottom) */}
            <div className="col-start-3 row-start-3 ">
              <div
                className="flex items-center justify-center rounded-t-2xl
                border-t border-x border-b-0 border-gray-800
                sm:h-36 sm:w-44 h-28 w-24 transition bg-gradient-to-b from-black to-transparent"
              />
            </div>
          </div>

          {/* Subtle background glow */}
          <div className="absolute inset-0 -z-10 bg-gradient-to-tr from-white/5 via-transparent to-transparent blur-3xl" />
        </div>
      </div>
    </section>
  );
}
