"use client";

import { useEffect, useState } from "react";

import Link from "next/link";
import Image from "next/image";
import Cookies from "universal-cookie";
import {
  ChevronDown,
  LoaderCircle,
  Menu,
  // MonitorCog,
  Moon,
  Sun,
} from "lucide-react";

import { Button } from "../ui/button";
import Logo from "@/public/Logo.png";

import MaxWidth from "./MaxWidthWrapper";
import Loading from "./Loader";

// import { getDecodedToken } from "@/hooks/getDecodeToken/getDecodedToken";

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
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { useGetAUser } from "@/hooks/authors/useGetAUser";
import { getDecodedToken } from "@/hooks/getDecodeToken/getDecodedToken";
import { number } from "zod";

const cookies = new Cookies(null, { path: "/" });

const NavBar = () => {
  const [activeTab, setActiveTab] = useState<string | null>(null);
  const [token, setToken] = useState<string | undefined>("");

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [signUpIsLoading, setSignUpIsLoading] = useState<boolean>(false);
  const [isLoggingOut, setIsLoggingOut] = useState<boolean>(false);
  const [homeIsClicked, setHomeIsClicked] = useState<boolean>(false);
  const [discoverIsClicked, setDiscoverIsClicked] = useState<boolean>(false);

  const { theme, setTheme } = useTheme();

  const { data, isLoading: getUserIsLoading } = useGetAUser();

  // console.log(data);
  // const sessionExpCheck = new Date(g)

  const pathname = usePathname();

  const handleMenuClick = (menu: string) => {
    if (menu === "Home" && pathname !== "/") {
      setHomeIsClicked(true);
    }

    if (menu === "Discover" && pathname !== "/discover") {
      setDiscoverIsClicked(true);
    }
  };

  useEffect(() => {
    if (pathname === "/") {
      setActiveTab("Home");
      setHomeIsClicked(false);
    }
    if (pathname === "/discover") {
      setActiveTab("Discover");
      setDiscoverIsClicked(false);
    }
  }, [pathname]);

  useEffect(() => {
    const getToken = async () => {
      if (typeof window !== "undefined") {
        const token = await cookies.get("token");
        setToken(token);
      }
    };

    getToken();
  }, []);

  const userName = () => {
    if (!getUserIsLoading && data) {
      return data.user.firstName + " " + data.user.lastName;
    }
    return "";
  };

  const getTokenExp = () => {
    if (token) {
      const decoded = getDecodedToken(token);
      return decoded?.exp;
    }
  };

  const picPath = () => {
    if (!getUserIsLoading && data) {
      return data.user.authorImg;
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

  // auto logs user out when their session expires to make them renew session by logging in again
  const sessionExpCheck =
    typeof getTokenExp() === "number"
      ? new Date(getTokenExp()! * 1000)
      : new Date();

  const minutes_ms = 60000;
  useEffect(() => {
    if (token && token !== "") {
      const interval = setInterval(() => {
        if (sessionExpCheck < new Date()) {
          console.log("session expired, clearing cookies");
          toasterAlert("Session expired, please login again");
          cookies.remove("token");
          window.location.reload();
        } else {
          console.log("Session still valid");
        }
      }, minutes_ms);
      return () => clearInterval(interval);
    }
  }, []);

  return (
    <nav
      className={`py-4 shadow-indigo-600/10 shadow-lg sticky top-0 left-0  bg-white z-50 flex w-full flex-col dark:bg-slate-800 `}
    >
      {isLoading ? (
        <Loading className="min-h-screen" message="Loading login page" />
      ) : null}

      {signUpIsLoading ? (
        <Loading className="min-h-screen" message="Loading sign up page" />
      ) : null}

      {isLoggingOut ? (
        <Loading className="min-h-screen" message="Logging out" />
      ) : null}

      <MaxWidth className="flex flex-col w-full">
        <div className="flex justify-between">
          <div className="flex h-8 content-center">
            <Link href={"/"} className="w-16 rounded-sm mr-2">
              <Image
                src={Logo}
                alt="logo"
                width={90}
                height={52}
                className="w-full h-[110%] max-md:h-full object-center rounded-sm"
              />
            </Link>
            <div className="space-x-2 flex max-md:hidden">
              {NavBarMenuList.map((menu) => (
                <Link
                  className="w-18"
                  onClick={() => {
                    handleMenuClick(menu);
                  }}
                  href={
                    menu.split(" ")[0].toLowerCase() !== "home"
                      ? `/${menu.split(" ")[0].toLowerCase()}`
                      : "/"
                  }
                  key={menu}
                >
                  <Button
                    key={menu}
                    variant="ghost"
                    className={`hover:bg-[#F3F4F6] dark:hover:bg-slate-700 w-full ${
                      activeTab === menu ? "bg-[#F3F4F6] text-black" : null
                    }`}
                  >
                    {(homeIsClicked && menu === "Home") ||
                    (discoverIsClicked && menu === "Discover") ? (
                      <LoaderCircle className="text-gray-400 animate-spin w-fit" />
                    ) : (
                      menu
                    )}
                  </Button>
                </Link>
              ))}
              <div className=" cursor-pointer h-full flex content-center my-2">
                {theme === "light" ? (
                  <Moon onClick={() => setTheme("dark")} />
                ) : (
                  <Sun onClick={() => setTheme("light")} />
                )}
              </div>
            </div>

            <div className="hidden max-md:block">
              <DropdownMenu>
                <DropdownMenuTrigger className="flex h-full content-center">
                  <Menu className="h-full" />
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-38 z-[100] mr-4 mt-3">
                  <DropdownMenuGroup>
                    <DropdownMenuItem className="cursor-pointer">
                      <Link href={"/"}>Home</Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="cursor-pointer">
                      <Link href={"/discover"}>Discover</Link>
                    </DropdownMenuItem>

                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="cursor-pointer h-full">
                      {theme === "light" ? (
                        <button
                          onClick={() => {
                            setTheme("dark");
                          }}
                          className="flex gap-1 content-center"
                        >
                          Dark Mode <Moon className="m-1" />
                        </button>
                      ) : (
                        <button
                          onClick={() => {
                            setTheme("light");
                          }}
                          className="flex gap-1 content-center"
                        >
                          Light Mode <Sun className="m-1" />
                        </button>
                      )}
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          <div className="flex w-contain justify-between content-center gap-1.5">
            {getUserIsLoading ? (
              <div>
                <LoaderCircle className="text-gray-400 animate-spin" />
              </div>
            ) : (
              <>
                {!getUserIsLoading && !token && (
                  <Link href={"/signup"}>
                    <Button
                      onClick={() => setSignUpIsLoading(true)}
                      variant="default"
                      className="w-fit"
                    >
                      Sign Up
                    </Button>
                  </Link>
                )}
                {!getUserIsLoading && token ? (
                  <div className="ml-4">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <button className="cursor-pointer flex items-center justify-center gap-x-1">
                          {/* Image URL should come from the decoded token, if no image, use the  fallback from the username e.g `PO` for Peter Odo */}
                          <AvatarRenderer
                            src={picPath()}
                            className="h-8 w-8 dark:bg-slate-400"
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
                          <Link href={"/profile"}>
                            <DropdownMenuItem className="cursor-pointer">
                              Profile
                              <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
                            </DropdownMenuItem>
                          </Link>
                          <DropdownMenuSeparator />
                          <Link href={"/create-blog"}>
                            <DropdownMenuItem className="cursor-pointer">
                              Create Blog
                              <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
                            </DropdownMenuItem>
                          </Link>
                        </DropdownMenuGroup>

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
                      variant="ghost"
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
