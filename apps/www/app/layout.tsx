import Header from "@/components/ui/header";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";

import type { Metadata } from "next";
import { AppProvider } from "./app.provider";
import "./css/style.css";
import "./globals.css";

import localFont from "next/font/local";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Souremphi",
  description: "",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} bg-background font-sans tracking-tight text-gray-900 antialiased`}
        suppressHydrationWarning
      >
        <AppProvider>
          <div className="flex min-h-screen flex-col overflow-hidden">
            <Header />
            {children}
            <SpeedInsights />
            <Analytics />
          </div>
        </AppProvider>
      </body>
    </html>
  );
}
