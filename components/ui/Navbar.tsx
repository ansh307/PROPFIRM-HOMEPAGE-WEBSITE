"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { FiMenu, FiX } from "react-icons/fi";

const FUTURES_URL = process.env.NEXT_PUBLIC_FUTURES_URL!;
const APP_URL = process.env.NEXT_PUBLIC_APP_URL!;

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // NEW STATES
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const heroHeight = window.innerHeight;

      // background effect
      setScrolled(currentScrollY > 20);

      // ALWAYS visible at top + inside hero
      if (currentScrollY < 50 || currentScrollY < heroHeight) {
        setIsVisible(true);
      } else {
        // after hero → detect direction
        if (currentScrollY > lastScrollY) {
          setIsVisible(false); // scrolling down
        } else {
          setIsVisible(true); // scrolling up
        }
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <nav
      className={`
        fixed left-0 right-0 z-40
        transition-all duration-500 ease-in-out

        ${scrolled ? " top-0" : " lg:top-[40px]"}

    ${
      mobileMenuOpen
        ? "translate-y-0 opacity-100"
        : isVisible
          ? "translate-y-0 opacity-100"
          : "-translate-y-full opacity-0"
    }

        ${scrolled || mobileMenuOpen ? "bg-black" : "bg-transparent"}

        ${mobileMenuOpen ? "z-50" : "z-30"}
      `}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-0">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link
            aria-label="Go to homepage"
            href="/"
            className="flex items-center"
          >
            <Image
              src="/logo/logo.png"
              alt="EFT logo"
              width={96}
              height={96}
              priority
              className="h-15 w-auto md:h-20 lg:h-25"
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            <Link
              aria-label="Go to Home"
              href="#"
              className="px-4 py-2 text-sm text-gray-300 hover:text-white hover:bg-white/5 rounded-lg"
            >
              Home
            </Link>

            <Link
              aria-label="Go to Terms of Use"
              href="#"
              className="px-4 py-2 text-sm text-gray-300 hover:text-white hover:bg-white/5 rounded-lg"
            >
              Terms of Use
            </Link>

            <Link
              aria-label="Go to About Us section"
              href="#what-section"
              className="px-4 py-2 text-sm text-gray-300 hover:text-white hover:bg-white/5 rounded-lg"
            >
              About us
            </Link>

            <Link
              aria-label="Go to Contact section"
              href="#footer"
              className="px-4 py-2 text-sm text-gray-300 hover:text-white hover:bg-white/5 rounded-lg"
            >
              Contact us
            </Link>

            <Link
              aria-label="Go to Affiliate Program"
              href={`${APP_URL}affiliate`}
              target="_blank"
              className="px-4 py-2 text-sm text-gray-300 hover:text-white hover:bg-white/5 rounded-lg"
            >
              Affiliate Program
            </Link>

            <Link
              aria-label="Go to FAQ"
              href="https://prop-help.vercel.app/"
              className="px-4 py-2 text-sm text-gray-300 hover:text-white hover:bg-white/5 rounded-lg"
            >
              FAQ
            </Link>
          </div>

          {/* Desktop Right */}
          <div className="hidden lg:flex items-center gap-3">
            <Link
              aria-label="Go to Log In"
              href={`${process.env.NEXT_PUBLIC_SIGN_IN_URL}`}
              className="px-4 py-2 text-sm text-gray-300 hover:text-white hover:bg-white/5 rounded-lg"
            >
              Log In
            </Link>

            <Link
              aria-label="Go to Get Funded"
              href={`${process.env.NEXT_PUBLIC_SIGN_IN_URL}`}
              className="px-5 py-2 text-sm font-medium text-black bg-white rounded-lg hover:bg-gray-200"
            >
              Get Funded
            </Link>
          </div>

          {/* Mobile Button */}
          <button
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-white hover:bg-white/5 rounded-lg"
          >
            {mobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>
      </div>

      {/* MOBILE MENU */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-black/95 backdrop-blur-lg border-t border-white/10 h-screen">
          <div className="max-w-7xl mx-auto px-4 py-4 space-y-1">
            <Link
              aria-label="Go to Home"
              href="#"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-4 py-3 text-gray-300 hover:text-white hover:bg-white/5 rounded-lg"
            >
              Home
            </Link>

            <Link
              aria-label="Go to Terms of Use"
              href="#"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-4 py-3 text-gray-300 hover:text-white hover:bg-white/5 rounded-lg"
            >
              Terms of Use
            </Link>

            <Link
              aria-label="Go to About Us section"
              href="#what-section"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-4 py-3 text-gray-300 hover:text-white hover:bg-white/5 rounded-lg"
            >
              About us
            </Link>

            <Link
              aria-label="Go to Contact section"
              href="#footer"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-4 py-3 text-gray-300 hover:text-white hover:bg-white/5 rounded-lg"
            >
              Contact us
            </Link>

            <Link
              aria-label="Go to Affiliate Program"
              href={`${APP_URL}affiliate`}
              onClick={() => setMobileMenuOpen(false)}
              className="block px-4 py-3 text-gray-300 hover:text-white hover:bg-white/5 rounded-lg"
            >
              Affiliate Program
            </Link>

            <div className="pt-4 mt-4 border-t border-white/10 space-y-2">
              <Link
                aria-label="Go to Futures"
                href={FUTURES_URL}
                className="block text-center px-4 py-3 text-gray-300 hover:text-white hover:bg-white/5 rounded-lg"
              >
                Switch to Futures
              </Link>

              <Link
                aria-label="Go to Sign Up"
                href={`${process.env.NEXT_PUBLIC_SIGN_UP_URL}`}
                onClick={() => setMobileMenuOpen(false)}
                className="block text-center px-4 py-3 text-gray-300 hover:text-white hover:bg-white/5 rounded-lg"
              >
                Sign up
              </Link>

              <Link
                aria-label="Go to Dashboard"
                href={`${process.env.NEXT_PUBLIC_SIGN_IN_URL}`}
                onClick={() => setMobileMenuOpen(false)}
                className="block text-center px-4 py-3 text-black bg-white rounded-lg hover:bg-gray-200"
              >
                Dashboard
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
