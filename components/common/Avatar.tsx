import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

interface AvatarProps {
  src: string;
  className?: string;
  fallBack?: string;
}

const AvatarRenderer = ({ src, className, fallBack }: AvatarProps) => {
  return (
    <Avatar className={cn("h-10 w-10", className)}>
      <AvatarImage src={src} />
      <AvatarFallback>{fallBack || "SB"}</AvatarFallback>
    </Avatar>
  );
};

export default AvatarRenderer;
