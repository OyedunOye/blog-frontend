import QuilCreateBlogPage from "@/components/QuillCreateBlog/QuilCreateBlogPage";
import React, { Suspense } from "react";

const WriteBlogPageScreen = () => {
  return (
    <Suspense>
      <div className="">
        <QuilCreateBlogPage />
      </div>
    </Suspense>
  );
};

export default WriteBlogPageScreen;
