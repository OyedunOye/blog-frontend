import { useGetAUser } from "@/hooks/authors/useGetAUser";
import React from "react";
import Loader from "../common/Loader";
import CleanSlate from "../common/CleanSlate";
import { BlogType } from "../Home/LatestArticles";
import Link from "next/link";
import Image from "next/image";
import AvatarRenderer from "../common/Avatar";
import { formatDate, loggedInUserId } from "@/utils";
import { wordLimit } from "@/utils/helpers";
import { Button } from "../ui/button";
import { Bookmark, Heart, MessageSquareMore } from "lucide-react";
import NoServerConnectionWarning from "../common/NoServerConnectionWarning";

const Bookmarks = () => {
  const { data, isLoading, isError, isSuccess } = useGetAUser();

  return (
    // <div>FavouritesAndSaved</div>
    <div className="w-full">
      {isLoading && !isError ? (
        <Loader
          message="Loading your saved blogs"
          className="w-full h-[480px]"
        />
      ) : null}
      {isError ? (
        <NoServerConnectionWarning
          message="Server is unreachable, unable to load the saved blogs at the
                        moment. Please try again later."
        />
      ) : null}

      <div className="flex items-center gap-8 flex-wrap">
        {isSuccess &&
        (!data.user.bookmarked || data.user.bookmarked.length < 1) ? (
          <CleanSlate message="You are yet to bookmark any blog on this site." />
        ) : (
          <>
            {isSuccess && data.user.bookmarked.length > 1
              ? data.user.bookmarked.map((data: BlogType) => (
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
                      <div className="flex justify-between text-gray-500 ">
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
    </div>
  );
};

export default Bookmarks;
