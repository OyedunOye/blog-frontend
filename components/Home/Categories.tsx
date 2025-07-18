"use client";

import { categories } from "@/constants";
import Image from "next/image";
import MaxWidth from "../common/MaxWidthWrapper";
import { useGetBlogCategoryCount } from "@/hooks/blog/useGetBlogCategoryCount";
import NoServerConnectionWarning from "../common/NoServerConnectionWarning";
import HomeCategoriesSkeleton from "../LoadingSkeletons/HomeCategoriesSkeleton";

const Categories = () => {
  const { data, isLoading, isSuccess, isError } = useGetBlogCategoryCount();
  const articleCountFormat = (count: number) =>
    `${count} ${count < 2 ? "article" : "articles"}`;

  return (
    <section
      id="categories"
      className="w-full bg-[#F3F4F6] dark:bg-slate-900 py-8"
    >
      <MaxWidth className="w-full min-h-30 bg-[#F3F4F6]  dark:bg-slate-900">
        <h3 className="font-bold text-xl mb-6">📚 Categories</h3>
        {isLoading && !isError ? <HomeCategoriesSkeleton /> : null}
        {isError ? (
          <NoServerConnectionWarning
            message="Server is unreachable, unable to load the categories section at the moment. Please try again later."
            className="h-full"
          />
        ) : null}
        {isSuccess && data ? (
          // <div className="flex justify-center border">
          <div className="flex flex-wrap w-full gap-3 max-lg:gap-1 ">
            {categories.map(({ category, photo }) => (
              <div
                key={category}
                className="flex w-[22%] max-md:w-[100%] h-auto m-2 gap-2 bg-white dark:bg-slate-800 rounded-sm shadow-2xl max-lg:w-[29%]"
              >
                <div className="w-[80px] h-[80px]">
                  <Image src={photo} alt={category} width={80} height={80} />
                </div>
                <div className="flex flex-col content-center py-3">
                  <h6 className="flex font-semibold text-md">{category}</h6>
                  <p className="flex text-slate-600 dark:text-slate-400 text-sm">
                    {articleCountFormat(data[category] ?? 0)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : // </div>
        null}
      </MaxWidth>
    </section>
  );
};

export default Categories;
