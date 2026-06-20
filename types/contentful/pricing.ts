export type Currency = "USD" | "EUR" | "GBP" | "AED" | "INR";
export type AccountSize =  200000 | 100000 | 50000 | 25000 | 10000 | 5000;

export type StepPricing = Record<
  AccountSize,
  {
    account: Record<Currency, number>;
    prices: number;
    oneStepPrice: number;
    twoStepPrice: number;
    zeroStepPrice: number;
  }
>;

export type StepType = "zeroStepPrice" | "oneStepPrice" | "twoStepPrice";