import { Inter } from "next/font/google";

import "../../styles/globals.css";

import { cn } from "../..//utils/cn";
import { ThemeProvider } from "../../providers/theme";
import { TooltipProvider } from "../Tooltip";
import { Footer } from "./Footer";
import { Header } from "./Header";

const sans = Inter({
  weight: ["400", "500", "600", "700", "800"],
  subsets: ["latin"],
  variable: "--font-sans",
});

export const RootLayout = ({
  children,
  classNames,
  themeProvider,
  header,
}: {
  children: React.ReactNode;
  classNames?: { body?: string; main?: string };
  themeProvider?: Omit<React.ComponentProps<typeof ThemeProvider>, "children">;
  header?: React.ComponentProps<typeof Header>;
}) => {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          sans.variable,
          "flex min-h-screen flex-col bg-background font-sans text-foreground antialiased",
          classNames?.body,
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          {...themeProvider}
        >
          <TooltipProvider>
            <Header {...header} />
            <main
              className={cn("flex w-full flex-grow flex-col", classNames?.main)}
            >
              {children}
            </main>
            <Footer />
          </TooltipProvider>
        </ThemeProvider>
      </body>
    </html>
  );
};
