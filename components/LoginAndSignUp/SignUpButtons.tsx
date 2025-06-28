import { loginSocialMedia } from "@/constants";
import React from "react";
import { Button } from "../ui/button";
import { toasterAlert } from "@/utils";

const SignUpButtons = () => {
  const handleClickButton = (socialMedia: string) => {
    toasterAlert(
      `Sign up with ${socialMedia} is coming soon! Please open your account with an email and a password.`
    );
  };
  return (
    <div className="flex w-1/2 max-md:w-full flex-col mx-auto py-5 gap-5">
      {loginSocialMedia.map((item) => (
        <div
          key={item.name}
          className="w-full"
          onClick={() => handleClickButton(item.name)}
        >
          <Button variant="outline" className="p-2 gap-5 w-full cursor-pointer">
            <item.img /> Continue with {item.name}
          </Button>
        </div>
      ))}
    </div>
  );
};

export default SignUpButtons;
