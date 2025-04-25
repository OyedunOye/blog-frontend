import { cn } from "@/lib/utils";
import { Loader } from "lucide-react";
import MaxWidth from "./MaxWidthWrapper";

interface LoadingProps {
  message: string;
  className?: string;
}

const Loading = ({ message, className }: LoadingProps) => {
  return (
    <div
      className={cn(
        "flex items-center justify-center gap-8 bg-transparent",
        className
      )}
    >
      <MaxWidth className="flex flex-col items-center justify-center gap-8 ">
        <Loader className="h-8 w-8 text-black animate-spin" />
        <p className="text-2xl">{message}</p>
      </MaxWidth>{" "}
    </div>
  );
};

export default Loading;
