"use client";

import { MemberRole, Server, ChannelType, Channel } from "@prisma/client";

interface ServerChannelProps {
  channel: string;
  server?: Server;
  role?: MemberRole;
}
export const ServerChannel = ({
  channel,
  server,
  role,
}: ServerChannelProps) => {
  return <div>Server Channel</div>;
};
