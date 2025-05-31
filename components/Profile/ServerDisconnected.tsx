import { cn } from "@/lib/utils";
import Image from "next/image";
import React from "react";

interface MessageProp {
  message: string;
  className?: string;
}

const ServerDisconnected = ({ message, className }: MessageProp) => {
  return (
    <div
      className={cn(
        "flex content-center h-84 py-auto gap-2 rounded-sm  shadow-md border w-full",
        className
      )}
    >
      <div className="w-[68%] h-80 p-2 flex  content-center border">
        <Image
          src={"/warning-sign.webp"}
          alt="warning sign"
          width={82}
          height={50}
          className="object-cover w-100 p-3"
        />
      </div>
      <div className="flex  content-center py-5">
        <p className="font-bold h-fit my-auto">{message}</p>
      </div>
    </div>
  );
};

export default ServerDisconnected;
