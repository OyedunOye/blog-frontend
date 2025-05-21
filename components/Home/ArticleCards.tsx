"use client";

import Link from "next/link";
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
import { formatDate, loggedInUserId } from "@/utils";
import Loader from "../common/Loader";

import { useGetAllBlogs } from "@/hooks/blog/useGetBlogs";
import { wordLimit } from "@/utils/helpers";
import { getCookie } from "cookies-next/client";
import { getDecodedToken } from "@/hooks/getDecodeToken/getDecodedToken";

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
  const { data, isLoading, isError, error, isSuccess } = useGetAllBlogs();
  const [dataDuplicate, setDataDuplicate] = useState<BlogType[]>([]);
  const [topTwoToFourBlogs, setTopTwoToFourBlogs] = useState<BlogType[]>([]);
  //   console.log(topTwoToFourBlogs);

  const token = getCookie("token");

  useEffect(() => {
    if (data) {
      setDataDuplicate(data.blogs),
        setTopTwoToFourBlogs(data.blogs.slice(1, 4));
    }
  }, [data]);

  // console.log(loggedInUser());

  return (
    <div className="w-full">
      {isSuccess && dataDuplicate && topTwoToFourBlogs ? (
        <div className="flex flex-col  gap-4 border rounded-md w-full divide-y">
          {topTwoToFourBlogs.map((item) => (
            <Link
              key={item.title}
              href={`/blog/${item._id}`}
              className="h-40 w-full"
            >
              <div className="flex w-full h-full p-2 justify-between">
                <div className="flex flex-col h-20 w-90 my-2 gap-3 p-2">
                  <div className="flex gap-2 text-sm text-gray-500 ">
                    {item.author.authorImg ? (
                      <div className="w-6 h-6 rounded-sm">
                        <Image
                          src={"http://localhost:3001/" + item.author.authorImg}
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
                      {item.author.firstName + " " + item.author.lastName}
                    </p>
                    <p className="">{formatDate(item.createdAt)}</p>
                    <p className="">🏷️ {item.category}</p>
                  </div>
                  <p className="font-semibold h-40 border">
                    {wordLimit(item.title)}
                  </p>

                  <div className="flex justify-between text-gray-500 w-full ">
                    <div className=" flex gap-2 content-center ">
                      <div className="flex rounded-full justify-center p-3 gap-3 content-center bg-gray-200 h-[80%] w-20">
                        {item.loves.indexOf(loggedInUserId()!) !== -1 ? (
                          <Heart color="red" fill="red" className="-mt-1" />
                        ) : (
                          <Heart className="-mt-1" />
                        )}
                        <span className="h-fit flex -mt-1.5 text-md font-semibold">
                          {item.loveCount}
                        </span>
                      </div>
                      <div
                        // variant="outline"
                        // className="rounded-full bg-gray-200 h-[80%] "
                        className="flex rounded-full justify-center p-3 gap-3 content-center bg-gray-200 h-[80%] w-20"
                      >
                        <MessageSquareMore className="-mt-1" />{" "}
                        <span className="h-fit flex -mt-1.5 text-md font-semibold">
                          {item.commentCount}
                        </span>
                      </div>
                    </div>

                    <div className="flex content-center gap-2">
                      <p>{item.readTime} min read</p>
                      <Bookmark className="bg-gray-200 rounded-full h-8 w-8 p-1" />
                      <CircleEllipsis className="bg-gray-200 rounded-full h-8 w-8 p-1" />
                    </div>
                  </div>
                </div>

                <div className="w-40 h-30 content-center rounded-md">
                  <Image
                    src={"http://localhost:3001/" + item.articleImg}
                    alt={item.title}
                    className="mb-3 w-full h-full object-cover rounded-md"
                    width={144}
                    height={144}
                  />
                </div>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <Loader message="Loading" />
      )}
    </div>
  );
};
