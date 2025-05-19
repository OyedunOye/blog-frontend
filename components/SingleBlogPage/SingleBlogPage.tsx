"use client";

import dynamic from "next/dynamic";
import { useGetASingleBlog } from "@/hooks/blog/useGetBlogs";
import React, { useContext } from "react";
import MaxWidth from "../common/MaxWidthWrapper";
import { formatDate, toasterAlert } from "@/utils";
import Loader from "../common/Loader";
import AvatarRenderer from "../common/Avatar";
import { getDecodedToken } from "@/hooks/getDecodeToken/getDecodedToken";
import { getCookie } from "cookies-next/client";
import { Button } from "../ui/button";
import DeleteConfirmation from "../modals/DeleteConfirmation";
import { AppContext } from "@/context/AppContext";
import QuillEditBlogModal from "../modals/EditModal";
import { Textarea } from "../ui/textarea";
import { Heart, MessageSquareMore, SendHorizonal } from "lucide-react";
import { Form, FormControl, FormField, FormItem, FormLabel } from "../ui/form";
import { useForm } from "react-hook-form";
import { newCommentFormSchema } from "@/zodValidations/auth/constant";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCreateBlogComment } from "@/hooks/blog/useCreateBlogComment";
import "react-quill-new/dist/quill.snow.css";

type NewCommentFormData = z.infer<typeof newCommentFormSchema>;

interface BlogPageProps {
  blogId: string;
}

interface EachComment {
  comment: string;
  commenter: {
    firstName: string;
    lastName: string;
  };
  _id: string;
  commentedAt: string;
}

