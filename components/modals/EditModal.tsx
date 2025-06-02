"use client";

import React, { useContext } from "react";
import MaxWidth from "../common/MaxWidthWrapper";
import { Button } from "../ui/button";
import { AppContext } from "@/context/AppContext";
import QuillEditBlogForm from "../QuillEditBlogForm/QuillEditBlogForm";

const QuillEditBlogModal = () => {
  const { dispatch } = useContext(AppContext);

  const handleClickBack = () => {
    const payload = {
      openEditModal: false,
      storedBlogId: null,
      singleBlogDetail: null,
    };
    dispatch({
      type: "CLOSE_EDIT_MODAL",
      payload: payload,
    });
  };

  return (
    <div className="fixed top-0 left-0 bg-black/80 w-full h-full z-[50]">
      <div className="w-full h-full flex content-center justify-center">
        {/* provided fixed width for MaxWidth because contents with list of short sentences have very shrinked container causing the toolbar to wrap and look ugly with the initial w-[80%]. w-250 maintains a consistent look irrespective of the length of the contents itself. Also looks better and consistent when switched the inner div to w-168. */}
        <MaxWidth className="w-200 max-lg:w-180 max-md:w-[90%] max-md:mx-1 py-10 h-[80%] my-auto justify-center bg-white border content-center rounded-lg overflow-y-auto overflow-x-hidden">
          <div className="w-168 max-lg:w-160 max-md:w-[100%] my-10 h-full justify-center mx-auto">
            <h3 className="font-bold text-xl text-center mb-4">✍️ Edit Blog</h3>
            <QuillEditBlogForm />

            <div className="h-15">
              <Button
                variant="ghost"
                className="mx-auto mb-10 justify-center flex"
                onClick={handleClickBack}
              >
                Back
              </Button>
            </div>
          </div>
        </MaxWidth>
      </div>
    </div>
  );
};

export default QuillEditBlogModal;
