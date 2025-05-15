"use client";

import Link from "next/link";
import { articleMenu } from "@/constants";
import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import Image, { StaticImageData } from "next/image";
import {
  Bookmark,
  CircleEllipsis,
  Heart,
  MessageSquareMore,
  User2,
} from "lucide-react";
import MaxWidth from "../common/MaxWidthWrapper";
import { formatDate } from "@/utils";
import Loader from "../common/Loader";

import DotDivider from "../common/DotDivider";
import { useGetAllBlogs } from "@/hooks/blog/useGetBlogs";
import { wordLimit } from "@/utils/helpers";
import { ArticleCards } from "./ArticleCards";

export const num = {
  loveCount: 20,
  commentCount: 57,
  readTime: 5,
};

interface BlogType {
  _id: string;
  title: string;
  blogContent: string;
  readTime: string;
  category: string;
  articleImg: StaticImageData;
  createdAt: string;
  author: {
    authorImg: StaticImageData;
    firstName: string;
    lastName: string;
  };
}

const LatestArticles = () => {
  const { data, isLoading, isError, error, isSuccess } = useGetAllBlogs();
  const [allBlogs, setAllBlogs] = useState<BlogType[]>([]);
  const [remainingBlogs, setRemainingBlogs] = useState<BlogType[]>([]);

  useEffect(() => {
    if (data && isSuccess) {
      setAllBlogs(data.blogs);
      setRemainingBlogs(data.blogs.slice(4));
    }
  }, [data]);

  return (
    <section id="latest" className="mb-6">
      {isLoading || !data ? (
        <Loader message="Loading blogs' section" />
      ) : (
        <MaxWidth className="my-6 w-full">
          <div className="flex flex-col w-full ">
            <nav className="flex h-10 content-center gap-3 my-3">
              <h3 className="font-bold text-xl mb-6 pt-0.5">
                🎈 Latest Articles
              </h3>
              <ul className="flex">
                {articleMenu.map((menu) => (
                  <li key={menu} className="flex">
                    <Button variant="ghost">{menu}</Button>
                  </li>
                ))}
              </ul>
            </nav>
            <div className=" flex w-full gap-2 justify-between">
              <div className="flex-1/2 border rounded-md flex flex-col">
                <Link href={`/blog/${data.blogs[0]._id}`}>
                  <div className="w-full">
                    <Image
                      src={"http://localhost:3001/" + data.blogs[0].articleImg}
                      alt={data.blogs[2].title}
                      width={90}
                      height={40}
                      className="rounded-t-md object-cover h-80 w-full"
                    />
                  </div>
                </Link>

                <div
                  key={data.blogs[0].title}
                  className="flex flex-col m-4 gap-2"
                >
                  <Link href={`/blog/${data.blogs[0]._id}`}>
                    <div className="flex flex-col gap-2">
                      <div className="flex gap-2 text-sm text-gray-500">
                        <div className="flex gap-2 text-sm text-gray-500">
                          {data.blogs[0].author.authorImg ? (
                            <div className="h-6 w-6 border rounded-sm">
                              <Image
                                src={
                                  "http://localhost:3001/" +
                                  data.blogs[0].author.authorImg
                                }
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
                          <p className="">🏷️ {data.blogs[0].category}</p>
                        </div>
                      </div>

                      <h3 className="font-semibold text-lg">
                        UI Interactions of the week #1
                      </h3>
                      <p className="text-sm text-gray-500">
                        {wordLimit(data.blogs[0].title)}
                      </p>
                    </div>
                  </Link>
                  <div className="flex justify-between text-gray-500 mt-4">
                    <div className=" flex gap-2">
                      <Button
                        variant="outline"
                        className="rounded-full bg-gray-200 h-[80%]"
                      >
                        <Heart /> {data.blogs[0].loveCount}
                      </Button>
                      <Button
                        variant="outline"
                        className="rounded-full bg-gray-200 h-[80%]"
                      >
                        <MessageSquareMore /> {data.blogs[0].commentCount}
                      </Button>
                    </div>

                    <div className="flex content-center gap-2">
                      <p>{data.blogs[0].readTime} min read</p>
                      <Bookmark className="bg-gray-200 rounded-full h-8 w-8 p-1" />
                      <CircleEllipsis className="bg-gray-200 rounded-full h-8 w-8 p-1" />
                    </div>
                  </div>
                </div>
              </div>

              <div className="">
                <ArticleCards />
              </div>
            </div>
          </div>
          <div className="flex gap-4 my-4  w-full flex-wrap">
            {remainingBlogs
              ? remainingBlogs.map((card) => (
                  <Link
                    key={card.title}
                    href={`/blog/${card._id}`}
                    className="flex flex-col w-[32%] h-90 gap-2 rounded-md shadow-2xl"
                  >
                    <div className="flex flex-col w-full h-90 gap-2 rounded-md ">
                      <div className="flex h-56 w-full">
                        <Image
                          src={"http://localhost:3001/" + card.articleImg}
                          alt={card.title}
                          width={288}
                          height={250}
                          className="rounded-t-md h-56 object-cover w-full"
                        />
                      </div>

                      <div className="flex text-sm text-gray-500 p-2 gap-2">
                        <div className="flex gap-2">
                          {card.author.authorImg ? (
                            <div className="h-6 w-6 border rounded-sm">
                              <Image
                                src={
                                  "http://localhost:3001/" +
                                  card.author.authorImg
                                }
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
                            {card.author.firstName + " " + card.author.lastName}
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
              : ""}
          </div>
        </MaxWidth>
      )}
    </section>
  );
};

export default LatestArticles;
