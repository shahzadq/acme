import Link from "next/link";

import { cn } from "../utils/cn";

export const AppLogo = ({ name }: { name?: string }) => (
  <div className="flex flex-row items-center gap-x-1">
    <span
      className={cn(
        typeof name !== "undefined" ? "text-foreground/50" : "text-foreground",
      )}
    >
      acme
    </span>
    {typeof name !== "undefined" && (
      <>
        <span>/</span>
        <Link href="/" className="text-foreground">
          {name}
        </Link>
      </>
    )}
  </div>
);
