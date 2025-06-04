"use client";

import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import Image from "next/image";
import HeroImg from "@/components/assets/heroImg.png";
import MaxWidth from "../common/MaxWidthWrapper";
import { useRouter } from "next/navigation";
import { toasterAlert } from "@/utils";
import Cookies from "universal-cookie";
import { LoaderCircle } from "lucide-react";

const cookies = new Cookies(null, { path: "/" });

const Hero = () => {
  const [token, setToken] = useState<string | undefined>("");
  const [createClick, setCreateClick] = useState<boolean | undefined>(false);

  useEffect(() => {
    const getToken = async () => {
      if (typeof window !== "undefined") {
        const token = await cookies.get("token");
        setToken(token);
      }
    };

    getToken();
  }, []);

  const router = useRouter();

  const handleOpenCreateBlogForm = () => {
    if (token) {
      setCreateClick(true);
      router.push("/create-blog");
      return;
    }
    toasterAlert(
      "You are offline. Please login to be able to create a blog post!"
    );
  };

  return (
    <section id="home" className="w-full bg-[#F3F4F6] ">
      <MaxWidth className="w-full h-fit flex flex-wrap pt-10 flex-row bg-[#F3F4F6] dark:bg-black/60 max-lg:pb-4">
        <div className="flex flex-1/5 flex-col h-[280px] content-center my-5 py-1 mr-4 gap-6 max-md:flex-1 ">
          <h2 className="font-bold text-3xl">👋 Read and share your story.</h2>
          <p>
            Discover outstanding articles in the carefully selected categories
            available on this site.
          </p>

          <Button
            onClick={() => handleOpenCreateBlogForm()}
            variant="default"
            className=""
          >
            {createClick ? (
              <LoaderCircle className="text-gray-400 animate-spin" />
            ) : (
              "Create a New Blog"
            )}
          </Button>
        </div>
        <div className="h-full w-2/3 flex max-md:w-full max-md:pb-5 ">
          <Image
            src={HeroImg}
            alt="hero image"
            width={200}
            height={50}
            className="content-center my-1 w-full h-full object-cover"
          />
        </div>
      </MaxWidth>
    </section>
  );
};

export default Hero;
