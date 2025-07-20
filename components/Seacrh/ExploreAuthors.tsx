"use client";

import Image from "next/image";
// import Link from "next/link";

import { cn } from "@/lib/utils";
import { poppins } from "@/lib/fonts";

import MaxWidth from "../common/MaxWidthWrapper";
import { useGetAllAuthors } from "@/hooks/authors/useGetAllAuthors";
import { useEffect, useState } from "react";
import CleanSlate from "../common/CleanSlate";
import { Authors } from "../Home/TheAuthors";
import NoServerConnectionWarning from "../common/NoServerConnectionWarning";
import DiscoverAuthorsSectionSkeleton from "../LoadingSkeletons/DiscoverAuthorsSectionSkeleton";

const ExploreAuthors = () => {
  const { data, isLoading, isSuccess, isError } = useGetAllAuthors();
  const [blogAuthors, setBlogAuthors] = useState<[]>([]);
  const [numberOfAuthors, setNumberOfAuthors] = useState<number>(0);

  useEffect(() => {
    if (isSuccess && data) {
      // console.log(data);
      setBlogAuthors(data.authors);
      setNumberOfAuthors(data.authors.length);
    }
  }, [data, isSuccess]);

  return (
    <section className="w-full bg-gray-100 dark:bg-slate-800 rounded-t-4xl mb-24">
      <MaxWidth className="flex justify-center content-center w-full py-10">
        <div className="flex flex-col justify-center text-center gap-y-4 mb-6">
          <h3
            className={cn(
              "font-semibold text-[#1F2937] dark:text-white text-4xl",
              poppins.className
            )}
          >
            Explore Authors
          </h3>
          <p className="text-[#6B7280] dark:text-gray-300 text-center">
            {numberOfAuthors} author{numberOfAuthors > 1 ? "s" : null}
          </p>
        </div>

        {isLoading && !isError ? <DiscoverAuthorsSectionSkeleton /> : null}

        {isError ? (
          <NoServerConnectionWarning
            message="Server is unreachable, unable to load the authors at the
                          moment. Please try again later."
          />
        ) : null}

        {isSuccess && blogAuthors && blogAuthors.length < 1 ? (
          <CleanSlate message="There are no blogs on the site at the moment. You can register, login and create the first blog for the site!" />
        ) : (
          <>
            {isSuccess && blogAuthors.length > 0 ? (
              <div className="mt-8 flex items-center gap-8 flex-wrap">
                {blogAuthors.map((author: Authors) => (
                  <div
                    // href={"/"}
                    key={author._id}
                    className="w-[calc(100%/4.5)] max-lg:w-[calc(100%/3.4)] max-md:w-[100%] h-[287px] border shadow-lg hover:shadow-xl rounded-2xl relative bg-white dark:bg-black"
                  >
                    <div className="relative">
                      <Image
                        src={"/authorBackDrop.jpeg"}
                        alt="Author Hero Image"
                        width={400}
                        height={350}
                        className="rounded-t-2xl h-[calc(287px/1.8)] object-cover w-full"
                      />

                      <p className="absolute top-3 left-3 bg-white rounded-full text-sm py-0.5 px-3 text-center dark:text-black">
                        {author.blogs.length}
                      </p>

                      <Image
                        src={
                          author.authorImg
                            ? author.authorImg
                            : "/small-user-dummy.jpg"
                        }
                        width={80}
                        height={80}
                        alt="Author Profile Image"
                        className="rounded-full h-[60px] w-[60px] object-cover absolute left-1/2 -translate-x-1/2 -bottom-8 border-4 border-white"
                      />
                    </div>
                    <div
                      className={cn(
                        "flex flex-col absolute bottom-5 left-1/2 -translate-x-1/2 text-center",
                        poppins.className
                      )}
                    >
                      <h5 className="text-[#1F2937] dark:text-white font-medium text-base w-full capitalize">
                        {author.firstName + " " + author.lastName}
                      </h5>
                      <p className="text-xs text-[#6B7280] dark:text-white">
                        {author.email}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : null}
          </>
        )}
      </MaxWidth>
    </section>
  );
};

export default ExploreAuthors;
