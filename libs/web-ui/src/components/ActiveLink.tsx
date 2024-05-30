"use client";

import type { ComponentProps } from "react";
import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { isUpperCaseMatch } from "@workspace/utils/strings";

export const ActiveLink = ({
  href,
  ...props
}: ComponentProps<typeof Link> & {
  href: string;
}) => {
  const pathname = usePathname();

  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    if (href.startsWith("http") && typeof window !== "undefined")
      setIsActive(isUpperCaseMatch(window.location.href, href));
    else setIsActive(isUpperCaseMatch(pathname, href));
  }, [pathname, href]);

  return <Link href={href} data-active={isActive} {...props} />;
};
