import { loginSocialMedia } from "@/constants";
// import React, { useState } from "react";
import { Button } from "../ui/button";
import { toasterAlert } from "@/utils";

const LoginButtons = () => {
  // const [socialMedia, setSocialMedia] = useState<string>("")
  const handleClickButton = (socialMedia: string) => {
    toasterAlert(
      `Login with ${socialMedia} is coming soon! Please login with an email and a password.`
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

export default LoginButtons;
