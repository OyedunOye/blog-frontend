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
import { formatDate, loggedInUserId } from "@/utils";
import Loader from "../common/Loader";

import { useGetAllBlogs } from "@/hooks/blog/useGetBlogs";
import { wordLimit } from "@/utils/helpers";

interface BlogType {
  _id: string;
  title: string;
  blogContent: string;
  readTime: string;
  category: string;
  articleImg: StaticImageData;
  createdAt: string;
  loveCount: number;
  commentCount: number;
  loves: [string];
  author: {
    authorImg: StaticImageData;
    firstName: string;
    lastName: string;
  };
}

export const ArticleCards = () => {
  const { data, isLoading, isSuccess } = useGetAllBlogs();
  const [dataDuplicate, setDataDuplicate] = useState<BlogType[]>([]);
  const [topTwoToFourBlogs, setTopTwoToFourBlogs] = useState<BlogType[]>([]);

  const [loadingSingPage, setLoadingSingPage] = useState<boolean>(false);
  const [loadingCard, setLoadingCard] = useState<string>("");

  const baseUrl = process.env.NEXT_PUBLIC_UPLOAD_URL;

  useEffect(() => {
    if (data) {
      setDataDuplicate(data.blogs);
      setTopTwoToFourBlogs(data.blogs.slice(1, 4));
    }
  }, [data]);

  return (
    <div className="w-full">
      {isLoading ? <Loader message="Loading" /> : null}
      {isSuccess && dataDuplicate && topTwoToFourBlogs.length > 0 ? (
        <>
          {/* {dataDuplicate && topTwoToFourBlogs? ()} */}
          <div className="flex flex-col  gap-4 border rounded-md w-full divide-y max-md:h-fit">
            {topTwoToFourBlogs.map((item) => (
              <Link
                key={item.title}
                href={`/blog/${item._id}`}
                className="h-40 w-full max-md:h-60"
                onClick={() => {
                  setLoadingSingPage(true);
                  setLoadingCard(item._id);
                }}
              >
                <div className="flex w-full h-full p-2 max-md:p-0 justify-between">
                  {loadingSingPage && loadingCard === item._id ? (
                    <div className="w-full flex my-auto content-center justify-center">
                      <LoaderCircle className="text-gray-400 animate-spin" />
                    </div>
                  ) : (
                    <>
                      <div className="flex flex-col h-20 w-90 my-2 gap-3 p-2 max-md:w-[70%] max-lg:w-[75%] max-md:h-fit">
                        <div className="flex justify-between max-md:flex-col max-md:gap-3">
                          <div className="flex gap-2 text-sm text-gray-500 max-md:justify-between">
                            {item.author.authorImg ? (
                              <div className="w-6 h-6 rounded-sm">
                                <Image
                                  src={`${baseUrl}${item.author.authorImg}`}
                                  alt={item.author.firstName}
                                  width={24}
                                  height={24}
                                  className="w-full h-full object-cover rounded-sm"
                                />
                              </div>
                            ) : (
                              <User2
                                size={18}
                                className="border-1 content-center m-y-2 h-6 w-7 rounded-sm"
                              />
                            )}
                            <p className="capitalize">
                              {item.author.firstName +
                                " " +
                                item.author.lastName}
                            </p>
                          </div>
                          <div className="flex max-md:justify-between max-md:text-xs">
                            <p className="">{formatDate(item.createdAt)}</p>
                            <p className="">🏷️ {item.category}</p>
                          </div>
                        </div>
                        <p className="font-semiboldmax-md:flex-wrap flex ">
                          {wordLimit(item.title)}
                        </p>

                        <div className="flex justify-between text-gray-500 w-full max-md:flex-wrap max-md:gap-3">
                          <div className=" flex gap-2 content-center max-md:h-10 max-md:justify-between">
                            <div className="flex rounded-full justify-center p-3 gap-3 content-center bg-gray-200 h-[80%] w-20 ">
                              <Heart
                                color={`${
                                  item.loves.indexOf(loggedInUserId()!) !== -1
                                    ? "red"
                                    : "gray"
                                }`}
                                fill={`${
                                  item.loves.indexOf(loggedInUserId()!) !== -1
                                    ? "red"
                                    : "transparent"
                                }`}
                                className="-mt-1 max-md:-mt-2"
                              />

                              <span className="h-fit flex -mt-1.5 max-md:-mt-2.5 text-md font-semibold">
                                {item.loveCount}
                              </span>
                            </div>
                            <div className="flex rounded-full justify-center p-3 gap-3 content-center bg-gray-200 h-[80%]  w-20">
                              <MessageSquareMore className="-mt-1 max-md:-mt-2" />{" "}
                              <span className="h-fit flex -mt-1.5 max-md:-mt-2.5 text-md font-semibold">
                                {item.commentCount}
                              </span>
                            </div>
                          </div>

                          <div className="flex content-center gap-2 max-md:h-[50%] max-md:justify-between max-md:w-full">
                            <p>
                              {item.readTime} min
                              {item.readTime != "1" ? "s" : null} read
                            </p>
                            <Bookmark className="bg-gray-200 rounded-full h-8 w-8 p-1" />
                          </div>
                        </div>
                      </div>

                      <div className="w-40 h-30 content-center rounded-md max-md:flex max-md:my-auto max-lg:w-[25%] max-md:w-[30%]">
                        <Image
                          // src={"http://localhost:3001/" + item.articleImg}
                          src={`${baseUrl}${item.articleImg}`}
                          alt={item.title}
                          className="mb-3 w-full h-full object-cover rounded-md"
                          width={144}
                          height={144}
                        />
                      </div>
                    </>
                  )}
                </div>
              </Link>
            ))}
          </div>
        </>
      ) : (
        <>
          {isSuccess &&
          (!topTwoToFourBlogs || topTwoToFourBlogs.length === 0) ? (
            <div className=" flex h-120 max-md:h-fit w-full flex-col border rounded-md">
              <Image
                src={"/downloadblog.jpeg"}
                alt="blog site image"
                width={90}
                height={40}
                className="object-cover h-[55%] w-full rounded-t-sm"
              />
              <p className="font-extrabold text-5xl text-green-500 p-2">
                Stay tuned for more interesting blogs!
              </p>
              <p className="mt-5 p-2">
                You can also register, then login in to add your amazing stories
                to this blog site.
              </p>
            </div>
          ) : null}
        </>
      )}
    </div>
  );
};
