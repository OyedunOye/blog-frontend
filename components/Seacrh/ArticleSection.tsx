"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

import { Bookmark, Heart, MessageSquareMore } from "lucide-react";
import { cn } from "@/lib/utils";

import { Button } from "../ui/button";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { articleData } from "./data";

import MaxWidth from "../Home/MaxWidthWrapper";
import AvatarRenderer from "../common/Avatar";

const ArticleSection = () => {
  const [activeTab, setActiveTab] = useState<"ARTICLES" | "FAVORITE" | "SAVED">(
    "ARTICLES"
  );

  return (
    <MaxWidth className="mb-24 mt-44">
      <div className=" flex flex-col">
        <ul className="flex text-gray-600">
          <li className="flex">
            <Button
              onClick={() => setActiveTab("ARTICLES")}
              variant="ghost"
              className={cn(activeTab === "ARTICLES" && "text-black bg-accent")}
            >
              Articles (22)
            </Button>
          </li>
          <li className="flex">
            <Button
              onClick={() => setActiveTab("FAVORITE")}
              variant="ghost"
              className={cn(activeTab === "FAVORITE" && "text-black bg-accent")}
            >
              Favorites
            </Button>
          </li>
          <li className="flex">
            <Button
              onClick={() => setActiveTab("SAVED")}
              variant="ghost"
              className={cn(activeTab === "SAVED" && "text-black bg-accent")}
            >
              Saved
            </Button>
          </li>
        </ul>
      </div>

      <div className="mt-8 flex items-center gap-8 flex-wrap">
        {articleData.map((data) => (
          <Link
            href={"/"}
            key={data.id}
            className="w-[calc(100%/4.4)] h-[414px] border shadow-lg hover:shadow-xl rounded-2xl"
          >
            <Image
              src={data.articleHero}
              alt="Article Hero Image"
              width={626}
              height={267}
              className="rounded-t-2xl h-[52%] object-cover w-full"
            />
            <div className="flex flex-col gap-y-4 mt-4 px-[24px]">
              <div className="flex">
                <div className="w-full flex gap-x-3 text-sm text-gray-600">
                  <AvatarRenderer src={data.authorImageSrc.src} />
                  <div className="flex flex-col">
                    <p className="">{data.author}</p>
                    <p className="">
                      {data.date} · {data.readTime} min read
                    </p>
                  </div>
                </div>
              </div>

              <h3 className="font-bold text-base text-gray-900">
                {data.title}
              </h3>
              <div className="flex justify-between text-gray-500">
                <div className=" flex gap-2">
                  <Button
                    variant="outline"
                    className="rounded-full bg-gray-200"
                  >
                    <Heart /> {data.loveCount}
                  </Button>
                  <Button
                    variant="outline"
                    className="rounded-full bg-gray-200"
                  >
                    <MessageSquareMore /> {data.commentCount}
                  </Button>
                </div>

                <div className="flex content-center gap-2">
                  <Bookmark className="bg-gray-200 rounded-full h-8 w-8 p-1" />
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      <div className="flex justify-between mt-6 pr-4">
        <Pagination className="justify-start mx-0 w-1/2">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious href="#" />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">1</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
            <PaginationItem>
              <PaginationNext href="#" />
            </PaginationItem>
          </PaginationContent>
        </Pagination>

        <Button variant="default">See more</Button>
      </div>
    </MaxWidth>
  );
};

export default ArticleSection;
