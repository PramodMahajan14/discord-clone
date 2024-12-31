"use client";

import { Member, Profile, Message } from "@prisma/client";
import { ChatWelCome } from "./chat-welcome";
import { useChatQuery } from "@/hooks/use-chat-query";
import { useChatSocket } from "@/hooks/use-chat-socket";
import { Loader2, ServerCrash } from "lucide-react";
import { ElementRef, ElementType, Fragment, useRef } from "react";
import { ChatItem } from "./chat-item";
import { format } from "date-fns";
import { useChatScroll } from "@/hooks/use-chat-scroll";
import { cn } from "@/lib/utils";

interface ChatMessagesProps {
  name: string;
  loginUserId: string;
  member: Member;
  chatId: string;
  apiUrl: string;
  socketUrl: string;
  socketQuery: Record<string, string>;
  paramKey: "channelId" | "conversationId";
  paramValue: string;
  type: "channel" | "conversation";
}

type MessageWithMemberWithProfile = Message & {
  member: Member & {
    profile: Profile;
  };
};

const DATE_FORMAT = "d MMM yyyy, HH:mm";

export const ChatMessages = ({
  name,
  member,
  loginUserId,
  chatId,
  apiUrl,
  socketQuery,
  socketUrl,
  paramKey,
  paramValue,
  type,
}: ChatMessagesProps) => {
  const queryKey = `chat:${chatId}`;
  const addKey = `chat:${chatId}:messages`;
  const updateKey = `chat:${chatId}:messages:update`;
  const chatRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isError,
    error,
    isLoading,
  } = useChatQuery({
    queryKey,
    apiUrl,
    paramKey,
    paramValue,
  });

  useChatSocket({ queryKey, addKey, updateKey });
  useChatScroll({
    chatRef,
    bottomRef,
    loadMore: fetchNextPage,
    shouldLoadMore: !isFetchingNextPage && !!hasNextPage,
    count: data?.pages?.[0]?.items?.length ?? 0,
  });

  if (isLoading) {
    return (
      <div className="flex flex-col flex-1 justify-center items-center">
        <Loader2 className="h-7 w-7 text-zinc-500 animate-spin my-4" />
        <p className="text-xs text-zinc-500 dark:text-zinc-400">
          Loding message
        </p>
      </div>
    );
  }
  if (isError) {
    return (
      <div className="flex flex-col flex-1 justify-center items-center">
        <ServerCrash className="h-10 w-10 text-zinc-500 " />
        <p className="text-xs text-zinc-500 dark:text-zinc-400">Server crash</p>
        <h1>{error?.message}</h1>
      </div>
    );
  }
  return (
    data && (
      <div ref={chatRef} className="flex-1 flex flex-col py-4 overflow-auto ">
        {!hasNextPage && <div className="flex-1" />}
        {!hasNextPage && <ChatWelCome type={type} name={name} />}

        {hasNextPage && (
          <div className="flex justify-center">
            {isFetchingNextPage ? (
              <Loader2 className="h-6 w-6 text-zinc-500 animate-spin my-4" />
            ) : (
              <button
                onClick={() => {
                  fetchNextPage();
                }}
                className="text-zinc-500 hover:text-zinc-400 dark:text-zinc-400 text-xs my-4 dark:hover::text-zinc-300 transition"
              >
                Load previous messages
              </button>
            )}
          </div>
        )}
        <div className={cn("flex flex-col-reverse mt-auto ")}>
          {data?.pages?.map((group, i) => (
            <Fragment key={i}>
              {group?.items?.map((message: MessageWithMemberWithProfile) => (
                <div
                  className={cn(
                    loginUserId === message.member.profile.userId
                      ? "justify-items-end"
                      : " justify-items-start"
                  )}
                >
                  <ChatItem
                    key={message?.id}
                    id={message?.id}
                    currentMember={member}
                    member={message?.member}
                    content={message?.content}
                    fileUrl={message?.fileUrl}
                    deleted={message?.deleted}
                    timestamp={format(
                      new Date(message?.createdAt),
                      DATE_FORMAT
                    )}
                    isUpdated={message?.updatedAt !== message?.createdAt}
                    socketUrl={socketUrl}
                    socketQuery={socketQuery}
                  />
                </div>
              ))}
            </Fragment>
          ))}
        </div>
        <div ref={bottomRef} />
      </div>
    )
  );
};
