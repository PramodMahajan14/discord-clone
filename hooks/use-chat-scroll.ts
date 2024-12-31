import { useEffect, useState } from "react";

type ChatScrollProps = {
  chatRef: React.RefObject<HTMLDivElement | null>;
  bottomRef: React.RefObject<HTMLDivElement | null>;
  shouldLoadMore: boolean;
  loadMore: () => void;
  count: number;
};

export const useChatScroll = ({
  chatRef,
  bottomRef,
  shouldLoadMore,
  loadMore,
  count,
}: ChatScrollProps) => {
  const [hasInitialized, sethasInitialized] = useState(false);

  useEffect(() => {
    const topDiv = chatRef?.current;
    const handleScroll = () => {
      const scrollTop = topDiv?.scrollTop;

      if (scrollTop === 0 && shouldLoadMore) {
        loadMore();
      }
    };

    topDiv?.addEventListener("scroll", handleScroll);

    return () => {
      if (topDiv) {
        topDiv.removeEventListener("scroll", handleScroll);
      }
    };
  }, [shouldLoadMore, loadMore, chatRef]);

  useEffect(() => {
    const bottomDiv = bottomRef?.current;
    const topDiv = chatRef?.current;

    const shoulAutoScroll = () => {
      if (!hasInitialized && bottomDiv) {
        sethasInitialized(true);
        return true;
      }

      if (!topDiv) {
        return false;
      }
      const distanceFormBottom =
        topDiv.scrollHeight - topDiv.scrollHeight - topDiv.clientHeight;
      return distanceFormBottom <= 100;
    };

    if (shoulAutoScroll()) {
      setTimeout(() => {
        if (bottomRef?.current) {
          bottomRef?.current.scrollIntoView({
            behavior: "smooth",
          });
        }
      }, 100);
    }
  }, [bottomRef, chatRef, count, hasInitialized]);
};
