"use client";

import Image, { StaticImageData } from "next/image";
import { Button } from "../ui/button";
import {
  Pagination,
  PaginationContent,
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

const Posts = () => {
  const { data, isLoading, isSuccess, isError } = useGetAUser();
  const { state, dispatch } = useContext(AppContext);

  const [currentPage, setCurrentPage] = useState<number>(1);

  const blogsPerPage = 3;

  const indexOfLastBlog = currentPage * blogsPerPage;
  const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;

  const currentBlogs = data
    ? data?.user?.blogs.slice(indexOfFirstBlog, indexOfLastBlog)
    : [];

  const totalPages = data
    ? Math.ceil(data?.user?.blogs.length / blogsPerPage)
    : 0;

  const handleDeleteClick = (blogData: BlogType) => {
    const payload = {
      deleteModal: true,
      storedBlogId: blogData._id,
      singleBlogDetail: blogData,
    };
    dispatch({
      type: "CONFIRM_DELETE",
      payload: payload,
    });
  };

  return (
    <>
      {state.deleteModal ? <DeleteConfirmation /> : null}
      {isLoading && !isError ? <Loading message="Loading your posts" /> : ""}
      {isError ? (
        <div className="flex max-md:flex-col max-md:mt-4 max-md:p-2 content-center h-fit py-auto gap-2 rounded-sm shadow-md border">
          <div className="w-[70%] h-fit p-2 flex flex-3/4 content-center">
            <Image
              src={"/warning-sign.webp"}
              alt="warning sign"
              width={200}
              height={200}
              className="object-cover w-full h-full p-3"
            />
          </div>
          <div className="flex content-center py-5">
            <p className="font-bold h-fit my-auto">
              Server connection is lost, unable to load your blogs at the
              moment. Please try again later.
            </p>
          </div>
        </div>
      ) : (
        <>
          {isSuccess && data ? (
            <div className="w-full flex flex-col  gap-y-6">
              <h5 className="text-sm text-gray-600 dark:text-white">
                You have posted{" "}
                <span className="font-semibold text-gray-800 dark:text-white">
                  {data.user.blogs.length}{" "}
                </span>
                blog{data.user.blogs.length > 1 ? "s" : ""}
              </h5>
              {data.user.blogs.length < 1 ? (
                <div className=" flex max-lg:flex-col max-lg:h-fit border h-80 rounded-md shadow-sm gap-5 p-2">
                  <div className="w-[60%] max-lg:w-full h-full p-2 flex content-center">
                    <Image
                      src={"/freshstart.jpeg"}
                      alt="warning sign"
                      width={80}
                      height={40}
                      className="object-cover w-[100%] h-full rounded-md"
                    />
                  </div>
                  <div className="flex flex-col content-center my-auto">
                    <p className="font-bold capitalize">
                      Hello {data.user.firstName} {data.user.lastName}!
                    </p>
                    <p className="mt-3">
                      You have not created any blog yet, you can create your
                      first blog today by clicking{" "}
                      <Link
                        href={"/create-blog"}
                        className="text-blue-600 underline"
                      >
                        this link
                      </Link>
                      .
                    </p>
                  </div>
                </div>
              ) : (
                <>
                  <div className="flex flex-col gap-y-8 w-full">
                    {currentBlogs.map((blog: BlogType) => (
                      <div
                        key={blog._id}
                        className="bg-gray-200 dark:bg-input/30 w-[100%] max-lg:w-[94%] p-5 max-md:p-2 flex gap-x-8  max-md:gap-y-3 max-md:flex-col rounded-tl-xl rounded-br-xl shadow-md hover:shadow-lg"
                      >
                        <div className="w-[20%] max-lg:w-[40%] max-md:w-[100%] h-50 max-md:h-fit">
                          <Image
                            src={blog.articleImg}
                            alt="blog cover image"
                            height={860}
                            width={848}
                            className="object-cover h-38 w-full rounded-sm"
                          />
                        </div>
                        <div className="w-[75%] max-lg:w-[55%] max-md:w-full flex flex-col gap-y-4">
                          <h4 className="text-lg font-bold">{blog.title}</h4>
                          <p
                            className="text-gray-600 dark:text-white text-sm"
                            dangerouslySetInnerHTML={{
                              __html: limContentToThirtyWords(blog.blogContent),
                            }}
                          ></p>

                          <div className="flex items-center justify-end max-md:w-full max-md:justify-between max-lg:w-full gap-x-4 mt-5">
                            <Link href={`/blog/${blog._id}`}>
                              <Button
                                variant="default"
                                className="bg-green-400 hover:bg-green-300 rounded-md w-30 max-lg:w-24"
                              >
                                Edit Blog
                              </Button>
                            </Link>
                            <Button
                              variant="destructive"
                              className="cursor-pointer max-lg:w-24"
                              onClick={() => handleDeleteClick(blog)}
                            >
                              Delete Blog
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="flex w-full mt-6 ">
                    <Pagination>
                      <PaginationContent>
                        <PaginationItem>
                          <PaginationPrevious
                            onClick={() => {
                              setCurrentPage((prev) => Math.max(prev - 1, 1));
                              window.scrollTo(0, 0);
                            }}
                            aria-disabled={currentPage === 1}
                          />
                        </PaginationItem>

                        {Array.from({ length: totalPages }, (_, i) => (
                          <PaginationItem key={i}>
                            <PaginationLink
                              isActive={currentPage === i + 1}
                              onClick={() => {
                                window.scrollTo(0, 0);
                                setCurrentPage(i + 1);
                              }}
                            >
                              {i + 1}
                            </PaginationLink>
                          </PaginationItem>
                        ))}

                        <PaginationItem>
                          <PaginationNext
                            onClick={() => {
                              setCurrentPage((prev) =>
                                Math.min(prev + 1, totalPages)
                              );
                              window.scrollTo(0, 0);
                            }}
                            aria-disabled={currentPage === totalPages}
                          />
                        </PaginationItem>
                      </PaginationContent>
                    </Pagination>
                  </div>
                </>
              )}
            </div>
          ) : null}
        </>
      )}
    </>
  );
};

export default Posts;
