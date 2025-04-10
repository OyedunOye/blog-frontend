import { Menu, Search, Sun } from "lucide-react";
import { Button } from "../ui/button";
import { NavBarMenuList } from "@/constants";
import Logo from "@/public/Logo.png";
import Image from "next/image";
import MaxWidth from "../Home/MaxWidthWrapper";
import Link from "next/link";
// import { useState } from "react"

const NavBar = () => {
  // const [menu, setMenu] = useState(false)

  return (
    <nav className=" py-4 shadow-indigo-600/10 shadow-lg sticky top-0 left-0 bg-white z-99 flex w-full flex-col">
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

            <Link href={"/login"}>
              <Button variant="default" className="">
                Get Started
              </Button>
            </Link>
          </div>
        </div>
      </MaxWidth>
    </nav>
  );
};

export default NavBar;
