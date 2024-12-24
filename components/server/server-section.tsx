"use client";

import { ServerWithMemebersWithProfiles } from "@/types";
import { ChannelType, MemberRole, Server } from "@prisma/client";
import { ActionTooltip } from "../action-tooltip";
import { Plus, Settings } from "lucide-react";
import { useModal } from "@/hooks/use-modal-store";

interface ServerSectionProps {
  label: string;
  role?: MemberRole;
  sectionType: "channels" | "members";
  channelType?: ChannelType;
  server?: ServerWithMemebersWithProfiles;
}
export const ServerSection = ({
  label,
  role,
  sectionType,
  channelType,
  server,
}: ServerSectionProps) => {
  const { onOpen } = useModal();
  return (
    <>
      <div className="flex items-center justify-between py-2">
        <p className="text-xs uppercase front-semibold text-zinc-500 dark:text-zinc-400">
          {label}
        </p>
        {role !== MemberRole.GUEST && sectionType === "channels" && (
          <ActionTooltip label="create channel" side="top">
            <button
              onClick={() => onOpen("createChannels")}
              className="text-zinc-500 hover:text-zinc-600 dar:text-zinc-400 dark:hover:text:text-zinc-300"
            >
              <Plus className="w-4 h-4 " />
            </button>
          </ActionTooltip>
        )}
        {role !== MemberRole.ADMIN && sectionType === "members" && (
          <ActionTooltip label="create channel" side="top">
            <button
              onClick={() => onOpen("members", { server })}
              className="text-zinc-500 hover:text-zinc-600 dar:text-zinc-400 dark:hover:text:text-zinc-300"
            >
              <Settings className="w-4 h-4 " />
            </button>
          </ActionTooltip>
        )}
      </div>
    </>
  );
};
