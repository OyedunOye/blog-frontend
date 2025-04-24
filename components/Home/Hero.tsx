"use client";

import React from "react";
import { Button } from "../ui/button";
import Image from "next/image";
import HeroImg from "@/components/assets/heroImg.png";
import MaxWidth from "../common/MaxWidthWrapper";
import Link from "next/link";

// For client-side usage
import { getCookie } from "cookies-next/client";
import { useRouter } from "next/navigation";
import { toasterAlert } from "@/utils";

const Hero = () => {
  const token = getCookie("token");

  const router = useRouter();

  const handleOpenCreateBlogForm = () => {
    token
      ? router.push("/create-blog")
      : toasterAlert(
          "You are offline. Please login by clicking the 'get started' button on the navigation bar above!"
        );
  };

  return (
    <section className="w-full bg-[#F3F4F6]">
      <MaxWidth className="flex flex-wrap pt-10 flex-row bg-[#F3F4F6]">
        <div className="flex flex-1/5 flex-col h-[280px] content-center my-5 py-1 mr-4 gap-6">
          <h2 className="font-bold text-3xl">👋 Read and share anything.</h2>
          <p>
            Discover the most outstanding articles in all topics of life. Write
            your stories and share them.
          </p>

          <Button
            onClick={handleOpenCreateBlogForm}
            variant="default"
            className=""
          >
            Create a New Blog
          </Button>
        </div>
        <div className="h-[280px] flex">
          <Image
            src={HeroImg}
            alt="hero image"
            className="content-center my-1"
          />
        </div>
      </MaxWidth>
    </section>
  );
};

export default Hero;
