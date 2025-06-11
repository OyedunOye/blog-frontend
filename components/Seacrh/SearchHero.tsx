"use client";

import Image from "next/image";

import searchHeroImg from "../assets/Search/search-bg.png";
import { poppins } from "@/lib/fonts";
import { cn } from "@/lib/utils";
import { Input } from "../ui/input";
import { ArrowRight, Search } from "lucide-react";
import { Button } from "../ui/button";

const SearchHero = () => {
  return (
    <div className="w-full relative">
      <Image
        alt="tower surrounded by pink flowers"
        src={searchHeroImg}
        width={1476}
        height={607}
        className="object-cover w-full"
      />

      <div className="absolute -bottom-24 left-1/2 -translate-x-1/2 p-[64px] max-md:p-[10px] lg:w-[80%] max-lg:w-[85%] max-md:h-[50] max-w-[1272px] bg-white rounded-3xl shadow-lg flex flex-col justify-center items-center gap-y-8 border dark:bg-black">
        <div className="flex flex-col gap-y-3 items-center ">
          <h3
            className={cn(
              "font-semibold text-gray-800 text-5xl max-md:text-lg dark:text-white",
              poppins.className
            )}
          >
            UI Design
          </h3>
          <p className="text-gray-500 dark:text-gray-400">
            We found 1135 results for{" "}
            <span className="font-semibold text-black dark:text-white">
              UI Design
            </span>
          </p>
        </div>

        <form className="flex flex-col gap-y-3 lg:w-[65%] max-lg:w-[75%] max-md:w-[100%] relative">
          <Input
            className="h-[52px] py-2 rounded-full pl-10 dark:bg-input/60"
            placeholder="Search article..."
          />
          <Search
            className="w-5 h-5 text-gray-500 absolute left-4 top-1/2 -translate-y-1/2"
            aria-label="search icon"
          />
          <Button className="h-[43px] w-[43px] bg-indigo-600 rounded-full flex items-center justify-center absolute right-2 top-1/2 -translate-y-1/2">
            <ArrowRight className="h-4 w-4 text-white" />
          </Button>
        </form>
        <div className="flex items-center gap-x-3 -mt-3 lg:w-[65%]">
          <p className="font-semibold text-sm text-gray-600">Related: </p>
          <div className="flex items-center gap-x-2 text-sm text-indigo-600">
            <p>UX designer</p>
            <p>Photo</p>
            <p>Vector</p>
            <p>Frontend</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchHero;
