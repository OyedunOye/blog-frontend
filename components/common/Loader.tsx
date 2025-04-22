import { cn } from "@/lib/utils";
import { Loader } from "lucide-react";
import MaxWidth from "./MaxWidthWrapper";

interface LoadingProps {
  message: string;
  className?: string;
}

const Loading = ({ message, className }: LoadingProps) => {
  return (
    // <div className="justify-center gap-8 bg-transparent ">
    <div
      className={cn(
        "flex flex-col items-center justify-center max-w-[1366px] gap-8 bg-transparent",
        className
      )}
    >
      <Loader className="h-8 w-8 text-black animate-spin" />
      <p className="text-2xl">{message}</p>
    </div>
    // </div>
  );
};

export default Loading;
