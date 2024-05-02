"use cilent";

import { Button } from "@workspace/web-ui/components/Button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@workspace/web-ui/components/Dialog";
import { PlusIcon } from "@workspace/web-ui/components/Icons";
import { Input } from "@workspace/web-ui/components/Input";

export const CreateNewList = () => {
  return (
    <Dialog>
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
        <form className="flex flex-col gap-y-2">
          <Input type="text" placeholder="Choose a name" />
          <Button type="submit" className="w-full" disabled>
            Create
          </Button>
        </form>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline" className="w-full">
              Cancel
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
