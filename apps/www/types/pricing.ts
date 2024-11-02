export interface PricingTierProps {
  title: string;
  price: string;
  prevPrice?: string;
  description: string;
  features?: string[];
  buttonText?: string;
  isFree?: boolean;
  priceId?: string;
  user: any;
  index: number;
  priceUnit?: string; // Added new field
  isCustom?: boolean;
}

export interface PricingPageProps {
  user: any;
}

export type PricingTierData = Omit<PricingTierProps, "user">;
