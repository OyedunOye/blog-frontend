import { cn } from "@/lib/utils";
import React, { ReactNode } from "react";

interface MaxWidthProps {
  children: ReactNode;
  className?: string;
}

const MaxWidth = ({ children, className }: MaxWidthProps) => {
  return (
    <div className="justify-center flex">
      <div
        className={cn(
          "max-w-[1366px] flex flex-col px-16 max-md:px-5 max-lg:px-10",
          className
        )}
      >
        {children}
      </div>
    </div>
  );
};

export default MaxWidth;
