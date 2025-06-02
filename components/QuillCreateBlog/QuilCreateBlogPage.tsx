"use client";

import React, { useContext, useState } from "react";
import MaxWidth from "../common/MaxWidthWrapper";
import { Button } from "../ui/button";
import Link from "next/link";
import Loading from "../common/Loader";
import QuillCreateBlogForm from "./QuillCreateBlogForm";
import { AppContext } from "@/context/AppContext";

const QuillCreateBlogPage = () => {
  const [homePageLoading, setHomePageLoading] = useState<boolean>(false);
  const { dispatch } = useContext(AppContext);
  const handleClickBack = () => {
    setHomePageLoading(true);
    dispatch({
      type: "BLOGCONTENT_WARN",
      payload: "No",
    });
  };

  return (
    <>
      {homePageLoading ? (
        <Loading
          className="min-h-screen z-99 bg-transparent"
          message="Loading home page"
        />
      ) : null}

      <div className="flex flex-col">
        <div className="bg-[#F3F4F6] w-full text-center h-56 pt-10 p-2">
          <h3 className="font-bold text-xl">✍️ Create Blog</h3>
          <p className="text-md text-slate-600">
            {" "}
            Welcome to create blog post dashboard
          </p>
        </div>

        <MaxWidth className="h-fit py-10 w-3/4 max-lg:w-[88%] max-md:w-[95%] justify-center relative -top-24 bg-white border rounded-lg shadow-md">
          <div className="w-9/10 max-lg:w-[100%] max-md:mt-20 justify-center mx-auto">
            <QuillCreateBlogForm />

            {/* <div className="justify-center flex w-full mx-auto"></div> */}

            <Link href={"/"} className="justify-center flex">
              <Button
                onClick={handleClickBack}
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

export default QuillCreateBlogPage;
