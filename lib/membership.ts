type Tier = "BRONZE" | "SILVER" | "GOLD" | "PLATINUM";

export function calculateTier(totalDonated: number): Tier {
  if (totalDonated >= 2500) return "PLATINUM";
  if (totalDonated >= 500) return "GOLD";
  if (totalDonated >= 100) return "SILVER";
  return "BRONZE";
}