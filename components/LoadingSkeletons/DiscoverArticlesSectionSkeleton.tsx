import React from "react";
import { Skeleton } from "../ui/skeleton";

const ArticleSkeleton = () => {
  return (
    <div className="flex flex-col w-[calc(100%/4.5)] max-lg:w-[calc(100%/3.4)] max-md:w-[100%] h-[480px] max-lg:h-[496px] border shadow-sm rounded-2xl">
      <Skeleton className="h-[52%] rounded-t-2xl flex w-full" />
      {/* </div> */}
      <div className="h-[40%] m-3 w-full flex flex-col">
        <div className="flex flex-row w-full gap-2  h-20 py-1">
          <Skeleton className="h-10 w-10 flex rounded-full mt-1" />
          <div className="flex flex-col space-y-2">
            <Skeleton className="h-4 w-[50px] flex" />
            <Skeleton className="h-4 w-[100px] flex" />
          </div>
        </div>
        <Skeleton className="w-[180px] h-4 mb-6" />
        <div className="flex justify-between mr-4 mt-2">
          <div className="flex gap-3">
            <Skeleton className="w-[50px] h-8 rounded-2xl" />
            <Skeleton className="w-[50px] h-8 rounded-2xl" />
          </div>
          <Skeleton className="w-[40px] rounded-2xl" />
        </div>
      </div>
    </div>
  );
};

const DiscoverArticlesSectionSkeleton = () => {
  return (
    <div className="mt-8 flex flex-row items-center gap-8 flex-wrap">
      <ArticleSkeleton />
      <ArticleSkeleton />
      <ArticleSkeleton />
      <ArticleSkeleton />
    </div>
  );
};

export default DiscoverArticlesSectionSkeleton;
