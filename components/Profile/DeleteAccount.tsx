import { Button } from "../ui/button";

const DeleteAccount = () => {
  return (
    <div className="flex flex-col gap-y-6 w-full h-full bg-red-600/10 text-red-600 p-8 max-md:p-4 rounded-sm">
      <h5 className="text-lg font-semibold">Delete your account</h5>
      <p>
        We&apos;re sorry to see you go. Deleting your account is permanent and
        cannot be undone. <br /> This action will:
      </p>
      <div className="border-t border-t-gray-200 mt-4 pt-4 max-w-[80%]">
        <ul className="flex flex-col gap-y-4 list-disc ml-6">
          <li>
            <span className="font-semibold">Data Deletion:</span> When you
            delete your account, all your data will be permanently removed from
            our system. This includes any personal information, account
            settings, and content you have created.
          </li>
          <li>
            <span className="font-semibold">Irreversibility:</span> Account
            deletion is irreversible. Once your account is deleted, you will not
            be able to recover it or any associated data.
          </li>
          <li>
            <span className="font-semibold">Contact Support:</span> If you have
            any questions or need assistance, please contact our{" "}
            <a href="mailto: test@mail.com" className="underline">
              support team.
            </a>
          </li>
        </ul>
      </div>

      <div className="w-full flex items-center justify-end mt-10">
        <div className="flex items-center max-md:w-full justify-center gap-x-4">
          <Button
            variant={"default"}
            size={"lg"}
            className="cursor-pointer rounded-full max-md:w-32"
          >
            Contact Support
          </Button>
          <Button
            variant={"destructive"}
            size={"lg"}
            className="cursor-pointer rounded-full max-md:w-32"
          >
            Delete Account
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DeleteAccount;
