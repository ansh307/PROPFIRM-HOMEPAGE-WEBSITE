"use client";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { BiSolidDollarCircle } from "react-icons/bi";
import { LuArrowDown, LuArrowDownToLine, LuTimer } from "react-icons/lu";
import { MdOutlineDateRange } from "react-icons/md";
import { PiTarget } from "react-icons/pi";
import type {
  Currency,
  AccountSize,
  StepPricing,
  StepType,
} from "@/types/contentful/pricing";
import { AccountSizes } from "@/contants";
import { ChallengeSkeleton } from "@/types/contentful/challenge";

interface ChallengeProps {
  account: { USD: number; EUR: number; GBP: number; INR: number; AED: number };
  prices: number;
  oneStepPrice: number;
  twoStepPrice: number;
  zeroStepPrice: number;
  best: boolean;
}

interface ChooseChallengeProps {
  currencySymbol: Record<Currency, string>;
  challenges: ChallengeProps[];
  stepPricing: StepPricing;
}

const ChooseChallenge = ({
  currencySymbol,
  challenges,
  stepPricing,
}: ChooseChallengeProps) => {
  const [currency, setCurrency] = useState<Currency>("USD");
  const [view, setView] = useState<"overview" | "steps">("overview");
  const [showNumbers, setShowNumbers] = useState(false);
  const [accountSize, setAccountSize] = useState<AccountSize>(25000);
  const router = useRouter();

  const [activeType, setActiveType] = useState<StepType>("zeroStepPrice");

  const typeTabs: StepType[] = [
    "zeroStepPrice",
    "oneStepPrice",
    "twoStepPrice",
  ];

  const getProfitTarget = (type: StepType) => {
    switch (type) {
      case "twoStepPrice":
        return [10, 5]; // Step 1 + Step 2
      case "oneStepPrice":
        return [10];
      case "zeroStepPrice":
        return [5];
      default:
        return [];
    }
  };

  const MAX_DAILY_LOSS: Record<StepType, { min: number; max: number }> = {
    zeroStepPrice: { min: 3, max: 3 },
    oneStepPrice: { min: 4, max: 5 },
    twoStepPrice: { min: 5, max: 5 },
  };
  const MAX_LOSS_RANGE: Record<StepType, { min: number; max: number }> = {
    zeroStepPrice: { min: 6, max: 6 },
    oneStepPrice: { min: 8, max: 10 },
    twoStepPrice: { min: 10, max: 10 },
  };

  const getAccountValue = (
    item: ChallengeSkeleton["fields"],
    currency: Currency,
  ) => {
    switch (currency) {
      case "USD":
        return item.accountUsd;
      case "EUR":
        return item.accountEur;
      case "GBP":
        return item.accountGbp;
      case "AED":
        return item.accountAed;
      case "INR":
        return item.accountInr;
      default:
        return item.accountUsd;
    }
  };

  const formatAccountSize = (value: number, currency: Currency) => {
    if (currency === "INR") {
      if (value >= 10000000) return `${value / 10000000}Cr`;
      if (value >= 100000) return `${value / 100000}L`;
    }

    return `${value / 1000}K`;
  };

  type Column = {
    key: string;
    title: string;
  };

  const getColumns = (type: StepType): Column[] => {
    if (type === "zeroStepPrice") {
      return [{ key: "account", title: "EFT Account" }];
    }

    if (type === "oneStepPrice") {
      return [
        { key: "step1", title: "Step 1" },
        { key: "account", title: "EFT Account" },
      ];
    }

    return [
      { key: "step1", title: "Step 1" },
      { key: "step2", title: "Step 2" },
      { key: "account", title: "EFT Account" },
    ];
  };

  const columns = getColumns(activeType);
  const rows: TableRow[] = [
    {
      type: "percentArray",
      label: "Profit Target",
      values: getProfitTarget(activeType),
    },
    {
      type: "range",
      label: "Max. Daily Loss",
      values: MAX_DAILY_LOSS[activeType],
    },
    {
      type: "range",
      label: "Max. Loss",
      values: MAX_LOSS_RANGE[activeType],
    },
    {
      type: "textArray",
      label: "Min. trading days",
      values:
        activeType === "zeroStepPrice"
          ? []
          : activeType === "oneStepPrice"
            ? ["3 days"]
            : ["4 days", "4 days"],
    },
    {
      type: "textArray",
      label: "Trading Period",
      values: ["Unlimited"],
    },
    {
      type: "textArray",
      label: "Refund",
      values: activeType === "zeroStepPrice" ? ["Yes (after payout)"] : ["-"],
    },
  ];

  type TableRow =
    | {
        type: "percentArray";
        label: string;
        values: number[];
      }
    | {
        type: "range";
        label: string;
        values: { min: number; max: number };
      }
    | {
        type: "textArray";
        label: string;
        values: string[];
      };

  const selectedPricing = stepPricing[accountSize];
  const price = selectedPricing[activeType];
  const accountValue = selectedPricing.account[currency];

  const [isMobile, setIsMobile] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    const checkScreen = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkScreen();
    window.addEventListener("resize", checkScreen);

    return () => window.removeEventListener("resize", checkScreen);
  }, []);

  const formatAmount = (value: number) =>
    `${currencySymbol[currency]}${value.toLocaleString()}`;

  const getRangeDisplay = (
    range: { min: number; max: number },
    value: number,
    showNumbers: boolean,
  ) => {
    const { min, max } = range;

    if (!showNumbers) {
      return min === max ? `${min}%` : `${min}–${max}%`;
    }

    const minVal = formatAmount(Math.round((value * min) / 100));
    const maxVal = formatAmount(Math.round((value * max) / 100));

    return min === max ? minVal : `${minVal} - ${maxVal}`;
  };

  const percentToAmount = (percent: number) =>
    formatAmount(
      Math.round((stepPricing[accountSize].account[currency] * percent) / 100),
    );

  const SIGN_UP_URL = process.env.NEXT_PUBLIC_SIGN_UP_URL ?? "/signup";

  return (
    <section
      id="choosechallenge"
      className="min-h-screen  text-white py-14 sm:py-20 xl:py-32 px-6 overflow-hidden relative z-30"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <h1 className=" text-3xl sm:text-4xl md:text-5xl font-bold mb-3">
          Choose Your Epic Future Traders{" "}
          <span className="text-green-500">Challenge</span>
        </h1>
        <p className="text-gray-400  text-sm md:text-base md:font-semibold tracking-wide mb-10">
          Complete Epic Future Traders’s objectives to become eligible to gain
          your demo Epic Future Traders Account.
        </p>

        {/* StepType Tabs */}
        <div className="flex justify-center items-center mb-10">
          <div className="flex bg-black p-1 rounded-full border border-gray-800">
            {typeTabs.map((tab) => (
              <button
                aria-label={`Select ${tab === "zeroStepPrice" ? "Zero step" : tab === "oneStepPrice" ? "OneStep" : "TwoStep"} pricing`}
                key={tab}
                onClick={() => setActiveType(tab)}
                className={`px-5 py-2 rounded-full text-sm transition-all duration-300
              ${
                activeType === tab
                  ? "bg-white text-black shadow-md"
                  : "text-gray-200 hover:text-white"
              }`}
              >
                {tab === "zeroStepPrice"
                  ? "Zero step"
                  : tab === "oneStepPrice"
                    ? "OneStep"
                    : "TwoStep"}
              </button>
            ))}
          </div>
        </div>

        {/* Tabs */}
        <div className="flex flex-col md:flex-row justify-between items-center">
          {/* Currency Tabs */}
          <div className="flex gap-3 mb-8 md:mb-12">
            {(["USD", "GBP", "EUR", "AED", "INR"] as Currency[]).map((cur) => (
              <button
                aria-label={`Select ${cur} currency`}
                key={cur}
                onClick={() => setCurrency(cur)}
                className={`px-4 py-2 rounded-full border transition ${
                  currency === cur
                    ? "bg-white text-black border-white"
                    : "border-gray-800 text-gray-300 hover:border-gray-700 bg-black"
                }`}
              >
                {cur}
              </button>
            ))}
          </div>

          <div className="flex justify-between items-center mb-8">
            <div /> {/* left spacer */}
            <div className="flex bg-black border border-gray-800 text-gray-300 hover:border-gray-700 rounded-full p-1">
              <button
                aria-label="Show overview tab"
                onClick={() => setView("overview")}
                className={`px-4 py-2 rounded-full text-sm transition ${
                  view === "overview"
                    ? "bg-green-600 text-white"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                Overview
              </button>

              <button
                aria-label="Show steps tab"
                onClick={() => setView("steps")}
                className={`px-4 py-2 rounded-full text-sm transition ${
                  view === "steps"
                    ? "bg-green-600 text-white"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                Show Steps
              </button>
            </div>
          </div>
        </div>

        {/* steps tab and Toggler */}

        <div className="flex flex-col md:flex-row justify-between items-center ">
          {view === "steps" ? (
            <div className="flex flex-wrap gap-2 mb-8 md:mb-14">
              {challenges.map((item) => {
                const usdValue = item.account.USD; // ✅ key
                const displayValue = item.account[currency]; // ✅ UI

                return (
                  <button
                    aria-label={`Select account size ${formatAccountSize(displayValue, currency)}`}
                    key={usdValue}
                    onClick={() => setAccountSize(usdValue as AccountSize)} // ✅ FIX
                    className={`px-4 py-2 rounded-xl text-sm font-semibold transition
        ${
          accountSize === usdValue
            ? "bg-gray-600 text-white"
            : "bg-[#1a1a1a] text-gray-400 hover:text-white"
        }`}
                  >
                    {formatAccountSize(displayValue, currency)} {/* ✅ UI */}
                  </button>
                );
              })}
            </div>
          ) : (
            <div className="p-2" />
          )}

          {/* 🔹 DESKTOP: Always visible */}
          <div className="hidden md:flex items-center gap-3 mb-14">
            <span className="text-sm text-gray-400">Show Numbers</span>

            <button
              aria-label="Toggle between showing percentages and actual numbers"
              onClick={() => setShowNumbers((prev) => !prev)}
              className={`w-11 h-6 flex items-center rounded-full px-1 transition
                ${showNumbers ? "bg-green-600" : "bg-gray-600"}
              `}
            >
              <span
                className={`w-4 h-4 bg-white rounded-full shadow transform transition
          ${showNumbers ? "translate-x-5" : "translate-x-0"}
        `}
              />
            </button>
          </div>

          {/* 🔹 MOBILE: Only when view === "steps" */}
          {view === "steps" && (
            <div className="flex md:hidden items-center gap-3 mt-4 mb-14">
              <span className="text-sm text-gray-400">Show Numbers</span>

              <button
                aria-label="Toggle between showing percentages and actual numbers"
                onClick={() => setShowNumbers((prev) => !prev)}
                className={`w-11 h-6 flex items-center rounded-full px-1 transition
          ${showNumbers ? "bg-green-600" : "bg-gray-600"}
        `}
              >
                <span
                  className={`w-4 h-4 bg-white rounded-full shadow transform transition
            ${showNumbers ? "translate-x-5" : "translate-x-0"}
          `}
                />
              </button>
            </div>
          )}
        </div>

        {view === "overview" && (
          <>
            {/* Desktop */}
            <div className="hidden sm:grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
              <div className="p-6 flex flex-col justify-between ">
                <div>
                  <ul className="space-y-4 mt-18 py-8 text-sm">
                    <li className=" flex ">
                      <PiTarget className="mr-2 w-6 h-6" />
                      Profit Target
                    </li>
                    <li className="pt-4 flex ">
                      <LuArrowDown className="mr-2 w-6 h-6" />
                      Max. Daily Loss
                    </li>
                    <li className="flex ">
                      <LuArrowDownToLine className="mr-2 w-6 h-6" />
                      Max. Loss
                    </li>
                    <li className="flex ">
                      <LuTimer className="mr-2 w-6 h-6" />
                      Min. trading days
                    </li>
                    <li className="flex ">
                      <MdOutlineDateRange className="mr-2 w-6 h-6" />
                      Trading Period
                    </li>
                    <li className="flex ">
                      <BiSolidDollarCircle className="mr-2 w-6 h-6" />
                      Refund
                    </li>
                  </ul>
                  <div className=" text-sm font-semibold text-gray-400">
                    All prices are one-time payments
                  </div>
                </div>
              </div>
              <div
                className="
                  col-span-2 md:col-span-3 lg:col-span-4 xl:col-span-5
                  flex gap-4
                  overflow-x-auto
                  pt-4 
                  pb-2
                  scrollbar-thin
                  scrollbar-thumb-gray-700
                  scrollbar-track-transparent
                "
              >
                {challenges.map((item) => (
                  <div
                    key={item.account.USD}
                    className={`
                    relative
                    shrink-0
                    w-62
                    rounded-2xl
                    border
                    p-6
                    flex
                    flex-col
                    justify-between
                    ${
                      item.best
                        ? "border-green-500 bg-gradient-to-b from-[#0f3a1f] to-[#0b0b0b]"
                        : "border-green-800 bg-black"
                    }
                  `}
                  >
                    {item.account[currency] === 400000 && (
                      <span className="absolute  -top-3 left-1/2 -translate-x-1/2 bg-green-600 text-xs px-3 py-1 rounded-full">
                        Coming soon
                      </span>
                    )}
                    {item.best && (
                      <span className="absolute  -top-3 left-1/2 -translate-x-1/2 bg-green-600 text-xs px-3 py-1 rounded-full">
                        Best value
                      </span>
                    )}

                    {/* CONTENT */}
                    <div>
                      <div className="flex flex-col items-center">
                        <p className="text-gray-400 mb-1 text-sm">Account</p>
                        <h2 className="text-2xl font-bold mb-4">
                          {currencySymbol[currency]}
                          {item.account[currency].toLocaleString()}
                        </h2>
                      </div>

                      <div className="border-t border-gray-200/10 mb-6" />

                      <ul className="space-y-5 text-sm text-gray-300">
                        <li>
                          {getProfitTarget(activeType).map((percent, index) => (
                            <div key={index} className="text-gray-400">
                              {activeType === "twoStepPrice"
                                ? `Step ${index + 1}`
                                : ""}
                              <span
                                className={`font-semibold text-gray-300 ${activeType === "twoStepPrice" ? "ml-2 " : "ml-0"}`}
                              >
                                {showNumbers
                                  ? formatAmount(
                                      Math.round(
                                        (item.account[currency] * percent) /
                                          100,
                                      ),
                                    )
                                  : `${percent}%`}
                              </span>
                            </div>
                          ))}
                        </li>

                        <li>
                          {getRangeDisplay(
                            MAX_DAILY_LOSS[activeType],
                            item.account[currency],
                            showNumbers,
                          )}
                        </li>

                        <li>
                          {getRangeDisplay(
                            MAX_LOSS_RANGE[activeType],
                            item.account[currency],
                            showNumbers,
                          )}
                        </li>
                        <li>4 days</li>
                        <li>Unlimited</li>
                        <li>
                          <span className="text-green-400">Yes (100%)</span>
                        </li>
                      </ul>
                    </div>

                    <div className="border-t border-gray-200/10 mt-6" />

                    <div className="mt-6 text-center">
                      <p className="text-2xl font-bold mb-4">
                        {currencySymbol["USD"]}
                        {item[activeType as keyof typeof item].toLocaleString()}
                      </p>

                      <button
                        aria-label={`Start ${formatAccountSize(item.account[currency], currency)} challenge with ${activeType === "zeroStepPrice" ? "Zero step" : activeType === "oneStepPrice" ? "OneStep" : "TwoStep"} pricing`}
                        onClick={() => router.push(SIGN_UP_URL)}
                        className="w-full py-3 rounded-xl bg-green-600 hover:bg-green-700 transition font-medium"
                      >
                        Start now
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Mobile */}
            <div className="sm:hidden ">
              <div className="overflow-x-auto mb-10">
                <div className="min-w-[900px]">
                  <div className="flex ">
                    {challenges.map((item) => (
                      <div
                        key={item.account.USD}
                        className={`relative  border  p-6 flex flex-col justify-between
                    ${
                      item.best
                        ? "border-green-500 bg-gradient-to-b from-[#0f3a1f] to-[#0b0b0b]"
                        : "border-gray-800 bg-[#0b0b0b]"
                    }`}
                      >
                        {item.best && (
                          <span className="absolute -top-0 left-1/2 -translate-x-1/2 bg-green-600 text-xs px-3 py-1 rounded-b-md">
                            Best value
                          </span>
                        )}

                        <div className="px-8 pt-4">
                          <div className="flex flex-col items-center">
                            <p className="text-gray-400 mb-1 text-sm">
                              Account
                            </p>
                            <h2 className="text-2xl font-bold mb-4">
                              {currencySymbol[currency]}
                              {item.account[`${currency}`].toLocaleString()}
                            </h2>
                          </div>
                        </div>

                        <div className="border-t border-gray-200/10 "></div>

                        <div className="mt-6 text-center">
                          <p className="text-2xl font-bold mb-4">
                            {currencySymbol["USD"]}
                            {item[
                              activeType as keyof typeof item
                            ].toLocaleString()}
                          </p>

                          <button
                            aria-label={`Start ${formatAccountSize(item.account[currency], currency)} challenge with ${activeType === "zeroStepPrice" ? "Zero step" : activeType === "oneStepPrice" ? "OneStep" : "TwoStep"} pricing`}
                            onClick={() => router.push(`${SIGN_UP_URL}`)}
                            className="w-full py-3 rounded-xl bg-green-600 hover:bg-green-700 transition font-medium"
                          >
                            Start now
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Account Size tabs */}
              <div className="flex flex-wrap gap-2 mb-8 md:mb-14">
                {challenges.map((item) => {
                  const usdValue = item.account.USD; // ✅ key
                  const displayValue = item.account[currency]; // ✅ UI

                  return (
                    <button
                      aria-label={`Select account size ${formatAccountSize(displayValue, currency)}`}
                      key={usdValue}
                      onClick={() => setAccountSize(usdValue as AccountSize)} // ✅ FIX
                      className={`px-4 py-2 rounded-xl text-sm font-semibold transition
        ${
          accountSize === usdValue
            ? "bg-gray-600 text-white"
            : "bg-[#1a1a1a] text-gray-400 hover:text-white"
        }`}
                    >
                      {formatAccountSize(displayValue, currency)} {/* ✅ UI */}
                    </button>
                  );
                })}
              </div>
              {/* Show Numbers Toggle mobile */}
              <div className="flex md:hidden items-center gap-3 mb-4">
                <span className="text-sm text-gray-400">Show Numbers</span>

                <button
                  aria-label="Toggle between showing percentages and actual numbers"
                  onClick={() => setShowNumbers((prev) => !prev)}
                  className={`w-11 h-6 flex items-center rounded-full px-1 transition
                ${showNumbers ? "bg-green-600" : "bg-gray-600"}
              `}
                >
                  <span
                    className={`w-4 h-4 bg-white rounded-full shadow transform transition
          ${showNumbers ? "translate-x-5" : "translate-x-0"}
        `}
                  />
                </button>
              </div>
              <div className=" flex flex-col justify-between ">
                <div className="py-4">
                  <h2 className="font-semibold">Trading Objectives</h2>
                  <p className="text-sm text-gray-400">
                    Same for every account size
                  </p>
                </div>
                <div className="flex justify-between">
                  <ul className="space-y-4  py-4 text-sm">
                    <li className=" flex ">
                      <PiTarget className="mr-2 w-6 h-6" />
                      Profit Target
                    </li>
                    <li className=" flex ">
                      <LuArrowDown className="mr-2 w-6 h-6" />
                      Max. Daily Loss
                    </li>
                    <li className="flex ">
                      <LuArrowDownToLine className="mr-2 w-6 h-6" />
                      Max. Loss
                    </li>
                    <li className="flex ">
                      <LuTimer className="mr-2 w-6 h-6" />
                      Min. trading days
                    </li>
                    <li className="flex ">
                      <MdOutlineDateRange className="mr-2 w-6 h-6" />
                      Trading Period
                    </li>
                    <li className="flex ">
                      <BiSolidDollarCircle className="mr-2 w-6 h-6" />
                      Refund
                    </li>
                  </ul>

                  <ul className="space-y-5 text-sm text-gray-300 pt-3">
                    {/* Profit Target */}
                    <li className="translate-y-2">
                      {getProfitTarget(activeType).map((percent, index) => (
                        <div key={index} className="text-gray-400">
                          {activeType === "twoStepPrice"
                            ? `Step ${index + 1}`
                            : ""}
                          <span className="font-semibold text-gray-300 ml-2">
                            {showNumbers
                              ? formatAmount(
                                  Math.round((accountValue * percent) / 100),
                                )
                              : `${percent}%`}
                          </span>
                        </div>
                      ))}
                    </li>

                    {/* Max Daily Loss */}
                    <li>
                      {getRangeDisplay(
                        MAX_DAILY_LOSS[activeType],
                        accountValue,
                        showNumbers,
                      )}
                    </li>

                    {/* Max Loss */}
                    <li>
                      {getRangeDisplay(
                        MAX_LOSS_RANGE[activeType],
                        accountValue,
                        showNumbers,
                      )}
                    </li>

                    {/* Min Trading Days */}
                    <li>
                      {activeType === "zeroStepPrice"
                        ? "—"
                        : activeType === "oneStepPrice"
                          ? "3 days"
                          : "5 days"}
                    </li>

                    {/* Trading Period */}
                    <li>Unlimited</li>

                    {/* Refund */}
                    <li>
                      <span className="text-green-400">Yes (100%)</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </>
        )}

        {view === "steps" && (
          <div className="relative">
            {/* Scroll wrapper */}
            <div className="overflow-x-auto">
              <div className="min-w-[900px]">
                <div className="rounded-2xl border border-gray-800 bg-[#0b0b0b] overflow-hidden">
                  {/* Header */}
                  <div
                    className={`grid text-sm font-semibold text-gray-400 px-6 py-4 border-b border-gray-800`}
                    style={{
                      gridTemplateColumns: `200px repeat(${columns.length}, 1fr)`,
                    }}
                  >
                    <div>TRADING OBJECTIVES</div>
                    {columns.map((col) => (
                      <div key={col.key}>{col.title}</div>
                    ))}
                  </div>

                  {/* Rows */}
                  {rows.map((row) => (
                    <div
                      key={row.label}
                      className="grid px-6 py-4 text-sm border-b border-gray-800"
                      style={{
                        gridTemplateColumns: `200px repeat(${columns.length}, 1fr)`,
                      }}
                    >
                      <div className="text-gray-300">{row.label}</div>

                      {columns.map((_, index) => {
                        let value: React.ReactNode = "—";

                        if (row.type === "percentArray") {
                          const percent = row.values[index] ?? row.values[0];

                          value = showNumbers
                            ? formatAmount(
                                Math.round((accountValue * percent) / 100),
                              )
                            : `${percent}%`;
                        } else if (row.type === "range") {
                          value = getRangeDisplay(
                            row.values,
                            accountValue,
                            showNumbers,
                          );
                        } else if (row.type === "textArray") {
                          value = row.values[index] ?? row.values[0] ?? "—";
                        }

                        return (
                          <div key={index} className="text-gray-400">
                            {value}
                          </div>
                        );
                      })}
                    </div>
                  ))}

                  {/* Footer */}
                  <div className="flex justify-between items-center px-6 py-6 bg-gradient-to-r from-black to-green-500/15">
                    <div>
                      <p className="text-gray-400 text-sm">EFT Account</p>
                      <p className="text-2xl font-bold">
                        {currencySymbol[currency]}
                        {stepPricing[accountSize].account[
                          currency
                        ].toLocaleString()}
                      </p>
                    </div>

                    <div className="flex items-center gap-6">
                      <div className="text-right">
                        <p className="text-gray-400 text-sm">Price</p>
                        <p className="text-2xl font-bold">
                          {currencySymbol["USD"]}
                          {stepPricing[accountSize][
                            activeType
                          ].toLocaleString()}
                        </p>
                      </div>

                      <button
                        aria-label={`Start ${formatAccountSize(stepPricing[accountSize].account[currency], currency)} challenge with ${activeType === "zeroStepPrice" ? "Zero step" : activeType === "oneStepPrice" ? "OneStep" : "TwoStep"} pricing`}
                        onClick={() => router.push(`${SIGN_UP_URL}`)}
                        className="px-8 py-3 rounded-xl bg-green-600 hover:bg-green-700 transition font-medium whitespace-nowrap"
                      >
                        Start now
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default ChooseChallenge;
