"use client";

import { Button } from "../ui/button";
import Link from "next/link";
import DeactivateUserConfirmation from "../modals/DeactivateUserConfirmation";
import { useContext } from "react";
import { AppContext } from "@/context/AppContext";

const DeleteAccount = () => {
  const { state, dispatch } = useContext(AppContext);

  const handleDeactivateClick = () => {
    const payload = {
      deleteModal: true,
    };
    dispatch({
      type: "CONFIRM_DELETE",
      payload: payload,
    });
  };

  return (
    <>
      {state.deleteModal ? <DeactivateUserConfirmation /> : null}
      <div className="flex flex-col gap-y-6 w-full h-full bg-red-600/10 text-red-600 p-8 max-md:p-4 rounded-sm">
        <h5 className="text-lg font-semibold">Deactivate your account</h5>
        <p>
          We&apos;re sorry to see you go. Deactivating your account locks your
          account and you will be unable to reverse it by yourself. <br /> This
          action will:
        </p>
        <div className="border-t border-t-gray-200 mt-4 pt-4 max-w-[80%]">
          <ul className="flex flex-col gap-y-4 list-disc ml-6">
            <li>
              <span className="font-semibold">Data Archive:</span> When you
              deactivate your account, all your data will not be displayed in
              the app data but will be held for 90 days, after which it will be
              permanently removed from our system with no option of retrieving.
              This includes any personal information, account settings, and the
              contents that you have created.
            </li>
            <li>
              <span className="font-semibold">Irreversibility:</span> Account
              deactivation is reversible within 90 days after which data
              retrieval is irreversible. Once your account is deleted, you will
              not be able to recover it or any associated data.
            </li>
            <li>
              <span className="font-semibold">Contact Support:</span> If you
              have any questions or need assistance or to reactivate your
              account within 90 days of its inactivation, please contact our{" "}
              <a href="mailto: shadesblogapp@gmail.com" className="underline">
                support team.
              </a>
            </li>
          </ul>
        </div>

        <div className="w-full flex items-center justify-end mt-10">
          <div className="flex items-center max-md:w-full justify-center gap-x-4">
            <Link href={"mailto:shadesblogapp@gmail.com"}>
              <Button
                variant={"default"}
                size={"lg"}
                className="cursor-pointer rounded-full max-md:w-32"
              >
                Contact Support
              </Button>
            </Link>
            <Button
              type="button"
              onClick={handleDeactivateClick}
              variant={"destructive"}
              size={"lg"}
              className="cursor-pointer rounded-full max-md:w-34"
            >
              Deactivate Account
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default DeleteAccount;
