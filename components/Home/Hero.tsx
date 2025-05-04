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
          "You are offline. Please login to be able to create a blog post!"
        );
  };

  return (
    <section id="home" className="w-full bg-[#F3F4F6]">
      <MaxWidth className="w-full flex flex-wrap pt-10 flex-row bg-[#F3F4F6]">
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
        <div className="h-full w-2/3 flex">
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
