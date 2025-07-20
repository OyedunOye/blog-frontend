"use client";

import { useContext, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

import { Bookmark, Heart, MessageSquareMore } from "lucide-react";
import { cn } from "@/lib/utils";

import { Button } from "../ui/button";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

import MaxWidth from "../common/MaxWidthWrapper";
import AvatarRenderer from "../common/Avatar";
import { BlogType } from "../Home/LatestArticles";
import CleanSlate from "../common/CleanSlate";

import { formatDate, loggedInUserId } from "@/utils";
import { wordLimit } from "@/utils/helpers";
import Favourites from "./Favourites";
import Bookmarks from "./Bookmarks";
import { useGetAUser } from "@/hooks/authors/useGetAUser";
import Cookies from "universal-cookie";
import NoServerConnectionWarning from "../common/NoServerConnectionWarning";
import { AppContext } from "@/context/AppContext";
import DiscoverArticlesSectionSkeleton from "../LoadingSkeletons/DiscoverArticlesSectionSkeleton";

const cookies = new Cookies(null, { path: "/" });

const getToken = async () => {
  const token = await cookies.get("token");
  return token;
};

const token = await getToken();

interface ArticleBlogProps {
  allBlogs: BlogType[];
  errorStatus: boolean;
  loadingStatus: boolean;
}

const ArticleSection = ({
  allBlogs,
  errorStatus,
  loadingStatus,
}: ArticleBlogProps) => {
  const [activeTab, setActiveTab] = useState<"ARTICLES" | "FAVORITE" | "SAVED">(
    "ARTICLES"
  );

  const {
    data: favouriteNSavedData,
    isSuccess: favouriteNSavedIsSuccess,
    isError: favouriteSavedIsError,
  } = useGetAUser();

  const [favouriteCount, setFavouriteCount] = useState<number>(0);
  const [savedCount, setSavedCount] = useState<number>(0);
  const { state } = useContext(AppContext);

  useEffect(() => {
    if (favouriteNSavedData && favouriteNSavedIsSuccess) {
      setFavouriteCount(favouriteNSavedData.user.loved.length);
      setSavedCount(favouriteNSavedData.user.bookmarked.length);
    }
  }, [favouriteNSavedData, favouriteNSavedIsSuccess]);

  const [currentPage, setCurrentPage] = useState<number>(1);

  const blogsPerPage = 12;

  const indexOfLastBlog = currentPage * blogsPerPage;
  const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;

  const listToPaginate = !state.displayBlogArray
    ? allBlogs
    : state.displayBlogArray;
  // console.log(listToPaginate);

  const currentBlogs = listToPaginate
    ? listToPaginate.slice(indexOfFirstBlog, indexOfLastBlog)
    : [];

  // console.log(currentBlogs);

  const totalPages = allBlogs
    ? Math.ceil(listToPaginate?.length / blogsPerPage)
    : 0;

  useEffect(() => {
    if (
      listToPaginate.length < blogsPerPage ||
      listToPaginate.length === blogsPerPage ||
      state.searching
    ) {
      setCurrentPage(1);
    }
  }, [listToPaginate]);

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
              Articles (
              {!state.displayBlogArray
                ? allBlogs.length
                : state.displayBlogArray.length}
              )
            </Button>
          </li>
          {!errorStatus && token && (
            <>
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
            </>
          )}
        </ul>
      </div>

      {loadingStatus && !errorStatus ? (
        <DiscoverArticlesSectionSkeleton />
      ) : null}

      {errorStatus ? (
        <NoServerConnectionWarning
          className=""
          message="Server is unreachable, unable to load the blog section at the
                  moment. Please try again later."
        />
      ) : null}

      <div className="mt-8 flex items-center gap-8 flex-wrap">
        {!errorStatus &&
        !loadingStatus &&
        state.searching &&
        state.displayBlogArray.length < 1 &&
        activeTab === "ARTICLES" ? (
          <div className=" flex max-md:flex-col max-md:h-[fit] h-[300px] max-lg:h-[380px] w-full gap-6">
            <div className="w-[60%] h-[120%] max-md:w-full p-2 flex content-center">
              <Image
                src={"/emptySearchImg.jpg"}
                alt="empty search result"
                width={100}
                height={90}
                className="object-cover w-[100%] h-full rounded-md"
              />
            </div>
            <div className="flex content-center py-5 max-md:py-1 max-md:mb-2">
              <p className="font-bold text-lg flex h-fit my-auto">
                There is no matching blog result for your search
              </p>
            </div>
          </div>
        ) : null}
        {!errorStatus &&
        !loadingStatus &&
        (!allBlogs || allBlogs.length < 1) ? (
          <CleanSlate message="There are no blogs on the site at the moment. You can register, login and create the first blog for the site!" />
        ) : (
          <>
            {!errorStatus && allBlogs && activeTab === "ARTICLES"
              ? currentBlogs.map((data: BlogType) => (
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
      {activeTab === "FAVORITE" && (
        <Favourites
          favoriteBlogs={favouriteNSavedData.user}
          isError={favouriteSavedIsError}
        />
      )}
      {activeTab === "SAVED" && (
        <Bookmarks
          savedBlogs={favouriteNSavedData.user}
          isError={favouriteSavedIsError}
        />
      )}

      {!errorStatus && !loadingStatus && (
        <div
          className={`flex justify-between mt-6 pr-4 ${
            (state.searching && state.displayBlogArray.length < 1) ||
            activeTab !== "ARTICLES"
              ? "hidden"
              : ""
          }`}
        >
          <Pagination className="mx-0 w-full justify-center">
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  onClick={() => {
                    setCurrentPage((prev) => Math.max(prev - 1, 1));
                    window.scrollTo(0, 0);
                  }}
                  aria-disabled={currentPage === 1}
                />
              </PaginationItem>

              {Array.from({ length: totalPages }, (_, i) => (
                <PaginationItem key={i}>
                  <PaginationLink
                    isActive={currentPage === i + 1}
                    onClick={() => {
                      window.scrollTo(0, 0);
                      setCurrentPage(i + 1);
                    }}
                  >
                    {i + 1}
                  </PaginationLink>
                </PaginationItem>
              ))}

              <PaginationItem>
                <PaginationNext
                  onClick={() => {
                    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
                    window.scrollTo(0, 0);
                  }}
                  aria-disabled={currentPage === totalPages}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}
    </MaxWidth>
  );
};

export default ArticleSection;
