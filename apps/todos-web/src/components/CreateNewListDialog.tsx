"use client";

import { useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@workspace/web-ui/components/Dialog";
import { PlusIcon } from "@workspace/web-ui/components/Icons";
import { SidebarButton } from "@workspace/web-ui/components/Layout/Sidebar";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@workspace/web-ui/components/Tooltip";

import { CreateNewListForm } from "./CreateNewListForm";

export const CreateNewListDialog = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <Tooltip>
        <TooltipTrigger asChild>
          <SidebarButton icon={PlusIcon} onClick={() => setIsOpen(true)} />
        </TooltipTrigger>
        <TooltipContent>Create a new List</TooltipContent>
      </Tooltip>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create a new List</DialogTitle>
          <DialogDescription>
            Each list should have a unique name.
          </DialogDescription>
        </DialogHeader>
        <CreateNewListForm />
      </DialogContent>
    </Dialog>
  );
};
