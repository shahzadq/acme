"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import { PanelLeftCloseIcon, PanelLeftOpenIcon } from "../../Icons";
import { Tooltip, TooltipContent, TooltipTrigger } from "../../Tooltip";
import { SidebarButton } from "./Button";

export const Sidebar = ({ children }: { children: React.ReactNode }) => {
  const [isOpen, setIsOpen] = useState(true);
  const [firstLoad, setFirstLoad] = useState(true);

  return (
    <div className="flex flex-col gap-y-4 px-5 py-4">
      <div className="flex flex-row gap-x-3">
        <Tooltip>
          <TooltipTrigger asChild>
            <SidebarButton
              icon={isOpen ? PanelLeftCloseIcon : PanelLeftOpenIcon}
              onClick={() => {
                setIsOpen(!isOpen);
                setFirstLoad(false);
              }}
              size="sm"
            />
          </TooltipTrigger>
          <TooltipContent>{isOpen ? "Close" : "Open"} Sidebar</TooltipContent>
        </Tooltip>
      </div>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="h-full overflow-hidden"
            initial={firstLoad ? false : { width: 0 }}
            animate={{ width: 192 }}
            exit={{ width: 0 }}
            transition={{
              type: "tween",
              duration: 0.2,
            }}
          >
            <motion.div
              className="flex h-full w-48 flex-col gap-y-4"
              initial={firstLoad ? false : { opacity: 0, x: -200 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -200 }}
              transition={{
                type: "tween",
                duration: 0.25,
              }}
            >
              {children}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
