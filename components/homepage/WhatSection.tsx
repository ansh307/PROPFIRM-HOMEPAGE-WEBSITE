"use client";
import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitText from "gsap/SplitText";
import { BookOpen, ShieldIcon, Target, UserIcon } from "lucide-react";
import { GoGraph } from "react-icons/go";

gsap.registerPlugin(ScrollTrigger, SplitText);

const WhatSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const capitalRef = useRef<HTMLHeadingElement>(null);
  const successRef = useRef<HTMLHeadingElement>(null);
  const rightHeadingRef = useRef<HTMLHeadingElement>(null);
  const pillRef = useRef<HTMLSpanElement>(null);
  const para1Ref = useRef<HTMLParagraphElement>(null);
  const para2Ref = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const capital = capitalRef.current;
    const success = successRef.current;

    if (!section || !capital || !success) return;

    // Our Capital → right to left
    gsap.fromTo(
      capital,
      { x: 80 },
      {
        x: -70,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top bottom",
          end: "bottom center",
          scrub: 2,
        },
      },
    );

    // Your Success → left to right
    gsap.fromTo(
      success,
      { x: -80 },
      {
        x: 70,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top bottom",
          end: "bottom center",
          scrub: 2,
        },
      },
    );

    // pill
    const pill = pillRef.current;
    if (!pill) return;

    gsap.fromTo(
      pill,
      {
        scale: 0.85,
        opacity: 0,
        y: 10,
      },
      {
        scale: 1,
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "back.out(1.6)",
        scrollTrigger: {
          trigger: pill,
          start: "top 80%",
          once: true,
        },
      },
    );

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  // right Heading animation
  useEffect(() => {
    if (!rightHeadingRef.current || !para1Ref.current || !para2Ref.current)
      return;

    gsap.set(rightHeadingRef.current, { opacity: 1 });

    const wordsplit = new SplitText(rightHeadingRef.current, {
      type: "words",
    });

    gsap.from(wordsplit.words, {
      y: 10,
      autoAlpha: 0,
      stagger: 0.1,
      duration: 1,
      ease: "power4.out",

      scrollTrigger: {
        trigger: rightHeadingRef.current,
        start: "top 85%",
        once: true,
      },
    });

    gsap.set(para1Ref.current, { opacity: 1 });

    const linesplit1 = new SplitText(para1Ref.current, {
      type: "lines",
      linesClass: "overflow-hidden", // 🔑 hides the movement
    });

    gsap.from(linesplit1.lines, {
      y: 24,
      autoAlpha: 0,
      duration: 0.9,
      ease: "power3.out",
      stagger: 0.15,
      scrollTrigger: {
        trigger: para1Ref.current,
        start: "top 85%",
        once: true,
      },
    });

    gsap.set(para2Ref.current, { opacity: 1 });

    const linesplit2 = new SplitText(para2Ref.current, {
      type: "lines",
      linesClass: "overflow-hidden", // 🔑 hides the movement
    });

    gsap.from(linesplit2.lines, {
      y: 24,
      autoAlpha: 0,
      duration: 0.9,
      delay: 0.75,
      ease: "power3.out",
      stagger: 0.15,
      scrollTrigger: {
        trigger: para2Ref.current,
        start: "top 85%",
        once: true,
      },
    });

    return () => {
      wordsplit.revert();
      linesplit1.revert();
      linesplit2.revert();
    };
  }, []);

  return (
    <section
      id="what-section"
      ref={sectionRef}
      className="relative bg-black text-white py-14 sm:py-20 xl:pt-32 px-6 overflow-hidden z-30"
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
        {/* LEFT — Title */}
        <div className="relative h-60 sm:h-72 md:h-96 lg:h-full w-full flex items-center justify-center">
          {/* Background video */}
          <video
            src="/homepage/videos/what.mp4"
            autoPlay
            muted
            loop
            playsInline
            className="absolute inset-0  h-60 sm:h-72 md:h-96 lg:h-full w-60 sm:w-72 md:w-96 mx-auto lg:w-full  object-cover z-0 pointer-events-none mt-10 scale-90"
          />

          {/* Optional dark overlay for readability */}
          <div className="absolute inset-0 bg-black/60 z-1" />

          {/* Text content */}
          <div className="relative z-10">
            <h1
              ref={capitalRef}
              className="text-4xl sm:text-5xl md:text-6xl leading-tight will-change-transform"
            >
              Our Capital
            </h1>

            <h1
              ref={successRef}
              className="text-4xl sm:text-5xl md:text-6xl leading-tight will-change-transform"
            >
              Your Success
            </h1>
          </div>
        </div>

        {/* RIGHT — Content */}
        <div className="relative w-full lg:max-w-xl flex flex-col">
          {/* Pill */}
          <span
            ref={pillRef}
            className="inline-flex items-center gap-2 mb-6 px-4 py-1.5 rounded-full
    bg-gray-700/10 border border-green-500/20 text-white text-xs sm:text-sm
    backdrop-blur-md w-fit"
          >
            <BookOpen size={16} className="text-green-400" />
            What is EFT?
          </span>

          {/* Heading */}
          <h2
            ref={rightHeadingRef}
            className="text-3xl sm:text-4xl md:text-4xl font-semibold leading-tight mb-6"
          >
            <span className="text-white">About Epic Future Traders</span>
            <br />
            <span className="text-green-500">
              a structured path to funded trading
            </span>
          </h2>

          {/* Paragraph 1 */}
          <p
            ref={para1Ref}
            className="text-sm  text-gray-400 leading-relaxed mb-6 max-w-xl"
          >
            Epic Future Traders is a proprietary trading firm focused on
            identifying, developing, and rewarding skilled traders through
            structured evaluation programs. Our mission is to provide traders
            with access to large simulated capital without requiring them to
            risk their own funds.
          </p>

          {/* Paragraph 2 */}
          <p
            ref={para2Ref}
            className="text-sm  text-gray-400 leading-relaxed mb-10 max-w-xl"
          >
            We create a professional trading environment where discipline, risk
            management, and consistency are rewarded. Through our evaluation
            models, traders can demonstrate their skills by following defined
            trading rules and risk parameters. Successful traders become
            eligible for funded accounts and can earn performance-based payouts.
          </p>

          {/* Feature Cards */}
          {/* <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 sm:p-6 rounded-2xl border border-green-500/20 bg-gradient-to-br from-green-500/5 to-transparent backdrop-blur-md">
            <div className="flex flex-col items-start  ">
              <div className="bg-green-500/10 p-2 rounded-lg mb-2">
                <ShieldIcon className="text-green-400" size={18} />
              </div>
              <p className="text-xs font-medium">No Personal Risk</p>
              <span className="text-xs text-gray-400">
                Trade simulated capital
              </span>
            </div>

            <div className="flex flex-col items-start">
              <div className="bg-green-500/10 p-2 rounded-lg mb-2">
                <GoGraph className="text-green-400" size={18} />
              </div>
              <p className="text-xs font-medium">Performance Based</p>
              <span className="text-xs text-gray-400">
                Earn up to 100% of profits
              </span>
            </div>

            <div className="flex flex-col items-start">
              <div className="bg-green-500/10 p-2 rounded-lg mb-2">
                <Target className="text-green-400" size={18} />
              </div>
              <p className="text-xs font-medium">Structured Path</p>
              <span className="text-xs text-gray-400">
                Clear rules, clear goals
              </span>
            </div>

            <div className="flex flex-col items-start">
              <div className="bg-green-500/10 p-2 rounded-lg mb-2">
                <UserIcon className="text-green-400" size={18} />
              </div>
              <p className="text-xs font-medium">Trader Focused</p>
              <span className="text-xs text-gray-400">
                Built for long-term success
              </span>
            </div>
          </div> */}
        </div>
      </div>
    </section>
  );
};

export default WhatSection;
