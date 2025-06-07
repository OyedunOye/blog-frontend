import React from "react";

import Logo from "@/public/Logo.png";
import Image from "next/image";
import MaxWidth from "./MaxWidthWrapper";
import { FaGithub } from "react-icons/fa";
import { MdOutlineEmail } from "react-icons/md";
import Link from "next/link";
import { Heart } from "lucide-react";

const Footer = () => {
  return (
    <footer className="mb-6 mt-28">
      <div className="h-0.5 bg-black dark:bg-white w-full"></div>
      <MaxWidth className="flex-row justify-between py-5 mt-4 w-full">
        <div className="flex w-full justify-between">
          <div className="flex flex-col">
            <Link href={"/"}>
              <Image
                src={Logo}
                alt="logo"
                height={30}
                width={90}
                className="w-22 h-12 cursor-pointer mt-2 mb-4"
              />
            </Link>
            <div className="flex flex-col gap-2">
              <a
                href={"https://github.com/OyedunOye"}
                className="flex h-8 gap-2 content-center py-1"
              >
                <FaGithub size={24} className="flex h-full" />
                GitHub
              </a>
              <Link
                href={"mailto:oyesinaoyedun@yahoo.com"}
                className="flex h-8 gap-2 content-center py-1"
              >
                <MdOutlineEmail size={24} className="flex h-full" />
                Email
              </Link>
            </div>
          </div>

          <div className="flex flex-col gap-2 max-md:w-[50%]">
            <p className="">©{new Date().getFullYear()}</p>
            <p className="flex gap-1 max-md:flex-wrap">
              Made with
              <span>
                <Heart color="red" fill="red" />{" "}
              </span>{" "}
              by Oluwasade Oyesina
            </p>
          </div>
        </div>
      </MaxWidth>
    </footer>
  );
};

export default Footer;
