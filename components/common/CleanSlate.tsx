import { cn } from "@/lib/utils";
import Image from "next/image";
import React from "react";

interface MessageProp {
  message: string;
  className?: string;
}

const CleanSlate = ({ message, className }: MessageProp) => {
  return (
    <div className={cn("flex content-center h-full py-auto my-0", className)}>
      <div className="w-[60%] h-full p-2 flex content-center">
        <Image
          src={"/freshstart.jpeg"}
          alt="warning sign"
          width={80}
          height={40}
          className="object-cover w-[100%] h-full rounded-md"
        />
      </div>
      <div className="flex content-center py-5">
        <p className="font-bold text-lg flex h-fit my-auto">{message}</p>
      </div>
    </div>
  );
};

export default CleanSlate;
