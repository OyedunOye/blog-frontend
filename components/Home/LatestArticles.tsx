"use client";

import type { Route } from "next";
import Link from "next/link";
import {
  articleItems,
  articleMenu,
  horizontalArticleCards,
  mainLatestArticle,
} from "@/constants";
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
import { lightBulbsImg } from "../assets/index";
import MaxWidth from "../common/MaxWidthWrapper";
import { getAllBlogs } from "@/services/blog.services";
import { formatDate } from "@/utils";
import Loader from "../common/Loader";

import DotDivider from "../common/DotDivider";
import { useGetASingleBlog, useGetAllBlogs } from "@/hooks/blog/useGetBlogs";

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

export const AriticleCards = () => {
  return (
    <div className="flex flex-col flex-1 gap-4 border rounded-md divide-y">
      {articleItems.map((item) => (
        <div key={item.title} className="flex w-full h-40 p-2 justify-between">
          <div className="flex flex-col h-auto my-auto content-center gap-3 p-2">
            <div className="flex gap-2 text-sm text-gray-500 ">
              <Image
                src={item.authorPhoto}
                alt={item.author}
                width={24}
                height={24}
              />
              <p className="">{item.author}</p>
              <p className="">{item.date}</p>
              <p className="">🏷️ {item.category}</p>
            </div>
            <p className="font-semibold">{item.title}</p>
            <div className="flex justify-between text-gray-500">
              <div className=" flex gap-2">
                <Button variant="outline" className="rounded-full bg-gray-200">
                  <Heart /> {num.loveCount}
                </Button>
                <Button variant="outline" className="rounded-full bg-gray-200">
                  <MessageSquareMore /> {num.commentCount}
                </Button>
              </div>

              <div className="flex content-center gap-2">
                <p>{num.readTime} min read</p>
                <Bookmark className="bg-gray-200 rounded-full h-8 w-8 p-1" />
                <CircleEllipsis className="bg-gray-200 rounded-full h-8 w-8 p-1" />
              </div>
            </div>
          </div>

          <div className="w-[1/4] h-full content-center">
            <Image
              src={item.articlePhoto}
              alt={item.title}
              className="mb-3"
              width={144}
              height={144}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

const LatestArticles = () => {
  const [allBlogs, setAllBlogs] = useState<BlogType[]>([]);
  // const [blogOfTheWeek, setBlogOfTheWeek] = useState<BlogType[]>([]);
  // const blogOfTheWeek = useGetASingleBlog("68114006d8fb3beeef33d66c").data;

  const { data, isLoading, isError, error } = useGetAllBlogs();

  // setBlogOfTheWeek(data);

  useEffect(() => {
    getAllBlogs().then((data) => setAllBlogs(data.blogs));
  }, []);

  // useEffect(() => {
  //   getASingleBlog("68114006d8fb3beeef33d66c").then((data) =>
  //     setBlogOfTheWeek(data.blog)
  //   );
  // }, []);
  // setBlogOfTheWeek(data);

  console.log(data);
  // console.log(useGetASingleBlog("68114006d8fb3beeef33d66c").data);
  // console.log(blogOfTheWeek);

  // const obtainBlogOfTheWeek = () => {
  //   setBlogOfTheWeek(getASingleBlog("68114006d8fb3beeef33d66c"))
  //   // setBlogOfTheWeek(data)
  // }

  console.log("all blogs:", allBlogs);
  return (
    <section className=" mb-6">
      {isLoading ? (
        <Loader message="Loading blogs' section" />
      ) : (
        <MaxWidth className="my-6">
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
                {/* {blogOfTheWeek.map((blog) => ( */}
                <div className="w-full border">
                  <Image
                    src={"http://localhost:3001/" + data.blogs[0].articleImg}
                    // src={lightBulbsImg}
                    alt={data.blogs[2].title}
                    width={90}
                    height={40}
                    className="rounded-t-md object-cover h-80 w-full"
                  />
                </div>
                {/* ))} */}
                {/* {mainLatestArticle.map((story) => ( */}
                <div
                  key={data.blogs[0].title}
                  className="flex flex-col m-4 gap-2"
                >
                  <div className="flex">
                    <div className="flex gap-2 text-sm text-gray-500">
                      {data.blogs[0].author.authorImg ? (
                        <div className="h-6 w-6 border">
                          <Image
                            src={
                              "http://localhost:3001/" +
                              data.blogs[0].author.authorImg
                            }
                            alt={data.blogs[0].author.firstName}
                            width={24}
                            height={24}
                            className="object-cover h-full w-full"
                          />
                        </div>
                      ) : (
                        <User2
                          size={18}
                          className="border-1 content-center m-y-2 h-6 w-7"
                        />
                      )}
                      {/* <Image
                        src={
                          "http://localhost:3001/" +
                          data.blogs[0].author.authorImg
                        }
                        alt={data.blogs[0].author.firstName}
                        width={24}
                        height={24}
                      /> */}
                      <p className="capitalize">
                        {data.blogs[0].author.firstName +
                          "" +
                          data.blogs[0].author.lastName}
                      </p>
                      <p className="">{formatDate(data.blogs[0].createdAt)}</p>
                      <p className="">🏷️ {data.blogs[0].category}</p>
                    </div>
                  </div>

                  <h3 className="font-semibold text-lg">
                    UI Interactions of the week #1
                  </h3>
                  <p className="text-sm text-gray-500">{data.blogs[0].title}</p>
                  <div className="flex justify-between text-gray-500 mt-2">
                    <div className=" flex gap-2">
                      <Button
                        variant="outline"
                        className="rounded-full bg-gray-200"
                      >
                        <Heart /> {num.loveCount}
                      </Button>
                      <Button
                        variant="outline"
                        className="rounded-full bg-gray-200"
                      >
                        <MessageSquareMore /> {num.commentCount}
                      </Button>
                    </div>

                    <div className="flex content-center gap-2">
                      <p>{data.blogs[0].readTime} min read</p>
                      <Bookmark className="bg-gray-200 rounded-full h-8 w-8 p-1" />
                      <CircleEllipsis className="bg-gray-200 rounded-full h-8 w-8 p-1" />
                    </div>
                  </div>
                </div>
                {/* ))} */}
              </div>

              <div className="">
                <AriticleCards />
              </div>
            </div>
          </div>
          <div className="flex gap-4 my-4  w-full flex-wrap">
            {/* horizontalArticleCards */}
            {allBlogs.map((card) => (
              <Link
                key={card.title}
                href={`/${card._id}`}
                className="flex flex-col w-[32%] h-90 gap-2 border rounded-md"
              >
                <div className="flex flex-col w-full h-90 gap-2 border rounded-md ">
                  <div className="flex ">
                    <Image
                      src={"http://localhost:3001/" + card.articleImg}
                      alt={card.title}
                      width={288}
                      height={250}
                      className="rounded-t-md h-56 object-cover w-full"
                      // className="rounded-t-2xl h-[52%] object-cover w-full"
                    />
                  </div>
                  {/* <div
                className="prose overflow-hidden text-ellipsis h-40" // Optional, for better styling if you're using Tailwind Typography plugin
                dangerouslySetInnerHTML={{ __html: card.blogContent }}
              ></div> */}
                  <div className="flex text-sm text-gray-500 p-2 gap-2">
                    <div className="flex gap-2">
                      {card.author.authorImg ? (
                        <div className="h-6 w-6 border">
                          <Image
                            src={
                              "http://localhost:3001/" + card.author.authorImg
                            }
                            alt={card.author.firstName}
                            width={26}
                            height={26}
                            className="object-cover h-full w-full"
                          />
                        </div>
                      ) : (
                        <User2
                          size={18}
                          className="border-1 content-center m-y-2 h-6 w-7"
                        />
                      )}
                      <p className="capitalize">
                        {card.author.firstName + " " + card.author.lastName}
                      </p>
                    </div>

                    <DotDivider />

                    <p className="">{formatDate(card.createdAt.toString())}</p>
                  </div>
                  <h3 className="font-semibold text-lg p-2">{card.title}</h3>
                </div>
              </Link>
            ))}
          </div>
        </MaxWidth>
      )}
    </section>
  );
};

export default LatestArticles;
