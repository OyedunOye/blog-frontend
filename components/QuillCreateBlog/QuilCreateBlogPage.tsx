"use client";

import React, { useContext, useState } from "react";
import MaxWidth from "../common/MaxWidthWrapper";
import { Button } from "../ui/button";
import Link from "next/link";
import Loading from "../common/Loader";
import QuillCreateBlogForm from "./QuillCreateBlogForm";
import { AppContext } from "@/context/AppContext";
import BlogContentTextColorWarning from "../modals/BlogContentTextColorWarning";
import { InfoIcon } from "lucide-react";

const QuillCreateBlogPage = () => {
  const [homePageLoading, setHomePageLoading] = useState<boolean>(false);

  const { dispatch, state } = useContext(AppContext);
  const handleClickBack = () => {
    setHomePageLoading(true);
    dispatch({
      type: "BLOGCONTENT_WARN",
      payload: "No",
    });
  };

  const handleInfoClick = () => {
    dispatch({
      type: "CONTENT_TEXT_COLOR_WARNING",
      payload: true,
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
        <div className="bg-[#F3F4F6] dark:bg-black/99 w-full text-center h-56 pt-10 p-2 overflow-x-hidden">
          <h3 className="font-bold text-xl">✍️ Create Blog</h3>
          <p className="text-md text-slate-600 dark:text-white">
            {" "}
            Welcome to create blog post dashboard
          </p>
          <div className="flex content-center justify-center cursor-pointer absolute top-22 right-4 h-10 w-10 p-1 ">
            <InfoIcon onClick={handleInfoClick} size={50} />
          </div>
          {state.contentTextColorWarning && <BlogContentTextColorWarning />}
        </div>

        <MaxWidth className="h-fit py-10 w-3/4 max-lg:w-[88%] max-md:w-[95%] justify-center relative -top-24 bg-white dark:bg-slate-900 border rounded-lg shadow-md">
          <div className="w-9/10 max-lg:w-[100%]  justify-center mx-auto">
            <QuillCreateBlogForm />

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
