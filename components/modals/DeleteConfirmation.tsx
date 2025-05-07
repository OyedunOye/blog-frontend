import { useContext } from "react";
import { Button } from "../ui/button";
import { AppContext } from "@/context/AppContext";
import { useDeleteABlog } from "@/hooks/blog/useDeleteBlog";
import { useEditBlog } from "@/hooks/blog/useEditBlog";
import { useRouter } from "next/router";

const Confirmation = () => {
  const { dispatch, state } = useContext(AppContext);

  // const { data, isLoading, isError, error, isSuccess } =useDeleteABlog(state.storedBlogId);

  const { mutateAsync, isSuccess } = useDeleteABlog(state.storedBlogId);

  const handleBackClick = () => {
    let payload = {
      deleteModal: false,
      storedBlogId: null,
    };
    dispatch({
      type: "CONFIRM_DONT_DELETE",
      payload: payload,
    });
  };

  const handleDeleteClick = async () => {
    try {
      // const { mutateAsync, isSuccess } = useDeleteABlog(state.storedBlogId);
      const res = await mutateAsync(state.storedBlogId);
      console.log(res);
      let payload = {
        deleteModal: false,
        storedBlogId: null,
      };
      dispatch({
        type: "CONFIRM_DONT_DELETE",
        payload: payload,
      });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className=" flex fixed top-0 left-0 bg-black/80 w-full h-full z-[80]">
      <div className="justify-center items-center flex border border-white w-full">
        <div className="w-120 h-60 flex-col flex bg-white gap-20 p-4 rounded-md">
          <h1 className="text-center font-bold py-3">
            Are you sure you want to delete this blog? A deleted blog cannot be
            retrieved.
          </h1>
          <div className="content-center justify-center flex  gap-4 max-sm: pb-4">
            <Button
              variant="default"
              className="bg-green-400 hover:bg-green-300 rounded-md w-30"
              onClick={handleBackClick}
            >
              Back
            </Button>
            <Button
              variant="destructive"
              className="w-30"
              onClick={handleDeleteClick}
            >
              Delete
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Confirmation;
