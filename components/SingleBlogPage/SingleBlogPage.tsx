"use client";

import { useGetASingleBlog } from "@/hooks/blog/useGetBlogs";
import React from "react";
import MaxWidth from "../common/MaxWidthWrapper";
import { formatDate } from "@/utils";
import DotDivider from "../common/DotDivider";
import Loader from "../common/Loader";
import Image from "next/image";
import { useParams } from "next/navigation";

interface BlogPageProps {
  params: {
    blogId: string;
  };
}

const SingleBlogPage = () => {
  // const SingleBlogPage = ({ params }: BlogPageProps) => {
  const blogId = "68114006d8fb3beeef33d66c";

  // const { blogId } = useParams();

  // const blogId = Array.isArray(params.blogId)
  //   ? params.blogId[0]
  //   : params.blogId;

  const { data, isLoading, isError, error } = useGetASingleBlog(
    blogId as string
  );
  console.log(data);
  return (
    <>
      {isLoading ? (
        <Loader message="Loading single page" />
      ) : (
        <MaxWidth className="flex flex-col h-full gap-0">
          <div className="h-40 bg-indigo-600/20 mb-6 w-full rounded-sm p-2 gap-4">
            <h1 className="font-extrabold text-5xl mb-3">
              {data.blog[0].title}
            </h1>
            <div className="flex content-center gap-3">
              <p className="capitalize">
                {data.blog[0].author.firstName +
                  " " +
                  data.blog[0].author.lastName}
              </p>
              <DotDivider />
              <p className="">{formatDate(data.blog[0].createdAt)}</p>
              <DotDivider />
              <p className="">
                {data.blog[0].readTime < 1
                  ? data.blog[0].readTime + " min read"
                  : data.blog[0].readTime + " mins read"}
              </p>
              <p className="">🏷️ {data.blog[0].category}</p>
            </div>
          </div>
          {/* <div className="flex flex-col ">{data.blog[0].blogContent}</div> */}
          <div className="w-full mt-0">
            <Image
              src={"http://localhost:3001/" + data.blog[0].articleImg}
              alt={data.blog[0].title}
              height={30}
              width={100}
              className="object-cover w-full h-80 border"
            />
          </div>
          <div
            className="prose overflow-hidden mt-5"
            dangerouslySetInnerHTML={{ __html: data.blog[0].blogContent }}
          ></div>
          <p className=""></p>
        </MaxWidth>
      )}
    </>
  );
};

export default SingleBlogPage;
