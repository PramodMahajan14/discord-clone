"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { useModal } from "@/hooks/use-modal-store";
import { ServerWithMemebersWithProfiles } from "@/types";

import { MemberRole, Server } from "@prisma/client";
import { ScrollArea } from "@/components/ui/scroll-area";
import { UserAvatar } from "@/components/user-avatar";
import {
  Check,
  Gavel,
  Loader2,
  MoreVertical,
  Shield,
  ShieldAlert,
  ShieldCheck,
  ShieldQuestion,
} from "lucide-react";
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuTrigger,
  DropdownMenuSubTrigger,
} from "@/components/ui/dropdown-menu";
import qs from "query-string";
import axios from "axios";
import { useRouter } from "next/navigation";

const roleIconMap = {
  GUEST: null,
  MODERATOR: <ShieldCheck className="h-4 w-4 ml-2 text-indigo-500" />,
  ADMIN: <ShieldAlert className="h-4 w-4 text-rose-500" />,
};
export const MembersModal = () => {
  const { onOpen, isOpen, onClose, type, data } = useModal();
  const [loadingId, setLoadingId] = useState("");
  const { server } = data as { server: ServerWithMemebersWithProfiles };
  const router = useRouter();

  const isModalOpen = isOpen && type === "members";

  const onKick = async (memberId: string) => {
    try {
      setLoadingId(memberId);
      const url = qs.stringifyUrl({
        url: `/api/members/${memberId}`,
        query: {
          serverId: server?.id,
        },
      });

      const response = await axios.delete(url);
      router.refresh();
      onOpen("members", { server: response.data });
      setLoadingId(memberId);
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingId("");
    }
  };

  const onRowChange = async (memberId: string, role: MemberRole) => {
    try {
      setLoadingId(memberId);
      const url = qs.stringifyUrl({
        url: `/api/members/${memberId}`,
        query: {
          serverId: server?.id,
        },
      });

      const response = await axios.patch(url, { role });
      router.refresh();
      onOpen("members", { server: response?.data });
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingId("");
    }
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className="bg-white text-zinc-800  overflow-hidden">
        <DialogHeader className="pt-8 px-6">
          <DialogTitle className="text-2xl text-center font-bold">
            Manage Members
          </DialogTitle>
          <DialogDescription className="text-center text-zinc-800">
            {server?.members?.length} members
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className="mt-8  pr-6">
          {server?.members?.map((member) => (
            <div key={member.id} className="flex items-center gap-x-2 mb-6">
              <UserAvatar src={member?.profile?.imageUrl} />
              <div className="flex flex-col gap-y-1">
                <div className="text-sm font-semibold flex items-center gap-x-1">
                  {member?.profile?.name}
                  {roleIconMap[member?.role]}
                </div>
                <p className="text-xs text-zinc-500">
                  {member?.profile?.email}
                </p>
              </div>
              {server?.profileId !== member?.profileId &&
                loadingId !== member?.id && (
                  <div className="ml-auto">
                    <DropdownMenu>
                      <DropdownMenuTrigger>
                        <MoreVertical className="h-4 w-4 text-zinc-500" />
                      </DropdownMenuTrigger>
                      <DropdownMenuContent side="left">
                        <DropdownMenuSub>
                          <DropdownMenuSubTrigger className="flex items-center">
                            <ShieldQuestion className="h-4 w-2 mr-2" />
                            <span>Role</span>
                          </DropdownMenuSubTrigger>
                          <DropdownMenuPortal>
                            <DropdownMenuSubContent>
                              <DropdownMenuItem
                                onClick={() => onRowChange(member.id, "GUEST")}
                              >
                                <Shield className="w-4 h-4 mr-2" />
                                Guest
                                {member.role === "GUEST" && (
                                  <Check className="w-4 h-2 ml-auto" />
                                )}
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() =>
                                  onRowChange(member.id, "MODERATOR")
                                }
                              >
                                <ShieldCheck className="w-4 h-4 mr-2" />
                                Moderator
                                {member.role === "MODERATOR" && (
                                  <Check className="w-4 h-2 ml-auto" />
                                )}
                              </DropdownMenuItem>
                            </DropdownMenuSubContent>
                          </DropdownMenuPortal>
                        </DropdownMenuSub>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => onKick(member.id)}>
                          <Gavel className="h-4 w-4 mr-2" />
                          Kick
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                )}

              {loadingId === member.id && (
                <Loader2 className="animate-spin text-zinc-500 w-4 h-4 ml-auto" />
              )}
            </div>
          ))}
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};
