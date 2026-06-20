import type { Entry } from "contentful";
import { contentfulClient } from "@/lib/contentful";
import type { ChallengeSkeleton } from "@/types/contentful/challenge";

export async function getChallenges(): Promise<
  Entry<ChallengeSkeleton>[]
> {
  const res = await contentfulClient.getEntries<ChallengeSkeleton>({
    content_type: "challenge",
    order: ["sys.createdAt"], 
  });

  return res.items;
}
