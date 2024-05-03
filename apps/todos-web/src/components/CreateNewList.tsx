"use client";

import { useState } from "react";
import { z } from "zod";

import { reservedListNames } from "@workspace/db-todos/constants";
import { Button } from "@workspace/web-ui/components/Button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@workspace/web-ui/components/Dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  useForm,
  zodResolver,
} from "@workspace/web-ui/components/Form";
import { PlusIcon } from "@workspace/web-ui/components/Icons";
import { Input } from "@workspace/web-ui/components/Input";

import { createList } from "@/actions/lists";
import { CREATE_LIST_MESSAGES } from "@/constants/actions";
import { addList } from "@/stores/todos";
import { arrayIncludes } from "@/utils/arrays";

const formSchema = z.object({
  name: z
    .string()
    .min(2)
    .max(50)
    .refine((slug) => !arrayIncludes(reservedListNames, slug.toLowerCase()), {
      message: "The name you've provided is reserved.",
    }),
});

const CreateNewListForm = ({ closeDialog }: { closeDialog: () => void }) => {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  });

  const handleFormSubmit = form.handleSubmit(async (values) => {
    const result = await createList(values);

    if (result.type === "Error") {
      if (result.message === CREATE_LIST_MESSAGES.RESERVED_NAME_PROVIDED) {
        form.setError("name", { message: result.message });
      } else {
        form.setError("root", { message: result.message });
      }
    } else {
      addList(result.content);
      closeDialog();
    }
  });

  return (
    <Form {...form}>
      <form onSubmit={handleFormSubmit} className="flex flex-col gap-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  placeholder="Choose a unique name"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex flex-row gap-x-2">
          <DialogClose asChild>
            <Button variant="outline" className="w-full">
              Cancel
            </Button>
          </DialogClose>
          <Button type="submit" className="w-full">
            Create
          </Button>
        </div>
      </form>
    </Form>
  );
};

export const CreateNewList = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">
          <PlusIcon className="aspect-square w-5" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create a new List</DialogTitle>
          <DialogDescription>
            The list name should be unique. (Note the list name 'unlisted' is
            reserved).
          </DialogDescription>
        </DialogHeader>
        <CreateNewListForm closeDialog={() => setIsOpen(false)} />
      </DialogContent>
    </Dialog>
  );
};
