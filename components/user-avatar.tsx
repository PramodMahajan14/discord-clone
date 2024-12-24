import { cn } from "@/lib/utils";
import { AvatarFallback, Avatar, AvatarImage } from "./ui/avatar";

interface UserAvatarProps {
  src?: string;
  className?: string;
}
export const UserAvatar = ({ src, className }: UserAvatarProps) => {
  return (
    <Avatar className={cn("h-8 w-8 md:h-10 md:w-10", className)}>
      <AvatarImage src={src} alt="profile" />
      <AvatarFallback></AvatarFallback>
    </Avatar>
  );
};
