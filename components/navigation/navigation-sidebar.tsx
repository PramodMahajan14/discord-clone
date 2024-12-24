import { currentProfile } from "@/lib/current-profile";
import { ModeToggle } from "@/components/mode-toggle";
import { SignOutButton, UserButton, SignInButton } from "@clerk/nextjs";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import NavigationAction from "@/components/navigation/navigation-action";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { NavigationItem } from "@/components/navigation/navigation-items";
import { LogOut } from "lucide-react";
import { ActionTooltip } from "../action-tooltip";

const NavigationSidebar = async () => {
  const profile = await currentProfile();

  if (!profile) {
    return redirect("/");
  }

  const servers = await db.server.findMany({
    where: {
      members: {
        some: {
          profileId: profile.id,
        },
      },
    },
  });

  return (
    <div className="flex flex-col space-y-4  items-center h-full text-primary w-full  dark:bg-[#1E1F22] py-3">
      <NavigationAction />
      <Separator className="h-[2px] bg-zinc-300 dark:bg-zinc-700 rounded-md w-10 mx-auto" />

      <ScrollArea className="flex-1 w-full">
        {servers.map((server) => (
          <div key={server.id} className="mb-4">
            <NavigationItem
              id={server?.id}
              name={server?.name}
              imageUrl={server?.imageUrl}
            />
          </div>
        ))}
      </ScrollArea>

      <div className=" pb-3 mt-auto flex items-center flex-col gap-y-4">
        <ModeToggle />
        <UserButton />
        <ActionTooltip side="right" align="center" label="Logout">
          <SignOutButton redirectUrl="/">
            <LogOut className="cursor-pointer" />
          </SignOutButton>
        </ActionTooltip>
      </div>
    </div>
  );
};

export default NavigationSidebar;