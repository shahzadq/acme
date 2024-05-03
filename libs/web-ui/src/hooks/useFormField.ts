"use client";

import { useContext } from "react";
import { useFormContext } from "react-hook-form";

import { FormFieldContext } from "../components/Form/Field";
import { FormItemContext } from "../components/Form/Item";

export const useFormField = () => {
  const fieldContext = useContext(FormFieldContext);
  const { id } = useContext(FormItemContext);
  const { getFieldState, formState } = useFormContext();

  if (!fieldContext) {
    throw new Error("useFormField should be used within <FormField>");
  }

  const fieldState = getFieldState(fieldContext.name, formState);

  return {
    id,
    name: fieldContext.name,
    formItemId: `${id}-form-item`,
    formDescriptionId: `${id}-form-item-description`,
    formMessageId: `${id}-form-item-message`,
    ...fieldState,
  };
};
