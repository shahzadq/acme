import { Inter } from "next/font/google";

import "@/app/globals.css";

import { ThemeProvider } from "@workspace/web-ui/providers/theme";
import { cn } from "@workspace/web-ui/utils/cn";

const sans = Inter({
  weight: ["400", "500", "600", "700", "800"],
  subsets: ["latin"],
  variable: "--font-sans",
});

export default function RootLayout(props: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          sans.variable,
          "min-h-screen bg-background font-sans text-foreground antialiased",
        )}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {props.children}
        </ThemeProvider>
      </body>
    </html>
  );
}
