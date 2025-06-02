import { useContext } from "react";
import { Button } from "../ui/button";
import { AppContext } from "@/context/AppContext";
import { useDeleteABlog } from "@/hooks/blog/useDeleteBlog";
import { useRouter } from "next/navigation";

const DeleteConfirmation = () => {
  const { dispatch, state } = useContext(AppContext);

  // const { mutateAsync, data, isLoading, isError, error, isSuccess } =useDeleteABlog(state.storedBlogId);

  const router = useRouter();

  const { mutateAsync } = useDeleteABlog();

  const handleBackClick = () => {
    const payload = {
      deleteModal: false,
      storedBlogId: null,
      singleBlogDetail: null,
    };
    dispatch({
      type: "CONFIRM_DONT_DELETE",
      payload: payload,
    });
  };

  const handleDeleteClick = async () => {
    try {
      const res = await mutateAsync(state.storedBlogId);
      console.log(res);
      let payload = {
        deleteModal: false,
        storedBlogId: null,
        singleBlogDetail: null,
      };
      dispatch({
        type: "CONFIRM_DONT_DELETE",
        payload: payload,
      });
      router.push("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className=" flex fixed top-0 left-0 bg-black/80 w-full h-full z-[50]">
      <div className="justify-center items-center flex border w-full h-full">
        <div className="w-120 max-md:w-[86%] min-h-60 flex-col flex bg-white justify-between p-3 rounded-md">
          <div className="text-center py-3">
            <h1 className="font-bold ">
              Are you sure you want to delete this blog titled
              {` "${state.singleBlogDetail.title}" with id ${state.storedBlogId}`}
              ?
            </h1>
            <p className="mt-3">A deleted blog cannot be retrieved.</p>
          </div>
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

export default DeleteConfirmation;
