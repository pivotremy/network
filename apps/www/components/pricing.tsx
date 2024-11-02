"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { PricingPageProps, PricingTierProps } from "@/types/pricing";
import { PRICING_TIERS } from "@/utils/constants";
import { Check } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import Footer from "./footer";
import Spinner from "./ui/spinner";

interface ExtendedPricingTierProps extends PricingTierProps {
  disabled?: boolean;
  isCustom?: boolean;
}

const PricingTier: React.FC<ExtendedPricingTierProps> = ({
  title,
  prevPrice,
  price,
  description,
  features,
  buttonText,
  isCustom = false,
  isFree = false,
  priceId,
  user,
  index,
  disabled,
  priceUnit = "/month",
}) => {
  const { handleCheckout, isSubmitting } = {
    handleCheckout: () => {},
    isSubmitting: false,
  };

  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadLink, setDownloadLink] = useState<string>();
  const router = useRouter();
  // used to ensure animations run after mount client-side
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleDownload = async (os_type: string) => {
    setIsDownloading(true);
    try {
      const res = await fetch(`/api/download?os_type=${os_type}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) {
        throw Error(res.statusText);
      }

      const download = await res.json();
      if (download?.url) {
        setDownloadLink(download.url);
        router.push(download.url);
      }
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setIsDownloading(false);
    }
  };

  const [buttonWidth, setButtonWidth] = useState<number | null>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (buttonRef.current) {
      setButtonWidth(buttonRef.current.offsetWidth);
    }
  }, []);

  return (
    <Card
      className={`flex h-full w-full flex-col ${index === 1 && "from-primary-600/5 ring-primary-900/40 dark:from-primary-600/5 dark:ring-primary-600/20"}`}
    >
      <div className="flex h-full w-full flex-col">
        <CardHeader className="flex-grow-0 px-6 py-6 pb-0">
          <CardTitle className="text-2xl leading-6 text-primary-700">
            {title}
          </CardTitle>
          <p className="text-base font-normal text-gray-600 sm:text-base md:text-sm">
            {description}
          </p>
        </CardHeader>
        <CardContent className="mt-5 flex flex-grow flex-col px-6">
          {!isCustom ? (
            <div className="flex flex-col items-start justify-center">
              <p
                className="text-2xl text-gray-900 sm:text-3xl"
                aria-label={`Price: $${price} per month`}
              >
                ${price}
                <small className="text-base text-gray-400 sm:text-lg">
                  {priceUnit}
                </small>
              </p>
            </div>
          ) : (
            <div className="flex flex-col items-start justify-center">
              <p
                className="text-2xl text-gray-900 sm:text-3xl"
                aria-label="Price: Free"
              >
                Custom
              </p>
              <p
                className="sm text-base text-gray-400"
                aria-label="Tagline: Start coding"
              >
                A plan designed for your needs.
              </p>
            </div>
          )}

          {features && (
            <ul
              className="mt-5 w-full"
              aria-label={`Features of ${title} plan`}
            >
              {features.map((feature, index) => (
                <li
                  key={index}
                  className="flex items-center py-2 text-gray-600"
                >
                  <Check
                    className="mr-3 h-6 w-6 flex-shrink-0 text-primary-700"
                    aria-hidden="true"
                  />
                  {feature}
                </li>
              ))}
            </ul>
          )}
        </CardContent>
        <CardFooter>
          {isDownloading ? <Spinner className="mb-4 ml-4 border" /> : <></>}
          {disabled ? (
            <Button className="w-full" disabled>
              Coming Soon
            </Button>
          ) : (
            <Button
              className="w-full"
              onClick={() => {}}
              disabled={isSubmitting}
              aria-busy={isSubmitting}
              aria-label={`Subscribe to ${title} plan`}
            >
              {isSubmitting ? "Processing..." : buttonText}
            </Button>
          )}
        </CardFooter>
      </div>
    </Card>
  );
};

const PricingPage: React.FC<PricingPageProps> = ({ user }) => {
  return (
    <section
      className="relative pt-8 sm:pt-12 md:pt-16 lg:pt-24"
      aria-labelledby="pricing-heading"
    >
      <div className="absolute top-0 z-[-1] mt-[-35px] h-[140px] w-full bg-primary-800/30 blur-3xl"></div>
      <div className="mx-auto max-w-7xl px-8 sm:px-6 lg:px-20">
        <div className="flex flex-col items-center space-y-6 sm:space-y-8 md:space-y-6 lg:space-y-6">
          {/* <header className="mx-auto mt-16 max-w-4xl space-y-4 text-center sm:mt-0 sm:space-y-6">
            <h1
              id="pricing-heading"
              className="mt-8 text-4xl font-medium leading-tight sm:text-4xl md:text-4xl lg:text-4xl"
            >
              Launch freely, collaborate seamlessly, scale confidently
            </h1>
          </header> */}
          <header className="mx-auto max-w-4xl pt-20 text-center sm:pt-16 md:pt-12 lg:pt-8">
            <h1
              id="pricing-heading"
              className="bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-3xl font-bold tracking-tight text-transparent dark:from-gray-100 dark:to-gray-400 sm:text-4xl md:text-5xl lg:text-6xl"
            >
              Launch freely, collaborate seamlessly,{" "}
              <span className="text-primary-600">scale confidently</span>
            </h1>
            <p className="mt-4 text-base text-gray-600 dark:text-gray-400 sm:text-lg md:text-xl">
              Choose the plan that best fits your needs
            </p>
          </header>
          <Tabs
            defaultValue="standard"
            className="mt-[20px] flex w-full flex-col items-center"
          >
            <TabsContent
              value="standard"
              className="w-full space-y-6 sm:space-y-8 md:space-y-6 lg:space-y-6"
            >
              {PRICING_TIERS.standard && (
                <div
                  className="mt-[20px] grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-3"
                  role="list"
                >
                  {PRICING_TIERS.standard.map((tier, index) => (
                    <div key={index} role="listitem">
                      <PricingTier
                        {...tier}
                        user={user}
                        index={index}
                        priceUnit="/month/user"
                        disabled
                      />
                    </div>
                  ))}
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </div>
      <Footer />
    </section>
  );
};

export default PricingPage;
