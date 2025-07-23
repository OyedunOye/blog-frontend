import React from "react";
import { Skeleton } from "../ui/skeleton";

const AuthorSkeleton = () => {
  return (
    <div className="flex w-[32%] max-md:w-[100%] max-lg:w-[48%] border rounded-sm p-2 space-x-2 shadow-sm h-fit">
      <Skeleton className="h-10 w-10 rounded-full" />
      <div className="space-y-2 mt-2">
        <Skeleton className="h-4 w-[250px]" />
        <Skeleton className="h-4 w-[200px]" />
        <Skeleton className="h-4 w-[80px]" />
      </div>
    </div>
  );
};

const HomeAuthorsSectionSkeleton = () => {
  return (
    <div className="flex flex-wrap gap-2 my-3 ml-4 max-md:ml-0 ">
      <AuthorSkeleton />
      <AuthorSkeleton />
      <AuthorSkeleton />
      <AuthorSkeleton />
      <AuthorSkeleton />
      <AuthorSkeleton />
    </div>
  );
};

export default HomeAuthorsSectionSkeleton;
