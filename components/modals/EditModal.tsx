"use client";

import React, { useContext } from "react";
import MaxWidth from "../common/MaxWidthWrapper";
import { Button } from "../ui/button";
import { AppContext } from "@/context/AppContext";
import QuillEditBlogForm from "../QuillEditBlogForm/QuillEditBlogForm";

const QuillEditBlogModal = () => {
  const { dispatch, state } = useContext(AppContext);

  const handleClickBack = () => {
    let payload = {
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
    <>
      <div className="absolute top-0 left-0 bg-black/80 w-full min-h-full z-[80]">
        <MaxWidth className="h-contain py-5 w-2/3 justify-center bg-white border rounded-lg shadow-md ">
          <h3 className="font-bold text-xl text-center mb-4">✍️ Edit Blog</h3>
          <div className="w-4/5 justify-center mx-auto">
            <QuillEditBlogForm />

            <Button
              variant="ghost"
              className="mx-auto justify-center flex"
              onClick={handleClickBack}
            >
              Back
            </Button>
          </div>
        </MaxWidth>
      </div>
    </>
  );
};

export default QuillEditBlogModal;
