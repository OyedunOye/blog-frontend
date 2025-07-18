import { cn } from "@/lib/utils";
import Image from "next/image";
import React from "react";

interface MessageProp {
  message: string;
  className?: string;
}

const NoServerConnectionWarning = ({ message, className }: MessageProp) => {
  return (
    <div
      className={cn(
        "flex content-center h-full py-auto my-4 max-md:flex-col",
        className
      )}
    >
      <div className="w-[30%] max-lg:w-[50%] p-2 flex content-center">
        <Image
          src={"/warning-sign.webp"}
          alt="warning sign"
          width={45}
          height={40}
          className="object-cover w-[68%] max-lg:w-full p-3 lg:w-full"
        />
      </div>
      <div className="flex content-center py-5">
        <p className="font-bold text-2xl max-md:text-lg flex h-fit my-auto">
          {message}
        </p>
      </div>
    </div>
  );
};

export default NoServerConnectionWarning;
