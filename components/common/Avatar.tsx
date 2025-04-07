import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface AvatarProps {
  src: string;
}

const AvatarRenderer = ({ src }: AvatarProps) => {
  return (
    <Avatar className="h-10 w-10">
      <AvatarImage src={src} />
      <AvatarFallback>SB</AvatarFallback>
    </Avatar>
  );
};

export default AvatarRenderer;
