"use client";

import Image from "next/image";

import { cn } from "@/lib/utils";
import { poppins } from "@/lib/fonts";

import { Button } from "../ui/button";
import MaxWidth from "../common/MaxWidthWrapper";
import illustration from "../assets/author-illustration.png";
import Cookies from "universal-cookie";
import Link from "next/link";
import { useEffect, useState } from "react";

const cookies = new Cookies(null, { path: "/" });

const getToken = async () => {
  const token = await cookies.get("token");
  return token;
};

const token = await getToken();

const BecomeAuthor = () => {
  const [saveToken, setSaveToken] = useState<string | null>(null);

  useEffect(() => {
    token;
    if (token) {
      setSaveToken(token);
    }
    return;
  }, []);

  return (
    <MaxWidth className="mb-24">
      <div className="w-full py-10 flex items-center justify-between max-md:flex-col-reverse">
        <div
          className={cn(
            "flex flex-col gap-y-4 max-lg:w-[55%] max-md:w-full",
            poppins.className
          )}
        >
          <p className="text-gray-500 uppercase font-semibold text-sm dark:text-gray-400">
            super change your writing powers
          </p>
          <h3 className="max-w-[470px] text-4xl max-lg:text-lg font-semibold text-gray-800 dark:text-white">
            Become an author and share your great stories
          </h3>
          <p className="max-w-[473px] max-md:w-full text-gray-600 dark:text-gray-400 mt-2">
            Writing a blog is a powerful way to share your thoughts,
            experiences, and expertise with the world. Whether you&apos;re
            passionate about a hobby, have valuable insights to offer, or simply
            enjoy storytelling, blogging gives you a platform to express
            yourself. Let your voice shine through. You never know who you might
            inspire!
          </p>
          <Link href={saveToken ? "/create-blog" : "/login"}>
            <Button size="lg" className="rounded-full mt-2 w-[180px] h-11">
              {saveToken ? "Become an author" : "Login"}
            </Button>
          </Link>
        </div>
        <div className="h-full max-w-[763px] max-lg:w-[43%] max-md:w-full max-md:mb-6 flex p-10 max-lg:p-2 content-center">
          <Image
            alt="Become an author illustration"
            src={illustration}
            width={763}
            height={555}
            className="object-cover"
          />
        </div>
      </div>
    </MaxWidth>
  );
};

export default BecomeAuthor;
