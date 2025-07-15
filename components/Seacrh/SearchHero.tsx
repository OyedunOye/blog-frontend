"use client";

import Image from "next/image";

import searchHeroImg from "../assets/Search/search-bg.png";
import { poppins } from "@/lib/fonts";
import { cn } from "@/lib/utils";
import { Input } from "../ui/input";
import { ArrowRight, Search } from "lucide-react";
import { Button } from "../ui/button";
import { useContext, useEffect, useState } from "react";
import { BlogType } from "../Home/LatestArticles";
import { AppContext } from "@/context/AppContext";

interface SearchHeroProps {
  allBlogs: BlogType[];
}

const SearchHero = ({ allBlogs }: SearchHeroProps) => {
  const [searchText, setSearchText] = useState<string>(
    "Search for A Blog by Its Title"
  );

  const { dispatch } = useContext(AppContext);

  // the logic separating the array set for when search is ongoing (filtered array obtained from all blogs) compared to when not (allblogs) was moved from conditions inside of the useEffect below into filteredBlogs. Therefore, the same array i.e. fiteredblogs array is saved in context as displayBlogArray for both cases.
  const filteredBlogs =
    searchText !== "Search for A Blog by Its Title"
      ? allBlogs.filter((blog: BlogType) =>
          blog.title.toLowerCase().includes(searchText.toLowerCase())
        )
      : allBlogs;

  useEffect(() => {
    if (searchText !== "Search for A Blog by Its Title") {
      const payload = {
        displayBlogArray: filteredBlogs,
        searching: true,
      };
      dispatch({
        payload: payload,
        type: "DISPLAY_BLOG_ARRAY",
      });
    }
    if (searchText === "Search for A Blog by Its Title") {
      const payload = {
        displayBlogArray: filteredBlogs,
        searching: false,
      };
      dispatch({
        payload: payload,
        type: "DISPLAY_BLOG_ARRAY",
      });
    }
  }, [searchText, allBlogs]);

  return (
    <div className="w-full relative">
      <Image
        alt="tower surrounded by pink flowers"
        src={searchHeroImg}
        width={1476}
        height={607}
        className="object-cover w-full"
      />

      <div className="absolute -bottom-24 left-1/2 -translate-x-1/2 p-[64px] max-md:p-[10px] lg:w-[80%] max-lg:w-[85%]  max-w-[1272px] bg-white rounded-3xl shadow-lg dark:shadow-gray-600 flex flex-col justify-center items-center gap-y-8 border dark:bg-black">
        <div className="flex flex-col gap-y-3 items-center ">
          <h3
            className={cn(
              "font-semibold text-gray-800 text-5xl text-center max-md:text-lg max-md:mt-[20px] dark:text-white",
              poppins.className
            )}
          >
            {searchText}
          </h3>
          {searchText !== "Search for A Blog by Its Title" ? (
            // <p className="text-gray-500 dark:text-gray-400">
            <p className="text-gray-500 dark:text-gray-400">
              We found {filteredBlogs.length} results for{" "}
              <span className="font-semibold text-black dark:text-white">
                {searchText}
              </span>
            </p>
          ) : (
            <p className="text-gray-500 dark:text-gray-400">Search result</p>
          )}
        </div>

        <form
          onSubmit={(e) => e.preventDefault()}
          className="flex flex-col gap-y-3 lg:w-[65%] max-lg:w-[75%] max-md:w-[100%] mb-10 relative"
        >
          <Input
            className="h-[52px] py-2 rounded-full pl-10 dark:bg-input/60"
            placeholder="Search blog..."
            onChange={(e) =>
              e.target.value !== ""
                ? setSearchText(e.target.value)
                : setSearchText("Search for A Blog by Its Title")
            }
          />
          <Search
            className="w-5 h-5 text-gray-500 absolute left-4 top-1/2 -translate-y-1/2"
            aria-label="search icon"
          />
          <Button
            className="h-[43px] w-[43px] bg-indigo-600 rounded-full flex items-center justify-center absolute right-2 top-1/2 -translate-y-1/2"
            type="submit"
          >
            <ArrowRight className="h-4 w-4 text-white" />
          </Button>
        </form>
      </div>
    </div>
  );
};

export default SearchHero;
