"use client";

import type { useForm } from "@workspace/web-ui/components/Form";
import { useMemo } from "react";

import { mapKeys } from "@workspace/utils/objects";
import { isString } from "@workspace/utils/typeguards";

export const useExtractFormErrors = <
  T extends ReturnType<typeof useForm>["formState"]["errors"],
>(
  errors: T,
) => {
  const _errors = useMemo(
    () => mapKeys(errors, (_, value) => value?.message).filter(isString),
    [errors],
  );

  return _errors;
};
