"use client";

import { useEffect, useState } from "react";
import {
  LiveKitRoom,
  VideoConference,
  ControlBar,
} from "@livekit/components-react";
import { Channel } from "@prisma/client";
import { useUser } from "@clerk/nextjs";
import { Loader2, Rss } from "lucide-react";

interface MediaRoomProps {
  chatId: string;
  video: boolean;
  audio: boolean;
}

export const MediaRoom = ({ chatId, video, audio }: MediaRoomProps) => {
  const { user } = useUser();
  const [token, setToken] = useState("");
  useEffect(() => {
    if (!user?.firstName || !user?.lastName) return;
    const name = `${user.firstName} ${user.lastName}`;
    (async () => {
      try {
        const res = await fetch(`/api/livekit?room=${chatId}&username=${name}`);
        const data = await res.json();

        setToken(data.token);
      } catch (err) {
        console.log("MEDIA_ROOM", err);
      }
    })();
  }, [user?.firstName, user?.lastName, chatId]);

  if (token === "") {
    return (
      <div className="flex flex-col flex-1 justify-center items-center">
        <Loader2 className="h-8 w-8 text-zinc-500 animate-spin my-4" />
        <p className="text-xs text-zinc-500 dark:text-zinc-400">Loading...</p>
      </div>
    );
  }

  return (
    <LiveKitRoom
      serverUrl={process.env.NEXT_PUBLIC_LIVEKIT_URL}
      connect={true}
      video={video}
      audio={audio}
      token={token}
      data-lk-theme="default"
      className="w-screen h-full"
    >
      <VideoConference className="w-full" />
    </LiveKitRoom>
  );
};
