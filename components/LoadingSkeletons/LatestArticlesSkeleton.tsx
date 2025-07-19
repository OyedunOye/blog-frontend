import React from "react";
import { Skeleton } from "../ui/skeleton";

export const CardSkeleton = () => {
  return (
    <div className="h-40 w-full flex  justify-between ">
      <div className="w-[55%] h-full flex  my-auto flex-col">
        <div className="flex flex-col gap-2 w-full">
          <div className="flex content-center h-8 py-1 justify-between">
            <Skeleton className="h-6 w-6 flex rounded-sm" />
            <Skeleton className="h-6 w-[100px] flex" />
          </div>
          <Skeleton className="h-6 w-full flex" />
        </div>
        <div className="flex justify-between mt-2 gap-y-2">
          <Skeleton className="h-6 w-[150px] flex" />
          <Skeleton className="h-6 w-[80px] flex" />
        </div>
      </div>

      <div className="h-full w-[35%] py-2">
        <Skeleton className="h-full w-full rounded-xl" />
      </div>
    </div>
  );
};

const LatestArticlesSkeleton = () => {
  return (
    <div className="flex flex-row w-full h-fit gap-2 max-lg:flex-col">
      <div className="space-y-2 flex-col w-[48%] max-lg:w-full border rounded-md">
        <div className="w-full">
          <Skeleton className="rounded-t-md object-cover h-80 w-full" />
        </div>
        <div className="flex w-full gap-2 content-center h-8 py-1">
          <Skeleton className="h-6 w-6 flex rounded-sm" />
          <Skeleton className="h-6 w-[250px] flex" />
          <Skeleton className="h-6 w-[200px] flex" />
        </div>

        {/* <div className="flex"> */}
        <Skeleton className="w-[50%] h-8" />
        <Skeleton className="w-full h-8" />
        {/* </div> */}
      </div>

      <div className="w-[53%] max-lg:w-full flex flex-col h-full border rounded-md">
        <CardSkeleton />
        <CardSkeleton />
        <CardSkeleton />
      </div>
    </div>
  );
};

export default LatestArticlesSkeleton;
