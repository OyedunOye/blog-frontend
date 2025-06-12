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

const cookies = new Cookies(null, { path: "/" });

const NavBar = () => {
  const [activeTab, setActiveTab] = useState<string | null>(null);
  const [token, setToken] = useState<string | undefined>("");

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [signUpIsLoading, setSignUpIsLoading] = useState<boolean>(false);
  const [isLoggingOut, setIsLoggingOut] = useState<boolean>(false);

  const { theme, setTheme } = useTheme();

  const { data, isLoading: getUserIsLoading } = useGetAUser();

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
                    className={`hover:bg-[#F3F4F6] dark:hover:bg-slate-700 ${
                      activeTab === menu ? "bg-[#F3F4F6] text-black" : null
                    }`}
                  >
                    {menu}
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
                <Link href={"/signup"}>
                  <Button
                    onClick={() => setSignUpIsLoading(true)}
                    variant="default"
                    className="w-fit"
                  >
                    Sign Up
                  </Button>
                </Link>
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
