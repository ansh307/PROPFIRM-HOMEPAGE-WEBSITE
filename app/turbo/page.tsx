"use client";

import React, { useEffect, useState } from "react";

const portfolioOptions = [
  "Jr. Portfolio Manager",
  "Sr. Portfolio Manager",
  "Exec. Portfolio Manager",
  "Sprint",
  "Turbo - Pay After You Pass",
];

const accountSizes = ["$10K", "$25K", "$50K", "$100K", "$150K", "$200K"];

const platforms = ["cTrader", "MetaTrader 5"];

export default function Page() {
  const [portfolio, setPortfolio] = useState<string>(
    "Turbo - Pay After You Pass",
  );
  const [accountSize, setAccountSize] = useState<string>("$100K");
  const [platform, setPlatform] = useState<string>("MetaTrader 5");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, []);

  return (
    <>
      <main className="min-h-screen bg-[#02251c] px-4 py-10 text-white sm:px-6">
        <div className="mx-auto max-w-5xl">
          <h1 className="mb-4 text-center text-4xl font-semibold text-[#b9f3cc] sm:text-5xl">
            Complete Your Order
          </h1>
          <p className="mb-10 text-center text-emerald-200/80">
            Simulation Information
          </p>

          <section className="mb-10 rounded-2xl border border-white/5 bg-[#06291f] p-5 shadow-[0_24px_80px_rgba(0,0,0,0.28)] sm:p-8">
            <div className="mx-auto grid max-w-3xl gap-8">
              <div>
                <label className="mb-4 block font-medium text-emerald-100">
                  Portfolio Type
                </label>
                <div className="flex flex-wrap gap-3">
                  {portfolioOptions.map((option) => (
                    <button
                      key={option}
                      onClick={() => setPortfolio(option)}
                      className={`rounded-full border px-4 py-3 text-sm transition md:text-base ${
                        portfolio === option
                          ? "border-[#f8df2e] bg-[#f8df2e] text-black"
                          : "border-emerald-400/20 text-emerald-100/80 hover:border-emerald-300/50 hover:text-white"
                      }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="mb-4 block font-medium text-emerald-100">
                  Account Size
                </label>
                <div className="flex flex-wrap gap-3">
                  {accountSizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setAccountSize(size)}
                      className={`rounded-full border px-4 py-3 text-sm transition md:text-base ${
                        accountSize === size
                          ? "border-[#f8df2e] bg-[#f8df2e] text-black"
                          : "border-emerald-400/20 text-emerald-100/80 hover:border-emerald-300/50 hover:text-white"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="mb-4 block font-medium text-emerald-100">
                  Platform
                </label>
                <div className="flex gap-3">
                  {platforms.map((item) => (
                    <button
                      key={item}
                      onClick={() => setPlatform(item)}
                      className={`rounded-full border px-6 py-3 text-sm transition md:text-base ${
                        platform === item
                          ? "border-[#f8df2e] bg-[#f8df2e] text-black"
                          : "border-emerald-400/20 text-emerald-100/80 hover:border-emerald-300/50 hover:text-white"
                      }`}
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </section>

          <section className="mx-auto mb-8 max-w-3xl">
            <h2 className="mb-6 text-center text-2xl text-[#c6f5d6]">
              Personal Information
            </h2>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <input
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="First name"
                className="border-b border-emerald-500/20 bg-transparent px-2 py-3 text-emerald-100 outline-none placeholder:text-emerald-100/35"
              />
              <input
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder="Last name"
                className="border-b border-emerald-500/20 bg-transparent px-2 py-3 text-emerald-100 outline-none placeholder:text-emerald-100/35"
              />
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email address"
                className="col-span-1 border-b border-emerald-500/20 bg-transparent px-2 py-3 text-emerald-100 outline-none placeholder:text-emerald-100/35 md:col-span-2"
              />
              <input
                placeholder="Phone number"
                className="col-span-1 border-b border-emerald-500/20 bg-transparent px-2 py-3 text-emerald-100 outline-none placeholder:text-emerald-100/35 md:col-span-2"
              />
              <select
                defaultValue="United Kingdom (UK)"
                className="border-b border-emerald-500/20 bg-[#114131] px-2 py-3 text-emerald-100 outline-none"
              >
                <option className="bg-[#114131] text-emerald-100">
                  United Kingdom (UK)
                </option>
                <option className="bg-[#114131] text-emerald-100">
                  United States (US)
                </option>
                <option className="bg-[#114131] text-emerald-100">
                  United Arab Emirates (UAE)
                </option>
                <option className="bg-[#114131] text-emerald-100">India</option>
                <option className="bg-[#114131] text-emerald-100">Other</option>
              </select>
              <input
                placeholder="House number and street name"
                className="col-span-1 border-b border-emerald-500/20 bg-transparent px-2 py-3 text-emerald-100 outline-none placeholder:text-emerald-100/35 md:col-span-2"
              />
              <input
                placeholder="Postcode/Zip code"
                className="border-b border-emerald-500/20 bg-transparent px-2 py-3 text-emerald-100 outline-none placeholder:text-emerald-100/35"
              />
            </div>
          </section>

          <section className="mx-auto max-w-4xl rounded-2xl border border-emerald-300/20 bg-[#0f3a2d] p-6 sm:p-8">
            <h3 className="mb-8 text-center text-2xl font-medium text-[#c6f5d6] sm:text-3xl">
              Payment Details
            </h3>

            <div className="space-y-6">
              <div className="flex items-center gap-3 text-emerald-100">
                <span className="grid h-6 w-6 place-items-center rounded-full bg-[#8ef0a9] text-sm font-bold text-[#0d3d2f]">
                  ✓
                </span>
                <span className="text-base sm:text-lg">
                  Credit / Debit Card
                </span>
              </div>

              <div className="grid grid-cols-1 gap-5 md:grid-cols-12 md:items-end">
                <div className="md:col-span-5">
                  <label className="mb-3 block text-sm font-medium text-white/95 sm:text-base">
                    Card number
                  </label>
                  <div className="relative border-b border-emerald-200/15 pb-3">
                    <input
                      placeholder="1234 1234 1234 1234"
                      className="w-full bg-transparent pr-24 text-lg text-white/75 outline-none placeholder:text-white/45 sm:text-xl"
                    />
                    <div className="absolute right-0 top-1/2 flex -translate-y-1/2 items-center gap-1.5">
                      <span className="inline-flex items-center justify-center rounded bg-[#0057a3] px-1.5 py-0.5 text-[10px] font-semibold text-white">
                        VISA
                      </span>
                      <span className="h-5 w-5 rounded-full bg-[#eb001b]" />
                      <span className="-ml-2 h-5 w-5 rounded-full bg-[#f79e1b]" />
                      <span className="inline-flex items-center justify-center rounded bg-white px-1.5 py-0.5 text-[8px] font-semibold text-black">
                        AMEX
                      </span>
                    </div>
                  </div>
                </div>

                <div className="md:col-span-3">
                  <label className="mb-3 block text-sm font-medium text-white/95 sm:text-base">
                    Expiration date
                  </label>
                  <input
                    placeholder="MM / YY"
                    className="w-full bg-transparent border-b border-emerald-200/15 pb-3 text-lg text-white/75 outline-none placeholder:text-white/45 sm:text-xl"
                  />
                </div>

                <div className="flex items-end gap-4 md:col-span-3">
                  <div className="flex-1">
                    <label className="mb-3 block text-sm font-medium text-white/95 sm:text-base">
                      Security code
                    </label>
                    <input
                      placeholder="CVC"
                      className="w-full bg-transparent border-b border-emerald-200/15 pb-3 text-lg text-white/75 outline-none placeholder:text-white/45 sm:text-xl"
                    />
                  </div>
                  <div className="hidden h-10 w-11 items-center justify-center rounded-md border border-white/35 text-[10px] font-semibold leading-none text-white/50 sm:flex">
                    <span>123</span>
                  </div>
                </div>
              </div>

              <label className="flex items-center gap-3 text-emerald-100">
                <span className="h-6 w-6 rounded-full border border-white/80" />
                <span className="text-base sm:text-lg">Crypto</span>
              </label>

              <div className="border-t border-white/35 pt-6">
                <p className="max-w-3xl text-sm leading-relaxed text-emerald-100/90 sm:text-base">
                  By placing your order, you agree to our{" "}
                  <span className="font-medium text-[#f8df2e]">
                    Privacy Policy
                  </span>{" "}
                  and{" "}
                  <span className="font-medium text-[#f8df2e]">
                    Terms of Use
                  </span>
                  , and consent to receive updates and marketing communications
                  from Leveraged.
                </p>
              </div>

              <button className="w-full rounded-xl bg-[#f8df2e] px-6 py-4 text-lg font-medium text-black transition hover:bg-[#ffe85c]">
                Place Order
              </button>

              <div className="flex items-center gap-3 text-emerald-200/45">
                <span className="grid h-6 w-6 place-items-center rounded-full border border-emerald-200/35 text-xs">
                  ✓
                </span>
                <span className="text-sm sm:text-base">
                  All payments are secured and encrypted
                </span>
              </div>
            </div>
          </section>
        </div>
      </main>
    </>
  );
}
