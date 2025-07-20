import React from "react";
import { Skeleton } from "../ui/skeleton";

const AuthorSkeleton = () => {
  return (
    <div className="w-[calc(100%/4.5)] max-lg:w-[calc(100%/3.4)] max-md:w-[100%] h-[287px] border rounded-2xl bg-white dark:bg-black">
      <Skeleton className="rounded-t-2xl h-[calc(287px/1.8)] w-full" />
      <div className="h-[40%] m-3 w-full flex flex-col">
        <div className="flex justify-center flex-col space-y-2 m-auto">
          <Skeleton className="h-4 w-[50px] flex justify-center mx-auto" />
          <Skeleton className="h-4 w-[100px] flex mx-auto" />
        </div>
      </div>
    </div>
  );
};
const DiscoverAuthorsSectionSkeleton = () => {
  return (
    <div className="mt-8 flex items-center gap-8 flex-wrap">
      <AuthorSkeleton />
      <AuthorSkeleton />
      <AuthorSkeleton />
      <AuthorSkeleton />
    </div>
  );
};

export default DiscoverAuthorsSectionSkeleton;
