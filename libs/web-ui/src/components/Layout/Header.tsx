import { AppLogo } from "../AppLogo";

export const Header = ({ appName }: { appName?: string }) => {
  return (
    <header className="sticky top-0 z-50 flex w-full flex-row items-center justify-between border-b border-border bg-background/60 px-5 py-2 backdrop-blur">
      <AppLogo name={appName} />
    </header>
  );
};
