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
import { Input } from "@/components/ui/input";
import { SidebarGroupAction } from "@/components/ui/sidebar";
import { Label } from "@/components/ui/label";
import { PlusIcon } from "lucide-react";
import { useMutation } from "convex/react";
import { useState } from "react";
import { toast } from "sonner";
import { api } from "../../../../convex/_generated/api";
import { useRouter } from "next/navigation";

export function NewDirectMessage() {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const createDirectMessage = useMutation(api.functions.dm.create);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const id = await createDirectMessage({ username: e.currentTarget.username.value });
      setOpen(false);
      router.push(`/dm/${id}`)
    } catch (error) {
      toast.error("Failed To Send Direct Message", {
        description:
          error instanceof Error ? error.message : "An unknown error occured",
      });
    }
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <SidebarGroupAction>
          <PlusIcon />
          <span className="sr-only">New Direct Message</span>
        </SidebarGroupAction>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>New Direct Message</DialogTitle>
          <DialogDescription>
            Enter a username to start chatting!
          </DialogDescription>
        </DialogHeader>
        <form className="contents" onSubmit={handleSubmit }>
          <div className="flex flex-col gap-1">
            <Label htmlFor="username">Username</Label>
            <Input id="username" type="text" />
          </div>
          <DialogFooter>
            <Button>Start DM</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
