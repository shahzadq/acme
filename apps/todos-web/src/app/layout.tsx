import { db } from "@workspace/db-todos";
import { Main } from "@workspace/web-ui/components/Layout/Main";
import { RootLayout } from "@workspace/web-ui/components/Layout/RootLayout";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
} from "@workspace/web-ui/components/Layout/Sidebar";

import { CreateNewListDialog } from "@/components/CreateNewListDialog";
import { ListMenu } from "@/components/ListMenu";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const lists = await db.query.listTable.findMany();

  return (
    <RootLayout>
      <Sidebar>
        <SidebarHeader appName="todos" />
        <SidebarContent>
          <ListMenu lists={lists} />
        </SidebarContent>
        <SidebarFooter>
          <CreateNewListDialog />
        </SidebarFooter>
      </Sidebar>
      <Main>{children}</Main>
    </RootLayout>
  );
}
