"use client";

import { categories } from "@/constants";
import { Button } from "../ui/button";
import MaxWidth from "../common/MaxWidthWrapper";

import { useGetAllAuthors } from "@/hooks/authors/useGetAllAuthors";
import Loading from "../common/Loader";
import AvatarRenderer from "../common/Avatar";
import { useEffect, useState } from "react";
import { getInitials } from "@/utils/helpers";

interface Blogs {
  _id: string;
  title: string;
  blogContent: string;
  articleImg: string;
  category: string;
  createdAt: string;
}

interface Authors {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  authorImg: string;
  createdAt: string;
  updatedAt: string;
  blogs: Blogs[];
}

const TheAuthors = () => {
  const { data, isLoading, isSuccess, isError } = useGetAllAuthors();
  const [allAuthors, setAllAuthors] = useState<Authors[]>([]);
  const [topFifteenAuthors, setTopFifteenAuthors] = useState<Authors[]>([]);
  const [allClicked, setAllClicked] = useState<boolean>(false);

  const baseUrl = process.env.NEXT_PUBLIC_UPLOAD_URL;

  useEffect(() => {
    if (data) {
      setAllAuthors(data.authors);
      setTopFifteenAuthors(data.authors.slice(0, 6));
    }
  }, [data]);

  const toggleAuthorDisplay = () => {
    if (allClicked) {
      setAllClicked(false);
      return;
    }
    setAllClicked(true);
  };

  return (
    <section className="my-4">
      <MaxWidth className="w-full">
        <div className="flex flex-col  gap-3">
          <div className="flex flex-col border p-2 rounded-md bg-[#F3F4F6]">
            <div className="flex">
              <h4 className="font-bold text-md">🏷️ Tags</h4>
            </div>
            <div className="flex gap-4 my-4">
              {categories.map(({ category }) => (
                <Button key={category} variant="outline">
                  {category}
                </Button>
              ))}
            </div>
          </div>

          <div className="bg-[#F3F4F6] flex-col border px-2 py-6 rounded-md">
            <>
              <div className="flex justify-between">
                <h4 className="font-bold text-md">✍️ Discover Authors</h4>
                {!isError && !isLoading ? (
                  <p className="font-bold text-md mr-2">
                    {allAuthors.length} author{allAuthors.length > 1 && "s"}
                  </p>
                ) : null}
              </div>

              {isLoading && !isError ? (
                <Loading message="Loading blog's authors section" />
              ) : null}
              {isError ? (
                <div className="flex content-center h-50 py-auto my-20 justify-center">
                  <p className="font-bold">
                    Server is unreachable, unable to load the author's section
                    at the moment. Please try again later.
                  </p>
                </div>
              ) : null}

              {isSuccess && data ? (
                <>
                  <div className="flex flex-wrap gap-2 my-3 ml-4">
                    {(!allClicked ? topFifteenAuthors : allAuthors).map(
                      (author: Authors) => (
                        <div
                          key={author.firstName}
                          className="my-2 w-[32%] border border-slate-200 rounded-sm p-2 shadow-sm"
                        >
                          <div className="flex gap-4 content-center">
                            <AvatarRenderer
                              src={
                                author.authorImg
                                  ? baseUrl + author.authorImg
                                  : "/user-dummy.png"
                              }
                              fallBack={getInitials(
                                author.firstName + " " + author.lastName
                              )}
                              className="w-20 h-20 bg-white text-3xl"
                            />
                            <div className="flex flex-col gap-2">
                              <h5 className="font-bold text-md content-center capitalize">
                                {author.firstName + " " + author.lastName}
                              </h5>
                              <p className="text-sm text-gray-500 content-center">
                                {`Author of ${author.blogs[0].title}`}
                              </p>
                              <p className="text-sm text-gray-500 content-center">
                                {`${author.blogs.length} ${
                                  author.blogs.length > 1 ? "blogs" : "blog"
                                }`}
                              </p>
                            </div>
                          </div>
                        </div>
                      )
                    )}
                  </div>
                  {data.authors.length > 6 ? (
                    <div className="flex justify-end">
                      <Button onClick={toggleAuthorDisplay} variant="ghost">
                        {!allClicked ? "View all" : "Minimize"}
                      </Button>
                    </div>
                  ) : null}
                </>
              ) : null}
              {isSuccess && !data ? (
                <div className="flex content-center h-fit justify-center">
                  <p className="font-bold">
                    No authors are available in our server at the moment. You
                    can register, login and create a blog to be our first
                    author!
                  </p>
                </div>
              ) : null}
            </>
          </div>
        </div>
      </MaxWidth>
    </section>
  );
};

export default TheAuthors;
