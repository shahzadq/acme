"use client";

import { z } from "zod";

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

export const CreateNewListForm = () => {
  const formSchema = z.object({
    name: z.string().min(2).max(50),
  });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  });

  const isLoading = useIsFormLoading(form.formState);
  const errors = useExtractFormErrors(form.formState.errors);

  const handleFormSubmit = form.handleSubmit((values) => {
    console.log(values);
  });

  return (
    <Form {...form}>
      <form onSubmit={handleFormSubmit} className="flex flex-col gap-y-4">
        <FormField
          control={form.control}
          name="name"
          render={(params) => (
            <FormItem>
              <FormControl>
                <FormInput
                  type="text"
                  placeholder="Choose a unique name"
                  {...params}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormErrorsList errors={errors} />
        <Button type="submit" isLoading={isLoading}>
          Create
        </Button>
      </form>
    </Form>
  );
};
