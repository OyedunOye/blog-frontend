"use client";

import React, { useState } from "react";
import MaxWidth from "../common/MaxWidthWrapper";
import LoginButtons from "./LoginButtons";
import LoginForm from "./LoginForm";
import { Button } from "../ui/button";
import Link from "next/link";
import Loading from "../common/Loader";

const LoginPage = () => {
  const [homePageLoading, setHomePageLoading] = useState<boolean>(false);
  const [signUpPageLoading, setSignUpPageIsLoading] = useState<boolean>(false);

  return (
    <div className="h-1/2 flex justify-center content-center flex-col">
      {homePageLoading ? (
        <Loading
          className="min-h-screen z-99 bg-transparent"
          message="Loading home page"
        />
      ) : null}
      {signUpPageLoading ? (
        <Loading
          className="min-h-screen z-99"
          message="Navigating to the sign-up page"
        />
      ) : null}
      <div className="bg-[#F3F4F6] dark:bg-black/99 w-full text-center h-56 pt-15 p-2">
        <h3 className="font-bold text-xl">🔑 Login</h3>
        <p className="text-md text-slate-600 dark:text-white">
          {" "}
          Welcome to our blog magazine community
        </p>
      </div>

      <MaxWidth className="h-contain py-10 w-2/3 justify-center divide-y gap-8 absolute top-36 border z-50 bg-white dark:bg-slate-900 rounded-lg shadow-md">
        <LoginButtons />

        <div className="w-1/2 max-md:w-full justify-center mx-auto">
          <LoginForm />

          {/* <div className="justify-center flex w-full mx-auto"></div> */}
          <Link href={"/signup"} className="justify-center flex">
            <Button
              onClick={() => setSignUpPageIsLoading(true)}
              variant="ghost"
              className="mx-auto"
            >
              New user? Create an account
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

export default LoginPage;
