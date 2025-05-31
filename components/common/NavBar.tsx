"use client";

import { useContext, useEffect, useState } from "react";

import Link from "next/link";
import Image from "next/image";
import Cookies from "universal-cookie";
import { ChevronDown, LoaderCircle, Moon, Sun } from "lucide-react";

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
import { usePathname } from "next/navigation";
// import { useGetAUser } from "@/hooks/authors/useGetAUser";

const cookies = new Cookies(null, { path: "/" });

const NavBar = () => {
  const { dispatch, state } = useContext(AppContext);

  const [activeTab, setActiveTab] = useState<string | null>(null);
  const [token, setToken] = useState<string | undefined>("");
  const [gettingToken, setGettingToken] = useState<boolean>(true);

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isLoggingOut, setIsLoggingOut] = useState<boolean>(false);

  // const token = getCookie("token");

  const baseUrl = process.env.NEXT_PUBLIC_UPLOAD_URL;
  const pathname = usePathname();

  useEffect(() => {
    if (pathname === "/") {
      setActiveTab("Home");
    }
    if (pathname === "/discover") {
      setActiveTab("Discover");
    }
  }, [pathname]);

  useEffect(() => {
    const getToken = async () => {
      if (typeof window !== "undefined") {
        const token = await cookies.get("token");
        setToken(token);
        setGettingToken(false);
      }
    };

    getToken();
  }, []);

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
        return `${baseUrl}${userData?.authorImg}`;
      }
    }
    return "";
  };

  const handleLogOut = () => {
    setIsLoggingOut(true);
    cookies.remove("token");
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
      ) : null}

      {isLoggingOut ? (
        <Loading className="min-h-screen" message="Logging out" />
      ) : null}

      <MaxWidth className="flex flex-col w-full">
        <div className="flex justify-between">
          <ul className="flex h-8 content-center">
            <Link href={"/"}>
              <Image src={Logo} alt="logo" className="w-30 cursor-pointer" />
            </Link>
            <div className="space-x-2">
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
                    // onClick={() => setActiveTab(menu)}
                    variant="ghost"
                    className={`hover:bg-[#F3F4F6] ${
                      activeTab === menu ? "bg-[#F3F4F6]" : null
                    }`}
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
            {gettingToken ? (
              <div>
                <LoaderCircle className="text-gray-400 animate-spin" />
              </div>
            ) : (
              <>
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
                          {userName()}&apos;s Account
                        </DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuGroup>
                          <DropdownMenuItem className="cursor-pointer">
                            <Link href={"/profile"}>Profile</Link>
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
              </>
            )}
          </div>
        </div>
      </MaxWidth>
    </nav>
  );
};

export default NavBar;
