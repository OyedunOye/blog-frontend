"use client";

import React, { useState } from "react";
import MaxWidth from "../common/MaxWidthWrapper";
import { Button } from "../ui/button";
import Link from "next/link";
import Loading from "../common/Loader";
import NewBlogForm from "./NewBlogForm";

const WriteBlogPage = () => {
  const [homePageLoading, setHomePageLoading] = useState<boolean>(false);
  // const [signUpPageLoading, setSignUpPageIsLoading] = useState<boolean>(false);

  console.log("homepageloading", homePageLoading);

  return (
    <>
      {homePageLoading ? (
        <Loading
          className="min-h-screen z-99 bg-transparent"
          message="Loading home page"
        />
      ) : (
        ""
      )}

      <div className="flex flex-col">
        <div className="bg-[#F3F4F6] w-full text-center h-56 pt-10 p-2">
          <h3 className="font-bold text-xl">✍️ Create Blog</h3>
          <p className="text-md text-slate-600">
            {" "}
            Welcome to create blog post dashboard
          </p>
        </div>

        <MaxWidth className="h-contain py-10 w-2/3 justify-center relative -top-24 bg-white border rounded-lg shadow-md">
          <div className="w-1/2 justify-center mx-auto">
            <NewBlogForm />

            {/* <div className="justify-center flex w-full mx-auto"></div> */}

            <Link href={"/"} className="justify-center flex">
              <Button
                onClick={() => setHomePageLoading(true)}
                variant="ghost"
                className="mx-auto"
              >
                Return home
              </Button>
            </Link>
          </div>
        </MaxWidth>
      </div>
    </>
  );
};

export default WriteBlogPage;
