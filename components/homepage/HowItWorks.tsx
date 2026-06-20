"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import clsx from "clsx";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitText from "gsap/SplitText";

gsap.registerPlugin(ScrollTrigger, SplitText);

const STEPS = [
  {
    id: 1,
    label: "Step 1",
    title: "EFT Challenge",
    description:
      "Demonstrate your trading discipline and consistency by achieving clearly defined objectives in a simulated trading environment. This phase evaluates your risk management, strategy execution, and ability to trade under real market conditions.",
    image: "/homepage/images/howitworks-1-new.png",
  },
  {
    id: 2,
    label: "Step 2",
    title: "Training Phase",
    description:
      "Continue refining your trading approach with reduced targets while maintaining the same professional tools and rules. This stage ensures long-term consistency and confirms your readiness to manage larger capital responsibly.",
    image: "/homepage/images/howitworks-2-new.png",
  },
  {
    id: 3,
    label: "Step 3",
    title: "EFT Account",
    description:
      "Trade with a future EFT Account and earn up to 90% of the simulated profits. Gain access to higher capital allocations, performance-based scaling, and ongoing support as you progress as a professional trader.",
    image: "/homepage/images/howitworks-3-new.png",
  },
];

const STEP_DURATION = 4.5; // seconds

export default function HowItWorks() {
  const [activeStep, setActiveStep] = useState(0);
  const progressRefs = useRef<HTMLDivElement[]>([]);
  const imageRefs = useRef<HTMLDivElement[]>([]);
  const headingRef = useRef<HTMLHeadingElement>(null);

  /* ---------------- Auto Step Change ---------------- */
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % STEPS.length);
    }, STEP_DURATION * 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const bar = progressRefs.current[activeStep];
    if (!bar) return;

    // Reset before animating
    gsap.set(bar, { scaleX: 0, transformOrigin: "left center" });

    // Animate progress
    gsap.to(bar, {
      scaleX: 1,
      duration: STEP_DURATION,
      ease: "linear",
    });

    // Image animation
    imageRefs.current.forEach((img, index) => {
      if (index === activeStep && img) {
        gsap.fromTo(
          img,
          { opacity: 0, x: -100 },
          { opacity: 1, x: 0, duration: 0.8, ease: "power3.out" },
        );
      }
    });
  }, [activeStep]);

  useEffect(() => {
    if (!headingRef.current) return;

    gsap.set(headingRef.current, { opacity: 1 });

    const wordsplit = new SplitText(headingRef.current, {
      type: "words",
    });

    gsap.from(wordsplit.words, {
      y: 10,
      autoAlpha: 0,
      stagger: 0.1,
      duration: 1,
      ease: "power4.out",

      scrollTrigger: {
        trigger: headingRef.current,
        start: "top 85%",
        once: true,
      },
    });

    return () => {
      wordsplit.revert();
    };
  }, []);

  return (
    <section
      id="how-it-works"
      className="relative  text-white py-14 sm:py-20 xl:py-32 overflow-hidden z-30"
    >
      <div className="max-w-7xl mx-auto px-6 text-center relative">
        <div className="relative">
          {/* Title */}
          <h2
            ref={headingRef}
            className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6"
          >
            How does it works?
          </h2>
          <p className="text-gray-300 mb-10 sm:mb-16">
            Your pathway to professional trading
          </p>
        </div>

        {/* IMAGE / DASHBOARD */}
        <div className="relative mx-auto max-w-7xl h-[320px] md:h-[420px] mb-16">
          {STEPS.map((step, index) => (
            <div
              key={step.id}
              ref={(el) => {
                if (el) imageRefs.current[index] = el;
              }}
              className={clsx(
                "absolute inset-0 border-2 rounded-2xl overflow-hidden border-white/5 flex justify-center items-end",
                index === activeStep ? "z-10" : "opacity-0",
              )}
            >
              <Image
                src={`/homepage/images/how-bg-1.png`}
                alt={step.title}
                fill
                className="object-fill"
                priority={index === activeStep}
              />
              <div className="z-10 h-full w-1/2">
                <Image
                  src={step.image}
                  alt={step.title}
                  fill
                  className="object-contain pb-0.5"
                  priority={index === activeStep}
                />
              </div>
            </div>
          ))}
        </div>

        {/* STEP INDICATORS */}
        <div className="flex flex-col md:flex-row justify-between text-left gap-12 relative">
          {STEPS.map((step, index) => (
            <div key={step.id} className="flex-1">
              {/* Progress Bar */}
              <div className="relative h-[2px] w-full mb-4 bg-white/10 overflow-hidden">
                {index === activeStep && (
                  <div
                    ref={(el) => {
                      if (el) progressRefs.current[index] = el;
                    }}
                    className="absolute inset-0 bg-green-400/90 origin-left scale-x-0"
                  />
                )}
              </div>

              {/* Label */}
              <div
                className={clsx(
                  "text-sm tracking-wide ",
                  index === activeStep ? "text-white" : "text-gray-300",
                )}
              >
                {step.label}
              </div>

              {/* Active Content */}
              {index === activeStep && (
                <div className="mt-10">
                  <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
                  <p className="text-gray-300 text-sm leading-relaxed">
                    {step.description}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
