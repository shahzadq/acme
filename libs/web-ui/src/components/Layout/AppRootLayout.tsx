import { Inter } from "next/font/google";

import "../../styles/globals.css";

import { ThemeProvider } from "../../providers/theme";
import { cn } from "../../utils/cn";
import { TooltipProvider } from "../Tooltip";
import { AppsSidebar } from "./AppsSidebar";

const sans = Inter({
  weight: ["400", "500", "600", "700", "800"],
  subsets: ["latin"],
  variable: "--font-sans",
});

export const AppRootLayout = ({
  children,
  classNames,
}: {
  children: React.ReactNode;
  classNames?: { body?: string; main?: string };
}) => {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          sans.variable,
          "flex min-h-screen flex-row bg-background font-sans text-foreground antialiased",
          classNames?.body,
        )}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <TooltipProvider>
            <AppsSidebar />
            <main
              className={cn(
                "mr-2 mt-2 flex w-full flex-grow flex-col rounded-md rounded-b-none border border-border bg-foreground/[0.02]",
                classNames?.main,
              )}
            >
              {children}
            </main>
          </TooltipProvider>
        </ThemeProvider>
      </body>
    </html>
  );
};
