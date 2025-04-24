"use client";

import { Menu, Search, Sun } from "lucide-react";
import { Button } from "../ui/button";
import { NavBarMenuList } from "@/constants";
import Logo from "@/public/Logo.png";
import Image from "next/image";
import MaxWidth from "./MaxWidthWrapper";
import Link from "next/link";
import { useState } from "react";
import Loading from "./Loader";
import { getDecodedToken } from "@/hooks/getDecodeToken/getDecodedToken";
import { getCookie } from "cookies-next/client";

const NavBar = () => {
  // const [menu, setMenu] = useState(false)
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const token = getCookie("token");
  const userName = () => {
    if (token) {
      const decoded = getDecodedToken(token);
      console.log(decoded);
      if (decoded !== null) {
        const name = decoded?.firstName + " " + decoded?.lastName;
        // let name = decoded?.firstName;
        return decoded?.firstName + " " + decoded?.lastName;
        // console.log("name is", name);
      } else {
        return "";
      }
    }
  };

  return (
    <nav className=" py-4 shadow-indigo-600/10 shadow-lg sticky top-0 left-0 bg-white z-99 flex w-full flex-col">
      {isLoading ? (
        <Loading className="min-h-screen" message="Loading login page" />
      ) : (
        ""
      )}
      <MaxWidth className="flex flex-col w-full">
        <div className="flex justify-between">
          <ul className="flex h-8 content-center">
            <Link href={"/"}>
              <Image src={Logo} alt="logo" className="w-30 cursor-pointer" />
            </Link>
            <div className=" max-lg:hidden">
              {/* <div className=" max-lg:hidden"> */}
              {NavBarMenuList.map((menu) => (
                <Button
                  key={menu}
                  variant="ghost"
                  className="hover:bg-[#F3F4F6]"
                >
                  {menu}
                </Button>
              ))}
            </div>

            {/* <div className='hidden max-lg:block'>
                    <Menu/>
                </div> */}
          </ul>

          <div className="flex w-[22%] justify-between content-center">
            <Sun className="content-center flex h-full cursor-pointer" />
            <Link href={"/search"}>
              <Search className="content-center flex h-full cursor-pointer" />
            </Link>

            {token ? (
              // <p>Welcome{typeof name === "string" ? name : ""}!</p>
              <p className="font-bold content-center text-indigo-600">
                Welcome {userName()}!
              </p>
            ) : (
              <Link href={"/login"}>
                <Button
                  onClick={() => setIsLoading(true)}
                  variant="default"
                  className=""
                >
                  Get Started
                </Button>
              </Link>
            )}
          </div>
        </div>
      </MaxWidth>
    </nav>
  );
};

export default NavBar;
