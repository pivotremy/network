import Hero from "@/components/hero";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Souremphi",
  description: "",
};

export default async function Home() {
  return (
    <>
      <Hero />
    </>
  );
}
