import { PlusIcon } from "@workspace/web-ui/components/Icons";
import { RootLayout } from "@workspace/web-ui/components/Layout/RootLayout";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarFooterButton,
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
              <SidebarFooterButton icon={PlusIcon} />
            </TooltipTrigger>
            <TooltipContent>Create new List</TooltipContent>
          </Tooltip>
        </SidebarFooter>
      </Sidebar>
      <main>{children}</main>
    </RootLayout>
  );
}
