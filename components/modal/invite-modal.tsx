import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { useModal } from "@/hooks/use-modal-store";
import { CheckCheck, Copy, RefreshCcw } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useOrigin } from "@/hooks/use-origin";
import { Server } from "@prisma/client";
import { useState } from "react";
import axios from "axios";
import { cn } from "@/lib/utils";

interface InviteLink {
  Dataserver: Server;
}
export const InviteModal = () => {
  const { onOpen, isOpen, onClose, type, data } = useModal();
  const origin = useOrigin();
  const { server } = data;
  const [copied, setCopied] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const isModalOpen = isOpen && type === "invite";

  const inviteUrl = `${origin}/invite/${server?.inviteCOde}`;
  const onCopy = () => {
    navigator.clipboard.writeText(inviteUrl);
    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 5000);
  };

  const onNew = async () => {
    try {
      setLoading(true);
      const response = await axios.patch(
        `/api/servers/${server?.id}/invite-code`
      );

      onOpen("invite", { server: response?.data });
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };
  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className="bg-white text-zinc-800 p-0 overflow-hidden">
        <DialogHeader className="pt-8 px-6">
          <DialogTitle className="text-2xl text-center font-bold">
            Invite your Friends
          </DialogTitle>
        </DialogHeader>
        <div className="p-6">
          <Label className="uppercase font-bold text-zinc-500 dark:text-secondary/70">
            Share invite link
          </Label>
          <div className="flex flex-row items-center mt-2 gap-x-2">
            <Input
              disabled={isLoading}
              className="bg-zinc-300/50 border-0 focus-visible:ring-0 text-black focus-visible:ring-offset-0"
              value={inviteUrl}
            />
            <Button size="icon" disabled={isLoading} onClick={onCopy}>
              {copied ? (
                <CheckCheck className="h-4 w-4" />
              ) : (
                <Copy className="w-4 h-4" />
              )}
            </Button>
          </div>
          <Button
            variant="link"
            size="sm"
            className="text-xs text-zinc-500 mt-4"
          >
            <Button onClick={onNew} disabled={isLoading}>
              Gnerate a new link
            </Button>
            <RefreshCcw
              className={cn("w-4 h-4", { "animate-spin": isLoading })}
            />
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
