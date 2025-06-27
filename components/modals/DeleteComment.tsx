import React, { useContext } from "react";
import { Button } from "../ui/button";
import { AppContext } from "@/context/AppContext";
import { useDeleteComment } from "@/hooks/blog/useDeleteComment";
import { toasterAlert } from "@/utils";

const DeleteComment = () => {
  const { mutateAsync, isPending } = useDeleteComment();
  const { state, dispatch } = useContext(AppContext);

  const closeDeleteModal = () => {
    const payload = {
      deleteCommentClicked: false,
      storedBlogId: null,
      commentId: null,
    };
    dispatch({
      type: "DELETE_COMMENT",
      payload: payload,
    });
  };

  const handleDeleteComment = async () => {
    try {
      const res = await mutateAsync({
        blogId: state.storedBlogId,
        commentId: state.commentId,
      });
      if (res.message && !isPending) {
        toasterAlert(res.message);
        // closeDeleteModal();
        console.log(res);
        const payload = {
          deleteCommentClicked: false,
          storedBlogId: null,
          commentId: null,
          updatedCommentArray: res.updatedBlog.comments,
        };
        dispatch({
          type: "DELETE_COMMENT",
          payload: payload,
        });
      }

      if (res.error && !isPending) {
        toasterAlert(res.error);
      }
    } catch (error) {
      console.log(error);
      toasterAlert("Something went wrong, please try again.");
    }
  };
  return (
    <div className=" flex fixed top-0 left-0 bg-black/80 w-full h-full z-[50]">
      <div className="justify-center items-center flex w-full h-full">
        <div className="w-120 max-md:w-[86%] min-h-60 flex-col flex bg-white dark:bg-slate-800 justify-between p-3 rounded-md">
          <div className="text-center py-3">
            <h1 className="font-bold ">
              Are you sure you want to delete this comment?
            </h1>
            <p className="mt-3">A deleted comment cannot be retrieved.</p>
          </div>
          <div className="content-center justify-center flex  gap-4 max-sm: pb-4">
            <Button
              variant="default"
              className="bg-green-400 hover:bg-green-300 rounded-md w-30"
              onClick={closeDeleteModal}
            >
              Back
            </Button>
            <Button
              variant="destructive"
              className="w-30"
              onClick={handleDeleteComment}
            >
              Delete
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteComment;
