"use client";

import type { useForm } from "@workspace/web-ui/components/Form";
import { useMemo } from "react";

export const useIsFormLoading = <
  T extends ReturnType<typeof useForm>["formState"],
>(
  params: T,
) => {
  const isLoading = useMemo(
    () => params.isLoading || params.isSubmitting || params.isValidating,
    [params],
  );

  return isLoading;
};
