import { db } from "@workspace/db-todos";
import { PlusIcon } from "@workspace/web-ui/components/Icons";
import { Main } from "@workspace/web-ui/components/Layout/Main";
import { RootLayout } from "@workspace/web-ui/components/Layout/RootLayout";
import {
  Sidebar,
  SidebarButton,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
} from "@workspace/web-ui/components/Layout/Sidebar";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@workspace/web-ui/components/Tooltip";

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
          <Tooltip>
            <TooltipTrigger asChild>
              <SidebarButton icon={PlusIcon} />
            </TooltipTrigger>
            <TooltipContent>Create new List</TooltipContent>
          </Tooltip>
        </SidebarFooter>
      </Sidebar>
      <Main>{children}</Main>
    </RootLayout>
  );
}
