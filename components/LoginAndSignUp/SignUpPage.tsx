"use client";

import React, { useState } from "react";
import MaxWidth from "../common/MaxWidthWrapper";
import LoginButtons from "./LoginButtons";
import { Button } from "../ui/button";
import Link from "next/link";
import SignUpForm from "./SignUpForm";
import Loading from "../common/Loader";

const SignUpPage = () => {
  const [homePageLoading, setHomePageLoading] = useState<boolean>(false);
  const [loginPageLoading, setLoginPageLoading] = useState<boolean>(false);

  {
    console.log("sign-up's homepageloading", homePageLoading);
    console.log("login is loading", loginPageLoading);
  }

  return (
    <div className="h-1/2 flex justify-center content-center flex-col">
      {homePageLoading ? (
        <Loading className="min-h-screen" message="Loading home page" />
      ) : (
        ""
      )}
      {loginPageLoading ? (
        <Loading className="min-h-screen" message="Navigating to login page" />
      ) : (
        ""
      )}
      <div className="bg-[#F3F4F6] w-full text-center h-56 pt-15 p-2">
        <h3 className="font-bold text-xl">🎉 Sign up</h3>
        <p className="text-md text-slate-600">
          {" "}
          Welcome to our blog magazine community
        </p>
      </div>

      <MaxWidth className="h-contain py-10 w-2/3 justify-center divide-y gap-8 absolute top-36 border z-99 bg-white rounded-lg shadow-md">
        <LoginButtons />

        <div className="w-1/2 justify-center mx-auto">
          <SignUpForm />

          {/* <div className="justify-center flex w-full mx-auto"></div> */}
          <Link href={"/login"} className="justify-center flex">
            <Button
              onClick={() => setLoginPageLoading(true)}
              variant="ghost"
              className="mx-auto"
            >
              Already have an account? Sign in
            </Button>
          </Link>

          <Link href={"/"} className="justify-center flex">
            <Button
              onClick={() => setHomePageLoading(true)}
              variant="ghost"
              className="mx-auto"
            >
              Return home
            </Button>
          </Link>
        </div>
      </MaxWidth>
    </div>
  );
};

export default SignUpPage;
