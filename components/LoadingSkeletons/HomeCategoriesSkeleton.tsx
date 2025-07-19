import React from "react";
import { Skeleton } from "../ui/skeleton";

const CategoriesSkeleton = () => {
  return (
    <div className="flex w-[22%] max-md:w-[100%] border h-auto m-2 gap-2 rounded-sm shadow-sm max-lg:w-[29%]">
      <Skeleton className="w-[80px] h-[80px]" />
      <div className="space-y-2 mt-3 flex flex-col">
        <Skeleton className="h-4 w-[100px]" />
        <Skeleton className="h-4 w-[80px]" />
      </div>
    </div>
  );
};

const HomeCategoriesSkeleton = () => {
  return (
    <div className="flex flex-wrap w-full gap-3 max-lg:gap-1">
      <CategoriesSkeleton />
      <CategoriesSkeleton />
      <CategoriesSkeleton />
      <CategoriesSkeleton />
      <CategoriesSkeleton />
      <CategoriesSkeleton />
    </div>
  );
};

export default HomeCategoriesSkeleton;
