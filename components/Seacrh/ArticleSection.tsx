"use client";

import { useEffect, useState } from "react";
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

import MaxWidth from "../common/MaxWidthWrapper";
import AvatarRenderer from "../common/Avatar";
import { useGetAllBlogs } from "@/hooks/blog/useGetBlogs";
import { BlogType } from "../Home/LatestArticles";
import CleanSlate from "../common/CleanSlate";
import Loader from "../common/Loader";

import { formatDate, loggedInUserId } from "@/utils";
import { wordLimit } from "@/utils/helpers";
import Favourites from "./Favourites";
import Bookmarks from "./Bookmarks";
import { useGetAUser } from "@/hooks/authors/useGetAUser";
import NoServerConnectionWarning from "../common/NoServerConnectionWarning";
// import AllBlogs from "./AllBlogs";

const ArticleSection = () => {
  const [activeTab, setActiveTab] = useState<"ARTICLES" | "FAVORITE" | "SAVED">(
    "ARTICLES"
  );

  const { data, isLoading, isError, isSuccess } = useGetAllBlogs();
  const { data: favouriteNSavedData, isSuccess: favouriteNSavedIsSuccess } =
    useGetAUser();

  const [allBlogs, setAllBlogs] = useState<BlogType[]>([]);
  const [favouriteCount, setFavouriteCount] = useState<number>(0);
  const [savedCount, setSavedCount] = useState<number>(0);

  useEffect(() => {
    if (data && isSuccess) {
      setAllBlogs(data.blogs);
    }
  }, [data, isSuccess]);

  useEffect(() => {
    if (favouriteNSavedData && favouriteNSavedIsSuccess) {
      setFavouriteCount(favouriteNSavedData.user.loved.length);
      setSavedCount(favouriteNSavedData.user.bookmarked.length);
    }
  }, [favouriteNSavedData, favouriteNSavedIsSuccess]);

  // console.log(singleUserData.user);

  return (
    <MaxWidth className="mb-24 mt-44 w-full">
      <div className=" flex flex-col">
        <ul className="flex text-gray-600 dark:text-white">
          <li className="flex">
            <Button
              onClick={() => setActiveTab("ARTICLES")}
              variant="ghost"
              className={cn(
                activeTab === "ARTICLES" &&
                  "text-black bg-accent dark:bg-slate-300 dark:hover:dark:bg-slate-300"
              )}
            >
              Articles ({allBlogs.length})
            </Button>
          </li>
          <li className="flex">
            <Button
              onClick={() => setActiveTab("FAVORITE")}
              variant="ghost"
              className={cn(
                activeTab === "FAVORITE" &&
                  "text-black bg-accent dark:bg-slate-300 dark:hover:dark:bg-slate-300"
              )}
            >
              Favorites ({favouriteCount})
            </Button>
          </li>
          <li className="flex">
            <Button
              onClick={() => setActiveTab("SAVED")}
              variant="ghost"
              className={cn(
                activeTab === "SAVED" &&
                  "text-black bg-accent dark:bg-slate-300 dark:hover:dark:bg-slate-300"
              )}
            >
              Saved ({savedCount})
            </Button>
          </li>
        </ul>
      </div>

      {isLoading && !isError ? (
        <Loader message="Loading blogs section." className="w-full h-[480px]" />
      ) : null}

      <div className="mt-8 flex items-center gap-8 flex-wrap">
        {isSuccess && (!allBlogs || allBlogs.length < 1) ? (
          <CleanSlate message="There are no blogs on the site at the moment. You can register, login and create the first blog for the site!" />
        ) : (
          <>
            {isError ? (
              <NoServerConnectionWarning
                message="Server is unreachable, unable to load the blog section at the
                  moment. Please try again later."
              />
            ) : null}
            {isSuccess && allBlogs && activeTab === "ARTICLES"
              ? allBlogs.map((data) => (
                  <Link
                    href={`/blog/${data._id}`}
                    key={data._id}
                    className="w-[calc(100%/4.5)] max-lg:w-[calc(100%/3.4)] max-md:w-[100%] h-[480px] max-lg:h-[496px] border shadow-lg hover:shadow-xl rounded-2xl dark:bg-input/30"
                  >
                    <Image
                      src={data.articleImg}
                      alt="Article Hero Image"
                      width={626}
                      height={267}
                      className="rounded-t-2xl h-[52%] object-cover w-full"
                    />
                    <div className="flex flex-col gap-y-4 mt-4 px-[20px] max-lg:px-[14px]">
                      <div className="flex h-16">
                        <div className="w-full flex gap-x-3 text-sm text-gray-600">
                          <AvatarRenderer
                            src={`${
                              data.author.authorImg !== ""
                                ? data.author.authorImg
                                : "/small-user-dummy.jpg"
                            }`}
                          />
                          <div className="flex flex-col dark:text-gray-300">
                            <p className="">
                              {data.author.firstName +
                                " " +
                                data.author.lastName}
                            </p>
                            <p className="">
                              {formatDate(data.createdAt.toString())} ·{" "}
                              {data.readTime} min read
                            </p>
                          </div>
                        </div>
                      </div>

                      <h3 className="font-bold text-base h-16 max-lg:my-2 text-gray-900 dark:text-white">
                        {wordLimit(data.title)}
                      </h3>
                      <div className="flex justify-between text-gray-500">
                        <div className=" flex gap-2">
                          <Button
                            variant="outline"
                            className="rounded-full bg-gray-200 dark:bg-gray-200"
                          >
                            <Heart
                              color={`${
                                data.loves.indexOf(loggedInUserId()!) !== -1
                                  ? "red"
                                  : "gray"
                              }`}
                              fill={`${
                                data.loves.indexOf(loggedInUserId()!) !== -1
                                  ? "red"
                                  : "transparent"
                              }`}
                            />{" "}
                            {data.loveCount}
                          </Button>
                          <Button
                            variant="outline"
                            className="rounded-full bg-gray-200 dark:bg-gray-200"
                          >
                            <MessageSquareMore /> {data.commentCount}
                          </Button>
                        </div>

                        <div className="flex content-center gap-2">
                          <Bookmark
                            color={`${
                              data.bookmarks.indexOf(loggedInUserId()!) !== -1
                                ? "green"
                                : "gray"
                            }`}
                            fill={`${
                              data.bookmarks.indexOf(loggedInUserId()!) !== -1
                                ? "green"
                                : "transparent"
                            }`}
                            className="bg-gray-200 rounded-full h-8 w-8 p-1"
                          />
                        </div>
                      </div>
                    </div>
                  </Link>
                ))
              : null}
          </>
        )}
      </div>

      {/* {activeTab === "ARTICLES" && <AllBlogs />} */}
      {activeTab === "FAVORITE" && <Favourites />}
      {activeTab === "SAVED" && <Bookmarks />}

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
