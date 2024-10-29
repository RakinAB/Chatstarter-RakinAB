
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { useMutation } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { useState } from "react";

export function AddFriend() {
  const [open, setOpen] = useState(false);
  const createFriendRequest = useMutation(
    api.functions.friend.createFriendRequest
  );

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await createFriendRequest({ username: e.currentTarget.username.value });
      toast.success("Friend Request Sent");
      setOpen(false);
    } catch (error) {
      toast.error("Failed To Send Friend Request", {
        description:
          error instanceof Error ? error.message : "An unknown error occured",
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size={"sm"}>Add Friend</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Friend</DialogTitle>

          <DialogDescription>
            Add a friend by entering their username
          </DialogDescription>
        </DialogHeader>
        <form className="contents" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-1">
            <Label htmlFor="username">Username</Label>
            <Input id="username" type="text" />
          </div>
          <DialogFooter>
            <Button>Send</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
