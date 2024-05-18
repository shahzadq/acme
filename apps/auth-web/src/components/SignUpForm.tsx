"use client";

import Link from "next/link";
import { z } from "zod";

import { Button } from "@workspace/web-ui/components/Button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  useForm,
  zodResolver,
} from "@workspace/web-ui/components/Form";
import { TriangleAlertIcon } from "@workspace/web-ui/components/Icons";
import { Input } from "@workspace/web-ui/components/Input";
import { cn } from "@workspace/web-ui/utils/cn";

export const SignUpForm = () => {
  const form = useForm({
    resolver: zodResolver(
      z.object({
        name: z.string().min(2).max(50),
        email: z.string().email(),
      }),
    ),
    defaultValues: {
      name: "",
      email: "",
    },
  });

  const handleFormSubmit = form.handleSubmit(async (values) => {});

  return (
    <Form {...form}>
      <form
        onSubmit={handleFormSubmit}
        className="flex w-full flex-col gap-y-6"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field, fieldState }) => (
            <FormItem>
              <FormControl>
                <Input
                  type="text"
                  placeholder="Name"
                  className={cn(
                    fieldState.error &&
                      "border-red-500 focus-visible:ring-red-500",
                  )}
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field, fieldState }) => (
            <FormItem>
              <FormControl>
                <Input
                  type="email"
                  placeholder="Email Address"
                  className={cn(
                    fieldState.error &&
                      "border-red-500 focus-visible:ring-red-500",
                  )}
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />
        {(form.formState.errors.email ??
          form.formState.errors.name ??
          form.formState.errors.root) && (
          <div className="flex flex-row items-center gap-x-2 text-sm text-red-500">
            <TriangleAlertIcon className="size-4" />
            {form.formState.errors.email?.message ??
              form.formState.errors.name?.message ??
              form.formState.errors.root?.message}
          </div>
        )}
        <div className="flex flex-col gap-y-4">
          <Button type="submit" isLoading={form.formState.isLoading}>
            Next
          </Button>
          <Link
            href="/signin"
            className="text-center text-sm font-medium text-blue-500"
          >
            Sign In
          </Link>
        </div>
      </form>
    </Form>
  );
};
