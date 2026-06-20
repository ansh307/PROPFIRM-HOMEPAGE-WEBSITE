import type { EntrySkeletonType } from "contentful";

export interface ChallengeSkeleton extends EntrySkeletonType {
  contentTypeId: "challenge";
  fields: {
    name: string;
    accountUsd: number;
    accountEur: number;
    accountGbp: number;
    accountAed: number;
    accountInr: number;
    priceUsd: number;
    oneStepPrice: number;
    twoStepPrice: number;
    zeroStepPrice: number;
    best: boolean;

  };
}
