"use client";

import { categories } from "@/constants";
import Image from "next/image";
import MaxWidth from "../common/MaxWidthWrapper";
import { useGetBlogCategoryCount } from "@/hooks/blog/useGetBlogCategoryCount";
import Loading from "../common/Loader";

interface CategoriesCount {
  Travel: number;
  Technology: number;
  Lifestyle: number;
  Programming: number;
  Food: number;
  Others: number;
}

const Categories = () => {
  const { data, isLoading, isSuccess } = useGetBlogCategoryCount();
  const articleCountFormat = (count: number) =>
    `${count} ${count < 2 ? "article" : "articles"}`;

  return (
    <section id="categories" className="w-full bg-[#F3F4F6] py-8">
      {isSuccess && data ? (
        <MaxWidth className="w-full">
          <h3 className="font-bold text-xl mb-6">📚 Categories</h3>
          <div className="flex flex-wrap w-full">
            {categories.map(({ category, photo }) => (
              <div
                key={category}
                className="flex w-[22%] h-auto m-3 gap-2 cursor-pointer"
              >
                <div className="w-[80px] h-[80px]">
                  <Image src={photo} alt={category} width={80} height={80} />
                </div>
                <div className="flex flex-col content-center py-3">
                  <h6 className="flex font-semibold text-md">{category}</h6>
                  <p className="flex   text-slate-600 text-sm">
                    {articleCountFormat(data[category] ?? 0)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </MaxWidth>
      ) : (
        <Loading message="Loading categories" />
      )}
    </section>
  );
};

export default Categories;
