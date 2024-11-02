import { GitHubLogo, LinkedInLogo, TwitterLogo } from "@/components/ui/icons";
import { PricingTierData } from "@/types/pricing";

export const PRICING_TIERS: {
  standard: PricingTierData[];
} = {
  standard: [
    {
      title: "Basic For Developers",
      price: "5",
      prevPrice: "0",
      description: "Perfect for individual users and small businesses",
      isCustom: false,
      features: [
        "Spam protection",
        "End-to-end encryption",
        "API access",
        "SDK development",
        "Ticket Support",
        "No daily limit",
        "30,000 emails / month",
        "Smart Connected Products | IoT Connected Products",
      ],
      buttonText: "Get Started",
      priceId: "",
      index: 1,
    },
    {
      title: "Business",
      price: "6.5",
      prevPrice: "25",
      description: "Ideal for growing businesses with advanced needs",
      isCustom: false,
      features: [
        "25 GB email storage",
        "Priority support",
        "Advanced spam protection",
        "Business signatures",
        "End-to-end encryption",
        "API access",
      ],
      buttonText: "Get Started",
      priceId: "",
      index: 2,
    },
    {
      title: "Enterprise",
      price: "Custom",
      prevPrice: "0",
      isCustom: true,
      description: "Complete solution for large organizations",
      features: [
        "Custom storage",
        "Advanced spam protection",
        "AI integration",
        "Support for multiple custom domains",
        "Business signatures",
        "Advanced administration",
        "End-to-end encryption",
        "Full API access with premium support",
        "Dedicated integration specialist",
      ],
      buttonText: "Contact Us",
      priceId: "",
      index: 3,
    },
  ],
};

export const footerSections = [
  {
    title: "Company",
    links: [
      {
        text: "About Us",
        href: "/about",
      },
      {
        text: "Privacy Policy",
        href: "/privacy",
      },
      {
        text: "App Privacy Policy",
        href: "/privacy-app",
      },
      {
        text: "Terms of Service",
        href: "/terms-of-service",
      },
    ],
  },
  {
    title: "Product",
    links: [
      {
        text: "Documentation",
        href: "/docs",
      },
      {
        text: "Pricing",
        href: "/pricing",
      },
      {
        text: "Blog",
        href: "/blog",
      },

      {
        text: "Changelog",
        href: "/changelog",
      },
    ],
  },
  {
    title: "Support",
    links: [
      {
        text: "FAQ",
        href: "/faq",
      },
      {
        text: "Email",
        href: "mailto:contact@souremphi.com",
      },
      {
        text: "Discord",
        href: "https://discord.gg/7QMraJUsQt",
        target: "_blank",
      },
    ],
  },
];

export const socialMediaLinks = [
  {
    icon: GitHubLogo,
    link: "https://github.com/souremphi",
  },
  {
    icon: TwitterLogo,
    link: "https://x.com/souremphi",
  },
  {
    icon: LinkedInLogo,
    link: "https://www.linkedin.com/company/souremphi",
  },
];
