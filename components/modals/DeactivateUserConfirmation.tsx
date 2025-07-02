import { useContext } from "react";
import { Button } from "../ui/button";
import { AppContext } from "@/context/AppContext";
import { useRouter } from "next/navigation";
import { useDeactivateUserAccount } from "@/hooks/authors/useDeleteUserAccount";
import { toasterAlert } from "@/utils";
import Cookies from "universal-cookie";
import { LoaderCircle } from "lucide-react";

const DeactivateUserConfirmation = () => {
  const { dispatch } = useContext(AppContext);

  // const { mutateAsync, data, isLoading, isError, error, isSuccess } =useDeleteABlog(state.storedBlogId);
  const cookies = new Cookies(null, { path: "/" });
  const router = useRouter();

  const { mutateAsync, isPending } = useDeactivateUserAccount();

  const handleBackClick = () => {
    const payload = {
      deleteModal: false,
    };
    dispatch({
      type: "CONFIRM_DONT_DELETE",
      payload: payload,
    });
  };

  const handleDeactivateUser = async () => {
    try {
      const res = await mutateAsync();
      if (!isPending && res.message) {
        toasterAlert(res.message);
        cookies.remove("token");
        router.push("/");

        const payload = {
          deleteModal: false,
        };
        dispatch({
          type: "CONFIRM_DONT_DELETE",
          payload: payload,
        });
      }
      // if (isError && !isPending) {
      //   toasterAlert(res.error);
      // }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className=" flex fixed top-0 left-0 bg-black/80 w-full h-full z-[50]">
      <div className="justify-center items-center flex w-full h-full">
        <div className="w-120 max-md:w-[86%] min-h-60 flex-col flex bg-white dark:bg-slate-800 justify-between p-3 rounded-md">
          <div className="text-center py-3">
            <h1 className="font-bold ">
              Are you sure you want to deactivate your account?
            </h1>
            <p className="mt-3">
              A deactivated account can only be retrieved within 90 days of its
              deactivation and not retrievable beyond this limit.
            </p>
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
              className="w-34"
              onClick={handleDeactivateUser}
            >
              {isPending ? (
                <LoaderCircle className="text-gray-400 animate-spin w-fit" />
              ) : (
                "Deactivate Account"
              )}
              {/* Delete */}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeactivateUserConfirmation;
