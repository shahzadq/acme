// import { db } from "@workspace/db-todos";
import type { List } from "@workspace/db-todos/types";

import { Main } from "@workspace/web-ui/components/Layout/Main";
import { RootLayout } from "@workspace/web-ui/components/Layout/RootLayout";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
} from "@workspace/web-ui/components/Layout/Sidebar";

import { ListMenu } from "@/components/ListMenu";
import { TodosStoreProvider } from "@/providers/todos";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  // const lists = await db.query.listTable.findMany();
  const lists = [
    { name: "Home", id: "1", userId: "1", createdAt: new Date() },
    {
      name: "School",
      id: "2",
      userId: "1",
      createdAt: new Date(),
    },
  ] as List[];

  return (
    <RootLayout>
      <TodosStoreProvider lists={lists}>
        <Sidebar>
          <SidebarHeader appName="todos" />
          <SidebarContent>
            <ListMenu />
          </SidebarContent>
          <SidebarFooter />
        </Sidebar>
        <Main>{children}</Main>
      </TodosStoreProvider>
    </RootLayout>
  );
}
