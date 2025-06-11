"use client";

import React from "react";

const BlogContentTextColorWarning = () => {
  return (
    <div className="w-full flex  justify-end absolute z-99">
      <div className="flex flex-col w-150 bg-white dark:bg-black/99 h-fit rounded-2xl p-2 content-center shadow-2xl mt-4 mr-6 justify-end gap-1 text-md">
        <p className="">
          The blog content text editor is color sensitive! Please if you copy
          text from a dark background source or a webpage, there is a high
          probability that your black text will retain its color in dark mode of
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
