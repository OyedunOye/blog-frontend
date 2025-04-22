import Image from "next/image";
import Link from "next/link";

import { cn } from "@/lib/utils";
import { poppins } from "@/lib/fonts";

import MaxWidth from "../common/MaxWidthWrapper";
import { exploreAuthors } from "./data";

const ExploreAuthors = () => {
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
            Explore Authors
          </h3>
          <p className="text-[#6B7280] text-center">
            286,833 beautiful places to go
          </p>
        </div>

        <div className="mt-8 flex items-center gap-8 flex-wrap">
          {exploreAuthors.map((author) => (
            <Link
              href={"/"}
              key={author.id}
              className="w-[calc(100%/5.8)] h-[287px] border shadow-lg hover:shadow-xl rounded-2xl relative bg-white"
            >
              <div className="relative">
                <Image
                  src={author.authorHero}
                  alt="Author Hero Image"
                  className="rounded-t-2xl h-[calc(287px/1.8)] object-cover w-full"
                />

                <p className="absolute top-3 left-3 bg-white rounded-full text-sm py-0.5 px-3 text-center">
                  {author.followers}
                </p>

                <Image
                  src={author.authorImageSrc}
                  alt="Author Profile Image"
                  className="rounded-full h-[60px] w-[60px] object-cover absolute left-1/2 -translate-x-1/2 -bottom-8 border-4 border-white"
                />
              </div>
              <div
                className={cn(
                  "flex flex-col absolute bottom-5 left-1/2 -translate-x-1/2 text-center",
                  poppins.className
                )}
              >
                <h5 className="text-[#1F2937] font-medium text-base w-full">
                  {author.name}
                </h5>
                <p className="text-xs text-[#6B7280]">{author.email}</p>
              </div>
            </Link>
          ))}
        </div>
      </MaxWidth>
    </section>
  );
};

export default ExploreAuthors;
