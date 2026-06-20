import type { Entry } from "contentful";
import type { ChallengeSkeleton } from "@/types/contentful/challenge";
import type { AccountSize, Currency, StepPricing } from "@/types/contentful/pricing";
import { AccountSizes } from "@/contants";


export function mapChallenges(
  entries: Entry<ChallengeSkeleton>[],
  currency: Currency = "USD"
) {
  return [...entries] // avoid mutating original array
    .sort((a, b) => {
      const aUsd =
        (a.fields.accountUsd as any)?.["en-US"] ??
        a.fields.accountUsd ??
        0;

      const bUsd =
        (b.fields.accountUsd as any)?.["en-US"] ??
        b.fields.accountUsd ??
        0;

      return bUsd - aUsd; // 🔥 DESCENDING
    })
    .map(({ fields }) => ({
      account: {
        USD: (fields.accountUsd as any)?.["en-US"] ?? fields.accountUsd ?? 0,
        EUR: (fields.accountEur as any)?.["en-US"] ?? fields.accountEur ?? 0,
        GBP: (fields.accountGbp as any)?.["en-US"] ?? fields.accountGbp ?? 0,
        AED: (fields.accountAed as any)?.["en-US"] ?? fields.accountAed ?? 0,
        INR: (fields.accountInr as any)?.["en-US"] ?? fields.accountInr ?? 0,
      },
      prices:
        (fields.priceUsd as any)?.["en-US"] ?? fields.priceUsd ?? 0,
      oneStepPrice:
        (fields.oneStepPrice as any)?.["en-US"] ?? fields.oneStepPrice ?? 0,
      twoStepPrice:
        (fields.twoStepPrice as any)?.["en-US"] ?? fields.twoStepPrice ?? 0,
      zeroStepPrice:
        (fields.zeroStepPrice as any)?.["en-US"] ?? fields.zeroStepPrice ?? 0,
      best: (fields.best as any)?.["en-US"] ?? fields.best ?? false,
    }));
}


function isAccountSize(value: number): value is AccountSize {
  const ACCOUNT_SIZES = AccountSizes;
  return ACCOUNT_SIZES.includes(value as AccountSize);
}

export function mapStepPricing(
  entries: Entry<ChallengeSkeleton>[],
  currency: Currency = "USD"
): StepPricing {
  const result = {} as StepPricing;

  entries.forEach(({ fields }) => {
    const accountUsd = (fields?.accountUsd as any)?.['en-US'] ?? fields?.accountUsd ?? 0;
    if (!isAccountSize(accountUsd)) return;

    const accountSize = accountUsd;

    result[accountSize] = {
      account: {
        USD: accountUsd,
        EUR: (fields?.accountEur as any)?.['en-US'] ?? fields?.accountEur ?? 0,
        GBP: (fields?.accountGbp as any)?.['en-US'] ?? fields?.accountGbp ?? 0,
        AED: (fields?.accountAed as any)?.['en-US'] ?? fields?.accountAed ?? 0,
        INR: (fields?.accountInr as any)?.['en-US'] ?? fields?.accountInr ?? 0,
      },
      prices: (fields?.priceUsd as any)?.['en-US'] ?? fields?.priceUsd ?? 0,
      oneStepPrice: (fields?.oneStepPrice as any)?.['en-US'] ?? fields?.oneStepPrice ?? 0,
      twoStepPrice: (fields?.twoStepPrice as any)?.['en-US'] ?? fields?.twoStepPrice ?? 0,
      zeroStepPrice: (fields?.zeroStepPrice as any)?.['en-US'] ?? fields?.zeroStepPrice ?? 0,
    };
  });

  return result;
}

