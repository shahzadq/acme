import { Inter } from "next/font/google";

import "../../styles/globals.css";

import { cn } from "../..//utils/cn";
import { ThemeProvider } from "../../providers/theme";
import { TooltipProvider } from "../Tooltip";

const sans = Inter({
  weight: ["400", "500", "600", "700", "800"],
  subsets: ["latin"],
  variable: "--font-sans",
});

export const RootLayout = ({
  children,
  className,
  themeProvider,
}: {
  children: React.ReactNode;
  className?: string;
  themeProvider?: Omit<React.ComponentProps<typeof ThemeProvider>, "children">;
}) => {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          sans.variable,
          "flex h-screen flex-row overflow-hidden bg-background font-sans text-foreground antialiased",
          className,
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          {...themeProvider}
        >
          <TooltipProvider>{children}</TooltipProvider>
        </ThemeProvider>
      </body>
    </html>
  );
};
