import Link from "next/link";

export const AppLogo = ({ name }: { name: string }) => (
  <div className="flex flex-row items-center gap-x-1 text-foreground/50">
    <span>acme</span>
    <span>/</span>
    <Link href="/" className="text-foreground">
      {name}
    </Link>
  </div>
);
