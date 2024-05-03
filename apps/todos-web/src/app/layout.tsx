import { Inter } from "next/font/google";

import "@/app/globals.css";

import { db } from "@workspace/db-todos";
import { ThemeProvider } from "@workspace/web-ui/providers/theme";
import { cn } from "@workspace/web-ui/utils/cn";

import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { ListMenu } from "@/components/ListMenu";
import { WithTodosStore } from "@/components/withTodosStore";

const sans = Inter({
  weight: ["400", "500", "600", "700", "800"],
  subsets: ["latin"],
  variable: "--font-sans",
});

export default async function RootLayout(props: { children: React.ReactNode }) {
  const todos = await db.query.listTable.findMany({
    with: { todos: true },
  });

  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          sans.variable,
          "flex min-h-screen flex-col bg-background font-sans text-foreground antialiased",
        )}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Header />
          <WithTodosStore todos={todos}>
            <main className="flex w-full flex-grow flex-row">
              <ListMenu />
              <div className="w-full px-5 py-4">{props.children}</div>
            </main>
          </WithTodosStore>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
