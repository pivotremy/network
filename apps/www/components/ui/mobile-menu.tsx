"use client";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { useTheme } from "next-themes";
import Link from "next/link";
import { useEffect, useState } from "react";
import { LogoTextsvg } from "../logoTextsvg";
import { Button } from "./button";

export default function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const MobileNavItem = ({
    href,
    onClick,
    children,
  }: {
    href: string;
    onClick: () => void;
    children: React.ReactNode;
  }) => (
    <li>
      <Link
        href={href}
        className="block rounded-md py-4 text-base font-medium text-foreground"
        onClick={onClick}
      >
        {children}
      </Link>
    </li>
  );

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="rounded-md hover:bg-secondary-300/10"
          aria-label="Open menu"
        >
          <Menu className="h-6 w-6" />
        </Button>
      </SheetTrigger>
      <SheetContent
        side="right"
        className="flex w-[300px] flex-col justify-between sm:w-[400px]"
      >
        <div>
          <SheetHeader className="mb-4">
            <SheetTitle className="text-center">
              <LogoTextsvg />
            </SheetTitle>
          </SheetHeader>
          <nav aria-label="Mobile menu">
            <ul className="space-y-1">
              <MobileNavItem href="/product" onClick={() => setIsOpen(false)}>
                Product
              </MobileNavItem>
              <MobileNavItem
                href="/enterprise"
                onClick={() => setIsOpen(false)}
              >
                Enterprise
              </MobileNavItem>
              <MobileNavItem href="/pricing" onClick={() => setIsOpen(false)}>
                Pricing
              </MobileNavItem>
              <MobileNavItem href="/docs" onClick={() => setIsOpen(false)}>
                Docs
              </MobileNavItem>
            </ul>
          </nav>
        </div>
        <div className="space-y-4 pb-6">
          <div className="flex flex-col gap-2">
            <Link href="/signin" onClick={() => setIsOpen(false)}>
              <Button variant="outline" className="w-full">
                Sign in
              </Button>
            </Link>
            <Link href="/start" onClick={() => setIsOpen(false)}>
              <Button variant="default" className="w-full">
                Start your project
              </Button>
            </Link>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
