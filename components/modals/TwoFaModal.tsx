import { useEffect, useState } from "react";
import { LoaderCircle, X } from "lucide-react";

import OtpInput from "react-otp-input";
import { Button } from "../ui/button";

import { cn } from "@/lib/utils";
import { formatTime, obscureMail } from "@/utils/helpers";
import { useVerifyOtpAndLogin } from "@/hooks/auth/useVerifyOtpAndLogin";
import { setCookie } from "cookies-next/client";
import { toasterAlert } from "@/utils";
import { useRouter } from "next/navigation";
import { useResendOtp } from "@/hooks/auth/useResendOtp";

interface TwoFAProps {
  email: string;
  closeModal: () => void;
}

const TwoFA = ({ email, closeModal }: TwoFAProps) => {
  const [otp, setOtp] = useState<string>("");
  const [seconds, setSeconds] = useState<number>(600);
  const [validateOtpLength, setValidateOtpLength] = useState<string>("ENOUGH");

  const router = useRouter();

  const { mutateAsync, isPending } = useVerifyOtpAndLogin();
  const { mutateAsync: resendOtpMutateAsync, isPending: resendOtpIsPending } =
    useResendOtp();

  useEffect(() => {
    const interval = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      }
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [seconds]);

  const handleValidateOtp = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (otp.length < 6) {
        setValidateOtpLength("NOT ENOUGH");
        return;
      }
      if (otp.length === 6) {
        setValidateOtpLength("ENOUGH");

        const res = await mutateAsync({ otp, email });
        console.log(res.error);

        // If this succeeds, run the login logic here and close the modal
        if (res.token && !isPending) {
          setCookie("token", res.token);
          toasterAlert(res.message);
          router.push("/");
          closeModal();
        }

        if (res.error && !isPending) {
          // console.log(res.error);
          toasterAlert(res.error);
        }
      }
    } catch (error) {
      //I would like to return a toaster with the error message from the backend which specifies what has gone wrong e.g. incorrect token or expired token. This is accessible in res from mutate async call, hence, toaster moved into the try block.
      toasterAlert("Something went wrong, please login again.");
      console.log(error);
    }
  };

  const handleResendOtp = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    try {
      if (seconds === 0) {
        console.log("Resending OTP...");
        // Here you would typically resend the OTP to the user's email
        const res = await resendOtpMutateAsync({ email });
        if (!resendOtpIsPending && res.email) {
          toasterAlert(res.message);
        }
        // For example: await resendOtp(email);
        setSeconds(600); // Reset the timer to 10 minutes
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className=" flex fixed top-0 left-0 bg-black/80 w-full h-full z-[50]">
      <div className="justify-center items-center flex w-full h-full">
        <div className="relative w-[90%] max-md:w-[84%] lg:w-[50%] h-[70%] flex-col flex bg-white dark:bg-slate-800 justify-between p-3  rounded-md">
          <Button
            className="absolute -top-3 -right-3 h-8 w-8 rounded-full"
            aria-label="close"
            onClick={closeModal}
          >
            <X />
          </Button>
          <div>
            <form onSubmit={() => console.log("CHECKS")} className="">
              <div className="flex flex-col gap-y-6 py-8 lg:px-6">
                <p className="text-center font-bold text-base lg:text-xl">
                  Enter Code
                </p>

                <p className="text-center text-sm lg:text-base">
                  We sent a verification code to your email address{" "}
                  <span className="font-semibold">
                    {obscureMail(email || "test@testemail.com")}
                  </span>
                  . Please enter the code to log in.
                </p>

                {/* Form Section */}
                <div className="">
                  <div className="flex flex-col gap-y-2 items-center justify-center mt-3">
                    <div className="flex flex-col gap-3 h-14 max-md:h-18">
                      <OtpInput
                        value={otp}
                        onChange={setOtp}
                        numInputs={6}
                        shouldAutoFocus
                        skipDefaultStyles
                        inputStyle={
                          "h-10 text-center border border-gray-300 rounded-md focus:outline-none focus:border-indigo-600 mx-2 font-semibold w-10 max-md:w-8"
                        }
                        // renderSeparator={<span>-</span>}
                        renderInput={(props) => <input {...props} />}
                      />
                      {validateOtpLength === "NOT ENOUGH" && (
                        <p className="text-sm px-2 text-red-500">
                          Insufficient OTP digits. You need 6 digits OTP to
                          login!
                        </p>
                      )}
                    </div>

                    <div className="w-full flex items-center justify-center mt-4 gap-x-3 text-sm">
                      <div className="flex items-center justify-center gap-x-2">
                        <p className="">Didn&apos;t get the email? </p>
                        <button
                          type="button"
                          onClick={handleResendOtp}
                          className={cn(
                            "cursor-pointer",
                            seconds !== 0 && "opacity-70 cursor-not-allowed"
                          )}
                        >
                          Click to resend
                        </button>
                      </div>

                      <p className="text-[#004AAD]">
                        {seconds === 0 ? "00:00" : formatTime(seconds)}
                      </p>
                    </div>
                    <div className="mt-4 mb-8">
                      <div className="my-4">
                        <Button
                          variant="default"
                          className={cn(
                            "w-full",
                            otp.length !== 6 && "opacity-70 cursor-not-allowed"
                          )}
                          onClick={handleValidateOtp}
                        >
                          {isPending ? (
                            <LoaderCircle className="text-gray-400 animate-spin" />
                          ) : (
                            "Verify"
                          )}
                        </Button>
                      </div>

                      <p className="text-sm  text-center">
                        By continuing, you agree to the Shade&apos;s blog Terms
                        and privacy policy
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TwoFA;
