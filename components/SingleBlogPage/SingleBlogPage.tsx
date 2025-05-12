"use client";

import { useGetASingleBlog } from "@/hooks/blog/useGetBlogs";
import React, { useContext } from "react";
import MaxWidth from "../common/MaxWidthWrapper";
import { formatDate } from "@/utils";
import Loader from "../common/Loader";
import AvatarRenderer from "../common/Avatar";
import { getDecodedToken } from "@/hooks/getDecodeToken/getDecodedToken";
import { getCookie } from "cookies-next/client";
import { Button } from "../ui/button";
import DeleteConfirmation from "../modals/DeleteConfirmation";
import { AppContext } from "@/context/AppContext";
import QuillEditBlogModal from "../modals/EditModal";
import { Textarea } from "../ui/textarea";
import { Heart, MessageSquareMore } from "lucide-react";
import { Form, FormControl, FormField, FormItem, FormLabel } from "../ui/form";
import { useForm } from "react-hook-form";
import { newCommentFormSchema } from "@/zodValidations/auth/constant";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

type NewCommentFormData = z.infer<typeof newCommentFormSchema>;

interface BlogPageProps {
  blogId: string;
}

interface EachComment {
  comment: string;
  commenter: string;
  _id: string;
  commentedAt: Date;
}

const SingleBlogPage = ({ blogId }: BlogPageProps) => {
  const { dispatch, state } = useContext(AppContext);

  const { data, isLoading, isError, error, isSuccess } =
    useGetASingleBlog(blogId);
  // console.log(data);

  const form = useForm<NewCommentFormData>({
    resolver: zodResolver(newCommentFormSchema),
    defaultValues: {
      comment: "",
    },
  });

  //pending writing of service to post new comment
  const onSubmit = async (values: NewCommentFormData) => {
    console.log("The comment value: ", values);
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
    if (token && data) {
      const userData = getDecodedToken(token);
      // console.log(userData);
      if (userData?.id === data.blog[0].author._id) {
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
      singleBlogDetail: data.blog[0],
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

  // console.log(state.deleteModal, state.storedBlogId);

  data ? console.log(data.blog[0]) : "";
  return (
    <>
      {state.openEditModal ? <QuillEditBlogModal /> : null}
      {state.deleteModal ? <DeleteConfirmation /> : null}
      {isLoading ? (
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
            <div className="bg-black h-0.5 my-5 "></div>
            <div className="flex flex-col ">
              <div className="flex flex-col">
                <div className=" flex h-10 py-0.5 gap-2 content-center mb-2">
                  <Button
                    variant="outline"
                    className="rounded-full bg-gray-200 h-[80%] "
                  >
                    <Heart /> {data.blog[0].loveCount}
                  </Button>
                  <div
                    // variant="outline"
                    className="flex rounded-full justify-center p-2 gap-3 content-center bg-gray-200 h-[80%] w-14"
                  >
                    <MessageSquareMore size={18} className="pb-0.5" />{" "}
                    <span className="h-fit flex -mt-1 text-sm font-semibold">
                      {data.blog[0].commentCount}
                    </span>
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
                    <form className="w-full">
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
                    </form>
                  </Form>
                </div>
                <div className="flex flex-col my-4">
                  <Button variant="default">Submit</Button>
                </div>
              </div>
              <div className="flex flex-col gap-2 mt-5">
                {data.blog[0].comments.map((eachComment: EachComment) => (
                  <div
                    key={eachComment._id}
                    className="w-full min-h-14 rounded-sm p-1.5 bg-slate-50 shadow-sm"
                  >
                    <p className="">{eachComment.comment}</p>
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
