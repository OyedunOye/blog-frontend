"use client";

import {
  authors,
  categories,
  popularPostsList,
  trendingTopics,
} from "@/constants";
import { Button } from "../ui/button";
import MaxWidth from "../common/MaxWidthWrapper";
import Image, { StaticImageData } from "next/image";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { ArticleCards } from "./ArticleCards";
import { useGetAllAuthors } from "@/hooks/authors/useGetAllAuthors";
import Loading from "../common/Loader";
import AvatarRenderer from "../common/Avatar";
import { useEffect, useState } from "react";

interface Blogs {
  // blogs: {
  _id: string;
  title: string;
  blogContent: string;
  articleImg: string;
  category: string;
  createdAt: string;
  // };
}

interface Authors {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  authorImg: StaticImageData;
  createdAt: string;
  updatedAt: string;
  blogs: Blogs[];
}

const ExpandedArticles = () => {
  const { data, isLoading, isSuccess } = useGetAllAuthors();
  const [allAuthors, setAllAuthors] = useState<Authors[]>([]);
  const [topFiveAuthors, setTopFiveAuthors] = useState<Authors[]>([]);

  useEffect(() => {
    if (data) {
      setAllAuthors(data.authors);
      setTopFiveAuthors(data.authors.slice(0, 5));
    }
  }, [data]);

  return (
    <>
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

            {isSuccess ? (
              <>
                {data ? (
                  <div className="bg-[#F3F4F6] flex-col border px-2 py-6 rounded-md">
                    <div className="flex justify-between">
                      <h4 className="font-bold text-md">✍️ Discover Authors</h4>
                      <Button variant="ghost">View all</Button>
                    </div>
                    <div className="flex flex-col gap-2">
                      {topFiveAuthors.map((author: Authors) => (
                        <div key={author.firstName} className="my-2">
                          <div className="flex gap-4 content-center">
                            {author.authorImg ? (
                              <AvatarRenderer
                                src={
                                  "http://localhost:3001/" + author.authorImg
                                }
                                className="w-20 h-20"
                              />
                            ) : (
                              <AvatarRenderer
                                src={"http://localhost:3000/user-dummy.png"}
                                className="h-20 w-20"
                              />
                            )}
                            <div className="flex flex-col gap-2">
                              <h5 className="font-bold text-md content-center capitalize">
                                {author.firstName + " " + author.lastName}
                              </h5>
                              <p className="text-sm text-gray-500 content-center">
                                {`Author of ${author.blogs[0].title}`}
                              </p>
                              <p className="text-sm text-gray-500 content-center">
                                {/* {`${author.blogs.length} blogs`} */}
                                {`${author.blogs.length} ${
                                  author.blogs.length > 1 ? "blogs" : "blog"
                                }`}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <Loading message="No authors are available at the moment!" />
                )}
              </>
            ) : (
              <Loading message=" Loading author details" />
            )}
          </div>
        </MaxWidth>
      </section>
    </>
  );
};

export default ExpandedArticles;
