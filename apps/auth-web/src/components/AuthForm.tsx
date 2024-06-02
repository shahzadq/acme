"use client";

import type { RequireKeys, StringKeyOf } from "@workspace/types/objects";
import type { Input } from "@workspace/web-ui/components/Input";
import type { z } from "zod";

import { mapKeys } from "@workspace/utils/objects";
import { Button } from "@workspace/web-ui/components/Button";
import {
  Form,
  FormControl,
  FormErrorsList,
  FormField,
  FormInput,
  FormItem,
  useForm,
  zodResolver,
} from "@workspace/web-ui/components/Form";
import { useExtractFormErrors } from "@workspace/web-ui/hooks/useExtractFormErrors";
import { useIsFormLoading } from "@workspace/web-ui/hooks/useIsFormLoading";

export const AuthForm = <
  S extends z.ZodObject<z.ZodRawShape>,
  I extends z.infer<S>,
  K extends StringKeyOf<I>,
>({
  schema,
  inputs,
  onSubmit,
}: {
  schema: S;
  inputs: Record<
    K,
    RequireKeys<React.ComponentProps<typeof Input>, "type" | "placeholder">
  >;
  onSubmit: (
    values: I,
    options: {
      setError: (message: string, on?: "root" | K) => void;
    },
  ) => Promise<void> | void;
}) => {
  const form = useForm({
    resolver: zodResolver(schema),
  });

  const isLoading = useIsFormLoading(form.formState);
  const errors = useExtractFormErrors(form.formState.errors);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit((v) =>
          onSubmit(v as I, {
            setError: (message, on = "root") => form.setError(on, { message }),
          }),
        )}
        className="flex w-full flex-col gap-y-6"
      >
        {mapKeys(inputs, (key, input) => (
          <FormField
            key={key}
            control={form.control}
            name={key}
            render={(params) => (
              <FormItem>
                <FormControl>
                  <FormInput {...input} {...params} />
                </FormControl>
              </FormItem>
            )}
          />
        ))}
        <FormErrorsList errors={errors} />
        <Button type="submit" isLoading={isLoading} disabled={isLoading}>
          Next
        </Button>
      </form>
    </Form>
  );
};
