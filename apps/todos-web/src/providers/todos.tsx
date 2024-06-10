"use client";

import type { List } from "@workspace/db-todos/types";
import { useEffect, useState } from "react";

import { AnimatePresence, motion } from "@workspace/web-ui/animations";
import { AppLogo } from "@workspace/web-ui/components/AppLogo";
import { cn } from "@workspace/web-ui/utils/cn";

import { setLists } from "@/stores/todos";

export const TodosStoreProvider = ({
  lists,
  children,
}: {
  children: React.ReactNode;
  lists: List[];
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isAnimating, setIsAnimating] = useState(true);

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setLists(lists);
    setIsMounted(true);
  }, [lists]);

  useEffect(() => {
    if (isMounted && !isAnimating) setIsLoading(false);
  }, [isMounted, isAnimating]);

  return (
    <>
      <AnimatePresence>
        {isLoading && (
          <motion.div
            className={cn(
              "fixed bottom-0 left-0 right-0 top-0 z-50 flex flex-col items-center justify-center bg-background",
              !isAnimating && "animate-pulse delay-1000",
            )}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ type: "tween", duration: 0.3 }}
            onAnimationStart={() => {
              setIsAnimating(true);
            }}
            onAnimationComplete={() => {
              setIsAnimating(false);
            }}
          >
            <AppLogo name="todos" />
          </motion.div>
        )}
      </AnimatePresence>
      {!isLoading && (
        <motion.div
          className="flex w-full flex-row"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ type: "tween", duration: 0.3 }}
        >
          {children}
        </motion.div>
      )}
    </>
  );
};
