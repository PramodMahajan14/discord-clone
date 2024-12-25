import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";

import { redirect } from "next/navigation";
import React from "react";
import { cn } from "@/lib/utils";
import { ServerSideBar } from "@/components/server/server-sidebar";

const serverIdLayout = async ({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { serverId: string };
}) => {
  const profile = await currentProfile();
  const { serverId } = await params;
  if (!profile) {
    return redirect("/sign-in");
  }

  const server = await db.server.findUnique({
    where: {
      id: serverId,
      members: {
        some: {
          profileId: profile.id,
        },
      },
    },
  });

  if (!server) {
    return redirect("/");
  }
  return (
    <>
      <div className="!hidden sm:!flex h-full w-60 z-20 flex-col fixed inset-y-0">
        <ServerSideBar serverId={serverId} />
      </div>
      <main className="h-full md:pl-60 p-0 ">{children}</main>
    </>
  );
};
export default serverIdLayout;
