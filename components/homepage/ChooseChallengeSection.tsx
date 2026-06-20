import { getChallenges } from "@/lib/actions";
import ChooseChallenge from "./ChooseChallenge";
import { mapChallenges, mapStepPricing } from "@/lib/helper";

type Currency = "USD" | "EUR" | "GBP" | "AED" | "INR";

const currencySymbol: Record<Currency, string> = {
  USD: "$",
  EUR: "€",
  GBP: "£",
  INR: "₹",
  AED: "د.إ",
};

const ChooseChallengeSection = async () => {
  const entries = await getChallenges();

  const challengesnew = mapChallenges(entries, "USD");
  const stepPricingnew = mapStepPricing(entries, "USD");

  return (
    <ChooseChallenge
      challenges={challengesnew}
      stepPricing={stepPricingnew}
      currencySymbol={currencySymbol}
    />
  );
};

export default ChooseChallengeSection;
