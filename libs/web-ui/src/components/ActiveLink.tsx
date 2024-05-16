"use client";

import type { ComponentProps } from "react";
import { useMemo } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "../utils/cn";

export const ActiveLink = ({
  href,
  className,
  ...props
}: ComponentProps<typeof Link>) => {
  const pathname = usePathname();

  const isActive = useMemo(() => {
    if (pathname.toLowerCase() === href.toString().toLowerCase()) {
      return true;
    }
    return false;
  }, [pathname, href]);

  return (
    <Link
      href={href}
      className={cn(className, isActive && "active")}
      {...props}
    />
  );
};
