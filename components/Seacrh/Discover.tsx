import Link from "next/link";

import { cn } from "@/lib/utils";
import { poppins } from "@/lib/fonts";

import MaxWidth from "../common/MaxWidthWrapper";
import { discoverCategories } from "./data";

const DiscoverCategories = () => {
  return (
    <section className="w-full bg-gray-100 rounded-t-4xl mb-24">
      <MaxWidth className="flex justify-center content-center w-full py-10">
        <div className="flex flex-col justify-center text-center gap-y-4 mb-6">
          <h3
            className={cn(
              "font-semibold text-[#1F2937] text-4xl",
              poppins.className
            )}
          >
            Discover categories
          </h3>
          <p className="text-[#6B7280] text-center">
            Rating based on customer reviews
          </p>
        </div>

        <div className="mt-8 flex items-center gap-8 flex-wrap">
          {discoverCategories.map((category) => (
            <Link
              href={"/"}
              key={category.id}
              className="w-[calc(100%/5.8)] h-[190px] border shadow-lg hover:shadow-xl rounded-2xl relative bg-white flex flex-col items-center justify-center gap-y-4"
            >
              <div className="w-[80px] h-[80px] rounded-full flex items-center justify-center bg-gray-300">
                <category.icon className="w-[70%] h-[70%] text-gray-700" />
              </div>
              <h5
                className={cn(
                  "font-semibold text-[#1F2937] text-lg",
                  poppins.className
                )}
              >
                {category.name}
              </h5>
              <p className={cn("text-[#6B7280] text-sm", poppins.className)}>
                {category.count} Articles
              </p>
            </Link>
          ))}
        </div>
      </MaxWidth>
    </section>
  );
};

export default DiscoverCategories;
