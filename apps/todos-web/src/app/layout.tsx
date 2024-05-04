import { Inter } from "next/font/google";

import "@/app/globals.css";

import { ThemeProvider } from "@workspace/web-ui/providers/theme";
import { cn } from "@workspace/web-ui/utils/cn";

import { CreateNewTodoForm } from "@/components/CreateNewTodoForm";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { ListMenu } from "@/components/ListMenu";
import { TodosStoreProvider } from "@/components/TodosStoreProvider";

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
          "flex min-h-screen flex-col bg-background font-sans text-foreground antialiased",
        )}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Header />
          <TodosStoreProvider>
            <main className="flex w-full flex-grow flex-row">
              <ListMenu />
              <div className="flex w-full flex-col gap-y-4">
                <div className="h-full px-5 pt-4">{props.children}</div>
                <div className="border-t border-border px-5 py-4">
                  <CreateNewTodoForm />
                </div>
              </div>
            </main>
          </TodosStoreProvider>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
