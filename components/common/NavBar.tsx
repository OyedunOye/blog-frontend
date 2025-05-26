"use client";

import { useContext, useState } from "react";

import Link from "next/link";
import Image from "next/image";
import { getCookie, deleteCookie } from "cookies-next/client";
import { ChevronDown, Menu, Moon, Search, Sun } from "lucide-react";

import { Button } from "../ui/button";
import Logo from "@/public/Logo.png";

import MaxWidth from "./MaxWidthWrapper";
import Loading from "./Loader";

import { getDecodedToken } from "@/hooks/getDecodeToken/getDecodedToken";

import { NavBarMenuList } from "@/constants";
import { toasterAlert } from "@/utils";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import AvatarRenderer from "./Avatar";
import { getInitials } from "@/utils/helpers";
import { AppContext } from "@/context/AppContext";
import { useGetAUser } from "@/hooks/authors/useGetAUser";

const NavBar = () => {
  const { dispatch, state } = useContext(AppContext);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isLoggingOut, setIsLoggingOut] = useState<boolean>(false);

  // const [activeTab, setActiveTab] = useState<"Home" | "Life Style" | "Template" | "Active Page" | "Other Page">(
  //   "Home"
  // );

  const token = getCookie("token");
  const baseUrl = process.env.NEXT_PUBLIC_UPLOAD_URL;

  const userName = () => {
    if (token) {
      const decoded = getDecodedToken(token);
      if (decoded !== null) {
        return decoded?.firstName + " " + decoded?.lastName;
      } else {
        return "";
      }
    }
  };

  const picPath = () => {
    if (token) {
      const userData = getDecodedToken(token);
      if (userData?.authorImg !== "") {
        // return "http://localhost:3001/" + userData?.authorImg;
        return `${baseUrl}${userData?.authorImg}`;
      }
    }
    return "";
  };

  // console.log(picPath());

  const handleLogOut = () => {
    setIsLoggingOut(true);
    deleteCookie("token");
    toasterAlert("Successfully logged out.");
    setIsLoggingOut(false);
    window.location.reload();
  };

  const handleSwitchToDarkMode = () => {
    dispatch({
      type: "DISPLAY_MODE",
      payload: "Dark",
    });
  };

  const { data, isSuccess, error, isError } = useGetAUser();

  const handleProfileClick = () => {
    if (data && isSuccess) {
      // const payload = {
      //   profileData: data}
      console.log(data);
      dispatch({
        type: "PROFILE_DATA_STORAGE",
        payload: data,
      });
    }
  };

  const handleSwitchToLightMode = () => {
    dispatch({
      type: "DISPLAY_MODE",
      payload: "Light",
    });
  };
  return (
    <nav
      className={`py-4 shadow-indigo-600/10 shadow-lg sticky top-0 left-0  z-50 flex w-full flex-col ${
        state.appMode === "Dark" ? "bg-black text-white" : "bg-white"
      }`}
    >
      {isLoading ? (
        <Loading className="min-h-screen" message="Loading login page" />
      ) : (
        ""
      )}

      {isLoggingOut ? (
        <Loading className="min-h-screen" message="Logging out" />
      ) : (
        ""
      )}

      <MaxWidth className="flex flex-col w-full">
        <div className="flex justify-between">
          <ul className="flex h-8 content-center">
            <Link href={"/"}>
              <Image src={Logo} alt="logo" className="w-30 cursor-pointer" />
            </Link>
            <div className=" ">
              {/* <div className=" max-lg:hidden"> */}
              {NavBarMenuList.map((menu) => (
                <Link
                  href={
                    menu.split(" ")[0].toLowerCase() !== "home"
                      ? `/${menu.split(" ")[0].toLowerCase()}`
                      : "/"
                  }
                  key={menu}
                >
                  <Button
                    key={menu}
                    // onClick={setActiveTab(menu)}
                    variant="ghost"
                    className="hover:bg-[#F3F4F6]"
                  >
                    {menu}
                  </Button>
                </Link>
              ))}
            </div>

            {/* <div className='hidden max-lg:block'>
                    <Menu/>
                </div> */}
          </ul>

          <div className="flex w-contain justify-between content-center gap-1.5">
            {/* <Sun className="content-center flex h-full cursor-pointer" /> */}
            {/* <Link href={"/search"}>
              <Search className="content-center flex h-full cursor-pointer" />
            </Link> */}

            {token ? (
              <div className="ml-4">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button className="cursor-pointer flex items-center justify-center gap-x-1">
                      {/* Image URL should come from the decoded token, if no image, use the  fallback from the username e.g `PO` for Peter Odo */}
                      <AvatarRenderer
                        src={picPath()}
                        className="h-8 w-8"
                        fallBack={getInitials(userName()!)}
                      />
                      <ChevronDown />
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-60 z-[100] mr-4 mt-3">
                    <DropdownMenuLabel className="capitalize">
                      {userName()}'s Account
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuGroup>
                      <DropdownMenuItem className="cursor-pointer">
                        <Link onClick={handleProfileClick} href={"/profile"}>
                          Profile
                        </Link>
                        <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="cursor-pointer">
                        <Link href={"/create-blog"}>Create Blog</Link>
                        <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
                      </DropdownMenuItem>
                    </DropdownMenuGroup>
                    <DropdownMenuSeparator />
                    <>
                      {state.appMode === "Light" ? (
                        <DropdownMenuItem
                          onClick={handleSwitchToDarkMode}
                          className="cursor-pointer"
                        >
                          Dark Mode <Moon />
                        </DropdownMenuItem>
                      ) : (
                        <DropdownMenuItem
                          onClick={handleSwitchToLightMode}
                          className="cursor-pointer"
                        >
                          Light Mode <Sun />
                        </DropdownMenuItem>
                      )}
                    </>

                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      onClick={handleLogOut}
                      className="cursor-pointer"
                    >
                      Log out
                      <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            ) : (
              <Link href={"/login"}>
                <Button
                  onClick={() => setIsLoading(true)}
                  variant="default"
                  className=""
                >
                  Log In
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
