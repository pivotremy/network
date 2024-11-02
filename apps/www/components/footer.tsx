import { socialMediaLinks } from "@/utils/constants";
import Link from "next/link";
import { Button } from "./ui/button";

export default function Footer() {
  return (
    <footer className="mx-auto mt-48 w-full max-w-screen-xl px-4 sm:px-6">
      <div className="flex flex-col items-center justify-between gap-2.5 border-t py-3.5 text-neutral-500 dark:text-neutral-400 sm:flex-row-reverse">
        {/* Social media links */}
        <div className="-mr-2 flex items-center gap-1">
          {socialMediaLinks.map(({ icon: Icon, link }) => (
            <Button
              key={link}
              variant="ghost"
              size="icon"
              className="rounded-full"
            >
              <Link href={link} target="_blank" rel="noopener noreferrer">
                <Icon className="h-5 w-5" />
              </Link>
            </Button>
          ))}
        </div>

        {/* Copyright */}
        <span className="text-sm">
          &copy; {new Date().getFullYear()} Souremφ - All rights reserved.
        </span>
      </div>
    </footer>
  );
}
