"use client";

import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";
import Link from "next/link";
const HeroTitle = ({ theme }: { theme: string }) => (
  <>
    <div className="hidden items-start sm:inline-block">
      Your Emails, Protected and Private
    </div>
    <div className="block items-start sm:hidden">
      <span className="flex flex-col text-3xl">
        <span>Your Emails,</span>
        <span>Protected and Private</span>
      </span>
    </div>
  </>
);

const HeroDescription = () => (
  <div className="mt-6 max-w-lg">
    <p
      className="mb-8 text-sm text-gray-500 sm:text-lg"
      data-aos="fade-up"
      data-aos-delay="200"
    >
      Secure your emails with end-to-end encryption. Keep full control of your
      data while communicating safely.
    </p>
  </div>
);

const HeroButtons = () => {
  return (
    <div className="mx-auto flex max-w-sm flex-col items-center justify-center sm:max-w-none">
      <div
        data-aos="fade-up"
        data-aos-delay="400"
        className="flex flex-col items-center"
      >
        <Button asChild size="lg">
          <Link href="/pricing">Get Started</Link>
        </Button>
      </div>
    </div>
  );
};
export default function Hero() {
  const { theme } = useTheme();

  return (
    <section>
      <div className="relative mx-auto mt-24 max-w-6xl px-4 sm:px-6">
        <div className="relative pb-10 pt-24">
          <div className="mx-auto flex max-w-3xl flex-col items-center pb-12 text-center md:pb-16">
            <div className="text-4xl font-semibold text-gray-900 sm:text-5xl">
              <HeroTitle theme={theme!} />
            </div>
            <HeroDescription />
            <HeroButtons />
          </div>
        </div>
      </div>
    </section>
  );
}