const SingleBlogPage = ({ blogId }: BlogPageProps) => {
  const { dispatch, state } = useContext(AppContext);

  const {
    data: singleBlogData,
    isLoading: singleBlogLoading,
    isError: singleBlogIsError,
    error: singleBlogError,
  } = useGetASingleBlog(blogId);
  // console.log(singleBlogData);

  const { isPending, isSuccess, isError, error, mutateAsync, data } =
    useCreateBlogComment();

  // console.log(data);

  const form = useForm<NewCommentFormData>({
    resolver: zodResolver(newCommentFormSchema),
    defaultValues: {
      comment: "",
    },
  });

  //pending writing of service to post new comment
  const onSubmit = async (values: NewCommentFormData) => {
    // console.log("The comment value: ", values);
    try {
      const res = await mutateAsync({ comment: values, blogId: blogId });
      // console.log(res);
      toasterAlert(res.message);
      // window.location.reload();
      if (res) {
        form.reset({ comment: "" });
      }
    } catch (error) {
      console.log(error);
    }
  };
  const token = getCookie("token");

  const picPath = () => {
    if (token) {
      const userData = getDecodedToken(token);
      if (userData?.authorImg !== "") {
        return "http://localhost:3001/" + userData?.authorImg;
      }
    }
    return "";
  };

  const rightToEditAndDelete = () => {
    if (token && singleBlogData) {
      const userData = getDecodedToken(token);
      // console.log(userData);
      if (userData?.id === singleBlogData.blog[0].author._id) {
        // console.log("allow to edit");
        return "isAuthor";
      } else {
        return "Not author";
      }
    }
    return "Not author";
  };

  const handleDeleteClick = () => {
    let payload = {
      storedBlogId: blogId,
      deleteModal: true,
      singleBlogDetail: singleBlogData.blog[0],
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
      singleBlogDetail: singleBlogData.blog[0],
    };
    dispatch({
      type: "OPEN_EDIT_MODAL",
      payload: payload,
    });
  };

  // console.log(state.deleteModal, state.storedBlogId);

  // singleBlogData ? console.log(singleBlogData.blog[0]) : "";
  return (
    <>
      {state.openEditModal ? <QuillEditBlogModal /> : null}
      {state.deleteModal ? <DeleteConfirmation /> : null}
      {singleBlogLoading ? (
        <Loader message="Loading single page" />
      ) : (
        <div
          className={`pb-15 ${
            state.appMode === "Dark" ? "bg-black text-white" : ""
          }`}
        >
          <div className="w-full mb-6 rounded-sm bg-[linear-gradient(48deg,_rgba(75,_0,_130,_1)_0%,_rgba(214,_191,_255,_1)_35%,_rgba(75,_0,_130,_1)_75%)]">
            <MaxWidth className="min-h-40  w-full flex-row justify-between">
              <div className="flex flex-row-reverse w-full p-2 justify-between">
                <div className="flex flex-col justify-between gap-3 my-4 text-white font-bold">
                  <div className="flex flex-col">
                    <p className="">🏷️ {singleBlogData.blog[0].category}</p>

                    <p className="">
                      Published on{" "}
                      {" " + formatDate(singleBlogData.blog[0].createdAt)}
                    </p>
                  </div>
                  <p className="">
                    {singleBlogData.blog[0].readTime < 2
                      ? singleBlogData.blog[0].readTime + " min read"
                      : singleBlogData.blog[0].readTime + " mins read"}
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
                  {singleBlogData.blog[0].author.authorImg ? (
                    <AvatarRenderer
                      src={
                        "http://localhost:3001/" +
                        singleBlogData.blog[0].author.authorImg
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
                      singleBlogData.blog[0].author.firstName +
                      " " +
                      singleBlogData.blog[0].author.lastName}
                  </p>
                </div>
              </div>
            </MaxWidth>
          </div>
          <MaxWidth className="flex flex-col h-full gap-0 w-full">
            <h1 className="font-extrabold text-5xl py-1 mb-3 w-full text-center">
              {singleBlogData.blog[0].title}
            </h1>
            <div
              className="prose prose-lg ql-editor overflow-hidden mt-2"
              dangerouslySetInnerHTML={{
                __html: singleBlogData.blog[0].blogContent,
              }}
            ></div>
            <div className="bg-black h-0.5 my-5 "></div>
            <div className="flex flex-col ">
              <div className="flex flex-col mb-3">
                <div className=" flex h-10 py-0.5 gap-2 content-center mb-2">
                  <Button
                    variant="outline"
                    className="rounded-full bg-gray-200 h-[80%] "
                  >
                    <Heart /> {singleBlogData.blog[0].loveCount}
                  </Button>
                  <div
                    // variant="outline"
                    className="flex rounded-full justify-center p-2 gap-3 content-center bg-gray-200 h-[80%] w-14"
                  >
                    <MessageSquareMore size={18} className="pb-0.5" />{" "}
                    {/* trying to reflect the current number of comments in case an addition happens, but data returning undefined because the page is rendering before the await that returns data is fulfilled. How to solve this? Resolved! Now works as expected!! */}
                    {!data ? (
                      <span className="h-fit flex -mt-1 text-sm font-semibold">
                        {" "}
                        {singleBlogData.blog[0].commentCount}
                      </span>
                    ) : (
                      <span className="h-fit flex -mt-1 text-sm font-semibold">
                        {" "}
                        {data.updatedBlog.commentCount}
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex gap-2 h-28 content-center py-1">
                  {token && picPath() !== "" ? (
                    <AvatarRenderer src={picPath()} className="h-22 w-22" />
                  ) : (
                    <AvatarRenderer
                      src={"http://localhost:3000/user-dummy.png"}
                      className="h-20 w-20"
                    />
                  )}
                  {/* <Textarea placeholder="Leave a comment..." /> */}
                  <Form {...form}>
                    <form
                      onSubmit={form.handleSubmit(onSubmit)}
                      className="w-full"
                    >
                      <FormField
                        control={form.control}
                        name="comment"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="">Comment</FormLabel>
                            <FormControl>
                              <Textarea
                                className=""
                                placeholder="Leave a comment..."
                                {...field}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                      <div className="flex flex-col my-4">
                        <Button variant="default">
                          Submit <SendHorizonal />
                        </Button>
                      </div>
                    </form>
                  </Form>
                </div>
              </div>
              <div className="flex flex-col gap-2 mt-10">
                {/* trying to populate the comments display from updated comments returned on submitting a new comment but data's commenter obj returning undefined because the page is rendering before the await that returns data is fulfilled. How to solve this? Resolved! Now works as expected!! */}
                {!data
                  ? singleBlogData.blog[0].comments.map(
                      (eachComment: EachComment) => (
                        <div
                          key={eachComment._id}
                          className="w-full min-h-18 rounded-sm p-1.5 bg-slate-50  shadow-sm"
                        >
                          <div className="flex min-w-40 mb-3 gap-5 text-xs text-slate-500">
                            <p className="capitalize">
                              {eachComment.commenter.firstName +
                                " " +
                                eachComment.commenter.lastName}
                            </p>
                            <p className="">
                              {formatDate(eachComment.commentedAt)}
                            </p>
                          </div>
                          <p className="">{eachComment.comment}</p>
                        </div>
                      )
                    )
                  : data.updatedBlog.comments.map(
                      (eachComment: EachComment) => (
                        <div
                          key={eachComment._id}
                          className="w-full min-h-18 rounded-sm p-1.5 bg-slate-50  shadow-sm"
                        >
                          <div className="flex min-w-40 mb-3 gap-5 text-xs text-slate-500">
                            <p className="capitalize">
                              {/* firstName and lastName update lagging sometimes and showing undefined, how to make sure it is always correct on first attempt? */}
                              {eachComment.commenter.firstName +
                                " " +
                                eachComment.commenter.lastName}
                            </p>
                            <p className="">
                              {formatDate(eachComment.commentedAt)}
                            </p>
                          </div>
                          <p className="">{eachComment.comment}</p>
                        </div>
                      )
                    )}
              </div>
            </div>
          </MaxWidth>
        </div>
      )}
    </>
  );
};

export default SingleBlogPage;
