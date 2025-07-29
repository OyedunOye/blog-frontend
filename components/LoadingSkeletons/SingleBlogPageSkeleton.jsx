import MaxWidth from "../common/MaxWidthWrapper";
import { Skeleton } from "../ui/skeleton";

const SingleBlogPageSkeleton = () => {
  return (
    <div className="flex flex-col w-full">
      <div className="w-full">
        <Skeleton className="min-h-40 relative w-full" />
        <MaxWidth>
          <Skeleton className="absolute w-20 h-20 rounded-full left-16 max-md:left-5 max-lg:left-10 top-26" />
          <Skeleton className="h-4 w-[140px] absolute left-16 max-md:left-5 max-lg:left-10 -mt-8" />
          <div className="flex flex-col absolute gap-2 right-16 max-md:right-5 max-lg:right-10 top-26">
            <Skeleton className="h-4 w-[140px] " />
            <Skeleton className="h-4 w-[120px]" />
            <Skeleton className="h-4 mt-6 w-[120px]" />
          </div>
        </MaxWidth>
      </div>
      <div className="mt-0.5 flex ">
        <Skeleton className="h-120 w-full" />
      </div>
    </div>
  );
};

export default SingleBlogPageSkeleton;
