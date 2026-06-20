import { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  FaDiscord,
  FaYoutube,
  FaInstagram,
  FaFacebook,
  FaTwitter,
  FaLinkedin,
} from "react-icons/fa";
import { BiMessageDetail } from "react-icons/bi";
import { HiOutlineMail, HiOutlinePhone } from "react-icons/hi";
import { RiExternalLinkLine } from "react-icons/ri";

const APP_URL = process.env.NEXT_PUBLIC_APP_URL!;

type FooterLink = {
  name: string;
  href: string;
  icon: ReactNode | null;
  external?: boolean;
};

type FooterSection = {
  title: string;
  links: FooterLink[];
};

const Footer = () => {
  const footerSections: FooterSection[] = [
    {
      title: "Support",
      links: [
        {
          name: "Chat with us",
          icon: <BiMessageDetail className="w-4 h-4" />,
          href: "mailto:support@epicfuturetrader.com",
        },
        {
          name: "Start the chat",
          icon: null,
          href: "mailto:support@epicfuturetrader.com?subject=Support%20Chat",
        },
        {
          name: "support@epicfuturetrader.com",
          icon: <HiOutlineMail className="w-4 h-4" />,
          href: "mailto:support@epicfuturetrader.com",
        },
        {
          name: "+420 910 920 310",
          icon: <HiOutlinePhone className="w-4 h-4" />,
          href: "tel:+420910920310",
        },
      ],
    },
    // {
    //   title: "Top Searches",
    //   links: [
    //     { name: "FAQ", icon: <RiExternalLinkLine className="w-4 h-4" /> },
    //     { name: "Support", icon: <RiExternalLinkLine className="w-4 h-4" /> },
    //     {
    //       name: "How It Works",
    //       icon: <RiExternalLinkLine className="w-4 h-4" />,
    //     },
    //     {
    //       name: "Affiliate Programme",
    //       icon: <RiExternalLinkLine className="w-4 h-4" />,
    //     },
    //     { name: "Press Kit", icon: <RiExternalLinkLine className="w-4 h-4" /> },
    //     {
    //       name: "Epic Future Traders Merchandise",
    //       icon: <RiExternalLinkLine className="w-4 h-4" />,
    //     },
    //   ],
    // },
    {
      title: "Epic Future Traders Challenge",
      links: [
        { name: "How It Works", icon: null, href: "#how-it-works" },
        { name: "Pricing", icon: null, href: "#choosechallenge" },
        { name: "Scaling Plan", icon: null, href: "#choosechallenge" },
      ],
    },
    // {
    //   title: "Trading",
    //   links: [
    //     { name: "Forbidden Trading Practices", icon: null },
    //     { name: "Tools Overview", icon: null },
    //     { name: "Performance Coaches", icon: null },
    //     { name: "Leaderboard", icon: null },
    //     { name: "Economic Calendar", icon: null },
    //     { name: "Tradable Symbols", icon: null },
    //     { name: "Trading Updates", icon: null },
    //     { name: "Trading Platforms", icon: null },
    //     { name: "Epic Future Traders Academy", icon: null },
    //     { name: "Blog", icon: null },
    //   ],
    // },
    {
      title: "About",
      links: [
        { name: "About Us", icon: null, href: "#what-section" },
        { name: "Contact Us", icon: null, href: "#footer" },
        {
          name: "Affiliate Programme",
          icon: <RiExternalLinkLine className="w-4 h-4" />,
          href: `${APP_URL}affiliate`,
          external: true,
        },
        { name: "Testimonials", icon: null, href: "#testimonials" },
        { name: "FAQ", icon: null, href: "https://prop-help.vercel.app/" },
      ],
    },
  ];

  const socialIcons = [
    { icon: <FaDiscord className="w-5 h-5" />, label: "Discord", href: "#" },
    { icon: <FaYoutube className="w-5 h-5" />, label: "Youtube", href: "#" },
    {
      icon: <FaInstagram className="w-5 h-5" />,
      label: "Instagram",
      href: "https://www.instagram.com/eft.propfirm",
    },
    {
      icon: <FaFacebook className="w-5 h-5" />,
      label: "Facebook",
      href: "https://www.facebook.com/eft.propfirm",
    },
    { icon: <FaTwitter className="w-5 h-5" />, label: "Twitter", href: "#" },
    { icon: <FaLinkedin className="w-5 h-5" />, label: "Linkedin", href: "#" },
  ];

  return (
    <footer
      id="footer"
      className="bg-black text-white border-t border-gray-800 overflow-hidden relative z-30"
    >
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Top Section - Logo and Social Icons */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 pb-8 border-b border-gray-800">
          {/* Logo */}
          <div className="mb-6 md:mb-0">
            <Link
              href="/"
              aria-label="Epic Future Traders home"
              className="inline-block"
            >
              <Image
                src="/logo/logo.png"
                alt="Epic Future Traders"
                width={160}
                height={160}
                className="h-15 w-auto md:h-20 lg:h-25"
                priority
              />
            </Link>
          </div>

          {/* Social Icons */}
          <div className="flex gap-4">
            {socialIcons.map((social, index) => (
              <a
                key={index}
                href={social.href}
                target={social.href.startsWith("http") ? "_blank" : undefined}
                rel={
                  social.href.startsWith("http")
                    ? "noopener noreferrer"
                    : undefined
                }
                className="text-gray-400 hover:text-white transition-colors"
                aria-label={social.label}
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>

        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {footerSections.map((section, index) => (
            <div key={index}>
              <h3 className="font-semibold text-white mb-4 flex items-center gap-2">
                {section.title}
                {section.title === "Support" && (
                  <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                )}
              </h3>
              <ul className="space-y-3">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <a
                      href={link.href}
                      target={link.external ? "_blank" : undefined}
                      rel={link.external ? "noopener noreferrer" : undefined}
                      className="text-gray-400 hover:text-white transition-colors text-sm flex items-center gap-2"
                    >
                      {link.icon}
                      <span>{link.name}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Address Section */}
        {/* <div className="text-gray-400 text-sm mb-12">
          <p className="font-semibold text-white mb-2">Address</p>
          <p>Epic Future Traders</p>
          <p>Jumeirah Business Center 5</p>
          <p>Cluster W, Jumeirah Lake Towers</p>
          <p>Dubai, United Arab Emirates</p>
          <p>PO Box 123456</p>
        </div> */}

        {/* Newsletter Section */}
        <div className="border-t border-gray-800 pt-12 mb-12">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8">
            {/* Left side - Newsletter info */}
            <div className="lg:max-w-xl">
              <h3 className="text-2xl font-bold mb-4">
                Get Exclusive Epic Future Traders Insights
              </h3>
              <div className="flex flex-wrap gap-4 text-sm text-gray-400">
                <div className="flex items-center gap-2">
                  <svg
                    className="w-4 h-4"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span>Expert Trading Insights</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg
                    className="w-4 h-4"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span>Latest Updates</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg
                    className="w-4 h-4"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span>Special Offers</span>
                </div>
              </div>
            </div>

            {/* Right side - Email form */}
            <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
              <input
                type="email"
                placeholder="Email"
                className="
      w-full sm:flex-1
      px-4 py-3
      bg-zinc-800 text-white
      rounded-md
      border border-gray-700
      focus:outline-none focus:border-gray-600
    "
              />

              <button
                aria-label="Subscribe to Epic Future Traders newsletter"
                className="
      w-full sm:w-auto
      px-6 py-3
      bg-white text-black
      rounded-md font-medium
      hover:bg-gray-200
      transition-colors
      whitespace-nowrap
    "
              >
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Disclaimer Text */}
        <div className=" pt-8 mb-8">
          <p className="text-gray-500 text-xs leading-relaxed">
            All information provided on this site is intended solely for
            educational purposes related to trading on financial markets and
            does not serve in any way as a specific investment recommendation,
            business recommendation, investment opportunity analysis or similar
            general recommendation regarding the trading of investment
            instruments. Epic Future Traders only provides services of simulated
            trading and educational tools for traders. The information on this
            site is not directed at residents in any country or jurisdiction
            where such distribution or use would be contrary to local laws or
            regulations. Epic Future Traders companies do not act as a broker
            and do not accept any deposits. The offered technical solution for
            the Epic Future Traders platforms and data feed is powered by
            liquidity providers.
          </p>
        </div>

        {/* Bottom Footer Links */}
        <div className="border-t border-gray-800 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-500">
            <div className="flex flex-wrap items-center gap-4">
              <span>2026 © Copyright</span>

              <a
                href="/legal/terms-and-conditions"
                className="hover:text-white transition-colors"
              >
                Terms & Conditions
              </a>
              <a
                href="/legal/privacy-policy"
                className="hover:text-white transition-colors"
              >
                Privacy Policy
              </a>
            </div>

            {/* <div className="flex items-center gap-4">
              <span>
                Made with <span className="text-red-500">❤</span> for trading
              </span>
              <div className="flex items-center gap-2">
                <span>Region:</span>
                <button className="flex items-center gap-1 hover:text-white transition-colors">
                  <span>Global</span>
                  <svg
                    className="w-4 h-4"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
