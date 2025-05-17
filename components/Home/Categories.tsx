"use client";

import { categories } from "@/constants";
import Image from "next/image";
import MaxWidth from "../common/MaxWidthWrapper";
import { useGetBlogCategoryCount } from "@/hooks/blog/useGetBlogCategoryCount";
import Loading from "../common/Loader";
import { useContext } from "react";
import { AppContext } from "@/context/AppContext";

interface CategoriesCount {
  Travel: number;
  Technology: number;
  Lifestyle: number;
  Programming: number;
  Food: number;
  Others: number;
}

const Categories = () => {
  const { data, isLoading, isSuccess, isError } = useGetBlogCategoryCount();
  const { state, dispatch } = useContext(AppContext);
  const articleCountFormat = (count: number) =>
    `${count} ${count < 2 ? "article" : "articles"}`;

  // const setServerError = ()=>{
  //   if (isError){
  //   dispatch({
  //       type: "CAN_LOGIN",
  //       payload: false,
  //     })
  //   }
  // }

  // isSuccess
  //   ? dispatch({
  //       type: "CAN_LOGIN",
  //       payload: true,
  //     })
  //   : "";

  // console.log(state.canLogin);
  return (
    <section id="categories" className="w-full bg-[#F3F4F6] py-8">
      <MaxWidth className="w-full min-h-30">
        <h3 className="font-bold text-xl mb-6">📚 Categories</h3>
        {isLoading && !isError ? <Loading message="Loading categories" /> : ""}
        {isError ? (
          <div className="flex content-center h-fit justify-center">
            {/* setServerError() */}
            <p className="font-bold">
              Server is unreachable, please try again later.
            </p>
          </div>
        ) : (
          ""
        )}
        {isSuccess && data ? (
          <div className="flex flex-wrap w-full gap-3">
            {categories.map(({ category, photo }) => (
              <div
                key={category}
                className="flex w-[22%] h-auto m-3 gap-2 cursor-pointer bg-white rounded-sm shadow-2xl"
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
            {/* unsetServerError() */}
          </div>
        ) : (
          ""
        )}
      </MaxWidth>
    </section>
  );
};

export default Categories;
