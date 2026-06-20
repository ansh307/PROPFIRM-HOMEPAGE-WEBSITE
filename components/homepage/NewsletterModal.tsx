"use client";

import React, { useState, useEffect } from "react";

const NewsletterModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    // Check if user has already seen/closed the modal
    const hasSeenModal = localStorage.getItem("hasSeenNewsletterModal");

    if (!hasSeenModal) {
      // Show modal after user scrolls down 50% of the page
      const handleScroll = () => {
        const scrollPosition = window.scrollY;
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight;

        // Calculate scroll percentage
        const scrollPercentage =
          (scrollPosition / (documentHeight - windowHeight)) * 100;

        // Show modal when user scrolls past 50%
        if (scrollPercentage > 50) {
          setIsOpen(true);
          window.removeEventListener("scroll", handleScroll);
        }
      };

      window.addEventListener("scroll", handleScroll);

      return () => {
        window.removeEventListener("scroll", handleScroll);
      };
    }
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    localStorage.setItem("hasSeenNewsletterModal", "true");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Add your newsletter signup logic here
    console.log("Newsletter signup:", { firstName, email });

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    setIsSubmitting(false);
    handleClose();

    // Show success message
    alert("Thank you for signing up!");
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#0b0b0b] backdrop-blur-sm">
      <div className="relative w-full max-w-2xl mx-4 bg-zinc-900 rounded-xl shadow-2xl overflow-hidden flex border border-zinc-800">
        {/* Left side - will add image later */}
        <div className="hidden md:block w-1/2 bg-black relative overflow-hidden">
          {/* Green gradient overlays matching Hero section */}
          <div className="absolute inset-0">
            {/* Top diagonal gradient */}
            <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-br from-green-500/40 via-green-500/20 via-30% to-transparent to-60%"></div>

            {/* Bottom diagonal gradient */}
            <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-tr from-green-500/40 via-green-500/20 via-30% to-transparent to-60%"></div>
          </div>

          <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-8 z-10">
            <h2 className="text-4xl font-bold mb-4">Built By Traders</h2>
            <h2 className="text-4xl font-bold">For Traders</h2>
            <p className="mt-8 text-sm text-gray-400">epicfuturetraders.com</p>
          </div>
        </div>

        {/* Right side - Form */}
        <div className="w-full md:w-1/2 p-8 relative bg-[#0b0b0b]">
          {/* Close button */}
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-200 transition-colors"
            aria-label="Close modal"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>

          {/* Logo placeholder */}
          <div className="mb-6">
            <div className="flex items-center gap-2 text-white">
              <div className="w-8 h-8 bg-green-600 rounded"></div>
              <span className="font-bold text-lg">Epic Future Traders</span>
            </div>
          </div>

          <h3 className="text-2xl font-bold text-white mb-2">
            You haven&apos;t joined the EFT Community yet?
          </h3>

          <p className="text-sm text-gray-400 mb-6">
            Sign up now and unlock all the newest promotions, newsletter and
            updates
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <input
                type="text"
                placeholder="First Name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
                className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-white placeholder:text-gray-500"
              />
            </div>

            <div>
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-white placeholder:text-gray-500"
              />
            </div>

            <button
              aria-label="Submit newsletter signup form"
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Signing up..." : "Sign Me Up!"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default NewsletterModal;
