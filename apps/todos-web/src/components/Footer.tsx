import Link from "next/link";

export const Footer = () => {
  return (
    <footer className="flex w-full items-center border-t border-border px-5 py-4">
      <span className="text-xs text-foreground/50">
        Made by{" "}
        <Link
          href="https://github.com/shahzadq"
          className="text-foreground/75 transition-colors hover:text-foreground"
        >
          ShahzadQ
        </Link>
      </span>
    </footer>
  );
};
