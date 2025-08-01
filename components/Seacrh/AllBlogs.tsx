import { useGetAllBlogs } from "@/hooks/blog/useGetBlogs";
import React, { useEffect, useState } from "react";
import { BlogType } from "../Home/LatestArticles";
import Loader from "../common/Loader";
import CleanSlate from "../common/CleanSlate";
import { Bookmark, Heart, Link, MessageSquareMore } from "lucide-react";
import Image from "next/image";
import AvatarRenderer from "../common/Avatar";
import { formatDate, loggedInUserId } from "@/utils";
import { wordLimit } from "@/utils/helpers";
import { Button } from "../ui/button";

const AllBlogs = () => {
  const { data, isLoading, isError, isSuccess } = useGetAllBlogs();

  const [allBlogs, setAllBlogs] = useState<BlogType[]>([]);

  useEffect(() => {
    if (data && isSuccess) {
      setAllBlogs(data.blogs);
    }
  }, [data, isSuccess]);

  return (
    <div className="w-full">
      {isLoading && !isError ? (
        <Loader message="Loading blogs' section" className="w-full h-[480px]" />
      ) : null}

      <div className="mt-8 flex items-center gap-8 flex-wrap">
        {isSuccess && (!allBlogs || allBlogs.length < 1) ? (
          <CleanSlate message="There are no blogs on the site at the moment. You can register, login and create the first blog for the site!" />
        ) : (
          <>
            {isSuccess && allBlogs
              ? allBlogs.map((data) => (
                  <Link
                    href={`/blog/${data._id}`}
                    key={data._id}
                    className="w-[calc(100%/4.5)] max-lg:w-[calc(100%/3.4)] max-md:w-[100%] h-[480px] max-lg:h-[496px] border shadow-lg hover:shadow-xl rounded-2xl"
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
                          <div className="flex flex-col">
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

                      <h3 className="font-bold text-base h-16 max-lg:my-2 text-gray-900">
                        {wordLimit(data.title)}
                      </h3>
                      <div className="flex justify-between text-gray-500">
                        <div className=" flex gap-2">
                          <Button
                            variant="outline"
                            className="rounded-full bg-gray-200"
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
                            className="rounded-full bg-gray-200"
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
    </div>
  );
};

export default AllBlogs;
