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

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <RootLayout>
      <Sidebar>
        <SidebarHeader appName="todos" />
        <SidebarContent>
          <ListMenu />
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
