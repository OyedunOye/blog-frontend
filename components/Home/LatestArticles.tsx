"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import Image, { StaticImageData } from "next/image";
import {
  Bookmark,
  Heart,
  LoaderCircle,
  MessageSquareMore,
  User2,
} from "lucide-react";
import MaxWidth from "../common/MaxWidthWrapper";
import { formatDate, loggedInUserId } from "@/utils";
import Loader from "../common/Loader";

import DotDivider from "../common/DotDivider";
import { useGetAllBlogs } from "@/hooks/blog/useGetBlogs";
import { wordLimit } from "@/utils/helpers";
import { ArticleCards } from "./ArticleCards";
import NoServerConnectionWarning from "../common/NoServerConnectionWarning";
import CleanSlate from "../common/CleanSlate";

export interface BlogType {
  _id: string;
  title: string;
  blogContent: string;
  readTime: string;
  category: string;
  loveCount: number;
  loves: Array<string>;
  bookmarks: Array<string>;
  commentCount: number;
  articleImg: StaticImageData;
  createdAt: string;
  author: {
    authorImg: string;
    firstName: string;
    lastName: string;
  };
}

const LatestArticles = () => {
  const { data, isLoading, isError, isSuccess } = useGetAllBlogs();
  const [allBlogs, setAllBlogs] = useState<BlogType[]>([]);
  const [remainingBlogs, setRemainingBlogs] = useState<BlogType[]>([]);
  const [loadingSingPage, setLoadingSingPage] = useState<boolean>(false);
  const [loadingAPage, setLoadingAPage] = useState<boolean>(false);
  const [loadingCard, setLoadingCard] = useState<string>("");

  useEffect(() => {
    if (data && isSuccess) {
      setAllBlogs(data.blogs);
      setRemainingBlogs(data.blogs.slice(4));
    }
  }, [data, isSuccess]);

  // const baseUrl = process.env.NEXT_PUBLIC_UPLOAD_URL;

  return (
    <section id="latest" className="mb-6 max-lg:h-fit">
      <MaxWidth className="my-6 w-full min-h-60">
        <>
          <h3 className="font-bold text-xl mb-6 pt-0.5">🎈 Latest Articles</h3>
          {isLoading && !isError ? (
            <Loader message="Loading blogs' section" />
          ) : null}
          {isError ? (
            <NoServerConnectionWarning
              message="Server is unreachable, unable to load the blog section at the
                  moment. Please try again later."
            />
          ) : null}

          {isSuccess && (!allBlogs || allBlogs.length < 1) ? (
            <CleanSlate message="There are no blogs on the site at the moment. You can register, login and create the first blog for the site!" />
          ) : (
            <>
              {isSuccess && allBlogs ? (
                <>
                  <div className="flex flex-col w-full ">
                    <div className=" flex w-full gap-2 justify-between max-md:flex-wrap max-lg:flex-col">
                      <div className="w-[48%] border dark:border-slate-300 dark:bg-input/30 rounded-md flex flex-col max-lg:w-full">
                        <Link
                          href={`/blog/${allBlogs[0]._id}`}
                          onClick={() => setLoadingSingPage(true)}
                        >
                          <div className="w-full">
                            <Image
                              src={data.blogs[0].articleImg}
                              alt={data.blogs[0].title}
                              width={500}
                              height={400}
                              className="rounded-t-md object-cover h-80 w-full"
                            />
                          </div>
                        </Link>
                        {loadingSingPage ? (
                          <div className="w-full flex content-center justify-center">
                            <LoaderCircle className="text-gray-400 animate-spin" />
                          </div>
                        ) : (
                          <div
                            key={data.blogs[0].title}
                            className="flex flex-col m-4 gap-2"
                          >
                            <Link href={`/blog/${data.blogs[0]._id}`}>
                              <div className="flex flex-col gap-2">
                                <div className="flex gap-2 text-sm text-gray-500">
                                  <div className="flex gap-2 text-sm text-gray-500 dark:text-slate-300">
                                    {data.blogs[0].author.authorImg ? (
                                      <div className="h-6 w-6 border rounded-sm">
                                        <Image
                                          src={data.blogs[0].author.authorImg}
                                          alt={data.blogs[0].author.firstName}
                                          width={24}
                                          height={24}
                                          className="object-cover h-full w-full rounded-sm"
                                        />
                                      </div>
                                    ) : (
                                      <User2
                                        size={18}
                                        className="border-1 content-center m-y-2 h-6 w-7"
                                      />
                                    )}

                                    <p className="capitalize">
                                      {data.blogs[0].author.firstName +
                                        " " +
                                        data.blogs[0].author.lastName}
                                    </p>
                                    <p className="">
                                      {formatDate(data.blogs[0].createdAt)}
                                    </p>
                                    <p className="">
                                      🏷️ {data.blogs[0].category}
                                    </p>
                                  </div>
                                </div>

                                <h3 className="text-lg font-bold text-gray-500">
                                  {wordLimit(data.blogs[0].title)}
                                </h3>
                              </div>
                            </Link>
                            <div className="flex justify-between text-gray-500 mt-4">
                              <div className=" flex gap-2">
                                {/* checking if the logged in user's id is existing in loves array. If so, they have liked and this is highlighted with red fill for the love icon */}

                                <div className="flex rounded-full justify-center p-3 gap-3 content-center bg-gray-200 h-[80%] w-20">
                                  <Heart
                                    color={`${
                                      data.blogs[0].loves.indexOf(
                                        loggedInUserId()!
                                      ) !== -1
                                        ? "red"
                                        : "gray"
                                    }`}
                                    fill={`${
                                      data.blogs[0].loves.indexOf(
                                        loggedInUserId()!
                                      ) !== -1
                                        ? "red"
                                        : "transparent"
                                    }`}
                                    className="-mt-1"
                                  />

                                  <span className="h-fit flex -mt-1.5 text-md font-semibold">
                                    {data.blogs[0].loveCount}
                                  </span>
                                </div>
                                <div className="flex rounded-full justify-center p-3 gap-3 content-center bg-gray-200 h-[80%] w-20">
                                  <MessageSquareMore className="-mt-1" />
                                  <span className="h-fit flex -mt-1.5 text-md font-semibold">
                                    {data.blogs[0].commentCount}
                                  </span>
                                </div>
                              </div>

                              <div className="flex content-center gap-2">
                                <p>
                                  {data.blogs[0].readTime} min
                                  {data.blogs[0].readTime > 1 ? "s" : null} read
                                </p>
                                <Bookmark
                                  color={`${
                                    data.blogs[0].bookmarks.indexOf(
                                      loggedInUserId()!
                                    ) !== -1
                                      ? "green"
                                      : "gray"
                                  }`}
                                  fill={`${
                                    data.blogs[0].bookmarks.indexOf(
                                      loggedInUserId()!
                                    ) !== -1
                                      ? "green"
                                      : "transparent"
                                  }`}
                                  className="bg-gray-200 rounded-full h-8 w-8 p-1"
                                />
                              </div>
                            </div>
                          </div>
                        )}
                      </div>

                      <div className="w-[53%] max-lg:w-full">
                        <ArticleCards />
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-4 my-4  w-full flex-wrap">
                    {remainingBlogs
                      ? remainingBlogs.map((card) => (
                          <Link
                            onClick={() => {
                              setLoadingAPage(true);
                              setLoadingCard(card._id);
                            }}
                            key={card.title}
                            href={`/blog/${card._id}`}
                            className="flex flex-col w-[32%] max-md:w-[100%] max-lg:w-[48%] h-90 gap-2 dark:bg-input/30 rounded-md shadow-2xl max-md:shadow-lg"
                          >
                            <div className="flex flex-col w-full h-90 gap-2 rounded-md ">
                              <div className="flex h-56 w-full">
                                {loadingAPage && loadingCard === card._id ? (
                                  <div className="w-full flex my-auto content-center justify-center">
                                    <LoaderCircle className="text-gray-400 animate-spin" />
                                  </div>
                                ) : (
                                  <Image
                                    src={`${card.articleImg}`}
                                    alt={card.title}
                                    width={288}
                                    height={250}
                                    className="rounded-t-md h-56 object-cover w-full"
                                  />
                                )}
                              </div>

                              <div className="flex text-sm text-gray-500 p-2 gap-2">
                                <div className="flex gap-2">
                                  {card.author.authorImg ? (
                                    <div className="h-6 w-6 border rounded-sm">
                                      <Image
                                        src={card.author.authorImg}
                                        alt={card.author.firstName}
                                        width={26}
                                        height={26}
                                        className="object-cover h-full w-full rounded-sm"
                                      />
                                    </div>
                                  ) : (
                                    <User2
                                      size={18}
                                      className="border-1 rounded-sm content-center m-y-2 h-6 w-7"
                                    />
                                  )}
                                  <p className="capitalize">
                                    {card.author.firstName +
                                      " " +
                                      card.author.lastName}
                                  </p>
                                </div>

                                <DotDivider />

                                <p className="">
                                  {formatDate(card.createdAt.toString())}
                                </p>
                              </div>
                              <h3 className="font-semibold  text-lg p-2">
                                {wordLimit(card.title)}
                              </h3>
                            </div>
                          </Link>
                        ))
                      : null}
                  </div>
                </>
              ) : null}
            </>
          )}
        </>
      </MaxWidth>
    </section>
  );
};

export default LatestArticles;
