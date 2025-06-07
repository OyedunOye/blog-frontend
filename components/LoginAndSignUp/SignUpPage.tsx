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

  return (
    <div className="h-1/2 flex justify-center content-center flex-col">
      {homePageLoading ? (
        <Loading className="min-h-screen z-99" message="Loading home page" />
      ) : null}
      {loginPageLoading ? (
        <Loading
          className="min-h-screen z-99"
          message="Navigating to login page"
        />
      ) : null}
      <div className="bg-[#F3F4F6] dark:dark:bg-black/99 w-full text-center h-56 pt-15 p-2">
        <h3 className="font-bold text-xl">🎉 Sign up</h3>
        <p className="text-md text-slate-600 dark:text-white">
          {" "}
          Welcome to our blog magazine community
        </p>
      </div>

      <MaxWidth className="h-contain py-10 w-2/3 max-lg:w-[80%] justify-center divide-y gap-8 absolute top-36 border z-50 bg-white dark:bg-slate-900 rounded-lg shadow-md">
        <LoginButtons />

        <div className="w-1/2 max-lg:w-[80%] max-md:w-[100%] justify-center mx-auto">
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
