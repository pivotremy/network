import PricingPage from "@/components/pricing";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Souremphi",
  description: "",
};

export default async function Pricing() {
  return (
    <>
      <PricingPage user={null} />
    </>
  );
}
