"use client";

import React, { useContext } from "react";
import MaxWidth from "../common/MaxWidthWrapper";
import { Button } from "../ui/button";
import { AppContext } from "@/context/AppContext";
import QuillEditBlogForm from "../QuillEditBlogForm/QuillEditBlogForm";

const QuillEditBlogModal = () => {
  const { dispatch } = useContext(AppContext);

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
    <div className="fixed top-0 left-0 bg-black/80 w-full h-full z-[50]">
      <div className=" w-full h-full flex content-center justify-center">
        <MaxWidth className=" w-2/3 py-10 h-[80%] my-auto justify-center bg-white border content-center rounded-lg overflow-y-auto">
          <div className="w-4/5 my-10 h-full justify-center mx-auto">
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
