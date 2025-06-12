"use client";

import { AppContext } from "@/context/AppContext";
import { CircleXIcon } from "lucide-react";
import React, { useContext } from "react";

const BlogContentTextColorWarning = () => {
  const { dispatch } = useContext(AppContext);

  const handleCloseModal = () => {
    dispatch({
      type: "CONTENT_TEXT_COLOR_WARNING",
      payload: false,
    });
  };
  return (
    <div className="w-full h-full flex bg-black/90 fixed top-15 right-0  justify-center content-center z-99">
      <div className="flex flex-col w-150 max-md:w-80 bg-white dark:bg-black/99 dark:shadow-slate-700 h-fit rounded-2xl p-6 content-center shadow-2xl my-auto gap-1 text-md">
        <div className="flex justify-end content-center w-full relative -mt-5 -mr-2 mb-2 h-10  p-1 ">
          <CircleXIcon
            className="cursor-pointer"
            size={38}
            onClick={handleCloseModal}
          />
        </div>
        <p className="">
          The blog content text editor is color sensitive! Please if you copy
          text from a dark background source or a webpage, there is a high
          possibility that your black text will retain its color in dark mode of
          this app and be invisible for readers. Kindly test the darkmode to see
          how your blog will be displayed to readers and take advantage of the
          text colour option on the text editor to modify your text color as
          necessary.{" "}
        </p>
        <p className="">Please close this notification to write your blog.</p>
        <p className="">Thank you!</p>
      </div>
    </div>
  );
};

export default BlogContentTextColorWarning;
