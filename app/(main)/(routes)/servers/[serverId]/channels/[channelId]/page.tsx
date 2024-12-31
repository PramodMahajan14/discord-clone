import { ChatHeader } from "@/components/chat/chat-header";
import { ChatInput } from "@/components/chat/chat-input";
import { ChatMessages } from "@/components/chat/chat-messages";
import { MediaRoom } from "@/components/media-room";
import { db } from "@/lib/db";

import { auth, currentUser } from "@clerk/nextjs/server";
import { ChannelType } from "@prisma/client";
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
      // profileId: profile.id,
    },
  });

  // if (!channel || !member) {
  //   redirect("/");
  //   return null;
  // }
  console.log(channel?.type);
  return (
    <>
      <div className="bg-white dark:bg-[#313338] flex flex-col h-full">
        {!channel && <p>Loading channel data...</p>}
        {channel && (
          <>
            <ChatHeader
              name={channel.name}
              serverId={channel.serverId}
              type="channel"
            />

            {channel.type === ChannelType.TEXT && (
              <>
                {member ? (
                  <ChatMessages
                    loginUserId={profile?.id}
                    member={member}
                    name={channel.name}
                    type="channel"
                    apiUrl="/api/messages"
                    socketUrl="/api/socket/messages"
                    socketQuery={{
                      channelId: channel.id,
                      serverId: channel.serverId,
                    }}
                    paramKey="channelId"
                    paramValue={channel.id}
                    chatId={channel.id}
                  />
                ) : (
                  <p>Loading member data...</p>
                )}

                <ChatInput
                  type="channel"
                  apiUrl="/api/socket/messages"
                  name={channel.name}
                  query={{
                    channelId: channel?.id,
                    serverId: channel?.serverId,
                  }}
                />
              </>
            )}
          </>
        )}

        {channel?.type === ChannelType.AUDIO && (
          <MediaRoom chatId={channel.id} video={false} audio={true} />
        )}

        {channel?.type === ChannelType.VIDEO && (
          <MediaRoom chatId={channel.id} video={true} audio={true} />
        )}
      </div>
    </>
  );
};

export default ChannelIdPage;
