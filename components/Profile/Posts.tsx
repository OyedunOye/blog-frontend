"use client";

import Image, { StaticImageData } from "next/image";
import { Button } from "../ui/button";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "../ui/pagination";
import { useGetAUser } from "@/hooks/authors/useGetAUser";
import Loading from "../common/Loader";
import { limContentToThirtyWords } from "@/utils/helpers";
import Link from "next/link";
import { useContext, useState } from "react";
import { AppContext } from "@/context/AppContext";
import DeleteConfirmation from "../modals/DeleteConfirmation";

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

const baseUrl = process.env.NEXT_PUBLIC_UPLOAD_URL;

const Posts = () => {
  const { data, isLoading, isSuccess, error, isError } = useGetAUser();
  const { state, dispatch } = useContext(AppContext);

  const handleDeleteClick = (blogData: BlogType) => {
    let payload = {
      deleteModal: true,
      storedBlogId: blogData._id,
      singleBlogDetail: blogData,
    };
    dispatch({
      type: "CONFIRM_DELETE",
      payload: payload,
    });
  };

  console.log(data);

  return (
    <>
      {state.deleteModal ? <DeleteConfirmation /> : null}
      {isLoading && !isError ? <Loading message="Loading your posts" /> : ""}
      {isError ? (
        <div className="flex content-center h-full py-auto my-20 justify-center">
          <p className="font-bold">
            Server is unreachable, unable to load the blog section at the
            moment. Please try again later.
          </p>
        </div>
      ) : (
        ""
      )}

      {isSuccess && data ? (
        <div className="w-full flex flex-col gap-y-6">
          <h5 className="text-sm text-gray-600">
            You have posted{" "}
            <span className="font-semibold text-gray-800">
              {data.user.blogs.length}{" "}
            </span>
            blog{data.user.blogs.length > 1 ? "s" : ""}
          </h5>
          {data.user.blogs.length < 1 ? (
            <div className=" flex-col border h-90 rounded-md shadow-sm gap-5 p-2">
              <p className="font-bold capitalize">
                Hello {data.user.firstName} {data.user.lastName}!
              </p>
              <p className="mt-3">
                You have not created any blog yet, you can create your first
                blog today by clicking{" "}
                <Link href={"/create-blog"} className="text-blue-600 underline">
                  this link
                </Link>
                .
              </p>
            </div>
          ) : (
            <>
              <div className="flex flex-col gap-y-8 w-full">
                {data.user.blogs.map((blog: BlogType) => (
                  <div
                    key={blog._id}
                    className="bg-gray-200 w-200 p-5 flex gap-x-10 rounded-tl-xl rounded-br-xl shadow-md hover:shadow-lg"
                  >
                    <div className="w-[20%] h-50">
                      <Image
                        src={`${baseUrl}` + blog.articleImg}
                        alt="blog cover image"
                        height={860}
                        width={848}
                        className="object-cover h-38 rounded-sm"
                      />
                    </div>
                    <div className="w-[75%] flex flex-col gap-y-4">
                      <h4 className="text-lg font-bold">{blog.title}</h4>
                      <p
                        className="text-gray-600 text-sm"
                        dangerouslySetInnerHTML={{
                          __html: limContentToThirtyWords(blog.blogContent),
                        }}
                      ></p>

                      <div className="flex items-center justify-end gap-x-4 mt-5">
                        <Link href={`/blog/${blog._id}`}>
                          <Button
                            variant="default"
                            className="bg-green-400 hover:bg-green-300 rounded-md w-30"
                          >
                            Edit Blog
                          </Button>
                        </Link>
                        <Button
                          variant="destructive"
                          className="cursor-pointer"
                          onClick={() => handleDeleteClick(blog)}
                        >
                          Delete Blog
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex justify-between mt-6 pr-4">
                <Pagination className="justify-start mx-0 w-1/2">
                  <PaginationContent>
                    <PaginationItem>
                      <PaginationPrevious href="#" />
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink href="#">1</PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationEllipsis />
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationNext href="#" />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>

                <Button variant="default">See more</Button>
              </div>
            </>
          )}
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default Posts;
