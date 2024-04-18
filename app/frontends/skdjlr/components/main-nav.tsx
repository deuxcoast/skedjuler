"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Icons } from "./icons";
import { cn } from "@/utils/reusable-functions";
import { siteConfig } from "@/config/site";

export function MainNav() {
  const pathname = usePathname();

  return (
    <div className="mr-4 hidden md:flex">
      <Link href="/" className="mr-6 flex items-center space-x-2">
        <Icons.logo className="h-6 w-6" />
        <span className="hidden font-bold sm:inline-block">
          {siteConfig.name}
        </span>
      </Link>
      <nav className="flex items-center gap-4 text-sm lg:gap-6">
        <Link
          href="/scheduler"
          className={cn(
            "transition-colors hover:text-foreground/80",
            pathname === "/scheduler"
              ? "text-foreground"
              : "text-foreground/60",
          )}
        >
          Schedule Designer
        </Link>
        <Link
          href="/employees"
          className={cn(
            "transition-colors hover:text-foreground/80",
            pathname?.startsWith("/employees")
              ? "text-foreground"
              : "text-foreground/60",
          )}
        >
          Employees
        </Link>
        <Link
          href="/templates"
          className={cn(
            "transition-colors hover:text-foreground/80",
            pathname?.startsWith("/templates")
              ? "text-foreground"
              : "text-foreground/60",
          )}
        >
          Templates
        </Link>
      </nav>
    </div>
  );
}
