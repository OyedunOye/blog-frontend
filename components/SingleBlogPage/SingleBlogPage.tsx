"use client";

import { useGetASingleBlog } from "@/hooks/blog/useGetBlogs";
import React from "react";
import MaxWidth from "../common/MaxWidthWrapper";
import { formatDate } from "@/utils";
import Loader from "../common/Loader";
import AvatarRenderer from "../common/Avatar";

interface BlogPageProps {
  blogId: string;
}

const SingleBlogPage = ({ blogId }: BlogPageProps) => {
  const { data, isLoading, isError, error, isSuccess } =
    useGetASingleBlog(blogId);
  console.log(data);
  return (
    <>
      {isLoading ? (
        <Loader message="Loading single page" />
      ) : (
        <div className=" ">
          <div className="w-full mb-6 rounded-sm bg-indigo-600/20">
            <MaxWidth className="min-h-40  w-full flex-row justify-between">
              <h1 className="font-extrabold text-5xl py-1 mb-3 w-3/5">
                {data.blog[0].title}
              </h1>

              <div className="flex w-[1.8/5] p-2 justify-between">
                {data.blog[0].author.authorImg ? (
                  <AvatarRenderer
                    src={
                      "http://localhost:3001/" + data.blog[0].author.authorImg
                    }
                    className="h-40 w-40"
                  />
                ) : (
                  <AvatarRenderer
                    src={"http://localhost:3000/user-dummy.png"}
                    className="h-40 w-40"
                  />
                )}
                <div className="flex flex-col content-center gap-3 p-1 text-gray-500">
                  <p className="capitalize">
                    {" "}
                    Author:
                    {" " +
                      data.blog[0].author.firstName +
                      " " +
                      data.blog[0].author.lastName}
                  </p>
                  <p className="">
                    Published on: {" " + formatDate(data.blog[0].createdAt)}
                  </p>
                  <p className="">🏷️ {data.blog[0].category}</p>
                  <p className="">
                    {data.blog[0].readTime < 2
                      ? data.blog[0].readTime + " min read"
                      : data.blog[0].readTime + " mins read"}
                  </p>
                </div>
              </div>
            </MaxWidth>
          </div>
          <MaxWidth className="flex flex-col h-full gap-0 w-full">
            <div
              className="prose overflow-hidden mt-2"
              dangerouslySetInnerHTML={{ __html: data.blog[0].blogContent }}
            ></div>
            <p className=""></p>
          </MaxWidth>
        </div>
      )}
    </>
  );
};

export default SingleBlogPage;
