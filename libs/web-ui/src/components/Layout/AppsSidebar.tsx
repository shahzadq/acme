import type { LucideIcon } from "lucide-react";

import { ActiveLink } from "../ActiveLink";
import {
  LayoutDashboardIcon,
  ListTodoIcon,
  LogOutIcon,
  MessagesSquareIcon,
  NotebookPenIcon,
} from "../Icons";
import { Tooltip, TooltipContent, TooltipTrigger } from "../Tooltip";

const AppLink = ({
  icon: Icon,
  tooltip,
  ...props
}: {
  href: string;
  icon: LucideIcon;
  tooltip: string;
}) => (
  <Tooltip>
    <TooltipTrigger>
      <ActiveLink
        className="opacity-50 transition-colors hover:opacity-100 data-[active=true]:opacity-100"
        {...props}
      >
        <Icon className="size-5" />
      </ActiveLink>
    </TooltipTrigger>
    <TooltipContent side="right">{tooltip}</TooltipContent>
  </Tooltip>
);

const Section = (props: { children: React.ReactNode }) => (
  <div className="flex flex-col items-center gap-y-4" {...props} />
);

export const AppsSidebar = () => (
  <div className="flex flex-col items-center justify-between p-4">
    <Section>
      <AppLink
        href="http://localhost:3002/"
        icon={LayoutDashboardIcon}
        tooltip="Dashboard"
      />
      <AppLink
        href="http://localhost:3000/"
        icon={ListTodoIcon}
        tooltip="Todos"
      />
      <AppLink
        href="http://localhost:3003/"
        icon={MessagesSquareIcon}
        tooltip="Chat"
      />
      <AppLink
        href="http://localhost:3004/"
        icon={NotebookPenIcon}
        tooltip="Notes"
      />
    </Section>
    <Section>
      <AppLink
        href="http://localhost:3001/signout"
        icon={LogOutIcon}
        tooltip="Sign Out"
      />
    </Section>
  </div>
);
