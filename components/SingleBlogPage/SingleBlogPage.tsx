"use client";

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
import {
  Bookmark,
  Heart,
  MessageSquareMore,
  SendHorizonal,
} from "lucide-react";
import { Form, FormControl, FormField, FormItem, FormLabel } from "../ui/form";
import { useForm } from "react-hook-form";
import { newCommentFormSchema } from "@/zodValidations/auth/constant";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCreateBlogComment } from "@/hooks/blog/useCreateBlogComment";
import { useToggleLoveABlog } from "@/hooks/blog/useToggleLoveABlog";
import "react-quill-new/dist/quill.snow.css";
import { getInitials } from "@/utils/helpers";
import { useRouter } from "next/navigation";
import { useToggleBookmarkABlog } from "@/hooks/blog/useToggleBookmarkABlog";
import EditComment from "../modals/EditComment";
import DeleteComment from "../modals/DeleteComment";

type NewCommentFormData = z.infer<typeof newCommentFormSchema>;

interface BlogPageProps {
  blogId: string;
}

interface EachComment {
  comment: string;
  commenter: {
    firstName: string;
    lastName: string;
    authorImg: string;
    _id: string;
  };
  _id: string;
  commentedAt: string;
}

const SingleBlogPage = ({ blogId }: BlogPageProps) => {
  const { dispatch, state } = useContext(AppContext);

  const router = useRouter();

  const { data: singleBlogData, isLoading: singleBlogLoading } =
    useGetASingleBlog(blogId);

  const { mutateAsync } = useCreateBlogComment();

  const {
    data: toggleLike,
    mutateAsync: toggleLikeMutateAsync,
    isSuccess: toggleLikeSuccess,
    isPending: toggleLikeIsPending,
  } = useToggleLoveABlog();

  const {
    data: toggleBookmark,
    mutateAsync: toggleBookmarkMutateAsync,
    isSuccess: toggleBookmarkSuccess,
    isPending: toggleBookmarkIsPending,
  } = useToggleBookmarkABlog();

  // const baseUrl = process.env.NEXT_PUBLIC_UPLOAD_URL;

  const currentUserLoveStatus = () => {
    if (token) {
      const userDetails = getDecodedToken(token);
      if (toggleLike && toggleLikeSuccess) {
        if (
          userDetails &&
          toggleLike.updatedBlog.loves.indexOf(userDetails.id) !== -1
        ) {
          return "loved";
        } else {
          return "unloved";
        }
      }

      if (!toggleLikeIsPending && singleBlogData) {
        if (
          userDetails &&
          singleBlogData.blog[0].loves.indexOf(userDetails.id) !== -1
        ) {
          return "loved";
        } else {
          return "unloved";
        }
      }
    }
    return "not authenticated";
  };

  const currentUserBookmarkStatus = () => {
    if (token) {
      const userDetails = getDecodedToken(token);
      if (toggleBookmark && toggleBookmarkSuccess) {
        if (
          userDetails &&
          toggleBookmark.updatedBlog.bookmarks.indexOf(userDetails.id) !== -1
        ) {
          return "bookmarked";
        } else {
          return "not bookmarked";
        }
      }

      if (!toggleBookmarkIsPending && singleBlogData) {
        if (
          userDetails &&
          singleBlogData.blog[0].bookmarks.indexOf(userDetails.id) !== -1
        ) {
          return "bookmarked";
        } else {
          return "not bookmarked";
        }
      }
    }
    return "not authenticated";
  };

  const form = useForm<NewCommentFormData>({
    resolver: zodResolver(newCommentFormSchema),
    defaultValues: {
      comment: "",
    },
  });

  const onSubmit = async (values: NewCommentFormData) => {
    try {
      const res = await mutateAsync({
        comment: values,
        blogId: blogId,
      });

      if (res) {
        dispatch({
          type: "UPDATED_COMMENT_ARRAY",
          payload: res.updatedBlog.comments,
        });
        console.log(res);
        toasterAlert(res.message);
        form.reset({ comment: "" });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onLove = async () => {
    if (!token) {
      toasterAlert(
        "You are offline, please login to be able to like this blog."
      );
      router.push("/login");
    }
    try {
      const res = await toggleLikeMutateAsync(blogId);
      toasterAlert(res.message);
    } catch (error) {
      console.log(error);
    }
  };

  const onClickBookmark = async () => {
    if (!token) {
      toasterAlert(
        "You are offline, please login to be able to bookmark this blog."
      );
      router.push("/login");
    }
    try {
      const res = await toggleBookmarkMutateAsync(blogId);
      toasterAlert(res.message);
    } catch (error) {
      console.log(error);
    }
  };

  const token = getCookie("token");

  const picPath = () => {
    if (token) {
      const userData = getDecodedToken(token);
      if (userData?.authorImg !== "") {
        // return "http://localhost:3001/" + userData?.authorImg;
        return `${userData?.authorImg}`;
      }
    }
    return "";
  };

  const userName = () => {
    if (token) {
      const decoded = getDecodedToken(token);
      if (decoded !== null) {
        return decoded?.firstName + " " + decoded?.lastName;
      } else {
        return "";
      }
    }
  };

  const rightToEditAndDelete = () => {
    if (token && singleBlogData) {
      const userData = getDecodedToken(token);
      if (userData?.id === singleBlogData.blog[0].author._id) {
        return "isAuthor";
      } else {
        return "Not author";
      }
    }
    return "Not author";
  };

  const commentAuthorID = () => {
    if (token && singleBlogData) {
      const userData = getDecodedToken(token);
      return userData?.id;
    }
    return;
  };

  // Opens delete blog modal and set needed blog details in state. Available only for the blog author.
  const handleDeleteClick = () => {
    const payload = {
      storedBlogId: blogId,
      deleteModal: true,
      singleBlogDetail: singleBlogData.blog[0],
    };
    dispatch({
      type: "CONFIRM_DELETE",
      payload: payload,
    });
  };

  // Opens the edit blog modal and sets needed blog details in state. Available only for the blog author.
  const handleEditClick = () => {
    const payload = {
      storedBlogId: blogId,
      openEditModal: true,
      singleBlogDetail: singleBlogData.blog[0],
    };
    dispatch({
      type: "OPEN_EDIT_MODAL",
      payload: payload,
    });
  };

  // Opens the edit comment modal and sets needed comment details in state. Available only for the comment author.
  const handleEditCommentButtonClick = (eachComment: EachComment) => {
    console.log(eachComment._id);
    const payload = {
      editCommentClicked: true,
      storedBlogId: blogId,
      commentToEdit: eachComment.comment,
      commentId: eachComment._id,
    };
    dispatch({
      type: "EDIT_COMMENT",
      payload: payload,
    });

    return;
  };

  // Opens the delete comment modal and sets needed comment details in state. Available only for the comment author.
  const handleDeleteCommentButtonClick = (eachComment: EachComment) => {
    const payload = {
      deleteCommentClicked: true,
      storedBlogId: blogId,
      commentId: eachComment._id,
    };
    dispatch({
      type: "DELETE_COMMENT",
      payload: payload,
    });

    return;
  };

  return (
    <>
      {state.openEditModal ? <QuillEditBlogModal /> : null}
      {state.deleteModal ? <DeleteConfirmation /> : null}
      {singleBlogLoading ? (
        <Loader message="Loading single page" />
      ) : (
        <div className="pb-15">
          <div className="w-full mb-6 bg-[linear-gradient(48deg,_rgba(75,_0,_130,_1)_0%,_rgba(214,_191,_255,_1)_35%,_rgba(75,_0,_130,_1)_75%)]">
            <MaxWidth className="min-h-40  w-full flex-row justify-between max-md:px-1">
              <div className="flex flex-row-reverse w-full p-2 justify-between max-md:flex-col ">
                <div className="flex flex-row-reverse justify-between w-full ">
                  <div className="flex flex-col justify-between gap-3 my-4 max-md:my-2 max-md:w-[50%] text-white font-bold">
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
                    <div className="w-80 h-10 flex justify-between mt-2 max-md:hidden max-lg:mx-2">
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

                  <div className="p-2 flex flex-col max-md:w-[40%] gap-2">
                    <AvatarRenderer
                      src={
                        singleBlogData.blog[0].author.authorImg
                          ? singleBlogData.blog[0].author.authorImg
                          : "/user-dummy.png"
                      }
                      fallBack={getInitials(
                        singleBlogData.blog[0].author.firstName +
                          " " +
                          singleBlogData.blog[0].author.lastName
                      )}
                      className="h-30 w-30 max-md:h-24 max-md:w-24 text-4xl"
                    />

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

                {rightToEditAndDelete() === "isAuthor" ? (
                  <div className="w-full h-10 flex justify-between mt-2 max-md:flex max-2xl:hidden 2xl:hidden">
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
              </div>
            </MaxWidth>
          </div>
          <MaxWidth className="flex flex-col h-full gap-0 w-full max-md:px-2">
            {state.editCommentClicked && <EditComment />}
            {state.deleteCommentClicked && <DeleteComment />}
            <h1 className="font-extrabold max-md:text-3xl text-5xl py-1 mb-3 w-full text-center">
              {singleBlogData.blog[0].title}
            </h1>
            <div
              className="prose prose-lg ql-editor overflow-hidden mt-2"
              dangerouslySetInnerHTML={{
                __html: singleBlogData.blog[0].blogContent,
              }}
            ></div>
            <div className="bg-black dark:bg-white h-0.5 my-5 "></div>
            <div className="flex flex-col ">
              <div className="flex flex-col mb-3">
                <div className="flex justify-between">
                  <div className=" flex h-10 py-0.5 gap-2 content-center mb-2">
                    <Button
                      variant="outline"
                      className="rounded-full bg-gray-200 h-[80%] "
                      onClick={onLove}
                    >
                      <Heart
                        color={
                          currentUserLoveStatus() === "loved" ? "red" : "gray"
                        }
                        fill={
                          currentUserLoveStatus() === "loved"
                            ? "red"
                            : "transparent"
                        }
                      />

                      {!toggleLike
                        ? singleBlogData.blog[0].loveCount
                        : toggleLike.updatedBlog.loveCount}
                    </Button>

                    <div className="flex rounded-full justify-center p-2 gap-3 content-center bg-gray-200 dark:bg-transparent dark:outline h-[80%] w-14">
                      <MessageSquareMore size={18} className="pb-0.5" />{" "}
                      {/* trying to reflect the current number of comments in case an addition happens, but data returning undefined because the page is rendering before the await that returns data is fulfilled. How to solve this? Resolved! Now works as expected!! */}
                      <span className="h-fit flex -mt-1 text-sm font-semibold">
                        {" "}
                        {!state.updatedCommentArray
                          ? singleBlogData.blog[0].commentCount
                          : state.updatedCommentArray.length}
                      </span>
                    </div>
                  </div>

                  <button className="bg-gray-200 dark:bg-transparent dark:outline rounded-full h-8 w-8 p-1">
                    <Bookmark
                      color={
                        currentUserBookmarkStatus() === "bookmarked"
                          ? "green"
                          : "gray"
                      }
                      fill={
                        currentUserBookmarkStatus() === "bookmarked"
                          ? "green"
                          : "transparent"
                      }
                      onClick={onClickBookmark}
                      className=""
                    />
                  </button>
                </div>

                <div className="flex gap-2 h-28 content-center py-1">
                  <AvatarRenderer
                    src={
                      token && picPath() !== "" ? picPath() : "/user-dummy.png"
                    }
                    className="h-22 w-22 max-md:h-20 max-md:w-20 text-4xl"
                    fallBack={getInitials(userName()!)}
                  />

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
                        <Button variant="default" className="dark:text-white">
                          Submit <SendHorizonal />
                        </Button>
                      </div>
                    </form>
                  </Form>
                </div>
              </div>
              <div className="flex flex-col gap-2 mt-10">
                {/* trying to populate the comments display from updated comments returned on submitting a new comment but data's commenter obj returning undefined because the page is rendering before the await that returns data is fulfilled. How to solve this? Resolved! Now works as expected!! */}

                {(!state.updatedCommentArray
                  ? singleBlogData.blog[0].comments
                  : state.updatedCommentArray
                ).map((eachComment: EachComment) => (
                  <div
                    className="w-full min-h-18 rounded-sm p-1.5 bg-slate-50 dark:bg-input/30 shadow-sm "
                    key={eachComment._id}
                  >
                    <div className="flex">
                      <div className="">
                        <AvatarRenderer
                          src={
                            eachComment.commenter.authorImg !== ""
                              ? eachComment.commenter.authorImg
                              : "/user-dummy.png"
                          }
                          fallBack={getInitials(
                            eachComment.commenter.firstName +
                              " " +
                              eachComment.commenter.lastName
                          )}
                          className="h-8 w-8"
                        />
                      </div>

                      <div className="flex flex-col pl-2 w-full">
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
                        {commentAuthorID() === eachComment.commenter._id ? (
                          <div className="w-full h-10 flex justify-end mt-2">
                            <div className="w-64 flex justify-between">
                              <Button
                                variant="default"
                                className="bg-green-400 hover:bg-green-300 rounded-md w-[45%] cursor-pointer"
                                onClick={() =>
                                  handleEditCommentButtonClick(eachComment)
                                }
                              >
                                Edit Comment
                              </Button>
                              <Button
                                variant="destructive"
                                className="w-[45%] cursor-pointer"
                                onClick={() => {
                                  handleDeleteCommentButtonClick(eachComment);
                                }}
                              >
                                Delete Comment
                              </Button>
                            </div>
                          </div>
                        ) : null}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </MaxWidth>
        </div>
      )}
    </>
  );
};

export default SingleBlogPage;
