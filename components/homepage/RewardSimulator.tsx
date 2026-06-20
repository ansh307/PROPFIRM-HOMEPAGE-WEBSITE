"use client";

import { AccountSizes } from "@/contants";
import { useMemo, useState, useEffect, useRef } from "react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";

/* =======================
   Types & Constants
======================= */

type CurvePoint = {
  step: number;
  balance: number;
};

const STEPS = 9;

const START_BALANCES = AccountSizes;
const PERFORMANCE_RATES = [0, 5, 10, 15, 20, 25, 30];

/* =======================
   Main Component
======================= */

export default function RewardSimulator() {
  const [startingBalance, setStartingBalance] = useState(200000);
  const [performanceRate, setPerformanceRate] = useState(15);

  const [chartData, setChartData] = useState<CurvePoint[]>([]);

  /* =======================
     Derived Values
  ======================= */

  const profit = useMemo(
    () => startingBalance * (performanceRate / 100),
    [startingBalance, performanceRate],
  );

  const accountBalance = startingBalance + profit;
  const reward = profit * 0.8;

  /* =======================
     RESET on Starting Balance Change
  ======================= */

  useEffect(() => {
    // Visual baseline when performance is 0: show a slight upward trend for better UX
    const visualRate = performanceRate === 0 ? 2 : performanceRate;

    const targetFinalBalance =
      startingBalance + startingBalance * (visualRate / 100);

    const freshCurve: CurvePoint[] = Array.from({ length: STEPS }).map(
      (_, i) => ({
        step: i,
        balance:
          startingBalance +
          (targetFinalBalance - startingBalance) * (i / (STEPS - 1)),
      }),
    );

    setChartData(freshCurve);
  }, [startingBalance, performanceRate]);

  /* =======================
     UPDATE on Performance Change
  ======================= */

  // Chart is fully derived in the single effect above; no incremental update needed.

  /* =======================
     Fixed Y-Axis Ticks (6)
  ======================= */

  const yTicks = useMemo(() => {
    switch (startingBalance) {
      case 5000:
        return [5000, 5250, 5500, 5750, 6000, 6500];
      case 10000:
        return [10000, 10600, 11200, 11800, 12400, 13000];

      case 25000:
        return [25000, 26500, 28000, 29500, 31000, 32500];

      case 50000:
        return [50000, 53000, 56000, 59000, 62000, 65000];

      case 100000:
        return [100000, 106000, 112000, 118000, 124000, 130000];

      case 200000:
        return [200000, 212000, 224000, 236000, 248000, 260000];
      case 500000:
        return [500000, 530000, 560000, 590000, 620000, 650000];
      default:
        return [];
    }
  }, [startingBalance]);

  /* =======================
     UI
  ======================= */

  return (
    <div className=" relative  text-white py-14 sm:py-20 xl:py-20 px-6 overflow-hidden z-30">
      <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* LEFT */}
        <div className="space-y-6">
          <div className="rounded-2xl p-5 bg-black border border-gray-800 ">
            <p className="text-sm text-gray-300">Your reward (80%)</p>
            <p className="text-3xl font-bold mt-2">
              ${reward.toLocaleString()}
            </p>
          </div>

          <div className="rounded-2xl p-5 bg-black border border-gray-800  space-y-6">
            <div>
              <p className="text-sm mb-1">Starting Balance</p>
              <RangeWithThumbValue
                values={START_BALANCES}
                value={startingBalance}
                onChange={setStartingBalance}
                prefix="$"
              />
            </div>

            <div>
              <p className="text-sm mb-1">Performance Rate</p>
              <RangeWithThumbValue
                values={PERFORMANCE_RATES}
                value={performanceRate}
                onChange={setPerformanceRate}
                suffix="%"
                thumbPercentageOffset={5}
              />
            </div>
          </div>
        </div>

        {/* RIGHT */}
        <div className="lg:col-span-2 rounded-2xl p-5 bg-black border border-gray-800 ">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-7 h-7 rounded-full bg-green-500 text-black flex items-center justify-center font-bold">
              $
            </div>
            <div>
              <p className="text-sm text-gray-300">Account Balance</p>
              <p className="text-2xl font-bold">
                ${accountBalance.toLocaleString()}
              </p>
            </div>
          </div>

          <div className="h-48">
            <ResponsiveContainer
              width="100%"
              height={192}
              aspect={undefined}
              className={"pointer-events-none"}
            >
              <LineChart data={chartData}>
                <CartesianGrid
                  stroke="rgba(255,255,255,0.08)"
                  strokeDasharray="3 3"
                  vertical={false}
                />
                <XAxis hide />
                <YAxis
                  ticks={yTicks}
                  domain={
                    yTicks.length
                      ? [yTicks[0], yTicks[yTicks.length - 1]]
                      : undefined
                  }
                  tickFormatter={(v) => `$${(v / 1000).toFixed(1)}k`}
                  tick={{ fill: "#c7c7d1", fontSize: 12 }}
                  axisLine={false}
                  tickLine={false}
                />
                <Line
                  type="monotone"
                  dataKey="balance"
                  stroke="#ffffff"
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}

/* =======================
   Custom Slider
======================= */

type RangeWithThumbValueProps = {
  values: number[];
  value: number;
  onChange: (v: number) => void;
  suffix?: string;
  prefix?: string;
  thumbPercentageOffset?: number;
};

export function RangeWithThumbValue({
  values,
  value,
  onChange,
  suffix,
  prefix,
  thumbPercentageOffset = 10,
}: RangeWithThumbValueProps) {
  const index = values.indexOf(value);
  const percent = (index / (values.length - 1)) * 100;

  return (
    <div className="relative w-full pt-8 -mt-2">
      <div className="h-5 rounded-full bg-white/10 relative">
        <div
          className="absolute h-5 rounded-full bg-green-500"
          style={{ width: `${percent}%` }}
        />
      </div>

      <div
        className="absolute top-1/2 -translate-x-1/2"
        style={{
          left: `${
            percent === 0
              ? percent + thumbPercentageOffset
              : percent === 100
                ? percent - thumbPercentageOffset
                : percent
          }%`,
        }}
      >
        <div className="px-3 h-7 rounded-full bg-black border-2 border-black text-sm font-bold flex items-center">
          {prefix}
          {value.toLocaleString()}
          {suffix}
        </div>
      </div>

      <input
        type="range"
        min={0}
        max={values.length - 1}
        step={1}
        value={index}
        onChange={(e) => onChange(values[Number(e.target.value)])}
        className="absolute inset-0 w-full opacity-0 cursor-pointer"
      />
    </div>
  );
}
