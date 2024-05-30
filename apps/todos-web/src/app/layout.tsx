import { RootLayout } from "@workspace/web-ui/components/Layout/RootLayout";
import { Sidebar } from "@workspace/web-ui/components/Layout/Sidebar";

import { ListMenu } from "@/components/ListMenu";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <RootLayout>
      <Sidebar appName="todos">
        <ListMenu />
      </Sidebar>
      <main>{children}</main>
    </RootLayout>
  );
}
