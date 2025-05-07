"use client";

import { useGetASingleBlog } from "@/hooks/blog/useGetBlogs";
import React, { useContext, useState } from "react";
import MaxWidth from "../common/MaxWidthWrapper";
import { formatDate } from "@/utils";
import Loader from "../common/Loader";
import AvatarRenderer from "../common/Avatar";
import { getDecodedToken } from "@/hooks/getDecodeToken/getDecodedToken";
import { getCookie } from "cookies-next/client";
import { Button } from "../ui/button";
import Confirmation from "../modals/DeleteConfirmation";
import { AppContext } from "@/context/AppContext";
import QuillEditBlogModal from "../modals/EditModal";

interface BlogPageProps {
  blogId: string;
}

const SingleBlogPage = ({ blogId }: BlogPageProps) => {
  const { dispatch, state } = useContext(AppContext);

  // const [deleteModal, setDeleteModal] = useState<boolean>(false);
  const { data, isLoading, isError, error, isSuccess } =
    useGetASingleBlog(blogId);
  console.log(data);

  const token = getCookie("token");

  const rightToEditAndDelete = () => {
    if (token && data) {
      const userData = getDecodedToken(token);
      console.log(userData);
      if (userData?.id === data.blog[0].author._id) {
        // console.log("allow to edit");
        return "isAuthor";
      } else {
        return "Not author";
      }
    }
  };

  const handleDeleteClick = () => {
    let payload = {
      storedBlogId: blogId,
      deleteModal: true,
    };
    dispatch({
      type: "CONFIRM_DELETE",
      payload: payload,
    });
  };

  const handleEditClick = () => {
    let payload = {
      storedBlogId: blogId,
      openEditModal: true,
      singleBlogDetail: data.blog[0],
    };
    dispatch({
      type: "OPEN_EDIT_MODAL",
      payload: payload,
    });
  };

  console.log(state.deleteModal, state.storedBlogId);
  return (
    <>
      {state.openEditModal ? <QuillEditBlogModal /> : null}
      {state.deleteModal ? <Confirmation /> : null}
      {isLoading ? (
        <Loader message="Loading single page" />
      ) : (
        <div className=" ">
          <div className="w-full mb-6 rounded-sm bg-[linear-gradient(48deg,_rgba(75,_0,_130,_1)_0%,_rgba(214,_191,_255,_1)_35%,_rgba(75,_0,_130,_1)_75%)]">
            <MaxWidth className="min-h-40  w-full flex-row justify-between">
              <div className="flex flex-row-reverse w-full p-2 justify-between">
                <div className="flex flex-col justify-between gap-3 my-4 text-white font-bold">
                  <div className="flex flex-col">
                    <p className="">🏷️ {data.blog[0].category}</p>

                    <p className="">
                      Published on {" " + formatDate(data.blog[0].createdAt)}
                    </p>
                  </div>
                  <p className="">
                    {data.blog[0].readTime < 2
                      ? data.blog[0].readTime + " min read"
                      : data.blog[0].readTime + " mins read"}
                  </p>
                </div>

                {rightToEditAndDelete() === "isAuthor" ? (
                  <div className="w-80 h-10 flex justify-between mt-2">
                    <Button
                      variant="default"
                      className="bg-green-400 hover:bg-green-300 rounded-md w-30"
                      onClick={handleEditClick}
                    >
                      Edit Blog
                    </Button>
                    <Button
                      variant="destructive"
                      className=""
                      onClick={handleDeleteClick}
                    >
                      Delete Blog
                    </Button>
                  </div>
                ) : null}

                <div className="p-2 flex flex-col gap-2">
                  {data.blog[0].author.authorImg ? (
                    <AvatarRenderer
                      src={
                        "http://localhost:3001/" + data.blog[0].author.authorImg
                      }
                      className="h-30 w-30"
                    />
                  ) : (
                    <AvatarRenderer
                      src={"http://localhost:3000/user-dummy.png"}
                      className="h-30 w-30"
                    />
                  )}
                  <p className="capitalize text-white font-bold">
                    {" "}
                    Author:
                    {" " +
                      data.blog[0].author.firstName +
                      " " +
                      data.blog[0].author.lastName}
                  </p>
                </div>
              </div>
            </MaxWidth>
          </div>
          <MaxWidth className="flex flex-col h-full gap-0 w-full">
            <h1 className="font-extrabold text-5xl py-1 mb-3 w-full text-center">
              {data.blog[0].title}
            </h1>
            <div
              className="prose overflow-hidden mt-2"
              dangerouslySetInnerHTML={{ __html: data.blog[0].blogContent }}
            ></div>
            <p className=""></p>
          </MaxWidth>
        </div>
      )}
    </>
  );
};

export default SingleBlogPage;
