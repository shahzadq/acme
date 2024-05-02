import Link from "next/link";

import { ThemeToggle } from "@workspace/web-ui/components/ThemeToggle";

const AppLogo = ({ name }: { name: string }) => (
  <div className="flex flex-row items-center gap-x-1 text-foreground/50">
    <span>acme</span>
    <span>/</span>
    <Link href="/" className="text-foreground">
      {name}
    </Link>
  </div>
);

export const Header = () => {
  return (
    <header className="sticky top-0 z-50 flex w-full flex-row items-center justify-between border-b border-border bg-background/60 px-5 py-4 backdrop-blur">
      <AppLogo name="todos" />
      <div>
        <ThemeToggle />
      </div>
    </header>
  );
};
