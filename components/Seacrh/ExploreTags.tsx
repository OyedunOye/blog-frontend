import { cn } from "@/lib/utils";
import { poppins } from "@/lib/fonts";

import MaxWidth from "../Home/MaxWidthWrapper";
import Link from "next/link";
import Image from "next/image";
import { exploreTags } from "./data";

const ExploreTags = () => {
  return (
    <MaxWidth className="flex justify-center content-center w-full py-10 mb-24">
      <div className="flex flex-col justify-center text-center gap-y-4 mb-6">
        <h3
          className={cn(
            "font-semibold text-[#1F2937] text-4xl",
            poppins.className
          )}
        >
          Explore Tags
        </h3>
        <p className="text-[#6B7280] text-center">
          286,833 beautiful places to go
        </p>
      </div>

      <div className="mt-8 flex items-center gap-8 flex-wrap">
        {exploreTags.map((tag) => (
          <Link
            href={"/"}
            key={tag.id}
            className="w-[calc(100%/4.4)] h-[144px] border shadow-lg hover:shadow-xl rounded-2xl flex items-center justify-center gap-x-6 relative bg-white"
          >
            <p className="absolute top-2 right-2 bg-gray-200 rounded-full text-sm py-0.5 px-3 text-center">
              {tag.count}
            </p>
            <div>
              <Image
                alt="destination image"
                src={tag.imgSrc}
                className="h-[96px] w-[96px] rounded-full"
              />
            </div>

            <div className={cn("flex flex-col gap-y-1", poppins.className)}>
              <h4 className="font-semibold text-[#1F2937] text-base">
                #{tag.tag}
              </h4>
              <p className="text-sm text-[#6B7280]">19 minutes drive</p>
            </div>
          </Link>
        ))}
      </div>
    </MaxWidth>
  );
};

export default ExploreTags;
