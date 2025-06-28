import React, { useContext, useState } from "react";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { useEditComment } from "@/hooks/blog/useEditComment";
import { AppContext } from "@/context/AppContext";
import { toasterAlert } from "@/utils";

const EditComment = () => {
  const { dispatch, state } = useContext(AppContext);
  const [editedComment, setEditedComment] = useState<string>("");

  const {
    mutateAsync: editCommentMutateAsync,
    isPending: editCommentIsPending,
  } = useEditComment();

  const updateComment = async () => {
    try {
      const res = await editCommentMutateAsync({
        comment: editedComment,
        blogId: state.storedBlogId,
        commentId: state.commentId,
      });

      if (res.updatedBlog && !editCommentIsPending) {
        toasterAlert(res.message);
        // closeEditCommentModal();
        const payload = {
          editCommentClicked: false,
          commentToEdit: null,
          storedBlogId: null,
          commentId: null,
          updatedCommentArray: res.updatedBlog.comments,
        };
        dispatch({
          type: "EDIT_COMMENT",
          payload: payload,
        });
      }

      if (res.error && !editCommentIsPending) {
        toasterAlert(res.error);
      }
    } catch (error) {
      console.log(error);
      toasterAlert("Something went wrong, please try again.");
    }
  };

  const closeEditCommentModal = () => {
    const payload = {
      editCommentClicked: false,
      storedBlogId: null,
      commentToEdit: null,
      commentId: null,
    };
    dispatch({
      type: "EDIT_COMMENT",
      payload: payload,
    });
  };

  return (
    <div className=" flex fixed top-0 left-0 bg-black/80 w-full h-full z-[50]">
      <div className="justify-center items-center flex w-full h-full">
        <div className="w-[75%] max-md:w-[86%] min-h-30 flex flex-col bg-white dark:bg-slate-800 p-3 gap-3 rounded-md">
          <Textarea
            defaultValue={state.commentToEdit}
            onChange={(e) => setEditedComment(e.target.value)}
          />
          <div className="content-center justify-center flex  gap-4 max-sm: pb-4">
            <Button
              variant="ghost"
              className="w-30"
              onClick={closeEditCommentModal}
            >
              Back
            </Button>
            <Button
              variant="default"
              className="bg-blue-400 hover:bg-blue-300 rounded-md w-30"
              onClick={updateComment}
            >
              Update
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditComment;
