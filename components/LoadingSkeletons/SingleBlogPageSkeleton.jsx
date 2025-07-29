import MaxWidth from "../common/MaxWidthWrapper";
import { Skeleton } from "../ui/skeleton";

const SingleBlogPageSkeleton = () => {
  const iterations = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];
  return (
    <div className="flex flex-col w-full divide-y-2">
      <MaxWidth className="py-4 w-full min-h-40 flex flex-row justify-between ">
        <div className="flex flex-col gap-3">
          <Skeleton className=" w-20 h-20 rounded-full " />
          <Skeleton className="h-4 w-[140px] " />
        </div>
        <div className="flex flex-col  gap-2">
          <Skeleton className="h-4 w-[140px] " />
          <Skeleton className="h-4 w-[120px]" />
          <Skeleton className="h-4 mt-6 w-[120px]" />
        </div>
      </MaxWidth>

      <MaxWidth className="mt-2 w-full gap-2">
        <Skeleton className="flex justify-center w-[50%] h-8 mt-4  mx-[25%]" />
        <Skeleton className="w-[30%] h-8 my-4  mx-[35%]" />
        {iterations.map((item) => (
          <Skeleton key={item} className="h-6 w-full" />
        ))}
      </MaxWidth>
    </div>
  );
};

export default SingleBlogPageSkeleton;
