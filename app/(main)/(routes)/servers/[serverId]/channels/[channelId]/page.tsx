import { ChatHeader } from "@/components/chat/chat-header";
import { db } from "@/lib/db";

import { auth, currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

interface ChannelIdPageProps {
  params: {
    serverId: string;
    channelId: string;
  };
}
const ChannelIdPage = async ({ params }: ChannelIdPageProps) => {
  const { serverId, channelId } = await params;
  const { redirectToSignIn } = await auth();
  const profile = await currentUser();

  if (!profile) {
    return redirectToSignIn();
  }

  const channel = await db.channel.findUnique({
    where: {
      id: channelId,
    },
  });

  const member = await db.member.findFirst({
    where: {
      serverId: serverId,
      profileId: profile.id,
    },
  });
  console.log(serverId, " : ", channelId);
  console.log(member);

  // if (!channel || !member) {
  //   redirect("/");
  //   return null;
  // }

  return (
    <>
      <div className="bg-white dark:bg-[#313338] flex flex-col h-full">
        <ChatHeader />
      </div>
    </>
  );
};

export default ChannelIdPage;